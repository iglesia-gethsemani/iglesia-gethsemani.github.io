(() => {
  const STEPS = [
    { visible: 1, shift: 0, status: 'Portada. Toca el boletín para abrirlo.', panels: ['outsideRight'] },
    { visible: 2, shift: 0.5, status: 'Al abrir la portada: la reflexión continúa a la izquierda.', panels: ['insideLeft', 'outsideLeft'] },
    { visible: 3, shift: 0, status: 'Interior completo, con la solapa abierta.', panels: ['insideLeft', 'insideCenter', 'insideRight'] },
    { visible: 3, shift: 0, status: 'Cara exterior: la hoja volteada.', panels: ['outsideLeft', 'outsideCenter', 'outsideRight'] },
  ];
  const STEP_DELAY = 720;
  const STAGE_PADDING = 48;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function setup(root) {
    const stage = root.querySelector('[data-stage]');
    const zoom = root.querySelector('[data-zoom]');
    const status = root.querySelector('[data-status]');
    const prev = root.querySelector('[data-action="prev"]');
    const next = root.querySelector('[data-action="next"]');
    const stepButtons = [...root.querySelectorAll('[data-goto]')];
    const dialog = root.querySelector('[data-dialog]');
    const dialogPanels = root.querySelector('[data-dialog-panels]');
    const panels = JSON.parse(root.dataset.panels);
    const ratio = Number(root.dataset.ratio);
    let step = 0;
    let target = 0;
    let timer = null;
    let layout = null;

    function measure() {
      const width = stage.clientWidth - STAGE_PADDING;
      if (width <= 0) return;
      const maxHeight = Math.min(window.innerHeight * 0.88, 1060) - STAGE_PADDING;
      const panelWidth = Math.min(width / 3, maxHeight / ratio);
      const panelHeight = panelWidth * ratio;
      const scales = STEPS.map((entry) =>
        Math.min(width / (panelWidth * entry.visible), maxHeight / panelHeight),
      );
      root.style.setProperty('--pw', `${panelWidth}px`);
      root.style.setProperty('--ph', `${panelHeight}px`);
      layout = { panelWidth, panelHeight, scales };
      render();
    }

    function render() {
      if (!layout) return;
      const entry = STEPS[step];
      const scale = layout.scales[step];
      stage.style.height = `${layout.panelHeight * scale + STAGE_PADDING}px`;
      zoom.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${entry.shift * layout.panelWidth}px)`;
      root.dataset.step = String(step);
      status.textContent = entry.status;
      prev.disabled = step === 0;
      next.setAttribute('aria-label', step === STEPS.length - 1 ? 'Volver a cerrar' : 'Paso siguiente');
      stepButtons.forEach((button, index) => {
        if (index === step) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
      });
    }

    function advanceToward() {
      timer = null;
      if (step === target) return;
      step += target > step ? 1 : -1;
      render();
      if (step !== target) timer = window.setTimeout(advanceToward, reducedMotion.matches ? 0 : STEP_DELAY);
    }

    function goTo(index) {
      target = Math.max(0, Math.min(STEPS.length - 1, index));
      if (timer) return;
      advanceToward();
    }

    function forward() {
      goTo(target === STEPS.length - 1 ? 0 : target + 1);
    }

    prev.addEventListener('click', () => goTo(target - 1));
    next.addEventListener('click', forward);
    stepButtons.forEach((button) => button.addEventListener('click', () => goTo(Number(button.dataset.goto))));

    let pointerStart = null;
    stage.addEventListener('pointerdown', (event) => {
      pointerStart = { x: event.clientX, y: event.clientY };
    });
    stage.addEventListener('pointerup', (event) => {
      if (!pointerStart) return;
      const dx = event.clientX - pointerStart.x;
      const dy = event.clientY - pointerStart.y;
      pointerStart = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) goTo(target + (dx < 0 ? 1 : -1));
      else if (Math.abs(dx) < 8 && Math.abs(dy) < 8) forward();
    });
    stage.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') goTo(target + 1);
      else if (event.key === 'ArrowLeft') goTo(target - 1);
      else if (event.key === 'Enter' || event.key === ' ') forward();
      else return;
      event.preventDefault();
    });

    root.querySelector('[data-action="zoom"]').addEventListener('click', () => {
      dialogPanels.replaceChildren(
        ...STEPS[step].panels.map((key) => {
          const image = document.createElement('img');
          image.src = panels[key];
          image.alt = '';
          image.decoding = 'async';
          return image;
        }),
      );
      dialog.showModal();
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });

    new ResizeObserver(measure).observe(stage);
    window.addEventListener('resize', measure);
    measure();
    requestAnimationFrame(() => root.classList.add('is-ready'));

    if ('IntersectionObserver' in window && !reducedMotion.matches) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (step !== 0) return;
        root.classList.add('is-hinting');
        window.setTimeout(() => root.classList.remove('is-hinting'), 1700);
      }, { threshold: 0.6 });
      observer.observe(stage);
    }
  }

  document.querySelectorAll('[data-bulletin-viewer]').forEach(setup);
})();

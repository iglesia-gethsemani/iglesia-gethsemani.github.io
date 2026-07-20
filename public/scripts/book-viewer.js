(() => {
  document.querySelectorAll('[data-book-reader]').forEach((reader) => {
    const book = reader.querySelector('[data-book]');
    const firstFigure = reader.querySelector('[data-page-one]');
    const secondFigure = reader.querySelector('[data-page-two]');
    const firstImage = firstFigure.querySelector('img');
    const secondImage = secondFigure.querySelector('img');
    const pageInput = reader.querySelector('[data-page-input]');
    const status = reader.querySelector('[data-page-status]');
    const totalPages = Number(reader.dataset.totalPages);
    const pagePrefix = reader.dataset.pagePrefix;
    const documentTitle = reader.dataset.documentTitle;
    const mobileQuery = window.matchMedia('(max-width: 760px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentPage = 1;
    let pointerStart = null;

    const pageUrl = (page) => `${pagePrefix}${String(page).padStart(2, '0')}.png`;

    function normalizePage(page) {
      const clamped = Math.max(1, Math.min(totalPages, Number(page) || 1));
      if (mobileQuery.matches || clamped === 1) return clamped;
      return clamped % 2 === 0 ? clamped : clamped - 1;
    }

    function setImage(image, page) {
      image.src = pageUrl(page);
      image.alt = `Página ${page} de ${documentTitle}`;
    }

    function render() {
      const isMobile = mobileQuery.matches;
      const isCover = !isMobile && currentPage === 1;
      const secondPage = !isMobile && !isCover && currentPage < totalPages ? currentPage + 1 : null;

      setImage(firstImage, currentPage);
      firstFigure.hidden = false;
      book.classList.toggle('is-cover', isCover);

      if (secondPage) {
        setImage(secondImage, secondPage);
        secondFigure.hidden = false;
      } else {
        secondFigure.hidden = true;
        secondImage.removeAttribute('src');
        secondImage.alt = '';
      }

      const shownLabel = secondPage ? `Páginas ${currentPage}–${secondPage}` : `Página ${currentPage}`;
      status.textContent = `${shownLabel} de ${totalPages}`;
      pageInput.value = currentPage;

      reader.querySelectorAll('[data-action="prev"], [data-action="first"]').forEach((button) => {
        button.disabled = currentPage === 1;
      });
      reader.querySelectorAll('[data-action="next"], [data-action="last"]').forEach((button) => {
        button.disabled = isMobile ? currentPage === totalPages : currentPage >= totalPages - 1;
      });
    }

    function moveTo(page, direction = 1) {
      const nextPage = normalizePage(page);
      if (nextPage === currentPage) return;
      currentPage = nextPage;
      render();

      if (!reducedMotion.matches) {
        book.animate(
          [
            { opacity: 0.65, transform: `perspective(1200px) rotateY(${direction > 0 ? '-4deg' : '4deg'})` },
            { opacity: 1, transform: 'perspective(1200px) rotateY(0)' },
          ],
          { duration: 260, easing: 'ease-out' },
        );
      }
    }

    function step(direction) {
      if (mobileQuery.matches) {
        moveTo(currentPage + direction, direction);
      } else if (direction > 0) {
        moveTo(currentPage === 1 ? 2 : currentPage + 2, direction);
      } else {
        moveTo(currentPage === 2 ? 1 : currentPage - 2, direction);
      }
    }

    reader.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action]');
      if (!button || button.disabled) return;
      const action = button.dataset.action;
      if (action === 'prev') step(-1);
      if (action === 'next') step(1);
      if (action === 'first') moveTo(1, -1);
      if (action === 'last') moveTo(totalPages, 1);
    });

    pageInput.addEventListener('change', () => moveTo(pageInput.value, Number(pageInput.value) >= currentPage ? 1 : -1));
    pageInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') moveTo(pageInput.value, Number(pageInput.value) >= currentPage ? 1 : -1);
    });
    book.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    });
    book.addEventListener('pointerdown', (event) => { pointerStart = event.clientX; });
    book.addEventListener('pointerup', (event) => {
      if (pointerStart === null) return;
      const distance = event.clientX - pointerStart;
      pointerStart = null;
      if (Math.abs(distance) > 45) step(distance < 0 ? 1 : -1);
    });
    book.addEventListener('pointercancel', () => { pointerStart = null; });
    mobileQuery.addEventListener('change', () => {
      currentPage = normalizePage(currentPage);
      render();
    });

    const requestedPage = new URLSearchParams(window.location.search).get('pagina');
    currentPage = normalizePage(requestedPage || 1);
    render();
  });
})();

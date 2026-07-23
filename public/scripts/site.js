const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');
const backdrop = document.querySelector('[data-nav-backdrop]');
const header = document.querySelector('.site-header');
const mobileQuery = window.matchMedia('(max-width: 900px)');

function isMobileNav() {
    return mobileQuery.matches;
}

function syncNavA11y(open) {
    if (!navigation) return;

    if (!isMobileNav()) {
        navigation.removeAttribute('aria-hidden');
        return;
    }

    navigation.setAttribute('aria-hidden', String(!open));
}

function setMenuOpen(open) {
    if (!toggle || !navigation) return;

    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    navigation.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    syncNavA11y(open);

    if (backdrop) {
        backdrop.hidden = !open;
        backdrop.classList.toggle('is-visible', open);
    }

    if (open) {
        const firstLink = navigation.querySelector('a');
        firstLink?.focus({ preventScroll: true });
    }
}

function closeMenu() {
    setMenuOpen(false);
}

if (toggle && navigation) {
    syncNavA11y(false);

    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        setMenuOpen(!isOpen);
    });

    backdrop?.addEventListener('click', closeMenu);

    navigation.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            toggle.focus();
        }
    });

    const handleViewportChange = () => {
        if (!isMobileNav()) {
            closeMenu();
        } else {
            syncNavA11y(toggle.getAttribute('aria-expanded') === 'true');
        }
    };

    if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', handleViewportChange);
    } else {
        mobileQuery.addListener(handleViewportChange);
    }
}

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 16);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll([
        '.welcome-grid', '.belief-preview-head', '.solas-mini', '.media-section',
        '.channel-section', '.visit-banner', '.doctrine-grid', '.five-solas-head',
        '.solas-list article', '.creed-heading', '.creed-parts article',
        '.heidelberg-intro', '.heidelberg-path', '.confession-callout',
        '.starter-resources', '.resource-note', '.youtube-library',
        '.article-row', '.sermon-card', '.youtube-video-grid article', '.values-grid', '.elders-grid'
    ].join(','));

    animatedElements.forEach((element, index) => {
        element.classList.add('reveal');
        if (index % 2) element.classList.add('reveal-delay');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

    animatedElements.forEach((element) => observer.observe(element));
}

const contactChat = document.querySelector('[data-contact-chat]');

if (contactChat) {
    const panel = contactChat.querySelector('#contact-chat-panel');
    const launcher = contactChat.querySelector('[data-chat-launcher]');
    const closeButton = contactChat.querySelector('[data-chat-close]');
    const form = contactChat.querySelector('[data-chat-form]');
    const messages = contactChat.querySelector('[data-chat-messages]');
    const submitButton = contactChat.querySelector('[data-chat-submit]');
    const submitLabel = contactChat.querySelector('[data-chat-submit-label]');
    const errorMessage = contactChat.querySelector('[data-chat-error]');
    const privacyMessage = contactChat.querySelector('[data-chat-privacy]');
    const fields = {
        name: contactChat.querySelector('[data-chat-field="name"]'),
        email: contactChat.querySelector('[data-chat-field="email"]'),
        message: contactChat.querySelector('[data-chat-field="message"]'),
    };
    let currentStep = 'name';

    const openChat = () => {
        panel.hidden = false;
        launcher.setAttribute('aria-expanded', 'true');
        document.body.classList.add('chat-open');
        window.setTimeout(() => fields[currentStep]?.focus(), 60);
    };

    const closeChat = () => {
        panel.hidden = true;
        launcher.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('chat-open');
        launcher.focus();
    };

    const addMessage = (text, type = 'sent') => {
        const bubble = document.createElement('div');
        bubble.className = `chat-message chat-message--${type}`;
        bubble.textContent = text;
        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
    };

    const showField = (nextStep) => {
        Object.entries(fields).forEach(([key, field]) => {
            field.hidden = key !== nextStep;
        });
        currentStep = nextStep;
        errorMessage.hidden = true;
        fields[nextStep].focus();
    };

    const showError = (text) => {
        errorMessage.textContent = text;
        errorMessage.hidden = false;
    };

    launcher.addEventListener('click', () => panel.hidden ? openChat() : closeChat());
    closeButton.addEventListener('click', closeChat);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !panel.hidden) closeChat();
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const field = fields[currentStep];

        if (!field.checkValidity()) {
            field.reportValidity();
            return;
        }

        if (currentStep === 'name') {
            addMessage(field.value.trim());
            addMessage(`Mucho gusto, ${field.value.trim()}. ¿A qué correo podemos responderte?`, 'received');
            showField('email');
            return;
        }

        if (currentStep === 'email') {
            addMessage(field.value.trim());
            addMessage('Ahora cuéntanos, ¿en qué podemos ayudarte?', 'received');
            showField('message');
            submitLabel.textContent = 'Enviar';
            return;
        }

        const messageText = field.value.trim();
        if (!form.dataset.messageAdded) {
            addMessage(messageText);
            form.dataset.messageAdded = 'true';
        }
        field.hidden = true;
        submitButton.disabled = true;
        submitLabel.textContent = 'Enviando…';
        errorMessage.hidden = true;

        const payload = {
            name: fields.name.value.trim(),
            email: fields.email.value.trim(),
            message: messageText,
            pagina: window.location.href,
            _subject: 'Nuevo mensaje desde el chat de Gethsemaní',
            _template: 'table',
            _captcha: 'false',
            _honey: form.elements._honey.value,
        };

        try {
            const response = await fetch('https://formsubmit.co/ajax/gethsemanicoyoacan@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (!response.ok || result.success === false) throw new Error('No fue posible enviar el mensaje');

            addMessage('¡Gracias! Tu mensaje fue enviado. Te responderemos por correo tan pronto como nos sea posible.', 'received');
            form.classList.add('is-complete');
            submitButton.hidden = true;
            privacyMessage.hidden = true;
        } catch (error) {
            field.hidden = false;
            submitButton.disabled = false;
            submitLabel.textContent = 'Intentar de nuevo';
            const subject = encodeURIComponent('Mensaje desde el sitio de Gethsemaní');
            const body = encodeURIComponent(`Nombre: ${payload.name}\nCorreo: ${payload.email}\n\n${payload.message}`);
            showError(`No pudimos enviarlo en este momento. Puedes escribirnos directamente a gethsemanicoyoacan@gmail.com.`);
            const fallback = document.createElement('a');
            fallback.className = 'contact-chat-fallback';
            fallback.href = `mailto:gethsemanicoyoacan@gmail.com?subject=${subject}&body=${body}`;
            fallback.textContent = 'Abrir mi correo';
            errorMessage.append(' ', fallback);
        }
    });
}

document.querySelectorAll('[data-copy-link]').forEach((button) => {
    button.addEventListener('click', async () => {
        const text = button.getAttribute('data-copy-text') || button.getAttribute('data-copy-link');
        if (!text) return;

        const label = button.querySelector('[data-copy-label]');
        const original = label?.textContent ?? 'Copiar';

        try {
            await navigator.clipboard.writeText(text);
            button.classList.add('is-copied');
            if (label) label.textContent = 'Copiado';
            window.setTimeout(() => {
                button.classList.remove('is-copied');
                if (label) label.textContent = original;
            }, 2000);
        } catch {
            window.prompt('Copia este texto:', text);
        }
    });
});

async function copyText(value) {
    try {
        await navigator.clipboard.writeText(value);
        return true;
    } catch {
        return false;
    }
}

function showShareFeedback(root, message) {
    const feedback = root.querySelector('[data-share-feedback]');
    if (!feedback) return;
    feedback.hidden = false;
    feedback.textContent = message;
    window.setTimeout(() => {
        feedback.hidden = true;
    }, 6000);
}

function isAppleTouchDevice() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

document.querySelectorAll('[data-share-root]').forEach((root) => {
    const title = root.getAttribute('data-share-title') || document.title;
    const text = root.getAttribute('data-share-text') || '';
    const url = root.getAttribute('data-share-url') || window.location.href;
    const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

    // Solo este botón usa el menú de Apple/Android.
    root.querySelector('[data-share-native]')?.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
                return;
            } catch (error) {
                if (error?.name === 'AbortError') return;
            }
        }

        const copied = await copyText(text || url);
        showShareFeedback(
            root,
            copied
                ? 'Texto y enlace copiados. Pégalos donde quieras compartir.'
                : 'Usa «Copiar texto y enlace» para compartir.'
        );
    });

    // Facebook nunca usa navigator.share (evita el menú de Apple).
    root.querySelector('[data-share-facebook]')?.addEventListener('click', async () => {
        const copied = await copyText(url);

        if (isAppleTouchDevice()) {
            // En iPhone, sharer.php abre la app vacía y pierde el enlace.
            // Flujo fiable: copiar URL + abrir Facebook para pegarlo (genera la tarjeta).
            showShareFeedback(
                root,
                copied
                    ? 'Enlace copiado. Se abrirá Facebook: toca «¿Qué estás pensando?» y pega el enlace para ver la vista previa.'
                    : 'Abre Facebook, crea una publicación y pega el enlace de esta reflexión.'
            );
            window.setTimeout(() => {
                window.location.href = 'https://www.facebook.com/';
            }, 400);
            return;
        }

        const popup = window.open(facebookHref, 'fbShare', 'noopener,noreferrer,width=640,height=560');
        if (!popup) {
            window.location.href = facebookHref;
        }
        if (copied) {
            showShareFeedback(root, 'Si no aparece el enlace en Facebook, pégalo en la publicación.');
        }
    });
});

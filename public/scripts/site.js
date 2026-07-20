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

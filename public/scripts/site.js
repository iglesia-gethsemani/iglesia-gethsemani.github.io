const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');
const header = document.querySelector('.site-header');

if (toggle && navigation) {
    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!isOpen));
        navigation.classList.toggle('open', !isOpen);
        document.body.classList.toggle('menu-open', !isOpen);
    });
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

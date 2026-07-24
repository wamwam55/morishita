(function() {
    'use strict';

    function initOnestop() {
        const section = document.querySelector('.onestop-section');
        if (!section) return;

        // スクロールリビール（他セクションと同じ挙動）
        const header = section.querySelector('.section-header');
        if (header) {
            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        headerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
            headerObserver.observe(header);
        }

        const reveals = section.querySelectorAll('.onestop-reveal');
        if (reveals.length) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
            reveals.forEach(el => revealObserver.observe(el));
        }

        // スムーススクロール（ヘッダーと同挙動）
        const cta = section.querySelector('.onestop-cta');
        if (cta) {
            cta.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOnestop);
    } else {
        initOnestop();
    }
})();

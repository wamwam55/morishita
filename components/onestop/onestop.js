(function() {
    'use strict';

    function initOnestop() {
        const section = document.querySelector('.onestop-section');
        if (!section) return;

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

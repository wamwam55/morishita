(function() {
    'use strict';

    function initPricing() {
        const section = document.querySelector('.pricing-section');
        if (!section) return;

        // タブ切り替え
        const tabBtns = section.querySelectorAll('.tab-btn');
        const tabContents = section.querySelectorAll('.tab-content');

        function activateTab(target) {
            tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === target));
            tabContents.forEach(c => c.classList.remove('active'));
            const content = section.querySelector('#tab-' + target);
            if (content) content.classList.add('active');
        }

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                activateTab(this.dataset.tab);
            });
        });

        // プランカードから該当タブへ
        section.querySelectorAll('[data-tab-link]').forEach(btn => {
            btn.addEventListener('click', function() {
                activateTab(this.dataset.tabLink);
                const tabs = section.querySelector('.pricing-tabs');
                if (tabs) tabs.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // 社会保険カテゴリ切り替え
        const catBtns = section.querySelectorAll('.sh-cat');
        const details = section.querySelectorAll('.sh-detail');
        catBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                catBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                details.forEach(d => d.classList.remove('active'));
                const detail = section.querySelector('#sh-' + this.dataset.sh);
                if (detail) detail.classList.add('active');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPricing);
    } else {
        initPricing();
    }
})();

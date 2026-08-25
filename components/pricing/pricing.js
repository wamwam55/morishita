(function() {
    'use strict';

    // 固定ヘッダーのぶんだけ余白を残す（料金表の見出しがヘッダーに隠れないように）
    function headerOffset() {
        const fixedHeader = document.getElementById('header-component');
        const height = fixedHeader ? fixedHeader.getBoundingClientRect().height : 0;
        return (height || 80) + 20;
    }

    // 目的地を測り直しながらスクロールする
    //
    // 一度きりの scrollIntoView だと「料金表へ移動したあと、しばらくして画面が上へ飛ぶ」。
    // 料金表は about コンポーネントの中にあり、その真上の onestop や遅延読み込みの画像が
    // あとから入って高さを押し広げるため、到着時点の座標が古くなるのが原因。
    // 毎フレーム測り直し、到着後もしばらく追従して、そのズレを吸収する。
    function scrollToStable(target, duration, settleMs) {
        if (typeof window.__pricingScrollCancel === 'function') {
            window.__pricingScrollCancel();
        }

        let cancelled = false;

        function cleanup() {
            window.removeEventListener('wheel', onUserInput);
            window.removeEventListener('touchstart', onUserInput);
            window.removeEventListener('keydown', onUserInput);
            if (window.__pricingScrollCancel === cancel) window.__pricingScrollCancel = null;
        }
        function cancel() {
            cancelled = true;
            cleanup();
        }
        // ユーザーが自分で動かしたら、こちらは即座に手を引く
        function onUserInput() { cancel(); }
        window.addEventListener('wheel', onUserInput, { passive: true });
        window.addEventListener('touchstart', onUserInput, { passive: true });
        window.addEventListener('keydown', onUserInput);
        window.__pricingScrollCancel = cancel;

        // global.css の html{scroll-behavior:smooth} が効くと1フレームごとの補正が
        // スムーススクロールの入れ子になって暴れるため、ここだけ即時移動にする
        function jumpTo(y) {
            try {
                window.scrollTo({ top: y, left: 0, behavior: 'instant' });
            } catch (e) {
                window.scrollTo(0, y);
            }
        }

        function desired() {
            const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
            const top = window.scrollY + target.getBoundingClientRect().top - headerOffset();
            return Math.min(max, Math.max(0, Math.round(top)));
        }

        const startY = window.scrollY;
        const startTime = performance.now();
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

        function animate(now) {
            if (cancelled) return;
            // rAF のタイムスタンプは startTime より前になることがある。
            // 負の progress を通すと ease が負になり、一瞬ページ最上部へ飛ぶ。
            const progress = Math.min(Math.max((now - startTime) / duration, 0), 1);
            jumpTo(startY + (desired() - startY) * easeOutCubic(progress));
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                follow(now);
            }
        }

        // 到着後、遅れて入ってくる要素のぶんだけ位置を保ち続ける
        function follow(from) {
            (function keep(now) {
                if (cancelled) return;
                const want = desired();
                if (Math.abs(window.scrollY - want) > 2) jumpTo(want);
                if (now - from < settleMs) {
                    requestAnimationFrame(keep);
                } else {
                    cleanup();
                }
            })(from);
        }

        requestAnimationFrame(animate);
    }

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
                if (tabs) scrollToStable(tabs, 600, 2500);
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

(function() {
    'use strict';

    // 売上スライダーの目盛（万円）
    const SALES_STEPS = [500, 1000, 2000, 3000, 5000, 7000, 10000, 20000];

    // 顧問料テーブル（万円上限, 月次顧問料, 決算料）実際の料金表と同一
    const FEES = {
        kojin: [
            { max: 1000, monthly: 15000, kessan: 50000 },
            { max: 3000, monthly: 20000, kessan: 100000 },
            { max: 5000, monthly: 25000, kessan: 100000 },
            { max: Infinity, consult: true }
        ],
        hojin: [
            { max: 1000, monthly: 20000, kessan: 100000 },
            { max: 3000, monthly: 25000, kessan: 100000 },
            { max: 5000, monthly: 30000, kessan: 100000 },
            { max: 10000, monthly: 35000, kessan: 150000 },
            { max: 20000, monthly: 40000, kessan: 200000 },
            { max: Infinity, consult: true }
        ]
    };

    function payrollFee(people) {
        // 1〜5人: 10,000円、6人目以降 +2,000円/人
        return 10000 + Math.max(0, people - 5) * 2000;
    }

    function formatSales(man) {
        if (man >= 10000) {
            const oku = man / 10000;
            return (oku % 1 === 0 ? oku : oku.toFixed(1)) + '億円';
        }
        return man.toLocaleString() + '万円';
    }

    function yen(n) {
        return n.toLocaleString();
    }

    function initSimulator() {
        const section = document.querySelector('.sim-section');
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

        const reveals = section.querySelectorAll('.sim-reveal');
        if (reveals.length) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
            reveals.forEach(el => revealObserver.observe(el));
        }

        const typeBtns = section.querySelectorAll('.sim-toggle-btn');
        const range = section.querySelector('#sim-range');
        const salesLabel = section.querySelector('#sim-sales-label');
        const payrollCheck = section.querySelector('#sim-payroll');
        const peopleSelect = section.querySelector('#sim-people');
        const shohizeiSelect = section.querySelector('#sim-shohizei');

        const resultBox = section.querySelector('#sim-result');
        const consultBox = section.querySelector('#sim-consult');
        const komonEl = section.querySelector('#sim-komon');
        const payrollRow = section.querySelector('#sim-payroll-row');
        const payrollFeeEl = section.querySelector('#sim-payroll-fee');
        const kessanEl = section.querySelector('#sim-kessan');
        const shohizeiRow = section.querySelector('#sim-shohizei-row');
        const shohizeiFeeEl = section.querySelector('#sim-shohizei-fee');
        const totalEl = section.querySelector('#sim-total');

        let bizType = 'kojin';

        function currentFee() {
            const sales = SALES_STEPS[parseInt(range.value, 10)];
            return FEES[bizType].find(f => sales <= f.max);
        }

        function update() {
            const sales = SALES_STEPS[parseInt(range.value, 10)];
            salesLabel.textContent = formatSales(sales);
            range.style.setProperty('--sim-progress', (range.value / range.max * 100) + '%');

            const fee = currentFee();
            if (fee.consult) {
                resultBox.style.display = 'none';
                consultBox.style.display = 'block';
                return;
            }
            resultBox.style.display = 'block';
            consultBox.style.display = 'none';

            let monthly = fee.monthly;
            let annualOnly = fee.kessan;

            komonEl.innerHTML = yen(fee.monthly) + '<small>円/月</small>';
            kessanEl.innerHTML = yen(fee.kessan) + '<small>円</small>';

            const usePayroll = payrollCheck.checked;
            peopleSelect.disabled = !usePayroll;
            payrollRow.style.display = usePayroll ? '' : 'none';
            if (usePayroll) {
                const p = payrollFee(parseInt(peopleSelect.value, 10));
                payrollFeeEl.innerHTML = yen(p) + '<small>円/月</small>';
                monthly += p;
            }

            const shohizei = parseInt(shohizeiSelect.value, 10);
            shohizeiRow.style.display = shohizei ? '' : 'none';
            if (shohizei) {
                shohizeiFeeEl.innerHTML = yen(shohizei) + '<small>円</small>';
                annualOnly += shohizei;
            }

            totalEl.textContent = yen(monthly * 12 + annualOnly);
        }

        typeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                typeBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                bizType = this.dataset.type;
                update();
            });
        });

        range.addEventListener('input', update);
        payrollCheck.addEventListener('change', update);
        peopleSelect.addEventListener('change', update);
        shohizeiSelect.addEventListener('change', update);

        const cta = section.querySelector('.sim-cta');
        if (cta) {
            cta.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }

        update();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSimulator);
    } else {
        initSimulator();
    }
})();

// Mockup-only: renders the sample projects and runs the stack and desk layouts.
(function () {
    const projects = window.WORK || [];

    const sheet = (p) => `
        <article class="sheet" style="--hue:${p.hue}">
            <figure class="shot"><i></i></figure>
            <span class="tag">${p.offer}</span>
            <h3>${p.title}</h3>
            <p class="who">${p.who}</p>
            <dl>
                <div><dt>The problem</dt><dd>${p.problem}</dd></div>
                <div><dt>What I built</dt><dd>${p.built}</dd></div>
                <div><dt>What changed</dt><dd>${p.result}</dd></div>
            </dl>
        </article>`;

    const stackRoot = document.querySelector('[data-layout="stack"]');
    if (stackRoot) {
        const deck = stackRoot.querySelector('.stack');
        const count = stackRoot.querySelector('.stack-count');
        const chips = stackRoot.querySelector('.chips');
        deck.innerHTML = projects.map(sheet).join('');
        const sheets = [...deck.children];
        const tilt = [0.4, -1.8, 2.2, -2.8];
        let list = sheets;
        let cur = 0;
        let busy = false;

        const offers = [...new Set(projects.map((p) => p.offer))];
        chips.innerHTML = ['All work', ...offers]
            .map((o, i) => `<button type="button" aria-pressed="${i === 0}">${o}</button>`)
            .join('');
        chips.addEventListener('click', (e) => {
            const b = e.target.closest('button');
            if (!b) return;
            chips.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b));
            const want = b.textContent;
            list = sheets.filter((s, i) => want === 'All work' || projects[i].offer === want);
            cur = 0;
            layout();
        });

        function layout() {
            const n = list.length;
            sheets.forEach((s) => {
                const k = list.indexOf(s);
                s.hidden = k < 0;
                if (k < 0) return;
                const p = (k - cur + n) % n;
                const d = Math.min(p, 3);
                s.style.zIndex = 50 - p;
                s.style.transform = `translate(${d * 5}px, ${d * 8}px) rotate(${tilt[d]}deg)`;
                s.style.opacity = p > 3 ? 0 : 1;
                s.classList.toggle('is-top', p === 0);
                s.inert = p !== 0;
            });
            count.textContent = n ? `${cur + 1} of ${n}` : '';
            stackRoot.querySelectorAll('.stack-controls button').forEach((b) => (b.disabled = n < 2));
        }

        function next(dir = -1) {
            if (busy || list.length < 2) return;
            busy = true;
            const top = list[cur];
            top.style.transform = `translate(${dir * 130}%, 30px) rotate(${dir * 14}deg)`;
            setTimeout(() => {
                cur = (cur + 1) % list.length;
                layout();
                busy = false;
            }, 220);
        }

        function prev() {
            if (busy || list.length < 2) return;
            cur = (cur - 1 + list.length) % list.length;
            const top = list[cur];
            top.style.transition = 'none';
            top.style.zIndex = 60;
            top.style.transform = 'translate(-130%, 30px) rotate(-14deg)';
            top.getBoundingClientRect();
            top.style.transition = '';
            layout();
        }

        let startX = null;
        let dx = 0;
        deck.addEventListener('pointerdown', (e) => {
            const top = e.target.closest('.sheet.is-top');
            if (!top) return;
            startX = e.clientX;
            dx = 0;
            top.setPointerCapture(e.pointerId);
            top.classList.add('dragging');
        });
        deck.addEventListener('pointermove', (e) => {
            if (startX === null) return;
            dx = e.clientX - startX;
            list[cur].style.transform = `translate(${dx}px, ${Math.abs(dx) / 12}px) rotate(${dx / 24}deg)`;
        });
        const release = () => {
            if (startX === null) return;
            const top = list[cur];
            top.classList.remove('dragging');
            startX = null;
            if (Math.abs(dx) > 80) next(Math.sign(dx));
            else layout();
        };
        deck.addEventListener('pointerup', release);
        deck.addEventListener('pointercancel', release);

        stackRoot.querySelector('[data-prev]').addEventListener('click', prev);
        stackRoot.querySelector('[data-next]').addEventListener('click', () => next());
        deck.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
        });

        layout();
    }

    const deskRoot = document.querySelector('[data-layout="desk"]');
    if (deskRoot) {
        const desk = deskRoot.querySelector('.desk');
        const dialog = deskRoot.querySelector('dialog');
        desk.innerHTML = projects.map(sheet).join('');
        [...desk.children].forEach((s, i) => {
            const more = document.createElement('button');
            more.type = 'button';
            more.className = 'more';
            more.textContent = 'Read the whole story';
            more.addEventListener('click', () => {
                dialog.innerHTML = sheet(projects[i]);
                const close = document.createElement('button');
                close.type = 'button';
                close.className = 'close';
                close.textContent = 'Close';
                close.addEventListener('click', () => dialog.close());
                dialog.firstElementChild.prepend(close);
                dialog.showModal();
            });
            s.append(more);
        });
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) dialog.close();
        });
    }
})();

// Send the contact form to Formspree without leaving the page.
// Without JavaScript the form still posts normally.
(function () {
    const form = document.querySelector('.contact form');
    if (!form) return;
    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector('.form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        button.disabled = true;
        status.className = 'form-status';
        status.textContent = 'Sending...';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' },
            });
            if (!response.ok) throw new Error(response.statusText);
            form.reset();
            status.textContent = 'Thanks. I got your message and will reply within a day.';
        } catch (err) {
            status.className = 'form-status error';
            status.textContent = 'That didn’t send. Try again in a minute.';
        } finally {
            button.disabled = false;
        }
    });
})();

// Work section. Desk by default; ?work=stack shows the stacked pile instead.
(function () {
    const band = document.getElementById('work');
    if (!band) return;
    const list = band.querySelector('.work-list');
    const sheets = [...list.querySelectorAll('.sheet')];
    const layout = new URLSearchParams(location.search).get('work') === 'stack' ? 'stack' : 'desk';
    list.dataset.layout = layout;
    list.classList.add('enhanced');

    if (layout === 'desk') {
        const dialog = document.createElement('dialog');
        dialog.className = 'work-dialog';
        dialog.setAttribute('aria-label', 'Project details');
        band.append(dialog);
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) dialog.close();
        });

        sheets.forEach((s) => {
            const more = document.createElement('button');
            more.type = 'button';
            more.className = 'more';
            more.textContent = 'Read the whole story';
            more.addEventListener('click', () => {
                const copy = s.cloneNode(true);
                copy.querySelector('.more').remove();
                const close = document.createElement('button');
                close.type = 'button';
                close.className = 'close';
                close.textContent = 'Close';
                close.addEventListener('click', () => dialog.close());
                copy.prepend(close);
                dialog.replaceChildren(copy);
                dialog.showModal();
                close.focus();
            });
            s.append(more);
        });
        return;
    }

    const chips = document.createElement('div');
    chips.className = 'chips';
    chips.setAttribute('aria-label', 'Filter by kind of work');
    const offers = [...new Set(sheets.map((s) => s.dataset.offer))];
    chips.innerHTML = ['All work', ...offers]
        .map((o, i) => `<button type="button" aria-pressed="${i === 0}">${o}</button>`)
        .join('');
    band.querySelector('header').append(chips);

    const controls = document.createElement('div');
    controls.className = 'stack-controls';
    controls.innerHTML =
        '<button type="button" aria-label="Previous project">&larr;</button>' +
        '<span class="stack-count" aria-live="polite"></span>' +
        '<button type="button" aria-label="Next project">&rarr;</button>';
    const hint = document.createElement('p');
    hint.className = 'stack-hint';
    hint.textContent = 'Swipe or drag the top sheet to see the next one.';
    list.after(controls, hint);
    const [prevButton, count, nextButton] = controls.children;

    list.tabIndex = 0;
    list.setAttribute('aria-roledescription', 'carousel');
    list.setAttribute('aria-label', 'Projects');

    const tilt = [0.4, -1.8, 2.2, -2.8];
    let shown = sheets;
    let cur = 0;
    let busy = false;

    function place() {
        const n = shown.length;
        sheets.forEach((s) => {
            const k = shown.indexOf(s);
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
        prevButton.disabled = nextButton.disabled = n < 2;
    }

    function next(dir = -1) {
        if (busy || shown.length < 2) return;
        busy = true;
        shown[cur].style.transform = `translate(${dir * 130}%, 30px) rotate(${dir * 14}deg)`;
        setTimeout(() => {
            cur = (cur + 1) % shown.length;
            place();
            busy = false;
        }, 220);
    }

    function prev() {
        if (busy || shown.length < 2) return;
        cur = (cur - 1 + shown.length) % shown.length;
        const top = shown[cur];
        top.style.transition = 'none';
        top.style.zIndex = 60;
        top.style.transform = 'translate(-130%, 30px) rotate(-14deg)';
        top.getBoundingClientRect();
        top.style.transition = '';
        place();
    }

    chips.addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (!b) return;
        chips.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b));
        shown = sheets.filter((s) => b.textContent === 'All work' || s.dataset.offer === b.textContent);
        cur = 0;
        place();
    });

    let startX = null;
    let dx = 0;
    list.addEventListener('pointerdown', (e) => {
        const top = e.target.closest('.sheet.is-top');
        if (!top) return;
        startX = e.clientX;
        dx = 0;
        top.setPointerCapture(e.pointerId);
        top.classList.add('dragging');
    });
    list.addEventListener('pointermove', (e) => {
        if (startX === null) return;
        dx = e.clientX - startX;
        shown[cur].style.transform = `translate(${dx}px, ${Math.abs(dx) / 12}px) rotate(${dx / 24}deg)`;
    });
    const release = () => {
        if (startX === null) return;
        shown[cur].classList.remove('dragging');
        startX = null;
        if (Math.abs(dx) > 80) next(Math.sign(dx));
        else place();
    };
    list.addEventListener('pointerup', release);
    list.addEventListener('pointercancel', release);

    prevButton.addEventListener('click', prev);
    nextButton.addEventListener('click', () => next());
    list.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });

    place();
})();

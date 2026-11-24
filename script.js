// Plan buttons pick the matching plan in the contact form.
document.querySelectorAll('[data-plan]').forEach((link) => {
    link.addEventListener('click', () => {
        const select = document.querySelector('.contact select[name="plan"]');
        if (select) select.value = link.dataset.plan;
    });
});

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
            status.textContent = 'Got it. Grant will reply within a day.';
        } catch (err) {
            status.className = 'form-status error';
            status.textContent = 'That didn’t send. Try again in a minute.';
        } finally {
            button.disabled = false;
        }
    });
})();

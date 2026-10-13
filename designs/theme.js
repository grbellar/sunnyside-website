// Mockup-only helper: day/night toggle for the landscape variations.
(function () {
    const root = document.documentElement;
    let saved = null;
    try { saved = localStorage.getItem('mock-theme'); } catch (e) {}
    const initial = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.setAttribute('data-theme', initial);

    document.addEventListener('DOMContentLoaded', () => {
        const button = document.getElementById('theme-toggle');
        if (!button) return;
        const label = () => {
            button.textContent = root.getAttribute('data-theme') === 'dark' ? 'good morning!' : 'feeling sleepy?';
        };
        label();
        button.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('mock-theme', next); } catch (e) {}
            label();
        });
    });
})();

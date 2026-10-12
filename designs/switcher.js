// Mockup-only helper: a bar for moving between design variations.
(function () {
    const pages = [
        { file: 'a.html', name: 'A. Yolk' },
        { file: 'b.html', name: 'B. Letter' },
        { file: 'c.html', name: 'C. Founder' },
        { file: 'd.html', name: 'D. Evergreen' },
    ];
    const current = location.pathname.split('/').pop() || 'index.html';
    const i = pages.findIndex((p) => p.file === current);
    if (i === -1) return;

    const prev = pages[(i - 1 + pages.length) % pages.length];
    const next = pages[(i + 1) % pages.length];

    const bar = document.createElement('nav');
    bar.setAttribute('aria-label', 'Design variations');
    bar.innerHTML =
        `<a href="${prev.file}" aria-label="Previous design">&larr;</a>` +
        pages
            .map((p, n) => `<a href="${p.file}"${n === i ? ' aria-current="page"' : ''}>${p.name}</a>`)
            .join('') +
        `<a href="${next.file}" aria-label="Next design">&rarr;</a>` +
        `<a href="index.html">All</a>`;

    const style = document.createElement('style');
    style.textContent = `
        .mock-switcher { position: fixed; left: 50%; bottom: 14px; transform: translateX(-50%); z-index: 9999;
            display: flex; gap: 2px; padding: 5px; border-radius: 999px; background: #000; max-width: calc(100vw - 16px);
            font: 500 13px/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; letter-spacing: 0;
            box-shadow: 0 6px 24px rgba(0, 0, 0, .3); overflow-x: auto; }
        .mock-switcher a { color: #fff; opacity: .65; text-decoration: none; padding: 8px 11px; border-radius: 999px; white-space: nowrap; }
        .mock-switcher a:hover, .mock-switcher a:focus-visible { opacity: 1; }
        .mock-switcher a[aria-current] { opacity: 1; background: #fff; color: #000; }
        @media (max-width: 560px) { .mock-switcher a:not([aria-current]):not([aria-label]) { display: none; } }
    `;
    bar.className = 'mock-switcher';
    document.head.appendChild(style);
    document.body.appendChild(bar);
    document.body.style.paddingBottom = '72px';

    document.addEventListener('keydown', (e) => {
        if (e.target.matches('input, textarea')) return;
        if (e.key === 'ArrowLeft') location.href = prev.file;
        if (e.key === 'ArrowRight') location.href = next.file;
    });

    // Forms in the mockups don't send anything.
    document.addEventListener('submit', (e) => e.preventDefault());
})();

// Mockup-only helper: a bar for moving between design variations.
(function () {
    const rounds = [
        [
            { file: 'palettes2.html', name: 'Palettes' },
            { file: 'palette-bluebird.html', name: 'Bluebird' },
            { file: 'palette-morning-ink.html', name: 'Morning, one blue' },
            { file: 'palette-sky-butter.html', name: 'Sky and butter' },
            { file: 'palette-butter-sky.html', name: 'Butter and sky' },
            { file: 'palette-soft-butter.html', name: 'Soft butter' },
            { file: 'palette-full-sun.html', name: 'Full sun' },
            { file: 'palette-periwinkle.html', name: 'Periwinkle' },
        ],
        [
            { file: 'palettes.html', name: 'Palettes' },
            { file: 'palette-morning.html', name: 'Clear morning' },
            { file: 'palette-prairie.html', name: 'Prairie' },
            { file: 'palette-golden.html', name: 'Golden hour' },
            { file: 'palette-dusk.html', name: 'Dusk' },
            { file: 'palette-clay.html', name: 'Sky and clay' },
            { file: 'palette-lake.html', name: 'Lake' },
            { file: 'palette-butter.html', name: 'Butter' },
        ],
        [
            { file: 'marks.html', name: 'Marks and type' },
            { file: 'g2a.html', name: 'G2a. Horizon' },
            { file: 'g2b.html', name: 'G2b. Line' },
            { file: 'g2c.html', name: 'G2c. Reflection' },
            { file: 'g2d.html', name: 'G2d. Prairie' },
            { file: 'g3a.html', name: 'G3a. Sunny side' },
            { file: 'g3b.html', name: 'G3b. Blue side' },
            { file: 'g3c.html', name: 'G3c. Crescent' },
            { file: 'g3d.html', name: 'G3d. Sunset' },
            { file: 'g5a.html', name: 'G5a. Stamp' },
            { file: 'g5b.html', name: 'G5b. Night' },
            { file: 'g5c.html', name: 'G5c. Sunburst' },
        ],
        [
            { file: 'g1.html', name: 'G1. Rays' },
            { file: 'g2.html', name: 'G2. Horizon' },
            { file: 'g3.html', name: 'G3. Sunny side' },
            { file: 'g4.html', name: 'G4. Tittle' },
            { file: 'g5.html', name: 'G5. Stamp' },
            { file: 'g6.html', name: 'G6. Stripes' },
            { file: 'logos.html', name: 'Logos' },
        ],
        [
            { file: 'work-a.html', name: 'Work A. Stack' },
            { file: 'work-b.html', name: 'Work B. Desk' },
        ],
        [
            { file: 'b.html', name: 'B. Original' },
            { file: 'b9.html', name: 'B9. Still' },
            { file: 'e.html', name: 'E. Ident' },
            { file: 'f.html', name: 'F. Plain' },
        ],
        [
            { file: 'b6.html', name: 'B6. Dune' },
            { file: 'b8.html', name: 'B8. Soft light' },
            { file: 'b9.html', name: 'B9. Still' },
            { file: 'b10.html', name: 'B10. Letterpress' },
        ],
        [
            { file: 'a.html', name: 'A. Yolk' },
            { file: 'c.html', name: 'C. Founder' },
            { file: 'd.html', name: 'D. Evergreen' },
        ],
        [
            { file: 'b.html', name: 'B. Original' },
            { file: 'b1.html', name: 'B1. Handmade' },
            { file: 'b2.html', name: 'B2. Quiet' },
            { file: 'b3.html', name: 'B3. Loud' },
            { file: 'b4.html', name: 'B4. Polished' },
            { file: 'b5.html', name: 'B5. Sunrise' },
            { file: 'b6.html', name: 'B6. Dune' },
            { file: 'b7.html', name: 'B7. Dune, full page' },
        ],
    ];
    const current = location.pathname.split('/').pop() || 'index.html';
    const pages = rounds.find((r) => r.some((p) => p.file === current));
    if (!pages) return;
    const i = pages.findIndex((p) => p.file === current);

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
        @media (max-width: 900px) { .mock-switcher a:not([aria-current]):not([aria-label]) { display: none; } }
    `;
    bar.className = 'mock-switcher';
    document.head.appendChild(style);
    document.body.appendChild(bar);
    document.body.style.paddingBottom = '72px';

    document.addEventListener('keydown', (e) => {
        if (e.defaultPrevented || e.target.matches('input, textarea')) return;
        if (e.key === 'ArrowLeft') location.href = prev.file;
        if (e.key === 'ArrowRight') location.href = next.file;
    });

    // Forms in the mockups don't send anything.
    document.addEventListener('submit', (e) => e.preventDefault());
})();

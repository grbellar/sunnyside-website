// Mockup-only helper: ridges drift apart as the scene scrolls past, the farthest ones slowest.
(function () {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.addEventListener('DOMContentLoaded', () => {
        const ground = document.querySelector('.ground');
        if (!ground) return;
        const layers = [...ground.querySelectorAll('[data-depth]')];
        let queued = false;

        const update = () => {
            queued = false;
            const travel = Math.max(0, innerHeight - ground.getBoundingClientRect().top);
            layers.forEach((el) => el.style.setProperty('--py', (travel * el.dataset.depth).toFixed(1) + 'px'));
        };

        addEventListener('scroll', () => {
            if (!queued) { queued = true; requestAnimationFrame(update); }
        }, { passive: true });
        addEventListener('resize', update);
        update();
    });
})();

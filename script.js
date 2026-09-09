document.getElementById('copyright-year').textContent = new Date().getFullYear();

const form = document.querySelector('.contact-form');
const status = form.querySelector('.form-status');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitButton.disabled) return;
    submitButton.disabled = true;
    status.textContent = 'Sending your message…';
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('Message could not be sent');
        form.reset();
        status.textContent = 'Thanks for saying hello. Your message is on its way to us.';
    } catch (error) {
        status.textContent = 'Your message couldn’t be sent. Please try again in a moment.';
    } finally {
        submitButton.disabled = false;
    }
});

<script>
  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  hamburger.addEventListener('keydown', e => e.key === 'Enter' && mobileMenu.classList.toggle('open'));
  function closeMobile() { mobileMenu.classList.remove('open'); }

  // Scroll fade-in
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => observer.observe(el));

  // Contact form
  function handleSend() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('msg').value.trim();
    const status = document.getElementById('send-status');
    if (!name || !email || !msg) { status.textContent = 'Please fill in all fields.'; status.style.color = '#f09595'; return; }
    const mailto = `mailto:b2399322@gmail.com?subject=Portfolio message from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\nFrom: ' + email)}`;
    window.location.href = mailto;
    status.textContent = '✓ Opening your mail client...';
    status.style.color = '#52b788';
  }
</script>

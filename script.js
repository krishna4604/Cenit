// Enhanced JS for project modal, contact links and counters
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('year').textContent = new Date().getFullYear();

  // Contact form UX
  const form = document.getElementById('contactForm');
  const result = document.getElementById('formResult');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    result.textContent = 'Sending…';
    const data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(res => {
      if (res.ok) {
        result.className = 'text-success';
        result.textContent = 'Thank you! Your message has been sent.';
        form.reset();
      } else {
        result.className = 'text-danger';
        result.textContent = 'Oops — there was a problem sending your message.';
      }
    }).catch(err => {
      result.className = 'text-danger';
      result.textContent = 'Network error. Try again later.';
      console.error(err);
    });
  });

  // Simple counters animation
  const counters = document.querySelectorAll('.counter');
  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const step = Math.ceil(target / 100);
      let current = 0;
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        counter.textContent = current;
      }, 15);
    });
  }
  // Trigger when #stats is visible
  let statsSeen = false;
  window.addEventListener('scroll', () => {
    const statsEl = document.getElementById('stats');
    if (!statsSeen && statsEl) {
      const rect = statsEl.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        animateCounters();
        statsSeen = true;
      }
    }
  });

  // Project modal and contact actions
  const viewButtons = document.querySelectorAll('.view-more');
  const projectModalEl = document.getElementById('projectModal');
  const projectModal = new bootstrap.Modal(projectModalEl);
  const modalTitle = document.getElementById('projectModalTitle');
  const modalBody = document.getElementById('projectModalBody');
  const modalEmailLink = document.getElementById('modalEmailLink');
  const modalWhatsAppLink = document.getElementById('modalWhatsAppLink');

  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title') || 'Project';
      const desc = btn.getAttribute('data-desc') || '';
      modalTitle.textContent = title;
      modalBody.innerHTML = '<p>' + desc + '</p><p class="small text-muted">For official project status and floorplans please refer to local listings or RERA entries.</p>';
      // set email link
      const subject = encodeURIComponent('Inquiry about ' + title + ' - Cenit Infrastructure');
      const body = encodeURIComponent('Hello,\n\nI am interested in ' + title + '. Please share more details, floorplans and pricing.\n\nThank you.');
      modalEmailLink.href = 'mailto:pankaj0815@gmail.com?subject=' + subject + '&body=' + body;
      modalWhatsAppLink.href = 'https://wa.me/918400334742?text=' + encodeURIComponent('Hello Cenit Infrastructure, I would like to know more about ' + title + '.');
      projectModal.show();
    });
  });

  // project quick-contact small icons on cards
  document.querySelectorAll('.contact-whatsapp').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const project = a.getAttribute('data-project') || 'your project';
      const url = 'https://wa.me/918400334742?text=' + encodeURIComponent('Hello Cenit Infrastructure, I would like to know more about ' + project + '.');
      window.open(url, '_blank');
    });
  });
  document.querySelectorAll('.contact-email').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const project = a.getAttribute('data-project') || 'your project';
      const subject = encodeURIComponent('Inquiry about ' + project + ' - Cenit Infrastructure');
      const body = encodeURIComponent('Hello,\n\nI am interested in ' + project + '. Please share more details.\n\nThank you.');
      window.location.href = 'mailto:pankaj0815@gmail.com?subject=' + subject + '&body=' + body;
    });
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

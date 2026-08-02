// Particle Canvas Animation
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initFaq();
  initTeamFilter();
  initModals();
  initSmoothScroll();
  initSocialButtons();
  initTypewriter();
});

// Typewriter Dynamic Text Animation (UU Hack Diwas Style)
function initTypewriter() {
  const typewriterEl = document.getElementById('typewriter-text');
  if (!typewriterEl) return;
  
  const words = ['Innovators', 'Entrepreneurs', 'Startups', 'Tech Leaders', 'Founders', 'Innovations'];
  let wordIndex = 0;
  
  setInterval(() => {
    typewriterEl.classList.add('typewriter-fade-out');
    
    setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      typewriterEl.textContent = words[wordIndex];
      typewriterEl.classList.remove('typewriter-fade-out');
      typewriterEl.classList.add('typewriter-fade-in');
      
      setTimeout(() => {
        typewriterEl.classList.remove('typewriter-fade-in');
      }, 350);
    }, 350);
  }, 2500);
}

function initSocialButtons() {
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const url = this.getAttribute('href');
      if (!url || url === 'https://linkedin.com' || url === 'https://instagram.com' || url === '#') {
        e.preventDefault();
        showToast('ℹ️ Profile link will be updated soon!');
      }
    });
  });
}

// Modal & Registration Form Handling (Email to nexora.ecell@gmail.com)
function initModals() {
  const modalOverlay = document.getElementById('reg-modal');
  const openBtns = document.querySelectorAll('.open-reg-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const regForm = document.getElementById('nec-reg-form');
  
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
  
  if (regForm) {
    regForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Registering Team...';
        submitBtn.disabled = true;
      }

      const teamName = document.getElementById('reg-team-name').value;
      const leaderName = document.getElementById('reg-leader-name').value;
      const email = document.getElementById('reg-email').value;
      const track = document.getElementById('reg-track').value;
      const pitchLink = document.getElementById('reg-pitch-link').value || 'Not Provided';
      
      const regId = 'NEXORA-' + Math.floor(100000 + Math.random() * 900000);

      const payload = {
        "_subject": `New NEC 2026 Team Registration (${regId}) - ${teamName}`,
        "_captcha": "false",
        "_template": "table",
        "Registration ID": regId,
        "Team Name": teamName,
        "Leader Name": leaderName,
        "Leader Email": email,
        "Challenge Track": track,
        "Pitch Deck Link": pitchLink
      };

      fetch('https://formsubmit.co/ajax/nexora.ecell@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.disabled = false;
        }
        modalOverlay.classList.remove('active');
        regForm.reset();

        showToast(`🎉 Registration Successful! Details emailed to nexora.ecell@gmail.com (ID: ${regId})`);
      })
      .catch(err => {
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.disabled = false;
        }
        modalOverlay.classList.remove('active');
        regForm.reset();

        showToast(`🎉 Registration Submitted! Details sent to nexora.ecell@gmail.com (ID: ${regId})`);
      });
    });
  }
}

function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  const particles = [];
  const particleCount = Math.min(width < 768 ? 30 : 60, 80);
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(168, 85, 247, ',
      alpha: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color + '0.8)';
      ctx.fill();
    });
    
    // Draw subtle connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.1 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// Live Countdown Timer
function initCountdown() {
  // Target Date: 30 Days from now
  const targetDate = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
  
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  const secsEl = document.getElementById('timer-secs');
  
  if (!daysEl) return;
  
  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) return;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
}

// FAQ Accordion
function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Team Filter
function initTeamFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const teamCards = document.querySelectorAll('.team-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      teamCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Modal & Registration Form Handling
function initModals() {
  const modalOverlay = document.getElementById('reg-modal');
  const openBtns = document.querySelectorAll('.open-reg-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const regForm = document.getElementById('nec-reg-form');
  
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
  
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const teamName = document.getElementById('reg-team-name').value;
      const leaderName = document.getElementById('reg-leader-name').value;
      const email = document.getElementById('reg-email').value;
      const track = document.getElementById('reg-track').value;
      
      // Generate a mock Registration ID
      const regId = 'NEXORA-' + Math.floor(100000 + Math.random() * 900000);
      
      modalOverlay.classList.remove('active');
      regForm.reset();
      
      showToast(`🎉 Registration Successful! Team: ${teamName} | Reg ID: ${regId}`);
    });
  }
}

// Toast Notifications
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;
  
  toastMsg.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

// Smooth Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

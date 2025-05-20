// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Mobile Navigation
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Scroll Progress Indicator
const scrollProgress = document.querySelector('.scroll-progress-bar');

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

// Project Modal Elements
const modal = document.getElementById('project-modal');
const modalContent = modal.querySelector('.modal-body');
const modalClose = modal.querySelector('.modal-close');

// Form Elements
const contactForm = document.querySelector('.contact-form');
const loadingSpinner = document.querySelector('.loading-spinner');

// Initialize Observers
const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
);

// Theme Toggle Handler
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  updateThemeColors(newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '🌓' : '☀️';
  
  // Add rotation animation
  themeToggle.style.transform = 'rotate(180deg)';
  setTimeout(() => {
    themeToggle.style.transform = '';
  }, 500);
});

// Mobile Navigation
function toggleMobileNav() {
  const isOpen = navLinks.classList.contains('active');
  navLinks.classList.toggle('active');
  mobileNavToggle.textContent = isOpen ? '☰' : '✕';
  
  if (!isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMobileNav() {
  navLinks.classList.remove('active');
  mobileNavToggle.textContent = '☰';
  document.body.style.overflow = '';
}

// Event Listeners
mobileNavToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMobileNav();
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('active') &&
      !e.target.closest('.nav-links') &&
      !e.target.closest('.mobile-nav-toggle')) {
    closeMobileNav();
  }
});

// Scroll Progress Handler
window.addEventListener('scroll', () => {
  const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.pageYOffset / totalScroll) * 100;
  scrollProgress.style.width = `${progress}%`;
  
  // Update back to top button visibility
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// Back to Top Handler
backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Expandable Skill Cards
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', () => {
    const wasActive = card.classList.contains('active');
    document.querySelectorAll('.skill-card.active').forEach(activeCard => {
      activeCard.classList.remove('active');
    });
    if (!wasActive) card.classList.add('active');
  });
});

// Interactive Timeline Items
document.querySelectorAll('.timeline-item').forEach(item => {
  item.addEventListener('click', () => {
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.timeline-item.active').forEach(activeItem => {
      activeItem.classList.remove('active');
    });
    if (!wasActive) item.classList.add('active');
  });
});

// Project Modal Handlers
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', () => {
    const title = item.querySelector('h4').textContent;
    const description = item.querySelector('.project-description').textContent;
    const image = item.querySelector('img').src;
    
    modalContent.innerHTML = `
      <h3>${title}</h3>
      <img src="${image}" alt="${title}" style="width: 100%; border-radius: var(--border-radius); margin: 1rem 0;">
      <p>${description}</p>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Toast Notifications
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  const container = document.querySelector('.toast-container');
  container.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add('active');
  });
  
  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Form submission handler
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loadingSpinner.classList.add('active');
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Message sent successfully! I will get back to you soon.');
      contactForm.reset();
    } catch (error) {
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      loadingSpinner.classList.remove('active');
    }
  });
}

// Initialize animations
document.querySelectorAll('.skill-card, .portfolio-item, .timeline-item').forEach(element => {
  animationObserver.observe(element);
});

// Handle mobile orientation change
window.addEventListener('orientationchange', () => {
  document.body.style.overflow = '';
  navLinks.classList.remove('active');
  mobileNavToggle.textContent = '☰';
  setTimeout(updateActiveSection, 100);
  });

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filter = button.textContent.toLowerCase();
    
    portfolioItems.forEach(item => {
      const category = item.querySelector('.portfolio-info p').textContent.toLowerCase();
      if (filter === 'all' || category.includes(filter)) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.5s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    }
  });
});

// Active Navigation Link Update
const sections = document.querySelectorAll('section');

// Update active section on scroll with mobile support
const updateActiveSection = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('resize', updateActiveSection);

// Initialize skill bars with their percentage values
document.querySelectorAll('.skill-bar').forEach(skillBar => {
  const percentageSpan = skillBar.querySelector('.skill-info span:last-child');
  const percentage = percentageSpan.textContent;
  const progressBar = skillBar.querySelector('.progress-bar');
  progressBar.style.setProperty('--progress', percentage);
});

// Theme transition handling
function updateThemeColors(theme) {
  document.documentElement.style.setProperty('--theme-transition', 'none');
  document.documentElement.setAttribute('data-theme', theme);
  
  // Force a reflow
  document.documentElement.offsetHeight;
  
  document.documentElement.style.removeProperty('--theme-transition');
}

// Smooth reveal for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  {
    threshold: 0.1
  }
);

revealSections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(section);
});

// Add simple animation to navigation links on hover
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'scale(1.05)';
    link.style.transition = 'transform 0.3s ease';
  });
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'scale(1)';
  });
});

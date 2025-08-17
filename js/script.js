// ===== Select Elements =====
const navLinks = document.querySelectorAll('.nav-links li a');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const backToTop = document.getElementById('backToTop');
const scrollCards = document.querySelectorAll('.service-card, .project-card');
const skillFills = document.querySelectorAll('.skill-fill');
const skillsSection = document.getElementById('skills');

// ===== Smooth Scrolling for Navbar Links =====
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });

    // Close mobile menu after click
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('toggle');
    }
  });
});

// ===== Hamburger Menu Toggle =====
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('toggle');
});

// ===== Active Navbar Link Highlight on Scroll =====
const highlightNav = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
};

// ===== Back to Top Button Visibility =====
const toggleBackToTop = () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
};

// ===== Back to Top Click =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Scroll Animations for Sections =====
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const displayScrollElement = (element) => element.classList.add('scrolled');
const hideScrollElement = (element) => element.classList.remove('scrolled');

const handleScrollAnimation = () => {
  sections.forEach(section => {
    if (elementInView(section, 1.25)) {
      displayScrollElement(section);
    } else {
      hideScrollElement(section);
    }
  });
};

// ===== Scroll Animations for Cards (Staggered) =====
const handleCardAnimation = () => {
  scrollCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    if (cardTop <= windowHeight - 50) {
      card.style.transitionDelay = `${index * 0.1}s`;
      card.classList.add('card-scrolled');
    } else {
      card.style.transitionDelay = '0s';
      card.classList.remove('card-scrolled');
    }
  });
};

// ===== Animate Skill Bars =====
const animateSkills = () => {
  if (skillsSection && elementInView(skillsSection, 1.25)) {
    skillFills.forEach(fill => {
      const percentage = fill.getAttribute('data-percent');
      fill.style.width = percentage;
    });
  } else {
    skillFills.forEach(fill => fill.style.width = '0');
  }
};

// ===== Scroll Event Listener =====
window.addEventListener('scroll', () => {
  highlightNav();
  toggleBackToTop();
  handleScrollAnimation();
  handleCardAnimation();
  animateSkills();
});

// ===== Initial Trigger =====
document.addEventListener('DOMContentLoaded', () => {
  handleScrollAnimation();
  handleCardAnimation();
  toggleBackToTop();
  animateSkills();
});

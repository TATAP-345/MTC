// app.js - Modern Interactive logic for MTC Starter Template

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Management (Dark / Light) ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  // Retrieve saved theme or fallback to user's system preferences
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return userPrefersDark ? 'dark' : 'light';
  };

  const currentTheme = getInitialTheme();
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });


  // --- 2. Mobile Menu (Hamburger) Toggle ---
  const hamburgerBtn = document.getElementById('hamburger-menu-btn');
  const navMenu = document.getElementById('nav-menu-list');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = () => {
    navMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
  };

  hamburgerBtn.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when a navigation link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });


  // --- 3. Reactive Glow Mouse Effect on Feature Cards ---
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position inside the element
      const y = e.clientY - rect.top;  // y position inside the element

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });


  // --- 4. Interactive Form Submission & Custom Toast Alert ---
  const contactForm = document.getElementById('contact-form');
  const successToast = document.getElementById('success-toast');

  const showToast = (message) => {
    const toastText = document.getElementById('toast-message-text');
    if (toastText) {
      toastText.textContent = message;
    }
    
    successToast.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      successToast.classList.remove('show');
    }, 3000);
  };

  // --- 4b. Unit Buttons Click Interactions & Details Display ---
  const unitData = {
    'unit-tayfun': {
      title: 'Элитное подразделение Тайфун',
      slogan: '«Сметаем любую оборону!»',
      specialty: 'Разведывательно-штурмовые операции особого назначения, прорыв укрепленных районов, диверсионная деятельность и ликвидация ключевых объектов противника.',
      tasks: 'Это главный стальной кулак 32-й бригады ВДВ. Бойцы «Тайфуна» действуют на самых сложных и опасных участках фронта. Они первыми заходят вглубь вражеских позиций, устраивают засады, захватывают стратегические точки и удерживают их до подхода основных сил, создавая для противника настоящий хаос и сокрушительный шквал огня.'
    },
    'unit-burevestnik': {
      title: 'Авиационная Группа «Буревестник»',
      slogan: '«Выше только небо!»',
      specialty: 'Воздушная поддержка наземных сил, тактическая разведка, десантирование и высокоточные авиационные удары.',
      tasks: 'Обеспечение превосходства в воздухе, прикрытие десанта с неба, нанесение ударов по логистическим узлам противника и оперативная доставка грузов/подкрепления.'
    },
    'unit-berkut': {
      title: 'Артилерийский Отряд «Беркут»',
      slogan: '«Каждый выстрел — точно в цель!»',
      specialty: 'Дальнобойная огневая поддержка, артиллерийская разведка, контрбатарейная борьба.',
      tasks: 'Подавление огневых точек противника, артиллерийская подготовка перед штурмом и создание заградительного огня для защиты оборонительных позиций бригады.'
    },
    'unit-sapsan': {
      title: 'Десанттно Штурмовой Отряд «Сапсан»',
      slogan: '«Быстрота, натиск, победа!»',
      specialty: 'Молниеносные штурмовые операции, захват плацдармов, десантирование в тыл противника.',
      tasks: 'Проведение стремительных рейдов, блокирование путей отступления противника и ведение маневренных наступательных боевых действий в любых условиях.'
    }
  };

  const unitButtons = document.querySelectorAll('.unit-btn');
  const detailsCard = document.getElementById('unit-details-card');

  unitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Visual feedback: outline the selected button
      unitButtons.forEach(b => {
        b.style.borderColor = 'var(--border-color)';
        b.style.boxShadow = 'none';
      });
      btn.style.borderColor = 'var(--accent-color)';
      btn.style.boxShadow = '0 0 10px var(--accent-glow)';
      
      showToast(`Выбрано подразделение: ${btn.textContent}`);

      // Render data dynamically with smooth transition
      const data = unitData[btn.id];
      if (data && detailsCard) {
        document.getElementById('unit-details-title').textContent = data.title;
        document.getElementById('unit-details-slogan').textContent = data.slogan;
        document.getElementById('unit-details-specialty').textContent = data.specialty;
        document.getElementById('unit-details-tasks').textContent = data.tasks;
        
        detailsCard.style.display = 'block';
        // Force layout reflow to run CSS transition
        void detailsCard.offsetHeight;
        detailsCard.style.opacity = '1';
        detailsCard.style.transform = 'translateY(0)';
      }
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');
    
    // Basic Form Validation
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast('Please fill out all required fields.');
      return;
    }
    
    if (!emailInput.validity.valid) {
      showToast('Please enter a valid email address.');
      return;
    }

    const submitBtn = document.getElementById('form-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
      })
    })
    .then(response => response.json())
    .then(data => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      if (data.success) {
        showToast('Message sent! Thank you for reaching out.');
        contactForm.reset();
      } else {
        showToast(data.error || 'Something went wrong. Please try again.');
      }
    })
    .catch(err => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      showToast('Error connecting to server. Please try again.');
      console.error(err);
    });
  });


  // --- 5. Header Scroll Visual Polish ---
  const header = document.getElementById('main-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = 'var(--shadow-lg)';
      header.style.padding = '0.5rem 0';
    } else {
      header.style.boxShadow = 'none';
      header.style.padding = '1.25rem 0';
    }
  });
});

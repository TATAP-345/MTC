// app.js - Simplified logic for 32 Brigade Unit Selection Website

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Unit Details Data ---
  const unitData = {
    'unit-about': {
      title: 'Штаб 32-й Бригады ВДВ',
      slogan: '«Никто, кроме нас!»',
      specialty: 'Воздушно-десантные войска Республики Соколов. Защита суверенитета и государственных рубежей на передовых позициях.',
      tasks: 'Сформированы во второй половине ХХ века. Личный состав прошел суровую школу боевой подготовки, принимая участие во многих оборонных операциях. Включает элитное разведывательно-штурмовое подразделение "Тайфун", авиационную группу огневой поддержки "Буревестник", артиллерийский отряд поддержки "Беркут" и десантно-штурмовой отряд штурмовых сил "Сапсан". Выберите тактические вкладки слева для загрузки отдельных досье.',
      color: '#b22222', // Red ink stamp color as default
      glow: 'rgba(178, 34, 34, 0.25)',
      stats: { mobility: 75, firepower: 80, assault: 85 }
    },
    'unit-tayfun': {
      title: 'Элитное подразделение Тайфун',
      slogan: '«Сметаем любую оборону!»',
      specialty: 'Разведывательно-штурмовые операции особого назначения, прорыв укрепленных районов, диверсионная деятельность и ликвидация ключевых объектов противника.',
      tasks: 'Это главный стальной кулак 32-й бригады ВДВ. Бойцы «Тайфуна» действуют на самых сложных и опасных участках фронта. Они первыми заходят вглубь вражеских позиций, устраивают засады, захватывают стратегические точки и удерживают их до подхода основных сил, создавая для противника настоящий хаос и сокрушительный шквал огня.',
      color: '#3ef064', // Tactical Phosphor Green (Night Vision)
      glow: 'rgba(62, 240, 100, 0.25)',
      stats: { mobility: 80, firepower: 95, assault: 100 }
    },
    'unit-burevestnik': {
      title: 'Авиационная Группа «Буревестник»',
      slogan: '«Хозяева неба, защитники земли!»',
      specialty: 'Армейская авиация, воздушная транспортировка, десантирование, огневая поддержка с воздуха (CAS) и воздушная разведка.',
      tasks: 'Главные «крылья» бригады, обеспечивающие десантникам молниеносную мобильность. Пилоты «Буревестника» осуществляют выброску парашютистов, доставляют боеприпасы в самые горячие точки, эвакуируют раненых и прикрывают наземные отряды огнем бортовых пулеметов и неуправляемых ракет (НАР).',
      color: '#4fa5e2', // Steel Blue (Military Air Support)
      glow: 'rgba(79, 165, 226, 0.25)',
      stats: { mobility: 100, firepower: 75, assault: 50 }
    },
    'unit-berkut': {
      title: 'Артиллерийский отряд «Беркут»',
      slogan: '«Боги войны десантных полей!»',
      specialty: 'Артиллерийская поддержка, подавление закрытых огневых позиций противника, уничтожение укреплений и контрбатарейная борьба.',
      tasks: 'Бойцы «Беркута» обеспечивают мощный огневой вал. Они работают на дистанции: уничтожают блокпосты, подавляют пулеметные гнезда противника и засыпают снарядами укрепрайоны перед тем, как туда зайдет десантно-штурмовой отряд «Сапсан». В обороне «Беркут» способен отрезать пути подхода вражеских резервов, создавая сплошную зону поражения.',
      color: '#e65c00', // Warning Amber (Artillery Warning)
      glow: 'rgba(230, 92, 0, 0.25)',
      stats: { mobility: 40, firepower: 100, assault: 70 }
    },
    'unit-sapsan': {
      title: 'Десантно-штурмовой отряд «Сапсан»',
      slogan: '«Быстрее ветра, сильнее бури!»',
      specialty: 'Воздушно-десантные штурмовые операции, захват укрепрайонов, ведение ближнего боя и штурм зданий.',
      tasks: 'Это главный атакующий кулак бригады. Бойцы «Сапсана» первыми десантируются на territory врага, прорывают линию обороны, зачищают ключевые объекты и удерживают их до подхода основных сил.',
      color: '#e5b83b', // Desert Sand / Tactical Gold (Ground Assault Force)
      glow: 'rgba(229, 184, 59, 0.25)',
      stats: { mobility: 90, firepower: 85, assault: 95 }
    }
  };

  // Set theme to dark
  document.documentElement.setAttribute('data-theme', 'dark');

  // --- 2. Interactive Navigation (Tabs & Sheets) ---
  const tabAbout = document.getElementById('tab-about');
  const tabUnits = document.getElementById('tab-units');
  const tabLinks = document.getElementById('tab-links');
  
  const nestedContainer = document.getElementById('nested-units-container');
  const unitsChevron = document.getElementById('tab-units-chevron');
  const unitButtons = document.querySelectorAll('.unit-btn');
  const detailsCard = document.getElementById('unit-details-card');
  
  const sheets = {
    welcome: document.getElementById('sheet-welcome'),
    about: document.getElementById('sheet-about'),
    details: document.getElementById('sheet-details'),
    links: document.getElementById('sheet-links')
  };

  // Helper to switch active sheets with a smooth fade
  function switchSheet(targetSheetKey) {
    if (!detailsCard) return;

    // Apply animation effect
    detailsCard.classList.remove('slide-in-right', 'hologram-load');
    detailsCard.classList.add('slide-out-right');

    setTimeout(() => {
      // Hide all sheets
      Object.keys(sheets).forEach(key => {
        if (sheets[key]) {
          sheets[key].style.display = 'none';
          sheets[key].classList.remove('active-sheet');
        }
      });

      // Show the selected sheet
      const targetSheet = sheets[targetSheetKey];
      if (targetSheet) {
        targetSheet.style.display = 'block';
        targetSheet.classList.add('active-sheet');
      }

      // Slide back in
      detailsCard.classList.remove('slide-out-right');
      detailsCard.classList.add('slide-in-right');
    }, 200);
  }

  // Clear active tab status from all navigation tabs and unit buttons
  function clearAllActiveNavs() {
    tabAbout.classList.remove('active-tab');
    tabUnits.classList.remove('active-tab');
    tabLinks.classList.remove('active-tab');
    unitButtons.forEach(btn => btn.classList.remove('active'));
  }

  // Tab: About Us
  if (tabAbout) {
    tabAbout.addEventListener('click', () => {
      clearAllActiveNavs();
      tabAbout.classList.add('active-tab');
      
      // Collapse unit buttons list
      if (nestedContainer) {
        nestedContainer.style.display = 'none';
        if (unitsChevron) unitsChevron.style.transform = 'rotate(0deg)';
      }

      // Reset default theme color
      document.documentElement.style.setProperty('--accent-color', '#b22222');
      document.documentElement.style.setProperty('--accent-glow', 'rgba(178, 34, 34, 0.25)');
      if (window.setSmokeTargetColor) {
        window.setSmokeTargetColor('#b22222');
      }

      switchSheet('about');
    });
  }

  // Tab: Units (Accordion Toggle)
  if (tabUnits) {
    tabUnits.addEventListener('click', () => {
      const isOpen = nestedContainer.style.display === 'flex';
      
      clearAllActiveNavs();
      tabUnits.classList.add('active-tab');

      if (nestedContainer) {
        if (isOpen) {
          nestedContainer.style.display = 'none';
          if (unitsChevron) unitsChevron.style.transform = 'rotate(0deg)';
        } else {
          nestedContainer.style.display = 'flex';
          if (unitsChevron) unitsChevron.style.transform = 'rotate(180deg)';
        }
      }
    });
  }

  // Tab: Connection & Links
  if (tabLinks) {
    tabLinks.addEventListener('click', () => {
      clearAllActiveNavs();
      tabLinks.classList.add('active-tab');

      // Collapse unit buttons list
      if (nestedContainer) {
        nestedContainer.style.display = 'none';
        if (unitsChevron) unitsChevron.style.transform = 'rotate(0deg)';
      }

      // Set connections tab theme color (blue-grey / steel blue)
      document.documentElement.style.setProperty('--accent-color', '#4fa5e2');
      document.documentElement.style.setProperty('--accent-glow', 'rgba(79, 165, 226, 0.25)');
      if (window.setSmokeTargetColor) {
        window.setSmokeTargetColor('#4fa5e2');
      }

      switchSheet('links');
    });
  }

  // Unit Buttons click handler inside accordion
  unitButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid triggering parent tabUnits accordion
      
      clearAllActiveNavs();
      tabUnits.classList.add('active-tab');
      btn.classList.add('active');

      const data = unitData[btn.id];
      if (data) {
        // Start sliding out to the right
        detailsCard.classList.remove('slide-in-right', 'hologram-load');
        detailsCard.classList.add('slide-out-right');
        
        setTimeout(() => {
          // Hide all sheets, show details sheet
          Object.keys(sheets).forEach(key => {
            if (sheets[key]) sheets[key].style.display = 'none';
          });
          if (sheets.details) {
            sheets.details.style.display = 'block';
            sheets.details.classList.add('active-sheet');
          }

          // Populate unit details
          document.getElementById('unit-details-title').textContent = data.title;
          document.getElementById('unit-details-slogan').textContent = data.slogan;
          document.getElementById('unit-details-specialty').textContent = data.specialty;
          document.getElementById('unit-details-tasks').textContent = data.tasks;
          
          // Dynamically apply unit theme color signature
          document.documentElement.style.setProperty('--accent-color', data.color);
          document.documentElement.style.setProperty('--accent-glow', data.glow);
          detailsCard.style.setProperty('--unit-accent-color', data.color);
          detailsCard.style.setProperty('--unit-accent-glow', data.glow);
          
          if (window.setSmokeTargetColor) {
            window.setSmokeTargetColor(data.color);
          }
          
          // Animate tactical spec progress bars
          const mFill = document.getElementById('spec-bar-mobility');
          const fFill = document.getElementById('spec-bar-firepower');
          const aFill = document.getElementById('spec-bar-assault');
          
          const mVal = document.getElementById('spec-val-mobility');
          const fVal = document.getElementById('spec-val-firepower');
          const aVal = document.getElementById('spec-val-assault');
          
          mFill.style.width = '0%';
          fFill.style.width = '0%';
          aFill.style.width = '0%';
          
          mVal.textContent = '0%';
          fVal.textContent = '0%';
          aVal.textContent = '0%';
          
          // Slide back in from the right
          detailsCard.classList.remove('slide-out-right');
          detailsCard.classList.add('slide-in-right');
          
          // Stagger fill visual
          setTimeout(() => {
            mFill.style.width = `${data.stats.mobility}%`;
            fFill.style.width = `${data.stats.firepower}%`;
            aFill.style.width = `${data.stats.assault}%`;
            
            mVal.textContent = `${data.stats.mobility}%`;
            fVal.textContent = `${data.stats.firepower}%`;
            aVal.textContent = `${data.stats.assault}%`;
          }, 150);
        }, 200);
      }
    });
  });

  // --- 3. Secret Worm Easter Egg ---
  const secretWormBtn = document.getElementById('secret-worm-btn');
  if (secretWormBtn) {
    secretWormBtn.addEventListener('click', (e) => {
      // Spawn 8 floating worms
      for (let i = 0; i < 8; i++) {
        const worm = document.createElement('div');
        worm.textContent = '🐛';
        worm.style.position = 'fixed';
        worm.style.left = `${e.clientX || 20}px`;
        worm.style.top = `${e.clientY || (window.innerHeight - 20)}px`;
        worm.style.fontSize = `${Math.random() * 20 + 20}px`; // 20px to 40px
        worm.style.pointerEvents = 'none';
        worm.style.zIndex = '9999';
        worm.style.userSelect = 'none';
        
        const startX = e.clientX || 20;
        const startY = e.clientY || (window.innerHeight - 20);
        
        // Calculate angle towards the center of the screen
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const dx = centerX - startX;
        const dy = centerY - startY;
        
        // Add a slight random dispersion/scatter so the worms spread out nicely
        const baseAngle = Math.atan2(dy, dx);
        const angle = baseAngle + (Math.random() - 0.5) * 0.45;
        const speed = Math.random() * 5 + 4;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        let opacity = 1;
        let x = startX;
        let y = startY;
        let rotation = Math.random() * 360;
        const rotationSpeed = (Math.random() - 0.5) * 10;

        document.body.appendChild(worm);

        const animateWorm = () => {
          x += vx;
          y += vy;
          opacity -= 0.015;
          rotation += rotationSpeed;

          worm.style.left = `${x}px`;
          worm.style.top = `${y}px`;
          worm.style.opacity = opacity;
          worm.style.transform = `rotate(${rotation}deg)`;

          if (opacity > 0) {
            requestAnimationFrame(animateWorm);
          } else {
            worm.remove();
          }
        };

        requestAnimationFrame(animateWorm);
      }
    });
  }

  // --- 4. Modal Overlay Control ---
  const modal = document.getElementById('servers-modal');
  const modalBtn = document.getElementById('servers-modal-btn');
  const closeBtn = document.getElementById('modal-close-btn');

  if (modal && modalBtn && closeBtn) {
    modalBtn.addEventListener('click', () => {
      modal.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });

    // Close modal when clicking outside the content card
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });
  }

  // --- 5. Developers Modal Overlay Control ---
  const devModal = document.getElementById('dev-modal');
  const devModalBtn = document.getElementById('dev-modal-btn');
  const devCloseBtn = document.getElementById('dev-modal-close-btn');

  if (devModal && devModalBtn && devCloseBtn) {
    devModalBtn.addEventListener('click', () => {
      devModal.classList.add('show');
    });

    devCloseBtn.addEventListener('click', () => {
      devModal.classList.remove('show');
    });

    // Close modal when clicking outside the content card
    devModal.addEventListener('click', (e) => {
      if (e.target === devModal) {
        devModal.classList.remove('show');
      }
    });
  }

  // --- 6. Click Ripple Effect on All Buttons ---
  const allButtons = document.querySelectorAll('.btn, .server-btn, .dev-btn, .discord-btn, .unit-btn, .modal-close');
  allButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Remove any existing ripples to prevent clutter
      const oldRipples = btn.querySelectorAll('.ripple');
      oldRipples.forEach(r => r.remove());

      // Create new ripple element
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      // Calculate coordinates relative to button
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      btn.appendChild(ripple);
      
      // Remove ripple after animation completes
      setTimeout(() => {
        ripple.remove();
      }, 500);
    });
  });

  // --- 7. Scroll Reveal Animation via Intersection Observer ---
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // --- 8. Dynamic 3D Parallax Tilt Effect for Cards ---
  const tiltElements = document.querySelectorAll('.feature-card, .unit-btn, .sidebar-stat');
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      // Disable 3D tilt interaction on mobile/tablet viewports to prevent jumpy layout and allow scrolling
      if (window.innerWidth <= 768) return;
      
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (x - 0.5) * 12; // rotate max 6 degrees
      const tiltY = (y - 0.5) * -12; // rotate max 6 degrees
      
      // Preserve active/hover sliding translation offsets for unit sidebar buttons to avoid snapping conflicts
      let translateExtra = '';
      if (el.classList.contains('unit-btn')) {
        translateExtra = el.classList.contains('active') ? ' translateX(6px)' : ' translateX(4px)';
      }
      
      el.style.transition = 'transform 0.08s ease-out';
      el.style.transform = `perspective(800px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) translateY(-2px)${translateExtra}`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.transform = '';
    });
  });
  // --- 9. WebGL 3D Background Removed ---
  window.setSmokeTargetColor = (hex) => {
    // Stub to prevent click crashes after background removal
  };

  // --- 10. Scroll Down Arrow click logic ---
  const scrollArrow = document.getElementById('scroll-down-arrow');
  if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
      const anchor = document.getElementById('tactical-workspace-anchor');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

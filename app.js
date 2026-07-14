// app.js - Simplified logic for 32 Brigade Unit Selection Website

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Unit Details Data ---
  const unitData = {
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

  // --- 2. Unit Buttons Click Interactions & Details Display ---
  const unitButtons = document.querySelectorAll('.unit-btn');
  const detailsCard = document.getElementById('unit-details-card');

  unitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Visual feedback: toggle active class
      unitButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Render details dynamically with smooth transition
      const data = unitData[btn.id];
      if (data && detailsCard) {
        // Start sliding out to the right
        detailsCard.classList.remove('slide-in-right', 'hologram-load');
        detailsCard.classList.add('slide-out-right');
        
        // Wait for the slide-out (250ms) to complete before swapping information
        setTimeout(() => {
          document.getElementById('unit-details-title').textContent = data.title;
          document.getElementById('unit-details-slogan').textContent = data.slogan;
          document.getElementById('unit-details-specialty').textContent = data.specialty;
          document.getElementById('unit-details-tasks').textContent = data.tasks;
          
          // Dynamically apply unit theme color signature globally to the entire document
          document.documentElement.style.setProperty('--accent-color', data.color);
          document.documentElement.style.setProperty('--accent-glow', data.glow);
          detailsCard.style.setProperty('--unit-accent-color', data.color);
          detailsCard.style.setProperty('--unit-accent-glow', data.glow);
          
          // Update background smoke color signature
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
          
          // Swap classes to slide back in from the right
          detailsCard.classList.remove('slide-out-right');
          detailsCard.classList.add('slide-in-right', 'hologram-load');
          detailsCard.style.opacity = '1';
          detailsCard.style.transform = '';
          
          // Listen to animation end to clean up visual classes so it doesn't conflict with 3D mouse tilts
          const onAnimationEnd = (e) => {
            if (e.animationName === 'slideInRight' || e.animationName === 'hologramGlitch') {
              detailsCard.classList.remove('slide-in-right', 'hologram-load');
              detailsCard.removeEventListener('animationend', onAnimationEnd);
            }
          };
          detailsCard.addEventListener('animationend', onAnimationEnd);
          
          // Stagger visual fill of stats to look extremely high-end
          setTimeout(() => {
            mFill.style.width = `${data.stats.mobility}%`;
            fFill.style.width = `${data.stats.firepower}%`;
            aFill.style.width = `${data.stats.assault}%`;
            
            mVal.textContent = `${data.stats.mobility}%`;
            fVal.textContent = `${data.stats.firepower}%`;
            aVal.textContent = `${data.stats.assault}%`;
          }, 150);
        }, 250);
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
        
        // Trajectory calculation (up and outward)
        const angle = (Math.random() * Math.PI) / 2 + Math.PI; // angle upward (180 to 270 deg)
        const speed = Math.random() * 4 + 3;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        let opacity = 1;
        let x = e.clientX || 20;
        let y = e.clientY || (window.innerHeight - 20);
        let rotation = Math.random() * 360;
        const rotationSpeed = (Math.random() - 0.5) * 8;

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




  // --- 10. Live HUD Coordinates & Micro Terminal Logs ---
  const hudX = document.getElementById('hud-coord-x');
  const hudY = document.getElementById('hud-coord-y');
  
  if (hudX && hudY) {
    window.addEventListener('mousemove', (e) => {
      // Normalize coordinate reading relative to screen size
      const normX = (e.clientX / window.innerWidth * 100).toFixed(3);
      const normY = (e.clientY / window.innerHeight * 100).toFixed(3);
      hudX.textContent = normX;
      hudY.textContent = normY;
    });
  }

  const logConsole = document.getElementById('hud-terminal-logs');
  const logLines = [
    "SYS // CORPS SYNCING SECTOR 32... OK",
    "COMMS // LINK STATE ENCRYPTED",
    "RADAR // RADAR SWEEP COMPLETE",
    "TELEMETRY // COORDINATES NOMINAL",
    "BATTERY // CORE DISSIPATION STATUS STABLE",
    "NETWORK // CLIENT PROTOCOLS LOADED",
    "DATABASE // PULLING INTEL DOSSIERS... 100%",
    "SYSTEM // VENTILATION SUBSYSTEM RUNNING",
    "STATUS // ALL UNITS NOMINAL",
    "SYS // ENCRYPTION KEYS ROTATED",
    "COMMS // ANTENNA ALIGNMENT 100%",
    "RADAR // 0 UNKNOWN CONTACTS DETECTED"
  ];

  if (logConsole) {
    setInterval(() => {
      // Add random tactical line
      const randomLine = logLines[Math.floor(Math.random() * logLines.length)];
      const lineEl = document.createElement('div');
      lineEl.className = 'log-line active-log';
      lineEl.textContent = `> ${randomLine}`;
      logConsole.appendChild(lineEl);
      
      // Remove older lines to keep it bounded
      while (logConsole.children.length > 5) {
        logConsole.removeChild(logConsole.firstChild);
      }
      
      // Remove active highlight from earlier log lines
      Array.from(logConsole.children).forEach((child, idx) => {
        if (child && idx < logConsole.children.length - 1) {
          child.classList.remove('active-log');
        }
      });
      
      // Auto scroll
      logConsole.scrollTop = logConsole.scrollHeight;
    }, 3500);
  }
});

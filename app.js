// app.js - Simplified logic for 32 Brigade Unit Selection Website

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Unit Details Data ---
  const unitData = {
    'unit-tayfun': {
      title: 'Элитное подразделение Тайфун',
      slogan: '«Сметаем любую оборону!»',
      specialty: 'Разведывательно-штурмовые операции особого назначения, прорыв укрепленных районов, диверсионная деятельность и ликвидация ключевых объектов противника.',
      tasks: 'Это главный стальной кулак 32-й бригады ВДВ. Бойцы «Тайфуна» действуют на самых сложных и опасных участках фронта. Они первыми заходят вглубь вражеских позиций, устраивают засады, захватывают стратегические точки и удерживают их до подхода основных сил, создавая для противника настоящий хаос и сокрушительный шквал огня.',
      color: '#00ffcc', // Neon Mint/Cyan
      glow: 'rgba(0, 255, 204, 0.25)',
      stats: { mobility: 80, firepower: 95, assault: 100 }
    },
    'unit-burevestnik': {
      title: 'Авиационная Группа «Буревестник»',
      slogan: '«Хозяева неба, защитники земли!»',
      specialty: 'Армейская авиация, воздушная транспортировка, десантирование, огневая поддержка с воздуха (CAS) и воздушная разведка.',
      tasks: 'Главные «крылья» бригады, обеспечивающие десантникам молниеносную мобильность. Пилоты «Буревестника» осуществляют выброску парашютистов, доставляют боеприпасы в самые горячие точки, эвакуируют раненых и прикрывают наземные отряды огнем бортовых пулеметов и неуправляемых ракет (НАР).',
      color: '#00a2ff', // Tactical Blue
      glow: 'rgba(0, 162, 255, 0.25)',
      stats: { mobility: 100, firepower: 75, assault: 50 }
    },
    'unit-berkut': {
      title: 'Артиллерийский отряд «Беркут»',
      slogan: '«Боги войны десантных полей!»',
      specialty: 'Артиллерийская поддержка, подавление закрытых огневых позиций противника, уничтожение укреплений и контрбатарейная борьба.',
      tasks: 'Бойцы «Беркута» обеспечивают мощный огневой вал. Они работают на дистанции: уничтожают блокпосты, подавляют пулеметные гнезда противника и засыпают снарядами укрепрайоны перед тем, как туда зайдет десантно-штурмовой отряд «Сапсан». В обороне «Беркут» способен отрезать пути подхода вражеских резервов, создавая сплошную зону поражения.',
      color: '#ffaa00', // Toxic Orange
      glow: 'rgba(255, 170, 0, 0.25)',
      stats: { mobility: 40, firepower: 100, assault: 70 }
    },
    'unit-sapsan': {
      title: 'Десантно-штурмовой отряд «Сапсан»',
      slogan: '«Быстрее ветра, сильнее бури!»',
      specialty: 'Воздушно-десантные штурмовые операции, захват укрепрайонов, ведение ближнего боя и штурм зданий.',
      tasks: 'Это главный атакующий кулак бригады. Бойцы «Сапсана» первыми десантируются на territory врага, прорывают линию обороны, зачищают ключевые объекты и удерживают их до подхода основных сил.',
      color: '#ff0066', // Neon Rose/Magenta
      glow: 'rgba(255, 0, 102, 0.25)',
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
        document.getElementById('unit-details-title').textContent = data.title;
        document.getElementById('unit-details-slogan').textContent = data.slogan;
        document.getElementById('unit-details-specialty').textContent = data.specialty;
        document.getElementById('unit-details-tasks').textContent = data.tasks;
        
        // Dynamically apply unit theme color signature to the card container
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
        
        detailsCard.style.display = 'block';
        void detailsCard.offsetHeight;
        detailsCard.style.opacity = '1';
        detailsCard.style.transform = 'translateY(0)';
        
        // Stagger visual fill of stats to look extremely high-end
        setTimeout(() => {
          mFill.style.width = `${data.stats.mobility}%`;
          fFill.style.width = `${data.stats.firepower}%`;
          aFill.style.width = `${data.stats.assault}%`;
          
          mVal.textContent = `${data.stats.mobility}%`;
          fVal.textContent = `${data.stats.firepower}%`;
          aVal.textContent = `${data.stats.assault}%`;
        }, 150);
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

  // --- 8. Dynamic Spotlight Hover Effect for Cards ---
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --- 9. Real-time Reactive 3D Smoke Background ---
  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-smoke-canvas';
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 28; // Optimized for rendering performance

  class SmokeParticle {
    constructor() {
      this.reset(true);
    }

    reset(init = false) {
      this.x = Math.random() * width;
      this.y = init ? Math.random() * height : height + Math.random() * 100;
      this.size = Math.random() * 200 + 150; // soft volumetric clouds
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = -Math.random() * 0.4 - 0.15; // slow drift upwards
      this.alpha = 0;
      this.maxAlpha = Math.random() * 0.08 + 0.03; // low opacity glow
      this.fadeSpeed = Math.random() * 0.003 + 0.001;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.0015;
      this.growing = true;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;

      if (this.growing) {
        this.alpha += this.fadeSpeed;
        if (this.alpha >= this.maxAlpha) {
          this.alpha = this.maxAlpha;
          this.growing = false;
        }
      }

      // Recycle when drifts off screen or goes transparent
      if (this.y < -this.size || this.x < -this.size || this.x > width + this.size) {
        this.reset();
      }
    }

    draw(colorRgb) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
      grad.addColorStop(0, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${this.alpha})`);
      grad.addColorStop(0.5, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${this.alpha * 0.35})`);
      grad.addColorStop(1, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0)`);
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new SmokeParticle());
  }

  // Hex to RGB parser
  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 255, b: 170 };
  }

  // Reactive color states
  let targetColorHex = '#00ffaa';
  let currentColorRgb = { r: 0, g: 255, b: 170 };

  window.setSmokeTargetColor = (hex) => {
    targetColorHex = hex;
  };

  function animateSmoke() {
    ctx.clearRect(0, 0, width, height);

    // Smooth color interpolations towards active unit accent
    const targetRgb = hexToRgb(targetColorHex);
    currentColorRgb.r += (targetRgb.r - currentColorRgb.r) * 0.025;
    currentColorRgb.g += (targetRgb.g - currentColorRgb.g) * 0.025;
    currentColorRgb.b += (targetRgb.b - currentColorRgb.b) * 0.025;

    particles.forEach(p => {
      p.update();
      p.draw(currentColorRgb);
    });

    requestAnimationFrame(animateSmoke);
  }

  animateSmoke();
});

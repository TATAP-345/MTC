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
  const particleCount = 75; // Increased density for richer visual volume

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

  // Mouse tracking for parallax 3D coordinate movement
  let mouseX = width / 2;
  let mouseY = height / 2;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Holographic floor-grid click ripples (3D perspective)
  const clickRipples = [];
  window.addEventListener('click', (e) => {
    // Avoid spawning waves when clicking buttons, links, or modals
    if (e.target.closest('button, a, .modal-content, .unit-btn')) return;
    
    clickRipples.push({
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      maxRadius: Math.max(width, height) * 0.4,
      alpha: 0.18,
      speed: 4
    });
  });

  // 3D Floating Dust Particles (Military Telemetry Debris)
  const dustParticles = [];
  const dustCount = 45;

  class DustParticle {
    constructor() {
      this.reset(true);
    }

    reset(init = false) {
      this.x = (Math.random() - 0.5) * width * 2;
      this.y = init ? Math.random() * height : height + 50;
      this.z = Math.random() * 400 + 100; // virtual 3D depth z-axis
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = -Math.random() * 0.5 - 0.25; // slow upward drift
      this.size = Math.random() * 1.8 + 0.8;
      this.alpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.y += this.vy;
      this.x += this.vx;

      // Recycle when drifts off screen
      if (this.y < -50 || this.x < -width || this.x > width * 2) {
        this.reset();
      }
    }

    draw(colorRgb) {
      const fl = 300; // focal length
      const scale = fl / (fl + this.z);
      const projX = width / 2 + this.x * scale;
      const projY = this.y;

      const currentSize = this.size * scale * 2;

      ctx.save();
      ctx.fillStyle = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${this.alpha * scale})`;
      ctx.shadowBlur = 6 * scale;
      ctx.shadowColor = `rgb(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b})`;
      ctx.beginPath();
      ctx.arc(projX, projY, currentSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Populate dust particles
  for (let i = 0; i < dustCount; i++) {
    dustParticles.push(new DustParticle());
  }

  // Reactive color states
  let targetColorHex = '#00ffaa';
  let currentColorRgb = { r: 0, g: 255, b: 170 };

  window.setSmokeTargetColor = (hex) => {
    targetColorHex = hex;
  };

  // Smooth interpolation values for mouse coordinates
  let interpMouseX = width / 2;
  let interpMouseY = height / 2;

  function animateSmoke() {
    ctx.clearRect(0, 0, width, height);

    // Interpolate color changes
    const targetRgb = hexToRgb(targetColorHex);
    currentColorRgb.r += (targetRgb.r - currentColorRgb.r) * 0.025;
    currentColorRgb.g += (targetRgb.g - currentColorRgb.g) * 0.025;
    currentColorRgb.b += (targetRgb.b - currentColorRgb.b) * 0.025;

    // Interpolate mouse movements for smooth 3D tilting
    interpMouseX += (mouseX - interpMouseX) * 0.04;
    interpMouseY += (mouseY - interpMouseY) * 0.04;

    const horizonY = height * 0.4 + (interpMouseY - height / 2) * 0.06;
    const vanishingX = width / 2 + (interpMouseX - width / 2) * 0.06;

    // 1. Draw 3D Perspective Grid
    ctx.strokeStyle = `rgba(${currentColorRgb.r}, ${currentColorRgb.g}, ${currentColorRgb.b}, 0.045)`;
    ctx.lineWidth = 1;

    // Longitudinal grid lines
    const gridLinesCount = 18;
    for (let i = 0; i <= gridLinesCount; i++) {
      const fraction = i / gridLinesCount;
      const xEnd = (fraction - 0.5) * width * 3 + width / 2;
      ctx.beginPath();
      ctx.moveTo(vanishingX, horizonY);
      ctx.lineTo(xEnd, height);
      ctx.stroke();
    }

    // Lateral grid lines moving forward
    const gridOffset = (Date.now() * 0.035) % 60;
    const lateralCount = 9;
    for (let j = 0; j < lateralCount; j++) {
      const progress = j / lateralCount;
      const currentY = horizonY + (height - horizonY) * Math.pow(progress, 2.2);
      const animatedY = currentY + gridOffset * progress;
      if (animatedY <= height) {
        ctx.beginPath();
        ctx.moveTo(0, animatedY);
        ctx.lineTo(width, animatedY);
        ctx.stroke();
      }
    }

    // 2. Draw Holographic Circular Radar Scans
    const radarTime = Date.now() * 0.0003;
    ctx.strokeStyle = `rgba(${currentColorRgb.r}, ${currentColorRgb.g}, ${currentColorRgb.b}, 0.025)`;
    for (let r = 1; r <= 3; r++) {
      const radius = ((radarTime + r / 3) % 1) * Math.max(width, height) * 0.45;
      ctx.beginPath();
      ctx.arc(vanishingX, horizonY, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 2.5 Draw 3D floor perspective click ripples
    for (let i = clickRipples.length - 1; i >= 0; i--) {
      const rip = clickRipples[i];
      rip.radius += rip.speed;
      rip.alpha -= 0.003; // fade out

      if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
        clickRipples.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(rip.x, rip.y);
      ctx.scale(1, 0.4); // flat floor perspective scaling
      ctx.strokeStyle = `rgba(${currentColorRgb.r}, ${currentColorRgb.g}, ${currentColorRgb.b}, ${rip.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, rip.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // 2.7 Draw 3D Floating Dust Embers (Drifting particles with perspective sizing)
    dustParticles.forEach(d => {
      d.update();
      d.draw(currentColorRgb);
    });

    // 3. Draw Volumetric Smoke Clouds on top
    particles.forEach(p => {
      p.update();
      p.draw(currentColorRgb);
    });

    requestAnimationFrame(animateSmoke);
  }

  animateSmoke();

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

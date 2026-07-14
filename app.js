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
  // --- 9. WebGL 3D Tactical Wireframe Terrain Background ---
  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-smoke-canvas';
  document.body.insertBefore(canvas, document.body.firstChild);

  // Set up Three.js WebGL components
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 10, 32);
  camera.lookAt(0, 4, 0);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Custom materials for wireframe rendering
  let targetColorHex = '#00ffaa';
  let currentHex = '#00ffaa';

  const battlefieldMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(currentHex),
    wireframe: true,
    transparent: true,
    opacity: 0.12
  });

  // 2. Procedural 3D Battlefield Terrain & Obstacles Group
  const battlefieldGroup = new THREE.Group();

  // Create rolling terrain with craters using PlaneGeometry
  const terrainGeo = new THREE.PlaneGeometry(160, 160, 32, 32);
  const pos = terrainGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    
    // Generate elevations (hills, valleys, trenches)
    let zVal = Math.sin(x * 0.05) * Math.cos(y * 0.05) * 6; // base hills
    zVal += Math.sin(x * 0.12) * 1.5; // details
    
    // Crater 1 near the center-left
    const dx1 = x - (-10);
    const dy1 = y - (-15);
    const dist1 = Math.sqrt(dx1*dx1 + dy1*dy1);
    if (dist1 < 25) {
      zVal -= (25 - dist1) * 0.35;
    }

    // Crater 2 center-right
    const dx2 = x - 20;
    const dy2 = y - 10;
    const dist2 = Math.sqrt(dx2*dx2 + dy2*dy2);
    if (dist2 < 20) {
      zVal -= (20 - dist2) * 0.3;
    }

    pos.setZ(i, zVal);
  }
  terrainGeo.computeVertexNormals();
  terrainGeo.rotateX(-Math.PI / 2); // Lay flat

  const terrainMesh = new THREE.Mesh(terrainGeo, battlefieldMaterial);
  terrainMesh.position.y = -8;
  battlefieldGroup.add(terrainMesh);

  // Helper function to create a wireframe Czech Hedgehog (противотанковый еж)
  function createHedgehog(size = 3.0) {
    const hhGroup = new THREE.Group();
    const beamGeo = new THREE.BoxGeometry(size, size * 0.12, size * 0.12);
    
    const b1 = new THREE.Mesh(beamGeo, battlefieldMaterial);
    
    const b2 = new THREE.Mesh(beamGeo, battlefieldMaterial);
    b2.rotation.y = Math.PI / 2;
    b2.rotation.z = Math.PI / 4;
    
    const b3 = new THREE.Mesh(beamGeo, battlefieldMaterial);
    b3.rotation.z = -Math.PI / 4;
    b3.rotation.x = Math.PI / 4;
    
    hhGroup.add(b1, b2, b3);
    return hhGroup;
  }

  // Scattered hedgehogs
  const hedgehogs = [
    { x: -15, y: -7.5, z: -15, scale: 0.9 },
    { x: 12, y: -7.2, z: -25, scale: 1.1 },
    { x: -5, y: -7.8, z: -8, scale: 0.8 },
    { x: 22, y: -7.6, z: -12, scale: 1.0 },
    { x: -28, y: -7.0, z: -35, scale: 1.2 }
  ];

  hedgehogs.forEach(cfg => {
    const hh = createHedgehog(3.0 * cfg.scale);
    hh.position.set(cfg.x, cfg.y, cfg.z);
    hh.rotation.set(Math.random() * 0.2, Math.random() * 6.28, Math.random() * 0.2);
    battlefieldGroup.add(hh);
  });

  // Simple wireframe tactical defense watchtower/antenna
  const towerGeo = new THREE.ConeGeometry(2, 12, 4);
  const towerMesh = new THREE.Mesh(towerGeo, battlefieldMaterial);
  towerMesh.position.set(-25, -2, -30);
  battlefieldGroup.add(towerMesh);

  const towerGeo2 = new THREE.ConeGeometry(1.5, 9, 4);
  const towerMesh2 = new THREE.Mesh(towerGeo2, battlefieldMaterial);
  towerMesh2.position.set(28, -3.5, -28);
  battlefieldGroup.add(towerMesh2);

  scene.add(battlefieldGroup);

  // 3. Battlefield Tracer Rounds (Dynamic glowing lines shooting across the scene)
  const tracerCount = 8;
  const tracers = [];
  const tracerMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color(currentHex),
    transparent: true,
    opacity: 0.8
  });

  for (let i = 0; i < tracerCount; i++) {
    const tracerGeo = new THREE.BufferGeometry();
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0)
    ];
    tracerGeo.setFromPoints(points);
    const tracerLine = new THREE.Line(tracerGeo, tracerMaterial);
    
    // Custom properties
    const item = {
      line: tracerLine,
      start: new THREE.Vector3(),
      end: new THREE.Vector3(),
      progress: 1.0, // start finished to trigger reset
      speed: 0.03 + Math.random() * 0.04
    };
    
    scene.add(tracerLine);
    tracers.push(item);
  }

  // 3. Create 3D Telemetry Embers (Floating sparks)
  const particlesCount = 120;
  const particlesGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 80;
    positions[i + 1] = Math.random() * 40 - 15;
    positions[i + 2] = (Math.random() - 0.5) * 80;
  }

  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const pMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(currentHex),
    size: 0.35,
    transparent: true,
    opacity: 0.45,
    sizeAttenuation: true
  });

  const particleSystem = new THREE.Points(particlesGeo, pMaterial);
  scene.add(particleSystem);

  // Global callback to change colors
  window.setSmokeTargetColor = (hex) => {
    targetColorHex = hex;
  };

  // Mouse camera tilt parameters
  let mouseX = 0;
  let mouseY = 0;
  let targetCameraX = 0;
  let targetCameraY = 8;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    targetCameraX = mouseX * 8;
    targetCameraY = 8 - mouseY * 4;
  });

  // Handle window resizing
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();

  function animate3D() {
    requestAnimationFrame(animate3D);

    const elapsedTime = clock.getElapsedTime();

    // Update tracer rounds
    tracers.forEach(t => {
      t.progress += t.speed;
      if (t.progress >= 1.0) {
        // Reset tracer to a new random trajectory
        t.progress = 0;
        t.speed = 0.015 + Math.random() * 0.025;
        
        // Spawn tracer flying across the battlefield
        const startX = (Math.random() - 0.5) * 80;
        const startY = -6 + Math.random() * 12;
        const startZ = -60 - Math.random() * 20;
        t.start.set(startX, startY, startZ);
        
        // Flight vector: goes forward (towards screen) and slightly sideways/up
        const endX = startX + (Math.random() - 0.5) * 50;
        const endY = startY + 5 + Math.random() * 15;
        const endZ = 10 + Math.random() * 20;
        t.end.set(endX, endY, endZ);
      }
      
      // Interpolate current position and draw a segment trail
      const currentPos = new THREE.Vector3().lerpVectors(t.start, t.end, t.progress);
      // The trail goes backwards from current position
      const trailBack = Math.max(0, t.progress - 0.08);
      const trailPos = new THREE.Vector3().lerpVectors(t.start, t.end, trailBack);
      
      const pts = [trailPos, currentPos];
      t.line.geometry.setFromPoints(pts);
      t.line.geometry.attributes.position.needsUpdate = true;
    });

    // Slow battlefield scene drone-like scanning animation (slight rotation/pan)
    battlefieldGroup.rotation.y = Math.sin(elapsedTime * 0.1) * 0.08;

    // Float embers upwards inside the scene
    const pPositions = particlesGeo.attributes.position.array;
    for (let i = 1; i < pPositions.length; i += 3) {
      pPositions[i] += 0.035;
      if (pPositions[i] > 25) {
        pPositions[i] = -15;
      }
    }
    particlesGeo.attributes.position.needsUpdate = true;

    // Mouse camera parallax easing
    camera.position.x += (targetCameraX - camera.position.x) * 0.04;
    camera.position.y += (targetCameraY - camera.position.y) * 0.04;
    camera.lookAt(0, 1, -10);

    // Color transition interpolation
    const currCol = battlefieldMaterial.color;
    const targetCol = new THREE.Color(targetColorHex);
    currCol.r += (targetCol.r - currCol.r) * 0.035;
    currCol.g += (targetCol.g - currCol.g) * 0.035;
    currCol.b += (targetCol.b - currCol.b) * 0.035;
    
    // Copy color to other materials
    pMaterial.color.copy(currCol);
    battlefieldMaterial.color.copy(currCol);
    tracerMaterial.color.copy(currCol);

    renderer.render(scene, camera);
  }

  animate3D();


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

// ── Animated Stat Counters ──────────────────────────────────
// Ticks up each counter from 0 to its data-target value when it enters the viewport
(function initCounters() {
  const counters = document.querySelectorAll('.stat-counter-num');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600; // ms
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
})();


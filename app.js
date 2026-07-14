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

  const tankMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(currentHex),
    wireframe: true,
    transparent: true,
    opacity: 0.26
  });

  const hangarMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(currentHex),
    wireframe: true,
    transparent: true,
    opacity: 0.08
  });

  // 1. Procedural 3D T-90 Tank Group (Holographic blueprint style)
  const tankGroup = new THREE.Group();

  // Tank Hull (Корпус)
  const hullGeo = new THREE.BoxGeometry(7.2, 1.3, 11.5);
  const hull = new THREE.Mesh(hullGeo, tankMaterial);
  hull.position.y = 0.65;
  tankGroup.add(hull);

  // Tank Turret (Башня Т-90)
  const turretGeo = new THREE.BoxGeometry(4.2, 1.1, 4.8);
  const turret = new THREE.Mesh(turretGeo, tankMaterial);
  turret.position.set(0, 1.85, -0.6);
  tankGroup.add(turret);

  // Tank Gun Barrel (Пушка)
  const barrelGeo = new THREE.CylinderGeometry(0.12, 0.12, 7.8, 8);
  const barrel = new THREE.Mesh(barrelGeo, tankMaterial);
  barrel.rotation.x = Math.PI / 2; // point forward
  barrel.position.set(0, 1.85, 3.8); // shift forward
  tankGroup.add(barrel);

  // Tracks Left & Right (Гусеницы)
  const trackGeo = new THREE.BoxGeometry(1.3, 1.25, 11);
  const trackL = new THREE.Mesh(trackGeo, tankMaterial);
  trackL.position.set(-3.5, 0.6, 0);
  const trackR = new THREE.Mesh(trackGeo, tankMaterial);
  trackR.position.set(3.5, 0.6, 0);
  tankGroup.add(trackL);
  tankGroup.add(trackR);

  // Road Wheels (Катки) inside tracks
  const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.4, 8);
  for (let zOffset = -4.8; zOffset <= 4.8; zOffset += 1.92) {
    // Left Track Wheels
    const wL = new THREE.Mesh(wheelGeo, tankMaterial);
    wL.rotation.z = Math.PI / 2;
    wL.position.set(-3.5, 0.5, zOffset);
    tankGroup.add(wL);

    // Right Track Wheels
    const wR = new THREE.Mesh(wheelGeo, tankMaterial);
    wR.rotation.z = Math.PI / 2;
    wR.position.set(3.5, 0.5, zOffset);
    tankGroup.add(wR);
  }

  // Adjust tank position inside hangar
  tankGroup.position.set(0, -6.5, -4);
  scene.add(tankGroup);

  // 2. Procedural 3D Hangar Group (Ангар)
  const hangarGroup = new THREE.Group();

  // Hangar Floor Grid
  const floorGrid = new THREE.GridHelper(130, 42, new THREE.Color(currentHex), new THREE.Color(currentHex));
  floorGrid.position.y = -6.5;
  hangarGroup.add(floorGrid);

  // Arched Roof Support Beams (5 structural arches)
  const archRadius = 26;
  const archHeightOffset = -6.5; // floor level align
  for (let z = -50; z <= 50; z += 20) {
    const points = [];
    const segments = 24;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI; // semicircle
      const x = Math.cos(theta) * archRadius;
      const y = Math.sin(theta) * archRadius + archHeightOffset;
      points.push(new THREE.Vector3(x, y, z));
    }
    const archGeo = new THREE.BufferGeometry().setFromPoints(points);
    const archLine = new THREE.Line(archGeo, hangarMaterial);
    hangarGroup.add(archLine);

    // Vertical structural columns
    const colGeo = new THREE.BoxGeometry(0.8, 22, 0.8);
    const colL = new THREE.Mesh(colGeo, hangarMaterial);
    colL.position.set(-archRadius, 4.5, z);
    const colR = new THREE.Mesh(colGeo, hangarMaterial);
    colR.position.set(archRadius, 4.5, z);
    hangarGroup.add(colL);
    hangarGroup.add(colR);
  }
  scene.add(hangarGroup);

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

    // Slow horizontal scanning rotation for T-90 tank turret / hull
    tankGroup.rotation.y = Math.sin(elapsedTime * 0.22) * 0.28; // swivels left and right

    // Float embers upwards inside the hangar
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
    const currCol = tankMaterial.color;
    const targetCol = new THREE.Color(targetColorHex);
    currCol.r += (targetCol.r - currCol.r) * 0.035;
    currCol.g += (targetCol.g - currCol.g) * 0.035;
    currCol.b += (targetCol.b - currCol.b) * 0.035;
    
    // Copy color to other materials
    pMaterial.color.copy(currCol);
    hangarMaterial.color.copy(currCol);
    
    if (floorGrid.material) {
      floorGrid.material.color.copy(currCol);
      floorGrid.material.opacity = 0.06;
      floorGrid.material.transparent = true;
    }

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

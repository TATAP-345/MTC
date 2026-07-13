// app.js - Simplified logic for 32 Brigade Unit Selection Website

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Unit Details Data ---
  const unitData = {
    'unit-tayfun': {
      title: 'Элитное подразделение Тайфун',
      slogan: '«Сметаем любую оборону!»',
      specialty: 'Разведывательно-штурмовые операции особого назначения, прорыв укрепленных районов, диверсионная деятельность и ликвидация ключевых объектов противника.',
      tasks: 'Это главный стальной кулак 32-й бригады ВДВ. Бойцы «Тайфуна» действуют на самых сложных и опасных участках фронта. Они первыми заходят вглубь вражеских позиций, устраивают засады, захватывают стратегические точки и удерживают их до подхода основных сил, создавая для противника настоящий хаос и сокрушительный шквал огня.'
    },
    'unit-burevestnik': {
      title: 'Авиационная Группа «Буревестник»',
      slogan: '«Хозяева неба, защитники земли!»',
      specialty: 'Армейская авиация, воздушная транспортировка, десантирование, огневая поддержка с воздуха (CAS) и воздушная разведка.',
      tasks: 'Главные «крылья» бригады, обеспечивающие десантникам молниеносную мобильность. Пилоты «Буревестника» осуществляют выброску парашютистов, доставляют боеприпасы в самые горячие точки, эвакуируют раненых и прикрывают наземные отряды огнем бортовых пулеметов и неуправляемых ракет (НАР).'
    },
    'unit-berkut': {
      title: 'Артиллерийский отряд «Беркут»',
      slogan: '«Боги войны десантных полей!»',
      specialty: 'Артиллерийская поддержка, подавление закрытых огневых позиций противника, уничтожение укреплений и контрбатарейная борьба.',
      tasks: 'Бойцы «Беркута» обеспечивают мощный огневой вал. Они работают на дистанции: уничтожают блокпосты, подавляют пулеметные гнезда противника и засыпают снарядами укрепрайоны перед тем, как туда зайдет десантно-штурмовой отряд «Сапсан». В обороне «Беркут» способен отрезать пути подхода вражеских резервов, создавая сплошную зону поражения.'
    },
    'unit-sapsan': {
      title: 'Десанттно Штурмовой Отряд «Сапсан»',
      slogan: '«Быстрота, натиск, победа!»',
      specialty: 'Молниеносные штурмовые операции, захват плацдармов, десантирование в тыл противника.',
      tasks: 'Проведение стремительных рейдов, блокирование путей отступления противника и ведение маневренных наступательных боевых действий в любых условиях.'
    }
  };

  // Set theme to dark
  document.documentElement.setAttribute('data-theme', 'dark');

  // --- 2. Unit Buttons Click Interactions & Details Display ---
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

      // Render details dynamically with smooth transition
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
});

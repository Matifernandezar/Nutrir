const PHONE = '5493875848383';

const catalog = {
  withFruit: [
    {
      name: 'Yogur griego 150 g',
      description: 'Presentación individual con colchón de frutilla.',
      badge: 'Con frutilla',
      meta: ['150 g', 'Colchón de frutilla'],
      visual: 'cup-fruit'
    },
    {
      name: 'Yogur griego 250 g',
      description: 'Más cantidad, con colchón de frutilla.',
      badge: 'Con frutilla',
      meta: ['250 g', 'Colchón de frutilla'],
      visual: 'cup-fruit'
    }
  ],
  plain: [
    {
      name: 'Yogur griego 250 g',
      description: 'Sin colchón y sin azúcar agregada.',
      badge: 'Natural',
      meta: ['250 g', 'Sin colchón', 'Sin azúcar agregada'],
      visual: 'cup'
    },
    {
      name: 'Yogur griego 350 g',
      description: 'Sin colchón y sin azúcar agregada.',
      badge: 'Natural',
      meta: ['350 g', 'Sin colchón', 'Sin azúcar agregada'],
      visual: 'cup'
    },
    {
      name: 'Yogur griego 500 g',
      description: 'Sin colchón y sin azúcar agregada.',
      badge: 'Natural',
      meta: ['500 g', 'Sin colchón', 'Sin azúcar agregada'],
      visual: 'cup'
    },
    {
      name: 'Yogur griego King 3 kg',
      description: 'Formato grande sin frutas.',
      badge: 'King',
      meta: ['3 kg', 'Sin frutas'],
      visual: 'cup'
    }
  ],
  other: [
    {
      name: 'Kéfir de agua',
      description: 'Presentación de 500 ml.',
      badge: 'Fermentado',
      meta: ['500 ml'],
      visual: 'kefir'
    },
    {
      name: 'Vinagre orgánico de sidra de manzana',
      description: 'Presentación de 500 ml.',
      badge: 'Orgánico',
      meta: ['500 ml', 'Sidra de manzana'],
      visual: 'vinegar'
    }
  ]
};

function waUrl(message) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

function visualMarkup(type) {
  if (type === 'kefir') {
    return `<div class="visual-bottle"><div class="cap"></div><div class="body"><div><strong>Nutrir</strong><br><small>Kéfir de agua</small></div></div></div>`;
  }
  if (type === 'vinegar') {
    return `<div class="visual-bottle vinegar"><div class="cap"></div><div class="body"><div><strong>Nutrir</strong><br><small>Vinagre orgánico</small></div></div></div>`;
  }
  const fruitClass = type === 'cup-fruit' ? ' fruit' : '';
  return `<div class="visual-cup${fruitClass}"><div class="lid"></div><div class="body"><strong>Nutrir</strong><small>Yogur griego</small></div></div>`;
}

function cardMarkup(item) {
  const message = `Hola Nutrir, quisiera consultar por ${item.name}${item.meta.includes('Colchón de frutilla') ? ' con colchón de frutilla' : ''}.`;
  return `
    <article class="product-card">
      <div class="product-visual">
        <span class="product-pill">${item.badge}</span>
        ${visualMarkup(item.visual)}
      </div>
      <div class="product-content">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <div class="product-meta">${item.meta.map(tag => `<span>${tag}</span>`).join('')}</div>
        <a class="btn btn-primary" href="${waUrl(message)}" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp</a>
      </div>
    </article>`;
}

function renderCatalog() {
  document.getElementById('withFruitGrid').innerHTML = catalog.withFruit.map(cardMarkup).join('');
  document.getElementById('plainGrid').innerHTML = catalog.plain.map(cardMarkup).join('');
  document.getElementById('otherGrid').innerHTML = catalog.other.map(cardMarkup).join('');
}

function wireWhatsAppLinks() {
  document.querySelectorAll('.whatsapp-link').forEach(link => {
    const message = link.dataset.message || 'Hola Nutrir, quisiera consultar por sus productos.';
    link.href = waUrl(message);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

function wireMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

function wireReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

renderCatalog();
wireWhatsAppLinks();
wireMenu();
wireReveal();
document.getElementById('year').textContent = new Date().getFullYear();

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

function renderRetailers() {
  const anchor = document.getElementById('como-comprar');
  if (!anchor || document.getElementById('puntos-de-venta')) return;

  const section = document.createElement('section');
  section.className = 'retailers-section section-pad';
  section.id = 'puntos-de-venta';
  section.innerHTML = `
    <div class="container">
      <div class="section-heading reveal">
        <span class="eyebrow">Puntos de venta</span>
        <h2>También encontrá Nutrir en Salta</h2>
        <p>Además de pedir directamente por WhatsApp, nuestros productos ya están disponibles en puntos de venta seleccionados de Salta Capital.</p>
      </div>
      <div class="retailers-grid">
        <article class="retailer-card reveal">
          <div class="retailer-logo-wrap"><img src="./assets/kabadra.svg" alt="Logo de Kabadra Training Club" loading="lazy"></div>
          <div class="retailer-copy">
            <span class="retailer-kicker">Punto de venta</span>
            <h3>Kabadra Training Club</h3>
            <p>Encontrá productos Nutrir en este punto de venta de Salta Capital.</p>
          </div>
        </article>
        <article class="retailer-card reveal">
          <div class="retailer-logo-wrap"><img src="./assets/raiz.svg" alt="Logo de Raíz" loading="lazy"></div>
          <div class="retailer-copy">
            <span class="retailer-kicker">Punto de venta</span>
            <h3>Raíz</h3>
            <p>Encontrá productos Nutrir en este punto de venta de Salta Capital.</p>
          </div>
        </article>
      </div>
      <div class="retailers-note reveal">
        <strong>¿Querés saber qué productos hay disponibles?</strong>
        <span>Consultanos por WhatsApp antes de acercarte.</span>
        <a class="btn btn-primary whatsapp-link" href="#" data-message="Hola Nutrir, quisiera consultar qué productos están disponibles en los puntos de venta.">Consultar disponibilidad</a>
      </div>
    </div>`;

  anchor.parentNode.insertBefore(section, anchor);

  const style = document.createElement('style');
  style.textContent = `
    .retailers-section{background:#fffdf8}
    .retailers-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;max-width:920px;margin:0 auto}
    .retailer-card{background:#fff;border:1px solid var(--line);border-radius:28px;padding:28px;display:grid;grid-template-columns:160px 1fr;align-items:center;gap:26px;box-shadow:0 14px 42px rgba(31,81,56,.07)}
    .retailer-logo-wrap{aspect-ratio:1;border-radius:50%;overflow:hidden;background:#f4f4ef;border:1px solid var(--line)}
    .retailer-logo-wrap img{width:100%;height:100%;object-fit:cover;display:block}
    .retailer-kicker{font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:var(--green-700)}
    .retailer-copy h3{font:700 30px/1.08 Georgia,serif;color:var(--green-900);margin:7px 0 10px}
    .retailer-copy p{margin:0;color:var(--muted);font-size:14px}
    .retailers-note{max-width:920px;margin:22px auto 0;padding:20px 22px;border-radius:20px;background:var(--green-50);display:flex;align-items:center;gap:14px;flex-wrap:wrap}
    .retailers-note strong{color:var(--green-900)}
    .retailers-note span{color:var(--muted);font-size:14px;flex:1}
    .retailers-note .btn{min-height:44px}
    @media(max-width:820px){
      .retailers-grid{grid-template-columns:1fr}
      .retailer-card{grid-template-columns:110px 1fr;padding:22px}
      .retailer-copy h3{font-size:26px}
    }
    @media(max-width:480px){
      .retailer-card{grid-template-columns:84px 1fr;gap:16px;padding:18px}
      .retailer-copy h3{font-size:23px}
      .retailer-copy p{font-size:13px}
      .retailers-note{align-items:stretch}
      .retailers-note .btn{width:100%}
    }`;
  document.head.appendChild(style);

  const nav = document.getElementById('mainNav');
  if (nav && !nav.querySelector('a[href="#puntos-de-venta"]')) {
    const link = document.createElement('a');
    link.href = '#puntos-de-venta';
    link.textContent = 'Dónde comprar';
    const cta = nav.querySelector('.nav-cta');
    nav.insertBefore(link, cta || null);
  }
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
renderRetailers();
wireWhatsAppLinks();
wireMenu();
wireReveal();
document.getElementById('year').textContent = new Date().getFullYear();

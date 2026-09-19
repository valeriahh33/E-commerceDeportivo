document.addEventListener('DOMContentLoaded', () => {

  const iconos = document.createElement('link');
  iconos.rel = 'stylesheet';
  iconos.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css';
  document.head.appendChild(iconos);

  const menuToggle = document.getElementById('menu-toggle');
  const menuPrincipal = document.getElementById('menu-principal');

  if (menuToggle && menuPrincipal) {
    menuToggle.addEventListener('click', () => {
      const abierto = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!abierto));
      menuPrincipal.classList.toggle('nav__lista--abierta');
    });

    menuPrincipal.querySelectorAll('.nav__link').forEach((enlace) => {
      enlace.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuPrincipal.classList.remove('nav__lista--abierta');
      });
    });
  }

  const botonSaludo = document.createElement('button');
  botonSaludo.id = 'boton-saludo';
  botonSaludo.type = 'button';
  botonSaludo.innerHTML = '<i class="bi bi-emoji-smile"></i>';
  botonSaludo.setAttribute('aria-label', 'Saludar');

  botonSaludo.addEventListener('click', () => {
    const hora = new Date().getHours();
    let momento = 'Buenas noches';
    if (hora >= 6 && hora < 12) momento = 'Buenos días';
    else if (hora >= 12 && hora < 19) momento = 'Buenas tardes';
    alert(`${momento} ¡Bienvenido/a a ORBITA!`);
  });

  const botonModo = document.createElement('button');
  botonModo.id = 'boton-modo';
  botonModo.type = 'button';
  botonModo.setAttribute('aria-label', 'Cambiar modo oscuro o claro');

  const estilosModo = document.createElement('style');
  estilosModo.textContent = `
    #boton-saludo,
    #boton-modo {
      order: 0;
      display: inline-grid;
      place-items: center;
      width: 44px;
      height: 44px;
      margin-left: 0.5rem;
      border: 2px solid var(--tinta);
      border-radius: 50%;
      background: transparent;
      font-size: 1.1rem;
      color: var(--tinta);
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
    }
    #boton-saludo:hover,
    #boton-modo:hover {
      background: var(--tinta);
      color: var(--blanco);
    }
    body.modo-oscuro {
      background: var(--tinta);
      color: var(--papel);
    }
    body.modo-oscuro .header,
    body.modo-oscuro .destacados,
    body.modo-oscuro .confianza,
    body.modo-oscuro .nav {
      background: var(--tinta);
      color: var(--papel);
      border-color: rgba(255, 255, 255, 0.2);
    }
    body.modo-oscuro .nav__link,
    body.modo-oscuro .logo,
    body.modo-oscuro .carrito-btn,
    body.modo-oscuro .menu-toggle,
    body.modo-oscuro #boton-saludo,
    body.modo-oscuro #boton-modo {
      color: var(--papel);
      border-color: var(--papel);
    }
    body.modo-oscuro .confianza__item p {
      color: rgba(237, 241, 240, 0.75);
    }
  `;
  document.head.appendChild(estilosModo);

  function aplicarModo(oscuro) {
    document.body.classList.toggle('modo-oscuro', oscuro);
    botonModo.innerHTML = oscuro
      ? '<i class="bi bi-sun"></i>'
      : '<i class="bi bi-moon-stars"></i>';
    localStorage.setItem('orbita-modo', oscuro ? 'oscuro' : 'claro');
  }

  const modoGuardado = localStorage.getItem('orbita-modo');
  const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  aplicarModo(modoGuardado ? modoGuardado === 'oscuro' : prefiereOscuro);

  botonModo.addEventListener('click', () => {
    aplicarModo(!document.body.classList.contains('modo-oscuro'));
  });

  const carritoBtn = document.getElementById('carrito-btn');
  if (carritoBtn && carritoBtn.parentElement) {
    carritoBtn.insertAdjacentElement('afterend', botonModo);
    carritoBtn.insertAdjacentElement('afterend', botonSaludo);
  }

});

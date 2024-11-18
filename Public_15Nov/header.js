// Importing the common.js file to handle the DOM ready event and render the section.
import { onDOMReady, renderCreationFunction } from './common.js';

// Initialize the section when DOM is ready.
onDOMReady(() => {
  renderCreationFunction(createHeaderSection, 'header');
});

function createHeaderSection() {
  const headerSection = document.createElement('header');
  headerSection.className = 'header-section';
  headerSection.innerHTML = `
    <header>
      <div class="header-section-content">
      </div>
    </header>
  `;

  const content = headerSection.querySelector('.header-section-content');
  content.append(
    createHeaderImages(),
    createNavigationWrapper() 
  );

  return headerSection;
}

function createNavigationWrapper() {
  const wrapper = document.createElement('div');
  wrapper.className = 'header-navigation-wrapper';
  
  wrapper.append(
    createHeaderNavigation(),
    createHamburgerIcon()
  );

  return wrapper;
}

function createHeaderImages() {
  const logos = [
    { class: 'logo-mini-icon', src: '../src/imagery/variousIcons/minilogo.png', alt: 'Logo mini', href: './lobby.html' },
    { class: 'logo-text-icon', src: '../src/imagery/variousIcons/logo.png', alt: 'Logo text', href: './lobby.html' }
  ];

  function createLogo(logo) {
    return `
      <img 
        class="${logo.class}" 
        src="${logo.src}" 
        alt="${logo.alt}"
        onclick="window.location.href='${logo.href}'"
      >
    `;
  }

  const logoSection = document.createElement('div');
  logoSection.className = 'header-section-content-logos';
  logoSection.innerHTML = logos.map(createLogo).join('');

  return logoSection;
}

function createHamburgerIcon() {
  const hamburger = document.createElement('div');
  hamburger.className = 'hamburger-container';
  hamburger.innerHTML = `
    <img 
      src="../src/imagery/ico/burger-bar.svg"
      alt="Hamburger icon"
      class="hamburger-icon"
    >
    <div class="mobile-dropdown-menu">
      <div class="header-section-content-navigation">
        ${createHeaderNavigation().innerHTML}
      </div>
    </div>
  `;

  // Check the current viewport width and display the menu or alert accordingly.
  function displayMenuOrAlert() {
    const hamburgerImg = hamburger.querySelector('img');
    
    if (window.innerWidth <= 430) {
      const dropdownMenu = hamburger.querySelector('.mobile-dropdown-menu');
      dropdownMenu.classList.toggle('show');
      hamburgerImg.classList.toggle('active');
    } else {
      alert('This feature is only available on mobile');
    }
  }

  hamburger.addEventListener('click', displayMenuOrAlert);

  return hamburger;
}


// Creating anchors and buttons
function createHeaderNavigation() {
  const anchors = [
    { class: 'games-link', href: './all-games.html', content: 'GAMES' },
    { class: 'promotions-link', href: './promotions.html', content: 'PROMOTIONS' },
    { class: 'contact-us-link', href: './contact-us.html', content: 'CONTACT US' },
    { class: 'about-link', href: './about.html', content: 'ABOUT' },
    { class: 'help-center-link', href: './help-center.html', content: 'HELP CENTER' }
  ];

  const buttons = [
    { class: 'login-button', href: './login.html', content: 'LOGIN' },
    { class: 'signup-button', href: './sign-up.html', content: 'SIGN UP' }
  ];

  function createAnchor(anchor) {
    return `
      <a 
        class="${anchor.class}" 
        href="${anchor.href}"
      >${anchor.content}</a>
    `;
  }

  function createButton(button) {
    return `
      <button 
        class="${button.class}"
        onclick="window.location.href='${button.href}'"
      >${button.content}</button>
    `;
  }

  const navigationSection = document.createElement('div');
  navigationSection.className = 'header-section-content-navigation';
  navigationSection.innerHTML = `
    ${anchors.map(createAnchor).join('')}
    ${buttons.map(createButton).join('')}
  `;

  return navigationSection;
}

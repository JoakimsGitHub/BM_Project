// Importing the common.js file to handle the DOM ready event and render the section.
import { onDOMReady, renderCreationFunction } from './common.js';

// Initialize the section when DOM is ready.
onDOMReady(() => {
  renderCreationFunction(createFooterSection, 'footer');
});

async function createFooterSection() {
  const footerSection = document.createElement('footer');
  footerSection.className = 'footer-section';
  footerSection.innerHTML = `
    <div class="footer-section-content"></div>
  `;

  const contentSection = footerSection.querySelector('.footer-section-content');
  contentSection.append(
    createFooterText(),
  );

  return footerSection;
}

function createFooterText() {
  const footerContentSection = document.createElement('div');
  footerContentSection.className = 'footer-text-section';
  footerContentSection.innerHTML = `
    <div class="footer-text-section-content">
    <div class="footer-text-section-content-textbox">
      <h2>FOOTER</h2>
    </div>
    </div>
  `;

  return footerContentSection;
}


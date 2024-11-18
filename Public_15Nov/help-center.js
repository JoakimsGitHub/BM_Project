
// Importing the common.js file to handle the DOM ready event and render the section.
import { onDOMReady, renderCreationFunction } from './common.js';

// Initialize the section when DOM is ready.
onDOMReady(() => {
  renderCreationFunction(createHelpCenterSection, 'help-center');
});

async function createHelpCenterSection() {
  const helpCenterSection = document.createElement('div');
  helpCenterSection.className = 'help-center-section';
  helpCenterSection.innerHTML = `
    <div class="help-center-section-content"></div>
  `;

  const contentSection = helpCenterSection.querySelector('.help-center-section-content');

  contentSection.append(
    createTextSection(),
  );

  return helpCenterSection;
}

function createTextSection() {
  const textSection = document.createElement('div');
  textSection.className = 'text-section';
  textSection.innerHTML = `
   <div class="text-section-content">
   <h2></h2>
   <p></p>
   </div>
    `;
    
  return textSection;
}
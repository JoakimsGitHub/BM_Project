
// Importing the common.js file to handle the DOM ready event and render the section.
import { onDOMReady, renderCreationFunction } from './common.js';

// Initialize the section when DOM is ready.
onDOMReady(() => {
  renderCreationFunction(createHomeSection, 'home');
});

async function createHomeSection() {
  const homeSection = document.createElement('div');
  homeSection.className = 'home-section';
  homeSection.innerHTML = `
    <div class="home-section-content"></div>
  `;

  const contentSection = homeSection.querySelector('.home-section-content');

  contentSection.append(
    createTextSection(),
  );

  return homeSection;
}
 
function createTextSection() {
  const textSection = document.createElement('div');
  textSection.className = 'text-section';
  textSection.innerHTML = `
   <div class="text-section-content">
   <h2>HOME</h2>
   <p>More content is coming soon!</p>
   </div>
    `;
    
  return textSection;
}

import { onDOMReady, renderCreationFunction } from './common.js';

onDOMReady(() => {
  renderCreationFunction(createAboutSection, 'about');
});
 
 async function createAboutSection() {
   const aboutSection = document.createElement('div');
   aboutSection.className = 'about-section';
   aboutSection.innerHTML = `
     <div class="about-section-content"></div>
   `;
 
   const contentSection = aboutSection.querySelector('.about-section-content');
 
   contentSection.append(
     createTextSection(),
   );
 
   return aboutSection;
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
 
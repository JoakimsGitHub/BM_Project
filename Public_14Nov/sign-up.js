import { onDOMReady, renderCreationFunction } from './common.js';

onDOMReady(() => {
  renderCreationFunction(createSignUpSection, 'sign-up');
});
 
async function createSignUpSection() {
  const signUpSection = document.createElement('div');
  signUpSection.className = 'sign-up-section';
  signUpSection.innerHTML = `
    <div class="sign-up-section-content"></div>
  `;
 
  const contentSection = signUpSection.querySelector('.sign-up-section-content');
 
  contentSection.append(
    createTextSection(),
  );
 
  return signUpSection;
}
  
function createTextSection() {
  const textSection = document.createElement('div');
  textSection.className = 'text-section';
  textSection.innerHTML = `
   <div class="text-section-content">
   <h2>Sign Up</h2>
   <p>More content is coming soon!</p>
   </div>
    `;
    
  return textSection;
}
import { onDOMReady, renderCreationFunction } from './common.js';

onDOMReady(() => {
  renderCreationFunction(createLoginSection, 'login');
});
 
async function createLoginSection() {
  const loginSection = document.createElement('div');
  loginSection.className = 'login-section';
  loginSection.innerHTML = `
    <div class="login-section-content"></div>
  `;
 
  const contentSection = loginSection.querySelector('.login-section-content');
 
  contentSection.append(
    createTextSection(),
  );
 
  return loginSection;
}
  
function createTextSection() {
  const textSection = document.createElement('div');
  textSection.className = 'text-section';
  textSection.innerHTML = `
   <div class="text-section-content">
   <h2>Login</h2>
   <p>More content is coming soon!</p>
   </div>
    `;
    
  return textSection;
}
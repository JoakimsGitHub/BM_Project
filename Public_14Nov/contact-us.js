// Importing the common.js file to handle the DOM ready event and render the section.
import { onDOMReady, renderCreationFunction } from './common.js';

// Initialize the section when DOM is ready.
onDOMReady(() => {
  renderCreationFunction(createContactUsSection, 'contact-us');
});

function createContactUsSection() {
  const contactUsSection = document.createElement('div');
  contactUsSection.className = 'contact-us-section';
  contactUsSection.innerHTML = `
    <div class="contact-us-section-content"></div>
  `;

  const contentSection = contactUsSection.querySelector('.contact-us-section-content');

  contentSection.append(
    createSignUpSection(),
    createFormSection()
  );

  return contactUsSection;
}


function createSignUpSection() {
  const contactUsSection = document.createElement('div');
  contactUsSection.className = 'signup';
  contactUsSection.innerHTML = `
    <div class="signup-content">
      <div class="signup-left">
        <div class="signup-text contact-us">
          <h2>Milton Casino <br> Contact Us!</h2>
        </div>
      </div>
      <div class="signup-right">
        <div class="signup-img contact-us">
          <img src="../src/imagery/variousIcons/cus01.png" alt="Mermaid">
        </div>
      </div>
    </div>
  `;
  
  return contactUsSection;
}

function createFormSection() {
  const formSection = document.createElement('div');
  formSection.className = 'contact-us-section-form';

  // Optional placeholder text for the form inputs. Skipped as per Figma.
  // const placeholderInputText1 = 'Your Name';
  // const placeholderInputText2 = 'Your Email';
  // const placeholderTextareaText = 'Your Message';
   
  formSection.innerHTML = `
    <div>
      <form class="contact-us-section-content-form">
        <input class="contact-us-section-content-form-input-1" type="text" id="name" name="name" placeholder="" required>
        <input class="contact-us-section-content-form-input-2" type="email" id="email" name="email" placeholder="" required>
        <textarea class="contact-us-section-content-form-textarea" id="message" name="message" placeholder="" required></textarea>
        <div class="contact-us-section-content-form-button">
          <button type="submit" class="send-message-button">SEND MESSAGE</button>
        </div>
      </form>
    </div>
  `;

  const form = formSection.querySelector('.contact-us-section-content-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      console.log('Send Message button clicked!');
      
      const messageSentText = document.createElement('div');
      messageSentText.innerHTML = '<h2>Message Sent</h2>';
      
      form.querySelector('.send-message-button').replaceWith(messageSentText);
      
      form.reset();
    } else {
      console.error('All fields are required.');
    }
  });

  return formSection;
}

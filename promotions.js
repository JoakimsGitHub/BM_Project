
// Importing the common.js file to handle the DOM ready event and render the section.
import { onDOMReady, renderCreationFunction } from './common.js';

// Initialize the section when DOM is ready.
onDOMReady(() => {
  renderCreationFunction(createPromotionsSection, 'promotions');
});

async function createPromotionsSection() {  
  const promotionsSection = document.createElement('div');
  promotionsSection.className = 'promotions-section';
  promotionsSection.innerHTML = `
    <div class="promotions-section-content">
      <div class="promotions-box"></div>
      <div class="promotion-info"></div>
      <div class="promotions-list"></div>
    </div>
  `;

  const boxSection = promotionsSection.querySelector('.promotions-box');
  boxSection.appendChild(createSignUpSection());

  const moreInfoSection = promotionsSection.querySelector('.promotion-info');
  moreInfoSection.appendChild(createMoreInfoSection());

  const listSection = promotionsSection.querySelector('.promotions-list');
  // Wait for the async function to complete
  const whatsCookingSection = await createWhatsCookingSection();
  listSection.appendChild(whatsCookingSection);

  return promotionsSection;
}

function createSignUpSection() {
  const signUpSection = document.createElement('div');
  signUpSection.className = 'signup';
  signUpSection.innerHTML = `
    <div class="signup-content">
      <div class="signup-left">
        <div class="signup-text promotions">
          <h2>Milton Casino <br> Promotions</h2>
          <p>Grab exciting promotions and purchase offers to spin your way to non-stop fun!</p>
          <div class="signup-button">SIGN UP</div>
        </div>
      </div>
      <div class="signup-right">
        <div class="signup-img promotions">
          <img src="../src/imagery/variousIcons/pro01.png" alt="Image of pig with staff">
        </div>
      </div>
    </div>
  `;

  return signUpSection;
}

function createMoreInfoSection() {
  const moreInfoSection = document.createElement('div');
  moreInfoSection.className = 'more-info-section';
  moreInfoSection.innerHTML = `
    <div class="more-info-section-content">
      <div class="more-info-section-content-textbox">
    <p>Discover reels of excitement at Milton Casino! Every week, 
    we unveil fresh new promotions to keep the fun rolling and the reels spinning. 
    Enjoy our peachy welcome and purchase offers, along with exciting weekly and monthly promotions. 
      Be sure to join us for special events hosted by top slots streamers like Brian Christopher and Lady Luck, 
        where the thrill of winning never ends!</p>
        <p>Take a look at some of our current promotions running right now.  </p>
      </div>
    </div>
  `;
  return moreInfoSection;
}

async function createWhatsCookingSection() {
  async function fetchPromotions() {
    const url = 'https://clubcasinopreprod.sweepium.com:4003/v2/GetBonus';
    const postObject = {
      method: 'POST',
      headers: {
        'AuthorizationSite': 'abc123456'
      },
      body: JSON.stringify({ 
        keySite: 'abc123456'
      })
    };
  
    try {
      const response = await fetch(url, postObject);
      if (!response.ok) throw new Error('Failed to fetch promotions');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching promotions:', error);
      return { code: 'error', results: [] };
    }
  }

  // Since the returned JSON file only contains an array of 7 elements, an extra element is added.
  // Moreover, the imageBonus property is not valid in any of the elements belonging to the result array so placeholders are added.
  // This is a tentative fix for the sake of demonstration as per Figma.
  function createPromotionGrid(promotions) {

     // These elements are accessed through using the index of the promotions array.
    const placeholderImages = [
      { path: '../src/imagery/placeholders/placeholder_1.jpg', name: 'Promotion 1' },
      { path: '../src/imagery/placeholders/placeholder_2.jpg', name: 'Promotion 2' },
      { path: '../src/imagery/placeholders/placeholder_3.jpg', name: 'Promotion 3' },
      { path: '../src/imagery/placeholders/placeholder_4.jpg', name: 'Promotion 4' },
      { path: '../src/imagery/placeholders/placeholder_5.jpg', name: 'Promotion 5' },
      { path: '../src/imagery/placeholders/placeholder_6.jpg', name: 'Promotion 6' },
      { path: '../src/imagery/placeholders/placeholder_7.jpg', name: 'Promotion 7' }
    ];
  

    // Adding an extra element.
    promotions.push({
      imageBonus: '/images/coming-soon.jpg',
      nameBonus: 'Coming Soon',
      bonusDetails: {
        headerBonus: 'New Promotion Coming Soon',
        subTitle: 'Stay tuned!',
        GC_amountBonus: 1000,
        FC_amountBonus: 5,
        textBonus: 'Details of our next promotion will be revealed soon.'
      }
    });


    // <img src="https://clubcasinopreprod.sweepium.com:4003${promotion.imageBonus}" alt="${promotion.nameBonus}">

    return promotions.map((promotion, index) => {
      const placeholderImage = placeholderImages[index] || placeholderImages[0];
      
      return `
    <div class="promotion-card">

      <div class="promotion-image">
        <img src="${placeholderImage.path}" alt="${placeholderImage.name}">
      </div>

      <div class="promotion-content">

        <div class="promotion-text">

          <div class="promotion-header">
            <h3>${promotion.bonusDetails.headerBonus}</h3>
          </div>

          <div class="promotion-details">
            <p>${promotion.bonusDetails.subTitle}</p>
          </div>

          <div class="bonus-amounts">
            <p class="gc-amount">${promotion.bonusDetails.GC_amountBonus.toLocaleString()} GC</p> 
            ${promotion.bonusDetails.FC_amountBonus >= 0 && 
              `<p class="sc-amount">+ ${promotion.bonusDetails.FC_amountBonus}.to SC</p>`}
          </div>

        </div>
        <div class="promotion-buttons">
          <button class="signup-button">SIGN UP</button>
          <button class="read-more-button" data-text="${promotion.bonusDetails.textBonus}">Read More</button>
        </div>
      </div>
    </div>
  `;
}).join('');
}

  const section = document.createElement('div');
  section.className = 'whats-cooking-section';
  
  const response = await fetchPromotions();
  
  if (response.code === 'ok' && response.results?.length > 0) {
    section.innerHTML = `
      <div class="whats-cooking-section-content">
        <div class="whats-cooking-section-content-grid">
          ${createPromotionGrid(response.results)}
        </div>
      </div>
    `;

    // Add event listeners for buttons
    const readMoreButtons = section.querySelectorAll('.read-more-button');
    readMoreButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        alert(btn.dataset.text); // Accessing the HTML attribute as dataset property. Storing data associated a specific element. Converting kebab-case to camelCase. 
      });
    });

    const signupButtons = section.querySelectorAll('.signup-button');
    signupButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Preventing the click event from triggering parent elements' event handlers (bubbling up).
        window.location.href = 'sign-up.html';
      });
    });
  } else {
    section.innerHTML = `
      <div class="whats-cooking-section-content">
        <h2>What's cooking at Milton Casino</h2>
        <div class="whats-cooking-section-content-grid">
          <div class="promotion-card"><h3>No promotions available</h3></div>
        </div>
      </div>
    `;
  }

  return section;
}
import { onDOMReady, renderCreationFunction, fetchGames, getRandomGames } from './common.js';

onDOMReady(() => {
  renderCreationFunction(createLobbySection, 'lobby');
});

// Creating a wrapper div and append all returned section values to it.
async function createLobbySection() {
  const lobbySection = document.createElement('div');
  lobbySection.className = 'lobby-section';
  lobbySection.innerHTML = `
    <div class="lobby-section-content"></div>
  `;

  const contentSection = lobbySection.querySelector('.lobby-section-content');
  contentSection.append(
    createSplitSignUpSection(),
    await createLookWhoJustWonSection(),
    await createNewReleasesSection(),
    await createJackpotSlotsSection(),
    await createExclusivesSection(),
    await createTopGamesSection(),
    await createProviderLogosSection(),
    await createGameCategoriesSection(),
    await createGettingStartedSection(),
    await createWhatsCookingSection(),
    await createAlwaysFunSection(),
    await createJoinUsSection(),
    await createAdditionalInformationSection(),
    await createNewToMiltonSection(),
    await createFinalInformationSection()
  );

  return lobbySection;
}

// Placeholder images as global variables.
const placeholderImages = [
  { path: '../src/imagery/placeholders/placeholder_1.jpg', name: 'Promotion 1' },
  { path: '../src/imagery/placeholders/placeholder_2.jpg', name: 'Promotion 2' },
  { path: '../src/imagery/placeholders/placeholder_3.jpg', name: 'Promotion 3' },
  { path: '../src/imagery/placeholders/placeholder_4.jpg', name: 'Promotion 4' },
  { path: '../src/imagery/placeholders/placeholder_5.jpg', name: 'Promotion 5' },
  { path: '../src/imagery/placeholders/placeholder_6.jpg', name: 'Promotion 6' },
  { path: '../src/imagery/placeholders/placeholder_7.jpg', name: 'Promotion 7' }
];

// For the fallback image.
function getRandomPlaceholder() {
  const randomIndex = Math.floor(Math.random() * placeholderImages.length);
  return placeholderImages[randomIndex].path;
}

const fallbackImage = getRandomPlaceholder();

function createSplitSignUpSection() {
  const splitSignupBoxes = [
    { 
      h: "Daily Bonus", 
      p: "Log in daily to claim your bonus", 
      src: "../src/imagery/variousIcons/b001.png", 
      alt: "Image of piggy bank", 
      size: "large" 
    },
    { 
      h: "First-time player?", 
      p: "Sign up to claim your peachy welcome offer!", 
      src: "../src/imagery/variousIcons/b002.png", 
      alt: "Image of presents", 
      size: "medium", 
      order: "first" 
    },
    { 
      h: "Play America's #1 online social casino", 
      p: "", 
      src: "../src/imagery/variousIcons/b003.png", 
      alt: "Image of people", 
      size: "medium", 
      order: "second" 
    }
  ];

  function createLargeBox(box) {
    return `
      <div class="split-box-large">  
        <div class="split-text-large">
          <h2>${box.h}</h2>
          <p>${box.p}</p>
        </div>
        <div class="split-img-large">
          <img src="${box.src}" alt="${box.alt}">
        </div>
        <button class="split-button">SIGN UP</button>
      </div>
    `;
  }

  function createMediumBox(box) {
    return `
      <div class="split-box-medium ${box.order}">
        <div class="split-text">
          <h2>${box.h}</h2>
          <p>${box.p}</p>
        </div>
        <div class="split-img medium-${box.order}">
          <img src="${box.src}" alt="${box.alt}">
        </div>
        <button class="split-button">SIGN UP</button>
      </div>
    `;
  }

  function createSignupBoxes(boxes) {
    return boxes
      .map(box => box.size === 'large' ? createLargeBox(box) : createMediumBox(box))
      .join('');
  }

  function createDots() {
    const dotStates = ['active', 'inactive', 'inactive'];
    return dotStates
      .map(state => `<div class="split-dot ${state}"></div>`)
      .join('');
  }

  const splitSignUpSection = document.createElement('div');
  splitSignUpSection.className = 'split-signup';
  
  splitSignUpSection.innerHTML = `
    <div class="split-signup-content">
      ${createSignupBoxes(splitSignupBoxes)}
    </div>
    <div class="split-dots">
      ${createDots()}
    </div>
  `;

  const content = splitSignUpSection.querySelector('.split-signup-content');
  const dots = splitSignUpSection.querySelectorAll('.split-dot');
  
  // content.addEventListener('scroll', () => {
  //   const activeIndex = Math.round(content.scrollLeft / content.offsetWidth); 
  //   dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex)); 
  // });

  content.addEventListener('scroll', () => {
    const activeIndex = Math.round(content.scrollLeft / content.offsetWidth); // The rounded value of the number of pixels scrolled horizontally to the left divided by the visible width of the container.

    dots.forEach((dot, i) => {
      // Toggle both active and inactive states
      dot.style.background = i === activeIndex ? // Add the additive class to the dot whose index that matches the activeIndex.
        'var(--color-text)' : 
        'var(--color-text-secondary)';
    });
  });


  // content.addEventListener('scroll', () => {
  //   const activeIndex = Math.round(content.scrollLeft / content.offsetWidth); 
  //   dots.forEach((dot, i) => {
  //     // Toggle the active class
  //     dot.classList.toggle('active', i === activeIndex); 
  //     // Set opacity based on active state
  //     dot.style.opacity = i === activeIndex ? '1' : '0.5';
  //   });
  // });


  splitSignUpSection.querySelectorAll('.split-button')
    .forEach(btn => btn.addEventListener('click', () => window.location.href = 'sign-up.html'));

  return splitSignUpSection;
}

// Section function.
// Creates a slideshow/carousel of 22 slide items from random games, split into 2 slides.
async function createLookWhoJustWonSection() {
  const url = 'https://clubcasinopreprod.sweepium.com:4010/ListGames?SiteKey=abc123456&count=22&Type=Slot%20Machine&RANDO=true';
  const games = await fetchGames(url);
  
  const shuffledGames = [...games].sort(() => Math.random() - 0.5);
  const firstSet = shuffledGames.slice(0, 11);
  const secondSet = shuffledGames.slice(11, 22);
  const gameSets = [firstSet, secondSet];

  function generateRandomWinnings() {
    const min = 1_000_000;  
    const max = 50_000_000; 
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function createGameItem(game) { 
    return `
      <div class="carousel-game">
        <div class="carousel-game-image">
          <img src="${game.urlThumbnailButton || fallbackImage}" alt="${game.nameGame}">
        </div>
        <div class="carousel-game-details">
          <p class="carousel-game-name">Won on ${game.nameGame}</p>
          <p class="carousel-game-winnings">GC ${generateRandomWinnings().toLocaleString()}</p>
        </div>
      </div>
    `;
  }

  function createSlides(gameSets) {
    return gameSets.map((gameSet, slideIndex) => `
      <div class="carousel-slide" data-index="${slideIndex}">
        <div class="carousel-grid">
          ${gameSet.map(game => createGameItem(game)).join('')}
        </div>
      </div>
    `).join('');
  }

  function initializeCarousel(section) {
    let currentIndex = 0;
    const slides = Array.from(section.querySelectorAll('.carousel-slide'));
    const prevButton = section.querySelector('.carousel-prev');
    const nextButton = section.querySelector('.carousel-next');
    
    // translateX: 0% = visible (original position), 100% = off right, -100% = off left, translating the slide 100% of its width.
    function updateSlidePosition() {
      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentIndex)}%)`;
      });
      
      // Toggle visibility based on current index
      prevButton.classList.toggle('visible', currentIndex !== 0);
      nextButton.classList.toggle('visible', currentIndex !== slides.length - 1);
    }
  
    function changeSlide(direction) {
      currentIndex = (currentIndex + direction + slides.length) % slides.length;
      updateSlidePosition();
    }
    
    prevButton.addEventListener('click', () => changeSlide(-1));
    nextButton.addEventListener('click', () => changeSlide(1));
    
    updateSlidePosition();
  }

  const section = document.createElement('div');
  section.className = 'carousel-section';
  section.innerHTML = `
    <div class="carousel-content">
      <h2 class="carousel-title">Look who just won!</h2>
      <div class="carousel">
        <div class="carousel-slides">
          ${createSlides(gameSets)}
        </div>
        <button class="carousel-button carousel-prev">←</button>
        <button class="carousel-button carousel-next">→</button>
      </div>
    </div>
  `;

  const allGameCards = section.querySelectorAll('.carousel-game');
  allGameCards.forEach(game => {
    game.addEventListener('click', () => {
      alert(`You clicked on ${game.querySelector('img').alt}`);
    });
  });

  initializeCarousel(section);
  return section;
}

// Section function.
// Creates a grid of 11 random games.
async function createNewReleasesSection() {
  const url = 'https://clubcasinopreprod.sweepium.com:4010/ListGames?SiteKey=abc123456&Provider&Random=144&Type=Slot%20Machine';
  const games = await fetchGames(url);
  const randomGames = getRandomGames(games, 11);

  function createGameItem(game, size) {
    return `
      <div class="game-${size}">
        <img src="${game.urlThumbnailButton || fallbackImage}" alt="${game.nameGame}">
      </div>
    `;
}


  // Helper function.
  function createGameGrids(games) {
    return `
    ${createGameItem(games[0], 'large')}
    <div class="game-row">
      ${games.slice(1, 6).map((game) => createGameItem(game, 'medium')).join('')}
    </div>
    <div class="game-row">
      ${games.slice(6).map((game) => createGameItem(game, 'medium')).join('')}
    </div>
  `;
  }

  const section = document.createElement('div');
  section.className = 'games-section new-releases';
  section.innerHTML = `
    
    <div class="games-content">
    <h2>New Releases</h2>
      <div class="grid-large">
        ${createGameGrids(randomGames)}
      </div>
    </div>
  `;

  const allGameCards = section.querySelectorAll('.game-large, .game-medium');
  allGameCards.forEach(game => {
    game.addEventListener('click', () => {
        alert(`You clicked on ${game.querySelector('img').alt}`);
    });
  });

  return section;
}

async function createJackpotSlotsSection() {
  const url = 'https://clubcasinopreprod.sweepium.com:4010/ListGames?SiteKey=abc123456&Provider&Random=144&Type=Slot%20Machine';
  const games = await fetchGames(url);

  const randomGames = getRandomGames(games, 7);

  function createGrid(games) {
    return games.map(game => `
      <div class="game-medium">
        <img src="${game.urlThumbnailButton || fallbackImage}" alt="${game.nameGame}">
      </div>
    `).join('');
}

  const section = document.createElement('div');
  section.className = 'games-section';
  section.innerHTML = `
    <div class="games-content">
      <h2>Jackpot Slots</h2>
      <div class="grid-small">
        ${createGrid(randomGames)}
      </div>
    </div>
  `;

  const allGameCards = section.querySelectorAll('.game-medium');
allGameCards.forEach(game => {
    game.addEventListener('click', () => {
        alert(`You clicked on ${game.querySelector('img').alt}`);
    });
  });  

  return section;
}

async function createExclusivesSection() {
  const url = 'https://clubcasinopreprod.sweepium.com:4010/ListGames?SiteKey=abc123456&Provider&Random=144&Type=Slot%20Machine';
  const games = await fetchGames(url);

  const randomGames = getRandomGames(games, 7);

  function createGrid(games) {
    return games.map(game => `
      <div class="game-medium">
        <img src="${game.urlThumbnailButton || fallbackImage}" alt="${game.nameGame}">
      </div>
    `).join('');
}
 
  const section = document.createElement('div');
  section.className = 'games-section';
  section.innerHTML = `
    <div class="games-content">
      <h2>Exclusives</h2>
      <div class="grid-small">
        ${createGrid(randomGames)}
      </div>
    </div>
  `;

  const allGameCards = section.querySelectorAll('.game-medium');
  allGameCards.forEach((game) => {
      game.addEventListener('click', () => {
          alert(`You clicked on ${game.querySelector('img').alt}`);
      });
    });

  return section;
}

async function createTopGamesSection() {
  // 1. Building the URL with query parameters
  // Base URL for the games API endpoint
  // Protocol, domain, port, endpoint.
  const baseUrl = 'https://clubcasinopreprod.sweepium.com:4010/ListGames'; 

  // Creating the string of URL parameters using the URLSearchParams object is more reliable than string concatenation.
  // Each key-value pair is added to the URL as a parameter, each starts with a question mark and separated by an ampersand.
  // Results in: ?SiteKey=abc123456&Limit=5&Sort=MostSpun
  const params = new URLSearchParams({
    SiteKey: 'abc123456',    // Identifier.
    Limit: '5',              // Limit.
    Sort: 'MostSpun'         // Sorting. 
  });

  // Request configuration object for the query string.

  const postObject = {
    method: 'POST',          // Request.
    headers: {
      'Content-Type': 'application/json',     
      'Accept': 'application/json',           
      'AuthorizationSite': 'abc123456'        // Site-specific authentication token
    },
    body: JSON.stringify({                    // Converts JavaScript object to JSON string
      keySite: 'abc123456'                    // Required in request body for authentication
    })
  };

  // Base URL plus query parameters.
  const url = `${baseUrl}?${params}`; 
  
  // The API request is made with the URL and POST configuration.
  // Limit to 5 games.
  const allGames = await fetchGames(url, postObject); 
  const games = allGames.slice(0, 5);     

  // Creating the game.
  function createGame(game) {
    return `
      <div class="top-game-medium">
        <img src="${game.urlThumbnailButton || fallbackImage}" alt="${game.nameGame}">
      </div>
    `;
  }

  // Creating a game for every retrieved game. 
  function createGames(games) {
    return games.map(game => createGame(game)).join('');
  }

  // Grid wrapper.
  const section = document.createElement('div');
  section.className = 'games-section';
  section.innerHTML = `
    <div class="games-content top-games">
      <h2>Top Games</h2>
      <div class="top-games-grid">
        ${createGames(games)}
      </div>
    </div>
  `;

  // Adding click event listeners to all games.
  const allGameCards = section.querySelectorAll('.top-game-medium');
  allGameCards.forEach(game => {
    game.addEventListener('click', () => {
      alert(`You clicked on ${game.querySelector('img').alt}`);
    });
  });

  return section;
}


async function createProviderLogosSection() {
  const availableProviders = [
    { name: "3Oaks", img: "../src/imagery/ProviderButtonLogo/DeskTop/3oaks.png", alt: "3 Oaks Gaming logo", link: "https://3oaks.com/" },
    { name: "Booming", img: "../src/imagery/ProviderButtonLogo/DeskTop/booming.png", alt: "Booming Games logo", link: "https://boominggames.com/" },
    { name: "CaletaGaming", img: "../src/imagery/ProviderButtonLogo/DeskTop/caleta.png", alt: "Caleta Gaming logo", link: "https://caletagaming.com/" },
    { name: "Concept Gaming", img: "../src/imagery/ProviderButtonLogo/DeskTop/conceptgaming.png", alt: "Concept Gaming logo", link: "https://conceptgaming.com/" },
    { name: "Creedroomz", img: "../src/imagery/ProviderButtonLogo/DeskTop/creedrom.png", alt: "Creedroomz Gaming logo", link: "https://creedroomz.com/" },
    { name: "DragonGaming", alt: "Dragon Gaming logo", link: "https://dragongaming.com/" },
    { name: "ElaGames", img: "../src/imagery/ProviderButtonLogo/DeskTop/ElaGames.png", alt: "Ela Games logo", link: "https://elagames.com/" },
    { name: "Elbet", img: "../src/imagery/ProviderButtonLogo/DeskTop/Elbet.png", alt: "Elbet Gaming logo", link: "https://elbet.com/" },
    { name: "Ethereal", img: "../src/imagery/ProviderButtonLogo/DeskTop/ethereal.png", alt: "Ethereal Gaming logo", link: "https://ethereal-games.com/" },
    { name: "Evoplay", img: "../src/imagery/ProviderButtonLogo/DeskTop/evoplay.png", alt: "Evoplay Gaming logo", link: "https://evoplay.games/" },
    { name: "Expanse", img: "../src/imagery/ProviderButtonLogo/DeskTop/expanse.png", alt: "Expanse Studios logo", link: "https://expansestudios.com/" },
    { name: "Fantasma", img: "../src/imagery/ProviderButtonLogo/DeskTop/fantasma.png", alt: "Fantasma Games logo", link: "https://fantasmagames.com/" },
    { name: "Fazi", img: "../src/imagery/ProviderButtonLogo/DeskTop/fazigame.png", alt: "Fazi Interactive logo", link: "https://fazi.rs/" },
    { name: "Gaming Corps", img: "../src/imagery/ProviderButtonLogo/DeskTop/GamingCorps.png", alt: "Gaming Corps logo", link: "https://gamingcorps.com/" },
    { name: "Gamzix", img: "../src/imagery/ProviderButtonLogo/DeskTop/gamzix.png", alt: "Gamzix Gaming logo", link: "https://gamzix.com/" },
    { name: "Habanero", img: "../src/imagery/ProviderButtonLogo/DeskTop/habanero.png", alt: "Habanero Systems logo", link: "https://habanerosystems.com/" },
    { name: "Hacksaw Gaming", img: "../src/imagery/ProviderButtonLogo/DeskTop/hacksaw.png", alt: "Hacksaw Gaming logo", link: "https://hacksawgaming.com/" },
    { name: "Holle Group", img: "../src/imagery/ProviderButtonLogo/DeskTop/Holle.png", alt: "Holle Group Gaming logo", link: "#" },
    { name: "Jelly", img: "../src/imagery/ProviderButtonLogo/DeskTop/jellygaming.png", alt: "Jelly Gaming logo", link: "https://jelly.gg/" },
    { name: "KaGaming", img: "../src/imagery/ProviderButtonLogo/DeskTop/kagaming.png", alt: "Ka Gaming logo", link: "https://kagaming.com/" },
    { name: "Kajot", img: "../src/imagery/ProviderButtonLogo/DeskTop/kajiot.png", alt: "Kajot Gaming logo", link: "https://kajot-casino.com/" },
    { name: "Kalamba", alt: "Kalamba Games logo", link: "https://kalambagames.com/" },
    { name: "LiveGames", img: "../src/imagery/ProviderButtonLogo/DeskTop/livegames.png", alt: "Live Games logo", link: "https://livegames.io/" },
    { name: "LuckyStreak", img: "../src/imagery/ProviderButtonLogo/DeskTop/luckystreak.png", alt: "LuckyStreak logo", link: "https://luckystreaklive.com/" },
    { name: "Mancala", img: "../src/imagery/ProviderButtonLogo/DeskTop/mancala.png", alt: "Mancala Gaming logo", link: "https://mancalagaming.com/" },
    { name: "NetGaming", img: "../src/imagery/ProviderButtonLogo/DeskTop/netgaming.png", alt: "NetGaming logo", link: "https://netgaming.com/" },
    { name: "PeterAndSons", img: "../src/imagery/ProviderButtonLogo/DeskTop/peterandson.png", alt: "Peter & Sons Gaming logo", link: "https://peterandsons.com/" },
    { name: "Platipus", img: "../src/imagery/ProviderButtonLogo/DeskTop/platipus.png", alt: "Platipus Gaming logo", link: "https://platipusgaming.com/" },
    { name: "Playzia", alt: "Playzia Gaming logo", link: "https://playzia.com/" },
    { name: "RAW Igaming", img: "../src/imagery/ProviderButtonLogo/DeskTop/raw.png", alt: "RAW iGaming logo", link: "https://rawigaming.com/" },
    { name: "Relax Gaming", img: "../src/imagery/ProviderButtonLogo/DeskTop/RelaxGaming.png", alt: "Relax Gaming logo", link: "https://relax-gaming.com/" },
    { name: "Rogue", img: "../src/imagery/ProviderButtonLogo/DeskTop/Rogue.png", alt: "Rogue Gaming logo", link: "https://rogue-gaming.com/" },
    { name: "RubyPlay", img: "../src/imagery/ProviderButtonLogo/DeskTop/rubyplay.png", alt: "RubyPlay Gaming logo", link: "https://rubyplay.com/" },
    { name: "Skywind", img: "../src/imagery/ProviderButtonLogo/DeskTop/skywind.png", alt: "Skywind Gaming logo", link: "https://skywindgroup.com/" },
    { name: "Slotmill", img: "../src/imagery/ProviderButtonLogo/DeskTop/slotmill.png", alt: "Slotmill logo", link: "https://slotmill.com/" },
    { name: "Spinoro", img: "../src/imagery/ProviderButtonLogo/DeskTop/Spinoro.png", alt: "Spinoro Gaming logo", link: "https://spinoro.com/" },
    { name: "Spinza", img: "../src/imagery/ProviderButtonLogo/DeskTop/spinza.png", alt: "Spinza logo", link: "https://spinza.com/" },
    { name: "TheZone", img: "../src/imagery/ProviderButtonLogo/DeskTop/thezone.png", alt: "TheZone Gaming logo", link: "https://thezone.io/" },
    { name: "TopSpin", img: "../src/imagery/ProviderButtonLogo/DeskTop/topspin.png", alt: "TopSpin Gaming logo", link: "https://topspin.io/" },
    { name: "TurboGames", img: "../src/imagery/ProviderButtonLogo/DeskTop/turbogames.png", alt: "Turbo Games logo", link: "https://turbogames.io/" },
  ];

  async function fetchProviders() {
    const url = 'https://clubcasinopreprod.sweepium.com:4010/GamesProviders?keySite=abc123456';
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching provider data:', error);
      return null;
    }
  }

  const providers = await fetchProviders();

  // First, filter providers that have matching assets
  const providersWithAssets = providers.filter(provider => {
    const hasAssets = availableProviders.find(info => 
      info.name === provider.nameGameProvider && 
      info.img && 
      info.alt && 
      info.link
    );
    return hasAssets;
  });

  // Then randomly select from those that have assets
  const randomProviders = providersWithAssets
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

// Ensuring that the retrieved provider has the assets available in this project (the image).
// Done by checking if the value of nameGameProvider (from the fetched JSON object's data array's object) and the name property of the availableProviders array match.
function createProviderItem(provider) {
  const providerWithAssets = availableProviders.find(info => info.name === provider.nameGameProvider);
  
  // Additional safety check for required properties
  const requiredProperties = ['img', 'alt', 'link'];
  if (!requiredProperties.every((prop) => providerWithAssets?.[prop])) {
    console.warn(`Missing properties for provider ${provider.nameGameProvider}`);
    return '';
  }

  return `
    <div class="provider-logos-section-content-row-item" data-link="${providerWithAssets.link}">
      <img src="${providerWithAssets.img}" alt="${providerWithAssets.alt}" data-provider-id="${provider.idGameProvider}">
    </div>
  `;
}

  const providerLogosSection = document.createElement('div');
  providerLogosSection.className = 'provider-logos-section';
  const sectionContent = `
    <div class="provider-logos-section-content">
      
        <h2>Game Providers</h2>
      
      <div class="provider-logos-section-content-row">
        ${randomProviders.map(createProviderItem).join('')}
      </div>
    </div>
  `;

  providerLogosSection.innerHTML = sectionContent;

  const providerCards = [...providerLogosSection.querySelectorAll('.provider-logos-section-content-row-item')];
  providerCards.forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = card.dataset.link;
    });
  });

  return providerLogosSection;
}


async function createGameCategoriesSection() {  
  const gameCategories = [
    { text: "SLOTS", class: "slots", src: "../src/imagery/variousIcons/slot.png", alt: "Slots icon", link: "slots.html" },
    { text: "BINGO", class: "bingo", src: "../src/imagery/variousIcons/Bingo.png", alt: "Bingo icon", link: "bingo.html" },
    { text: "CRASH", class: "crash", src: "../src/imagery/variousIcons/Crash.png", alt: "Crash icon", link: "crash.html" },
    { text: "SCRATCH", class: "scratch", src: "../src/imagery/variousIcons/Scractch.png", alt: "Scratch icon", link: "scratch.html" },
    { text: "TABLE", class: "table", src: "../src/imagery/variousIcons/tablegame.png", alt: "Table games icon", link: "table.html" },
    { text: "LIVE", class: "live", src: "../src/imagery/variousIcons/live.png", alt: "Live games icon", link: "live.html" }
  ];

  function gameCategoriesGrid(categories) {
    return categories.map(category => `
      <div class="category-card category-card-${category.class}" data-link="${category.link}">
        <h2>${category.text}</h2>
        <div class="category-card-circle category-card-circle-${category.class}">
          <img src="${category.src}" alt="${category.alt}">
        </div>
      </div>
    `).join('');
  }
  
  const section = document.createElement('div');
  section.className = 'categories-section';
  section.innerHTML = `
    <div class="categories-section-content">
      <div class="categories-section-presentation">
        <div class="categories-section-textbox">
          <h2>Exciting online slots and casino-style games</h2>
          <p>With over 900 games to choose from, there is always something new to play.</p>
        </div>
      </div>
      <div class="categories-section-row">
        ${gameCategoriesGrid(gameCategories)}
      </div>
    </div>
  `;

  const cards = section.querySelectorAll('.category-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = card.dataset.link;
    });
  });

  
  const allCategoryCards = section.querySelectorAll('.category-card');
allCategoryCards.forEach(game => {
    game.addEventListener('click', () => {
        alert(`You clicked on ${game.querySelector('h2').textContent}`);
    });
  });

  return section;
}

function createGettingStartedSection() {
  const gettingStartedSection = document.createElement('div');
  gettingStartedSection.className = 'getting-started-section';
  gettingStartedSection.innerHTML = `
    <div class="getting-started-section-content">
      <div class="getting-started-section-content-left">
        <div class="getting-started-section-content-textbox">
          <h2>Getting started on Milton Casino</h2>
          <p>Ready to rock the Milton reels? Let us walk you through the steps to setting up your account.</p>
        </div>
        <div class="getting-started-section-content-button">
          <button class="help-center-button">HELP CENTER</button>
        </div>
      </div>
      <div class="getting-started-section-content-right">
        <div class="getting-started-section-content-img">
          <img src="../src/imagery/variousIcons/B005.png" alt="King">
        </div>
      </div>
    </div>
  `;

  // Attaching event listener for redirecting to new page. 
  const helpButton = gettingStartedSection.querySelector('.help-center-button');
  helpButton.addEventListener('click', () => {
    window.location.href = 'help-center.html';
  });

  return gettingStartedSection;
}


async function createWhatsCookingSection() {
  async function fetchSlides() {
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
      if (!response.ok) throw new Error('Failed to fetch slides');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching slides:', error);
      return { code: 'error', results: [] };
    }
  };

  const section = document.createElement('div');
  section.className = 'whats-cooking-section';
  section.innerHTML = `
    <div class="whats-cooking-section-content">
      <div class="whats-cooking-section-content-presentation">
        <div class="whats-cooking-section-content-textbox">
          <h2>What's cooking at Milton Casino</h2>
        </div>
      </div>
      <div class="whats-cooking-section-content-row">
        <div class="slideshow">
          <button class="prev-slide">&#8249;</button>
          <div class="slide-container"></div>
          <button class="next-slide">&#8250;</button>
        </div>
      </div>
    </div>
  `;

  const slideContainer = section.querySelector('.slide-container');
  const prevButton = section.querySelector('.prev-slide');
  const nextButton = section.querySelector('.next-slide');
  
  const response = await fetchSlides();

  // <img src="${baseUrl}${bonus.imageBonus}" alt="${bonus.nameBonus}">

  if (response.code === 'ok' && response.results?.length > 0) {
    const baseUrl = 'https://clubcasinopreprod.sweepium.com:4003';
    slideContainer.innerHTML = response.results.map((bonus, index) => {
      const placeholderImage = placeholderImages[index] || placeholderImages[0];

      console.log('Full image URL:', baseUrl + bonus.imageBonus); 
      return `
      <div class="promotion-slide">
        <div class="promotion-image">
          <img src="${placeholderImage.path}" alt="${placeholderImage.path}">
        </div>
        <div class="promotion-content">
          <div class="promotion-text">
            <div class="promotion-header">
              <h3>${bonus.bonusDetails.headerBonus}</h3>
            </div>
            <div class="promotion-details">
              <p>${bonus.bonusDetails.subTitle}</p>
            </div>
            <div class="bonus-amounts">
              <p class="gc-amount">${bonus.bonusDetails.GC_amountBonus.toLocaleString()} GC</p>
               ${bonus.bonusDetails.FC_amountBonus >= 0 && 
              `<p class="sc-amount">+ ${bonus.bonusDetails.FC_amountBonus}.to SC</p>`}
            </div>
          </div>
          <div class="promotion-buttons">
            <button class="signup-button">SIGN UP</button>
            <button class="read-more-button" data-text="${bonus.bonusDetails.textBonus}">Read More</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

    const slides = Array.from(slideContainer.children);
    let currentIndex = 0;
    const slidesToShow = 2;

    function changeSlide(direction) {
      currentIndex += direction;

      if (currentIndex >= slides.length) {
        currentIndex = 0;
      } else if (currentIndex < 0) {
        currentIndex = slides.length - 1;
      }

      updateSlideVisibility();
    }

    function updateSlideVisibility() {
      slides.forEach((slide, index) => {
        const isVisible = index >= currentIndex && index < currentIndex + slidesToShow;
        slide.style.display = isVisible ? 'block' : 'none';
        slide.style.opacity = isVisible ? '1' : '0';
      });
    }

    prevButton.addEventListener('click', () => changeSlide(-1));
    nextButton.addEventListener('click', () => changeSlide(1));

    slideContainer.querySelectorAll('.read-more').forEach(btn => {
      btn.addEventListener('click', () => alert(btn.dataset.text));
    });

    updateSlideVisibility();
  } else {
    slideContainer.innerHTML = '<div class="promotion-slide"><h3>No promotions available</h3></div>';
  }

  
  const allGameCards = section.querySelectorAll('.promotion-slide');
allGameCards.forEach(game => {
    game.addEventListener('click', () => {
        alert(`You clicked on ${game.querySelector('h3').textContent}`);
    });
  });

  return section;
}

async function createAlwaysFunSection() {
  const infoItems = [
    {
      title: "Over 1 million players",
      text: "With reels of social casino games to choose from, more and more customers are choosing Milton Casino every single day",
      img: "../src/imagery/variousIcons/01.png",
      alt: "Dancing pig",
      order: 1,
      imgClass: "always-fun-section-content-item-img-1"
    },
    {
      title: "Stream 100s of casino-style games",
      text: "With fresh new slot games dropping almost every week, we've got reels of online social casino games to play for free!",
      img: "../src/imagery/variousIcons/02.png",
      alt: "Dancing man",
      order: 2,
      imgClass: "always-fun-section-content-item-img-2"
    },
    {
      title: "Next-level fun!",
      text: "Every spin is a new adventure. Where will the reels take you today?",
      img: "../src/imagery/variousIcons/03.png",
      alt: "Sitting monkey",
      order: 3,
      imgClass: "always-fun-section-content-item-img-3"
    }
  ];

  function createInfoItems(items) {
    return items.map(item => `
      <div class="always-fun-section-content-item always-fun-section-content-item-${item.order}">
        <div class="always-fun-section-content-item-textbox always-fun-section-content-item-textbox-${item.order}">
          <h2>${item.title}</h2>
          <p>${item.text}</p>
        </div>
        <img 
          src="${item.img}" 
          alt="${item.alt}" 
          class="${item.imgClass}"
        >
      </div>
    `).join('');
  }

  const alwaysFunSection = document.createElement('div');
  alwaysFunSection.className = 'always-fun-section';
  alwaysFunSection.innerHTML = `
    <div class="always-fun-section-content">
      <div class="always-fun-section-content-presentation">
        <div class="always-fun-section-content-presentation-textbox">
          <h2>It's always fun and games at Milton!</h2>
          <p>It's never been easier to enjoy free casino-style games and exciting slots online at Milton. We made it that way specially so you can focus more time having fun. Here's why you'll love playing Milton Casino's social slot games time and time again.</p>
        </div>
      </div>
      <div class="always-fun-section-content-row">
        ${createInfoItems(infoItems)}
      </div>
    </div>
  `;
 
  // Animation.
  // Set opacity to 1 when the element enters the viewport. 
  function observeItems(entry) {
    entry.isIntersecting && (entry.target.style.opacity = '1', entry.target.style.transform = 'translateY(0)');
  }

  // Create observer that will use observeItems for each entry
  const observer = new IntersectionObserver(entries => entries.forEach(observeItems));

  // Find all items and tell observer to watch them
  alwaysFunSection.querySelectorAll('.always-fun-section-content-item')
    .forEach(item => observer.observe(item));

  return alwaysFunSection;
}

function createJoinUsSection() {
  const joinUsSection = document.createElement('div');
  joinUsSection.className = 'join-us';
  joinUsSection.innerHTML = `
    <div class="join-us-content">
      <div class="join-us-text">
        <h2>Join the Milton Casino fam!</h2>
        <p>Ready to be part of the Milton crew? Mingle with like-minded <br> players and enjoy exclusive offers and competitions with our <br> friendly community of Milton champs.</p>
        <div class="join-us-button">
          <button class="signup-button">SIGN UP</button>
        </div>
      </div>
      <div class="join-us-circle">
        <div class="join-us-img">
          <img src="../src/imagery/variousIcons/b09.png" alt="Image of Cleopatra">
        </div>
      </div>
    </div>
  `;

  const signupButton = joinUsSection.querySelector('.signup-button');
  signupButton.addEventListener('click', () => {
    window.location.href = 'sign-up.html';
  });

  return joinUsSection;
}

async function createAdditionalInformationSection() {
  const infoItems = [
    {
      title: "Lightning fast checkouts",
      text: "We accept fast and secure payments from all the leading payment providers without additional fees.",
      img: "../src/imagery/variousIcons/bmap (2).png",
      alt: "Elephant",
      order: 1
    },
    {
      title: "Round-the-clock customer service",
      text: "If you can't find the answer to your question you can always get in touch with our Support team.",
      img: "../src/imagery/variousIcons/bmap (3).png",
      alt: "Clown",
      order: 2
    },
    {
      title: "Protecting your privacy",
      text: "We prioritize your privacy and safety with strict measures in place to protect your information, so you can enjoy your favorite games with peace of mind in a safe environment.",
      img: "../src/imagery/variousIcons/bmap (1).png",
      alt: "Staff",
      order: 3
    }
  ];

  function createInfoItems(items) {
    return items.map(item => `
      <div class="additional-information-section-content-item additional-information-section-content-item-${item.order}">
        <div class="additional-information-section-content-item-textbox additional-information-section-content-item-textbox-${item.order}">
          <h2>${item.title}</h2>
          <p>${item.text}</p>
        </div>
        <img src="${item.img}" alt="${item.alt}" class="additional-information-section-content-item-img">
      </div>
    `).join('');
  }

  const additionalInformationSection = document.createElement('div');
  additionalInformationSection.className = 'additional-information-section';
  additionalInformationSection.innerHTML = `
    <div class="additional-information-section-content">
      ${createInfoItems(infoItems)}
    </div>
  `;

  // Animation.
  // Set opacity to 1 when the element enters the viewport. 
  function observeItems(entry) {
    entry.isIntersecting && (entry.target.style.opacity = '1', entry.target.style.transform = 'translateY(0)');
  }
  
    // Create observer that will use observeItems for each entry
    const observer = new IntersectionObserver(entries => entries.forEach(observeItems));
  
    // Find all items and tell observer to watch them
    additionalInformationSection.querySelectorAll('.additional-information-section-content-item')
      .forEach(item => observer.observe(item));

  return additionalInformationSection;
}


async function createNewToMiltonSection() {
  const newToMiltonSection = document.createElement('div');
  newToMiltonSection.className = 'more-info';
  newToMiltonSection.innerHTML = `
    <div class="more-info-content milton">
      <div class="content-box">
        <div class="text-box">
          <h2>New to Milton Casino?</h2>
          <p>Love playing casino-style games online for free? You're in the right place—welcome to Milton Casino! You'll find more slots, jackpots than you can shake a cotton candy stick at. And you can play them all for free instantly, no downloading required. Our social casino-style games can be streamed from any device wherever, whenever you want.</p>
          <p>Playing free casino-style games online with us couldn't be easier. Not only is it entirely free to set up an account—and to play—we've also got hundreds of games to choose from, with new casino-style games dropping into the collection almost every week. So, whatever online casino-style game you're into—be it Blackjack, Roulette, or stampeding buffalo slots—you'll always find something new, and hopefully, something you love!</p>
          <p>There's no better place to play casino-style games online for free. Milton Casino is home to the best online casino-style games—over one million players play our games every single day, so if you don't believe us, you can ask them yourself! Our Milton fam loves adding new members to the clan. And the best bit? It's entirely free to sign up and play.</p>
          <p>All you need to do is set up a free Milton Casino account to get started. It's pretty straightforward to set up, but if you have any questions, our Support Team is on hand to help you 24/7. Just hit the 'contact' button at the top of the page to connect with them.</p>
          <p>So what are you waiting for? Play free casino-style games online with Milton Casino. You won't regret it!</p>
        </div>
      </div>
      <img src="../src/imagery/variousIcons/b20.png" alt="Panda-girl" class="more-information-section-content-item-img new-to-milton">
    </div>
  `;

  return newToMiltonSection;
}


async function createFinalInformationSection() {
  const finalInformationSection = document.createElement('div');
  finalInformationSection.className = 'more-info';
  finalInformationSection.innerHTML = `
    <div class="more-info-content play-free">
      <img 
        src="../src/imagery/variousIcons/b21.png" 
        alt="Bearded man" 
        class="content-img play-free"
      >
      <div class="content-box">
        <div class="text-box">
          <h2>Play casino-style games and slots online for free at Milton Casino!</h2>
          <p>The fun never stops at Milton Casino, and neither do our free online casino-style games! We've got hundreds of online casino-style games to choose from, and we're always launching new free online games!</p>
          
          <p>Don't believe us? Jump in to experience the wonder of Milton. Our rolling games feed features the best online casino-style games out there, so you can spin your way from dance floor beats one minute, to cosmic space shuttles the next.</p>
          
          <p>We've got everything you need to make game time whatever you want it to be.</p>
          
          <p>Play our free online casino-style games anywhere, anytime, any which way you like. And the best part? You don't have to make a purchase or download a thing! Our online games are always free to play, so you can tap in and tap out as much or as little as you like. We'll bring the fun, you bring your best moves.</p>
          
          <p>Over one million players love playing our free online casino-style games. Why shouldn't you enjoy them too?</p>
        </div>
      </div>
    </div>
  `;

  return finalInformationSection;  
}

























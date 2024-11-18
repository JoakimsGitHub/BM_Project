import { onDOMReady, renderCreationFunction } from './common.js';

// Initialize the section when DOM is ready.
onDOMReady(() => {
  renderCreationFunction(createAllGamesSection, 'all-games');
});

async function createAllGamesSection() {
  const allGamesSection = document.createElement('div');
  allGamesSection.className = 'all-games-section';
  allGamesSection.innerHTML = `
    <div class="all-games-section-content"></div>
  `;

  const contentSection = allGamesSection.querySelector('.all-games-section-content');
  contentSection.append(
    createSignUpSection(),
    await createGamesGrid() 
  );

  return allGamesSection;
}
 
function createSignUpSection() {
  const signUpSection = document.createElement('div');
  signUpSection.className = 'signup';
  signUpSection.innerHTML = `
    <div class="signup-content">
      <div class="signup-left">
        <div class="signup-text all-games">
          <h2>Game on at Milton <br> Casino!</h2>
          <p>For always-on fun and games, sign up <br> to Milton Casino.</p>
          <div class="signup-button">SIGN UP</div>
        </div>
      </div>
      <div class="signup-right">
        <div class="signup-img all-games">
          <img src="../src/imagery/variousIcons/ag.png" alt="Zeus">
        </div>
      </div>
    </div>
  `;

  return signUpSection;
}

// Creating a grid of different layout patterns. 
async function createGamesGrid() {

  async function fetchGames() {
    const url = 'https://clubcasinopreprod.sweepium.com:4010/ListGames?SiteKey=abc123456&Random=144';
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.list || [];  // Fallback for undefined list.
    } catch (error) {
      console.error(`There has been a problem with your fetch operation regarding ${url}:`, error);
      return null;  
    }
  }

  function createGrids(games) {
    const gridLayouts = [true, false, false, false, false, true, false, false];
    return gridLayouts
      .map((isLarge, i) => createGrid(games, isLarge, i + 1))
      .join('');
  }

  function createGrid(games, isLarge, gridNumber) {
    const gridGames = getRandomGames(games, isLarge ? 11 : 7);
    return `
      <div class="games-section">
        <div class="games-content">
          <div class="grid-${isLarge ? 'large' : 'small'}">
            ${isLarge 
              ? (gridNumber === 1 ? createLargeGrid(gridGames) : createLargeGridReversed(gridGames))
              : createSmallGrid(gridGames)}
          </div>
        </div>
      </div>
    `;
  }

  function createLargeGrid(games) {
    return `
      <div class="game-large">
        <img src="${games[0].urlThumbnailButton}" alt="${games[0].nameGame}">
      </div>
      <div class="game-row">
        ${games.slice(1, 6).map(game => createGameItem(game, 'medium')).join('')}
      </div>
      <div class="game-row">
        ${games.slice(6).map(game => createGameItem(game, 'medium')).join('')}
      </div>
    `;
  }

  function createLargeGridReversed(games) {
    return `
      <div class="game-row">
        ${games.slice(1, 6).map(game => createGameItem(game, 'medium')).join('')}
      </div>
      <div class="game-row">
        ${games.slice(6).map(game => createGameItem(game, 'medium')).join('')}
      </div>
      <div class="game-large">
        <img src="${games[0].urlThumbnailButton}" alt="${games[0].nameGame}">
      </div>
    `;
  }

  function createSmallGrid(games) {
    return games.map(game => createGameItem(game)).join('');
  }

  function createGameItem(game, size = 'medium') {
    return `
      <div class="game-${size}">
        <img src="${game.urlThumbnailButton}" alt="${game.nameGame}">
      </div>
    `;
  }

  function getRandomGames(games, count) {
    return games.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  // Main execution after helper functions. 
  const games = await fetchGames();
  const section = document.createElement('div');
  section.className = 'all-games-container';
  section.innerHTML = createGrids(games);
  return section;
}
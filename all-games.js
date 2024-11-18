import { onDOMReady, renderCreationFunction, fetchGames, getRandomGames } from './common.js';  

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

// Creating a grid of different layout patterns. // Creating a grid of different layout patterns. 
async function createGamesGrid() {

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
          ${isLarge 
            ? createLargeGrid(gridGames, gridNumber !== 1) 
            : createSmallGrid(gridGames)}
        </div>
      </div>
    `;
  }
  function createLargeGrid(games, isReversed = false) {
    // If gridNumber is not 1, and if not on mobile, then reverse the grid.
    const isDesktop = window.innerWidth > 430;
    const reversedClass = (isDesktop && isReversed) ? 'reversed' : '';
    return `
      <div class="grid-large ${reversedClass}"> 
        <div class="game-large">
          <img src="${games[0].urlThumbnailButton}" alt="${games[0].nameGame}">
        </div>
        <div class="game-row">
          ${games.slice(1, 6).map(game => createGameItem(game, 'medium')).join('')}
        </div>
        <div class="game-row">
          ${games.slice(6).map(game => createGameItem(game, 'medium')).join('')}
        </div>
      </div>
    `;
  }

  function createSmallGrid(games) {
    return `
      <div class="grid-small">
        ${games.map(game => createGameItem(game)).join('')}
      </div>
    `;
  }

  function createGameItem(game, size = 'medium') {
    return `
      <div class="game-${size}">
        <img src="${game.urlThumbnailButton}" alt="${game.nameGame}">
      </div>
    `;
  }

  // Main execution after helper functions. 
  const url = 'https://clubcasinopreprod.sweepium.com:4010/ListGames?SiteKey=abc123456&Random=144';
  const games = await fetchGames(url);  
  const section = document.createElement('div');
  section.className = 'all-games-container';
  section.innerHTML = createGrids(games);
  return section;
}
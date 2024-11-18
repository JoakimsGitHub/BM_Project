// Utility file for common logic as exported functions. 

// Wait until the DOM is ready before executing the callback (child appending).
export function onDOMReady(callback) {
   if (document.readyState === 'loading') {
     document.addEventListener('DOMContentLoaded', callback);
   } else {
     callback();
   }
 }

// Render the section (HTML structure) by appending it to the target location (element ID).
// Error handling through explicit checks and logging with early returns.
 export async function renderCreationFunction(creationFunction, locationId) {
   try {
    console.log(`Attempting to render into #${locationId}:`, JSON.stringify({
      id: locationId,
      type: typeof locationId,
      length: locationId.length,
      timestamp: new Date().toISOString()
    }, null, 2));

     const section = await creationFunction();
     const location = document.getElementById(locationId);
     
     // Was the section created?
     if (!section) {
       console.error(`Section creation failed for ${locationId}`);
       return;
     }
     
     // Does the location exist?
     if (!location) {
       console.error(`${locationId} was not found`);
       return;
     }
 
     // If the section and location are both valid, append the section.
     location.appendChild(section);
     console.log(`Successfully rendered section to #${locationId}`);
     
   } catch (error) {
     console.error(`Could not append section to ${locationId}:`, error);
   }
 }

// Fetching games data from the API endpoint.
export async function fetchGames(url) {
   try {
     const response = await fetch(url);
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     const data = await response.json();
     return data.list || [];
   } catch (error) {
     console.error(`There has been a problem with your fetch operation regarding ${url}:`, error);
     return null;
   }
 }
 
 // Returns a random subset of games from an array.
 export function getRandomGames(games, count) {
   try {
     return games.sort(() => 0.5 - Math.random()).slice(0, count);
   } catch (error) {
     console.error(`Error in getRandomGames: ${error}`);
     return [];
   }
 }
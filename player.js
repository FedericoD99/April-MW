console.log('player.js loaded'); // Debug log

// Array of players (expanded)
const players = [
    'Aaron Judge',
    'Gerrit Cole',
    'Juan Soto',
    'Giancarlo Stanton',
    'Anthony Volpe',
    'Anthony Rizzo',
    'Gleyber Torres',
    'Austin Wells'
];

// Array of player descriptions (parallel to players array)
const descriptions = [
    'Outfielder, power hitter, team captain',
    'Starting pitcher, ace of the rotation',
    'Outfielder, elite contact hitter',
    'Designated hitter, slugging powerhouse',
    'Shortstop, speedy rookie standout',
    'First baseman, veteran slugger',
    'Second baseman, dynamic infielder',
    'Catcher, rising defensive star'
];

// Store the last displayed indices
let lastDisplayedIndices = [];

// Shuffle array function
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Check if two arrays contain the same elements (order-independent)
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    const sorted1 = [...arr1].sort((a, b) => a - b);
    const sorted2 = [...arr2].sort((a, b) => a - b);
    return sorted1.every((val, i) => val === sorted2[i]);
}

// Get a random subset of player indices, ensuring variety
function getNewPlayerSubset() {
    const allIndices = Array.from({ length: players.length }, (_, i) => i);
    // Decide subset size: 3 or 4 players (75% chance of 4)
    const subsetSize = Math.random() < 0.75 ? 4 : 3;
    
    // Prioritize players not in the last display
    const notDisplayedLast = allIndices.filter(i => !lastDisplayedIndices.includes(i));
    
    let selectedIndices = [];
    // Try to get a different subset
    for (let attempt = 0; attempt < 2; attempt++) {
        selectedIndices = [];
        
        // Start with at least one player not shown last time (if possible)
        if (notDisplayedLast.length > 0) {
            const randomNotDisplayed = notDisplayedLast[Math.floor(Math.random() * notDisplayedLast.length)];
            selectedIndices.push(randomNotDisplayed);
        } else {
            // If all were displayed last, pick one randomly
            selectedIndices.push(allIndices[Math.floor(Math.random() * allIndices.length)]);
        }
        
        // Fill the rest of the subset
        const remainingPool = allIndices.filter(i => !selectedIndices.includes(i));
        const shuffledRemaining = shuffleArray(remainingPool);
        selectedIndices = selectedIndices.concat(shuffledRemaining.slice(0, subsetSize - 1));
        
        // Check if the subset is different from the last
        if (!arraysEqual(selectedIndices, lastDisplayedIndices) || attempt === 1) {
            break; // Accept if different or on second attempt
        }
    }
    
    lastDisplayedIndices = selectedIndices;
    return shuffleArray(selectedIndices); // Shuffle for random display order
}

// Display players with flip effect
function displayPlayers() {
    console.log('Displaying players'); // Debug log
    const playerList = document.getElementById('playerList');
    if (!playerList) {
        console.error('playerList not found'); // Debug log
        return;
    }
    playerList.innerHTML = '';

    // Get a new subset of player indices
    const shuffledIndices = getNewPlayerSubset();

    // Display players in the subset
    for (const index of shuffledIndices) {
        const li = document.createElement('li');
        li.className = 'list-group-item player-card';

        // Create flip container
        const flipContainer = document.createElement('div');
        flipContainer.className = 'flip-container';

        // Front side (player name)
        const front = document.createElement('div');
        front.className = 'card-front';
        front.textContent = players[index];

        // Back side (description)
        const back = document.createElement('div');
        back.className = 'card-back';
        back.textContent = descriptions[index];

        flipContainer.appendChild(front);
        flipContainer.appendChild(back);
        li.appendChild(flipContainer);
        playerList.appendChild(li);
    }
}

// Ensure DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded for player.js'); // Debug log
    const shuffleButton = document.getElementById('shuffleButton');
    if (shuffleButton) {
        shuffleButton.addEventListener('click', displayPlayers);
        displayPlayers(); // Initial display
    } else {
        console.error('shuffleButton not found'); // Debug log
    }
});
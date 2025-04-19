console.log('players.js loaded'); // Debug log

// Array of players
const players = [
    'Aaron Judge',
    'Gerrit Cole',
    'Juan Soto',
    'Giancarlo Stanton',
    'Anthony Volpe'
];

// Array of player descriptions (parallel to players array)
const descriptions = [
    'Outfielder, power hitter, team captain',
    'Starting pitcher, ace of the rotation',
    'Outfielder, elite contact hitter',
    'Designated hitter, slugging powerhouse',
    'Shortstop, speedy rookie standout'
];

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

    // Shuffle indices to keep players and descriptions paired
    const indices = Array.from({ length: players.length }, (_, i) => i);
    const shuffledIndices = shuffleArray([...indices]);

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
    console.log('DOM loaded for players.js'); // Debug log
    const shuffleButton = document.getElementById('shuffleButton');
    if (shuffleButton) {
        shuffleButton.addEventListener('click', displayPlayers);
        displayPlayers(); // Initial display
    } else {
        console.error('shuffleButton not found'); // Debug log
    }
});
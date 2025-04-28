console.log('highlights.js loaded');

// Array of default highlights (shown when search is empty)
const highlights = [
    'Judge hits 50th home run of the season!',
    'Cole pitches a shutout against Red Sox.',
    'Soto’s walk-off single seals victory.',
    'Stanton’s grand slam in the 9th inning.',
    'Volpe steals three bases in a single game.'
];

// Array of additional players and their highlights (shown only when searched)
const additionalPlayerHighlights = [
    '', // Judge (no additional highlight)
    '', // Cole
    '', // Soto
    '', // Stanton
    '', // Volpe
    'Rizzo smashes a game-tying homer in the 8th!', // Rizzo
    'Torres delivers a clutch RBI double!', // Torres
    'Wells makes a diving catch to save the game!' // Wells
];

// Array of known player names (for matching search terms)
const playerNames = [
    'Judge',
    'Cole',
    'Soto',
    'Stanton',
    'Volpe',
    'Rizzo',
    'Torres',
    'Wells'
];

// Display highlights based on filter
const displayHighlights = function(filter) {
    console.log('Filtering with:', filter);
    const highlightList = document.getElementById('highlightList');
    if (!highlightList) {
        console.error('highlightList element not found');
        return;
    }
    highlightList.innerHTML = '';
    const filteredHighlights = [];
    const searchTerm = filter.trim().toLowerCase();

    // If search is empty, show default highlights
    if (searchTerm === '') {
        for (let i = 0; i < highlights.length; i++) {
            filteredHighlights.push(highlights[i]);
        }
    } else {
        // Check main highlights for matches
        for (let i = 0; i < highlights.length; i++) {
            if (highlights[i].toLowerCase().includes(searchTerm)) {
                filteredHighlights.push(highlights[i]);
            }
        }
        // Check additional player highlights for matches
        for (let i = 0; i < playerNames.length; i++) {
            if (playerNames[i].toLowerCase() === searchTerm) {
                console.log('Matched player:', playerNames[i]);
                // Add corresponding highlight from additionalPlayerHighlights if it exists
                if (i < additionalPlayerHighlights.length && additionalPlayerHighlights[i]) {
                    filteredHighlights.push(additionalPlayerHighlights[i]);
                }
                break;
            }
        }
    }

    // Display results
    if (filteredHighlights.length > 0) {
        for (let i = 0; i < filteredHighlights.length; i++) {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = filteredHighlights[i];
            highlightList.appendChild(li);
        }
    } else {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        // Check if search term matches any player name
        let isPlayer = false;
        for (let i = 0; i < playerNames.length; i++) {
            if (playerNames[i].toLowerCase() === searchTerm) {
                isPlayer = true;
                break;
            }
        }
        if (isPlayer) {
            li.textContent = 'No highlights found for ' + filter.trim() + '. Check back for updates!';
        } else {
            li.textContent = 'No highlights found.';
        }
        highlightList.appendChild(li);
    }
};

// Debounce function
const debounce = function(func, wait) {
    let timeout;
    return function(...args) {
        const later = function() {
            timeout = null;
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Handle feedback submission
const handleFeedback = function() {
    const feedbackName = document.getElementById('feedbackName');
    const feedbackText = document.getElementById('feedbackText');
    const submitButton = document.getElementById('submitFeedback');
    const feedbackMessage = document.getElementById('feedbackMessage');

    if (!feedbackName || !feedbackText || !submitButton || !feedbackMessage) {
        console.error('Feedback form elements missing');
        return;
    }

    if (feedbackName.value.trim() && feedbackText.value.trim()) {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        feedbackMessage.style.display = 'none';

        // Simulate submission delay
        setTimeout(function() {
            feedbackMessage.textContent = 'Thank you for your feedback!';
            feedbackMessage.style.display = 'block';
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Feedback';
            feedbackName.value = '';
            feedbackText.value = '';
        }, 1000);
    } else {
        feedbackMessage.textContent = 'Please fill out both name and feedback fields.';
        feedbackMessage.style.display = 'block';
    }
};

// DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded for highlights.js');
    const filterInput = document.getElementById('filterInput');
    if (filterInput) {
        const debouncedDisplayHighlights = debounce(displayHighlights, 300);
        filterInput.addEventListener('input', function() {
            console.log('Input event fired:', filterInput.value);
            debouncedDisplayHighlights(filterInput.value);
        });
        displayHighlights('');
    } else {
        console.error('filterInput element not found');
    }

    const submitButton = document.getElementById('submitFeedback');
    if (submitButton) {
        submitButton.addEventListener('click', handleFeedback);
    } else {
        console.error('submitFeedback button not found');
    }
});
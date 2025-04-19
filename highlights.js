console.log('highlights.js loaded'); // Debug log

// Array of highlights
const highlights = [
    'Judge hits 50th home run of the season!',
    'Cole pitches a shutout against Red Sox.',
    'Soto’s walk-off single seals victory.',
    'Stanton’s grand slam in the 9th inning.',
    'Volpe steals three bases in a single game.'
];

// Display highlights based on filter
function displayHighlights(filter = '') {
    console.log('Filtering with:', filter); // Debug log
    const highlightList = document.getElementById('highlightList');
    if (!highlightList) {
        console.error('highlightList not found'); // Debug log
        return;
    }
    highlightList.innerHTML = '';
    const filteredHighlights = [];
    const searchTerm = filter.trim().toLowerCase();

    for (const highlight of highlights) {
        if (highlight.toLowerCase().includes(searchTerm)) {
            filteredHighlights.push(highlight);
        }
    }

    if (filteredHighlights.length > 0) {
        for (const highlight of filteredHighlights) {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = highlight;
            highlightList.appendChild(li);
        }
    } else {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = 'No highlights found.';
        highlightList.appendChild(li);
    }
}

// Debounce function to limit rapid input events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Ensure DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded for highlights.js'); // Debug log
    const filterInput = document.getElementById('filterInput');
    if (filterInput) {
        const debouncedDisplayHighlights = debounce(displayHighlights, 300);
        filterInput.addEventListener('input', () => {
            debouncedDisplayHighlights(filterInput.value);
        });
        displayHighlights(); // Initial display
    } else {
        console.error('filterInput not found'); // Debug log
    }
});
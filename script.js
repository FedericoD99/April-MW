console.log('index.js loaded'); // Debug log

// Array for news messages
const messages = [
    "Yankees sign new pitcher for 2025!",
    "Judge named MVP candidate!",
    "Check out the new merchandise!"
];

// Function to show random news message
function showNewsMessage() {
    console.log('Latest News button clicked'); // Debug log
    const newsMessageDiv = document.getElementById('newsMessage');
    if (!newsMessageDiv) {
        console.error('newsMessage div not found'); // Debug log
        return;
    }
    const randomIndex = Math.floor(Math.random() * messages.length);
    const selectedMessage = messages[randomIndex];
    newsMessageDiv.textContent = selectedMessage;
    newsMessageDiv.style.display = 'block';
    console.log('Displaying message:', selectedMessage); // Debug log
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded for index.js'); // Debug log
    const newsButton = document.getElementById('newsButton');
    if (newsButton) {
        newsButton.addEventListener('click', showNewsMessage);
    } else {
        console.error('newsButton not found'); // Debug log
    }
});
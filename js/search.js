const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchFrame = document.querySelector('#search-frame');

function getDestination(value) {
    const trimmedValue = value.trim();
    const hasProtocol = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmedValue);
    const looksLikeUrl = /^[^\s/]+\.[^\s/]+(?:\/[^\s]*)?$/i.test(trimmedValue);

    if (hasProtocol) {
        return trimmedValue;
    }

    if (looksLikeUrl) {
        return `https://${trimmedValue}`;
    }

    return `https://www.google.com/search?q=${encodeURIComponent(trimmedValue)}`;
}

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    searchFrame.src = getDestination(searchInput.value);
});

searchInput.focus();

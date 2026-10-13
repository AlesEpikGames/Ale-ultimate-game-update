const searchFaceImage = 'https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/671ffb924cdb9c1818e2724c_100.png';
const searchFaceSize = 88;
const searchFaceStates = [];
let searchFaceAnimationFrame;

for (let index = 0; index < 12; index++) {
    const face = document.createElement('img');
    face.className = 'floating-face';
    face.src = searchFaceImage;
    face.alt = '';
    const state = {
        element: face,
        x: 8 + ((index * 17) % 84) * window.innerWidth / 100,
        y: 12 + ((index * 23) % 74) * window.innerHeight / 100,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5
    };
    searchFaceStates.push(state);
    face.addEventListener('click', () => {
        state.vx = (Math.random() - 0.5) * 12;
        state.vy = -7 - Math.random() * 5;
    });
    document.body.appendChild(face);
}

for (let index = 0; index < 55; index++) {
    const particle = document.createElement('span');
    particle.className = 'background-particle';
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.setProperty('--duration', `${6 + (index % 5) * 1.2}s`);
    particle.style.setProperty('--delay', `${-(Math.random() * 6)}s`);
    document.body.appendChild(particle);
}

function moveSearchFaces() {
    if (document.body.classList.contains('chromebook-mode')) {
        searchFaceAnimationFrame = null;
        return;
    }

    searchFaceStates.forEach(state => {
        state.x += state.vx;
        state.y += state.vy;
        state.vy += 0.08;

        if (state.x <= 0 || state.x >= window.innerWidth - searchFaceSize) {
            state.x = Math.max(0, Math.min(state.x, window.innerWidth - searchFaceSize));
            state.vx *= -1;
        }
        if (state.y <= 0 || state.y >= window.innerHeight - searchFaceSize) {
            state.y = Math.max(0, Math.min(state.y, window.innerHeight - searchFaceSize));
            state.vy *= -0.9;
        }

        state.element.style.left = `${state.x}px`;
        state.element.style.top = `${state.y}px`;
    });

    searchFaceAnimationFrame = requestAnimationFrame(moveSearchFaces);
}

document.addEventListener('chromebookmodechange', event => {
    if (event.detail.enabled) {
        cancelAnimationFrame(searchFaceAnimationFrame);
        searchFaceAnimationFrame = null;
    } else if (searchFaceAnimationFrame === null) {
        searchFaceAnimationFrame = requestAnimationFrame(moveSearchFaces);
    }
});

moveSearchFaces();

(() => {
    const faceImage = 'https://cdn3.emoji.gg/default/apple/money-mouth-face.png';
    const faceSize = 88;
    const faceStates = [];
    let faceAnimationFrame;

    function addParticles() {
        for (let index = 0; index < 55; index++) {
            const particle = document.createElement('span');
            particle.className = 'background-particle';
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.setProperty('--duration', `${6 + (index % 5) * 1.2}s`);
            particle.style.setProperty('--delay', `${-(Math.random() * 6)}s`);
            document.body.appendChild(particle);
        }
    }

    function moveFaces() {
        faceStates.forEach(state => {
            state.x += state.vx;
            state.y += state.vy;
            state.vy += 0.08;

            if (state.x <= 0 || state.x >= window.innerWidth - faceSize) {
                state.x = Math.max(0, Math.min(state.x, window.innerWidth - faceSize));
                state.vx *= -1;
            }
            if (state.y <= 0 || state.y >= window.innerHeight - faceSize) {
                state.y = Math.max(0, Math.min(state.y, window.innerHeight - faceSize));
                state.vy *= -0.9;
            }

            state.element.style.left = `${state.x}px`;
            state.element.style.top = `${state.y}px`;
        });

        faceAnimationFrame = requestAnimationFrame(moveFaces);
    }

    function addMovingFaces() {
        for (let index = 0; index < 12; index++) {
            const face = document.createElement('img');
            face.className = 'floating-face';
            face.src = faceImage;
            face.alt = '';
            const state = {
                element: face,
                x: 8 + ((index * 17) % 84) * window.innerWidth / 100,
                y: 12 + ((index * 23) % 74) * window.innerHeight / 100,
                vx: (Math.random() - 0.5) * 2.5,
                vy: (Math.random() - 0.5) * 2.5
            };
            faceStates.push(state);
            face.addEventListener('click', () => {
                state.vx = (Math.random() - 0.5) * 12;
                state.vy = -7 - Math.random() * 5;
            });
            document.body.appendChild(face);
        }

        moveFaces();
    }

    const savedBackground = localStorage.getItem('homeBackground');
    if (savedBackground) {
        document.body.style.backgroundImage = `url("${savedBackground}")`;
    } else {
        addMovingFaces();
        addParticles();
    }
})();
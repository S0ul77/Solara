// Initialize particles
function initParticles() {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": document.body.classList.contains('light-mode') ? "#000000" : "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": document.body.classList.contains('light-mode') ? "#000000" : "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

// Initialize particles on load
initParticles();

// Back to top button functionality
window.onscroll = function() {
    const backToTop = document.getElementById('back-to-top');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
};

document.getElementById('back-to-top').onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Toggle light/dark mode
document.getElementById('toggle-theme').onclick = function() {
    document.body.classList.add('theme-transition');
    document.body.classList.toggle('light-mode');
    this.textContent = document.body.classList.contains('light-mode') ? 'Dark Mode' : 'Light Mode';
    // Re-initialize particles with the new color
    pJSDom[0].pJS.fn.vendors.destroypJS();
    pJSDom = [];
    initParticles();
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);
};

// Custom Crosshair
const crosshair = document.getElementById('custom-crosshair');
let lastX = 0, lastY = 0;
let lastMoveTime = Date.now();

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    const timeDiff = now - lastMoveTime;
    lastMoveTime = now;

    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / timeDiff;
    const size = Math.max(20 - speed * 20, 10); // Adjust size based on speed

    crosshair.style.width = `${size}px`;
    crosshair.style.height = `${size}px`;

    const x = e.clientX - size / 2;
    const y = e.clientY - size / 2;

    crosshair.style.transform = `translate(${x}px, ${y}px)`;
});

// Add event listeners for buttons and clickable objects to change the crosshair to filled, enlarge, and change color
const clickableElements = document.querySelectorAll('button, a, input, [role="button"]');
clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        crosshair.classList.add('hovering');
    });
    element.addEventListener('mouseleave', () => {
        crosshair.classList.remove('hovering');
    });
});

// Add click effect to shrink crosshair
document.addEventListener('mousedown', () => {
    crosshair.classList.add('clicked');
    setTimeout(() => {
        crosshair.classList.remove('clicked');
    }, 100);
});

// Grid Opening Animation
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah datang dari navigasi internal website
    // Jika referrer URL berasal dari domain yang sama, berarti navigasi internal
    const isInternalNavigation = document.referrer && 
                                new URL(document.referrer).hostname === window.location.hostname;
    
    if (isInternalNavigation) {
        // Jika navigasi dari halaman internal website, langsung tampilkan konten tanpa animasi
        const gridOverlay = document.querySelector('.grid-overlay');
        if (gridOverlay) {
            gridOverlay.style.display = 'none';
        }
        initMainContentWithoutAnimation();
    } else {
        // Jika bukan navigasi internal (misalnya refresh atau kunjungan baru), tampilkan animasi
        createGrid();
        
        // Mulai animasi grid dengan sedikit delay
        setTimeout(function() {
            animateGrid();
        }, 300);
    }
});

// Fungsi untuk membuat grid
function createGrid() {
    const gridContainer = document.querySelector('.grid-container');
    const rows = 8;
    const cols = 12;
    
    // Hapus semua child elements yang ada
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    
    // Buat rows dan cells
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'grid-row';
        
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            row.appendChild(cell);
        }
        
        gridContainer.appendChild(row);
    }
}

// Fungsi untuk animasi grid cells
function animateGrid() {
    if (typeof gsap === 'undefined') {
        console.error("GSAP tidak ditemukan");
        document.querySelector('.grid-overlay').style.display = 'none';
        initMainContent();
        return;
    }
    
    const gridCells = document.querySelectorAll('.grid-cell');
    const logo = document.querySelector('.grid-logo');
    const gridOverlay = document.querySelector('.grid-overlay');
    
    // Pastikan overlay terlihat
    gsap.set(gridOverlay, { opacity: 1, display: 'flex' });
    
    // Buat timeline untuk animasi grid
    const gridTimeline = gsap.timeline({
        onComplete: function() {
            // Fade out overlay dan transisi ke konten utama
            gsap.to(gridOverlay, {
                opacity: 0,
                duration: 0.5,
                ease: "power1.in",
                onComplete: function() {
                    gridOverlay.style.display = 'none';
                    initMainContent();
                }
            });
        }
    });
    
    // Highlight cells dalam pola acak
    gridTimeline
        // Set initial state untuk cells
        .set(gridCells, { opacity: 0 })
        
        // Animasi masuk untuk cells dengan stagger
        .to(gridCells, {
            opacity: 1,
            duration: 0.8,
            stagger: {
                each: 0.01,
                grid: [8, 12],
                from: "center",
                ease: "power1.in"
            }
        })
        
        // Tampilkan logo
        .to(logo, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4")
        
        // Pattern 1: Highlight dari tengah ke luar
        .call(function() {
            highlightPattern("center-out", gridCells);
        })
        
        // Pattern 2: Highlight dari kiri ke kanan
        .call(function() {
            setTimeout(function() {
                highlightPattern("left-right", gridCells);
            }, 600);
        })
        
        // Pattern 3: Highlight diagonal
        .call(function() {
            setTimeout(function() {
                highlightPattern("diagonal", gridCells);
            }, 1200);
        })
        
        // Animasi zoom out untuk grid cells
        .to(gridCells, {
            scale: 1.2,
            opacity: 0,
            stagger: {
                each: 0.01,
                grid: [8, 12],
                from: "center",
                ease: "power2.in"
            },
            duration: 0.5
        }, "+=0.8")
        
        // Animasi final untuk logo
        .to(logo, {
            scale: 1.2,
            duration: 0.3,
            ease: "power2.inOut"
        }, "-=0.3")
        .to(logo, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
        });
}

// Fungsi untuk membuat pola highlight pada grid
function highlightPattern(pattern, cells) {
    const rows = 8;
    const cols = 12;
    
    // Reset semua cells
    cells.forEach(cell => {
        cell.classList.remove('highlight');
    });
    
    // Buat array cells 2D untuk akses mudah
    const cellsGrid = Array(rows).fill().map(() => Array(cols).fill());
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        cellsGrid[row][col] = cell;
    });
    
    switch (pattern) {
        case "center-out":
            // Tentukan pusat grid
            const centerRow = Math.floor(rows / 2);
            const centerCol = Math.floor(cols / 2);
            
            // Highlight cells dari pusat keluar
            for (let radius = 0; radius <= Math.max(rows, cols); radius++) {
                setTimeout(function() {
                    for (let i = 0; i < rows; i++) {
                        for (let j = 0; j < cols; j++) {
                            const distance = Math.abs(i - centerRow) + Math.abs(j - centerCol);
                            if (distance === radius) {
                                cellsGrid[i][j].classList.add('highlight');
                            }
                        }
                    }
                }, radius * 50);
            }
            break;
            
        case "left-right":
            // Highlight cells dari kiri ke kanan
            for (let j = 0; j < cols; j++) {
                setTimeout(function() {
                    for (let i = 0; i < rows; i++) {
                        cellsGrid[i][j].classList.add('highlight');
                    }
                }, j * 50);
            }
            break;
            
        case "diagonal":
            // Highlight cells secara diagonal
            const totalDiagonals = rows + cols - 1;
            for (let d = 0; d < totalDiagonals; d++) {
                setTimeout(function() {
                    for (let i = 0; i < rows; i++) {
                        for (let j = 0; j < cols; j++) {
                            if (i + j === d) {
                                cellsGrid[i][j].classList.add('highlight');
                            }
                        }
                    }
                }, d * 50);
            }
            break;
    }
}

// Fungsi untuk menginisialisasi konten utama tanpa animasi
function initMainContentWithoutAnimation() {
    // Deteksi apakah mobile atau desktop
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        // Tampilkan konten mobile
        document.body.classList.add('mobile-view');
        const mobileContainer = document.querySelector('.mobile-container');
        if (mobileContainer) {
            mobileContainer.style.display = 'block';
        }
        
        // Setup typing effect untuk mobile
        setupMobileTyped();
    } else {
        // Pastikan mobile view tidak aktif
        document.body.classList.remove('mobile-view');
        
        // Set elemen-elemen langsung terlihat tanpa animasi
        gsap.set('nav, .hero, .skills-bar', { opacity: 1 });
        
        // Setup typing effect untuk desktop
        setupTypingEffect();
        
        // Set up efek hover untuk logo
        setupLogoHoverEffect();
    }
    
    // Jalankan AOS untuk semua device
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            disable: 'mobile'
        });
    }
    
    // Inisialisasi Particles.js
    initParticles();
}

// Fungsi untuk menginisialisasi konten utama
function initMainContent() {
    // Deteksi apakah mobile atau desktop
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        // Tampilkan konten mobile
        document.body.classList.add('mobile-view');
        const mobileContainer = document.querySelector('.mobile-container');
        if (mobileContainer) {
            mobileContainer.style.display = 'block';
        }
        
        // Setup typing effect untuk mobile
        setupMobileTyped();
    } else {
        // Pastikan mobile view tidak aktif
        document.body.classList.remove('mobile-view');
        
        // Animasi desktop
        gsap.set('nav, .hero, .skills-bar', { opacity: 0 });
        
        gsap.to('nav', {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: function() {
                // Animasi nav links setelah nav muncul
                gsap.from(".nav-links li", {
                    opacity: 0,
                    y: -20,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "power2.out"
                });
                
                // Set up efek hover untuk logo
                setupLogoHoverEffect();
            }
        });
        
        gsap.to('.hero', {
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out"
        });
        
        gsap.to('.skills-bar', {
            opacity: 1,
            duration: 0.5,
            delay: 0.4,
            ease: "power2.out"
        });
        
        // Setup typing effect untuk desktop
        setupTypingEffect();
    }
    
    // Jalankan AOS untuk semua device
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            disable: 'mobile'
        });
    }
    
    // Inisialisasi Particles.js
    initParticles();
}

// Fungsi untuk setup efek hover pada logo
function setupLogoHoverEffect() {
    const logo = document.querySelector('nav .logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            gsap.to(logo.querySelector('img'), {
                rotation: 10,
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        logo.addEventListener('mouseleave', function() {
            gsap.to(logo.querySelector('img'), {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.in"
            });
        });
    }
}

// Fungsi untuk setup typing effect desktop
function setupTypingEffect() {
    // Hapus instansi typed lama jika ada
    if (window.typedInstance) {
        window.typedInstance.destroy();
    }
    
    // Inisialisasi Typed.js
    if (typeof Typed !== 'undefined' && document.getElementById('typed-text')) {
        window.typedInstance = new Typed('#typed-text', {
            strings: [' Ahmad Syarif Hidayatullah,'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true,
            smartBackspace: true
        });
    }
}

// Setup mobile typing effect
function setupMobileTyped() {
    // Hapus instansi typed lama jika ada
    if (window.mobileTypedInstance) {
        window.mobileTypedInstance.destroy();
    }
    
    // Inisialisasi Typed.js di mobile
    const mobileTypedElement = document.querySelector('#typed-text-mobile');
    if (typeof Typed !== 'undefined' && mobileTypedElement) {
        // Reset styling untuk container
        const nameContainer = document.querySelector('.name-line');
        if (nameContainer) {
            nameContainer.style.width = '100%';
        }
        
        window.mobileTypedInstance = new Typed('#typed-text-mobile', {
            strings: ['Ahmad Syarif Hidayatullah,'],
            typeSpeed: 40,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true,
            smartBackspace: true
        });
        
        // Pastikan kursor typed.js terlihat dan berada pada posisi yang tepat
        setTimeout(function() {
            const cursor = document.querySelector('.typed-cursor');
            if (cursor) {
                cursor.style.verticalAlign = 'baseline';
                cursor.style.marginLeft = '2px';
                cursor.style.display = 'inline-block';
            }
        }, 500);
    }
}

// Inisialisasi Particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#c1a71a"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#c1a71a",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
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
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 150,
                        "size": 6,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.warn("Particles.js tidak ditemukan");
    }
}

// Event untuk resize window
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        document.body.classList.add('mobile-view');
        
        // Setup mobile typed jika perlu
        if (typeof setupMobileTyped === 'function') {
            setupMobileTyped();
        }
    } else {
        document.body.classList.remove('mobile-view');
        
        // Setup desktop typed jika perlu
        if (typeof setupTypingEffect === 'function') {
            setupTypingEffect();
        }
    }
});


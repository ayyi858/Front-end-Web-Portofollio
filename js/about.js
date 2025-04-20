// desktop-about.js - Khusus fungsi-fungsi untuk tampilan desktop

document.addEventListener('DOMContentLoaded', function() {
    console.log('Desktop about.js loaded');
    
    // Deteksi apakah perangkat desktop
    const isDesktop = window.innerWidth > 767;
    
    // Inisialisasi AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
        console.log('AOS initialized');
    }

    // Animasi typed.js untuk judul
    if (document.querySelector('.typing-title') && typeof Typed !== 'undefined') {
        var typed = new Typed('.typing-title', {
            strings: ["Who is Ahmad Syarif Hidayatullah ?"],
            typeSpeed: 80,
            startDelay: 300,
            showCursor: false,
            loop: false
        });
        console.log('Typed.js initialized');
    }
    
    // Animasi smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetEl = document.querySelector(this.getAttribute('href'));
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Inisialisasi particles.js
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
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
        console.log('Particles.js initialized');
    }

    // Animasi untuk skill progress bars
    setTimeout(function() {
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach(function(bar) {
            const progressValue = bar.getAttribute('data-progress');
            if (progressValue) {
                bar.style.width = progressValue + '%';
            }
        });
    }, 500);

    // Intersection Observer untuk animasi saat scroll
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe semua kategori skill
        document.querySelectorAll('.skills-category').forEach(category => {
            observer.observe(category);
        });
    }

    // Hover effect untuk skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            if (icon) icon.style.transform = 'scale(1.1)';
            
            const progressBar = this.querySelector('.skill-progress');
            if (progressBar) progressBar.style.boxShadow = '0 0 15px rgba(241, 217, 89, 0.7)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            if (icon) icon.style.transform = 'scale(1)';
            
            const progressBar = this.querySelector('.skill-progress');
            if (progressBar) progressBar.style.boxShadow = '';
        });
    });
    
    // Jika desktop, setup tampilan desktop
    if (isDesktop) {
        setupDesktopView();
    }
});

// Tambahkan event listener resize untuk tampilan desktop
window.addEventListener('resize', function() {
    const isDesktop = window.innerWidth > 767;
    
    if (isDesktop && document.body.classList.contains('mobile-view')) {
        setupDesktopView();
    }
});

// Fungsi untuk setup desktop view
function setupDesktopView() {
    console.log('Setting up desktop view');
    
    // Hapus class mobile-view dari body
    document.body.classList.remove('mobile-view');
    document.body.classList.remove('menu-open');
    
    // Sembunyikan header mobile jika ada
    const mobileHeader = document.querySelector('.mobile-header');
    if (mobileHeader) {
        mobileHeader.style.display = 'none';
    }
    
    // Sembunyikan menu overlay jika masih terbuka
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        mobileMenu.style.display = 'none';
    }
    
    // Sembunyikan backdrop
    const menuBackdrop = document.querySelector('.menu-backdrop');
    if (menuBackdrop) {
        menuBackdrop.classList.remove('active');
        menuBackdrop.style.visibility = 'hidden';
    }
    
    // Tampilkan kembali header desktop
    const desktopHeader = document.querySelector('header');
    if (desktopHeader) {
        desktopHeader.style.display = 'block';
    }
    
    // Tampilkan kembali footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.display = 'block';
    }
    
    // Hapus styling mobile dari subsection titles jika ada
    const subsectionTitles = document.querySelectorAll('.subsection-title, .subsection-title1');
    subsectionTitles.forEach(title => {
        title.style.border = '';
        title.style.borderRadius = '';
        title.style.padding = '';
    });
    
    // Kembalikan tampilan kartu edukasi ke tampilan desktop
    const eduCards = document.querySelectorAll('.edu-card');
    eduCards.forEach(card => {
        const contentWrapper = card.querySelector('.edu-content-wrapper');
        if (contentWrapper) {
            // Kembalikan ke format desktop jika perlu
        }
    });
}
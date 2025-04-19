// Consolidated about.js - Menggabungkan fungsi dari dua file JS sebelumnya
// dan menghilangkan duplikasi kode

// Pastikan DOM telah dimuat sepenuhnya
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Deteksi apakah perangkat mobile
    const isMobile = window.innerWidth <= 767;
    console.log('isMobile:', isMobile);
    
    // Inisialisasi AOS (Animate on Scroll) - cukup sekali saja
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
        console.log('AOS initialized');
    } else {
        console.warn('AOS library not found');
    }

    // Animasi typed.js untuk judul - hanya typing sekali
    if (document.querySelector('.typing-title') && typeof Typed !== 'undefined') {
        var typed = new Typed('.typing-title', {
            strings: ["Who is Ahmad Syarif Hidayatullah ?"],
            typeSpeed: 80,          // Kecepatan typing
            startDelay: 300,        // Delay sebelum mulai typing
            showCursor: false,      // Sembunyikan kursor
            loop: false,            // Tidak perlu loop
            onComplete: function(self) {
                // Teks tetap ada setelah selesai
            }
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
                console.log('Scrolled to:', this.getAttribute('href'));
            }
        });
    });

    // Inisialisasi particles.js - cukup sekali saja
    if (document.getElementById('particles-js')) {
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
            console.log('Particles.js initialized');
        } else {
            console.warn("particles.js not loaded yet");
            // Coba load particles.js jika belum tersedia
            loadScript('https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js', function() {
                if (typeof particlesJS !== 'undefined') {
                    particlesJS("particles-js", { /* konfigurasi sama seperti di atas */ });
                    console.log('Particles.js loaded and initialized dynamically');
                }
            });
        }
    }

    // Animasi untuk skill progress bars - sekali saja di awal
    setTimeout(function() {
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach(function(bar) {
            const progressValue = bar.getAttribute('data-progress');
            if (progressValue) {
                bar.style.width = progressValue + '%';
                console.log('Progress bar set to:', progressValue + '%');
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
                    console.log('Animated element:', entry.target.className);
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

    // Setup mobile atau desktop view berdasarkan ukuran layar
    if (isMobile) {
        setupMobileView();
    } else {
        setupDesktopView();
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
});

// Tambahkan event listener resize untuk menyesuaikan tampilan saat resize
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        if (!document.body.classList.contains('mobile-view')) {
            setupMobileView();
        }
    } else {
        if (document.body.classList.contains('mobile-view')) {
            setupDesktopView();
        }
    }
});

// Fungsi untuk setup mobile view
function setupMobileView() {
    console.log('Setting up mobile view');
    
    // Tambahkan class mobile-view ke body
    document.body.classList.add('mobile-view');
    
    // Buat mobile header jika belum ada
    if (!document.querySelector('.mobile-header')) {
        const mobileHeader = document.createElement('div');
        mobileHeader.className = 'mobile-header';
        mobileHeader.innerHTML = `
            <div class="logo">
                <img src="img/logorev.png" alt="AY Productions Logo">
            </div>
            <div class="menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        document.body.insertBefore(mobileHeader, document.body.firstChild);
        console.log('Mobile header created');
        
        // Event listener untuk menu toggle
        const menuToggle = mobileHeader.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                console.log('Menu toggle clicked');
                showMobileMenu();
            });
        }
    }
    

    // Style subsection titles sesuai mobile design
    const subsectionTitles = document.querySelectorAll('.subsection-title, .subsection-title1');
    subsectionTitles.forEach(title => {
        title.style.border = '1px solid #c1a71a';
        title.style.borderRadius = '20px';
        title.style.padding = '5px 15px';
        console.log('Styled subsection title');
    });
    
    // Style card pendidikan sesuai mobile design
    const eduCards = document.querySelectorAll('.edu-card');
    eduCards.forEach((card, index) => {
        // Check if already processed
        if (!card.querySelector('.edu-content-wrapper')) {
            const cardContent = card.innerHTML;
            const schoolLogo = card.querySelector('.school-logo');
            if (schoolLogo) {
                const contentWrapper = document.createElement('div');
                contentWrapper.className = 'edu-content-wrapper';
                contentWrapper.innerHTML = cardContent.replace(schoolLogo.outerHTML, '');
                
                card.innerHTML = '';
                card.appendChild(schoolLogo);
                card.appendChild(contentWrapper);
                console.log(`Edu card ${index} restyled`);
            }
        }
    });
    
    // Sembunyikan header desktop dan footer untuk tampilan mobile
    const desktopHeader = document.querySelector('header');
    if (desktopHeader) {
        desktopHeader.style.display = 'none';
        console.log('Desktop header hidden');
    }
    
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.display = 'none';
        console.log('Footer hidden');
    }
}

// Fungsi untuk menampilkan menu mobile
function showMobileMenu() {
    console.log('showMobileMenu function called');
    
    // Cek apakah menu mobile overlay sudah ada
    let mobileMenu = document.querySelector('.mobile-menu-overlay');
    
    if (!mobileMenu) {
        console.log('Creating mobile menu overlay');
        // Buat menu overlay
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu-overlay';
        mobileMenu.innerHTML = `
            <div class="mobile-menu-header">
                <div class="logo">
                    <img src="img/logorev.png" alt="AY Productions Logo">
                </div>
                <div class="menu-close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="x-icon">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
            </div>
            <h2 class="mobile-menu-title">Navigation</h2>
            <ul class="mobile-nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html" class="active">About Me</a></li>
                <li><a href="porto.html">Portfolio</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
            <div class="mobile-links-section">
                <h3 class="mobile-links-title">Links</h3>
                <div class="social-links">
                    <a href="https://github.com/ayyi858" target="_blank">Github</a>
                    <a href="https://www.linkedin.com/in/ahmad-syarif-hidayatullah-584550332/" target="_blank">Linkedin</a>
                    <a href="https://www.instagram.com/asyarif_hidayatullah/" target="_blank">Instagram</a>
                    <a href="mailto:contact@example.com">Email</a>
                </div>
            </div>
        `;
        
        document.body.appendChild(mobileMenu);
        console.log('Mobile menu added to body');
        
        // Tambahkan event listener untuk tombol close
        const closeButton = mobileMenu.querySelector('.menu-close');
        if (closeButton) {
            console.log('Adding click listener to close button');
            closeButton.addEventListener('click', function() {
                console.log('Close button clicked');
                hideMobileMenu();
            });
        } else {
            console.error('No close button found!');
        }
    } else {
        console.log('Mobile menu already exists, showing it');
        mobileMenu.style.display = 'flex';
    }
    
    // Animasi masuk menu menggunakan GSAP jika tersedia
    if (typeof gsap !== 'undefined') {
        console.log('Using GSAP for animation');
        gsap.fromTo(mobileMenu, 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
    } else {
        console.log('GSAP not available, using fallback animation');
        // Fallback jika GSAP tidak tersedia
        mobileMenu.style.opacity = "1";
        mobileMenu.style.transform = "translateY(0)";
    }
}

// Fungsi untuk menyembunyikan menu mobile
function hideMobileMenu() {
    console.log('hideMobileMenu function called');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    if (mobileMenu) {
        console.log('Found mobile menu overlay');
        if (typeof gsap !== 'undefined') {
            console.log('Using GSAP for hide animation');
            gsap.to(mobileMenu, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: function() {
                    console.log('Animation complete, hiding menu');
                    mobileMenu.style.display = 'none';
                }
            });
        } else {
            console.log('GSAP not available, using fallback');
            // Fallback jika GSAP tidak tersedia
            mobileMenu.style.opacity = "0";
            mobileMenu.style.transform = "translateY(-20px)";
            setTimeout(function() {
                mobileMenu.style.display = 'none';
                console.log('Menu hidden after timeout');
            }, 300);
        }
    } else {
        console.error('No mobile menu found to hide!');
    }
}

// Fungsi untuk setup desktop view
function setupDesktopView() {
    console.log('Setting up desktop view');
    
    // Hapus class mobile-view dari body
    document.body.classList.remove('mobile-view');
    
    // Sembunyikan header mobile jika ada
    const mobileHeader = document.querySelector('.mobile-header');
    if (mobileHeader) {
        mobileHeader.style.display = 'none';
        console.log('Mobile header hidden');
    }
    
    // Sembunyikan menu overlay jika masih terbuka
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    if (mobileMenu) {
        mobileMenu.style.display = 'none';
        console.log('Mobile menu hidden');
    }
    
    // Tampilkan kembali header desktop
    const desktopHeader = document.querySelector('header');
    if (desktopHeader) {
        desktopHeader.style.display = 'block';
        console.log('Desktop header shown');
    }
    
    // Tampilkan kembali footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.display = 'block';
        console.log('Footer shown');
    }
    
    // Hapus styling mobile dari subsection titles jika ada
    const subsectionTitles = document.querySelectorAll('.subsection-title, .subsection-title1');
    subsectionTitles.forEach(title => {
        title.style.border = '';
        title.style.borderRadius = '';
        title.style.padding = '';
    });
}

// Helper function untuk memuat script secara dinamis
function loadScript(url, callback) {
    console.log('Loading script:', url);
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = function() {
        console.log('Script loaded:', url);
        if (callback) callback();
    };
    script.onerror = function() {
        console.error('Failed to load script:', url);
    };
    document.head.appendChild(script);
}
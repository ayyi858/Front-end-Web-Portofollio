// Mobile Script dengan animasi menu dari kanan ke kiri - Versi FINAL tanpa bug
document.addEventListener('DOMContentLoaded', function() {
    // Deteksi apakah perangkat mobile
    const isMobile = window.innerWidth <= 767;
    
    // Reset dan reinisialisasi particles secara total
    resetAndInitParticles();
    
    // Set tampilan yang benar saat halaman dimuat
    if (isMobile) {
        document.body.classList.add('mobile-view');
        
        // Pastikan desktop elements tersembunyi
        const desktopElements = document.querySelectorAll('nav:not(.mobile-header), .hero, .skills-bar');
        desktopElements.forEach(el => {
            el.style.display = 'none';
        });
        
        // Tampilkan mobile container
        const mobileContainer = document.querySelector('.mobile-container');
        if (mobileContainer) {
            mobileContainer.style.display = 'block';
        }
        
        // Setup mobile typed
        setupMobileTyped();
    } else {
        // Pastikan mobile view tidak aktif
        document.body.classList.remove('mobile-view');
        
        // Pastikan mobile elements tersembunyi
        const mobileContainer = document.querySelector('.mobile-container');
        if (mobileContainer) {
            mobileContainer.style.display = 'none';
        }
        
        // Pastikan tampilan desktop terlihat dengan benar
        const desktopNav = document.querySelector('nav:not(.mobile-header)');
        const hero = document.querySelector('.hero');
        const skillsBar = document.querySelector('.skills-bar');
        
        if (desktopNav) desktopNav.style.display = 'flex';
        if (hero) hero.style.display = 'flex';
        if (skillsBar) skillsBar.style.display = 'block';
        
        // Setup desktop typed effect
        setupTypingEffect();
    }
    
    // Setup toggle menu
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Implementasi menu toggle
            showMobileMenu();
        });
    }
    
    // Setup tombol Pendidikan
    const educationButton = document.querySelector('.btn-outline');
    if (educationButton) {
        educationButton.addEventListener('click', function(e) {
            // Animasi ikon saat diklik
            const icon = this.querySelector('i');
            if (icon) {
                gsap.to(icon, {
                    rotation: 180,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
            }
        });
    }
    
    // Set z-index yang benar untuk container terkait pada tampilan mobile
    if (isMobile) {
        const mobileContainer = document.querySelector('.mobile-container');
        if (mobileContainer) {
            // Pastikan mobile container memiliki z-index lebih tinggi dari particles tapi tetap memungkinkan particles terlihat
            mobileContainer.style.position = 'relative';
            mobileContainer.style.zIndex = '0';
            mobileContainer.style.background = 'transparent';
        }
    }
});

// Solusi radikal: Hapus dan buat ulang elemen particles-js
function resetAndInitParticles() {
    console.log("Menjalankan reset dan inisialisasi ulang particles.js");
    
    // 1. Cari elemen particles-js yang ada
    let particlesContainer = document.getElementById('particles-js');
    
    // 2. Hapus elemen lama jika ada
    if (particlesContainer) {
        const parentElement = particlesContainer.parentNode;
        particlesContainer.remove();
        
        // 3. Buat elemen baru
        particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        
        // 4. Atur properti style yang diperlukan
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.zIndex = '-1';
        particlesContainer.style.display = 'block';
        particlesContainer.style.visibility = 'visible';
        particlesContainer.style.pointerEvents = 'none';
        
        // 5. Tambahkan kembali ke DOM
        parentElement.appendChild(particlesContainer);
    }
    
    // 6. Hapus instance particles.js yang mungkin sudah ada
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom = [];
    }
    
    // 7. Pastikan library particles.js sudah dimuat
    if (typeof particlesJS === 'undefined') {
        console.error("Library particles.js tidak ditemukan");
        return;
    }
    
    // 8. Inisialisasi dengan konfigurasi
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
    
    console.log("Inisialisasi particles.js selesai");
}

// Fungsi untuk setup typing effect desktop
function setupTypingEffect() {
    // Hapus instansi typed lama jika ada
    if (window.typedInstance) {
        window.typedInstance.destroy();
        window.typedInstance = null;
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
        
        // Pastikan kursor typed.js terlihat dengan benar
        setTimeout(function() {
            const desktopCursor = document.querySelector('#typed-text + .typed-cursor');
            if (desktopCursor) {
                desktopCursor.style.fontSize = '36px';
                desktopCursor.style.verticalAlign = 'baseline';
            }
        }, 500);
    }
}

// Fungsi untuk setup typed.js pada mobile
function setupMobileTyped() {
    // Hapus instansi typed lama jika ada
    if (window.mobileTypedInstance) {
        window.mobileTypedInstance.destroy();
        window.mobileTypedInstance = null;
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
            const mobileCursor = document.querySelector('#typed-text-mobile + .typed-cursor');
            if (mobileCursor) {
                mobileCursor.style.fontSize = '26px';
                mobileCursor.style.verticalAlign = 'baseline';
                mobileCursor.style.marginLeft = '2px';
                mobileCursor.style.display = 'inline-block';
            }
        }, 500);
    }
}

// Fungsi untuk menampilkan menu mobile tanpa delay
function showMobileMenu() {
    console.log('showMobileMenu function called');
    
    // Cek apakah menu backdrop sudah ada
    let menuBackdrop = document.querySelector('.menu-backdrop');
    if (!menuBackdrop) {
        menuBackdrop = document.createElement('div');
        menuBackdrop.className = 'menu-backdrop';
        document.body.appendChild(menuBackdrop);
    }
    
    // Tampilkan backdrop
    menuBackdrop.style.visibility = 'visible';
    menuBackdrop.classList.add('active');
    
    // Tambahkan class menu-open ke body untuk mengontrol header mobile
    document.body.classList.add('menu-open');
    
    // Buat menu overlay jika belum ada
    let mobileMenu = document.querySelector('.mobile-menu-overlay');
    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu-overlay';
        mobileMenu.innerHTML = `
            <div class="mobile-menu-header">
                <div class="logo">
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
                <li style="--item-index: 1;"><a href="index.html" class="active">Home</a></li>
                <li style="--item-index: 2;"><a href="about.html">About Me</a></li>
                <li style="--item-index: 3;"><a href="porto.html">Portfolio</a></li>
                <li style="--item-index: 4;"><a href="contact.html">Contact</a></li>
            </ul>
            <div class="mobile-links-section">
                <h3 class="mobile-links-title">Links</h3>
                <div class="social-links">
                    <a href="https://github.com/ayyi858" target="_blank">Github</a>
                    <a href="https://www.linkedin.com/in/ahmad-syarif-hidayatullah-584550332/" target="_blank">Linkedin</a>
                    <a href="https://www.instagram.com/asyarif_hidayatullah/" target="_blank">Instagram</a>
                    <a href="mailto:boulukapiang858@gmail.com">Email</a>
                </div>
            </div>
        `;
        document.body.appendChild(mobileMenu);
        
        // Tambahkan event listener untuk tombol close
        const closeButton = mobileMenu.querySelector('.menu-close');
        if (closeButton) {
            closeButton.addEventListener('click', hideMobileMenu);
        }
        
        // Tambahkan event listener untuk backdrop
        menuBackdrop.addEventListener('click', hideMobileMenu);
    } else {
        // Pastikan menu terlihat
        mobileMenu.style.display = 'flex';
    }
    
    // Tambahkan class untuk efek lengkung saat animasi masuk
    mobileMenu.classList.add('animation-curve');
    
    // Gunakan GSAP untuk animasi slide yang lebih cepat
    gsap.set(mobileMenu, { right: "-100%", display: "flex" });
    gsap.to(mobileMenu, { 
        right: "0%", 
        duration: 0.4,
        ease: "power2.out",
        onComplete: function() {
            // Tambahkan kelas active untuk trigger animasi anak elemen
            mobileMenu.classList.add('active');
            
            // Hapus efek lengkung setelah animasi masuk selesai
            setTimeout(() => {
                mobileMenu.classList.remove('animation-curve');
            }, 50);
        }
    });
}

// Fungsi untuk menyembunyikan menu mobile dengan animasi
function hideMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    
    if (mobileMenu) {
        // Hapus kelas active untuk mengembalikan animasi anak elemen
        mobileMenu.classList.remove('active');
        
        // Tambahkan class untuk efek lengkung saat animasi keluar
        mobileMenu.classList.add('animation-curve');
        
        // Hapus class menu-open dari body untuk menampilkan header mobile kembali
        document.body.classList.remove('menu-open');
        
        // Sembunyikan backdrop
        if (menuBackdrop) {
            menuBackdrop.classList.remove('active');
            
            // Delay untuk menghilangkan backdrop
            setTimeout(() => {
                menuBackdrop.style.visibility = 'hidden';
            }, 200);
        }
        
        // Animasi slide keluar
        gsap.to(mobileMenu, {
            right: "-100%",
            duration: 0.3,
            ease: "power2.in",
            onComplete: function() {
                // Jika sudah di mode desktop, sembunyikan menu
                if (!document.body.classList.contains('mobile-view')) {
                    mobileMenu.style.display = 'none';
                }
                
                // Hapus efek lengkung setelah animasi keluar selesai
                mobileMenu.classList.remove('animation-curve');
            }
        });
    }
}

// Perbaikan event listener untuk resize window dengan pendekatan radikal
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 767;
    
    // PENTING: Reset dan inisialisasi ulang particles untuk setiap perubahan ukuran
    resetAndInitParticles();
    
    if (isMobile) {
        if (!document.body.classList.contains('mobile-view')) {
            // Beralih dari desktop ke mobile
            document.body.classList.add('mobile-view');
            
            // Pastikan elemen desktop tersembunyi dengan benar
            const desktopElements = document.querySelectorAll('nav:not(.mobile-header), .hero, .skills-bar');
            desktopElements.forEach(el => {
                el.style.display = 'none';
            });
            
            // Tampilkan mobile container
            const mobileContainer = document.querySelector('.mobile-container');
            if (mobileContainer) {
                mobileContainer.style.display = 'block';
                mobileContainer.style.position = 'relative';
                mobileContainer.style.zIndex = '0';
                mobileContainer.style.background = 'transparent';
            }
            
            // Setup mobile typed jika belum aktif
            if (!window.mobileTypedInstance || 
                (window.mobileTypedInstance && typeof window.mobileTypedInstance.isDestroyed !== 'undefined' && window.mobileTypedInstance.isDestroyed)) {
                setupMobileTyped();
            }
        }
    } else {
        if (document.body.classList.contains('mobile-view')) {
            // Beralih dari mobile ke desktop
            document.body.classList.remove('mobile-view');
            
            // Pastikan mobile container tersembunyi
            const mobileContainer = document.querySelector('.mobile-container');
            if (mobileContainer) {
                mobileContainer.style.display = 'none';
            }
            
            // Pastikan tampilan desktop terlihat dengan benar
            const desktopNav = document.querySelector('nav:not(.mobile-header)');
            const hero = document.querySelector('.hero');
            const skillsBar = document.querySelector('.skills-bar');
            
            if (desktopNav) desktopNav.style.display = 'flex';
            if (hero) hero.style.display = 'flex';
            if (skillsBar) skillsBar.style.display = 'block';
            
            // Destroy mobile typed instance
            if (window.mobileTypedInstance) {
                window.mobileTypedInstance.destroy();
                window.mobileTypedInstance = null;
            }
            
            // Reset setup typed effect untuk desktop
            setTimeout(() => {
                setupTypingEffect();
            }, 300);
            
            // Sembunyikan menu mobile jika masih terbuka saat resize
            const mobileMenu = document.querySelector('.mobile-menu-overlay');
            const menuBackdrop = document.querySelector('.menu-backdrop');
            
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                mobileMenu.style.right = "-100%";
                mobileMenu.style.display = 'none';
                
                // Pastikan class menu-open dihapus dari body
                document.body.classList.remove('menu-open');
            }
            
            if (menuBackdrop) {
                menuBackdrop.classList.remove('active');
                menuBackdrop.style.visibility = 'hidden';
                menuBackdrop.style.opacity = '0';
            }
        }
    }
});

// Tambahkan event listener untuk escape key untuk menutup menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideMobileMenu();
    }
});

// Script untuk menerapkan animasi pada mobile view
document.addEventListener('DOMContentLoaded', function() {
    // Periksa jika dalam mode mobile
    const isMobile = window.innerWidth <= 767 || document.body.classList.contains('mobile-view');
    
    if (isMobile) {
        console.log("Mode mobile terdeteksi, menerapkan animasi manual");
        
        // Sembunyikan semua elemen dulu
        gsap.set('.profile-image-container', {opacity: 0, scale: 0.8});
        gsap.set('.hello-box', {opacity: 0, x: -30});
        gsap.set('.name-line', {opacity: 0, y: 20});
        gsap.set('.title', {opacity: 0, y: 20});
        gsap.set('.quote', {opacity: 0, y: 20});
        gsap.set('.cta-buttons', {opacity: 0, y: 20});
        gsap.set('.about-header', {opacity: 0, x: -30});
        gsap.set('.about-heading', {opacity: 0, x: -30});
        gsap.set('.about-text', {opacity: 0, y: 20});
        gsap.set('.btn-outline', {opacity: 0, y: 20});
        
        // Buat timeline untuk animasi berurutan
        const timeline = gsap.timeline({delay: 0.5});
        
        // Animasi masuk
        timeline.to('.profile-image-container', {opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)"})
                .to('.hello-box', {opacity: 1, x: 0, duration: 0.7, ease: "power2.out"}, "-=0.3")
                .to('.name-line', {opacity: 1, y: 0, duration: 0.7, ease: "power2.out"}, "-=0.3")
                .to('.title', {opacity: 1, y: 0, duration: 0.7, ease: "power2.out"}, "-=0.5")
                .to('.quote', {opacity: 1, y: 0, duration: 0.7, ease: "power2.out"}, "-=0.5")
                .to('.cta-buttons', {opacity: 1, y: 0, duration: 0.7, ease: "power2.out"}, "-=0.5")
                .to('.about-header', {opacity: 1, x: 0, duration: 0.7, ease: "power2.out"}, "-=0.3")
                .to('.about-heading', {opacity: 1, x: 0, duration: 0.7, ease: "power2.out"}, "-=0.5")
                .to('.about-text', {opacity: 1, y: 0, duration: 0.7, ease: "power2.out"}, "-=0.5")
                .to('.btn-outline', {opacity: 1, y: 0, duration: 0.7, ease: "power2.out"}, "-=0.5");
    }
});
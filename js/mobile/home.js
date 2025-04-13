// Mobile Script
document.addEventListener('DOMContentLoaded', function() {
    // Deteksi apakah perangkat mobile
    const isMobile = window.innerWidth <= 767;
    
    // Jika mobile, tambahkan class ke body
    if (isMobile) {
        document.body.classList.add('mobile-view');
        
        // Setup mobile typed
        setupMobileTyped();
    } else {
        // Pastikan desktop mode aktif
        document.body.classList.remove('mobile-view');
        
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
    
    // Setup tombol Pendidikan - link langsung ke about.html
    const educationButton = document.querySelector('.btn-outline');
    if (educationButton) {
        educationButton.addEventListener('click', function(e) {
            // Link sudah terpasang di a href, tidak perlu preventDefault
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
});

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

// Fungsi untuk setup typed.js pada mobile - DIREVISI
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

// Fungsi untuk menampilkan menu mobile
function showMobileMenu() {
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
                <li><a href="index.html" class="active">Home</a></li>
                <li><a href="about.html">About Me</a></li>
                <li><a href="porto.html">Portfolio</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
            <div class="mobile-links-section">
                <h3 class="mobile-links-title">Links</h3>
                <div class="social-links">
                    <a href="https://github.com/" target="_blank">Github</a>
                    <a href="https://linkedin.com/" target="_blank">Linkedin</a>
                    <a href="https://instagram.com/" target="_blank">Instagram</a>
                    <a href="mailto:contact@example.com">Email</a>
                </div>
            </div>
        `;
        document.body.appendChild(mobileMenu);
        
        // Tambahkan event listener untuk tombol close
        const closeButton = mobileMenu.querySelector('.menu-close');
        if (closeButton) {
            closeButton.addEventListener('click', hideMobileMenu);
        }
    } else {
        mobileMenu.style.display = 'flex';
    }
    
    // Animasi masuk menu
    gsap.fromTo(mobileMenu, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
}

// Fungsi untuk menyembunyikan menu mobile
function hideMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    if (mobileMenu) {
        gsap.to(mobileMenu, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: function() {
                mobileMenu.style.display = 'none';
            }
        });
    }
}

// Tambahkan event listener untuk resize window
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        document.body.classList.add('mobile-view');
        setupMobileTyped();
    } else {
        document.body.classList.remove('mobile-view');
        setupTypingEffect();
        
        // Sembunyikan menu mobile jika masih terbuka saat resize
        const mobileMenu = document.querySelector('.mobile-menu-overlay');
        if (mobileMenu) {
            mobileMenu.style.display = 'none';
        }
    }
});
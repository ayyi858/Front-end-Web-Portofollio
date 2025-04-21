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
        const desktopElements = document.querySelectorAll('header, .hero');
        desktopElements.forEach(el => {
            el.style.display = 'none';
        });
        
        // Cek GitHub card scrolling di mobile
        checkGitHubCardScroll();
    } else {
        // Pastikan mobile view tidak aktif
        document.body.classList.remove('mobile-view');
        
        // Pastikan tampilan desktop terlihat dengan benar
        const desktopHeader = document.querySelector('header');
        const hero = document.querySelector('.hero');
        
        if (desktopHeader) desktopHeader.style.display = 'block';
        if (hero) hero.style.display = 'block';
    }
    
    // Setup toggle menu
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Implementasi menu toggle
            showMobileMenu();
        });
    }
    
    // Set z-index yang benar untuk container terkait pada tampilan mobile
    if (isMobile) {
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            // Pastikan contact section memiliki z-index yang benar
            contactSection.style.position = 'relative';
            contactSection.style.zIndex = '0';
            contactSection.style.background = 'transparent';
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

// Check GitHub card scrolling
function checkGitHubCardScroll() {
    const githubCard = document.querySelector('.github-card');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (githubCard && scrollIndicator) {
        // Cek apakah konten lebih lebar dari container
        if (githubCard.scrollWidth > githubCard.clientWidth) {
            scrollIndicator.style.display = 'block';
            
            // Sembunyikan indikator setelah beberapa saat
            setTimeout(function() {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.5s ease';
            }, 5000);
            
            // Tampilkan kembali indikator saat user menyentuh card
            githubCard.addEventListener('touchstart', function() {
                scrollIndicator.style.opacity = '0.7';
                
                // Sembunyikan lagi setelah beberapa saat
                setTimeout(function() {
                    scrollIndicator.style.opacity = '0';
                }, 2000);
            });
        } else {
            scrollIndicator.style.display = 'none';
        }
    }
}

// Fungsi untuk menampilkan menu mobile tanpa delay - versi final dengan perbaikan
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
                <li style="--item-index: 1;"><a href="index.html">Home</a></li>
                <li style="--item-index: 2;"><a href="about.html">About Me</a></li>
                <li style="--item-index: 3;"><a href="porto.html">Portfolio</a></li>
                <li style="--item-index: 4;"><a href="contact.html" class="active" style="color:rgb(0, 0, 0) !important;">Contact</a></li>
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
        
        // Fix untuk menu aktif setelah menu dibuat
        const activeLink = mobileMenu.querySelector('.mobile-nav-links a.active');
        if (activeLink) {
            activeLink.style.color = '#rgb(0, 0, 0)';
        }
    } else {
        // Pastikan menu terlihat
        mobileMenu.style.display = 'flex';
        
        // Fix untuk menu aktif jika menu sudah ada
        const activeLink = mobileMenu.querySelector('.mobile-nav-links a.active');
        if (activeLink) {
            activeLink.style.color = 'rgb(0, 0, 0)';
        }
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
            
            // Pastikan lagi menu aktif berwarna putih setelah animasi
            const activeLink = mobileMenu.querySelector('.mobile-nav-links a.active');
            if (activeLink) {
                activeLink.style.color = '#rgb(0, 0, 0)';
            }
            
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
            const desktopElements = document.querySelectorAll('header, .hero');
            desktopElements.forEach(el => {
                el.style.display = 'none';
            });
            
            // Periksa GitHub card scrolling
            checkGitHubCardScroll();
            
            // Pastikan contact section memiliki z-index yang benar
            const contactSection = document.querySelector('.contact-section');
            if (contactSection) {
                contactSection.style.position = 'relative';
                contactSection.style.zIndex = '0';
                contactSection.style.background = 'transparent';
            }
        }
    } else {
        if (document.body.classList.contains('mobile-view')) {
            // Beralih dari mobile ke desktop
            document.body.classList.remove('mobile-view');
            
            // Pastikan tampilan desktop terlihat dengan benar
            const desktopHeader = document.querySelector('header');
            const hero = document.querySelector('.hero');
            
            if (desktopHeader) desktopHeader.style.display = 'block';
            if (hero) hero.style.display = 'block';
            
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
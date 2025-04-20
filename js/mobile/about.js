// Mobile Navigation untuk about.html - dengan animasi yang sama dengan home.html
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile about.js loaded');
    
    // Deteksi apakah perangkat mobile
    const isMobile = window.innerWidth <= 767;
    console.log('isMobile:', isMobile);
    
    // Setup mobile atau desktop view berdasarkan ukuran layar
    if (isMobile) {
        setupMobileView();
    } else {
        setupDesktopView();
    }
    
    // Event listener untuk resize window
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
    
    // Sembunyikan backdrop
    const menuBackdrop = document.querySelector('.menu-backdrop');
    if (menuBackdrop) {
        menuBackdrop.classList.remove('active');
        menuBackdrop.style.visibility = 'hidden';
        console.log('Menu backdrop hidden');
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
}

// Fungsi untuk menampilkan menu mobile dengan animasi dari kanan ke kiri dengan efek lengkung
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
                <li style="--item-index: 2;"><a href="about.html" class="active">About Me</a></li>
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
    
    // Gunakan GSAP untuk animasi slide yang lebih cepat jika tersedia
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(mobileMenu, 
            { right: "-100%", display: "flex" },
            { 
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
            }
        );
    } else {
        // Fallback jika GSAP tidak tersedia
        mobileMenu.style.right = "-100%";
        mobileMenu.style.display = "flex";
        
        // Gunakan setTimeout untuk memberi efek animasi
        setTimeout(function() {
            mobileMenu.style.right = "0%";
            mobileMenu.style.transition = "right 0.4s ease-out";
            
            // Tambahkan kelas active untuk trigger animasi anak elemen
            setTimeout(function() {
                mobileMenu.classList.add('active');
                
                // Hapus efek lengkung setelah animasi masuk selesai
                setTimeout(() => {
                    mobileMenu.classList.remove('animation-curve');
                }, 50);
            }, 400);
        }, 10);
    }
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
        
        // Beri sedikit delay sebelum animasi slide keluar
        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
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
            } else {
                // Fallback jika GSAP tidak tersedia
                mobileMenu.style.right = "-100%";
                mobileMenu.style.transition = "right 0.3s ease-in";
                
                // Setelah animasi selesai, sembunyikan jika desktop
                setTimeout(function() {
                    if (!document.body.classList.contains('mobile-view')) {
                        mobileMenu.style.display = 'none';
                    }
                    
                    // Hapus efek lengkung
                    mobileMenu.classList.remove('animation-curve');
                }, 300);
            }
        }, 100);
    }
}

// Tambahkan event listener untuk escape key untuk menutup menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideMobileMenu();
    }
});
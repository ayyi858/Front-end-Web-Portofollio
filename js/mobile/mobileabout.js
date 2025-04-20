// mobile-about.js - Revisi untuk mengatasi masalah header tidak muncul saat navigasi antar halaman

// Jalankan setup mobile view segera setelah DOM tersedia
(function() {
    console.log('Mobile script executed immediately');
    
    // Deteksi apakah perangkat mobile dengan lebih detail
    const isMobile = window.innerWidth <= 767;
    console.log('Current viewport width on initial load:', window.innerWidth);
    console.log('Is mobile (width <= 767px):', isMobile);
    
    // Buat mobile header segera jika mobile
    if (isMobile) {
        console.log('Initial mobile detection: setting up mobile view');
        
        // Tambahkan class ke HTML dan body untuk mencegah override dari desktop JS
        document.documentElement.classList.add('force-mobile-view');
        document.body.classList.add('mobile-view');
        
        // Inisialisasi header mobile segera
        setupInitialMobileHeader();
    }
})();

// Fungsi untuk setup awal mobile header
function setupInitialMobileHeader() {
    console.log('Setting up initial mobile header');
    
    // Buat mobile header jika belum ada
    if (!document.querySelector('.mobile-header')) {
        const mobileHeader = document.createElement('div');
        mobileHeader.className = 'mobile-header';
        mobileHeader.style.display = 'flex'; // Tampilkan header segera
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
        
        // Sisipkan di awal body
        document.body.insertBefore(mobileHeader, document.body.firstChild);
        console.log('Mobile header created and inserted');
    }
}

// Event saat DOM sudah sepenuhnya di-load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - Mobile about.js running complete setup');
    
    // Deteksi apakah perangkat mobile
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        console.log('DOMContentLoaded: setting up complete mobile view');
        setupMobileView();
    }
    
    // Event listener untuk resize window
    window.addEventListener('resize', function() {
        const currentIsMobile = window.innerWidth <= 767;
        console.log('Window resized, width:', window.innerWidth);
        
        if (currentIsMobile && !document.body.classList.contains('mobile-view')) {
            console.log('Window resized to mobile size, setting up mobile view');
            setupMobileView();
            document.documentElement.classList.add('force-mobile-view');
        } else if (!currentIsMobile && document.documentElement.classList.contains('force-mobile-view')) {
            // Hanya hapus kelas force jika beralih ke desktop
            document.documentElement.classList.remove('force-mobile-view');
        }
    });
    
    // Coba lagi konfigurasi header mobile setelah 200ms
    // Terkadang diperlukan saat page navigation karena adanya delay parsing
    setTimeout(function() {
        if (isMobile) {
            console.log('Timeout check: ensuring mobile header is visible');
            const mobileHeader = document.querySelector('.mobile-header');
            if (mobileHeader) {
                mobileHeader.style.display = 'flex';
                console.log('Mobile header visibility enforced');
            } else {
                console.log('Mobile header not found, creating it');
                setupMobileView();
            }
        }
    }, 200);
});

// Pastikan setup dilakukan saat window sudah benar-benar di-load
window.addEventListener('load', function() {
    console.log('Window fully loaded');
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        console.log('Window loaded: ensuring mobile view is setup');
        setupMobileView();
        
        // Tambahan: periksa visibilitas header
        const mobileHeader = document.querySelector('.mobile-header');
        if (mobileHeader) {
            console.log('Making sure mobile header is visible');
            mobileHeader.style.display = 'flex';
        }
    }
});

// Fungsi untuk setup mobile view lengkap
function setupMobileView() {
    console.log('Setting up complete mobile view');
    
    // Tambahkan class mobile-view ke body
    document.body.classList.add('mobile-view');
    
    // Hide desktop header dan footer
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
    
    // Setup mobile header
    setupMobileHeader();
    
    // Setup mobile styling lainnya
    setupMobileStyles();
    
    // Setup event listeners
    setupMobileEventListeners();
}

// Fungsi untuk setup mobile header
function setupMobileHeader() {
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
    } else {
        // Pastikan header mobile terlihat
        const mobileHeader = document.querySelector('.mobile-header');
        mobileHeader.style.display = 'flex';
        console.log('Existing mobile header made visible');
        
        // Pastikan event listener untuk menu toggle masih ada
        const menuToggle = document.querySelector('.mobile-header .menu-toggle');
        if (menuToggle) {
            // Hapus event listener lama untuk menghindari duplikasi
            const newMenuToggle = menuToggle.cloneNode(true);
            menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
            
            // Tambahkan event listener baru
            newMenuToggle.addEventListener('click', function() {
                console.log('Menu toggle clicked');
                showMobileMenu();
            });
        }
    }
    
    // Buat menu backdrop jika belum ada
    if (!document.querySelector('.menu-backdrop')) {
        const menuBackdrop = document.createElement('div');
        menuBackdrop.className = 'menu-backdrop';
        document.body.appendChild(menuBackdrop);
        
        // Tambahkan event listener untuk backdrop
        menuBackdrop.addEventListener('click', hideMobileMenu);
    }
}

// Fungsi untuk setup mobile styling
function setupMobileStyles() {
    // Style subsection titles sesuai mobile design
    const subsectionTitles = document.querySelectorAll('.subsection-title, .subsection-title1');
    subsectionTitles.forEach(title => {
        title.style.border = '1px solid #c1a71a';
        title.style.borderRadius = '20px';
        title.style.padding = '5px 15px';
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
}

// Fungsi untuk setup mobile event listeners
function setupMobileEventListeners() {
    // Tambahkan event listener untuk escape key untuk menutup menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideMobileMenu();
        }
    });
}

// Fungsi untuk menampilkan menu mobile
function showMobileMenu() {
    console.log('showMobileMenu function called');
    
    // Cek apakah menu backdrop sudah ada
    let menuBackdrop = document.querySelector('.menu-backdrop');
    if (!menuBackdrop) {
        menuBackdrop = document.createElement('div');
        menuBackdrop.className = 'menu-backdrop';
        document.body.appendChild(menuBackdrop);
        
        // Tambahkan event listener untuk backdrop
        menuBackdrop.addEventListener('click', hideMobileMenu);
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
    } else {
        // Pastikan menu terlihat
        mobileMenu.style.display = 'flex';
        
        // Pastikan event listener untuk close button masih ada
        const closeButton = mobileMenu.querySelector('.menu-close');
        if (closeButton) {
            // Hapus event listener lama untuk menghindari duplikasi
            const newCloseButton = closeButton.cloneNode(true);
            closeButton.parentNode.replaceChild(newCloseButton, closeButton);
            
            // Tambahkan event listener baru
            newCloseButton.addEventListener('click', hideMobileMenu);
        }
    }
    
    // Tambahkan class untuk efek lengkung saat animasi masuk
    mobileMenu.classList.add('animation-curve');
    
    // Gunakan GSAP untuk animasi slide yang lebih mulus jika tersedia
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

// Fungsi untuk menyembunyikan menu mobile
function hideMobileMenu() {
    console.log('hideMobileMenu function called');
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
            }, 300);
        }
        
        // Beri sedikit delay sebelum animasi slide keluar
        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
                gsap.to(mobileMenu, {
                    right: "-100%",
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: function() {
                        // Hapus efek lengkung setelah animasi keluar selesai
                        mobileMenu.classList.remove('animation-curve');
                    }
                });
            } else {
                // Fallback jika GSAP tidak tersedia
                mobileMenu.style.right = "-100%";
                mobileMenu.style.transition = "right 0.3s ease-in";
                
                // Setelah animasi selesai
                setTimeout(function() {
                    // Hapus efek lengkung
                    mobileMenu.classList.remove('animation-curve');
                }, 300);
            }
        }, 100);
    }
}
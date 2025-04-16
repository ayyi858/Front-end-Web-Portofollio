// Versi debugging untuk mobile-about.js
// Tambahkan script ini langsung di halaman about.html untuk debugging

document.addEventListener('DOMContentLoaded', function() {
    console.log('Debug script loaded');
    
    // Deteksi apakah perangkat mobile
    const isMobile = window.innerWidth <= 767;
    console.log('isMobile:', isMobile);
    
    if (isMobile) {
        // Tambahkan class mobile-view ke body jika belum ada
        if (!document.body.classList.contains('mobile-view')) {
            document.body.classList.add('mobile-view');
            console.log('Added mobile-view class to body');
        }
        
        // Tambahkan header mobile seperti di homepage jika belum ada
        if (!document.querySelector('.mobile-header')) {
            console.log('Creating mobile header');
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
            
            // Tambahkan header ke body sebagai child pertama
            document.body.insertBefore(mobileHeader, document.body.firstChild);
            console.log('Mobile header added to body');
            
            // Event listener untuk menu toggle
            const menuToggle = mobileHeader.querySelector('.menu-toggle');
            menuToggle.addEventListener('click', function() {
                console.log('Menu toggle clicked');
                showMobileMenu();
            });
        }
        
        // Tambahkan tombol My Skill di bagian bawah
        const eduWorkSection = document.querySelector('.edu-work-section');
        if (eduWorkSection && !document.querySelector('.my-skill-button')) {
            console.log('Creating My Skill button');
            const mySkillButton = document.createElement('a');
            mySkillButton.className = 'my-skill-button';
            mySkillButton.href = '#skills';
            mySkillButton.textContent = 'My Skill';
            eduWorkSection.appendChild(mySkillButton);
            console.log('My Skill button added');
            
            // Tambahkan event listener untuk smooth scroll
            mySkillButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('My Skill button clicked');
                document.querySelector('#skills').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
        
        // Style subsection titles dengan border sesuai gambar
        const subsectionTitles = document.querySelectorAll('.subsection-title, .subsection-title1');
        subsectionTitles.forEach(title => {
            title.style.border = '1px solid #c1a71a';
            title.style.borderRadius = '20px';
            title.style.padding = '5px 15px';
        });
        console.log('Styled subsection titles');
        
        // Style card pendidikan sesuai gambar
        const eduCards = document.querySelectorAll('.edu-card');
        eduCards.forEach((card, index) => {
            console.log(`Styling edu card ${index}`);
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
});

// Function untuk menampilkan menu mobile (untuk debugging)
function showMobileMenu() {
    console.log('showMobileMenu function called');
    
    // Cek apakah menu mobile overlay sudah ada
    let mobileMenu = document.querySelector('.mobile-menu-overlay');
    
    if (!mobileMenu) {
        console.log('Creating mobile menu overlay');
        // Buat menu overlay seperti di homepage
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

// Function untuk menyembunyikan menu mobile
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
// Tambahkan kode ini di akhir file js/mobile/about.js atau dalam script di about.html

window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 767;
    
    // Toggle class mobile-view berdasarkan ukuran layar
    if (isMobile) {
        document.body.classList.add('mobile-view');
        
        // Tampilkan header mobile jika tidak ada
        if (!document.querySelector('.mobile-header')) {
            createMobileHeader();
        }
        
        // Sembunyikan header desktop
        const desktopHeader = document.querySelector('header');
        if (desktopHeader) {
            desktopHeader.style.display = 'none';
        }
        
        // Sembunyikan footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.display = 'none';
        }
    } else {
        document.body.classList.remove('mobile-view');
        
        // Sembunyikan header mobile
        const mobileHeader = document.querySelector('.mobile-header');
        if (mobileHeader) {
            mobileHeader.style.display = 'none';
        }
        
        // Sembunyikan menu overlay jika masih terbuka
        const mobileMenu = document.querySelector('.mobile-menu-overlay');
        if (mobileMenu) {
            mobileMenu.style.display = 'none';
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
    }
});

// Function untuk membuat header mobile
function createMobileHeader() {
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
    
    // Tambahkan header ke body
    document.body.insertBefore(mobileHeader, document.body.firstChild);
    
    // Event listener untuk menu toggle
    const menuToggle = mobileHeader.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', function() {
        let mobileMenu = document.querySelector('.mobile-menu-overlay');
        
        if (!mobileMenu) {
            showMobileMenu();
        } else {
            if (mobileMenu.style.display === 'none') {
                mobileMenu.style.display = 'flex';
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(mobileMenu, 
                        { opacity: 0, y: -20 },
                        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
                    );
                } else {
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.transform = 'translateY(0)';
                }
            } else {
                showMobileMenu();
            }
        }
    });
    
}
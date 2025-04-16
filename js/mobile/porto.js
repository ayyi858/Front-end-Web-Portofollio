// Inisialisasi Library AOS
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
    }

    // Inisialisasi modal portfolio
    initModalFunctionality();
    
    // Inisialisasi animasi portfolio
    initPortfolioAnimations();
    
    // Deteksi perangkat mobile
    setupMobileDetection();
    
    // Inisialisasi menu mobile (hanya jika mobile)
    if (window.innerWidth <= 767) {
        initMobileMenu();
    }
});

// Modal functionality
function initModalFunctionality() {
    // Dapatkan modal
    const modal = document.getElementById('portfolioModal');
    if (!modal) return; // Jika tidak ada modal, keluar dari fungsi
    
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Ambil semua tombol view
    const viewButtons = document.querySelectorAll('.view-btn');

    // Function untuk menampilkan modal dengan konten yang sesuai
    function showModal(button) {
        // Ambil data dari tombol
        const type = button.getAttribute('data-type');
        const source = button.getAttribute('data-source');
        const title = button.getAttribute('data-title');
        const description = button.getAttribute('data-desc');

        // Set judul
        modalTitle.textContent = title;

        // Set deskripsi
        modalDescription.textContent = description;

        // Hapus konten yang ada
        modalContent.innerHTML = '';

        // Buat konten sesuai dengan tipe
        if (type === 'image') {
            // Untuk gambar
            const img = document.createElement('img');
            img.src = source;
            img.alt = title;
            modalContent.appendChild(img);
        } else if (type === 'video') {
            if (source.includes('youtube.com') || source.includes('youtu.be')) {
                // Ekstrak YouTube video ID
                let videoId = '';
                
                if (source.includes('youtube.com/watch?v=')) {
                    videoId = source.split('v=')[1].split('&')[0];
                } else if (source.includes('youtu.be/')) {
                    videoId = source.split('youtu.be/')[1].split('?')[0];
                } else if (source.includes('youtube.com/embed/')) {
                    videoId = source.split('embed/')[1].split('?')[0];
                } else if (source.match(/^[a-zA-Z0-9_-]{11}$/)) {
                    videoId = source;
                }
                
                if (videoId) {
                    // Gunakan metode alternatif untuk embed YouTube
                    const videoContainer = document.createElement('div');
                    videoContainer.className = 'video-container';
                    
                    // Gunakan parameter mute=0 untuk memastikan video dengan audio dapat dimainkan
                    // Tambahkan fs=1 untuk mengaktifkan fullscreen
                    videoContainer.innerHTML = `
                        <iframe 
                            width="100%" 
                            height="400" 
                            src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&fs=1&rel=0&modestbranding=1" 
                            title="${title}"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen>
                        </iframe>
                    `;
                    
                    modalContent.appendChild(videoContainer);
                    
                    // Tambahkan fallback jika video tidak muncul
                    const fallbackMessage = document.createElement('div');
                    fallbackMessage.className = 'video-fallback';
                    fallbackMessage.innerHTML = `
                        <p>Jika video tidak muncul, Anda dapat <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">membukanya di YouTube</a>.</p>
                    `;
                    modalContent.appendChild(fallbackMessage);
                }
            } else if (source.includes('instagram.com')) {
                // Untuk video Instagram
                const instagramContainer = document.createElement('div');
                instagramContainer.className = 'instagram-container';
                
                // Cek jenis URL Instagram
                let postId = '';
                
                if (source.includes('/p/')) {
                    postId = source.split('/p/')[1].split('/')[0];
                } else if (source.includes('/reel/')) {
                    postId = source.split('/reel/')[1].split('/')[0];
                }
                
                if (postId) {
                    // Gunakan URL embed yang lebih andal
                    instagramContainer.innerHTML = `
                        <iframe 
                            src="https://www.instagram.com/p/${postId}/embed/captioned/" 
                            width="400" 
                            height="500" 
                            frameborder="0" 
                            scrolling="no" 
                            allowtransparency="true">
                        </iframe>
                    `;
                    
                    modalContent.appendChild(instagramContainer);
                    
                    // Tambahkan fallback link
                    const fallbackLink = document.createElement('a');
                    fallbackLink.href = source;
                    fallbackLink.target = '_blank';
                    fallbackLink.className = 'instagram-fallback-link';
                    fallbackLink.textContent = 'Buka di Instagram';
                    
                    modalContent.appendChild(fallbackLink);
                } else {
                    // Fallback jika URL Instagram tidak valid
                    const linkBtn = document.createElement('a');
                    linkBtn.href = source;
                    linkBtn.target = '_blank';
                    linkBtn.className = 'instagram-link-btn';
                    linkBtn.textContent = 'Lihat di Instagram';
                    
                    modalContent.appendChild(linkBtn);
                }
            } else {
                // Untuk video lokal
                const videoPlayer = document.createElement('video');
                videoPlayer.controls = true;
                videoPlayer.autoplay = true;
                videoPlayer.className = 'modal-video';
                videoPlayer.preload = 'auto';
                
                // Tambahkan atribut untuk meningkatkan kompatibilitas
                videoPlayer.setAttribute('playsinline', '');
                videoPlayer.setAttribute('webkit-playsinline', '');
                
                // Tambahkan sumber video
                const videoSource = document.createElement('source');
                videoSource.src = source;
                videoSource.type = source.endsWith('.mp4') ? 'video/mp4' : 
                                source.endsWith('.webm') ? 'video/webm' : 
                                source.endsWith('.ogg') ? 'video/ogg' : 'video/mp4';
                
                videoPlayer.appendChild(videoSource);
                
                // Fallback message
                videoPlayer.innerHTML += 'Browser Anda tidak mendukung tag video.';
                
                modalContent.appendChild(videoPlayer);
                
                // Event listener untuk debugging video lokal
                videoPlayer.addEventListener('error', function(e) {
                    console.error('Video error:', e);
                    const errorMsg = document.createElement('p');
                    errorMsg.textContent = 'Video tidak dapat diputar. Pastikan file video tersedia.';
                    errorMsg.style.color = 'red';
                    modalContent.appendChild(errorMsg);
                });
            }
        } else if (type === 'website') {
            // Untuk website, tampilkan gambar screenshot
            const img = document.createElement('img');
            img.src = source;
            img.alt = title;
            img.className = 'website-thumbnail';
            modalContent.appendChild(img);
            
            // Tambahkan tombol untuk membuka website di tab baru jika ada URL
            if (source.includes('http')) {
                const visitBtn = document.createElement('a');
                visitBtn.href = source;
                visitBtn.target = '_blank';
                visitBtn.textContent = 'Kunjungi Website';
                visitBtn.className = 'visit-website-btn';
                modalContent.appendChild(visitBtn);
            }
        }

        // Tampilkan modal
        modal.classList.add('open');
    }

    // Tambahkan event listener untuk semua tombol view
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showModal(this);
        });
    });

    // Tutup modal saat tombol close diklik
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('open');
            
            // Hentikan media yang sedang diputar (jika ada)
            const mediaElements = modalContent.querySelectorAll('video, iframe');
            mediaElements.forEach(element => {
                if (element.tagName === 'VIDEO') {
                    element.pause();
                } else if (element.tagName === 'IFRAME') {
                    // Untuk iframe, perlu memuat ulang src atau menghapus iframe
                    if (element.src.includes('youtube.com') || element.src.includes('instagram.com')) {
                        element.src = '';  // Kosongkan src untuk menghentikan playback
                    }
                }
            });
        });
    }

    // Tutup modal saat klik di luar modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('open');
            
            // Hentikan media yang sedang diputar (jika ada)
            const mediaElements = modalContent.querySelectorAll('video, iframe');
            mediaElements.forEach(element => {
                if (element.tagName === 'VIDEO') {
                    element.pause();
                } else if (element.tagName === 'IFRAME') {
                    // Untuk iframe, perlu memuat ulang src
                    if (element.src.includes('youtube.com') || element.src.includes('instagram.com')) {
                        element.src = '';  // Kosongkan src untuk menghentikan playback
                    }
                }
            });
        }
    });
}

// Animasi untuk portfolio items
function initPortfolioAnimations() {
    // Animasi hover untuk item portfolio di desktop
    if (window.innerWidth > 767) {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });

        // Animasi untuk view buttons
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
}

// Inisialisasi menu mobile
function initMobileMenu() {
    console.log("Initializing mobile menu..."); // Debugging log
    
    // Cek elemen yang dibutuhkan
    const menuToggle = document.querySelector('.menu-toggle');
    console.log("Menu toggle element:", menuToggle); // Debugging log
    
    if (!menuToggle) {
        console.error("Menu toggle element not found");
        return;
    }
    
    // Buat menu overlay jika belum ada
    let mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    if (!mobileMenuOverlay) {
        console.log("Creating mobile menu overlay..."); // Debugging log
        
        mobileMenuOverlay = document.createElement('div');
        mobileMenuOverlay.className = 'mobile-menu-overlay';
        mobileMenuOverlay.innerHTML = `
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
                <li><a href="about.html">About Me</a></li>
                <li><a href="porto.html" class="active">Portfolio</a></li>
                <li><a href="contact.html">Contact</a></li>
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
        document.body.appendChild(mobileMenuOverlay);
        console.log("Mobile menu overlay created and appended to body"); // Debugging log
    }
    
    // Setup animasi dan event listeners
    const menuClose = mobileMenuOverlay.querySelector('.menu-close');
    const mobileNavLinks = mobileMenuOverlay.querySelectorAll('.mobile-nav-links li');
    
    // Tambahkan atribut --i untuk delay animasi pada item menu
    mobileNavLinks.forEach((link, index) => {
        link.style.setProperty('--i', index);
    });
    
    // PERBAIKAN: Hapus event listener lama sebelum menambahkan yang baru
    const oldClickHandler = menuToggle.onclick;
    if (oldClickHandler) {
        menuToggle.removeEventListener('click', oldClickHandler);
    }
    
    // PERBAIKAN: Tambahkan event listener baru dengan direct function
    menuToggle.onclick = function() {
        console.log("Menu toggle clicked"); // Debugging log
        menuToggle.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    };
    
    // Event listener untuk tombol close
    if (menuClose) {
        menuClose.onclick = function() {
            console.log("Menu close clicked"); // Debugging log
            menuToggle.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        };
    }
    
    // Tutup menu saat link diklik
    mobileNavLinks.forEach(link => {
        const anchor = link.querySelector('a');
        if (anchor) {
            anchor.onclick = function() {
                console.log("Menu link clicked"); // Debugging log
                menuToggle.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            };
        }
    });
    
    // Tutup menu saat klik di luar menu
    document.addEventListener('click', function(event) {
        // Jika menu terbuka dan klik di luar menu dan bukan pada hamburger button
        if (
            mobileMenuOverlay &&
            mobileMenuOverlay.classList.contains('active') && 
            !mobileMenuOverlay.contains(event.target) && 
            !menuToggle.contains(event.target)
        ) {
            console.log("Clicked outside menu"); // Debugging log
            menuToggle.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    console.log("Mobile menu setup completed"); // Debugging log
}

// Setup deteksi perangkat mobile
function setupMobileDetection() {
    // Deteksi apakah perangkat mobile
    function detectMobile() {
        return (window.innerWidth <= 767);
    }
    
    // Fungsi untuk mengatur tampilan sesuai dengan jenis perangkat
    function setViewMode() {
        // PERBAIKAN: Ambil elemen header mobile
        const mobileHeader = document.querySelector('.mobile-header');
        
        if (detectMobile()) {
            document.body.classList.add('mobile-view');
            
            // PERBAIKAN: Tampilkan header mobile jika tersedia
            if (mobileHeader) {
                mobileHeader.style.display = 'flex';
            }
            
            // Inisialisasi menu mobile jika belum
            if (!document.querySelector('.mobile-menu-overlay')) {
                initMobileMenu();
            }
        } else {
            document.body.classList.remove('mobile-view');
            
            // PERBAIKAN: Sembunyikan header mobile jika tersedia
            if (mobileHeader) {
                mobileHeader.style.display = 'none';
            }
            
            // Reset menu state saat beralih ke desktop
            const menuToggle = document.querySelector('.menu-toggle');
            const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
            
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
            
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                
                // PERBAIKAN: Sembunyikan menu overlay saat beralih ke desktop
                mobileMenuOverlay.style.display = 'none';
            }
            
            document.body.classList.remove('menu-open');
        }
    }
    
    // Set view mode saat halaman dimuat
    setViewMode();
    
    // Panggil kembali fungsi saat ukuran layar berubah (resize)
    window.addEventListener('resize', function() {
        setViewMode();
    });
}
// Inisialisasi Library AOS
AOS.init({
    duration: 1000,
    once: false,
    mirror: true
});

// Dapatkan modal
const modal = document.getElementById('portfolioModal');
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
                const src = element.src;
                element.src = '';  // Kosongkan src untuk menghentikan playback
                // Tidak perlu memasang kembali src karena modal sudah ditutup
            }
        }
    });
});

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

// Animasi untuk portfolio items
document.addEventListener('DOMContentLoaded', function() {
    // Animasi hover untuk item portfolio
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
    viewButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
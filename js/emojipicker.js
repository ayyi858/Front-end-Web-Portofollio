/**
 * Emoji Picker untuk Chatbot Premium
 * 
 * Fitur:
 * - Kategori emoji yang terorganisir
 * - Recent emojis
 * - Pencarian emoji
 * - Animasi smooth
 */

// Emoji categories dan data
const emojiData = {
    // Emoji umum yang sering digunakan
    smileys: [
      "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", 
      "😋", "😎", "😍", "🥰", "😘", "😚", "😙", "🙂", "🤗", "🤩",
      "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮",
      "🤐", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤",
      "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖",
      "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "🤯",
      "😬", "😰", "😱", "🥵", "🥶", "😳", "🤪", "😵", "😡", "😠"
    ],
    
    // Emoji untuk ekspresi tangan dan orang
    gestures: [
      "👍", "👎", "👌", "👋", "🤚", "🖐️", "✋", "🖖", "👏", "🙌",
      "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "👂", "👀",
      "👁️", "👅", "👄", "👶", "🧒", "👦", "👧", "🧑", "👱", "👨",
      "👩", "🧓", "👴", "👵", "🙍", "🙎", "🙅", "🙆", "💁", "🙋",
      "🙇", "🤦", "🤷", "💆", "💇", "🚶", "🏃", "💃", "🕺", "🧖"
    ],
    
    // Emoji untuk objek dan tema desain/developer
    objects: [
      "🎨", "🖌️", "✏️", "📝", "📷", "🎬", "🎭", "🎼", "🎵", "🎮",
      "📱", "💻", "🖥️", "📸", "📹", "📼", "📟", "📠", "📺", "💽",
      "💾", "💿", "📀", "📁", "📂", "📃", "📄", "📊", "📈", "📉",
      "📋", "📌", "📍", "📎", "📏", "📐", "🔎", "🔍", "📒", "📔",
      "📕", "📖", "📗", "📘", "📙", "📚", "📓", "📒", "📜", "📰"
    ],
    
    // Emoji untuk simbol dan ikon
    symbols: [
      "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
      "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️",
      "✝️", "☪️", "🕉️", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐",
      "⚛️", "🆔", "🈳", "🈹", "🈶", "🈚", "🈸", "🈺", "🈷️", "✴️",
      "📛", "🔰", "⭕", "✅", "☑️", "✔️", "❌", "❎", "〽️", "⚠️"
    ]
  };
  
  // Recently used emojis (akan disimpan di localStorage)
  let recentEmojis = [];
  const MAX_RECENT_EMOJIS = 20;
  
  // ==== Emoji Picker Functions ====
  
  // Inisialisasi emoji picker
  function initEmojiPicker(containerId = 'emoji-picker', inputId = 'chatbotInput') {
    // Dapatkan elemen container untuk emoji picker
    const container = document.getElementById(containerId) || document.querySelector('.emoji-picker');
    if (!container) return;
    
    // Dapatkan input field terkait
    const inputField = document.getElementById(inputId) || document.getElementById('chatbotInput');
    if (!inputField) return;
    
    // Load recent emojis dari localStorage
    loadRecentEmojis();
    
    // Buat struktur emoji picker
    createEmojiPickerStructure(container);
    
    // Bind events
    bindEvents(container, inputField);
  }
  
  // Buat struktur HTML untuk emoji picker
  function createEmojiPickerStructure(container) {
    // Buat container untuk kategori dan search
    const headerHTML = `
      <div class="emoji-picker-header">
        <div class="emoji-search-container">
          <input type="text" class="emoji-search" placeholder="Cari emoji...">
          <i class="fas fa-search emoji-search-icon"></i>
        </div>
        <div class="emoji-categories">
          <button class="emoji-category active" data-category="recent" title="Terakhir Digunakan">
            <i class="fas fa-history"></i>
          </button>
          <button class="emoji-category" data-category="smileys" title="Emoji & Ekspresi">
            <i class="fas fa-smile"></i>
          </button>
          <button class="emoji-category" data-category="gestures" title="Orang & Gestur">
            <i class="fas fa-hand-peace"></i>
          </button>
          <button class="emoji-category" data-category="objects" title="Objek">
            <i class="fas fa-palette"></i>
          </button>
          <button class="emoji-category" data-category="symbols" title="Simbol">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
      <div class="emoji-content">
        <div class="emoji-grid" id="emoji-grid"></div>
      </div>
    `;
    
    // Set HTML ke container
    container.innerHTML = headerHTML;
    
    // Render emoji grid untuk kategori default (recent)
    renderEmojiGrid('recent', container);
  }
  
  // Render emoji grid berdasarkan kategori
  function renderEmojiGrid(category, container) {
    const emojiGrid = container.querySelector('#emoji-grid');
    if (!emojiGrid) return;
    
    // Clear existing emojis
    emojiGrid.innerHTML = '';
    
    // Get emoji list for current category
    let emojis = [];
    
    if (category === 'recent') {
      emojis = recentEmojis;
      
      // Tampilkan message jika tidak ada recent emojis
      if (emojis.length === 0) {
        emojiGrid.innerHTML = `
          <div class="emoji-empty-state">
            <i class="far fa-laugh-beam"></i>
            <p>Belum ada emoji yang digunakan</p>
          </div>
        `;
        return;
      }
    } else {
      emojis = emojiData[category] || [];
    }
    
    // Render emojis
    emojis.forEach(emoji => {
      const emojiElement = document.createElement('button');
      emojiElement.classList.add('emoji-item');
      emojiElement.innerHTML = emoji;
      emojiElement.title = getEmojiName(emoji);
      emojiElement.setAttribute('data-emoji', emoji);
      emojiGrid.appendChild(emojiElement);
    });
  }
  
  // Cari emoji berdasarkan query
  function searchEmojis(query, container) {
    const emojiGrid = container.querySelector('#emoji-grid');
    if (!emojiGrid) return;
    
    // Clear existing emojis
    emojiGrid.innerHTML = '';
    
    if (!query.trim()) {
      // Jika query kosong, kembali ke recent emojis
      renderEmojiGrid('recent', container);
      return;
    }
    
    // Flatten all emoji categories untuk pencarian
    const allEmojis = [
      ...emojiData.smileys,
      ...emojiData.gestures,
      ...emojiData.objects,
      ...emojiData.symbols
    ];
    
    // Cari emoji berdasarkan nama (simplified)
    const results = allEmojis.filter(emoji => {
      const emojiName = getEmojiName(emoji).toLowerCase();
      return emojiName.includes(query.toLowerCase());
    });
    
    // Tampilkan hasil pencarian
    if (results.length === 0) {
      emojiGrid.innerHTML = `
        <div class="emoji-empty-state">
          <i class="fas fa-search"></i>
          <p>Tidak ada emoji yang cocok dengan "${query}"</p>
        </div>
      `;
    } else {
      results.forEach(emoji => {
        const emojiElement = document.createElement('button');
        emojiElement.classList.add('emoji-item');
        emojiElement.innerHTML = emoji;
        emojiElement.title = getEmojiName(emoji);
        emojiElement.setAttribute('data-emoji', emoji);
        emojiGrid.appendChild(emojiElement);
      });
    }
  }
  
  // Bind event listeners
  function bindEvents(container, inputField) {
    // Category selection
    const categories = container.querySelectorAll('.emoji-category');
    categories.forEach(categoryBtn => {
      categoryBtn.addEventListener('click', () => {
        // Set active category
        categories.forEach(btn => btn.classList.remove('active'));
        categoryBtn.classList.add('active');
        
        // Render emoji grid
        const category = categoryBtn.getAttribute('data-category');
        renderEmojiGrid(category, container);
      });
    });
    
    // Emoji selection
    container.addEventListener('click', (e) => {
      const target = e.target;
      
      // Cek jika yang diklik adalah emoji item
      if (target.classList.contains('emoji-item')) {
        const emoji = target.getAttribute('data-emoji');
        if (emoji) {
          // Tambahkan emoji ke input field
          insertEmojiToInput(emoji, inputField);
          
          // Tambahkan ke recent emojis
          addToRecentEmojis(emoji);
        }
      }
    });
    
    // Search functionality
    const searchInput = container.querySelector('.emoji-search');
    if (searchInput) {
      // Debouncing untuk search
      let debounceTimeout;
      searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          searchEmojis(searchInput.value, container);
        }, 300);
      });
      
      // Clear search when clicking on the search icon
      const searchIcon = container.querySelector('.emoji-search-icon');
      if (searchIcon) {
        searchIcon.addEventListener('click', () => {
          searchInput.value = '';
          renderEmojiGrid('recent', container);
        });
      }
    }
  }
  
  // Tambahkan emoji ke input field pada posisi cursor
  function insertEmojiToInput(emoji, inputField) {
    const cursorPos = inputField.selectionStart;
    const textBefore = inputField.value.substring(0, cursorPos);
    const textAfter = inputField.value.substring(cursorPos);
    
    // Set new input value
    inputField.value = textBefore + emoji + textAfter;
    
    // Reset cursor position
    inputField.selectionStart = cursorPos + emoji.length;
    inputField.selectionEnd = cursorPos + emoji.length;
    
    // Trigger input event
    const event = new Event('input', { bubbles: true });
    inputField.dispatchEvent(event);
    
    // Focus back to input
    inputField.focus();
  }
  
  // Tambahkan emoji ke recent emojis
  function addToRecentEmojis(emoji) {
    // Hapus emoji jika sudah ada di recent list
    recentEmojis = recentEmojis.filter(e => e !== emoji);
    
    // Tambahkan emoji ke awal array
    recentEmojis.unshift(emoji);
    
    // Batasi jumlah recent emojis
    if (recentEmojis.length > MAX_RECENT_EMOJIS) {
      recentEmojis = recentEmojis.slice(0, MAX_RECENT_EMOJIS);
    }
    
    // Simpan ke localStorage
    saveRecentEmojis();
  }
  
  // Simpan recent emojis ke localStorage
  function saveRecentEmojis() {
    try {
      localStorage.setItem('recent_emojis', JSON.stringify(recentEmojis));
    } catch (error) {
      console.error('Error saving recent emojis:', error);
    }
  }
  
  // Load recent emojis dari localStorage
  function loadRecentEmojis() {
    try {
      const savedEmojis = localStorage.getItem('recent_emojis');
      if (savedEmojis) {
        recentEmojis = JSON.parse(savedEmojis);
      }
    } catch (error) {
      console.error('Error loading recent emojis:', error);
      recentEmojis = [];
    }
  }
  
  // Dapatkan nama emoji (simplified implementation)
  function getEmojiName(emoji) {
    // Nama emoji default berdasarkan kategori
    const emojiNames = {
      "😀": "Grinning Face",
      "😁": "Beaming Face",
      "😂": "Laughing",
      "👍": "Thumbs Up",
      "👎": "Thumbs Down",
      "👋": "Waving Hand",
      "🎨": "Artist Palette",
      "💻": "Laptop",
      "🖌️": "Paintbrush",
      "📷": "Camera",
      "🎬": "Clapper Board",
      "❤️": "Red Heart",
      "👏": "Clapping Hands",
      "🙌": "Raising Hands",
      "✅": "Check Mark",
      "🚀": "Rocket",
      "💯": "Hundred Points",
      "🔥": "Fire",
      "✨": "Sparkles"
    };
    
    return emojiNames[emoji] || "Emoji";
  }
  
  // Inisialisasi emoji picker saat DOM loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah chatbot emoji picker sudah ada
    const existingPicker = document.querySelector('.emoji-picker');
    if (existingPicker) {
      initEmojiPicker('emoji-picker', 'chatbotInput');
    }
  });
  
  // Export function untuk digunakan oleh chatbot.js
  if (typeof window !== 'undefined') {
    window.initEmojiPicker = initEmojiPicker;
  }
/**
 * Premium Chatbot Script untuk Portfolio - PROFESSIONAL EDITION
 * Ahmad Syarif Hidayatullah
 * Improved by Claude AI
 * Version 2.0.0
 * 
 * Fitur Professional:
 * - UI/UX Kelas Enterprise
 * - AI-driven conversation flow
 * - Smart suggestions yang kontekstual
 * - Rich cards untuk portfolio showcase
 * - Type animation dengan kemampuan pause/resume
 * - Multi-language support (ID/EN)
 * - Analytics & user interaction logging
 * - Persistent history dengan encryption
 * - Voice interaction yang canggih
 * - Performance optimization
 */

// Immediately-Invoked Function Expression untuk encapsulation dan namespace protection
(function(window, document) {
    'use strict';
  
    // ===== Constants & Configuration =====
    const CONFIG = {
      VERSION: '2.0.0',
      TYPING_SPEED: { min: 20, max: 40 },  // ms per karakter untuk animasi typing (random range)
      TYPING_VARIANCE: 0.3,                // Variance dalam typing speed untuk efek natural
      MAX_TYPING_SPEED: 50,                // Kecepatan maksimum (karakter per detik)
      TYPING_DELAY: { min: 600, max: 1200 },// Range delay sebelum mulai mengetik (ms)
      GREETING_DELAY: 800,                 // Delay sebelum menampilkan pesan welcome (ms)
      MESSAGE_DELAY: 500,                  // Delay antara pesan (ms)
      THINKING_DELAY: { min: 800, max: 2000 }, // Delay untuk simulasi "berpikir" (ms)
      DEBOUNCE_TIME: 300,                  // Debounce time untuk input (ms)
      EMPTY_STATE_DELAY: 800,              // Delay sebelum menampilkan empty state (ms)
      STORAGE_KEY: 'premium_chatbot_data', // Key untuk localStorage
      STORAGE_ENCRYPTION_KEY: 'ASH-Portfolio-2025', // Encryption key untuk data
      MAX_MESSAGES: 100,                   // Maximum jumlah pesan yang disimpan
      VOICE_LANG: 'id-ID',                 // Default bahasa untuk voice recognition
      INACTIVITY_TIMEOUT: 300000,          // Timeout untuk inactivity (5 menit)
      ANIMATION_DURATION: 300,             // Durasi animasi dalam ms
      MAX_SUGGESTIONS: 4,                  // Maximum jumlah suggestions ditampilkan sekaligus
      ANALYTICS_ENABLED: true,             // Toggle analytics
      DEBUG_MODE: false                    // Toggle debug mode
    };
  
    // Theme constants
    const THEME = {
      PRIMARY: '#091538',    // Navy Blue
      ACCENT: '#c1a71a',     // Gold
      SUCCESS: '#4ade80',    // Green
      ERROR: '#f87171',      // Red
      WARNING: '#fbbf24',    // Yellow
      INFO: '#60a5fa',       // Blue
      BACKGROUND: '#ffffff',
      TEXT_PRIMARY: '#333333',
      TEXT_SECONDARY: '#777777'
    };
  
    // ===== State Management =====
    const State = {
      isChatOpen: false,
      isTyping: false,
      isEmojiPickerOpen: false,
      isListening: false,
      isThinking: false,
      currentLanguage: 'id',
      messageHistory: [],
      sessionData: {
        startTime: new Date(),
        interactions: 0,
        queries: []
      },
      context: {
        lastTopic: null,
        lastQuery: null,
        conversationFlow: []
      },
      typingTimeouts: [],
      userProfile: {
        visitCount: 0,
        lastVisit: null,
        preferredTopics: []
      },
      inactivityTimeout: null,
      
      // Methods
      reset() {
        this.isTyping = false;
        this.isThinking = false;
        this.isEmojiPickerOpen = false;
        this.isListening = false;
        // Clear all timeouts
        this.typingTimeouts.forEach(timeout => clearTimeout(timeout));
        this.typingTimeouts = [];
      }
    };
  
    // ===== DOM References Cache =====
    let DOM = {
      chatbotContainer: null,
      chatbotMessages: null,
      chatbotInput: null,
      sendMessageBtn: null,
      chatbotToggle: null,
      quickReplies: null,
      clearChatBtn: null,
      closeBtn: null,
      minimizeBtn: null,
      emojiBtn: null,
      micBtn: null,
      emojiPicker: null,
      languageToggle: null,
      thinkingIndicator: null
    };
  
    // ===== Database for Responses =====
    const BotResponses = {
      id: {
        greeting: [
          "Halo! Senang bertemu dengan Anda. Saya Ahmad Syarif, bagaimana saya bisa membantu Anda hari ini?",
          "Hi! Selamat datang di portofolio interaktif saya. Ada yang bisa saya jelaskan tentang karya atau skill saya?",
          "Halo! Saya Ahmad Syarif Hidayatullah, designer dan developer. Apa yang ingin Anda ketahui tentang saya?"
        ],
        
        introduction: [
          "Saya Ahmad Syarif Hidayatullah, seorang Designer, Video Editor, dan Web Developer dari Sulawesi. Portofolio ini adalah kumpulan karya terbaik dan perjalanan kreativitas saya.",
          "Perkenalkan, saya Ahmad Syarif. Saya mengombinasikan desain visual, editing video, dan pengembangan web untuk menciptakan pengalaman digital yang menarik dan fungsional."
        ],
        
        about_me: "Saya adalah Ahmad Syarif Hidayatullah, seorang Designer, Video Editor & Web Developer dari Polewali Mandar, Sulawesi Barat. Saya lahir dan tumbuh di sebuah desa sekitar 250 km sebelah utara dari Kota Makassar. Sebagai generasi milenial, saya tumbuh dalam dua dunia - tradisional dan digital, yang memberi saya perspektif unik dalam pekerjaan kreatif saya.",
        
        education: `
  🎓 Pendidikan saya:
  • MtsN 1 Polewali Mandar (2019-2021)
  • MAN 1 Majene (2021-2023)  
  • UNM Bisnis Digital S1 (2023-Sekarang)
  
  Awalnya saya ingin masuk DKV, tapi takdir membawa saya ke Bisnis Digital yang ternyata membuka peluang besar di dunia digital.`,
        
        experience: `
  💼 Pengalaman kerja saya:
  • Freelance Industri Kreatif di Ayyi Productions (2019-Sekarang)
  • Designer BRAND Mallondri (2020-2023)
  • Web Developer Kedai Mampir (2023-2024)
  • Web Developer Mallondri (2020-Sekarang)
  • Video Editor & Designer HIMABISDIG (2020-Sekarang)`,
        
        skills: `
  Saya memiliki keahlian di 3 bidang utama:
  
  🎨 Design Graphics:
  • Adobe Illustrator (85%)
  • Adobe Photoshop (85%)
  • CorelDRAW (95%)
  • Figma (95%)
  • Canva (98%)
  
  🎥 Video Editor:
  • Adobe Premiere Pro (95%)
  • After Effects (85%)
  • DaVinci Resolve (90%)
  
  💻 Web Developer:
  • HTML/CSS (95%/85%)
  • Python & Django (85%)
  • MySQL (80%)`,
        
        portfolio: {
          text: `Beberapa proyek terbaik di portofolio saya:`,
          items: [
            {
              category: "🎨 Design:",
              projects: [
                "Logo Marasa (UMKM Kuliner)",
                "Redesign Packaging Manipi Coffee",
                "Logo SwitchEase",
                "Logo Peduli"
              ]
            },
            {
              category: "🎥 Video:",
              projects: [
                "Video Profil HIMABISDIG",
                "Short Movie Sungai & Sampah",
                "Teaser LKMMD 24"
              ]
            },
            {
              category: "💻 Web:",
              projects: [
                "Website Mallondri",
                "Website Kedai Mampir",
                "E-Commerce Manipi Coffee"
              ]
            }
          ]
        },
        
        contact: `
  Anda bisa menghubungi saya melalui:
  
  📧 Email: boulukapiang858@gmail.com
  📱 WhatsApp: +6281256961784
  📷 Instagram: @asyarif_hidayatullah
  💼 LinkedIn: Ahmad Syarif Hidayatullah
  🌐 GitHub: ayyi858
  🎨 Behance: syarifayi`,
    
        quotes: [
          "Tidur adalah bagian dari Ibadah, Maka dari itu saya sering tidur Untuk Menemui Mimpi saya.",
          "Kita semua sepakat bahwa Pendidikan merupakan faktor utama dalam mewujudkan perubahan.",
          "Kreativitas adalah mengekspresikan diri melalui seni, desain adalah mengomunikasikan pesan melalui visual.",
          "Setiap project adalah kesempatan untuk menciptakan solusi yang lebih baik dari sebelumnya."
        ],
    
        hobbies: "Selain bekerja, saya menikmati fotografi, menjelajahi tempat baru di Sulawesi, membaca tentang desain dan teknologi terbaru, serta sesekali bermain game untuk refreshing.",
        
        thanks: [
          "Terima kasih! Senang bisa membantu Anda mengenal saya lebih baik.",
          "Sama-sama! Jika Anda tertarik berkolaborasi, jangan ragu untuk menghubungi saya.",
          "Dengan senang hati! Harap jelajahi portofolio saya untuk melihat karya-karya lainnya."
        ],
        
        goodbye: [
          "Sampai jumpa! Terima kasih telah mengunjungi portofolio saya.",
          "Sampai bertemu lagi! Semoga hari Anda menyenangkan.",
          "Terima kasih atas waktu Anda. Jangan ragu untuk kembali jika ada pertanyaan!"
        ],
    
        default: [
          "Maaf, saya tidak mengerti pertanyaan Anda. Bisa dijelaskan lebih detail?",
          "Hmm, saya tidak yakin maksud pertanyaan Anda. Mungkin tanyakan tentang skill, pendidikan, atau portofolio saya?",
          "Saya belum bisa menjawab pertanyaan tersebut. Coba tanyakan tentang pengalaman, skill, atau cara menghubungi saya?"
        ],
        
        thinking: [
          "Hmm, biar saya pikirkan sebentar...",
          "Baik, sebentar ya...",
          "Sedang menganalisa pertanyaan Anda..."
        ],
        
        fallback: [
          "Maaf, saya mengalami kesulitan memproses permintaan Anda. Mari coba lagi dengan pertanyaan yang berbeda.",
          "Sepertinya ada sedikit kendala. Bisa coba tanyakan dengan cara lain?"
        ]
      },
      
      en: {
        greeting: [
          "Hello! Nice to meet you. I'm Ahmad Syarif, how can I help you today?",
          "Hi! Welcome to my interactive portfolio. Is there anything specific about my work or skills that you'd like to know?",
          "Hello! I'm Ahmad Syarif Hidayatullah, a designer and developer. What would you like to know about me?"
        ],
        
        introduction: [
          "I'm Ahmad Syarif Hidayatullah, a Designer, Video Editor, and Web Developer from Sulawesi, Indonesia. This portfolio represents my best work and creative journey.",
          "Let me introduce myself, I'm Ahmad Syarif. I combine visual design, video editing, and web development to create engaging and functional digital experiences."
        ],
        
        about_me: "I'm Ahmad Syarif Hidayatullah, a Designer, Video Editor & Web Developer from Polewali Mandar, West Sulawesi. I was born and raised in a village about 250 km north of Makassar City. As a millennial, I grew up in two worlds - traditional and digital, giving me a unique perspective in my creative work.",
        
        education: `
  🎓 My Education:
  • MtsN 1 Polewali Mandar (2019-2021)
  • MAN 1 Majene (2021-2023)  
  • UNM Business Digital Bachelor's Degree (2023-Present)
  
  Initially, I wanted to study Visual Communication Design, but fate led me to Digital Business which has opened up great opportunities in the digital world.`,
        
        experience: `
  💼 My Work Experience:
  • Freelance Creative Industry at Ayyi Productions (2019-Present)
  • BRAND Designer at Mallondri (2020-2023)
  • Web Developer at Kedai Mampir (2023-2024)
  • Web Developer at Mallondri (2020-Present)
  • Video Editor & Designer at HIMABISDIG (2020-Present)`,
        
        skills: `
  I have expertise in 3 main areas:
  
  🎨 Design Graphics:
  • Adobe Illustrator (85%)
  • Adobe Photoshop (85%)
  • CorelDRAW (95%)
  • Figma (95%)
  • Canva (98%)
  
  🎥 Video Editor:
  • Adobe Premiere Pro (95%)
  • After Effects (85%)
  • DaVinci Resolve (90%)
  
  💻 Web Developer:
  • HTML/CSS (95%/85%)
  • Python & Django (85%)
  • MySQL (80%)`,
        
        portfolio: {
          text: `Some of my best projects in my portfolio:`,
          items: [
            {
              category: "🎨 Design:",
              projects: [
                "Marasa Logo (Culinary SME)",
                "Manipi Coffee Packaging Redesign",
                "SwitchEase Logo",
                "Peduli Logo"
              ]
            },
            {
              category: "🎥 Video:",
              projects: [
                "HIMABISDIG Profile Video",
                "River & Trash Short Movie",
                "LKMMD 24 Teaser"
              ]
            },
            {
              category: "💻 Web:",
              projects: [
                "Mallondri Website",
                "Kedai Mampir Website",
                "Manipi Coffee E-Commerce"
              ]
            }
          ]
        },
        
        contact: `
  You can contact me through:
  
  📧 Email: boulukapiang858@gmail.com
  📱 WhatsApp: +6281256961784
  📷 Instagram: @asyarif_hidayatullah
  💼 LinkedIn: Ahmad Syarif Hidayatullah
  🌐 GitHub: ayyi858
  🎨 Behance: syarifayi`,
    
        quotes: [
          "Sleep is part of worship, that's why I often sleep to meet my dreams.",
          "We all agree that Education is a key factor in realizing change.",
          "Creativity is expressing yourself through art, design is communicating messages through visuals.",
          "Each project is an opportunity to create better solutions than before."
        ],
    
        hobbies: "Besides work, I enjoy photography, exploring new places in Sulawesi, reading about design and the latest technology, and occasionally playing games for refreshment.",
        
        thanks: [
          "Thank you! Happy to help you get to know me better.",
          "You're welcome! If you're interested in collaborating, don't hesitate to contact me.",
          "My pleasure! Please explore my portfolio to see more of my work."
        ],
        
        goodbye: [
          "Goodbye! Thank you for visiting my portfolio.",
          "See you next time! Have a wonderful day.",
          "Thank you for your time. Feel free to come back if you have any questions!"
        ],
    
        default: [
          "Sorry, I don't understand your question. Could you explain in more detail?",
          "Hmm, I'm not sure what you're asking. Maybe ask about my skills, education, or portfolio?",
          "I can't answer that question yet. Try asking about my experience, skills, or how to contact me?"
        ],
        
        thinking: [
          "Hmm, let me think about that for a moment...",
          "Alright, just a second...",
          "Analyzing your question..."
        ],
        
        fallback: [
          "Sorry, I'm having trouble processing your request. Let's try again with a different question.",
          "Seems there's a slight issue. Could you try asking in a different way?"
        ]
      }
    };
  
    // Skills data dengan metadata tambahan
    const SkillsData = {
      design: [
        { name: "Adobe Illustrator", level: "85%", icon: "img/skill/design/ilust.png", description: "Vector graphics design" },
        { name: "Adobe Photoshop", level: "85%", icon: "img/skill/design/ps.png", description: "Image editing & manipulation" },
        { name: "CorelDRAW", level: "95%", icon: "img/skill/design/corel.png", description: "Vector illustration & page layout" },
        { name: "Figma", level: "95%", icon: "img/skill/design/figma.png", description: "UI/UX design & prototyping" },
        { name: "Canva", level: "98%", icon: "img/skill/design/canva.png", description: "Quick design & templates" },
        { name: "Adobe XD", level: "85%", icon: "img/skill/design/xd.png", description: "Interface design & prototyping" }
      ],
      video: [
        { name: "Adobe Premiere Pro", level: "95%", icon: "img/skill/veditor/premier.png", description: "Professional video editing" },
        { name: "After Effects", level: "85%", icon: "img/skill/veditor/ae.png", description: "Motion graphics & visual effects" },
        { name: "DaVinci Resolve", level: "90%", icon: "img/skill/veditor/davinci.png", description: "Color grading & editing" },
        { name: "CapCut", level: "95%", icon: "img/skill/veditor/capcut.png", description: "Mobile & quick video editing" },
        { name: "Sony Vegas", level: "90%", icon: "img/skill/veditor/vegas.png", description: "Multi-track video editing" }
      ],
      web: [
        { name: "HTML/CSS", level: "95%", icon: "img/skill/webdev/html.png", description: "Frontend structure & styling" },
        { name: "Python", level: "85%", icon: "img/skill/webdev/python.png", description: "Backend programming" },
        { name: "Django", level: "85%", icon: "img/skill/webdev/djanggo.png", description: "Web framework" },
        { name: "MySQL", level: "80%", icon: "img/skill/webdev/mysql.png", description: "Database management" },
        { name: "Node.js", level: "60%", icon: "img/skill/webdev/nodejs.png", description: "JavaScript runtime" }
      ]
    };
  
    // Portfolio cards data
    const PortfolioData = {
      design: [
        {
          title: "Logo Marasa",
          image: "img/porto/p1.png",
          description: "Brand identity for a culinary SME, combining typography with visual symbols representing brand characteristics with a modern approach while maintaining traditional values.",
          tags: ["Logo Design", "Branding", "Typography"]
        },
        {
          title: "Manipi Coffee Packaging",
          image: "img/porto/p2.png",
          description: "Redesigned Manipi Coffee packaging blending modern aesthetics with authentic values, reflecting premium quality and unique taste while strengthening visual appeal and brand identity.",
          tags: ["Packaging", "Brand Identity", "Product Design"]
        },
        {
          title: "Logo SwitchEase",
          image: "img/porto/p3.png",
          description: "Designed the SwitchEase logo with modern typography and visual symbols, reflecting ease, innovation, and smart technology in remote control switches.",
          tags: ["Logo Design", "Smart Tech", "Minimalism"]
        }
      ],
      video: [
        {
          title: "HIMABISDIG Profile Video",
          image: "img/porto/v1.jpg",
          description: "Crafted HIMABISDIG Profile Video by combining visual elements and narrative that showcase the organization's characteristics while maintaining values that form HIMABISDIG's identity.",
          tags: ["Organization Profile", "Motion Graphics", "Storytelling"]
        },
        {
          title: "River & Trash Short Movie",
          image: "img/porto/v2.png",
          description: "Edited an environmental short movie with aesthetic emphasis while delivering a strong moral message. Editing techniques combining storytelling and powerful visuals with format harmony.",
          tags: ["Short Film", "Environmental", "Narrative"]
        },
        {
          title: "LKMMD 24 Teaser",
          image: "img/porto/v3.jpg",
          description: "Processed event teaser video with modern styling and fast tempo, filled with dynamic transitions that build anticipation. The video editing result is a brief yet impactful visual presentation.",
          tags: ["Event Promotion", "Fast Cuts", "Dynamic Transitions"]
        }
      ],
      web: [
        {
          title: "Mallondri Website",
          image: "img/porto/w1.png",
          description: "Designed, developed, and managed an efficient and responsive website, supporting the company's digital needs with the latest technology.",
          tags: ["Responsive Design", "E-commerce", "Brand Website"]
        },
        {
          title: "Kedai Mampir Website",
          image: "img/porto/w2.png",
          description: "Responsible for designing and developing an attractive and functional website to enhance customer experience and strengthen the cafe's online presence.",
          tags: ["Food & Beverage", "Local Business", "UI/UX"]
        },
        {
          title: "Manipi Coffee E-commerce",
          image: "img/porto/vieww3.png",
          description: "Backend developer for Manipi Coffee E-Commerce, managing the backend system that supports the e-commerce platform smoothly and securely.",
          tags: ["E-commerce", "Backend Development", "User Experience"]
        }
      ]
    };
  
    // Smart suggestions berdasarkan konteks
    const SmartSuggestions = {
      id: {
        initial: ["Tentang kamu", "Skill kamu apa?", "Portofolio", "Kontak"],
        about: ["Pendidikan kamu?", "Pengalaman kerja", "Hobi kamu apa?", "Quote favorit"],
        skills: ["Skill desain", "Skill video editing", "Skill web development", "Tool favorit"],
        portfolio: ["Tunjukkan desain terbaik", "Lihat project video", "Project web development", "Proses kreatif"],
        contact: ["Email kamu", "Social media", "WhatsApp", "GitHub"],
        education: ["Ceritakan tentang kuliahmu", "Jurusan apa?", "Kenapa pilih bisnis digital?", "Pengalaman sekolah"],
        work: ["Project terbesar", "Klien favorit", "Tantangan terbesar", "Rencana karir"],
        design: ["Software design apa?", "Gaya desain favorit", "Proses desain", "Inspirasi desain"],
        video: ["Editing software apa?", "Jenis video favorit", "Teknik editing", "Inspirasi video"],
        web: ["Stack teknologi", "Frontend vs backend", "Framework favorit", "Project web terbaik"],
        farewell: ["Sampai jumpa", "Terima kasih", "Portofolio lainnya", "Hubungi kapan saja"]
      },
      en: {
        initial: ["About you", "Your skills?", "Portfolio", "Contact info"],
        about: ["Your education?", "Work experience", "Your hobbies?", "Favorite quotes"],
        skills: ["Design skills", "Video editing skills", "Web development skills", "Favorite tools"],
        portfolio: ["Show best designs", "See video projects", "Web development projects", "Creative process"],
        contact: ["Your email", "Social media", "WhatsApp", "GitHub"],
        education: ["Tell me about your college", "What major?", "Why digital business?", "School experience"],
        work: ["Biggest project", "Favorite clients", "Biggest challenge", "Career plans"],
        design: ["Design software?", "Favorite design style", "Design process", "Design inspiration"],
        video: ["Editing software?", "Favorite video types", "Editing techniques", "Video inspiration"],
        web: ["Tech stack", "Frontend vs backend", "Favorite frameworks", "Best web projects"],
        farewell: ["Goodbye", "Thank you", "Other portfolio pieces", "Contact anytime"]
      }
    };
  
    // Emoji yang sering digunakan
    const CommonEmojis = [
      "😊", "👍", "👋", "🙏", "👌", "👏", "💯", "✨", "🔥", 
      "🎨", "🖌️", "💻", "📱", "📷", "🎬", "🎥", "📝", "📊",
      "👨‍💻", "👨‍🎨", "🎯", "🚀", "💡", "📚", "🌟", "⭐", "🌈"
    ];
  
    // ===== NLP Patterns =====
    const NLPPatterns = {
      greeting: [
        /^((halo|hai|hi|hello|hey|hei|hallo|hola|apa kabar|selamat (pagi|siang|sore|malam)|pagi|siang|sore|malam))/i,
        /^(assalamualaikum|salam)/i,
        /^((hello|hi|hey|good (morning|afternoon|evening|day)))/i
      ],
      farewell: [
        /(selamat tinggal|sampai jumpa|bye|goodbye|dadah|dah|see you|cu|cyou)/i,
        /(sudah|udah|cukup)/i
      ],
      thankYou: [
        /(terima kasih|makasih|makasi|thanks|thank you|thx|ty|tengkyu)/i,
        /(bagus|keren|mantap|mantab|top|jos|good|nice)/i
      ],
      about: [
        /(siapa|tentang|anda|kamu|dirimu|biodata)/i,
        /(cerita|ceritakan|diri|tentang)/i,
        /(background|latar belakang)/i,
        /(who are you|about you|tell me about|background|profile)/i
      ],
      education: [
        /(pendidikan|sekolah|kuliah|kampus|universitas|lulusan|alumni|jurusan|studi)/i,
        /(dimana|di mana).*?(sekolah|kuliah)/i,
        /(apa|apakah).*?(pendidikan|jurusan|gelar)/i,
        /(education|school|college|university|degree|major|study)/i
      ],
      experience: [
        /(pengalaman|kerja|karir|pekerjaan|projek|proyek|project)/i,
        /(dimana|di mana).*?(kerja|bekerja)/i,
        /(apa|apakah).*?(pekerjaan|posisi|jabatan)/i,
        /(experience|work|career|job|project)/i
      ],
      skills: [
        /(skill|keahlian|kemampuan|bisa|mampu|ahli)/i,
        /(apa|apakah).*?(bisa|mampu|skill)/i,
        /(design|desain|grafis)/i,
        /(video|editing|editor)/i,
        /(web|developer|website|programming|coding)/i,
        /(skills|abilities|capabilities|competencies|expertise)/i
      ],
      portfolio: [
        /(portofolio|portfolio|karya|proyek|projek|project|hasil)/i,
        /(bisa|boleh|tolong).*?(lihat|tunjuk|tampil).*?(karya|hasil)/i,
        /(apa|apakah).*?(karya|buat|cipta)/i,
        /(portfolio|work|projects|creations|showcase)/i
      ],
      contact: [
        /(kontak|hubungi|email|whatsapp|wa|instagram|ig|medsos|sosial|social|media)/i,
        /(bagaimana|gimana).*?(hubungi|kontak)/i,
        /(di mana|dimana).*?(media|sosial|kontak)/i,
        /(contact|reach|email|social media|message)/i
      ],
      quotes: [
        /(quote|quotes|kutipan|kata-kata|motto|slogan)/i,
        /(apa|punya).*?(quote|kutipan|kata)/i,
        /(quotes|sayings|mottos|phrases)/i
      ],
      hobbies: [
        /(hobi|hobby|kegemaran|suka|senang|minat|interest)/i,
        /(apa|apakah).*?(hobi|suka|senang)/i,
        /(waktu luang|free time)/i,
        /(hobbies|interests|passions|leisure|free time)/i
      ],
      language: [
        /(bahasa|language|switch|ganti|change|english|indonesia|indonesian)/i,
        /(speak|talk).*(english|indonesian)/i
      ]
    };
  
    // ===== Utility Functions =====
    
    // Logging utility for consistent console output
    const Logger = {
      debug(message, data) {
        if (CONFIG.DEBUG_MODE) {
          console.log(`%c[CHATBOT DEBUG] ${message}`, 'color: #6366f1', data || '');
        }
      },
      info(message, data) {
        if (CONFIG.DEBUG_MODE) {
          console.info(`%c[CHATBOT INFO] ${message}`, 'color: #0ea5e9', data || '');
        }
      },
      warn(message, data) {
                console.warn(`%c[CHATBOT WARNING] ${message}`, 'color: #eab308', data || '');
        }
      },
      error(message, data) {
        console.error(`%c[CHATBOT ERROR] ${message}`, 'color: #ef4444', data || '');
      }
    };
  
    // Helper untuk random number dalam range
    const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
    // Deep clone untuk objek kompleks
    const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
    
    // Get random item dari array
    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
    
    // Format waktu saat ini untuk timestamp pesan
    const formatTimestamp = () => {
      const now = new Date();
      return now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      });
    };
    
    // Check apakah text match dengan pattern RegExp
    const matchesPattern = (text, patterns) => {
      return patterns.some(pattern => pattern.test(text));
    };
  
    // Enkripsi sederhana untuk data yang disimpan
    const encryptData = (data) => {
      const key = CONFIG.STORAGE_ENCRYPTION_KEY;
      try {
        // Konversi ke JSON string
        const jsonString = JSON.stringify(data);
        
        // Simple XOR encryption with the key
        let encrypted = '';
        for (let i = 0; i < jsonString.length; i++) {
          const charCode = jsonString.charCodeAt(i) ^ key.charCodeAt(i % key.length);
          encrypted += String.fromCharCode(charCode);
        }
        
        // Convert to base64 for storage
        return btoa(encrypted);
      } catch (e) {
        Logger.error('Encryption failed', e);
        return null;
      }
    };
    
    // Dekripsi sederhana untuk data tersimpan
    const decryptData = (encryptedData) => {
      const key = CONFIG.STORAGE_ENCRYPTION_KEY;
      try {
        // Decode from base64
        const encrypted = atob(encryptedData);
        
        // Decrypt with XOR
        let decrypted = '';
        for (let i = 0; i < encrypted.length; i++) {
          const charCode = encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length);
          decrypted += String.fromCharCode(charCode);
        }
        
        // Parse JSON
        return JSON.parse(decrypted);
      } catch (e) {
        Logger.error('Decryption failed', e);
        return null;
      }
    };
    
    // Autosuggest AI - Memberikan kontekstual suggestions
    const generateSuggestions = (context) => {
      const { lastTopic, lastQuery, conversationFlow } = context;
      const language = State.currentLanguage;
      let suggestionsType = 'initial';
      
      // Tentukan jenis suggestion berdasarkan konteks
      if (lastTopic) {
        if (matchesPattern(lastTopic, NLPPatterns.about)) suggestionsType = 'about';
        else if (matchesPattern(lastTopic, NLPPatterns.skills)) suggestionsType = 'skills';
        else if (matchesPattern(lastTopic, NLPPatterns.portfolio)) suggestionsType = 'portfolio';
        else if (matchesPattern(lastTopic, NLPPatterns.contact)) suggestionsType = 'contact';
        else if (matchesPattern(lastTopic, NLPPatterns.education)) suggestionsType = 'education';
        else if (matchesPattern(lastTopic, NLPPatterns.experience)) suggestionsType = 'work';
        
        // Spesifik subtopics
        if (lastTopic.includes('desain') || lastTopic.includes('design')) suggestionsType = 'design';
        else if (lastTopic.includes('video') || lastTopic.includes('editing')) suggestionsType = 'video';
        else if (lastTopic.includes('web') || lastTopic.includes('coding')) suggestionsType = 'web';
        
        // Farewell suggestions
        if (conversationFlow.length > 5 && Math.random() < 0.3) suggestionsType = 'farewell';
      }
      
      // Dapatkan suggestions berdasarkan tipe dan bahasa
      let suggestions = SmartSuggestions[language][suggestionsType] || SmartSuggestions[language].initial;
      
      // Batasi jumlah suggestions
      if (suggestions.length > CONFIG.MAX_SUGGESTIONS) {
        suggestions = suggestions.slice(0, CONFIG.MAX_SUGGESTIONS);
      }
      
      return suggestions;
    };
  
    // Contextual analysis - Menerjemahkan input user ke respon yang relevan
    const analyzeUserInput = (input) => {
      const lowerInput = input.toLowerCase();
      const language = State.currentLanguage;
      
      // Inisialisasi hasil analisis
      const analysis = {
        intent: null,
        confidence: 0.5,
        entities: [],
        sentiment: 'neutral',
        response: null,
        suggestions: [],
        skillType: null,
        portfolioType: null
      };
      
      // Deteksi bahasa - Toggle language jika diminta
      if (matchesPattern(lowerInput, NLPPatterns.language)) {
        State.currentLanguage = language === 'id' ? 'en' : 'id';
        analysis.intent = 'language_switch';
        analysis.response = language === 'id' 
          ? "Switching to English. How can I help you?"
          : "Beralih ke Bahasa Indonesia. Bagaimana saya bisa membantu?";
        analysis.confidence = 0.95;
        return analysis;
      }
      
      // Deteksi greeting
      if (matchesPattern(lowerInput, NLPPatterns.greeting)) {
        analysis.intent = 'greeting';
        analysis.response = getRandomItem(BotResponses[language].greeting);
        analysis.confidence = 0.9;
      }
      // Deteksi farewell
      else if (matchesPattern(lowerInput, NLPPatterns.farewell)) {
        analysis.intent = 'farewell';
        analysis.response = getRandomItem(BotResponses[language].goodbye);
        analysis.confidence = 0.9;
      }
      // Deteksi thank you
      else if (matchesPattern(lowerInput, NLPPatterns.thankYou)) {
        analysis.intent = 'thanks';
        analysis.response = getRandomItem(BotResponses[language].thanks);
        analysis.confidence = 0.85;
      }
      // Deteksi intent tentang diri
      else if (matchesPattern(lowerInput, NLPPatterns.about)) {
        analysis.intent = 'about_me';
        analysis.response = BotResponses[language].about_me;
        analysis.confidence = 0.8;
      }
      // Deteksi intent pendidikan
      else if (matchesPattern(lowerInput, NLPPatterns.education)) {
        analysis.intent = 'education';
        analysis.response = BotResponses[language].education;
        analysis.confidence = 0.8;
      }
      // Deteksi intent pengalaman kerja
      else if (matchesPattern(lowerInput, NLPPatterns.experience)) {
        analysis.intent = 'experience';
        analysis.response = BotResponses[language].experience;
        analysis.confidence = 0.8;
      }
      // Deteksi intent skills
      else if (matchesPattern(lowerInput, NLPPatterns.skills)) {
        analysis.intent = 'skills';
        analysis.response = BotResponses[language].skills;
        analysis.confidence = 0.8;
        
        // Deteksi specific skill type
        if (lowerInput.includes('desain') || lowerInput.includes('design')) {
          analysis.skillType = 'design';
        } else if (lowerInput.includes('video') || lowerInput.includes('editing')) {
          analysis.skillType = 'video';
        } else if (lowerInput.includes('web') || lowerInput.includes('coding') || 
                  lowerInput.includes('programming') || lowerInput.includes('developer')) {
          analysis.skillType = 'web';
        }
      }
      // Deteksi intent portfolio
      else if (matchesPattern(lowerInput, NLPPatterns.portfolio)) {
        analysis.intent = 'portfolio';
        analysis.response = BotResponses[language].portfolio.text;
        analysis.confidence = 0.8;
        
        // Deteksi specific portfolio type
        if (lowerInput.includes('desain') || lowerInput.includes('design')) {
          analysis.portfolioType = 'design';
        } else if (lowerInput.includes('video') || lowerInput.includes('editing')) {
          analysis.portfolioType = 'video';
        } else if (lowerInput.includes('web') || lowerInput.includes('website')) {
          analysis.portfolioType = 'web';
        }
      }
      // Deteksi intent kontak
      else if (matchesPattern(lowerInput, NLPPatterns.contact)) {
        analysis.intent = 'contact';
        analysis.response = BotResponses[language].contact;
        analysis.confidence = 0.8;
      }
      // Deteksi intent quotes
      else if (matchesPattern(lowerInput, NLPPatterns.quotes)) {
        analysis.intent = 'quotes';
        analysis.response = getRandomItem(BotResponses[language].quotes);
        analysis.confidence = 0.75;
      }
      // Deteksi intent hobbies
      else if (matchesPattern(lowerInput, NLPPatterns.hobbies)) {
        analysis.intent = 'hobbies';
        analysis.response = BotResponses[language].hobbies;
        analysis.confidence = 0.75;
      }
      // Default fallback
      else {
        analysis.intent = 'unknown';
        analysis.response = getRandomItem(BotResponses[language].default);
        analysis.confidence = 0.4;
      }
      
      // Update context di state
      State.context.lastTopic = lowerInput;
      State.context.lastQuery = input;
      State.context.conversationFlow.push({
        time: new Date(),
        query: input,
        intent: analysis.intent,
        confidence: analysis.confidence
      });
      
      // Generate smart suggestions berdasarkan context
      analysis.suggestions = generateSuggestions(State.context);
      
      return analysis;
    };
  
    // ===== UI Component Factory =====
    const UIComponents = {
      // Membuat elemen pesan (bot atau user)
      createMessageElement(message, sender = 'bot') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        
        // Avatar
        const avatarElement = document.createElement('div');
        avatarElement.classList.add('message-avatar');
        avatarElement.innerHTML = `<img src="img/${sender === 'user' ? 'fotoo.jpg' : 'fotosaya.jpg'}" alt="${sender === 'user' ? 'You' : 'Ahmad Syarif'}">`;
        
        // Content
        const contentElement = document.createElement('div');
        contentElement.classList.add('message-content');
        
        // Add text and timestamp
        contentElement.innerHTML = `
          <div class="message-text">${this.formatMessage(message)}</div>
          <span class="message-time">${formatTimestamp()}</span>
        `;
        
        // Assemble elements
        messageElement.appendChild(avatarElement);
        messageElement.appendChild(contentElement);
        
        return messageElement;
      },
      
      // Membuat typing indicator
      createTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('message', 'bot-message', 'typing-indicator-message');
        
        // Avatar
        const avatarElement = document.createElement('div');
        avatarElement.classList.add('message-avatar');
        avatarElement.innerHTML = `<img src="img/fotosaya.jpg" alt="Ahmad Syarif">`;
        
        // Content
        const contentElement = document.createElement('div');
        contentElement.classList.add('typing-indicator');
        
        // Add dots
        for (let i = 0; i < 3; i++) {
          const dot = document.createElement('div');
          dot.classList.add('typing-dot');
          contentElement.appendChild(dot);
        }
        
        // Assemble elements
        typingElement.appendChild(avatarElement);
        typingElement.appendChild(contentElement);
        
        return typingElement;
      },
      
      // Membuat thinking indicator ("AI sedang berpikir...")
      createThinkingIndicator(language = 'id') {
        const thinkingElement = document.createElement('div');
        thinkingElement.classList.add('message', 'bot-message', 'thinking-indicator');
        
        // Avatar
        const avatarElement = document.createElement('div');
        avatarElement.classList.add('message-avatar');
        avatarElement.innerHTML = `<img src="img/fotosaya.jpg" alt="Ahmad Syarif">`;
        
        // Content
        const contentElement = document.createElement('div');
        contentElement.classList.add('message-content');
        
        // Add thinking text
        const thinkingText = getRandomItem(BotResponses[language].thinking);
        contentElement.innerHTML = `
          <div class="message-text">${thinkingText}</div>
          <span class="message-time">${formatTimestamp()}</span>
        `;
        
        // Assemble elements
        thinkingElement.appendChild(avatarElement);
        thinkingElement.appendChild(contentElement);
        
        return thinkingElement;
      },
      
      // Create quick reply buttons container
      createQuickReplies(suggestions) {
        const container = document.createElement('div');
        container.classList.add('quick-replies');
        
        suggestions.forEach(suggestion => {
          const button = document.createElement('button');
          button.classList.add('quick-reply-btn');
          button.textContent = suggestion;
          button.setAttribute('data-query', suggestion);
          container.appendChild(button);
        });
        
        return container;
      },
      
      // Create skill bars visualization
      createSkillBars(skillType) {
        if (!SkillsData[skillType]) return null;
        
        const skills = SkillsData[skillType];
        const container = document.createElement('div');
        container.classList.add('skill-list');
        
        // Add heading
        let skillHeading = '';
        switch(skillType) {
          case 'design': skillHeading = '🎨 Design Skills:'; break;
          case 'video': skillHeading = '🎬 Video Editing Skills:'; break;
          case 'web': skillHeading = '💻 Web Development Skills:'; break;
          default: skillHeading = 'Skills:';
        }
        
        container.innerHTML = `<strong class="skill-heading">${skillHeading}</strong>`;
        
        // Create skill bars
        const skillList = document.createElement('div');
        skillList.classList.add('skill-items');
        
        skills.forEach(skill => {
          const percentage = parseInt(skill.level);
          const skillItem = document.createElement('div');
          skillItem.classList.add('skill-item');
          
          skillItem.innerHTML = `
            <div class="skill-item-header">
              ${skill.icon ? `<img src="${skill.icon}" alt="${skill.name}" class="skill-icon">` : ''}
              <div class="skill-details">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-description">${skill.description}</span>
              </div>
              <span class="skill-level">${skill.level}</span>
            </div>
            <div class="skill-bar-container">
              <div class="skill-bar" data-progress="${percentage}" style="width: 0%"></div>
            </div>
          `;
          
          skillList.appendChild(skillItem);
        });
        
        container.appendChild(skillList);
        return container;
      },
      
      // Create portfolio cards
      createPortfolioCards(portfolioType) {
        if (!PortfolioData[portfolioType]) return null;
        
        const projects = PortfolioData[portfolioType];
        const container = document.createElement('div');
        container.classList.add('portfolio-cards');
        
        // Add heading
        let portfolioHeading = '';
        switch(portfolioType) {
          case 'design': portfolioHeading = '🎨 Design Portfolio:'; break;
          case 'video': portfolioHeading = '🎬 Video Portfolio:'; break;
          case 'web': portfolioHeading = '💻 Web Portfolio:'; break;
          default: portfolioHeading = 'Portfolio:';
        }
        
        container.innerHTML = `<strong class="portfolio-heading">${portfolioHeading}</strong>`;
        
        // Create portfolio card container
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        
        // Add portfolio cards
        projects.forEach(project => {
          const card = document.createElement('div');
          card.classList.add('portfolio-card');
          
          card.innerHTML = `
            <div class="card-image">
              <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="card-content">
              <h4 class="card-title">${project.title}</h4>
              <p class="card-description">${project.description}</p>
              <div class="card-tags">
                ${project.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
              </div>
            </div>
          `;
          
          cardContainer.appendChild(card);
        });
        
        container.appendChild(cardContainer);
        return container;
      },
      
      // Create smart suggestions
      createSmartSuggestions(suggestions) {
        if (!suggestions || suggestions.length === 0) return null;
        
        const container = document.createElement('div');
        container.classList.add('smart-suggestions');
        
        suggestions.forEach(suggestion => {
          const suggestionChip = document.createElement('div');
          suggestionChip.classList.add('suggestion-chip');
          suggestionChip.textContent = suggestion;
          container.appendChild(suggestionChip);
        });
        
        return container;
      },
      
      // Format message for display
      formatMessage(message) {
        if (!message) return '';
        
        // Replace URLs with clickable links
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        message = message.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
        
        // Format percentages for highlighting
        const percentageRegex = /(\d{1,3})%/g;
        message = message.replace(percentageRegex, '<span class="highlight">$1%</span>');
        
        // Format headings/sections with better styling
        message = message.replace(/^(#{1,3})\s+(.+)$/gm, function(match, hashes, content) {
          const level = hashes.length;
          return `<h${level+2} class="message-heading">${content}</h${level+2}>`;
        });
        
        // Format bullet points for better display
        message = message.replace(/^\s*[•*-]\s+(.+)$/gm, '<li class="message-list-item">$1</li>');
        message = message.replace(/(<li class="message-list-item">.*?<\/li>)+/gs, '<ul class="message-list">console.warn(`%c[CHATBOT WARNING] ${message}`, 'color: #eab</ul>');
        
        // Convert line breaks to <br>
        message = message.replace(/\n/g, '<br>');
        
        return message;
      },
      
      // Create language switch button
      createLanguageSwitch() {
        const container = document.createElement('div');
        container.classList.add('language-switch');
        container.innerHTML = `
          <button class="language-btn" data-lang="id">🇮🇩</button>
          <button class="language-btn" data-lang="en">🇬🇧</button>
        `;
        return container;
      },
  
      // Create chatbot UI
      createChatbotUI() {
        // Create root container
        const chatbotRoot = document.createElement('div');
        chatbotRoot.id = 'premium-chatbot';
  
        // HTML for chatbot
        chatbotRoot.innerHTML = `
          <div class="chatbot-container">
            <!-- Chat Header -->
            <div class="chatbot-header">
              <div class="chatbot-profile">
                <div class="profile-image">
                  <img src="img/fotosaya.jpg" alt="Ahmad Syarif Hidayatullah">
                  <span class="status-indicator"></span>
                </div>
                <div class="profile-info">
                  <h3>Ahmad Syarif Hidayatullah</h3>
                  <p class="status">Designer & Developer • <span class="online-status">Online</span></p>
                </div>
              </div>
              <div class="chatbot-actions">
                <button class="action-btn language-toggle" title="Switch Language">
                  <i class="fas fa-globe"></i>
                </button>
                <button class="action-btn clear-btn" title="Clear chat">
                  <i class="fas fa-trash-alt"></i>
                </button>
                <button class="action-btn minimize-btn" title="Minimize">
                  <i class="fas fa-minus"></i>
                </button>
                <button class="action-btn close-btn" title="Close">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            
            <!-- Chat Messages -->
            <div class="chatbot-messages" id="chatbotMessages">
              <!-- Messages will be added here -->
              <div class="empty-state">
                <div class="empty-state-icon">
                  <i class="far fa-comments"></i>
                </div>
                <p class="empty-state-text">Selamat datang! Tanyakan tentang skill, portofolio, atau pengalaman saya.</p>
              </div>
            </div>
            
            <!-- Quick Reply Buttons -->
            <div class="quick-replies" id="quickReplies">
              <button class="quick-reply-btn" data-query="tentang kamu">Tentang Kamu</button>
              <button class="quick-reply-btn" data-query="skill kamu">Skills</button>
              <button class="quick-reply-btn" data-query="pendidikan">Pendidikan</button>
              <button class="quick-reply-btn" data-query="portofolio">Portofolio</button>
              <button class="quick-reply-btn" data-query="kontak">Kontak</button>
            </div>
            
            <!-- Chat Input -->
            <div class="chatbot-input">
              <div class="input-wrapper">
                <input 
                  type="text" 
                  id="chatbotInput" 
                  placeholder="Ketik pesan Anda..." 
                  autocomplete="off"
                >
                <button class="emoji-btn" title="Emoji">
                  <i class="far fa-smile"></i>
                </button>
                <button class="mic-btn" title="Voice Input">
                  <i class="fas fa-microphone"></i>
                </button>
              </div>
              <button class="send-btn" id="sendMessageBtn">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
            
            <!-- Emoji Picker -->
            <div class="emoji-picker">
              <div class="emoji-categories">
                <div class="emoji-category active" data-category="recent">🕒</div>
                <div class="emoji-category" data-category="smileys">😀</div>
                <div class="emoji-category" data-category="objects">🎨</div>
                <div class="emoji-category" data-category="symbols">❤️</div>
              </div>
              <div class="emoji-grid">
                ${CommonEmojis.map(emoji => `<div class="emoji">${emoji}</div>`).join('')}
              </div>
            </div>
          </div>
          
          <!-- Chatbot Toggle Button -->
          <button class="chatbot-toggle">
            <div class="toggle-content">
              <img src="img/chatbot.gif" alt="Chatbot" class="toggle-gif">
            </div>
          </button>
        `;
  
        return chatbotRoot;
      }
    };
  
    // ===== Chat Logic =====
    const ChatManager = {
      // Initialize DOM references
      initDOMReferences() {
        DOM.chatbotContainer = document.querySelector('.chatbot-container');
        DOM.chatbotMessages = document.getElementById('chatbotMessages');
        DOM.chatbotInput = document.getElementById('chatbotInput');
        DOM.sendMessageBtn = document.getElementById('sendMessageBtn');
        DOM.chatbotToggle = document.querySelector('.chatbot-toggle');
        DOM.quickReplies = document.getElementById('quickReplies');
        DOM.clearChatBtn = document.querySelector('.clear-btn');
        DOM.closeBtn = document.querySelector('.close-btn');
        DOM.minimizeBtn = document.querySelector('.minimize-btn');
        DOM.emojiBtn = document.querySelector('.emoji-btn');
        DOM.micBtn = document.querySelector('.mic-btn');
        DOM.emojiPicker = document.querySelector('.emoji-picker');
        DOM.languageToggle = document.querySelector('.language-toggle');
      },
      
      // Initialize event listeners
      initEventListeners() {
        // Toggle chatbot
        DOM.chatbotToggle.addEventListener('click', this.toggleChat);
        
        // Send message
        DOM.sendMessageBtn.addEventListener('click', this.sendMessage);
        
        // Press Enter to send message
        DOM.chatbotInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            this.sendMessage();
          }
        });
        
        // Quick replies
        DOM.quickReplies.addEventListener('click', this.handleQuickReply);
        
        // Clear chat
        DOM.clearChatBtn.addEventListener('click', this.clearChat);
        
        // Close chat
        DOM.closeBtn.addEventListener('click', this.closeChat);
        
        // Minimize chat
        DOM.minimizeBtn.addEventListener('click', this.minimizeChat);
        
        // Emoji button
        DOM.emojiBtn.addEventListener('click', this.toggleEmojiPicker);
        
        // Mic button
        DOM.micBtn.addEventListener('click', this.toggleVoiceInput);
        
        // Language toggle
        DOM.languageToggle.addEventListener('click', this.toggleLanguage);
        
        // Smart suggestions click delegation
        DOM.chatbotMessages.addEventListener('click', (e) => {
          if (e.target.classList.contains('suggestion-chip')) {
            DOM.chatbotInput.value = e.target.textContent;
            DOM.chatbotInput.focus();
          }
        });
        
        // Select emoji from picker
        document.querySelector('.emoji-grid').addEventListener('click', (e) => {
          if (e.target.classList.contains('emoji')) {
            this.insertEmoji(e.target.textContent);
          }
        });
        
        // Click outside to close emoji picker
        document.addEventListener('click', (e) => {
          if (State.isEmojiPickerOpen && 
              !DOM.emojiPicker.contains(e.target) && 
              e.target !== DOM.emojiBtn) {
            this.toggleEmojiPicker();
          }
        });
        
        // Set user inactivity detection
        document.addEventListener('mousemove', this.resetInactivityTimer);
        document.addEventListener('keydown', this.resetInactivityTimer);
        DOM.chatbotInput.addEventListener('focus', this.resetInactivityTimer);
        
        // Track chatbot interactions for analytics
        if (CONFIG.ANALYTICS_ENABLED) {
          DOM.chatbotMessages.addEventListener('DOMNodeInserted', (e) => {
            if (e.target.classList && e.target.classList.contains('message')) {
              // Update interaction count for session
              State.sessionData.interactions++;
            }
          });
        }
      },
      
      // Toggle chat open/close
      toggleChat() {
        if (State.isChatOpen) {
          ChatManager.closeChat();
        } else {
          ChatManager.openChat();
        }
      },
      
      // Open chat
      openChat() {
        DOM.chatbotContainer.classList.add('active');
        DOM.chatbotToggle.classList.add('active');
        State.isChatOpen = true;
        
        // Reset inactivity timer
        ChatManager.resetInactivityTimer();
        
        // Focus on input
        setTimeout(() => {
          DOM.chatbotInput.focus();
        }, CONFIG.ANIMATION_DURATION);
        
        // Display welcome message if chat is empty
        if (DOM.chatbotMessages.querySelectorAll('.message').length === 0) {
          setTimeout(() => {
            // Clear empty state
            const emptyState = DOM.chatbotMessages.querySelector('.empty-state');
            if (emptyState) {
              emptyState.remove();
            }
            
            // Add greeting message
            const welcomeMessage = getRandomItem(BotResponses[State.currentLanguage].greeting);
            const initialSuggestions = SmartSuggestions[State.currentLanguage].initial;
            ChatManager.addMessageWithEnhancements(welcomeMessage, false, initialSuggestions);
          }, CONFIG.GREETING_DELAY);
        }
      },
      
      // Close chat
      closeChat() {
        DOM.chatbotContainer.classList.remove('active');
        DOM.chatbotToggle.classList.remove('active');
        State.isChatOpen = false;
        
        // Close emoji picker if open
        if (State.isEmojiPickerOpen) {
          ChatManager.toggleEmojiPicker();
        }
        
        // Reset all states
        State.reset();
      },
      
      // Minimize chat (same as close but different animation)
      minimizeChat() {
        DOM.chatbotContainer.classList.add('minimizing');
        
        setTimeout(() => {
          ChatManager.closeChat();
          DOM.chatbotContainer.classList.remove('minimizing');
        }, 300);
      },
      
      // Send user message
      sendMessage() {
        const message = DOM.chatbotInput.value.trim();
        
        if (message === '') return;
        
        // Add user message to chat
        ChatManager.addMessage(message, 'user');
        
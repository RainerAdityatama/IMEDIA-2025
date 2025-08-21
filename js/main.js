// Menunggu semua HTML dimuat sebelum menjalankan JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // --- PUSAT DATA KONTEN ---
    // Semua data konten kita simpan di sini. Mudah untuk diubah dan ditambah.
    const kontenData = {
        A: {
            paragraf: "Gedung A adalah jantung kegiatan akademik. Dilengkapi dengan ruang kelas modern dan fasilitas lengkap untuk mendukung proses belajar mengajar yang interaktif dan nyaman.",
            hashtag: "#GedungA #PusatAkademik",
            gambarUrl: "img/Group 152 (2).png" // Ganti dengan path gambar Anda
        },
        B: {
            paragraf: "Selamat datang di Gedung B, pusat kreativitas dan inovasi. Di sini terdapat studio desain, lab fotografi, dan ruang pameran untuk menampilkan karya-karya terbaik mahasiswa.",
            hashtag: "#GedungB #StudioKreatif",
            gambarUrl: "img/Group 153 (1).png" // Ganti dengan path gambar Anda
        },
        C: {
            paragraf: "Gedung C merupakan pusat teknologi dan multimedia. Dengan laboratorium komputer canggih dan peralatan produksi audio-visual, mahasiswa bisa bereksplorasi dengan teknologi terkini.",
            hashtag: "#GedungC #LabMultimedia",
            gambarUrl: "img/Group 154 (1).png" // Ganti dengan path gambar Anda
        },
        D: {
            paragraf: "Ini adalah Gedung D, pusat kegiatan mahasiswa dan administrasi. Tempat yang tepat untuk berdiskusi, berorganisasi, dan mengurus berbagai keperluan administrasi kampus dan lain lain.",
            hashtag: "#GedungD #PusatMahasiswa",
            gambarUrl: "img/Group 157 (1).png" // Ganti dengan path gambar Anda
        },
        E: {
            paragraf: "Gedung E atau 'The Tower' adalah ikon baru kampus kami. Gedung serbaguna ini menjadi tempat seminar, workshop, dan berbagai acara besar lainnya yang inspiratif.",
            hashtag: "#GedungE #TheTower",
            gambarUrl: "img/Group 156 (1).png" // Ganti dengan path gambar Anda
        }
    };

    // --- SELEKSI ELEMEN HTML ---
    const menuGedung = document.getElementById('menu-gedung');
    const kontenUtama = document.getElementById('konten-utama');
    const kontenParagraf = document.getElementById('konten-paragraf');
    const kontenHashtag = document.getElementById('konten-hashtag');
    const kontenGambar = document.getElementById('konten-gambar');
    const tombolMenu = menuGedung.querySelectorAll('a');

    // --- EVENT LISTENER UTAMA (EVENT DELEGATION) ---
    menuGedung.addEventListener('click', function (event) {
        // Mencegah link melakukan refresh halaman
        event.preventDefault();

        // Menemukan tombol <a> yang paling dekat dengan elemen yang di-klik
        const targetTombol = event.target.closest('a');

        // Jika yang di-klik bukan tombol, hentikan fungsi
        if (!targetTombol) return;

        const gedungId = targetTombol.dataset.gedung;

        // --- LOGIKA MENGGANTI KONTEN DENGAN TRANSISI ---

        // 1. Buat konten menghilang (fade-out)
        kontenUtama.classList.add('opacity-0');

        // 2. Tunggu transisi selesai, baru ganti kontennya
        setTimeout(() => {
            // Update konten sesuai data
            const data = kontenData[gedungId];
            kontenParagraf.innerHTML = `"${data.paragraf}"<br><span id="konten-hashtag" class="text-blue-600 font-medium">${data.hashtag}</span>`;
            kontenGambar.src = data.gambarUrl;
            kontenGambar.alt = `Gambar ${gedungId}`;

            // 3. Tampilkan kembali konten yang sudah baru (fade-in)
            kontenUtama.classList.remove('opacity-0');
        }, 300); // Durasi harus sama dengan 'duration-300' di Tailwind


        // --- LOGIKA MENGGANTI TOMBOL AKTIF ---
        tombolMenu.forEach(tombol => {
            // Hapus status aktif dari semua tombol
            tombol.classList.remove('bg-[#0A65C1]', 'text-white');
            tombol.classList.add('bg-white', 'text-[#0A65C1]');
        });

        // Tambahkan status aktif hanya pada tombol yang di-klik
        targetTombol.classList.add('bg-[#0A65C1]', 'text-white');
        targetTombol.classList.remove('bg-white', 'text-[#0A65C1]');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ===================================================================
    // SELEKSI SEMUA ELEMEN NAVIGASI (DESKTOP & MOBILE)
    // ===================================================================
    const navMenu = document.getElementById('nav-menu');
    const mobileMenu = document.getElementById('mobile-menu'); // Tambahkan ini
    const sections = document.querySelectorAll('.page-section');
    let currentActiveLink = null;

    // ===================================================================
    // FUNGSI SMOOTH SCROLL (Tidak diubah)
    // ===================================================================
    function smoothScrollTo(targetSelector, duration) {
        const target = document.querySelector(targetSelector);
        if (!target) return;
        const headerOffset = 80; // Tinggi navbar agar tidak tertutup
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        requestAnimationFrame(animation);
    }

    // ===================================================================
    // FUNGSI UPDATE LINK AKTIF (Tidak diubah)
    // ===================================================================
    function updateActiveLink(newActiveLink) {
        if (newActiveLink === currentActiveLink) return;
        if (currentActiveLink) {
            currentActiveLink.classList.remove('border-gray-800', 'font-semibold');
            currentActiveLink.classList.add('border-transparent', 'font-medium');
        }
        if (newActiveLink) {
            newActiveLink.classList.add('border-gray-800', 'font-semibold');
            newActiveLink.classList.remove('border-transparent', 'font-medium');
        }
        currentActiveLink = newActiveLink;
    }

    // ===================================================================
    // LOGIKA NAVBAR AKTIF SAAT SCROLL (Tidak diubah)
    // ===================================================================
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Pastikan navMenu ada sebelum mencari link di dalamnya
                if (navMenu) {
                    const correspondingLink = navMenu.querySelector(`a[href="#${entry.target.id}"]`);
                    updateActiveLink(correspondingLink);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // ===================================================================
    // EVENT LISTENER UNTUK KLIK PADA MENU DESKTOP
    // ===================================================================
    if (navMenu) {
        navMenu.addEventListener('click', (event) => {
            const clickedLink = event.target.closest('a');
            if (!clickedLink) return;

            event.preventDefault();
            const targetId = clickedLink.getAttribute('href');
            smoothScrollTo(targetId, 800);
        });
    }

    // ===================================================================
    // EVENT LISTENER BARU UNTUK KLIK PADA MENU MOBILE (HAMBURGER)
    // ===================================================================
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (event) => {
            const clickedLink = event.target.closest('a');
            if (!clickedLink) return; // Abaikan jika yang diklik bukan link

            event.preventDefault();
            const targetId = clickedLink.getAttribute('href');

            // Lakukan smooth scroll
            smoothScrollTo(targetId, 800);

            // Tutup menu hamburger setelah link diklik
            mobileMenu.classList.add('hidden');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.getElementById('carousel-viewport');
    const track = document.getElementById('carousel-track');
    if (!track) return; // Exit if the track isn't found

    let items = Array.from(track.children);
    const originalItemCount = items.length;
    let currentIndex = 0;
    let slideInterval;

    // --- Carousel Configuration ---
    const slideDuration = 3000; // Time in ms for each slide to be visible
    const transitionDuration = 600; // Must match the CSS transition duration in ms

    // --- Setup Function ---
    function setupCarousel() {
        // 1. Clone items for the infinite loop illusion
        const itemsToClone = items.slice(0, Math.min(originalItemCount, 4)); // Clone up to 4 items
        itemsToClone.forEach(item => {
            track.appendChild(item.cloneNode(true));
        });

        // Re-select items to include the new clones
        items = Array.from(track.children);
    }

    // --- Core Slide Logic ---
    function advanceSlide() {
        currentIndex++;

        // Enable transition for the slide
        track.style.transition = `transform ${transitionDuration / 1000}s ease-in-out`;

        // Calculate the new position
        const itemWidth = items[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        // Check if we've reached the end (the start of the cloned items)
        if (currentIndex >= originalItemCount) {
            // After the transition finishes, reset to the beginning silently
            setTimeout(() => {
                track.style.transition = 'none'; // Disable transition for the jump
                currentIndex = 0; // Reset index
                track.style.transform = `translateX(0px)`;
            }, transitionDuration);
        }
    }

    // --- Auto-play and Event Handling ---
    function startAutoPlay() {
        // Clear any existing interval to prevent duplicates
        clearInterval(slideInterval);
        slideInterval = setInterval(advanceSlide, slideDuration);
    }

    function stopAutoPlay() {
        clearInterval(slideInterval);
    }

    // Initialize the carousel
    setupCarousel();
    startAutoPlay();

    // Pause on hover for better user experience
    viewport.addEventListener('mouseenter', stopAutoPlay);
    viewport.addEventListener('mouseleave', startAutoPlay);
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.card-container');
    if (!container || container.children.length <= 3) return;

    // --- State & Konfigurasi ---
    let isMoving = false;
    const autoPlayInterval = 3000;
    const transitionDuration = 500; // Pastikan ini cocok dengan transisi di CSS Anda
    let autoPlayTimer;

    let slideWidth = 0; // Didefinisikan secara global untuk diakses di mana saja

    // --- Fungsi Inti ---

    const calculateSlideWidth = () => {
        if (container.children.length > 0) {
            const cardWidth = container.children[0].offsetWidth;
            const gap = parseFloat(getComputedStyle(container).gap) || 0;
            slideWidth = cardWidth + gap;
        }
    };

    const moveCarousel = (direction) => {
        if (isMoving || slideWidth === 0) return;
        isMoving = true;

        // Animasikan pergerakan
        container.style.transition = `transform ${transitionDuration}ms ease-in-out`;
        const transformValue = direction === 'next' ? -2 * slideWidth : 0;
        container.style.transform = `translateX(${transformValue}px)`;

        // Setelah animasi selesai, atur ulang posisi kartu secara diam-diam
        setTimeout(() => {
            if (direction === 'next') {
                // Ambil kartu pertama (buffer lama) dan pindahkan ke akhir
                container.appendChild(container.firstElementChild);
            } else { // 'prev'
                // Ambil kartu terakhir dan pindahkan ke awal sebagai buffer baru
                container.insertBefore(container.lastElementChild, container.firstElementChild);
            }

            // Reset posisi ke state awal tanpa animasi
            container.style.transition = 'none';
            container.style.transform = `translateX(-${slideWidth}px)`;
            container.offsetHeight; // Paksa browser me-render ulang

            updateHighlights();
            isMoving = false;
        }, transitionDuration);
    };

    // FUNGSI INI SEKARANG MENARGETKAN INDEKS 1 DENGAN BENAR
    const updateHighlights = () => {
        const allCards = Array.from(container.children);
        allCards.forEach((card, i) => {
            // Dengan 1 buffer di kiri, kartu tengah secara visual adalah elemen ke-2 (indeks 1)
            if (i === 3) {
                card.classList.add('is-center');
            } else {
                card.classList.remove('is-center');
            }
        });
    };

    const setupInitialState = () => {
        // Pindahkan HANYA SATU elemen terakhir ke depan sebagai buffer
        container.insertBefore(container.lastElementChild, container.firstElementChild);

        calculateSlideWidth();

        // Posisikan container sehingga kartu kedua (indeks 1) berada di tengah
        container.style.transition = 'none';
        container.style.transform = `translateX(-${slideWidth}px)`;

        // Beri highlight pada kartu tengah saat pertama kali dimuat
        updateHighlights();
    };

    // --- Otomatisasi & Interaksi Pengguna ---

    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayTimer = setInterval(() => moveCarousel('next'), autoPlayInterval);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayTimer);
    };

    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    // Handler untuk resize window yang lebih aman tanpa reload
    window.addEventListener('resize', () => {
        stopAutoPlay();
        // Atur ulang state agar kalkulasi lebar kartu menjadi akurat kembali
        setupInitialState();
        startAutoPlay();
    });

    // --- Mulai Carousel ---
    setupInitialState();
    startAutoPlay();
});

document.addEventListener("DOMContentLoaded", function () {
    // Opsi untuk Intersection Observer
    // threshold: 0.15 berarti animasi akan terpicu saat 15% dari elemen terlihat
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // Fungsi callback yang akan dijalankan saat elemen masuk/keluar viewport
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            // Cek apakah elemen masuk ke dalam viewport
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationName = element.getAttribute('data-animasi');

                // 1. Tampilkan elemen kembali (ubah opacity jadi 1)
                element.style.opacity = '1';

                // 2. Tambahkan kelas animasi dari Animate.css
                element.classList.add('animate__animated', animationName);

                // 3. Hentikan pengamatan pada elemen ini agar animasi tidak berulang
                observer.unobserve(element);
            }
        });
    };

    // Buat observer baru
    const observer = new IntersectionObserver(callback, options);

    // Pilih semua elemen yang ingin dianimasikan dan mulai amati
    const elementsToAnimate = document.querySelectorAll('.elemen-animasi');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});
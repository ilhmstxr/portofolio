document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling untuk tautan navigasi
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Kalkulasi posisi target dengan offset header
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Tambahkan efek animasi saat scroll (opsional)
    const sections = document.querySelectorAll('.section-full');

    const revealSection = function(entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        
        // Hentikan observasi setelah animasi berjalan sekali
        observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.1,
    });

    sections.forEach(function(section) {
        // Inisialisasi state awal untuk animasi
        section.style.opacity = 0;
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        sectionObserver.observe(section);
    });


    // ==================== SKILLS SLIDER LOGIC ====================
    const slider = document.querySelector('.skills-slider');
    const cards = document.querySelectorAll('.skill-card');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    let currentIndex = 0;
    const totalCards = cards.length;

    function updateSliderPosition() {
        if (slider) { // Pastikan slider ada sebelum memanipulasi
            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
        }
    }

    if (nextArrow && prevArrow) { // Pastikan tombol panah ada
        nextArrow.addEventListener('click', () => {
            if (currentIndex < totalCards - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Kembali ke awal
            }
            updateSliderPosition();
        });

        prevArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalCards - 1; // Pindah ke akhir
            }
            updateSliderPosition();
        });
    }
    
    // Inisialisasi posisi slider
    updateSliderPosition();
});

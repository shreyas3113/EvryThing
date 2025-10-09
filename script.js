document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(document.querySelectorAll('.feature-card'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;
    let cardsToShow = 3;

    function updateCardsToShow() {
        if (window.innerWidth <= 600) {
            cardsToShow = 1;
        } else if (window.innerWidth <= 900) {
            cardsToShow = 2;
        } else {
            cardsToShow = 3;
        }
    }

    function updateCarousel() {
        const wrapper = document.querySelector('.carousel-track-wrapper');
        const gap = 32; // must match CSS gap
        const cardWidth = cards[0].offsetWidth;
        const visibleWidth = wrapper.clientWidth;
        const totalWidth = track.scrollWidth; // total width of all cards + gaps

        // Compute maximum translate so last card is fully visible
        const maxTranslate = Math.max(0, totalWidth - visibleWidth);

        // Desired translate based on index (approx)
        let desiredTranslate = currentIndex * (cardWidth + gap);

        // Clamp desiredTranslate to [0, maxTranslate]
        desiredTranslate = Math.max(0, Math.min(desiredTranslate, maxTranslate));

        track.style.transform = `translateX(-${desiredTranslate}px)`;

        // Disable/enable buttons at ends
        prevBtn.disabled = desiredTranslate === 0;
        nextBtn.disabled = desiredTranslate === maxTranslate;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    nextBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, cards.length - cardsToShow);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    window.addEventListener('resize', () => {
        updateCardsToShow();
        updateCarousel();
    });

    updateCardsToShow();
    updateCarousel();

    // "Buy Now" button functionality
    const buyButton = document.getElementById('buy-button');
    if (buyButton) {
        buyButton.addEventListener('click', () => {
            alert('Thank you for your interest! Pre-orders will be available soon.');
        });
    }
});

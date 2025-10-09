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

    // "Buy Now" button functionality
    const buyButton = document.getElementById('buy-button');
    if (buyButton) {
        buyButton.addEventListener('click', () => {
            alert('Thank you for your interest! Pre-orders will be available soon.');
        });
    }

    // Feature slider
    const slider = document.querySelector('.feature-slider');
    if (slider) {
        const slidesContainer = slider.querySelector('.slides');
        let slides = Array.from(slidesContainer.children); // use all slides
        const dotsNode = slider.querySelector('.slider-dots');
        let current = 0;
        let autoplayInterval = null;
    const slidesWrapper = slider.querySelector('.slides-wrapper');
    let slideWidth = slidesWrapper.clientWidth; // one slide fills wrapper

        // create dots (rebuild if already present)
        dotsNode.innerHTML = '';
        slides.forEach((s, i) => {
            const b = document.createElement('button');
            b.setAttribute('aria-label', `Go to slide ${i+1}`);
            b.addEventListener('click', () => goTo(i));
            dotsNode.appendChild(b);
        });

        let dots = Array.from(dotsNode.children);

        function update() {
            slidesContainer.style.transform = `translateX(-${current * slideWidth}px)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        function recalc() {
            slides = Array.from(slidesContainer.children);
            slideWidth = slidesWrapper.clientWidth;
            // rebuild dots in case slide count changed
            dotsNode.innerHTML = '';
            slides.forEach((s, i) => {
                const b = document.createElement('button');
                b.setAttribute('aria-label', `Go to slide ${i+1}`);
                b.addEventListener('click', () => goTo(i));
                dotsNode.appendChild(b);
            });
            dots = Array.from(dotsNode.children);
            update();
        }

    function goTo(i) { current = i % slides.length; update(); }

    // autoplay only
    function next() { current = (current + 1) % slides.length; update(); }
    function startAutoplay() { autoplayInterval = setInterval(next, 3500); }
        function stopAutoplay() { clearInterval(autoplayInterval); autoplayInterval = null; }


    slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('focusin', stopAutoplay);
        slider.addEventListener('mouseleave', () => { if (!autoplayInterval) startAutoplay(); });

        // keyboard support (left/right still allowed for accessibility)
        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { current = (current - 1 + slides.length) % slides.length; update(); }
            if (e.key === 'ArrowRight') { next(); }
        });

        // initialize
        update();
        startAutoplay();

        // recalc on resize
        window.addEventListener('resize', () => {
            recalc();
        });
    }
});

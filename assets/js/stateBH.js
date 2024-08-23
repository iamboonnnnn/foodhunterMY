document.querySelectorAll('.food-info-card').forEach(card => {
    let slides = card.querySelectorAll('.slide');
    let currentSlide = 0;

    const showSlide = (index) => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    card.querySelector('.prev').addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    card.querySelector('.next').addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Initialize the first slide as active
    slides[currentSlide].classList.add('active');
});

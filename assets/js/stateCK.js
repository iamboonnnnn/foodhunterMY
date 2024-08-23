document.addEventListener('DOMContentLoaded', () => {
    const foodImages = document.querySelectorAll('.food-image');
    const menuText = document.getElementById('menu-text');
    const navLinks = document.querySelector('.nav-links');
    const modal = document.getElementById('foodModal');
    const modalTitle = document.getElementById('foodModalLabel');
    const modalImage = document.getElementById('foodModalImage');
    const modalDescription = document.getElementById('foodModalDescription');
    const embedMapContainer = document.getElementById('embedMapContainer');
    const stars = document.querySelectorAll('.star');
    const ratingMessage = document.getElementById('rating-message');
    const savedRating = localStorage.getItem('DesignRating');

    // Function to check and apply clicked state
    function applyClickedState() {
        foodImages.forEach(image => {
            const foodId = image.getAttribute('data-id');
            if (sessionStorage.getItem(foodId) === "true") {
                image.classList.add('clicked');
            }
        });
    }

    // Function to handle image clicks
    function handleImageClick(event) {
        const foodId = event.target.getAttribute('data-id');
        sessionStorage.setItem(foodId, "true");  // Store the click info in sessionStorage
        event.target.classList.add('clicked');
    }

    // Apply clicked state on page load
    applyClickedState();

    // Attach click event to each food image
    foodImages.forEach(image => {
        image.addEventListener('click', handleImageClick);
    });

    // Rate website
    if (savedRating) {
        highlightStars(savedRating);
        ratingMessage.textContent = `You rated this website ${savedRating} out of 5 stars.`;
    }

    stars.forEach(star => {
        star.addEventListener('click', function () {
            const rating = this.getAttribute('data-value');
            localStorage.setItem('DesignRating', rating);
            highlightStars(rating);
            ratingMessage.textContent = `You rated this website ${rating} out of 5 stars.`;
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    // Function to handle showing the modal with the correct content
    function showModal(title, imageSrc, description, mapSrc) {
        modalTitle.textContent = title;
        modalImage.src = imageSrc;
        modalDescription.textContent = description;
        embedMapContainer.innerHTML = `<iframe src="${mapSrc}" frameborder="0" style="border:0; width:90%; height:500px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
        $(modal).modal('show');
    }

    // Update modal content dynamically including the embedded map
    document.querySelectorAll('.food-image').forEach(item => {
        item.addEventListener('click', function () {
            const foodTitle = this.dataset.title;
            const foodDescription = this.dataset.description;
            const foodImageSrc = this.src;
            const foodMapEmbed = this.dataset.map; // Get the map URL

            showModal(foodTitle, foodImageSrc, foodDescription, foodMapEmbed);
        });
    });

    // Add scroll to food section functionality
    document.querySelector('.hero').addEventListener('click', () => {
        document.getElementById('food-section').scrollIntoView({ behavior: 'smooth' });
    });

    // Scroll to top button functionality
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    // Toggle menu visibility
    menuText.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });
});

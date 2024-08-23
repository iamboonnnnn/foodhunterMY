document.addEventListener('DOMContentLoaded', function () {
    // Handle navbar toggle
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-text');
    menuToggle.addEventListener('click', function () {
        navbar.classList.toggle('active'); // Toggle the active class
    });

    // Handle scroll-to-top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 1) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Handle form submission
    document.getElementById('subscribeForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the email value
        var email = document.getElementById('emailInput').value;

        // Store the email in local storage
        localStorage.setItem('userEmail', email);

        // Store the email in session storage
        sessionStorage.setItem('userEmail', email);

        // Store the email in cookies
        document.cookie = "userEmail=" + encodeURIComponent(email) + "; path=/; max-age=" + (60 * 60 * 24 * 30); // 30 days expiry
        alert('Thank you for subscribing! Your email has been saved.');

        // Disable the input field and change the button text and color
        var subscribeButton = document.querySelector('#subscribeForm button');
        document.getElementById('emailInput').disabled = true;
        subscribeButton.textContent = 'Subscribed';
        subscribeButton.classList.add('subscribed');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Check if the user has already accepted cookies
    if (!getCookie('cookieConsent')) {
        // Show the cookie consent banner
        document.getElementById('cookieConsentBanner').style.display = 'block';
    }

    // Handle the accept cookies button click
    document.getElementById('acceptCookies').addEventListener('click', function() {
        // Set a cookie to remember the user's consent
        setCookie('cookieConsent', 'true', 365); // Cookie expires in 365 days
        // Hide the cookie consent banner
        document.getElementById('cookieConsentBanner').style.display = 'none';
    });
});

// Utility function to set a cookie
function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Utility function to get a cookie value
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

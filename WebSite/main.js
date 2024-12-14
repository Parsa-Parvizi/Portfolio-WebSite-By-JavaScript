$(document).ready(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= 600 && !$('nav').hasClass('sticky')) {
            $('nav').addClass('sticky');
        }
        else if ($(window).scrollTop() < 600 && $('nav').hasClass('sticky')) {
            $('nav').removeClass('sticky')
        }
    });
});

$('a.nav-link').on('click', function (event) {
    event.preventDefault();
    const target = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 800);
});

$('.carousel').carousel({
    interval: 3000 // Change slide every 3 seconds
});

$('#contactForm').on('submit', function (event) {
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'submit_form.php',
        data: $(this).serialize(),
        success: function (response) {
            alert('Message sent successfully!');
            $('#contactPopup').modal('hide');
        },
        error: function () {
            alert('There was an error sending your message.');
        }
    });
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
});

$('body').scrollspy({ target: '#mainNav' });

$('.navbar-toggler').on('click', function () {
    $('#mainNav').collapse('toggle');
});

$(document).on('submit', 'form', function () {
    $('#loadingSpinner').show(); // Show loading spinner
});

$('#themeToggle').on('click', function () {
    $('body').toggleClass('dark-mode');
});



function validateContactForm() {
    let isValid = true;

    // Clear previous error messages
    document.getElementById("contactName-error").textContent = "";
    document.getElementById("contactEmail-error").textContent = "";
    document.getElementById("contactMessage-error").textContent = "";

    // Get form values
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    // Validate name
    if (name === "") {
        document.getElementById("contactName-error").textContent = "Please enter your name.";
        isValid = false;
    }

    // Validate email
    if (email === "" || !email.includes("@")) {
        document.getElementById("contactEmail-error").textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Validate message
    if (message === "") {
        document.getElementById("contactMessage-error").textContent = "Please enter your message.";
        isValid = false;
    }

    return isValid;
}

$(document).ready(function () {
    let currentIndex = 0;
    const items = $('.carousel-item');
    const totalItems = items.length;

    function showNext() {
        currentIndex = (currentIndex + 1) % totalItems; // Move to the next index
        updateCarousel();
    }

    function updateCarousel() {
        items.each(function (index) {
            const offset = (index - currentIndex) * 100; // Adjust the offset
            $(this).css('transform', 'translateX(' + offset + '%)');
        });
    }

    // Auto slide every 3 seconds
    setInterval(showNext, 3000); // Change slide every 3 seconds

    // Initialize the carousel
    updateCarousel();
});
// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // Mobile Navigation Menu
    // ============================
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    if (hamburger && mobileMenu) {

        function toggleMenu() {
            mobileMenu.classList.toggle("open");

            const expanded = hamburger.getAttribute("aria-expanded") === "true";
            hamburger.setAttribute("aria-expanded", !expanded);
        }

        hamburger.addEventListener("click", toggleMenu);

        hamburger.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleMenu();
            }
        });

        // Close menu when Escape is pressed
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                mobileMenu.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
            }
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (
                !mobileMenu.contains(event.target) &&
                !hamburger.contains(event.target)
            ) {
                mobileMenu.classList.remove("open");
                hamburger.setAttribute("aria-expanded", "false");
            }
        });

        // Make function available for HTML onclick=""
        window.closeMobile = function () {
            mobileMenu.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
        };
    }

    // ============================
    // Fade-in Animation
    // ============================
    const fadeElements = document.querySelectorAll(".fade-in");

    if (fadeElements.length > 0) {

        const observer = new IntersectionObserver((entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.15
        });

        fadeElements.forEach((element) => {
            observer.observe(element);
        });
    }

    // ============================
    // Contact Form
    // ============================
    window.handleSend = function () {

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("msg");
        const status = document.getElementById("send-status");

        if (!nameInput || !emailInput || !messageInput || !status) {
            console.error("Contact form elements not found.");
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Empty validation
        if (!name || !email || !message) {

            status.textContent = "Please fill in all the fields.";
            status.style.color = "#f09595";

            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            status.textContent = "Please enter a valid email address.";
            status.style.color = "#f09595";

            return;
        }

        // Create mailto link
        const subject = `Portfolio message from ${name}`;

        const body =
`Name: ${name}

Email: ${email}

Message:
${message}`;

        const mailtoLink =
`mailto:b2399322@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        status.textContent = "✓ Opening your mail application...";
        status.style.color = "#52b788";

        // Clear the form
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
    };

});

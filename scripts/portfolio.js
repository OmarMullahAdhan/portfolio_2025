    // --- 1. Dark Mode Logic ---
        const toggleBtn = document.getElementById('theme-toggle');
        const sunIcon = document.getElementById('icon-sun');
        const moonIcon = document.getElementById('icon-moon');
        const htmlElement = document.documentElement;

        // Check for saved user preference, if any, on load
        const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

        if (currentTheme) {
            htmlElement.setAttribute('data-theme', currentTheme);
            updateIcons(currentTheme);
        }

        toggleBtn.addEventListener('click', function() {
            if (htmlElement.getAttribute('data-theme') === 'dark') {
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                updateIcons('light');
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateIcons('dark');
            }
        });

        function updateIcons(theme) {
            if (theme === 'dark') {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        }

        // --- 2. Scroll Animation (Intersection Observer) ---
        const observerOptions = {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: "0px 0px -50px 0px" // Offset slightly so it triggers before bottom
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
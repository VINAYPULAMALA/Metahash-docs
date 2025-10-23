// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;
const loadingOverlay = document.getElementById('loadingOverlay');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    // Update icon and save preference
    if (body.classList.contains('dark-theme')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Page Navigation
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const setupCards = document.querySelectorAll('.setup-card');
const pages = document.querySelectorAll('.page');

// Function to show a specific page
function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show the selected page
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        // Default to home page
        document.getElementById('page-home').classList.add('active');
    }

    // Update active state in sidebar
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });

    // Update URL hash without scrolling
    if (pageId !== 'home') {
        history.pushState(null, null, `#${pageId}`);
    } else {
        history.pushState(null, null, window.location.pathname);
    }

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sidebar link click handlers
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        showPage(pageId);
    });
});

// Setup card click handlers
setupCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = card.getAttribute('data-page');
        showPage(pageId);
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1); // Remove the '#'
    if (hash) {
        showPage(hash);
    } else {
        showPage('home');
    }
});

// Handle initial page load with hash
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showPage(hash);
    } else {
        showPage('home');
    }

    initializeErrorSearch();

    setTimeout(() => {
        hideLoadingOverlay();
    }, 3000);
});

// Handle logo click to go home
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    showPage('home');
});

// Handle home nav link
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.querySelector('.icon')?.textContent === '🏠') {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('home');
        });
    }
});

// Mobile menu toggle (for responsive design)
let menuButton = null;

function createMobileMenu() {
    if (window.innerWidth <= 768 && !menuButton) {
        menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = `
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 1001;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            font-size: 1.5rem;
            cursor: pointer;
            display: block;
        `;

        document.body.appendChild(menuButton);

        menuButton.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('open');
            menuButton.innerHTML = sidebar.classList.contains('open') ? '✕' : '☰';
        });

        // Close sidebar when clicking on a link
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    const sidebar = document.querySelector('.sidebar');
                    sidebar.classList.remove('open');
                    menuButton.innerHTML = '☰';
                }
            });
        });
    } else if (window.innerWidth > 768 && menuButton) {
        menuButton.remove();
        menuButton = null;
        document.querySelector('.sidebar').classList.remove('open');
    }
}

// Check on load and resize
createMobileMenu();
window.addEventListener('resize', createMobileMenu);

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const pageId = href.substring(1);
            // Check if it's a page navigation
            if (document.getElementById(`page-${pageId}`)) {
                e.preventDefault();
                showPage(pageId);
            }
        }
    });
});

// Add copy button to code blocks
document.querySelectorAll('pre code').forEach((codeBlock) => {
    const pre = codeBlock.parentElement;
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: var(--primary-green);
        color: white;
        border: none;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.8rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s ease;
    `;

    pre.style.position = 'relative';
    pre.appendChild(button);

    pre.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
    });

    pre.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
    });

    button.addEventListener('click', async () => {
        const code = codeBlock.textContent;
        try {
            await navigator.clipboard.writeText(code);
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        } catch (err) {
            button.textContent = 'Failed';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        }
    });
});

console.log('MetaHash Documentation loaded successfully!');

function initializeErrorSearch() {
    const searchInput = document.getElementById('errorSearchInput');
    const errorEntries = document.querySelectorAll('.error-entry');

    if (!searchInput || !errorEntries.length) {
        return;
    }

    const filterErrors = () => {
        const term = searchInput.value.trim().toLowerCase();

        errorEntries.forEach(entry => {
            const keywords = (entry.getAttribute('data-tags') || '').toLowerCase();
            const bodyText = entry.textContent.toLowerCase();
            const match = !term || keywords.includes(term) || bodyText.includes(term);
            entry.style.display = match ? '' : 'none';
        });
    };

    searchInput.addEventListener('input', filterErrors);
    filterErrors();
}

function hideLoadingOverlay() {
    if (!loadingOverlay || loadingOverlay.classList.contains('hidden')) {
        return;
    }

    loadingOverlay.classList.add('hidden');

    setTimeout(() => {
        if (loadingOverlay && loadingOverlay.parentElement) {
            loadingOverlay.parentElement.removeChild(loadingOverlay);
        }
    }, 500);
}

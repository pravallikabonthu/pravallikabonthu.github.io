
document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");

    // Check if dark mode preference is stored in sessionStorage
    const isDarkMode = sessionStorage.getItem("darkMode");

    // Function to toggle between dark and light themes
    function toggleTheme() {
        document.body.classList.toggle("dark");
        
        // Update the theme preference in sessionStorage
        const isDarkMode = document.body.classList.contains("dark");
        sessionStorage.setItem("darkMode", isDarkMode);
        
        // Update the text of the theme toggle button
        if (isDarkMode) {
            themeToggle.textContent = "Light Theme";
        } else {
            themeToggle.textContent = "Dark Theme";
        }
    }

    // If dark mode preference is stored, apply it
    if (isDarkMode === "true") {
        document.body.classList.add("dark");
        themeToggle.textContent = "Light Theme";
    } else {
        themeToggle.textContent = "Dark Theme";
    }

    // Add onclick event listener to theme toggle button
    themeToggle.addEventListener("click", toggleTheme);
});

// document.getElementById("ham-icon").addEventListener("click", function() {
//     var element = document.getElementById("ham-menu");
//     element.classList.toggle("open-ham-menu");
// });

function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }

// function toggleThe() {
//     document.body.classList.toggle('dark-theme');
// }
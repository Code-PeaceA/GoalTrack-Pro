
// Nav - bottom shadow when scrolling
// Select the navigation element
const nav = document.querySelector('#nav');

// Function to handle scroll event
function handleScroll() {
    if (window.scrollY > 10) {
        nav.classList.add('floatingNav');
    } else {
        nav.classList.remove('floatingNav');
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);
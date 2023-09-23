
function isMobile() {

    const mobileKeywords = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone'];
    const userAgent = navigator.userAgent;

    for (const keyword of mobileKeywords) {
        if (userAgent.includes(keyword)) {
            return true;
        }
    }

    return false;
}


const gridElements = document.querySelectorAll('.grid-item');

if (isMobile()) {
    gridElements.forEach((elem) => {
        elem.style.color = 'white';
    });
} else {
    gridElements.forEach((elem) => {
        elem.addEventListener('mouseover', () => elem.style.color = 'white');
        elem.addEventListener('mouseout', () => elem.style.color = 'rgba(255, 255, 255, 0.25)');
    });
}

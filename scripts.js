
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


const contents = document.querySelectorAll('.project-content');
const tlineYears = document.querySelectorAll('.timeline-year');

function changeOpacityOnScroll() {
    const scrollDistance = window.scrollY;

    for (let i = 0; i < contents.length; i++) {
        const contentElem = contents[i];
        const tlElem = tlineYears[i];

        const contentDivTop = contentElem.offsetTop;
        const opacity = 3 - Math.abs(scrollDistance + contentElem.scrollHeight - contentDivTop) / 200;

        contentElem.style.opacity = opacity;
        tlElem.style.opacity = opacity;
    }
}

window.addEventListener('scroll', changeOpacityOnScroll);
changeOpacityOnScroll();
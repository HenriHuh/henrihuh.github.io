
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

    for (const cont of contents) {
        const divTop = cont.offsetTop;
        const opacity = 3 - Math.abs(scrollDistance + cont.clientHeight / 2 - divTop) / 200;
        cont.style.opacity = opacity;
    }

    for (const tl of tlineYears) {
        const divTop = tl.offsetTop;
        const opacity = 3 - Math.abs(scrollDistance + tl.clientHeight / 2 - divTop) / 200;
        tl.style.opacity = opacity;
    }

}

window.addEventListener('scroll', changeOpacityOnScroll);
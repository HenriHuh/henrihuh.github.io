
// Hover highlight
var currentInfoIndex = 0;

const triggerElements = document.querySelectorAll('.trigger-element');
const proficiencyTabs = document.querySelectorAll('.proficiency-content');
const proficiencyTitle = document.querySelector('.proficiency-title');

triggerElements.forEach((triggerElement, index) => {

    triggerElement.addEventListener('mouseover', () => highlightTarget(triggerElement, index));

});

highlightTarget(triggerElements[0], 0);

function highlightTarget(triggerElement, index) {
    triggerElements.forEach(triggerElementToHide => {
        triggerElementToHide.style.color = 'rgba(255, 255, 255, 0.35)';
        triggerElementToHide.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    });

    proficiencyTabs.forEach(proficiencyTabToHide => {
        proficiencyTabToHide.style.opacity = 0;
        proficiencyTabToHide.style.pointerEvents = 'none';
    });

    triggerElement.style.color = 'white';
    triggerElement.style.backgroundColor = 'rgba(255, 255, 255, 0.35)';

    // HERE STUFF

    currentInfoIndex = index;

    if (proficiencyTabs.length > index) {
        proficiencyTabs[index].style.display = 'block';
        setTimeout(() => {
            proficiencyTabs[index].style.opacity = 1;
            proficiencyTabs[index].style.pointerEvents = 'auto';
        });
        proficiencyTitle.innerHTML = triggerElement.innerHTML;
    }
}

// Pointers
const timelineNodes = document.querySelectorAll('.timeline-node');
const pointers = document.querySelectorAll('.pointer');
const proficiencyLineX = document.querySelector('.proficiency-lineX');
const proficiencyLineY = document.querySelector('.proficiency-lineY');
const proficiencyLineYNotch = document.querySelector('.proficiency-lineY-notch');
const proficiencyLineTarget = document.querySelector('.proficiency-title');
const projectContents = document.querySelectorAll('.project-content');
const connectingLineVert = document.querySelector('.connecting-line-vertical');

// If scrolling the page, the pointers will be fucked up
function initPointerPositions() {

    for (var i = 0; i < pointers.length; i++) {
        const referenceRect = timelineNodes[i].getBoundingClientRect();

        // Apply the position to the movable element
        pointers[i].style.position = 'absolute';
        pointers[i].style.top = `${referenceRect.top}px`;
        pointers[i].style.left = `${referenceRect.left}px`;
        pointers[i].style.transform = 'translateX(12px)';
        pointers[i].style.transform = 'translate3D(14px, -24px, 0)';
    }

    connectingLineVert.style.top = `${timelineNodes[0].getBoundingClientRect().bottom}px`;

}


function setTimelinePointers(index, ...args) {

    pointers.forEach(p => {
        p.style.opacity = 0;
    });

    for (var i = 0; i < args.length; i++) {
        const referenceRect = timelineNodes[args[i]].getBoundingClientRect();

        ////Apply the position to the movable element
        //pointers[args[i]].style.position = 'absolute';
        //pointers[args[i]].style.top = `${referenceRect.top}px`;
        pointers[args[i]].style.left = `${referenceRect.left}px`;
        //pointers[args[i]].style.transform = 'translateX(12px)';
        //pointers[args[i]].style.transform = 'translate3D(14px, -24px, 0)';

        pointers[args[i]].style.opacity = 1;
    }

    if (args.length > 0) {
        showProficiencyLineX(timelineNodes[args[0]], proficiencyLineTarget, proficiencyLineX);
        showProficiencyLineY(triggerElements[index], proficiencyLineX, proficiencyLineY);
    } else {
        hideProficiencyLines();
    }
}

function showProficiencyLineX(fromElement, toElement, line) {

    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();

    line.style.opacity = 1;
    var leftpoint = fromRect.left + fromRect.width / 2 - 2;
    //line.style.width = `${Math.abs(leftpoint - toRect.left)}px`;
    line.style.left = `${leftpoint}px`;
    line.style.right = `${toRect.left + 20}px`;

}


function showProficiencyLineY(fromElement, toElement, line) {
    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();

    line.style.opacity = 1;
    line.style.height = `${Math.abs(fromRect.top - toRect.bottom + 20)}px`;
    line.style.top = `${fromRect.top + 20}px`;
    line.style.bottom = `${toRect.bottom - 20}px`;
    line.style.transform = 'translateX(-26px)';

    proficiencyLineYNotch.style.opacity = 1;
    proficiencyLineYNotch.style.top = `${fromRect.top + 20}px`;
    proficiencyLineYNotch.style.transform = 'translateX(-24px)';

}

function hideProficiencyLines() {
    proficiencyLineX.style.opacity = 0;
    proficiencyLineY.style.opacity = 0;
    proficiencyLineYNotch.style.opacity = 0;
}



initPointerPositions();
setTimelinePointers(0, 0, 1, 2, 3, 4, 5, 6);


// Timeline animation
const line = document.querySelector('.timeline-line');
const connectingLines = document.querySelectorAll('.connecting-line');

for (var i = 0; i < timelineNodes.length; i++) {
    const index = i;
    timelineNodes[index].addEventListener('click', () => { moveTimeline(index); clearInterval(intervalId); })
}

var currentTimelineIndex = 0;

function moveTimeline(index) {

    currentTimelineIndex = index;

    for (var i = 0; i < timelineNodes.length; i++) {
        if (i <= index) {
            timelineNodes[i].classList.add('highlighted');
        } else {
            timelineNodes[i].classList.remove('highlighted');
        }

        if (i != index) {
            timelineNodes[i].classList.remove('selected');
        } else {
            timelineNodes[i].classList.add('selected');
        }
    }

    hideConnectingLines();
    for (var i = 1; i <= index; i++) {
        
        showConnectingLine(timelineNodes[i - 1], timelineNodes[i], connectingLines[i - 1]);
    }

    // Project contents
    for (var i = 0; i < projectContents.length; i++) {
        if (i == index) {
            projectContents[i].style.opacity = 1;
            projectContents[i].style.pointerEvents = 'all';
        }
        else {
            projectContents[i].style.opacity = 0;
            projectContents[i].style.pointerEvents = 'none';
        }
    }

    showConnectingLineVert(timelineNodes[index], projectContents[index], connectingLineVert);
}

moveTimeline(0);

// Connecting line between items

// Function to show the connecting line
function showConnectingLine(fromElement, toElement, line) {
    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();

    line.style.opacity = 1;
    line.style.width = `${Math.abs(fromRect.right - toRect.left)}px`;
    line.style.left = `${fromRect.right}px`;
    line.style.right = `${Math.min(fromRect.right, toRect.left)}px`;

}

function showConnectingLineVert(fromElement, toElement, line) {
    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();

    line.style.opacity = 1;
    line.style.height = `${Math.abs(fromRect.bottom - toRect.top)}px`;
    line.style.left = `${fromRect.left + 20}px`;
}

// Function to hide the connecting line
function hideConnectingLines() {
    for (var i = 0; i < connectingLines.length; i++) {
        connectingLines[i].style.opacity = 0;
    }
}

// Intervals

function moveToNextPoint() {
    currentTimelineIndex++;
    if (currentTimelineIndex >= timelineNodes.length) {
        currentTimelineIndex = 0;
    }
    moveTimeline(currentTimelineIndex);
    timelineNodes[0].style.backgroundColor = white;
}

var intervalId = setInterval(moveToNextPoint, 5000);
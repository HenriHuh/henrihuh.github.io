const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach( tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })

        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})


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
        triggerElementToHide.style.backgroundColor = '#dddddd';
    });

    proficiencyTabs.forEach(proficiencyTabToHide => {
        proficiencyTabToHide.style.opacity = 0;
        proficiencyTabToHide.style.pointerEvents = 'none';
    });

    triggerElement.style.backgroundColor = '#f0f0f0';
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


// Get references to the elements and the connecting line
const element1 = document.getElementById('element1');
const element2 = document.getElementById('element2');
const connectingLine = document.getElementById('connectingLine');

// Add event listeners for mouseover and mouseout
element1.addEventListener('mouseover', () => showConnectingLine(element1, element2));
element1.addEventListener('mouseout', hideConnectingLine);


// Function to show the connecting line
function showConnectingLine(fromElement, toElement) {
    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();

    connectingLine.style.opacity = 1;
    connectingLine.style.height = `${Math.abs(fromRect.bottom - toRect.top)}px`;
    connectingLine.style.left = `${fromRect.left + fromRect.width / 2}px`;
    connectingLine.style.top = `${Math.min(fromRect.bottom, toRect.top)}px`;
}

// Function to hide the connecting line
function hideConnectingLine() {
    connectingLine.style.opacity = 0;
}
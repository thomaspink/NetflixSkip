//browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
//    console.log("Received response: ", response);
//});
//
//browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
//    console.log("Received request: ", request);
//});
//

const CLICKABLE_ELEMENTS = [
                            '.skip-credits a'
];
const MUTATION_TIMER_DELAY = 100;
const EL_BLOCK_CLICK_MARKER_ATTR = 'data-block-click';

/**
 * Tries to find a clickable element that is visible and returns it.
 * Returns `null` otherwise.
 */
function lookupClickableElement(selector) {
    const el = document.querySelector(selector);
    if (el && !el.hasAttribute(EL_BLOCK_CLICK_MARKER_ATTR)) {
        const style = window.getComputedStyle(el);
        if (style.display === 'none' && typeof el.click === 'function') {
            return el;
        }
    }
    return null;
}

/**
 * Tries to find a clickable element and clicks it
 * if possible and allowed.
 */
function lookupAndClickElement(selector) {
    const el = lookupClickableElement(selector);
    if (el) {
        el.setAttribute(EL_BLOCK_CLICK_MARKER_ATTR, 'true');
        el.click();
        setTimeout(() => {
            el.removeAttribute(EL_BLOCK_CLICK_MARKER_ATTR);
        }, 1000);
    }
}


let mutationTimer;
if ('MutationObserver' in window) {
    const observer = new MutationObserver(() => {
        clearTimeout(mutationTimer);
        mutationTimer = setTimeout(() => {
            for(let selector of CLICKABLE_ELEMENTS) {
                lookupAndClickElement(selector);
            }
        }, MUTATION_TIMER_DELAY);
    });
    observer.observe(document.body, { attributes: false, childList: true, subtree: true });
}

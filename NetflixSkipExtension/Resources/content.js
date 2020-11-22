//browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
//    console.log("Received response: ", response);
//});
//
//browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
//    console.log("Received request: ", request);
//});
//

const MUTATION_TIMER_DELAY = 100;
const SKIP_BUTTON_SELECTOR = '.skip-credits a';

function lookupAndClickSkipCredits() {
    const skipButton = document.querySelector(SKIP_BUTTON_SELECTOR);
    if (skipButton) {
        skipButton.click();
    }
}

let mutationTimer;
if ('MutationObserver' in window) {
    const observer = new MutationObserver(() => {
        clearTimeout(mutationTimer);
        mutationTimer = setTimeout(() => {
            lookupAndClickSkipCredits();
        }, MUTATION_TIMER_DELAY);
    });
    observer.observe(document.body, { attributes: false, childList: true, subtree: true });
}

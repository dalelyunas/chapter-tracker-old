// Get domain
// Send it to background
// matchers come back
// match the page
// send the result to background for saving

// Performs an eval to use the matcher function
const performMatch = matcherFunctionString => {
    if (matcherFunctionString === undefined) {
        return undefined;
    }
    return eval(matcherFunction)(getHostname(), document);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");

      if (request.type == "apply_matchers") {
        const matchers = request.matchers;
        sendResponse({
            type: 'matchers_result',
            bookTitle: performMatch(matchers.bookTitleMatcher),
            chapterNumber: performMatch(matchers.chapterNumberMatcher),
            hostname: window.location.hostname
        });
      }
    });







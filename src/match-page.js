// Get domain
// Send it to background
// matchers come back
// match the page
// send the result to background for saving

const getDomain = url => {
    var hostName = getHostName(url);
    var domain = hostName;
    
    if (hostName != null) {
        var parts = hostName.split('.').reverse();
        
        if (parts != null && parts.length > 1) {
            domain = parts[1] + '.' + parts[0];
                
            if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
              domain = parts[2] + '.' + domain;
            }
        }
    }
    return domain;
}

const port = chrome.runtime.connect({name:'match-page'});
port.onMessage.addListener((message, sender) => {
    if (message.greeting === 'hello') {
        alert(message.greeting);
    }
});
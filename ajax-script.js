(function () {
    var xhrOpen = window.XMLHttpRequest.prototype.open;
    var xhrSend = window.XMLHttpRequest.prototype.send;
    window.XMLHttpRequest.prototype.open = function () {
        this.method = arguments[0];
        this.url = arguments[1];
        return xhrOpen.apply(this, [].slice.call(arguments));
    };
    window.XMLHttpRequest.prototype.send = function () {
        var xhr = this;
        var xhrData = arguments[0];
        var intervalId = window.setInterval(function () {
            if (xhr.readyState != 4) {
                return;
            }
            const inExcludeList = window.ajrS && window.ajrS.length > 0 ? window.ajrS.filter(e => xhr.url.startsWith(e.url)).length > 0 : false;
            const inExcludeStringList = window.exStr && window.exStr.length > 0 ? window.exStr.filter(e => xhr.url.indexOf(e.excludedString) !== -1).length > 0 : false;
            if (!inExcludeList && !inExcludeStringList) {
                dataLayer.push({
                    'event': 'ajaxSuccess',
                    'ajaxInfo': {
                        'ajaxEventMethod': xhr.method,
                        'ajaxEventUrl': xhr.url,
                        'ajaxPostData': (xhr.method === 'POST' && xhrData ? xhrData : ''),
                        'ajaxEventLabel': (xhr.url.indexOf('widget=') !== -1) ? '' : xhr.responseText
                    }
                });
            }
            clearInterval(intervalId);
        }, 1);
        return xhrSend.apply(this, [].slice.call(arguments));
    };
    var originalFetch = window.fetch

    function onFetchStart() {
        if (arguments && arguments.length > 0) {
            const inExcludeList = window.ajrS && window.ajrS.length > 0 ? window.ajrS.filter(e => arguments[0].startsWith(e.url)).length > 0 : false;
            if (!inExcludeList) {
                dataLayer.push({
                    'event': 'ajaxSuccess',
                    'ajaxInfo': {
                        'ajaxEventMethod': arguments?.length > 1 ? arguments[1]?.method : 'get',
                        'ajaxEventUrl': arguments[0],
                        'ajaxPostData': arguments?.length > 1 ? arguments[1]?.body : '',
                        'ajaxEventLabel': ''
                    }
                });
            }
        }
    }

    function onFetchStop() {
        // console.log("fetch has loaded response", arguments)
    }
    window.fetch = function () {
        onFetchStart.apply(null, arguments)
        return originalFetch.apply(this, arguments).then(function (response) {
            onFetchStop.call(null, response);
            return response;
        })
    }
})();

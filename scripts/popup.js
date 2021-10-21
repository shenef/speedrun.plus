function time_ago(time) { //thx stackoverflow https://stackoverflow.com/a/12475270

    switch (typeof time) {
        case 'number':
            break;
        case 'string':
            time = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    var time_formats = [
        [60, 'seconds', 1],
        [120, '1 minute ago', '1 minute from now'],
        [3600, 'minutes', 60],
        [7200, '1 hour ago', '1 hour from now'],
        [86400, 'hours', 3600],
        [172800, '1 day ago', 'Tomorrow'],
        [604800, 'days', 86400],
        [1209600, '1 week ago', 'Next week'],
        [2419200, 'weeks', 604800],
        [4838400, 'Last month', 'Next month'],
        [29030400, 'months', 2419200],
        [58060800, 'Last year', 'Next year'],
        [2903040000, 'years', 29030400],
        [5806080000, 'Last century', 'Next century'],
        [58060800000, 'centuries', 2903040000]
    ];
    var seconds = (+new Date() - time) / 1000,
        token = 'ago',
        list_choice = 1;

    if (seconds == 0) {
        return 'Just now'
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
    }
    var i = 0,
        format;
    while (format = time_formats[i++])
        if (seconds < format[0]) {
            if (typeof format[2] == 'string')
                return format[list_choice];
            else
                return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    return time;
}



(async () => {
	const res = await fetch("https://www.speedrun.com/api/v1/notifications?max=20", {
		method: "GET",
		mode: 'cors',
		headers: {
			"X-API-Key": "",
		},
	}).then(res => res.json())

	for (i = 0; i < res.data.length; i++) {
        document.getElementById("SRCnotifications").innerHTML += `<a class="dropdown-item" href="${res.data[i].item.uri}">${res.data[i].text}<small class="text-muted">· <time class="short" datetime="${res.data[i].created}" title="${new Date(res.data[i].created)}">${time_ago(res.data[i].created)}</time></small></a>`
		document.getElementsByClassName("dropdown-item")[i].addEventListener("mouseup", function() {
			console.log("aa")
			chrome.tabs.create({ url: this.getAttribute("href")});
		})
		
	}
	document.getElementsByClassName("errorText")[0].remove()
})();

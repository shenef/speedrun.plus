// https://stackoverflow.com/a/12475270
function time_ago(time) {
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

	if (seconds == 0)
		return 'Just now';
	if (seconds < 0) {
		seconds = -seconds;
		token = 'from now';
		list_choice = 2;
	}
	var i = 0, format;
	while (format = time_formats[i++]) {
		if (seconds < format[0])
			return (typeof(format[2]) == 'string')
				? format[list_choice]
				: Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
	}
	return time;
}

chrome.storage.sync.get(["apiKey"], async (result) => {
	document.getElementById("SRPall").addEventListener("mouseup", () => {
		/* TODO, Add a show all button */
	})
	const res = await fetch("https://www.speedrun.com/api/v1/notifications?max=20", {
		headers: {
			"X-API-Key": result.apiKey
		},
	}).then(res => res.json())

	for (i = 0; i < res.data.length; i++) {
		document.getElementById("SRPnotifications").innerHTML += `<a class="dropdown-item" href="${res.data[i].item.uri}">${res.data[i].text}<small class="text-muted">· <time class="short" datetime="${res.data[i].created}" title="${new Date(res.data[i].created)}">${time_ago(res.data[i].created)}</time></small></a>`
		const element = document.getElementsByClassName("dropdown-item")[i]
		/*TODO, fix the opening of a new tab when clicked and added the alert class when it is unread*/
		if (res.data[i].status == "unread") {
			element.classList.add("alert")
		}
		element.addEventListener("mouseup", () => {
			console.log("a")
			chrome.tabs.create({ url: this.getAttribute("href") });
		})
	}
});

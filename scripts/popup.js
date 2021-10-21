const res = await fetch("https://www.speedrun.com/api/v1/notifications", {
	method: "GET",
	mode: 'cors',
	headers: {
		"X-API-Key": "",
	},
}).then(res => res.json())

for (i = 0; i < res.data.length; i++) {
	document.getElementById("SRCnotifications").innerHTML += `<a class="dropdown-item border-top pt-2 pb-2" href="${res.data[i].item.uri}">${res.data[i].text}<small class="text-muted">· <time class="short" datetime="${res.data[i].created}" title="${new Date(res.data[i].created)}">time agoo</time></small></a>`
}

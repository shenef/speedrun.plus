(async () => {
	var button = document.querySelector("#centerbar > div > div.panel > div.dropdown.float-right.ml-3 > ul").innerHTML += "<a class='dropdown-item adminlink'>View Markdown</a>";
	var isOn = false;
	var API = await fetch("https://www.speedrun.com/api/v1/runs/" + window.location.href.split('/')[5]);
	var { data } = await API.json();
	var description = document.querySelector("[title='Description from the player']");
	var original = description.innerHTML;
	document.querySelector("#centerbar > div > div.panel > div.dropdown.float-right.ml-3 > ul > a:nth-child(4)").addEventListener("click", function () {
		if (isOn == false) {
			isOn = true;
			description.innerText = data["comment"];
			return;
		}
		isOn = false;
		description.innerHTML = original;
	});
})();
var URL = window.location.href;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementsByClassName("maincontent")[0].insertAdjacentElement("afterbegin", xhttp.responseXML.getElementsByClassName("maincontent")[0])
	}
};

xhttp.responseType = "document";
xhttp.open("GET", URL.split('/')[4] + "/info", true);
xhttp.send();

// When the page has loaded
window.addEventListener("load", function () {
	// Change the Flag into a Div
	var OldP = document.querySelector("#profile-menu > div.profile-container > div.profile-info > div.profile-user-data > p")
	var ReplaceDiv = document.createElement("div");
	var index;
	while (OldP.firstChild) {
		ReplaceDiv.appendChild(OldP.firstChild);
	}
	for (index = OldP.attributes.length - 1; index >= 0; --index) {
		ReplaceDiv.attributes.setNamedItem(OldP.attributes[index].cloneNode());
	}
	OldP.parentElement.replaceChild(ReplaceDiv, OldP);

	// Add the number of runs
	var StrongNumberOfRuns = document.createElement("strong")
	StrongNumberOfRuns.innerHTML = "Verfied Runs:"
	document.getElementsByClassName("profile-user-data")[0].append(StrongNumberOfRuns)
	StrongNumberOfRuns.parentElement.append(" " + document.getElementsByClassName("linked height-minimal center-sm").length)
})
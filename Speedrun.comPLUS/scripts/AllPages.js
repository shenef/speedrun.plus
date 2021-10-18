// Vars
var URL = window.location.href.split('/')[3];
const userNames = document.getElementsByClassName("link-username nobr nounderline");
// Vars

// When the page has loaded
window.addEventListener("load", function () {
	//Add the followed games settings
	var followedGamesSettings = document.createElement("a");
	followedGamesSettings.className = "dropdown-item"
	followedGamesSettings.href = "#followedGamesList"
	followedGamesSettings.innerHTML += '<i class="fal fa-cog fa-margin"></i>Followed games order'
	document.querySelector("#navbar-main > ul > li.hidden-md-down.nav-item.dropdown > div > a:nth-child(1)").insertAdjacentElement("afterend", followedGamesSettings);
	// Creator's Icon
	for (i = 0; i < userNames.length; i++) {
		if (userNames[i].href == "https://www.speedrun.com/user/Yummy_Bacon5") {
			var icon = document.createElement("img");
			icon.className = "usericon";
			icon.src = "https://lh3.googleusercontent.com/0cDOOJjp8pUGDDFLqHFITEi35uMGZ5wHpZ9KTKridxk71kpR9MfeydpQqG5n8Mvetvkg5iVuZGeL2xMvxgBY_UL-T9p0x_Eo4EAh";
			icon.setAttribute("data-toggle", "tooltip");
			icon.setAttribute("data-placement", "top");
			icon.setAttribute("data-original-title", "Extension Developer");
			userNames[i].insertAdjacentElement("beforebegin", icon);
		}
	}
	// If it's a game
	if (document.getElementsByClassName("followbutton").length != 0) {
		//Add the Website's icon
		var globe = document.getElementsByClassName("fal fa-globe fa-margin")[0];
		if (globe != null) {
			var img = document.createElement("img");
			img.src = "https://www.google.com/s2/favicons?domain=" + globe.parentElement.href;
			img.className = "fal fa-globe fa-margin";
			globe.parentNode.replaceChild(img, globe);
		}
		//Change the date
		(async () => {
			var API = await fetch("https://www.speedrun.com/api/v1/games/" + URL);
			var {data} = await API.json();
			var releaseDate = data["release-date"].split('-')[2] + "." + data["release-date"].split('-')[1] + "." + data["release-date"].split('-')[0];
			var element = document.querySelector("#sidebar > div.panel > span").children;
			// Check if it's something else
			for (i = 2; i < element.length; i++) {
				if (element[i].innerHTML == data["released"]) {
					element[i].innerText = releaseDate;
				}
			}
		})();
	}
	//Stuff people won't see straight away
	
	var Footer = document.getElementById("footer"); // Footer
	Footer.innerHTML += "<br>Made by " + Name; // Footer
	var IconElement = document.createElement("i"); // Create list icon
	IconElement.className = "fal fa-book fa-margin";
	var listButton = document.createElement("a"); // Create list link
	listButton.className = "dropdown-item";
	listButton.href = "/rules";
	listButton.appendChild(IconElement);
	listButton.innerHTML += " Site Rules";
	document.querySelector("#navbar-main > ul > li:nth-child(4) > div > a:nth-child(8)").insertAdjacentElement("beforebegin", listButton);
	var creditsIconElement = document.createElement("img"); // Create list icon
	creditsIconElement.className = "fal fa-info-circle fa-margin";
	creditsIconElement.src = "/themes/user/Yummy_Bacon5/icon.png";
	var creditslistButton = document.createElement("a"); // Create list link
	creditslistButton.className = "dropdown-item";
	creditslistButton.href = "/user/Yummy_Bacon5";
	creditslistButton.appendChild(creditsIconElement);
	creditslistButton.innerHTML += " Extension Developer";
	document.querySelector("#navbar-main > ul > li:nth-child(4) > div > a:nth-child(16)").insertAdjacentElement("afterend", creditslistButton);
	// Create game icons on the games list
	const followedGames = document.getElementsByClassName("dropdown-menu")[0].children;
	for (i = 3; i < followedGames.length; i++) {
		var gamesIconElement = `<img class="fal fa-info-circle fa-margin" src="/themes/${followedGames[i].href.split("/")[3]}/cover-256.png"></img>`
		followedGames[i].innerHTML = gamesIconElement + followedGames[i].innerHTML
	}
})
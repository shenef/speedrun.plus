const signedIn = JSON.parse(document.querySelector("head [name='src:session']").getAttribute("content")).signedIn
const userName = JSON.parse(document.querySelector("head [name='src:session']").getAttribute("content")).user.name

chrome.storage.sync.get(["extensionIconInName"], (result) => {
	if (signedIn && result.extensionIconInName == "1") {
		
		document.getElementsByClassName("fal fa-cog fa-margin")[0].parentNode.outerHTML += `<a class="dropdown-item" href="#SRPsettings" data-toggle="modal"><i class="fal fa-cog fa-margin"></i>Extension Settings</a>`
	} else {
		//This adds it in the nav bar, it will show here for logged out users
		document.getElementsByClassName("nav-item")[7].insertAdjacentHTML("afterend", `<li class="nav-item dropdown"><a class="nav-link" href="#SRPsettings" data-toggle="modal"><i class="fal fa-cog fa-margin"></i><span class="badge badge-counter"></span></a></li>`);
		
	}
})

//This adds the settings menu
document.getElementsByClassName("navbar-background fixed-top")[0].outerHTML += `<div class="modal fade formatting-help" id="SRPsettings" role="dialog" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"><img src=${chrome.extension.getURL("icon/128-srplus-icon.png")} style="width: 10%;"></img>Extension Settings</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">x</span>
				</button>
			</div>
			<div class="modal-body">
				<div role="tabpanel">
					<ul class="nav nav-row" role="tablist">
						<li role="presentation" class="nav-item nav-link category"><a href="#gameRules" aria-controls="gameRules" role="tab" data-toggle="tab" class="gameRuleTab" aria-selected="false">Test 2</a></li>
						<li role="presentation" class="nav-item nav-link category active"><a href="#categoryRules" aria-controls="categoryRules" role="tab" data-toggle="tab" class="gameRuleTab active show" aria-selected="true">Test 1</a></li>
					</ul>
				</div>
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane" id="gameRules">inner text</div>
					<div role="tabpanel" class="tab-pane active show" id="categoryRules">
						Reload the page to apply changes<br>
						<label class="switch"><input id="turnOffAds" type="checkbox" class="SRPcheckbox"><span class="slider"></span></label><label for="turnOffAds">Turn off ads</label><br>
						<label class="switch"><input id="followedIcons" type="checkbox" class="SRPcheckbox"><span class="slider"></span></label><label for="followedIcons">Show game's cover in Games dropdown (WIP)</label><br>
						<label class="switch"><input id="extensionIconInName" type="checkbox" class="SRPcheckbox"><span class="slider"></span></label><label for="extensionIconInName">Show the <i class="fal fa-cog fa-margin"></i> extension settings icon under your name</label><br>
						<label class="switch"><input id="showAllNotations" type="checkbox" class="SRPcheckbox"><span class="slider"></span></label><label for="showAllNotations">Show all Notations by default (WIP)</label><br>
  					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a class="btn btn-default" data-dismiss="modal">Close</a>
				<a href=${window.location.href} class="btn btn-primary">Reload</a>
			</div>
		</div>
	</div>
</div>`

//Saves the checkboxes values in the settings menu
const checkbox = document.getElementsByClassName("SRPcheckbox");
for (i = 0; i < checkbox.length; i++) {
	let theId = checkbox[i].id

	chrome.storage.sync.get([theId], (result) => {
		if (result[theId] == "1") {
			document.getElementById(theId).checked = true
		}
	});

	checkbox[i].addEventListener("change", function () {
		chrome.storage.sync.set({ [theId]: this.checked ? "1" : "0" })
	})
}

//Adds a annoucement and asks about the api key
chrome.storage.sync.get(["apiAllowed"], (result) => {

	/*apiAllowed: null = They haven't allowed or disallowed use of their api key
	apiAllowed: 1 = They have allowed use of their API key
	apiAllowed: 2 = The have dismissed it*/

	if (result.apiAllowed == null && signedIn) {
		document.getElementsByClassName("fullscreen-menu-background")[0].innerHTML += `<div class="global-announcement normal" style="margin-bottom: 16px">
		<div class="content">
			<img src="/images/1st.png" class="favicon-16"></img>
			<span>Allow us to use your API key to unlock more features</span>
			<a class="red" id="SRPapi">Sure</a>
			<a class="red" id="SRPapino">Dismis</a>
			<a class="red id="SRPapimore"><small>Learn more info</small></a>
		</div>
	</div>` /* TODO */
		document.getElementById("SRPapi").addEventListener("mouseup", () => {
			chrome.storage.sync.set({ "apiAllowed": "1" });
			document.getElementsByClassName("global-announcement")[0].remove();
			var xhttp = new XMLHttpRequest();
			xhttp.responseType = "document"
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					chrome.storage.sync.set({ "apiKey": this.response.getElementsByTagName("code")[0].innerText })
					console.log(this.response.getElementsByTagName("code")[0].innerText)
				}
			};
			xhttp.open("GET", `https://www.speedrun.com/${userName}/settings/api`, true)
			xhttp.send()
		})

		document.getElementById("SRPapino").addEventListener("mouseup", () => {
			document.getElementsByClassName("global-announcement")[0].remove();
			chrome.storage.sync.set({ "apiAllowed": "2" });
		})

		document.getElementById("SRPapimore").addEventListener("mouseup", () => {

		})
		return
	}
	/*TODO, add a checkbox in the settings to let someone allow/deny access to their api key again*/
})

//Adds game covers next to the followed games in the game list
chrome.storage.sync.get(["followedIcons"], async (result) => {
	if (signedIn && result.followedIcons == "1") {
		const followedGames = document.getElementsByClassName("dropdown-menu")[0].children
		for (i = 3; i < followedGames.length; i++) {
			/* TODO */
			const res = await fetch(`https://www.speedrun.com/api/v1/games/${followedGames[i].href.split("/")[3]}`).then(res => res.json())
			followedGames[i].innerHTML = `<img class="fal fa-info-circle fa-margin" src="${res.data.assets["cover-large"].uri}"></img>` + followedGames[i].innerHTML
		}
	}
})

//Removes the adverts
chrome.storage.sync.get(["turnOffAds"], (result) => {
	if (result.turnOffAds == "1") {
		//Add the adverts here
		const adverts = [document.querySelector("div.malediction.desktop_hero"), document.querySelector("div.malediction.desktop_footer"), document.querySelector("div.malediction.desktop_sidebar_a")]
		for (i = 0; i < adverts.length; i++) {
			if (adverts[i]) { adverts[i].remove() }
		}
	}
})

//Shows all notations
chrome.storage.sync.get(["showAllNotations"], (result) => {
	if (result.showAllNotations == "1") {
		const notationList = document.getElementById("dropdown-notifications")
		for (i = 0; i < notationList.length; i++) {
			/* TODO */
		}
	}
})

//This adds our Discord link into the nav bar
document.querySelector(".dropdown-item[href='https://discord.gg/0h6sul1ZwHVpXJmK']").outerHTML += `<a class="dropdown-item" href="https://discord.gg/SegUjWCGqq" target="_blank"><span class="icomoon icon-discord"></span>Speedrun.Plus Discord</a>`
//Adds the Speedrun.Plus text to the footer
document.getElementsByTagName("footer")[0].innerHTML += `<br><a href="https://github.com/shenef/speedrun.plus">Speedrun.Plus</a>`

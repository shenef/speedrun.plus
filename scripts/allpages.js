const signedIn = JSON.parse(document.querySelector("head [name='src:session']").getAttribute("content")).signedIn
const userName = JSON.parse(document.querySelector("head [name='src:session']").getAttribute("content")).user.name

chrome.storage.sync.get(["extensionIconInName"], (result) => {
	if (signedIn && result.extensionIconInName == "1") {
		document.querySelector(".dropdown-item[href='/settings']").outerHTML += `<a class="dropdown-item" href="#SRPsettings" data-toggle="modal"><i class="fal fa-cog fa-margin"></i>Extension Settings</a>`
	} else {
		//This adds the icon to the navbar, also shows for logged out users
		document.getElementsByClassName("nav-item")[7].insertAdjacentHTML("afterend", `<li class="nav-item dropdown"><a class="nav-link" href="#SRPsettings" data-toggle="modal"><i class="fal fa-cog fa-margin"></i><span class="badge badge-counter"></span></a></li>`);
	}
})

//This adds the settings menu
document.getElementsByClassName("navbar-background fixed-top")[0].outerHTML +=
	`<div class="modal fade formatting-help" id="SRPsettings" role="dialog" style="display: none;" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title"><img src=${chrome.extension.getURL("icon/48-srplus-icon.png")} style="width: 24px; vertical-align: sub;"></img>&nbsp;speedrun.plus Settings</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div class="modal-body">
					<div role="tabpanel">
						<ul class="nav nav-row" role="tablist">
							<li role="presentation" class="nav-item nav-link category active"><a href="#SRPgeneral" aria-controls="SRPgeneral" role="tab" data-toggle="tab" class="gameRuleTab active show" aria-selected="true">General</a></li>
							<li role="presentation" class="nav-item nav-link category"><a href="#design" aria-controls="design" role="tab" data-toggle="tab"">Design</a></li>
							<li role="presentation" class="nav-item nav-link category"><a href="#functionality" aria-controls="functionality" role="tab" data-toggle="tab">Functionality</a></li>
						</ul>
					</div>
					<div class="tab-content">
						<div role="tabpanel" class="tab-pane active show" id="SRPgeneral">
							<label class="switch"><input id="toggleAds" type="checkbox" class="SRPcheckbox"><span class="slider"></span></label><label for="toggleAds">&nbsp;Hide ads</label><br>
							<label class="switch"><input id="extensionIconInName" type="checkbox" class="SRPcheckbox"><span class="slider"></span></label><label for="extensionIconInName">
								&nbsp;Show the <i class="fal fa-cog fa-margin"></i> extension settings icon under your name</label><br>
						</div>
						<div role="tabpanel" class="tab-pane" id="design">
							<label class="switch"><input id="followedIcons" type="checkbox" class="SRPcheckbox"><span class="slider"></span></label><label for="followedIcons">&nbsp;Show game cover in Games dropdown (WIP)</label><br>
							<label class="switch"><input id="upperCaseText" type="checkbox" class="SRPcheckbox"><span class="slider"></span></label><label for="upperCaseText">&nbsp;Remove the uppercase text</label><br>
	  					</div>
						<div role="tabpanel" class="tab-pane" id="functionality">
							<label class="switch"><input id="showAllNotifications" type="checkbox" class="SRPcheckbox"><span class="slider"></span></label><label for="showAllNotifications">&nbsp;Always show all notifications (WIP)</label><br>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<a class="btn btn-default" data-dismiss="modal">Close</a>
					<a href=${window.location.href.split("#")[0]} class="btn btn-primary">Reload to apply</a>
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
		chrome.storage.sync.set({
			[theId]: this.checked ? "1" : "0"
		})
	})
}

//Adds an announcement and asks about the api key
chrome.storage.sync.get(["apiAllowed"], (result) => {

	/*apiAllowed: null = User hasn't allowed or disallowed use of their api key
	apiAllowed: 1 = User has allowed use of their API key
	apiAllowed: 2 = User has dismissed it*/

	if (result.apiAllowed == null && signedIn) {
		document.getElementsByClassName("fullscreen-menu-background")[0].innerHTML += `
		<div class="global-announcement normal" style="margin-bottom: 16px">
			<div class="content">
				<img src="/images/1st.png" class="favicon-16"></img>
				<span>Can we use your API key for some extra features?</span>
				<a class="red" id="SRPapi">Sure</a>
				<a class="red" id="SRPapino">Dismiss</a>
				<a class="red" id="SRPapimore"><small>More information</small></a>
			</div>
		</div>` /* TODO */
		document.getElementById("SRPapi").addEventListener("mouseup", () => {
			chrome.storage.sync.set({
				"apiAllowed": "1"
			});
			document.getElementsByClassName("global-announcement")[0].remove();
			var xhttp = new XMLHttpRequest();
			xhttp.responseType = "document"
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					chrome.storage.sync.set({
						"apiKey": this.response.getElementsByTagName("code")[0].innerText
					})
					console.log(this.response.getElementsByTagName("code")[0].innerText)
				}
			};
			xhttp.open("GET", `https://www.speedrun.com/${userName}/settings/api`, true)
			xhttp.send()
		})

		document.getElementById("SRPapino").addEventListener("mouseup", () => {
			document.getElementsByClassName("global-announcement")[0].remove();
			chrome.storage.sync.set({
				"apiAllowed": "2"
			});
		})
		document.getElementById("SRPapimore").addEventListener("mouseup", () => {})
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
			followedGames[i].innerHTML = `<img class="fal fa-info-circle fa-margin" src="${res.data.assets["cover-tiny"].uri}"></img>` + followedGames[i].innerHTML
		}
	}
})

//Removes the adverts
chrome.storage.sync.get(["toggleAds"], (result) => {
	if (result.toggleAds == "1") {
		//Add the adverts here
		const adverts = [
			document.querySelector("div.malediction.desktop_hero"),
			document.querySelector("div.malediction.desktop_footer"),
			document.querySelector("div.malediction.desktop_sidebar_a"),
			document.querySelector("div.malediction.desktop_sidebar_b")
		]
		for (i = 0; i < adverts.length; i++) {
			if (adverts[i]) {
				adverts[i].remove()
			}
		}
	}
})

//Shows all notifications
chrome.storage.sync.get(["showAllNotifications"], (result) => {
	if (result.showAllNotifications == "1") {
		const notificationList = document.getElementById("dropdown-notifications")
		for (i = 0; i < notificationList.length; i++) {
			/* TODO */
		}
	}
})

//Re
chrome.storage.sync.get(["upperCaseText"], (result) => {
	if (result.upperCaseText == "1") {
		const sheet = new CSSStyleSheet()
		sheet.replaceSync('body.dark .widget-title { text-transform: none !important; }')
		document.adoptedStyleSheets = [sheet]
	}
})

//This adds our Discord and GitHub into the navbar
document.querySelector(".dropdown-item[href='https://discord.gg/0h6sul1ZwHVpXJmK']").outerHTML +=
	`<div class="dropdown-divider"></div>
	<div class="dropdown-header">speedrun.plus</div>
	<a class="dropdown-item" href="https://discord.gg/SegUjWCGqq" target="_blank"><span class="fab fa-discord fa-margin"></span>Discord</a>
	<a class="dropdown-item" href="https://github.com/shenef/speedrun.plus" target="_blank"><span class="fas fa-code fa-margin"></span>GitHub</a>`

//Adds the speedrun.plus text to the footer
document.getElementsByTagName("footer")[0].innerHTML += `<br><a href="https://github.com/shenef/speedrun.plus">speedrun.plus</a>`

//Updates the Discord logo to the new one
document.getElementsByClassName("icon-discord")[0].className = "fab fa-discord fa-margin"

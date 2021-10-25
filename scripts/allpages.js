//This adds the Extension Settings button
//This adds it in the username
const settingsIcon = document.getElementsByClassName("fal fa-cog fa-margin")[0];
const signedIn = JSON.parse(document.querySelector("head [name='src:session']").getAttribute("content")).signedIn;
chrome.storage.sync.get(["extensionIconInNav"], function(result) {
	if (!signedIn || result.extensionIconInNav == "1") {
		// This adds it in the nav bar, it will show here for logged out users
		document.getElementsByClassName("navbar-nav")[1].insertAdjacentHTML("afterbegin", `<li class="nav-item dropdown"><a class="nav-link" href="#SRPsettings" data-toggle="modal"><i class="fal fa-cog fa-margin"></i><span class="badge badge-counter"></span></a></li>`);
		return;
	}
	if (signedIn)
		settingsIcon.parentNode.outerHTML += `<a class="dropdown-item" href="#SRPsettings" data-toggle="modal"><i class="fal fa-cog fa-margin"></i>Extension Settings</a>`;
})

//This adds the settings menu
document.getElementsByClassName("navbar-background fixed-top")[0].outerHTML += `<div class="modal fade formatting-help" id="SRPsettings" role="dialog" style="display: none;" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"><img src="https://cdn.discordapp.com/icons/899603056235282442/343f7924b151f4975f4478f49d78dabc.webp" class="fal fa-info-circle fa-margin"></img>Extension Settings</h5>
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
						<label class="switch"><input id="followedIcons" type="checkbox" class="SRPcheckbox"><span class="slider"></span></label><label for="followedIcons">Show game's cover in Games dropdown</label><br>
						<label class="switch"><input id="extensionIconInNav" type="checkbox" class="SRPcheckbox"><span class="slider"></span></label><label for="extensionIconInNav">Show the <i class="fal fa-cog fa-margin"></i> extension settings icon in the nav bar</label><br>
  					</div>
				</div>
			</div>
			<div class="modal-footer">
				<a class="btn btn-default" data-dismiss="modal">Close</a>
				<a id="SRPsave" class="btn btn-primary">Save</a>
			</div>
		</div>
	</div>
</div>`;

const checkbox = document.getElementsByClassName("SRPcheckbox");
for (i = 0; i < checkbox.length; i++) {
	let theId = checkbox[i].id;

	chrome.storage.sync.get([theId], function(result) {
		if (result[theId] == "1")
			document.getElementById(theId).checked = true;
	});

	checkbox[i].addEventListener("change", function() {
		chrome.storage.sync.set({
			[theId]: this.checked ? "1" : "0";
		});
	})
}

chrome.storage.sync.get(["followedIcons"], async function(result) {
	if (signedIn && result.followedIcons == "1") {
		// Add game covers next to the followed games in the game list
		const followedGames = document.getElementsByClassName("dropdown-menu")[0].children;
		for (i = 3; i < followedGames.length; i++) {
			let res = await fetch(`https://www.speedrun.com/api/v1/games/${followedGames[i].href.split("/")[3]}`).then(res => res.json());
			followedGames[i].innerHTML = `<img class="fal fa-info-circle fa-margin" src="${res.data.assets["cover-large"].uri}"></img>` + followedGames[i].innerHTML;
		}
	}
})

chrome.storage.sync.get(["turnOffAds"], function(result) {
	/* TODO */
	if (result.turnOffAds == "1")
		console.log("The code needs to be added");
})

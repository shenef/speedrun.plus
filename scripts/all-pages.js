// Add game covers next to the followed games in the game list
const followedGames = document.getElementsByClassName("dropdown-menu")[0].children;
for (i = 3; i < followedGames.length; i++) {
	let res = await fetch(`https://www.speedrun.com/api/v1/games/${followedGames[i].href.split("/")[3]}`).then(res => res.json());
	followedGames[i].innerHTML = `<img class="fal fa-info-circle fa-margin" src="${res.data.assets["cover-large"].uri}"></img>` + followedGames[i].innerHTML
}

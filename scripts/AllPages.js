const devList = ["Yummy_Bacon5"] //Enter your SR.C name here
const userNames = document.getElementsByClassName("link-username nobr nounderline")
for (var i = 0; i < userNames.length; i++) {
    for (var j = 0; j < devList.length; j++) {
        if (userNames[i].href == `https://www.speedrun.com/user/${devList[j]}`) {
            userNames[i].innerHTML = '<img class="usericon" src="http://cdn.onlinewebfonts.com/svg/img_543655.png" data-toggle="tooltip" data-placement="top" data-original-title="Speedrun.Plus Dev">' + userNames[i].innerHTML
        }
    }
}

//Add game covers next to the followed games in the game list
const followedGames = document.getElementsByClassName("dropdown-menu")[0].children;
for (i = 3; i < followedGames.length; i++) {
    let res = await fetch(`https://www.speedrun.com/api/v1/games/${followedGames[i].href.split("/")[3]}`).then(res => res.json());
    followedGames[i].innerHTML = `<img class="fal fa-info-circle fa-margin" src="${res.data.assets["cover-large"].uri}"></img>` + followedGames[i].innerHTML
}

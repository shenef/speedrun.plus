var extraTabs = document.createElement("ul"); // Extra Tabs
extraTabs.className = "nav nav-tabs nobr";
extraTabs.innerHTML = '<a class="nav-item nav-link" href="/granny">Granny</a><a class="nav-item nav-link" href="/granny_chapter_two">Granny 2</a><a class="nav-item nav-link" href="/granny_3">Granny 3</a></ul>';
document.getElementById("sidebar").insertAdjacentElement("afterbegin", extraTabs);
if (URL == "granny") {
	document.querySelector("#sidebar > ul > a:nth-child(1)").className += "  active";
} else if (URL == "granny_chapter_two") {
	document.querySelector("#sidebar > ul > a:nth-child(2)").className += "  active";
} else if (URL == "granny_3") {
	document.querySelector("#sidebar > ul > a:nth-child(3)").className += "  active";
}
var youShouldSpeedrunThisGame = document.createElement("small"); // You should speedrun this game :o
youShouldSpeedrunThisGame.innerHTML = "<br>You should speedrun this game :o";
document.getElementsByClassName("game-name")[0].insertAdjacentElement("beforeend", youShouldSpeedrunThisGame);
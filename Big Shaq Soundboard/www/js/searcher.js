function displaySearchField() {
    document.getElementById('displaySearchButton').style.display = "none";
    document.getElementById('appnamelabel').style.display = "none";
    document.getElementById('searchform').style.display = "block";
    document.getElementById('hideSearchButton').style.display = "block";
}

function hideSearchField() {
    $('.col').css('display','block');
    $('.show-search').removeClass('show-search');
    document.getElementById('displaySearchButton').style.display = "block";
    document.getElementById('appnamelabel').style.display = "block";
    document.getElementById('searchform').style.display = "none";
    document.getElementById('hideSearchButton').style.display = "none";

}
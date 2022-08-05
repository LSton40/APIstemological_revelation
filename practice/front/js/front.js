//JS do it


const teaser = setTimeout(teaserOpening, 4000)

function teaserOpening() {
    document.getElementById("tease").style.display = 'none';
    document.getElementById("main").style.display = 'grid';
}
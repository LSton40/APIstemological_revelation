const teaser = setTimeout(teaserOpening, 4000)

function teaserOpening() {
    document.getElementById("tease").style.display = 'none';
    titleMagic();
}

function titleMagic() {
    document.getElementById("splash_header").style.display = 'flex';
    setTimeout(() => {
        document.getElementById("main").style.display = 'flex';
        document.getElementById("opening").style.background = 'transparent';

    }, 4500)

}
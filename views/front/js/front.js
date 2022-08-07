const teaser = setTimeout(teaserOpening, 4000)

function teaserOpening() {
    document.getElementById("tease").style.display = 'none';
    // document.getElementsByTagName("body")
    titleMagic();
}

function titleMagic() {
    // document.getElementById("splash-header").style.display = 'flex';
    document.getElementById("splash_header").style.display = 'flex';
    setTimeout(() => {
        document.getElementById("main").style.display = 'flex';
        document.getElementById("splash_header").style.backgroundColor = 'linear-gradient(to bottom right, rgba(0,0,0,1.00), rgb(60, 9, 10));';
    }, 2500)

}
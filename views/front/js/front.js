


const teaser = setTimeout(teaserOpening, 4000)

function teaserOpening() {
    document.getElementById("tease").style.display = 'none';
    titleMagic();
}

function titleMagic() {
    // document.getElementById("splash-header").style.display = 'flex';
    document.getElementById("splash_header").style.display = 'flex';
    setTimeout(() => {
        document.getElementById("main").style.display = 'grid';

    }, 2500)

}
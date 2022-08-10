if ( window.location.href.includes('gameboard') ) { // checking to see if we are in the right html page to load the js

    //Highlights a given card on click, or removes highlighting on second click
    //When highlighted, also calls iLikeToMoveItMoveIt function to display possible moves from card selection
    function addSelectClass(event) {
  
      if (event.target.classList.contains("selectedCard")) {
          event.target.classList.remove("selectedCard")
  
          //remove highlighting from pieces
          //remove highlighting from target game spaces
  
      } 
      else {
          event.target.classList.add("selectedCard")
  
          console.log(JSON.stringify(event.target.textContent))
          iLikeToMoveItMoveIt(JSON.stringify(event.target.textContent));
      }
            
      
    }
  }


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
# Jegs and Pokers
By Justyn Helgeson, Gunnar Johnson, Logan Sutton, Mark Ustby

Get ready for this hip new heartstopping game. In this game users play cards to move around the gameboard and try to get all their pegs back home. 

## Description

`Jegs and Pokers` is an online multiplayer game inspired by board games such as Sorry! and Pegs and Jokers. Authorized users may create or join a game along with three other people in order to play. Authorization requires no more than registering a username and password in order to log into the site. Once logged in, a user may create a new game and invite or wait for three others to join, or may join an existing game.

Gameplay is turn-based. All players are immediately dealt a hand of 5 cards and 5 gamepiece tokens are generated at their respective start positions. The goal of the game is for a player to move all 5 of their tokens from the start position around the board to land at their home base. Movement is based upon card values. On their turn, a player will draw a 6th card and will select one of their 6 cards to play to move a single token. Upon play, the selected card is discarded. Cards are based upon regular playing cards and have their listed numeric values: a token is moved the same number of spaces as is listed on the card. Aces (`A`) have a value of 1, while face cards (`J`, `Q`, and `K`) all have a value of 10.

If a player's token lands on the same space as an opponent's token, the opponent's token is removed back to the start position. The game thus involves not only a race to be the first to get all 5 tokens to home base before their opponents, but also to strategize around attacking or avoiding attack by other players. 

We are currently in the process of adding and developing additional features, including wildcards, variable numbers of players and board size, additional competitive elements to the game, as well as different themes and backgrounds, and facilities for player interaction.

[Link to Jegs and Pokers, deployed on Heroku](https://jegs-pokers.herokuapp.com/)


## Table of Contents  

- [Installation](#installation)  
- [Usage](#usage)  
- [License](#license)  
- [How to Contribute](#how-to-contribute)  
- [Tests](#tests)  
- [Questions](#questions)  

## Installation

This app is deployed to Heroku (see link above). No installation is necessary to to use it.

In development we have made use of the following suites of software:
 [dotenv](https://www.npmjs.com/package/dotenv) 
 [express](https://www.npmjs.com/package/express)
 [mysql2](https://www.npmjs.com/package/mysql2)
 [sequelize](https://www.npmjs.com/package/sequelize)
 [bcrypt](https://www.npmjs.com/package/bcrypt)
 [connect](https://www.npmjs.com/package/connect)
 [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)
 [cookie-parser](https://www.npmjs.com/package/cookie-parser)
 [cors](https://www.npmjs.com/package/cors)
 [express](https://www.npmjs.com/package/express)
 [express-handlebars](https://www.npmjs.com/package/express-handlebars)
 [express-session](https://www.npmjs.com/package/express-session)
 [handlebars](https://www.npmjs.com/package/handlebars)
 [http](https://www.npmjs.com/package/http)
 [inquirer](https://www.npmjs.com/package/inquirer)
 [passport](https://www.npmjs.com/package/passport)
 [socket.io](https://www.npmjs.com/package/socket.io)
  

## Usage

Upon page load, a non-registered user--or a registered user who has logged out--will see a brief opening text cinematic consisting of a teaser of `Would you like to play a game?`, followed by the presentation of the title `Jegs and Pokers`.
(![Jegs and Pokers Opening animation](https://user-images.githubusercontent.com/103286445/184280967-474931b2-5c5d-4658-a4bd-1f553506a50b.png)

The opening cinematic will transition to the home page, which presents the user the options to login or register. (If a user is already logged in when they load the site, they will be directed directly to the Dashboard).
(![Jegs and Pokers Home Page](https://user-images.githubusercontent.com/103286445/184280613-6c39134d-571c-4879-acd4-a5bdd92cf115.png)

If a user has not created a login account, they are instructed to navigate from the home page to the registration page (to `Go see Hank`), where they can create a username and password.
(![Jegs and Pokers Registration Page](https://user-images.githubusercontent.com/103286445/184280672-21af4528-1940-4b67-b591-72a7cdfcf2e0.png)

If a user has a login account, they are instructed to navigate to the login page (to go see `Lou, the Bouncer`) where they may enter their username and password. If an unregistered user finds themselves on the login page, they are presented with the option to go instead to the registration page or to leave the site entirely.
(![Jegs and Pokers Login Page](https://user-images.githubusercontent.com/103286445/184280788-9eb0c58f-6d5a-4505-9f06-17b9959c23da.png)

A registered user who is logged in is directed to the Dashboard (or `Foyer`), where they are presented with the options to `Create Game`, `Join Game`, or `Query` an existing game by entering the Room ID number. (We anticipate adding details to this page with further development.)
(![Jegs and Pokers Dashboard/ Foyer Page](https://user-images.githubusercontent.com/103286445/184280714-ec8feaa1-9050-4628-89ad-174b099496a0.png)

Upon clicking `Create Game`, the user is designated the game host and is directed to the Lobby page, where they can wait for other players to join their game. The list of players is displayed as they join. Once there are 4 total players joined to a game, the host can select `Start` to direct all players to the gameboard.
(![Jegs and Pokers Lobby Page](https://user-images.githubusercontent.com/103286445/184280819-3291c612-b6fa-4ddb-846a-a13e07a79871.png)

On the gameboard page, users see player information displayed at the top of the page. Each player will see their own hand of cards dealt along the bottom of the page. The gameboard itself is displayed in the middle. Players will select the card representing how many spaces they would like to move. They have the option to deselect a card or select another card before making their move. Upon any card selection, the given player is shown all possible moves they may make with that selection, highlighted on the board. Players make their moves by clicking on the highlighted space to which they would like to make their move.
(![Jegs and Pokers Gameboard](https://user-images.githubusercontent.com/103286445/184280882-103751e8-f280-4c56-8805-b46177a81586.png)

Upon selecting a space, the piece move and the player's turn is over: all control options are disabled until their next turn. When a player has moved all 5 of their tokens to home base, they are declared winner and the game is over.

## License

All Rights Reserved.

Copyright (c) 2022 Justyn Helgeson, Gunnar Johnson, Logan Sutton, Mark Ustby

## How to Contribute
  
This project is under initial development. No external contributions are presently requested.

## Tests

This app is currently under development. No specific tests are yet developed or recommended for application.

## Questions

[Justyn Helgeson's GitHub](https://github.com/jystyn)
[Gunnar Johnson's GitHub](https://github.com/fixedOtter)
[Logan Sutton's GitHub](https://github.com/LSton40)
[Mark Ustby's GitHub](https://github.com/Mark-U20)

[Justyn Helgeson's email](justyn.helgeson@gmail.com)
[Gunnar Johnson's email](fo1152rc@go.minnstate.edu)
[Logan Sutton's email](logan.sutton@gmail.com)
[Mark Usbty's email]()


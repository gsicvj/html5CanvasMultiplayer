# HTML5CanvasMultiplayer
Should be a frameworkless HTML5 Canvas Multiplayer Game of some sort.

The idea is to:
* code whatever comes to my mind
* refactor shitty code
* write tests for the functonality
* document

Most components should have functionality, styles, definitions and other configuration in the same folder. I'm trying out whether I like this approach more than the classic **assets/\*\***. I might also give it a go with **VueJS's** one file does many things kind of approach.

----
## How to run?
Client and server configurations are defined in **webpack.config.js**. At the moment I like having them both in the same place. Oh and **config/** is unused, since there's only one environment now.

### Client | *NodeJS*
Default port is 8080.
````
npm run client
````

### Server | *ExpressJS*
Default port is 3000.
````
npm run server
````

----
## Todos
* Single port definition
* Proper frame rate based game loop
* Search for best practises on how to split game code
* Socket authentication
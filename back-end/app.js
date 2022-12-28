//import {generateShips} from "./functions.ts";

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

/*interface Tile{
    x: number
    y: number
}
interface Ship{
    occupiedTiles: Tile[]
}*/

//let firstTime = true;
let allShips = [];

app.post("/ships", (req,res)=>{
    allShips=[];
    for(let i = 0;i<5;i++){ // how many times to reset the board in case of errors
        try{
            generateShips(allShips, 3, 1);
            generateShips(allShips, 3, 2);
            generateShips(allShips, 2, 3);
            generateShips(allShips, 1, 4);
            generateShips(allShips, 1, 5);
        }
        catch (e){
            allShips=[];
            continue;
        }
        break;
    }
    
    //generateShips(allShips, 2, 2);
    console.log("job done");
    res.sendStatus(200);
});
app.get("/ships", (req,res)=>{
    res.end(JSON.stringify(allShips));
    res.send();
})

app.get("/asdf", (req,res)=>{
    let response = { a:1, b:2, c:3 };
    //res.send(JSON.stringify(response));
    res.end(JSON.stringify(response));
    res.send();
});
app.get("/aaa", (req,res)=>{
    res.send("aaaaaaaaaaaaaaaaaaaaaaaaaaasdf");
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});

//const PORT = process.env.PORT || 8080;
const PORT = 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));





const checkIfAvailable = (allShips, x, y) =>{
    if(x < 1 || x > 10 || y < 1 || y > 10){
        return false;
    }

    let isAvailable = true;
    allShips.forEach(ship => {
        ship.occupiedTiles.forEach(tile => {
            console.log("tile.x: "+tile.x+", x: "+x+", tile.y: "+tile.y+", y: "+y);
            if((tile.x >= x-1 && tile.x <= x+1) && (tile.y >= y-1 && tile.y <= y+1)){
                console.log("is not available!");
                isAvailable = false;
            }
        });
    });
    return isAvailable;
}

const generateShips = (allShips, shipAmount, occupiedTileAmount)=>{
    let maxIter = 100;
    let currIter = 0;
    for(let i = 0;i<shipAmount;i++){
        console.log("|||||||||||||||||||||||");
        console.log("ship num "+i);
        console.log("|||||||||||||||||||||||");
        let ship = {occupiedTiles: []};

        let startX = Math.floor(Math.random() * 10)+1;
        let startY = Math.floor(Math.random() * 10)+1;
        console.log("startX: "+startX);
        console.log("startY: "+startY);

        let goodDirectionFound = false;
        for(let j = 0;j<4;j++){ // checking every direction
            if(goodDirectionFound){
                break;
            }
            goodDirectionFound = true;
            switch(j){
                case 0: // checking north
                    for(let k = 0;k<occupiedTileAmount;k++){
                        console.log("checking startX: "+startX+", startY-k: "+(startY-k));
                        let isAvailable = checkIfAvailable(allShips, startX, startY-k);
                        if(!isAvailable){console.log("yep not available");
                            ship.occupiedTiles = [];    // clearing in case changes were made
                            goodDirectionFound = false;
                            break;
                        }
                        else{console.log("yep  available");
                            ship.occupiedTiles.push({x: startX, y: startY-k});
                        }
                        
                    }
                    
                    break;
                case 1: // checking east
                for(let k = 0;k<occupiedTileAmount;k++){
                    let isAvailable = checkIfAvailable(allShips, startX+k, startY);
                    if(!isAvailable){console.log("yep not available");
                        ship.occupiedTiles = [];    // clearing in case changes were made
                        goodDirectionFound = false;
                        break;
                    }
                    else{console.log("yep  available");
                        ship.occupiedTiles.push({x: startX+k, y: startY});
                    }
                }
                    break;
                    case 2: // checking south
                    for(let k = 0;k<occupiedTileAmount;k++){console.log("checking startX:"+startX+", startY+k"+(startY+k));
                        let isAvailable = checkIfAvailable(allShips, startX, startY+k);
                        if(!isAvailable){console.log("yep not available");
                            ship.occupiedTiles = [];    // clearing in case changes were made
                            goodDirectionFound = false;
                            break;
                        }
                        else{console.log("yep  available");
                            ship.occupiedTiles.push({x: startX, y: startY+k});
                        }
                    }
                    break;
                    case 3: // checking west
                    for(let k = 0;k<occupiedTileAmount;k++){console.log("checking startX-k:"+(startX-k)+", startY"+startY);
                        let isAvailable = checkIfAvailable(allShips, startX-k, startY);
                        if(!isAvailable){console.log("yep not available");
                            ship.occupiedTiles = [];    // clearing in case changes were made
                            goodDirectionFound = false;
                            break;
                        }
                        else{console.log("yep  available");
                            ship.occupiedTiles.push({x: startX-k, y: startY});
                        }
                    }
                    break;
            }
        }
        
        if(!goodDirectionFound){ // no good position in any direction found, trying again
            currIter++;
            if(currIter >= maxIter){    // possible impossible positioning found, need to remake board
                console.error("maxIter reached, breaking");
                throw new Error("Maximum iterations reached, need restart");
            }

            console.log("no good direction found, retrying");
            i--;
            continue;
        }
        else{
            console.log("——————————————");
            console.log("new ship with startX:"+ startX+", startY: "+startY+" created");
            console.log("——————————————");
            allShips.push(ship);
        }
        
    }
}
import React from 'react';
import GameCell from './GameCell';

interface Props{
    shots: number,
    setShots: Function
}
interface Tile{
    x: number
    y: number
}
interface Ship{
    occupiedTiles: Tile[]
}
export default function GameBoard(props : Props){
    //return (<>aaaaaaaaaaaaaaaaaaaaaaaaaaasdf</>);
    let board : JSX.Element[][] = [[]];
    let allShips : Ship[] = [];

    /*for(let y = 0;y<11;y++){
        board.push([]);
        for(let x = 0;x<11;x++){
            
            board[y].push(<GameCell x={x} y={y} shots={props.shots} setShots={props.setShots}/>)
        }
    }*/

    const checkIfAvailable = (x : number, y : number) =>{
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

    const generateShips = (shipAmount : number, occupiedTileAmount : number)=>{
        let maxIter = 100;
        let currIter = 0;
        for(let i = 0;i<shipAmount;i++){
            console.log("|||||||||||||||||||||||");
            console.log("ship num "+i);
            console.log("|||||||||||||||||||||||");
            let ship : Ship = {occupiedTiles: []};
    
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
                            let isAvailable = checkIfAvailable(startX, startY-k);
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
                        let isAvailable = checkIfAvailable(startX+k, startY);
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
                            let isAvailable = checkIfAvailable(startX, startY+k);
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
                            let isAvailable = checkIfAvailable(startX-k, startY);
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

    for(let k = 0;k<5;k++){
        try{
            // Generating rowboats
            //
            generateShips(3, 1);

            // Generating submarines
            //
            generateShips(3, 2);

            // Generating cruisers
            //
            generateShips(2, 3);

            // Generating battleships
            //
            generateShips(1, 4);

            // Generating carriers
            //
            generateShips(1, 5);
        }
        catch (e : any){
            allShips = [];  // restarting board and trying again
            continue;
        }
        break;
    }
    
    

    const checkIfIsShip = (x : number, y : number)=>{
        let isShip = false;

        allShips.forEach(ship => {
            ship.occupiedTiles.forEach(tile => {
                if(tile.x === x && tile.y === y){
                    //return true;
                    isShip=true;
                }
            });
        });
        return isShip;
    }
    for(let y = 0;y<11;y++){
        board.push([]);
        for(let x = 0;x<11;x++){
            let isShip = checkIfIsShip(x,y);
            board[y].push(<GameCell x={x} y={y} shots={props.shots} setShots={props.setShots} isShip={isShip}/>)
        }
    }
    
    return(
        <>
        {/*board.map(cell => {
            return cell;
        })*/}
        <table cellPadding={0} cellSpacing={0}>
            <tbody>
        {board.map((row: JSX.Element[]) => {
                  return (
                    <tr key={board.indexOf(row)}>
                    {row.map((cell: JSX.Element) => {
                        
                        return (
                          <td key={row.indexOf(cell)}>{cell}</td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
        </table>
        
        </>
        
    );
}
import React, {useState} from 'react';
import {Tile, Ship} from "./GameBoard";

interface Props{
    x : number,
    y : number,
    shots: number,
    setShots : Function,
    isShip: boolean,
    allShips: Ship[],
    setAllShips: Function,
    setAnnouncement: Function,
    setShipCounter: Function,
}
export default function GameCell(props : Props){
    const [currentBackground, setCurrentBackground] = useState("gray");

    let allShips = props.allShips;
    let x = props.x;
    let y = props.y;

    const checkIfIsShip = ()=>{
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

    const handleMouseOver = ()=>{
        let div = document.getElementById(props.x+";"+props.y);
        if(div !== null){
            div.style.background="white";
        }
    }
    const handleMouseOut = () =>{
        let div = document.getElementById(props.x+";"+props.y);
        if(div !== null){
            div.style.background=currentBackground;
        }
    }
    const handleClick = ()=>{
        console.log("clicked on "+x+", "+y);
        if(x === 0 && y === 0){
            console.log(JSON.stringify(allShips));
            return;
        }
        if(x === 0 || y === 0 || currentBackground !== "gray"){ // shooting at axis label or already shot at tile
            return;
        }

        let isShip = false;
        for(let i = 0;i<allShips.length;i++){
            let ship = allShips[i];
            for(let j = 0;j<ship.occupiedTiles.length;j++){
                let tile = ship.occupiedTiles[j];
                if(tile.x === x && tile.y === y){   // ship exists on pressed tile
                    isShip = true;
                    props.setAnnouncement("Hit!");
                    setCurrentBackground("red");
                    ship.occupiedTiles.splice(j, 1);
                    if(ship.occupiedTiles.length === 0){ // ship destroyed
                        props.setAnnouncement("You sunk a battleship!");
                        allShips.splice(i, 1);
                        props.setShipCounter(allShips.length);
                        console.warn("SHIP DESTROYED");
                        if(allShips.length === 0){ // all ships destroyed
                            console.warn("—————————————————");
                            console.warn("WINNER");
                            console.warn("———————————————");
                            props.setAnnouncement("You win!");
                        }
                    }
                    break;
                }
            }
        }
        if(!isShip){
            props.setAnnouncement("Missed.");
            props.setShots(props.shots - 1)
            setCurrentBackground("rgb(0, 132, 255)");
        }
    }
    const getText = ()=>{
        if(x === 0 && y !== 0){
            return y;
        }
        else if (y === 0 && x !== 0){
            return String.fromCharCode(64+x);
        }
        else{
            return "";
        }
    }
   
    return(
    <div  id={props.x+";"+props.y} style={{background: currentBackground, border: "1px solid", height: "50px", width: "50px"}} className={"game-cell"} onMouseOver={function(){handleMouseOver()}} onMouseOut={function(){handleMouseOut()}} onClick={()=>handleClick()}>
        <b>{getText()}</b>
        {props.isShip ? "aaa" : ""}
    </div>
    );
}
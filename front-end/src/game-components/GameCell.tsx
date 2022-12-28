import React, {useState, useEffect} from 'react';
import {Tile, Ship} from "./GameBoard";

interface Props{
    x : number,
    y : number,
    shots: number,
    setShots : Function,
    allShips: Ship[],
    setAllShips: Function,
    announcement: string,
    setAnnouncement: Function,
    setShipCounter: Function,
    setShowTryAgainButton: Function,
    refreshBoard : boolean,
}
export default function GameCell(props : Props){
    const [currentBackground, setCurrentBackground] = useState("gray");

    let allShips = props.allShips;
    let x = props.x;
    let y = props.y;

    useEffect(()=>{
        setCurrentBackground("gray");
    }, [props.refreshBoard])

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
        if(x === 0 || y === 0 || currentBackground !== "gray" || props.shots <= 0 || props.announcement === "Loading..."){ // shooting at axis label, already shot at tile or no more shots left
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

                        if(allShips.length === 0){ // all ships destroyed
                            props.setAnnouncement("VICTORY!");
                        }
                    }
                    break;
                }
            }
        }
        if(!isShip){
            if(props.shots - 1 <= 0){   // Out of shots
                props.setAnnouncement("Defeat!")
                props.setShowTryAgainButton(true);
            }
            else{
                props.setAnnouncement("Missed.");
            }
            props.setShots(props.shots - 1);
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
    <div  id={props.x+";"+props.y} style={{background: currentBackground}} className={"game-cell"} onMouseOver={function(){handleMouseOver()}} onMouseOut={function(){handleMouseOut()}} onClick={()=>handleClick()}>
        <b>{getText()}</b>
    </div>
    );
}
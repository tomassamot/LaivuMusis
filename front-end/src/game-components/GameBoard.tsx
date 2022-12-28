import React, { useState, useEffect } from 'react';
import GameCell from './GameCell';

export interface Tile{
    x: number
    y: number
}
export interface Ship{
    occupiedTiles: Tile[]
}
export default function GameBoard(){
    let board : JSX.Element[][] = [[]];

    const [shots, setShots] = useState(0);
    const [allShips, setAllShips] = useState<Ship[]>([]);
    const [announcement, setAnnouncement] = useState("");
    const [shipCounter, setShipCounter] = useState(0);
    const [showTryAgainButton, setShowTryAgainButton] = useState(false);
    const [refreshBoard, setRefreshBoard] = useState(false);

    useEffect(()=>{
        setAnnouncement("Loading...");
        fetch("http://localhost:8080/ships", {
            method: "POST"
        })
        .then(()=>fetch("http://localhost:8080/ships", {
            method: "GET"
        }))
        .then((response)=>response.json())
        .then((data)=>{
            
            console.log(data);
            setAllShips(data);
            setShots(25);
            setShipCounter(10);

            setAnnouncement("Loaded successfully!");
            setRefreshBoard(false);
        })
        .catch((error) => console.log(error));
    },[refreshBoard]);

    for(let y = 0;y<11;y++){
        board.push([]);
        for(let x = 0;x<11;x++){
            board[y].push(<GameCell x={x} y={y} shots={shots} setShots={setShots} allShips={allShips} setAllShips={setAllShips} announcement={announcement} setAnnouncement={setAnnouncement} setShipCounter={setShipCounter} setShowTryAgainButton={setShowTryAgainButton} refreshBoard={refreshBoard}/>)
        }
    }
    
    
    return(

    <div className={"wrapper"}>
      <h1>Shots left: {shots}</h1>
        {
            showTryAgainButton ? 
            <div>
                <button onClick={()=>{setRefreshBoard(true);setShowTryAgainButton(false);}}>
                    Try again?
                </button>
            </div>
             : ""
        }
        <div className={"h2-wrapper"}>
            <h2 id={"announcement"}>{announcement}</h2>
            <h2 id={"ships-counter"}>Ships left: {shipCounter}</h2>
        </div>
        <div style={{height: "100%", width: "100%", position: "relative"}}>
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
        </div>
    </div>
    );
}
import React from 'react';

interface Props{
    x : number,
    y : number,
    shots: number,
    setShots : Function,
}
export default function GameCell(props : Props){
    let x = props.x;
    let y = props.y;

    const handleMouseOver = ()=>{
        let div = document.getElementById(props.x+";"+props.y);
        if(div !== null){
            div.style.background="white";
        }
    }
    const handleMouseOut = () =>{
        let div = document.getElementById(props.x+";"+props.y);
        if(div !== null){
            div.style.background="gray";
        }
    }
    const handleClick = ()=>{
        if(x !== 0 && y !== 0){
            props.setShots(props.shots - 1)
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
    <div  id={props.x+";"+props.y} style={{border: "1px solid", height: "50px", width: "50px"}} className={"game-cell"} onMouseOver={function(){handleMouseOver()}} onMouseOut={function(){handleMouseOut()}} onClick={()=>handleClick()}>
        <b>{getText()}</b>
    </div>
    );
}
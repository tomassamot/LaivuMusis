import React from 'react';
import GameCell from './GameCell';

interface Props{
    shots: number,
    setShots: Function
}
export default function GameBoard(props : Props){
    //return (<>aaaaaaaaaaaaaaaaaaaaaaaaaaasdf</>);
    let board : JSX.Element[][] = [[]];
    
    for(let y = 0;y<11;y++){
        board.push([]);
        for(let x = 0;x<11;x++){
            board[y].push(<GameCell x={x} y={y} shots={props.shots} setShots={props.setShots}/>)
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
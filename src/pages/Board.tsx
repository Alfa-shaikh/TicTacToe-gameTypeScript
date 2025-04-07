
import { useState,useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import Square from '../components/Square';

type Player = 'X'| 'O' | null;

const Board: React.FC = () => {    
    const activePlayer = Math.round(Math.random() + 1) === 1 ? 'X' : 'O';

    const [currentPlayer,setCurrentPlayer] = useState<'X' | 'O'>(activePlayer);
    const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
    const [winner,setWinner] = useState<string | null>(null);


    useEffect(() => {
        const winnerPlayer = calculateWinner(squares);
        if (winnerPlayer) {
            setWinner(`${winnerPlayer} is the winner`)
        } else if (!winnerPlayer && !squares.filter(square => !square).length) {
        setWinner(`Both player won,Reload for new game`)

        }
    })

    const calculateWinner = (squares: Player[]) => {
        const possibleWinningCombination = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];


        return possibleWinningCombination.map(combo => {
            const [a,b,c] = combo;
            console.log(a,b,c);
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
            return null;
        }).filter(data => data)[0];
    }

    const setSquareValue = (index: number) => {
            const data = squares.map((value , i) => {
                if (index === i) {
                    return currentPlayer;
                }
                return value;
            })
            setSquares(data);
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    return (
            <div className='board-wrapper'>
                {
                    winner ? <p>{winner}</p> :
                    <p>Hey {currentPlayer} ,Its your turn</p>

                }
                <Grid columns={3} centered>
                    {
                        Array(9).fill(null).map((val,index) => (
                            <Grid.Column className='board-column'>
                                <Square
                                    onClick={() => setSquareValue(index)}
                                    value={squares[index]}
                                    winner={winner}
                                />
                                </Grid.Column>
                        ))
                    }
                </Grid>
            </div>
    )


}

export default Board;
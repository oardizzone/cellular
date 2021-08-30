import PlaybackControls from './PlaybackControls';
import styled from 'styled-components';
import { useCallback, useRef, useState } from 'react';
import produce from 'immer';

interface CellProps {
    alive: boolean;
    key: string;
}

const rows = 30;
const cols = 30;

const neighbourhood = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
];

const Wrapper = styled.div`
    margin: 0 auto;
    text-align: center;
`;

const GridArea = styled.div`
    background: #353535;
    margin: 25px auto;
    display: inline-grid;
    grid-template-columns: repeat(${cols}, 20px);
    border: 10px solid #353535;
    border-radius: 3px;
`;

const Cell = styled.div<CellProps>`
    width: 20px;
    height: 20px;
    background: ${(props) => (props.alive ? '#FFFFFF' : undefined)};
    outline: 1px solid #ffffff80;
`;

function create2DArray(numRows: number, numCols: number) {
    const grid = [];
    for (let i = 0; i < numRows; i++) {
        grid.push(Array.from(Array(numCols), () => 0));
    }
    return grid;
}

const Game = () => {
    const [grid, setGrid] = useState(create2DArray(rows, cols));
    const [playing, setPlaying] = useState(false);

    const playingRef = useRef(playing);
    playingRef.current = playing;

    const runSimulation = useCallback(() => {
        if (!playingRef.current) {
            return;
        }

        setGrid((g) => {
            return produce(g, (gridCopy) => {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        let neighbours = 0;
                        neighbourhood.forEach(([y, x]) => {
                            const newI = i + y;
                            const newJ = j + x;
                            const isInBounds = newI > 0 && newI < rows && newJ > 0 && newJ < cols;

                            if (isInBounds) {
                                neighbours += g[newI][newJ];
                            }
                        });

                        if (g[i][j] === 0 && neighbours === 3) {
                            gridCopy[i][j] = 1;
                        } else if (neighbours < 2 || neighbours > 3) {
                            gridCopy[i][j] = 0;
                        }
                    }
                }
            });
        });

        setTimeout(runSimulation, 125);
    }, []);

    const resetGrid = useCallback(() => {
        setGrid((g) => {
            return produce(g, (gridCopy) => {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        gridCopy[i][j] = 0;
                    }
                }
            });
        });
    }, []);

    const randomizeGrid = useCallback(() => {
        setGrid((g) => {
            return produce(g, (gridCopy) => {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        gridCopy[i][j] = Math.floor(Math.random() * 2);
                    }
                }
            });
        });
    }, []);

    console.log(grid);

    return (
        <Wrapper>
            <PlaybackControls
                isPlaying={playing}
                setPlayingState={setPlaying}
                play={runSimulation}
                playRef={playingRef}
                reset={resetGrid}
                randomize={randomizeGrid}
            />
            <GridArea>
                {grid.map((rows, i) =>
                    rows.map((cols, j) => (
                        <Cell
                            key={`${i},${j}`}
                            alive={grid[i][j] === 1 ? true : false}
                            onClick={() => {
                                const newGrid = produce(grid, (gridCopy) => {
                                    gridCopy[i][j] = grid[i][j] ? 0 : 1;
                                });
                                setGrid(newGrid);
                            }}
                        />
                    ))
                )}
            </GridArea>
        </Wrapper>
    );
};

export default Game;

import React from 'react';
import styled from 'styled-components';
import Game from './components/Game';
import { PlayArrow, Pause, Replay } from '@material-ui/icons';

const Wrapper = styled.div`
    width: 70%;
    margin: 0 auto;
	background: #FFFFFF;
	padding: 50px;
	box-shadow: 0 0 50px 50px #FFFFFF;
`;

const StyledH1 = styled.h1`
    font-size: 4rem;
    font-weight: 700;
    text-align: center;
	margin: 0 auto;
`;

const Footer = styled.footer``;

function App() {
    return (
        <Wrapper>
            <StyledH1>Conway's Game of Life</StyledH1>
            <Game />
            <Footer>
				<p>Controls:</p>
				<ul>
					<li><PlayArrow />/<Pause /> - Run/Pause simulation</li>
					<li><Replay /> - Reset simulation</li>
					<li>RANDOM - Randomize the grid</li>
				</ul>
                <p>
                    The Game of Life, also known simply as Life, is a cellular automaton devised by the British
                    mathematician John Horton Conway (1937 - 2020) in 1970. The game is played on a grid of squares
                    called cells, each cell is white (alive) or black (dead). The rules that each cell follow each generation are as follows:
                </p>
				<ol>
					<li>Any alive cell that is touching <strong>less than 2</strong> alive neighbours dies.</li>
					<li>Any alive cell touching <strong>4 or more</strong> alive neighbours dies.</li>
					<li>Any alive cell touching <strong>2 or 3</strong> alive neighbours does nothing.</li>
					<li>Any dead cell touching <strong>exactly 3</strong> alive neighbours becomes alive.</li>
				</ol>
            </Footer>
        </Wrapper>
    );
}

export default App;

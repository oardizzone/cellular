import styled from 'styled-components';
import { Button, ButtonGroup } from '@material-ui/core';
import { PlayArrow, Pause, Replay } from '@material-ui/icons';

const Controls = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 75px;
`;

interface PlaybackProps {
    isPlaying: boolean;
    setPlayingState: React.Dispatch<React.SetStateAction<boolean>>;
    play: () => void;
    reset: () => void;
    randomize: () => void;
    playRef: React.MutableRefObject<boolean>;
}

const PlaybackControls: React.FC<PlaybackProps> = ({ isPlaying, setPlayingState, play, reset, randomize, playRef }) => {
    return (
        <Controls>
            <ButtonGroup variant="contained">
                <Button
                    onClick={() => {
                        setPlayingState(!isPlaying);
                        if (!isPlaying) {
                            playRef.current = true;
                            play();
                        }
                    }}
                >
                    {isPlaying ? <Pause /> : <PlayArrow />}
                </Button>
                <Button disabled={isPlaying} onClick={reset}>
                    <Replay />
                </Button>
            </ButtonGroup>
            <Button variant="contained" disabled={isPlaying} onClick={randomize}>
                Random
            </Button>
        </Controls>
    );
};

export default PlaybackControls;

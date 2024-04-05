import 'phaser'
import Phaser, { Game as GameType } from "phaser";
import { useEffect, useState } from 'react';
import PreloadScene from './scenes/preloadScene';
import MainScene from './scenes/MainScene';
import Register from './scenes/register';
import Login from './scenes/Login';
import Prizes from './scenes/prizes';

const DEFAULT_WIDTH = 1215
const DEFAULT_HEIGHT = 2160

const Game = () => {
  const [game, setGame] = useState<GameType>()
  useEffect(() => {
    if (!game) {
      const initPhaser = async () => {
        const PhaserGame = new Phaser.Game({
          type: Phaser.CANVAS,
          backgroundColor: '#ffffff',
          scale: {
            parent: 'phaser-game',
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
          },
          dom: {
            createContainer: true
          },
          scene: [
            PreloadScene,
            Prizes,
            MainScene,
            Register,
            Login,
          ],
          // physics: {
          //   default: 'arcade',
          //   arcade: {
          //     debug: true,
          //     gravity: { y: 400 }
          //   }
          // }
        });
        setGame(PhaserGame)
      }
      initPhaser();
    }

  }, [game])
  return <div id="phaser-game" key={"phaser-game"}></div>;
}
export default Game; 
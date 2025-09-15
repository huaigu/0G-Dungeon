import { GameState } from '@/types/game';
import { Button } from '@/components/ui/button';

interface GameUIProps {
  gameState: GameState;
  onReset: () => void;
}

export const GameUI = ({ gameState, onReset }: GameUIProps) => {
  return (
    <div className="space-y-4">
      {/* Game Title */}
      <div className="nes-container is-dark with-title">
        <p className="title text-white">Mona Dungeon</p>
        <div className="text-center">
          <p className="nes-text is-primary text-sm mb-2">
            Collect treasures and find the portal!
          </p>
        </div>
      </div>
      
      {/* Game Stats */}
      <div className="nes-container is-dark">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="nes-text">Level:</span>
              <span className="nes-text is-warning">
                {gameState.currentLevel}/10
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="nes-text">Steps:</span>
              <span className="nes-text is-primary">
                {gameState.steps}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="nes-text">Treasures:</span>
              <span className="nes-text is-success">
                {gameState.treasuresCollected}/{gameState.totalTreasures}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="nes-text">Chests:</span>
              <span className="nes-text is-warning">
                {gameState.chestsCollected}/{gameState.totalChests}
              </span>
            </div>
          </div>
          
          <div className="col-span-2 space-y-2">
            <div className="flex justify-between items-center">
              <span className="nes-text">Score:</span>
              <span className="nes-text is-primary">
                {gameState.totalDiamonds * 3}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="nes-text">Status:</span>
              <span className={`nes-text ${
                gameState.gameWon 
                  ? 'is-success' 
                  : gameState.isOnPortal
                    ? 'is-warning'
                    : 'is-disabled'
              }`}>
                {gameState.gameWon 
                  ? 'Victory!' 
                  : gameState.isOnPortal
                    ? 'Press Space to Enter'
                    : 'Exploring'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Victory Screen */}
      {gameState.gameWon && (
        <div className="nes-container is-dark">
          <div className="text-center">
            <p className="nes-text is-success mb-2">
              🎉 Victory! 🎉
            </p>
            <p className="nes-text text-xs">
              Completed in {gameState.steps} steps!
            </p>
            <p className="nes-text text-xs">
              Total Score: {gameState.totalDiamonds * 3}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
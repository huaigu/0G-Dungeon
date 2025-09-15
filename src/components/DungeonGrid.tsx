import { Cell, GameState } from '@/types/game';
import { DiamondIcon } from '@/components/GameIcons';

interface DungeonGridProps {
  grid: Cell[][];
  gameState: GameState;
}

export const DungeonGrid = ({ grid, gameState }: DungeonGridProps) => {
  const getCellClass = (cell: Cell) => {
    let baseClass = 'dungeon-cell ';
    
    switch (cell.type) {
      case 'wall':
        baseClass += 'cell-wall';
        break;
      case 'floor':
        baseClass += 'cell-floor';
        break;
      case 'treasure':
        if (cell.treasureCollected) {
          baseClass += 'cell-floor';
        } else {
          baseClass += 'cell-treasure';
        }
        break;
      case 'portal':
        baseClass += 'cell-portal';
        break;
      case 'chest':
        if (cell.chestCollected) {
          baseClass += 'cell-floor';
        } else {
          baseClass += 'cell-chest';
        }
        break;
    }
    
    return baseClass;
  };

  const getCellContent = (cell: Cell) => {
    if (cell.hasPlayer) {
      return (
        <div className="zero-g-avatar">
          <span className="zero-g-text">0G</span>
        </div>
      );
    }
    
    switch (cell.type) {
      case 'treasure':
        if (!cell.treasureCollected) {
          return <DiamondIcon className="text-yellow-100" size={24} />;
        }
        return null;
      case 'portal':
        return <span className="text-lg text-white">⌂</span>;
      case 'chest':
        if (!cell.chestCollected) {
          return <span className="text-lg text-white">📦</span>;
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="nes-container is-dark with-title">
      <p className="title text-white">Level {gameState.currentLevel}</p>
      <div className="dungeon-grid">
        {grid.flat().map((cell, index) => (
          <div
            key={index}
            className={getCellClass(cell)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {getCellContent(cell)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
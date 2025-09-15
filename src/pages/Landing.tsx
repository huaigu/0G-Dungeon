import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { WalletSetup } from '@/components/WalletSetup';

const Landing = () => {
  const navigate = useNavigate();

  const handleWalletReady = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4">
            <img 
              src="/images/logo.jpg" 
              alt="0G Dungeon Quest Logo" 
              className="w-20 h-20 sm:w-20 sm:h-20 md:w-20 md:h-20 object-contain rounded-lg shadow-lg border-2 border-primary/20"
            />
            <h1 className="nes-text is-primary text-3xl sm:text-4xl md:text-6xl pixel-font text-center sm:text-left">
                0G Dungeon
              </h1>
            </div>
            <p className="nes-text text-lg mb-2">0G DUNGEON</p>
            <p className="nes-text is-warning">A retro pixel-style blockchain adventure game</p>
        </div>

        {/* Game Introduction */}
        <div className="nes-container is-dark with-title mb-6">
          <p className="title text-white">Introduction</p>
          <div className="space-y-3">
            <p className="nes-text">
              Welcome to 0G Dungeon! This is a retro pixel-style dungeon crawler that integrates blockchain technology.
            </p>
            <p className="nes-text">
              Collect treasures in mysterious dungeons, travel through portals, and complete 10 levels to achieve final victory!
            </p>
          </div>
        </div>

        {/* Game Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="nes-container is-dark with-title">
            <p className="title text-white">Gameplay</p>
            <ul className="nes-text space-y-2 text-sm">
              <li>• Use WASD or arrow keys to move your character</li>
              <li>• Collect all the treasures on each level</li>
              <li>• Find the portal to proceed to the next level</li>
              <li>• Avoid walls and plan the best route</li>
              <li>• Complete all 10 levels to win</li>
            </ul>
          </div>

          <div className="nes-container is-dark with-title">
            <p className="title text-white">Blockchain Features</p>
            <ul className="nes-text space-y-2 text-sm">
              <li>• Powered by 0G Blockchain technology</li>
              <li>• Game progress is recorded on-chain</li>
              <li>• Collected treasures are minted as NFTs</li>
              <li>• Decentralized gaming experience</li>
              <li>• Transparent and fair game mechanics</li>
            </ul>
          </div>
        </div>

        {/* Getting Started */}
        <div className="nes-container is-dark with-title mb-8">
          <p className="title text-white">Getting Started</p>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="nes-container is-rounded">
                <h3 className="nes-text is-primary mb-2">1. Create Wallet</h3>
                <p className="nes-text text-xs">Create a temporary wallet for the game</p>
              </div>
              <div className="nes-container is-rounded">
                <h3 className="nes-text is-success mb-2">2. Fund Gas</h3>
                <p className="nes-text text-xs">Fund the wallet for transaction fees</p>
              </div>
              <div className="nes-container is-rounded">
                <h3 className="nes-text is-warning mb-2">3. Start Adventure</h3>
                <p className="nes-text text-xs">Enter the dungeon to start your adventure</p>
              </div>
            </div>
            
            <div className="mt-6">
              <WalletSetup onWalletReady={handleWalletReady} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="nes-text text-xs opacity-75">
            Powered by 0G Blockchain • Made with ❤️ using NES.css
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
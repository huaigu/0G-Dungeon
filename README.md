# 0G Dungeon Quest

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-green)](https://vitejs.dev/)

A retro pixel-style dungeon adventure game based on the **0G Blockchain**. Collect treasures, travel through portals, and record your adventure on-chain!

![0G Dungeon Quest](https://img.shields.io/badge/Game-0G_Dungeon_Quest-purple)

## 🎮 Introduction

**0G Dungeon** is a retro pixel-style dungeon crawler that integrates blockchain technology. Players need to collect treasures in 10 mysterious dungeon levels, find the portal, and complete the ultimate challenge. Every move, collection, and teleportation is recorded on the 0G blockchain, ensuring the transparency and permanence of game progress.

### 🎯 Game Objectives
- 🏛️ Explore 10 mysterious dungeon levels
- 💎 Collect all treasures to unlock the portal
- 📦 Open chests to get extra diamond rewards
- 🏆 Complete all levels to achieve final victory

### 🕹️ Controls
- **Move**: `WASD` or arrow keys to move the character
- **Teleport**: Stand on the portal and press `Space` to enter the next level
- **Collect**: Automatically collect treasures and chests you step on

## ⛓️ Blockchain Integration

### Smart Contracts
This game integrates smart contracts deployed on the **0G Testnet** to achieve a true on-chain gaming experience:

**Contract Repository**: [0g-dungeon-quest-contracts](https://github.com/TheDAS-designer/0g-dungeon-quest-contracts)

### Blockchain Features
- ✅ **On-Chain Game State**: Real-time synchronization of player position, level, diamond count, etc.
- ✅ **Gas-Optimized Move Validation**: Local validation of move validity to avoid invalid transactions
- ✅ **Burner Wallet**: Lightweight temporary wallet to lower the barrier to entry
- ✅ **Real-time State Sync**: Real-time synchronization with contract state to ensure data consistency

### Network Information
- **Network**: 0G-Galileo-Testnet
- **Chain ID**: 16601
- **Currency**: OG
- **Block Explorer**: https://chainscan-galileo.0g.ai

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- A small amount of OG test coins (for Gas fees)

### Installation and Running

```bash
# Clone the project
git clone https://github.com/huaigu/0g-dungeon-quest.git
cd 0g-dungeon-quest

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the build
npm run preview
```

### Environment Variable Configuration

Create a `.env` file and configure the smart contract address:

```env
VITE_CONTRACT_ADDRESS=your_contract_address_here
```

## 🎨 Technical Architecture

### Frontend Stack
- **⚛️ React 18**: Modern React application framework
- **📘 TypeScript**: Type-safe development experience
- **⚡ Vite**: Extremely fast build tool
- **🎨 Tailwind CSS**: Atomic CSS framework
- **🎮 NES.css**: Retro pixel-style CSS library
- **🧩 shadcn/ui**: Modern UI component library

### Blockchain Technology
- **🔗 Ethers.js 6**: Ethereum interaction library
- **🔐 BIP39**: Mnemonic generation and validation
- **💰 Burner Wallet**: Temporary wallet solution

### State Management
- **🪝 React Hooks**: Native state management
- **🔄 TanStack Query**: Server-side state synchronization
- **🎯 Custom Hooks**: Encapsulation of game logic

## 🏗️ Project Structure

```
src/
├── components/           # UI Components
│   ├── ui/              # shadcn base components
│   ├── DungeonGrid.tsx  # Dungeon grid display
│   ├── GameUI.tsx       # Game interface
│   └── WalletSetup.tsx  # Wallet setup
├── hooks/               # Custom Hooks
│   ├── useGameContract.ts   # Smart contract interaction
│   ├── useOnChainGameState.ts # On-chain game state
│   ├── useWallet.ts     # Wallet management
│   └── useBalance.ts    # Balance management
├── pages/               # Page components
│   ├── Landing.tsx      # Homepage
│   ├── Index.tsx        # Game page
│   └── Admin.tsx        # Admin page
├── types/               # Type definitions
├── utils/               # Utility functions
└── public/
    └── dungeonData.json # Dungeon data
```

## 🎯 Game Mechanics

### Dungeon System
- **Grid Size**: 10x10 tiles
- **Total Levels**: 10
- **Dungeon Type**: Pre-generated random layout

### Tile Type Encoding
| Number | Type | Description | Visual Effect |
|------|------|------|----------|
| `0` | Floor | Walkable area | Gray background |
| `1` | Wall | Impassable obstacle | Dark gray background |
| `2` | Treasure | Must-collect diamond | Yellow background + ◆ |
| `3` | Portal | Entrance to the next level | Purple background + ⌂ |
| `4` | Player Start | Player spawn position | Player avatar |
| `5` | Chest | Extra reward | Brown background + 📦 |

### Reward System
- **💎 Treasure**: Fixed 1 diamond (3 points)
- **📦 Chest**: Random 1-5 diamonds (3-15 points)
- **🏆 Completion Condition**: The portal can be used after collecting all treasures on the current level

## 🛠️ Development Guide

### Local Development
```bash
# Start the development server (localhost:8080)
npm run dev

# Type checking
npm run lint

# Build development version
npm run build:dev
```

### Dungeon Data Generation
Use the script to regenerate the dungeon layout:
```bash
node scripts/generateDungeonData.js
```

### Smart Contract Deployment
Please refer to the deployment guide in the contract repository:
[monad-dungeon-quest-contracts](https://github.com/TheDAS-designer/monad-dungeon-quest-contracts)

## 🎮 Game Features

### On-Chain Gaming Experience
- ⛓️ **Fully On-Chain**: Game state is fully stored on the blockchain
- 🔒 **Transparent and Fair**: All actions can be verified on the block explorer
- 💰 **Gas Optimization**: Smart local validation reduces invalid transactions

### User Experience Optimization
- 🚀 **Silent Refresh**: Balance updates do not interfere with the game flow
- ⚡ **Instant Feedback**: Optimistic updates provide a smooth experience
- 🎨 **Retro Style**: NES.css brings a classic pixel game feel
- 📱 **Responsive Design**: Supports desktop and mobile devices

### Wallet Integration
- 🔑 **Burner Wallet**: One-click creation of a temporary wallet
- 🔐 **Secure Storage**: Locally encrypted storage of private keys
- 💰 **Balance Management**: Real-time display of OG balance
- 📋 **Private Key Export**: Supports exporting to other wallets

## 📚 Related Resources

- **🎮 Game Contract**: [0g-dungeon-quest-contracts](https://github.com/TheDAS-designer/0g-dungeon-quest-contracts)
- **⛓️ 0G Official Website**: [0g.ai](https://0g.ai)
- **🔍 Block Explorer**: [chainscan-galileo.0g.ai](https://chainscan-galileo.0g.ai)
- **🎨 NES.css**: [nostalgic-css.github.io/NES.css](https://nostalgic-css.github.io/NES.css/)

## 🤝 Contribution Guide

Issues and Pull Requests are welcome!

1. Fork the project
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Development Roadmap

- [ ] 🏆 Achievement System
- [ ] 🎵 Background Music and Sound Effects
- [ ] 👥 Multiplayer Mode
- [ ] 🏪 NFT Equipment System
- [ ] 📊 On-Chain Leaderboard
- [ ] 🎲 Random Dungeon Generator

---

<div align="center">

**🚀 Start your 0G Dungeon adventure!**

Made with ❤️ for the 0G ecosystem

</div>

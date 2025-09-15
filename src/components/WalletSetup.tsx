import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useWallet, getWalletStatusText, getWalletStatusColor } from '@/hooks/useWallet';
import { formatAddress, formatBalance, ZERO_G_TESTNET_CONFIG, loadWalletFromStorage } from '@/utils/wallet';
import { Copy, Eye, EyeOff, RefreshCw, Wallet, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WalletSetupProps {
  onWalletReady: () => void;
}

export function WalletSetup({ onWalletReady }: WalletSetupProps) {
  const wallet = useWallet();
  const { toast } = useToast();
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // 检查是否有存储的钱包（无论连接状态如何）
  const [storedWallet, setStoredWallet] = useState(() => loadWalletFromStorage());
  
  // 监听钱包状态变化，同步更新 storedWallet
  useEffect(() => {
    const walletFromStorage = loadWalletFromStorage();
    setStoredWallet(walletFromStorage);
  }, [wallet.address, wallet.isConnected]);
  
  // 调试日志
  console.log('WalletSetup - storedWallet:', storedWallet);
  console.log('WalletSetup - wallet.isConnected:', wallet.isConnected);
  console.log('WalletSetup - wallet.walletStatus:', wallet.walletStatus);

  const handleCreateWallet = async () => {
    try {
      await wallet.createWallet();
      toast({
        title: "Wallet Created Successfully",
        description: "Please fund your wallet to start the game",
      });
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "An error occurred while creating the wallet, please try again",
        variant: "destructive",
      });
    }
  };

  const handleCopyAddress = async () => {
    if (wallet.address) {
      try {
        await navigator.clipboard.writeText(wallet.address);
        toast({
          title: "Copied Successfully",
          description: "Wallet address has been copied to clipboard",
        });
      } catch (error) {
        toast({
          title: "Copy Failed",
          description: "Unable to copy to clipboard",
          variant: "destructive",
        });
      }
    }
  };

  const handleExportPrivateKey = async () => {
    setIsExporting(true);
    try {
      const privateKey = wallet.exportPrivateKey();
      if (privateKey) {
        await navigator.clipboard.writeText(privateKey);
        toast({
          title: "Private Key Copied",
          description: "Private key has been securely copied to clipboard, please keep it safe",
        });
      } else {
        toast({
          title: "Export Failed",
          description: "Wallet private key not found",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to export private key",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleRefreshBalance = async () => {
    await wallet.refreshBalance();
    toast({
      title: "Balance Refreshed",
      description: `Current balance: ${formatBalance(wallet.balance)} 0G`,
    });
  };

  // 导出私钥组件 - 无论钱包连接状态如何都可以使用
  const ExportPrivateKeyDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="nes-btn is-warning w-full">
          <Eye className="w-4 h-4 mr-2" />
          Export Private Key
        </Button>
      </DialogTrigger>
      <DialogContent className="nes-dialog">
        <DialogHeader>
          <DialogTitle className="nes-text is-error">
            <AlertTriangle className="w-5 h-5 inline mr-2" />
            Security Warning
          </DialogTitle>
          <DialogDescription className="nes-text text-sm space-y-2">
            <p>Private key grants complete control over your wallet.</p>
            <p className="text-red-400">Please keep it safe and never share it with anyone!</p>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Alert className="nes-container is-error">
            <AlertDescription className="nes-text text-xs">
              Anyone who obtains your private key can completely control your wallet assets.
            </AlertDescription>
          </Alert>
          
          <Button
            onClick={handleExportPrivateKey}
            disabled={isExporting}
            className="nes-btn is-error w-full"
          >
            {isExporting ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Copying...
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Private Key to Clipboard
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // 统一使用burner wallet流程，检查钱包状态是否为ready
  const canStartGame = wallet.walletStatus === 'ready';

  if (canStartGame) {
    return (
      <div className="nes-container is-dark with-title">
        <p className="title text-white">Wallet Ready</p>
        <div className="space-y-4">
          <div className="nes-container is-rounded">
            <div className="flex items-center justify-between mb-2">
              <span className="nes-text">Wallet Address:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyAddress}
                className="nes-btn is-small"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <p className="nes-text text-xs break-all">{wallet.address}</p>
          </div>

          <div className="nes-container is-rounded">
            <div className="flex items-center justify-between mb-2">
              <span className="nes-text">Balance:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefreshBalance}
                disabled={wallet.isLoading}
                className="nes-btn is-small"
              >
                <RefreshCw className={`w-3 h-3 ${wallet.isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <p className="nes-text text-sm">
              {formatBalance(wallet.balance)} <span className="text-yellow-400">0G</span>
            </p>
          </div>

          <div className="text-center space-y-3">
            <p className={`nes-text ${getWalletStatusColor(wallet.walletStatus)}`}>
              ✓ {getWalletStatusText(wallet.walletStatus)}
            </p>
            
            <Button
              onClick={onWalletReady}
              className="nes-btn is-success w-full"
              disabled={wallet.isLoading}
            >
              Start Game
            </Button>

            {/* 私钥导出 - 只要有存储的钱包就显示 */}
            {storedWallet && <ExportPrivateKeyDialog />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create Wallet */}
      {!wallet.isConnected && (
        <Card className="nes-container is-dark with-title">
          <p className="title text-white">{storedWallet ? 'Wallet Management' : 'Create Wallet'}</p>
          <CardContent className="space-y-4">
            {!storedWallet ? (
              <>
                <CardDescription className="nes-text">
                  Need to create a temporary wallet to start the game. The wallet will be stored in your browser.
                </CardDescription>
                
                <Button
                  onClick={handleCreateWallet}
                  disabled={wallet.isLoading}
                  className="nes-btn is-primary w-full"
                >
                  {wallet.isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-2" />
                      Create Wallet
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <CardDescription className="nes-text">
                  Local wallet data detected. You can reload the wallet or export the private key.
                </CardDescription>
                
                <div className="space-y-3">
                  <Button
                    onClick={() => window.location.reload()}
                    className="nes-btn is-primary w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reload Wallet
                  </Button>
                  
                  {/* 私钥导出 - 有存储钱包时显示 */}
                  <ExportPrivateKeyDialog />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* 钱包信息 */}
      {wallet.isConnected && (
        <div className="nes-container is-dark with-title">
          <p className="title text-white">Wallet Information</p>
          <div className="space-y-4">
            {/* 地址 */}
            <div className="nes-container is-rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="nes-text">Wallet Address:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="nes-btn is-small"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <p className="nes-text text-xs break-all">{wallet.address}</p>
            </div>

            {/* 余额 */}
            <div className="nes-container is-rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="nes-text">Balance:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefreshBalance}
                  disabled={wallet.isLoading}
                  className="nes-btn is-small"
                >
                  <RefreshCw className={`w-3 h-3 ${wallet.isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              <p className="nes-text text-sm">
                {formatBalance(wallet.balance)} <span className="text-yellow-400">0G</span>
              </p>
            </div>

            {/* 状态 */}
            <div className="text-center">
              <p className={`nes-text ${getWalletStatusColor(wallet.walletStatus)}`}>
                {getWalletStatusText(wallet.walletStatus)}
              </p>
            </div>

            {/* 私钥导出 - 统一使用组件 */}
            {storedWallet && <ExportPrivateKeyDialog />}
          </div>
        </div>
      )}

      {/* 充值说明 */}
      {wallet.isConnected && !wallet.hasMinimumBalance && (
        <div className="nes-container is-warning with-title">
          <p className="title text-amber-600">Funding Instructions</p>
          <div className="space-y-3">
            <p className="nes-text text-sm">
              You need to fund your wallet with at least <strong>0.01 0G</strong> for gas fees to start the game.
            </p>
            
            <div className="nes-container is-rounded">
              <h4 className="nes-text font-bold mb-2">Network Information:</h4>
              <div className="text-xs space-y-1">
                <p className="nes-text">Network Name: {ZERO_G_TESTNET_CONFIG.name}</p>
                <p className="nes-text">Chain ID: {ZERO_G_TESTNET_CONFIG.chainId}</p>
                <p className="nes-text">Currency Symbol: {ZERO_G_TESTNET_CONFIG.currency}</p>
                <p className="nes-text">
                  Block Explorer: 
                  <a 
                    href={ZERO_G_TESTNET_CONFIG.blockExplorer} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 ml-1"
                  >
                    {ZERO_G_TESTNET_CONFIG.blockExplorer}
                  </a>
                </p>
              </div>
            </div>

            <Alert className="nes-container is-dark">
              <AlertDescription className="nes-text text-xs">
                Please use your private key to import the wallet into MetaMask or another wallet application, and then transfer some 0G tokens to this address.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}


      {/* 错误信息 */}
      {wallet.error && (
        <Alert className="nes-container is-error">
          <AlertDescription className="nes-text">
            {wallet.error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
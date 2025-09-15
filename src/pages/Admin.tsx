import React, { useState, useEffect } from 'react';
import { useMetaMask } from '@/hooks/useMetaMask';
import { useContract } from '@/hooks/useContract';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Wallet, Network, Upload, Settings } from 'lucide-react';
import { DungeonData } from '@/types/game';

const Admin = () => {
  const [dungeonData, setDungeonData] = useState<DungeonData | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  
  const {
    isInstalled,
    isConnected,
    isLoading: metaMaskLoading,
    account,
    chainId,
    error: metaMaskError,
    connect,
    switchToZeroGTestnet,
  } = useMetaMask();

  const {
    isLoading: contractLoading,
    error: contractError,
    contractAddress,
    uploadProgress,
    lastTxHash,
    setContractAddress,
    uploadLevelsToContract,
    checkOwnership,
  } = useContract();

  // 加载dungeon数据
  useEffect(() => {
    fetch('/dungeonData.json')
      .then(response => response.json())
      .then(data => setDungeonData(data))
      .catch(error => console.error('加载dungeon数据失败:', error));
  }, []);

  // 检查用户是否为合约所有者
  useEffect(() => {
    if (account && contractAddress) {
      checkOwnership(account).then(setIsOwner);
    }
  }, [account, contractAddress, checkOwnership]);

  // 检查是否连接到正确的网络
  const isCorrectNetwork = chainId === '0x40d9' || chainId === '0x40E9'; // 0G Galileo Testnet (支持大小写)
  
  // 调试信息
  console.log('当前chainId:', chainId, '是否正确网络:', isCorrectNetwork);

  // 处理上传关卡数据
  const handleUploadLevels = async () => {
    if (!dungeonData?.levels) {
      return;
    }
    
    try {
      await uploadLevelsToContract(dungeonData.levels);
    } catch (error) {
      console.error('上传失败:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 页面标题 */}
        <div className="text-center space-y-2">
          <h1 className="nes-text is-primary text-4xl font-bold">Dungeon Management Panel</h1>
          <p className="text-gray-300">Upload level data to 0G testnet contract</p>
        </div>

        {/* MetaMask连接状态 */}
        <Card className="nes-container with-title bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Wallet className="w-5 h-5" />
              Wallet Connection Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isInstalled ? (
              <Alert className="nes-container is-error">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please install MetaMask wallet extension first
                </AlertDescription>
              </Alert>
            ) : !isConnected ? (
              <div className="space-y-4">
                <p className="text-gray-300">Please connect your MetaMask wallet</p>
                <Button 
                  onClick={connect} 
                  disabled={metaMaskLoading}
                  className="nes-btn is-primary"
                >
                  {metaMaskLoading ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Wallet Connected</span>
                </div>
                <p className="text-sm text-gray-300 break-all">
                  Address: {account}
                </p>
                
                {/* 网络状态 */}
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  <span>Network: </span>
                  <Badge 
                    variant={isCorrectNetwork ? "default" : "destructive"}
                    className={isCorrectNetwork ? "nes-badge is-success" : "nes-badge is-error"}
                  >
                    {isCorrectNetwork ? '0G-Galileo-Testnet' : '错误网络'}
                  </Badge>
                </div>
                
                {!isCorrectNetwork && (
                  <Button 
                    onClick={switchToZeroGTestnet}
                    disabled={metaMaskLoading}
                    className="nes-btn is-warning"
                  >
                    切换到0G测试网
                  </Button>
                )}
              </div>
            )}
            
            {metaMaskError && (
              <Alert className="nes-container is-error">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{metaMaskError}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* 合约配置 */}
        <Card className="nes-container with-title bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Settings className="w-5 h-5" />
              合约配置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                合约地址
              </label>
              <Input
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="输入合约地址 (0x...)"
                className="nes-input bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            {account && contractAddress && (
              <div className="flex items-center gap-2">
                <span className="text-sm">所有者权限: </span>
                <Badge 
                  variant={isOwner ? "default" : "destructive"}
                  className={isOwner ? "nes-badge is-success" : "nes-badge is-error"}
                >
                  {isOwner ? '已授权' : '未授权'}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 关卡数据信息 */}
        {dungeonData && (
          <Card className="nes-container with-title bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">关卡数据概览</CardTitle>
              <CardDescription className="text-gray-300">
                将要上传的地牢关卡数据
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="nes-container is-dark">
                  <p className="text-sm text-gray-400">总关卡数</p>
                  <p className="text-2xl font-bold text-white">
                    {dungeonData.levels?.length || 0}
                  </p>
                </div>
                <div className="nes-container is-dark">
                  <p className="text-sm text-gray-400">网格大小</p>
                  <p className="text-2xl font-bold text-white">
                    {dungeonData.metadata?.gridSize || 0}×{dungeonData.metadata?.gridSize || 0}
                  </p>
                </div>
                <div className="nes-container is-dark">
                  <p className="text-sm text-gray-400">宝物奖励</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {dungeonData.metadata?.rewards?.treasureDiamonds || 0} 💎
                  </p>
                </div>
                <div className="nes-container is-dark">
                  <p className="text-sm text-gray-400">宝箱奖励</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {dungeonData.metadata?.rewards?.chestDiamondsRange?.min || 0}-{dungeonData.metadata?.rewards?.chestDiamondsRange?.max || 0} 💎
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 上传操作 */}
        <Card className="nes-container with-title bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Upload className="w-5 h-5" />
              上传关卡数据
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isConnected || !isCorrectNetwork || !contractAddress || !isOwner ? (
              <Alert className="nes-container is-warning">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  请确保: 
                  {!isConnected && " ✗ 连接钱包"}
                  {!isCorrectNetwork && " ✗ 切换到0G测试网"}
                  {!contractAddress && " ✗ 设置合约地址"}
                  {!isOwner && contractAddress && " ✗ 获得合约所有者权限"}
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                <Button
                  onClick={handleUploadLevels}
                  disabled={contractLoading || !dungeonData?.levels}
                  className="nes-btn is-primary w-full"
                >
                  {contractLoading ? '上传中...' : `上传 ${dungeonData?.levels?.length || 0} 个关卡到合约`}
                </Button>
                
                {contractLoading && (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-sm text-center text-gray-300">
                      上传进度: {uploadProgress}%
                    </p>
                  </div>
                )}
                
                {lastTxHash && (
                  <div className="nes-container is-success">
                    <p className="text-sm">交易哈希:</p>
                    <a 
                      href={`https://chainscan-galileo.0g.ai/tx/${lastTxHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xs break-all"
                    >
                      {lastTxHash}
                    </a>
                  </div>
                )}
              </div>
            )}
            
            {contractError && (
              <Alert className="nes-container is-error">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{contractError}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* 底部说明 */}
        <div className="text-center text-sm text-gray-400 space-y-2">
          <p>⚠️ Uploading requires gas fees, please ensure your wallet has enough 0G tokens</p>
          <p>🔒 Only the contract owner can perform the upload operation</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
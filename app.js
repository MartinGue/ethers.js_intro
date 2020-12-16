require('dotenv').config()
const { ethers } = require('ethers')

const provider = ethers.getDefaultProvider('rinkeby')

const getBlockNumber = async () => {
  const blockNumber = await provider.getBlockNumber()
  console.log( 'Hear, hear this is BlockNumber: ', blockNumber)
}

getBlockNumber()



const WALLET = '0x8aa9085eC8119e01BcbF8Ad57853075104AF834e' // ADD YOUR WALLET ADDRESS HERE
let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
wallet = wallet.connect(provider)

const DAI_ADDRESS = '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea' // Rinkeby DAI address
const DAI_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint amount) returns (boolean)"
]

const dai = new ethers.Contract(DAI_ADDRESS, DAI_ABI, wallet)

const getDaiBalance = async () => {
  let balance = await dai.balanceOf(wallet.address)
  balance = ethers.utils.formatEther(balance)
  console.log(balance, 'First account DAI')
}

const getDaiBalance2 = async () => {
  const account = '0xa98450aE5197Af364F05eFA8528382Bbd785154f'
  let balance = await dai.balanceOf(account)  
  balance = ethers.utils.formatEther(balance)
  console.log(balance, 'Second account DAI')  
}

const sendDai = async () => {
  console.log('Balance before transfer')
  await getDaiBalance()
  await getDaiBalance2()
  const to = '0xa98450aE5197Af364F05eFA8528382Bbd785154f' // Add your 2nd wallet address here...
  const amount = ethers.utils.parseUnits('1.0', 18); // 1 Dai
  const tx = await dai.transfer(to, amount)
  console.log('Transferring, this can take a minute...')
  await tx.wait()
  await getBlockNumber()
  console.log('Dai Transferred!')
  await getDaiBalance()
  await getDaiBalance2()
  
}

sendDai()





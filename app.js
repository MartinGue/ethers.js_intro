require('dotenv').config()
const { ethers } = require('ethers')

const provider = ethers.getDefaultProvider('rinkeby')

const getBlockNumber = async () => {
  const blockNumber = await provider.getBlockNumber()
  console.log(blockNumber)
}

// getBlockNumber()

const getBalance = async () => {
  let balance = await provider.getBalance('0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9')
  balance = ethers.utils.formatEther(balance)
  console.log(balance, 'Ether')
}

// getBalance()

const WALLET = '0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9'
let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
wallet = wallet.connect(provider)

const DAI_ADDRESS = '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735' // Rinkeby DAI abi
const DAI_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint amount) returns (boolean)"
]

const dai = new ethers.Contract(DAI_ADDRESS, DAI_ABI, wallet)

const getDaiBalance = async () => {
  let balance = await dai.balanceOf(wallet.address)
  balance = ethers.utils.formatEther(balance)
  console.log(balance, 'DAI')
}

// getDaiBalance()

const sendDai = async () => {
  console.log('Balance before transfer')
  await getDaiBalance()
  const to = '0x33a75943Ca7Ed31C66199FE851AeaF0A758837E3'
  const amount = ethers.utils.parseUnits('1.0', 18); // 1 Dai
  const tx = await dai.transfer(to, amount)
  await tx.wait()
  console.log('Dai Transferred!')
  await getDaiBalance()
}

sendDai()

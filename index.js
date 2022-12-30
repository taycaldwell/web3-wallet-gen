const ethers = require('ethers')
const solanaWeb3 = require('@solana/web3.js');
const bip39 = require('bip39');
const ed = require('ed25519-hd-key');
const nacl= require('tweetnacl');

const uint8ToBase64 = (arr) => Buffer.from(arr).toString('base64');

function Keypair(publicKey, privateKey) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  
// Mnemonic
const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase

// Ethereum
const wallet = ethers.Wallet.fromMnemonic(mnemonic)

// Solana
let path = "m/44'/501'/0'/0'";
const seed = bip39.mnemonicToSeedSync(mnemonic); 
const derivedSeed = ed.derivePath(path, seed.toString('hex')).key;
const account = new solanaWeb3.Account(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey);
keypair = solanaWeb3.Keypair.fromSecretKey(account.secretKey);

// Output
console.log('Secret phrase (12 words)')
console.table({mnemonic})
console.log('Ethereum wallet')
console.table(new Keypair(wallet.address, wallet.privateKey))
console.log('Solana wallet')
console.table(new Keypair(keypair.publicKey.toString(), uint8ToBase64(keypair.secretKey)))
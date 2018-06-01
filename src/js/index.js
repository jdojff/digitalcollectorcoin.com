import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import './../scss/app.scss';
import InlineSVG from 'svg-inline-react';

class App extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         tokensCount: 0,
         totalSupply: 0,
         name: 'No name',
         symbol: 'xXx',
         currentRound : 0,
         lastBlockNumberInRound: 0,
         blockNumber: 0,
         blocksPerRound: 0,
         title: '',
          image: 'super example',
      }

      if(typeof web3 != 'undefined'){
         console.log("Using web3 detected from external source like Metamask")
         this.web3 = new Web3(web3.currentProvider)
      }else{
         console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
         this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
      }
	  //
      // const MyContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"resume","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint64"}],"name":"reward","outputs":[{"name":"roundNumber","type":"uint64"},{"name":"rewardInWei","type":"uint256"},{"name":"rewardRate","type":"uint256"},{"name":"isConfigured","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_roundNumber","type":"uint64"},{"name":"_roundRewardInWei","type":"uint256"}],"name":"setReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"},{"name":"_round","type":"uint64"}],"name":"isModifiedInRound","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"},{"name":"_claimTillRound","type":"uint64"}],"name":"calculateClaimableRewardTillRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newBlocksPerRound","type":"uint64"}],"name":"setBlocksPerRound","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newContractOwner","type":"address"}],"name":"changeContractOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_tokenAmount","type":"uint256"}],"name":"issueTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newIssueManager","type":"address"}],"name":"changeIssueManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"blocksPerRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"accountBalances","outputs":[{"name":"addressBalance","type":"uint256"},{"name":"claimedRewardTillRound","type":"uint64"},{"name":"totalClaimedReward","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"maxRounds","type":"uint256"}],"name":"createRounds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_claimTillRound","type":"uint64"}],"name":"claimRewardTillRound","outputs":[{"name":"rewardAmountInWei","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"currentRound","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"},{"name":"_round","type":"uint256"}],"name":"getRoundBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"calculateClaimableReward","outputs":[{"name":"rewardAmountInWei","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[],"name":"claimReward","outputs":[{"name":"rewardAmountInWei","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"tokenFallback","outputs":[],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newRoundManager","type":"address"}],"name":"changeRoundManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getBalanceModificationRounds","outputs":[{"name":"","type":"uint64[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_newRewardManager","type":"address"}],"name":"changeRewardManager","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"},{"name":"_custom_fallback","type":"string"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastBlockNumberInRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint64"}],"name":"issuedTokensInRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_blocksPerRound","type":"uint256"},{"name":"_round","type":"uint64"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]);
      // this.state.ContractInstance = MyContract.at("0xC80c5E40220172B36aDee2c951f26F2a577810C5")

       const MyContract = web3.eth.contract(
           [
               {
                   "constant": false,
                   "inputs": [
                       {
                           "name": "_to",
                           "type": "address"
                       },
                       {
                           "name": "_tokenId",
                           "type": "uint256"
                       }
                   ],
                   "name": "approve",
                   "outputs": [],
                   "payable": false,
                   "stateMutability": "nonpayable",
                   "type": "function"
               },
               {
                   "constant": false,
                   "inputs": [
                       {
                           "name": "_owner",
                           "type": "address"
                       },
                       {
                           "name": "_tokenId",
                           "type": "uint256"
                       }
                   ],
                   "name": "burn",
                   "outputs": [],
                   "payable": false,
                   "stateMutability": "nonpayable",
                   "type": "function"
               },
               {
                   "constant": false,
                   "inputs": [
                       {
                           "name": "_newContractManager",
                           "type": "address"
                       }
                   ],
                   "name": "changeContractManager",
                   "outputs": [],
                   "payable": false,
                   "stateMutability": "nonpayable",
                   "type": "function"
               },
               {
                   "constant": false,
                   "inputs": [
                       {
                           "name": "_to",
                           "type": "address"
                       },
                       {
                           "name": "_tokenId",
                           "type": "uint256"
                       }
                   ],
                   "name": "mint",
                   "outputs": [],
                   "payable": false,
                   "stateMutability": "nonpayable",
                   "type": "function"
               },
               {
                   "constant": false,
                   "inputs": [
                       {
                           "name": "_from",
                           "type": "address"
                       },
                       {
                           "name": "_to",
                           "type": "address"
                       },
                       {
                           "name": "_tokenId",
                           "type": "uint256"
                       }
                   ],
                   "name": "safeTransferFrom",
                   "outputs": [],
                   "payable": false,
                   "stateMutability": "nonpayable",
                   "type": "function"
               },
               {
                   "constant": false,
                   "inputs": [
                       {
                           "name": "_from",
                           "type": "address"
                       },
                       {
                           "name": "_to",
                           "type": "address"
                       },
                       {
                           "name": "_tokenId",
                           "type": "uint256"
                       },
                       {
                           "name": "_data",
                           "type": "bytes"
                       }
                   ],
                   "name": "safeTransferFrom",
                   "outputs": [],
                   "payable": false,
                   "stateMutability": "nonpayable",
                   "type": "function"
               },
               {
                   "constant": false,
                   "inputs": [
                       {
                           "name": "_to",
                           "type": "address"
                       },
                       {
                           "name": "_approved",
                           "type": "bool"
                       }
                   ],
                   "name": "setApprovalForAll",
                   "outputs": [],
                   "payable": false,
                   "stateMutability": "nonpayable",
                   "type": "function"
               },
               {
                   "constant": false,
                   "inputs": [
                       {
                           "name": "_tokenId",
                           "type": "uint256"
                       },
                       {
                           "name": "_uri",
                           "type": "string"
                       }
                   ],
                   "name": "setTokenURI",
                   "outputs": [],
                   "payable": false,
                   "stateMutability": "nonpayable",
                   "type": "function"
               },
               {
                   "anonymous": false,
                   "inputs": [
                       {
                           "indexed": true,
                           "name": "_from",
                           "type": "address"
                       },
                       {
                           "indexed": true,
                           "name": "_to",
                           "type": "address"
                       },
                       {
                           "indexed": false,
                           "name": "_tokenId",
                           "type": "uint256"
                       }
                   ],
                   "name": "Transfer",
                   "type": "event"
               },
               {
                   "anonymous": false,
                   "inputs": [
                       {
                           "indexed": true,
                           "name": "_owner",
                           "type": "address"
                       },
                       {
                           "indexed": true,
                           "name": "_approved",
                           "type": "address"
                       },
                       {
                           "indexed": false,
                           "name": "_tokenId",
                           "type": "uint256"
                       }
                   ],
                   "name": "Approval",
                   "type": "event"
               },
               {
                   "anonymous": false,
                   "inputs": [
                       {
                           "indexed": true,
                           "name": "_owner",
                           "type": "address"
                       },
                       {
                           "indexed": true,
                           "name": "_operator",
                           "type": "address"
                       },
                       {
                           "indexed": false,
                           "name": "_approved",
                           "type": "bool"
                       }
                   ],
                   "name": "ApprovalForAll",
                   "type": "event"
               },
               {
                   "constant": false,
                   "inputs": [
                       {
                           "name": "_from",
                           "type": "address"
                       },
                       {
                           "name": "_to",
                           "type": "address"
                       },
                       {
                           "name": "_tokenId",
                           "type": "uint256"
                       }
                   ],
                   "name": "transferFrom",
                   "outputs": [],
                   "payable": false,
                   "stateMutability": "nonpayable",
                   "type": "function"
               },
               {
                   "inputs": [
                       {
                           "name": "_name",
                           "type": "string"
                       },
                       {
                           "name": "_symbol",
                           "type": "string"
                       }
                   ],
                   "payable": false,
                   "stateMutability": "nonpayable",
                   "type": "constructor"
               },
               {
                   "constant": true,
                   "inputs": [
                       {
                           "name": "_owner",
                           "type": "address"
                       }
                   ],
                   "name": "balanceOf",
                   "outputs": [
                       {
                           "name": "",
                           "type": "uint256"
                       }
                   ],
                   "payable": false,
                   "stateMutability": "view",
                   "type": "function"
               },
               {
                   "constant": true,
                   "inputs": [
                       {
                           "name": "_tokenId",
                           "type": "uint256"
                       }
                   ],
                   "name": "exists",
                   "outputs": [
                       {
                           "name": "",
                           "type": "bool"
                       }
                   ],
                   "payable": false,
                   "stateMutability": "view",
                   "type": "function"
               },
               {
                   "constant": true,
                   "inputs": [
                       {
                           "name": "_tokenId",
                           "type": "uint256"
                       }
                   ],
                   "name": "getApproved",
                   "outputs": [
                       {
                           "name": "",
                           "type": "address"
                       }
                   ],
                   "payable": false,
                   "stateMutability": "view",
                   "type": "function"
               },
               {
                   "constant": true,
                   "inputs": [
                       {
                           "name": "_owner",
                           "type": "address"
                       },
                       {
                           "name": "_operator",
                           "type": "address"
                       }
                   ],
                   "name": "isApprovedForAll",
                   "outputs": [
                       {
                           "name": "",
                           "type": "bool"
                       }
                   ],
                   "payable": false,
                   "stateMutability": "view",
                   "type": "function"
               },
               {
                   "constant": true,
                   "inputs": [],
                   "name": "name",
                   "outputs": [
                       {
                           "name": "",
                           "type": "string"
                       }
                   ],
                   "payable": false,
                   "stateMutability": "view",
                   "type": "function"
               },
               {
                   "constant": true,
                   "inputs": [
                       {
                           "name": "_tokenId",
                           "type": "uint256"
                       }
                   ],
                   "name": "ownerOf",
                   "outputs": [
                       {
                           "name": "",
                           "type": "address"
                       }
                   ],
                   "payable": false,
                   "stateMutability": "view",
                   "type": "function"
               },
               {
                   "constant": true,
                   "inputs": [],
                   "name": "symbol",
                   "outputs": [
                       {
                           "name": "",
                           "type": "string"
                       }
                   ],
                   "payable": false,
                   "stateMutability": "view",
                   "type": "function"
               },
               {
                   "constant": true,
                   "inputs": [
                       {
                           "name": "_index",
                           "type": "uint256"
                       }
                   ],
                   "name": "tokenByIndex",
                   "outputs": [
                       {
                           "name": "",
                           "type": "uint256"
                       }
                   ],
                   "payable": false,
                   "stateMutability": "view",
                   "type": "function"
               },
               {
                   "constant": true,
                   "inputs": [
                       {
                           "name": "_owner",
                           "type": "address"
                       },
                       {
                           "name": "_index",
                           "type": "uint256"
                       }
                   ],
                   "name": "tokenOfOwnerByIndex",
                   "outputs": [
                       {
                           "name": "",
                           "type": "uint256"
                       }
                   ],
                   "payable": false,
                   "stateMutability": "view",
                   "type": "function"
               },
               {
                   "constant": true,
                   "inputs": [
                       {
                           "name": "_tokenId",
                           "type": "uint256"
                       }
                   ],
                   "name": "tokenURI",
                   "outputs": [
                       {
                           "name": "",
                           "type": "string"
                       }
                   ],
                   "payable": false,
                   "stateMutability": "view",
                   "type": "function"
               },
               {
                   "constant": true,
                   "inputs": [],
                   "name": "totalSupply",
                   "outputs": [
                       {
                           "name": "",
                           "type": "uint256"
                       }
                   ],
                   "payable": false,
                   "stateMutability": "view",
                   "type": "function"
               }
           ]
           );
       this.state.ContractInstance = MyContract.at("0x2E719d4D74fcd2c7214882fbe88d5970Baed30c5")
       window.a = this.state
   }

   componentDidMount(){
       this.updateState()
      //this.setupListeners()

      // setInterval(this.updateState.bind(this), 7e3)
   }

    updateState(){

        this.state.ContractInstance.tokenURI(101,(err, result) => {
           console.log("sssss: " + result);
           if(result != null){
               let r =window.atob(result);
               //let b = new Buffer(result, 'base64');
               //let s = b.toString();
              this.setState({
                 image: r
              })
           }
        })

   //
   //    this.state.ContractInstance.balanceOf(web3.eth.accounts[0], (err, result) => {
   //       console.log(web3.eth.accounts[0]);
   //       if(result != null){
   //          this.setState({
   //             tokensCount: parseInt(result)
   //          })
   //       }
   //    })
   //
   //    this.state.ContractInstance.totalSupply((err, result) => {
   //       if(result != null){
   //          this.setState({
   //             totalSupply: parseInt(result)
   //          })
   //       }
   //    })
   //
   //    this.state.ContractInstance.name((err, result) => {
   //       if(result != null){
   //          this.setState({
   //             name: result
   //          })
   //       }
   //    })
   //
   //    this.state.ContractInstance.symbol((err, result) => {
   //       if(result != null){
   //          this.setState({
   //             symbol: result
   //          })
   //       }
   //    })
   //
   //    this.state.ContractInstance.currentRound((err, result) => {
   //       if(result != null){
   //          this.setState({
   //             currentRound: parseInt(result)
   //          })
   //       }
   //    })
   //
   //    this.state.ContractInstance.lastBlockNumberInRound((err, result) => {
   //       if(result != null){
   //          this.setState({
   //             lastBlockNumberInRound: parseInt(result)
   //          })
   //       }
   //    })
   //
   //   this.state.ContractInstance.blocksPerRound((err, result) => {
   //       if(result != null){
   //          this.setState({
   //             blocksPerRound: parseInt(result)
   //          })
   //       }
   //    })
   //
   //    this.web3.eth.getBlockNumber((err, result) => {
   //       if(result != null){
   //          this.setState({
   //             blockNumber: parseInt(result)
   //          })
   //       }
   //    })
   //
   //    //example
   //    /*this.state.ContractInstance.minimumBet((err, result) => {
   //       if(result != null){
   //          this.setState({
   //             minimumBet: parseFloat(web3.fromWei(result, 'ether'))
   //          })
   //       }
   //    })
   //    this.state.ContractInstance.totalBet((err, result) => {
   //       if(result != null){
   //          this.setState({
   //             totalBet: parseFloat(web3.fromWei(result, 'ether'))
   //          })
   //       }
   //    })
   //    this.state.ContractInstance.numberOfBets((err, result) => {
   //       if(result != null){
   //          this.setState({
   //             numberOfBets: parseInt(result)
   //          })
   //       }
   //    })
   //    this.state.ContractInstance.maxAmountOfBets((err, result) => {
   //       if(result != null){
   //          this.setState({
   //             maxAmountOfBets: parseInt(result)
   //          })
   //       }
   //    })*/
    }

   // Listen for events and executes the voteNumber method
/*   setupListeners(){
      let liNodes = this.refs.numbers.querySelectorAll('li')
      liNodes.forEach(number => {
         number.addEventListener('click', event => {
            event.target.className = 'number-selected'
            this.voteNumber(parseInt(event.target.innerHTML), done => {

               // Remove the other number selected
               for(let i = 0; i < liNodes.length; i++){
                  liNodes[i].className = ''
               }
            })
         })
      })
   }*/

   // voteNumber(number, cb){
   //    let bet = this.refs['ether-bet'].value
   //
   //    if(!bet) bet = 0.1
   //
   //    if(parseFloat(bet) < this.state.minimumBet){
   //       alert('You must bet more than the minimum')
   //       cb()
   //    } else {
   //       this.state.ContractInstance.bet(number, {
   //          gas: 300000,
   //          from: web3.eth.accounts[0],
   //          value: web3.toWei(bet, 'ether')
   //       }, (err, result) => {
   //          cb()
   //       })
   //    }
   // }

   getRewardInfoForRound(roundNumber, cb){
      //todo: get number from input field
      if(roundNumber < 0){
         alert('You must enter positive number')
         cb()
      } else {
         this.state.ContractInstance.reward(roundNumber, (err, result) => {
            cb(result)
         })
      }
   }

   handleChange(event) {
      this.getRewardInfoForRound(event.target.value, data => {
         console.log("Response from contract: ");
         for (var i = 0; i < data.length; i++) { 
            console.log(i + " - " + data[i]);
         }
      });
   }

   render(){
      return (
          //<div className="row"><img src={this.state.image}/></div>
          <div className="row"><InlineSVG src={this.state.image}/></div>
      )
   }
}

export default () => {
	ReactDOM.render(
		<App />,
		document.querySelector('#root')
	)
}


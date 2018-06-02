import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import './../scss/app.scss';
import InlineSVG from 'svg-inline-react';
import TokenMeta from "./TokenMeta";
import BigNumber from 'bignumber.js'

class App extends React.Component {

    _isMounted = false;

   constructor(props){
      super(props)
      this.state = {
          tokens: [],
          ContractInstance: {},
      }

      if(typeof web3 != 'undefined'){
         console.log("Using web3 detected from external source like Metamask")
         this.web3 = new Web3(web3.currentProvider)
      }else{
         console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
         this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
      }
       const MyContract = web3.eth.contract([
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
                   },
                   {
                       "name": "_serialNumber",
                       "type": "string"
                   },
                   {
                       "name": "_cityName",
                       "type": "string"
                   },
                   {
                       "name": "_image",
                       "type": "string"
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
               "inputs": [],
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
                       "name": "_address",
                       "type": "address"
                   }
               ],
               "name": "getOwnedTokens",
               "outputs": [
                   {
                       "name": "",
                       "type": "uint256[]"
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
               "inputs": [
                   {
                       "name": "",
                       "type": "uint256"
                   }
               ],
               "name": "metaInfos",
               "outputs": [
                   {
                       "name": "tokenId",
                       "type": "uint256"
                   },
                   {
                       "name": "serialNumber",
                       "type": "string"
                   },
                   {
                       "name": "denomination",
                       "type": "uint8"
                   },
                   {
                       "name": "cityName",
                       "type": "string"
                   },
                   {
                       "name": "image",
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
           }]);

       this.state.ContractInstance = MyContract.at("0x1545ab27fdadf6c57fefa3bbd0f7ed0a981ee01d")
       window.a = this.state
   }

   componentDidMount(){
       this._isMounted = true;
       Promise.all([this.updateState()]).then(() => {

       });
      //this.setupListeners()

      // setInterval(this.updateState.bind(this), 7e3)
   }

   componentWillUnmount() {
       this._isMounted = false;
   }

    updateState = () => new Promise((resolve, reject) => {

        new Promise((resolve, reject) => {
            this.state.ContractInstance.getOwnedTokens("0x1245bd304ed9c70c1b7a89f7619e7e53a78850bd", (err, result) => {
                console.log("Owned token ids: " + result);
                resolve(result);
            });
        }).then((result) => {
            if(result == null) return;
            let promises = result.map(id => new Promise((resolve, reject) => {
                console.log("Searching meta info for id " + id);
                this.state.ContractInstance.metaInfos(id, (err, result) => {
                    resolve(new TokenMeta(result[0], result[1], result[2], result[3], result[4]));
                });
            }));
            Promise.all(promises).then(infos => {
                console.log("All token metadata found.");
                this.state.tokens = infos;
            });
        });
    });

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


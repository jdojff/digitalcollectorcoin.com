import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import InlineSVG from 'svg-inline-react';
import dccLogo from './../img/dcclogo.svg';
import coinGroup from './../img/coinGroup.svg';
import metaMaskLogo from './../img/metamasklogo.svg';
import './../scss/app.scss';

class Market extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props)
		this.state = {
			tokensCount: 0,
			totalSupply: 0,
			name: 'No name',
			symbol: 'xXx',
			currentRound: 0,
			lastBlockNumberInRound: 0,
			blockNumber: 0,
			blocksPerRound: 0,
			title: '',
			image: 'super example'
		}

		if (typeof web3 != 'undefined') {
			console.log("Using web3 detected from external source like Metamask");
			this.web3 = new Web3(web3.currentProvider);
		} else {
			console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
			this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		}

		const MyContract = web3.eth.contract([
			{
				"constant": false,
				"inputs": [
					{
						"name": "_to",
						"type": "address"
					}, {
						"name": "_tokenId",
						"type": "uint256"
					}
				],
				"name": "approve",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"constant": false,
				"inputs": [
					{
						"name": "_owner",
						"type": "address"
					}, {
						"name": "_tokenId",
						"type": "uint256"
					}
				],
				"name": "burn",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
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
			}, {
				"constant": false,
				"inputs": [
					{
						"name": "_to",
						"type": "address"
					}, {
						"name": "_tokenId",
						"type": "uint256"
					}
				],
				"name": "mint",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"constant": false,
				"inputs": [
					{
						"name": "_from",
						"type": "address"
					}, {
						"name": "_to",
						"type": "address"
					}, {
						"name": "_tokenId",
						"type": "uint256"
					}
				],
				"name": "safeTransferFrom",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"constant": false,
				"inputs": [
					{
						"name": "_from",
						"type": "address"
					}, {
						"name": "_to",
						"type": "address"
					}, {
						"name": "_tokenId",
						"type": "uint256"
					}, {
						"name": "_data",
						"type": "bytes"
					}
				],
				"name": "safeTransferFrom",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"constant": false,
				"inputs": [
					{
						"name": "_to",
						"type": "address"
					}, {
						"name": "_approved",
						"type": "bool"
					}
				],
				"name": "setApprovalForAll",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"constant": false,
				"inputs": [
					{
						"name": "_tokenId",
						"type": "uint256"
					}, {
						"name": "_uri",
						"type": "string"
					}
				],
				"name": "setTokenURI",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"name": "_from",
						"type": "address"
					}, {
						"indexed": true,
						"name": "_to",
						"type": "address"
					}, {
						"indexed": false,
						"name": "_tokenId",
						"type": "uint256"
					}
				],
				"name": "Transfer",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"name": "_owner",
						"type": "address"
					}, {
						"indexed": true,
						"name": "_approved",
						"type": "address"
					}, {
						"indexed": false,
						"name": "_tokenId",
						"type": "uint256"
					}
				],
				"name": "Approval",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"name": "_owner",
						"type": "address"
					}, {
						"indexed": true,
						"name": "_operator",
						"type": "address"
					}, {
						"indexed": false,
						"name": "_approved",
						"type": "bool"
					}
				],
				"name": "ApprovalForAll",
				"type": "event"
			}, {
				"constant": false,
				"inputs": [
					{
						"name": "_from",
						"type": "address"
					}, {
						"name": "_to",
						"type": "address"
					}, {
						"name": "_tokenId",
						"type": "uint256"
					}
				],
				"name": "transferFrom",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			}, {
				"inputs": [
					{
						"name": "_name",
						"type": "string"
					}, {
						"name": "_symbol",
						"type": "string"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "constructor"
			}, {
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
			}, {
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
			}, {
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
			}, {
				"constant": true,
				"inputs": [
					{
						"name": "_owner",
						"type": "address"
					}, {
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
			}, {
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
			}, {
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
			}, {
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
			}, {
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
			}, {
				"constant": true,
				"inputs": [
					{
						"name": "_owner",
						"type": "address"
					}, {
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
			}, {
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
			}, {
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
		]);
		this.state.ContractInstance = MyContract.at("0x2E719d4D74fcd2c7214882fbe88d5970Baed30c5");
		window.a = this.state;
	}

	componentDidMount() {
		this._isMounted = true;
		Promise.all([this.updateState()]).then(() => {

		});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	updateState = () =>
		new Promise((resolve, reject) => {
			this.state.ContractInstance.tokenURI(101, (err, result) => {
				if (result !== null && this._isMounted) {
					let imageSrc = window.atob(result);
					this.setState({
						image: imageSrc
					});
				}
			});
		});

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6 leftSide">
						<div className="logo">
							<InlineSVG src={dccLogo} />
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
						<button>Dalyvauti</button>
					</div>
					<div className="col-lg-6 bg-blue">
						<InlineSVG src={coinGroup} />
					</div>
				</div>
				<div className="row bg-grey">
					<div className="col-lg-6 leftSide">
						<h3>HOW TO BECOME A DIGITAL COLLECTOR</h3>
						<p className="fz22">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					</div>
					<div className="col-lg-6 tac">
						<div className="metaMaskLogo">
							<InlineSVG src={metaMaskLogo} />
						</div>
						<button>Get "MetaMask"</button>
					</div>
				</div>
				<div className="footer">
					<div className="row bg-grey">
						<div className="col-xs-12 leftSide">
							<p>2018 Copyright</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default() => {
	ReactDOM.render(<Market />, document.querySelector('#root'))
}

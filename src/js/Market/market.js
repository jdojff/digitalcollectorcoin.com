import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import InlineSVG from 'svg-inline-react';
import dccLogo from './../../img/dcclogo.svg';
import coin from './../../img/coin10.svg';

//SCSS
import './Market.scss';

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
			<div className="container-fluid bg-blue">
				<div className="row">
					<div className="col-lg-3 bg-white">
						<div className="sidebar">
							<div className="logo">
								<InlineSVG src={dccLogo}/>
							</div>
							<ul>
								<li>
									<a>
										Marketplace
									</a>
								</li>
								<li>
									<a>
										Your collection
									</a>
								</li>
								<li>
									<a>
										Wishlist
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-lg-9">
						<div className="dashboard">
							<h4>Marketplace</h4>
							<ul>
								<li>
									<a className="active">
										All Coins
									</a>
								</li>
								<li>
									<a>
										City Coins
									</a>
								</li>
								<li>
									<a>
										Region Coins
									</a>
								</li>
							</ul>
							<div className="market">
								<div className="row">
									<div className="col-lg-3 col-md-4">
										<div className="coinBox">
											<div className="iconContainer">
												<InlineSVG src={coin} />
											</div>
											<div className="desc">
												Monetos pavadinimas
											</div>
											<div className="price">
												50 Eur
											</div>
											<a className="buyButton">Buy</a>
										</div>
									</div>
									<div className="col-lg-3 col-md-4">
										<div className="coinBox">
											<div className="iconContainer">
												<InlineSVG src={coin} />
											</div>
											<div className="desc">
												Monetos pavadinimas
											</div>
											<div className="price">
												50 Eur
											</div>
											<a className="buyButton">Buy</a>
										</div>
									</div>
									<div className="col-lg-3 col-md-4">
										<div className="coinBox">
											<div className="iconContainer">
												<InlineSVG src={coin} />
											</div>
											<div className="desc">
												Monetos pavadinimas
											</div>
											<div className="price">
												50 Eur
											</div>
											<a className="buyButton">Buy</a>
										</div>
									</div>
									<div className="col-lg-3 col-md-4">
										<div className="coinBox">
											<div className="iconContainer">
												<InlineSVG src={coin} />
											</div>
											<div className="desc">
												Monetos pavadinimas
											</div>
											<div className="price">
												50 Eur
											</div>
											<a className="buyButton">Buy</a>
										</div>
									</div>
									<div className="col-lg-3 col-md-4">
										<div className="coinBox">
											<div className="iconContainer">
												<InlineSVG src={coin} />
											</div>
											<div className="desc">
												Monetos pavadinimas
											</div>
											<div className="price">
												50 Eur
											</div>
											<a className="buyButton">Buy</a>
										</div>
									</div>
								</div>
							</div>
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

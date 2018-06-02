import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import InlineSVG from 'svg-inline-react';
import dccLogo from './../../img/dcclogo.svg';
import coin from './../../img/coin10.svg'
import TokenMeta from "../TokenMeta";
import abi from "../abi";

//data
import Regions from './../regions.json';

//SCSS
import './Market.scss';

class Market extends React.Component {
	_isMounted = false;

	constructor(props) {
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
        const MyContract = web3.eth.contract(abi);

        this.state.ContractInstance = MyContract.at("0x1545ab27fdadf6c57fefa3bbd0f7ed0a981ee01d");
        window.a = this.state
	}

	componentDidMount() {
		this._isMounted = true;
		Promise.all([
			this.getTokensByAddress(web3.eth.accounts[0]),
			this.updateState(),
			this.getRegions()
		]).then(() => {

		});
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	updateState = () =>
		new Promise((resolve, reject) => {

		});

	getTokensByAddress = address =>
        new Promise((resolve, reject) => {
        	if(!address) {
        		resolve([]);
        		return;
            }
            this.state.ContractInstance.getOwnedTokens(address, (err, result) => {
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

	getRegions = () => {
		if (this._isMounted) {
			let regions = Regions.regions.map(region => Object({
				name: region.name,
				children: region.children,
				imageFull: window.atob(region.imageFull),
				imagePlaceholder: window.atob(region.imagePlaceholder)
			}));
			let cities = Regions.cities.map(city => Object({
				name: city.name,
				imageFull: window.atob(city.imageFull),
				imagePlaceholder: window.atob(city.imagePlaceholder)
			}));
			this.setState({regions: regions, cities: cities})
		}
	};

	render() {

		if (this._isMounted) {
			return (<div className="container-fluid bg-blue">
				<div className="row nm">
					<div className="col-lg-3 np bg-white">
						<div className="sidebar">
							<div className="logo">
								<InlineSVG src={dccLogo}/>
							</div>
							<ul>
								<li>
									<a href="market.html">Marketplace</a>
								</li>
								<li>
									<a href="collection.html">Your collection</a>
								</li>
								<li>
									<a>
										Wishlist
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-lg-9 np">
						<div className="dashboard">
							<h4>Marketplace</h4>
							<div className="market">
								<div className="container">
									<div className="row">
										<div className="col-lg-3 col-md-4">
											<div className="coinBox">
												<div className="iconContainer">
													<InlineSVG src={this.state.cities[0].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[0].name}
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
													<InlineSVG src={this.state.cities[1].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[1].name}
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
													<InlineSVG src={this.state.cities[2].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[2].name}
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
													<InlineSVG src={this.state.cities[3].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[3].name}
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
													<InlineSVG src={this.state.cities[4].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[4].name}
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
													<InlineSVG src={this.state.cities[0].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[0].name}
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
													<InlineSVG src={this.state.cities[1].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[1].name}
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
													<InlineSVG src={this.state.cities[2].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[2].name}
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
													<InlineSVG src={this.state.cities[3].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[3].name}
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
													<InlineSVG src={this.state.cities[4].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[4].name}
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
													<InlineSVG src={this.state.cities[0].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[0].name}
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
													<InlineSVG src={this.state.cities[1].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[1].name}
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
													<InlineSVG src={this.state.cities[2].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[2].name}
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
													<InlineSVG src={this.state.cities[3].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[3].name}
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
													<InlineSVG src={this.state.cities[4].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[4].name}
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
													<InlineSVG src={this.state.cities[0].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[0].name}
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
													<InlineSVG src={this.state.cities[1].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[1].name}
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
													<InlineSVG src={this.state.cities[2].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[2].name}
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
													<InlineSVG src={this.state.cities[3].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[3].name}
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
													<InlineSVG src={this.state.cities[4].imageFull}/>
												</div>
												<div className="desc">
													{this.state.cities[4].name}
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
			</div>)
		}
		return null;
	}
}

export default() => {
	ReactDOM.render(<Market/>, document.querySelector('#root'))
}

import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import InlineSVG from 'svg-inline-react';
import dccLogo from './../../img/dcclogo.svg';
import coin from './../../img/coin10.svg'
import TokenMeta from "../TokenMeta";
import abi from "../abi";

//DATA
import Regions from './../regions.json';

//SCSS
import './Collection.scss';

class Collection extends React.Component {
	_isMounted = false;

	constructor(props) {
        super(props);
        this.state = {
            tokens: [],
            ContractInstance: {},
        };

        if(typeof web3 !== 'undefined'){
            console.log("Using web3 detected from external source like Metamask");
            this.web3 = new Web3(web3.currentProvider)
        }else{
            let defaultUrl = "https://ropsten.infura.io/71ukfYiWPi14YO5MJDgu";
            console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
            console.log("Connect to default url: " + defaultUrl );
            this.web3 = new Web3(new Web3.providers.HttpProvider(defaultUrl))
        }
        let MyContract = null;
        try {
            MyContract = this.web3.eth.contract(abi);
        } catch (e) {
            console.log("Ups an error occurred: ", e);
        }

        this.state.ContractInstance = !MyContract ? null : MyContract.at("0xD83D90A35B2F22dbB72a0f56DF04594df42021c1");
        window.a = this.state
	}

    componentDidMount() {
        this._isMounted = true;

        let url = new URL(window.location.href);
        let address = url.searchParams.get("address");
        if(!address) {
            address = !!this.state.ContractInstance ? this.web3.eth.accounts[0] : null;
        }

        Promise.all([
            this.getTokensByAddress(address),
            this.updateState(),
            this.getRegions()
        ]).then(() => {

        });
    }

	componentWillUnmount() {
		this._isMounted = false;
	}

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
                    let meta = new TokenMeta(result[0], result[1], result[2], result[3], result[4]);
                    console.log(meta);
                    resolve(meta);
                });
            }));
            Promise.all(promises).then(infos => {
                console.log("All token metadata found.");
                this.setState({tokens: infos});
            });
        });

    updateState = () =>
        new Promise((resolve, reject) => {

        });

    hasToken = name => {
    	return !!this.state.tokens.find(token => token.cityName === name)
			|| !!this.state.regions.find(region => region.name === name && region.children.every(child => !!this.state.tokens.find(token => token.name === child.name)));
	};

	getTokenRegions = () =>
		new Promise((resolve, reject) => {
			const lithuaniaId = 1;
			this.state.ContractInstance.countries(lithuaniaId, (err, result) => {
				this.state.tokenRegions = result.regions;
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
			this.setState({regions: regions, cities: cities});
			console.log("done");
		}
	};

	render() {

		if (this._isMounted) {
			return (
				<div className="container-fluid bg-blue">
					<div className="row nm">
						<div className="col-lg-3 np bg-white">
							<div className="sidebar">
								<div className="logo">
									<a href="index.html"><InlineSVG src={dccLogo}/></a>
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
								<h4>Your Collection</h4>
									<ul>
										<li>
											<a href="collection.html" className="active">City Coins</a>
										</li>
										<li>
											<a href="collectionMap.html">Map View</a>
										</li>
									</ul>
								<div className="achievments">
									<div className="container">
										<div className="row">
											<div className="col-lg-1"></div>
                                           <AllRegionsComponent regions={this.state.regions}/>
										</div>
									</div>
								</div>
								<div className="market">
									<AllCitiesComponent cities={this.state.cities}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
		return null;
	}
}

let AllRegionsComponent = React.createClass({
    render() {
        console.log("Rendering all regions component");
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-1"></div>
                    {
                        this.props.regions.map(function (region) {
                            return (
                                <div className="col-lg-2">
                                    <div className="achievment">
                                        <div className="iconAchievment">
                                            <InlineSVG src={region.imagePlaceholder}/>
                                        </div>
                                        <div className="achievmentName">
                                            {region.name}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
});

let AllCitiesComponent = React.createClass({
    render() {
        console.log("Rendering all cities component");
        return (
            <div className="container">
                <div className="row">
                    {
                        this.props.cities.map(function (city) {
                            return (
								<div className="col-lg-3 col-md-4">
									<div className="coinBox">
										<div className="iconContainer">
											/*todo: need to fix*/
											{/*this.hasToken(city.name) ? (
												<InlineSVG src={city.imageFull}/>
											) : */(
												<InlineSVG src={city.imagePlaceholder}/>
											)}
										</div>
										<div className="desc">
											{city.name}
										</div>
										<div className="price">
											50 Eur
										</div>
										<a className="buyButton">Buy</a>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		)
    }
});

export default() => {
	ReactDOM.render(<Collection />, document.querySelector('#root'));
}

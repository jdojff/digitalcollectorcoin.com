import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import InlineSVG from 'svg-inline-react';
import dccLogo from './../../img/dcclogo.svg';
import coin from './../../img/coin10.svg'
import regionMap from './../../img/regionMap.svg'
import TokenMeta from "../TokenMeta";
import abi from "../abi";


//SCSS
import './CollectionMap.scss';

class CollectionMap extends React.Component {
	_isMounted = false;

	constructor(props) {
        super(props)
        this.state = {
        }


        window.a = this.state
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

		});

	render() {
		return (
			<div className="container-fluid bg-blue">
				<div className="row">
					<div className="col-lg-3 bg-white">
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
					<div className="col-lg-9">
						<div className="dashboard">
							<h4>Your Collection</h4>
							<ul>
								<li>
									<a href="collection.html">City Coins</a>
								</li>
								<li>
									<a href="collectionMap.html" className="active">Map View</a>
								</li>
							</ul>
							<div className="collection-map">
								<div className="row align-items-center justify-content-center">
									<div className="col-lg-8 col-md-6 centered">
										<InlineSVG src={regionMap} />
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
	ReactDOM.render(<CollectionMap />, document.querySelector('#root'))
}

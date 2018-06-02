import React from 'react';
import ReactDOM from 'react-dom';
import InlineSVG from 'svg-inline-react';
import dccLogo from './../../img/dcclogo.svg';
import header from './../../img/header.svg';
import metaMaskLogo from './../../img/metamasklogo.svg';

//SCSS
import './Landing.scss';

class Landing extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props)
		this.state = {
			ethAddress: '0x1245bD304ed9C70C1B7A89F7619E7E53A78850Bd'
		}
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleChange(event) {
		this.setState({ethAddress: event.target.value})
	}

	render() {
		return (
			<div className="container-fluid padding50">
				<div className="row">
					<div className="col-lg-6 leftSide">
						<div className="logo">
							<InlineSVG src={dccLogo} />
						</div>
						<p>First ever, one-of-a-kind digital collector coin</p>
						<a href="market.html" className="customButton">Participate</a>
					</div>
					<div className="col-lg-6 bg-blue">
						<div className="cta">
							<InlineSVG src={header} />
							<form method="GET" action="collection.html">
								<label>Enter collection address to view it</label>
								<input type="text" name="address" value={this.state.ethAddress} onChange={this.handleChange.bind(this)}/>
								<input type="submit" value="View collection" className="customButton"/>
							</form>
						</div>
					</div>
				</div>
				<div className="row bg-grey">
					<div className="col-lg-6 leftSide">
						<h3>HOW TO BECOME A DIGITAL COLLECTOR</h3>
						<p className="fz22">To participate in the sale of the digital collector coin and to access your collection on the decentralised application in a user friendly way, please use MetaMask on Ropsten Network.</p>
					</div>
					<div className="col-lg-6 tac">
						<div className="metaMaskLogo">
							<InlineSVG src={metaMaskLogo} />
						</div>
						<a href="https://metamask.io/" className="customButton" target="_blank">Get "MetaMask"</a>
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
	ReactDOM.render(<Landing/>, document.querySelector('#root'))
}

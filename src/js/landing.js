import React from 'react';
import ReactDOM from 'react-dom';
import InlineSVG from 'svg-inline-react';
import dccLogo from './../img/dcclogo.svg';
import coinGroup from './../img/coinGroup.svg';
import metaMaskLogo from './../img/metamasklogo.svg';

class Landing extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props)
		this.state = {
		}
	}

	componentDidMount() {
		this._isMounted = true;
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
						<a href="../dist/market.html" className="customButton">Dalyvauti</a>
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
	ReactDOM.render(<Landing/>, document.querySelector('#root'))
}

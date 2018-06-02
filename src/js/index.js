import React from 'react';
import ReactDOM from 'react-dom';
import './../scss/app.scss';
import InlineSVG from 'svg-inline-react';

class App extends React.Component {

    _isMounted = false;

   constructor(props){
      super(props)
      this.state = {
      }
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


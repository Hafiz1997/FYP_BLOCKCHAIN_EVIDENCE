import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Web3 from 'web3'
//import logo from '../logo.png';
import "../components/App.css"
import Fyp from '../abis/Fyp.json'
import Navbar from '../components/Navbar.js'
//import Main from '../components/Main.js'
//import Login from '../components/Login.js'
//import Sub from '../components/Sub.js'
import Home from '../components/Home.js';
import Evidence from '../components/Evidence.js';
import Employee from '../components/Employee.js';
import Error from '../components/Error.js';
//import Navigation from '../components/Navigation.js';

class App extends Component {

  //set up web3 and blockchain data. Basically a constructor
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  //check for the presents of Metamask or similar apps and connects to blockchain
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    //load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0]})
    const networkId = await web3.eth.net.getId()
    const networkData = Fyp.networks[networkId]
    if(networkData) {
      const fyp = web3.eth.Contract(Fyp.abi, networkData.address)
      this.setState({ fyp })
      const evidenceCount = await fyp.methods.evidenceCount().call()
      this.setState({ evidenceCount })
      //Load evidences
      for (var i=1; i <= evidenceCount; i++) {
        const evidence = await fyp.methods.evidences(i).call()
        this.setState({
          evidences: [...this.state.evidences, evidence]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Fyp contract not deployed to detected network')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      evidenceCount: 0,
      evidences: [],
      loading: true
    }

    this.createEvidence = this.createEvidence.bind(this)
    this.verifyEvidence = this.verifyEvidence.bind(this)
  }

  createEvidence(name) {
    this.setState({ loading: true})
    this.state.fyp.methods.createEvidence(name).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false})
    })
  }

  verifyEvidence(id) {
    this.setState({ loading: true})
    this.state.fyp.methods.verifyEvidence(id).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false})
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar account={this.state.account}/>
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/employee" component={Employee}/>
              <Route path="/evidence"
                render={props => <Evidence {...props} 
                state={this.state}
                create={this.createEvidence}
                verify={this.verifyEvidence}/>}
              />
              <Route component={Error}/>
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

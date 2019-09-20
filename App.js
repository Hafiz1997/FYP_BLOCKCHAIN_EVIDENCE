import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
//import "../components/App.css"
import Fyp from '../abis/Fyp.json'
import Navbar from '../components/Navbar.js'
import Main from '../components/Main.js'
import Sub from '../components/Sub.js'

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
      const numEmployees = await fyp.methods.numEmployees().call()
      this.setState({ numEmployees })
      //Load employees
      for (var i=1; i <= numEmployees; i++) {
        const employee = await fyp.methods.employees(i).call()
        this.setState({
          employees: [...this.state.employees, employee]
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
      numEmployees: 0,
      employees: [],
      loading: true
    }

    this.addEmployee = this.addEmployee.bind(this)
    //this.addEvidence = this.addEvidence.bind(this)
  }

  addEmployee(eid, admin) {
    this.setState({ loading: true})
    this.state.fyp.methods.addEmployee(eid, admin).send({ from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false})
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  employees={this.state.employees}
                  addEmployee={this.addEmployee}
                  //addEvidence={this.addEvidence}
                  />
              } 
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

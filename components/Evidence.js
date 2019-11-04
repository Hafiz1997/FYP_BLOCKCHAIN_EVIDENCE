import React from 'react';
//import Navbar from '../components/Navbar.js'
import Main from '../components/Main.js'

const Evidence = props => {
    return (
       <div>
        <p>-</p>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              { props.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Please Refresh Once Transaction Is Successfull</p></div>
                : <Main
                  evidences={props.state.evidences}
                  createEvidence={props.create}
                  verifyEvidence={props.verify}/>
              } 
            </main>
          </div>
        </div>
      </div>
    );
}
 
export default Evidence;
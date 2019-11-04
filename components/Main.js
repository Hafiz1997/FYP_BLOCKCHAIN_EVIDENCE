import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Register New Evidence</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.evidenceName.value          
          this.props.createEvidence(name)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="evidenceName"
              type="text"
              ref={(input) => { this.evidenceName = input }}
              className="form-control"
              placeholder="Evidence Name"
              required />
          </div>          
          <button type="submit" className="btn btn-primary">Add Evidence</button>
        </form>
        <p> </p>
        <h2>Verify Evidences</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Author</th>
              <th scope="col">Admin Verify</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="evidenceList">
            { this.props.evidences.map((evidence, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{evidence.evidenceId.toString()}</th>
                  <td>{evidence.evidenceName}</td>
                  <td>{evidence.author}</td>
                  <td>{evidence.adminVerify}</td>
                  <td>
                    { !evidence.verify
                      ? <button
                          name={evidence.evidenceId}                          
                          onClick={(event) => {
                            this.props.verifyEvidence(event.target.name)
                        }}
                      >
                        Verify
                      </button>
                      : null
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
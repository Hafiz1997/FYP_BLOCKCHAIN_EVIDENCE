import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Employee</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const eid = this.employeeId.value
          const admin = this.employeeAdmin.value
          this.props.addEmployee(eid, admin)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="employeeId"
              type="text"
              ref={(input) => { this.employeeId = input }}
              className="form-control"
              placeholder="Employee ID"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="employeeAdmin"
              type="text"
              ref={(input) => { this.employeeAdmin = input }}
              className="form-control"
              placeholder="Admin Status:True OR False Only"
              required />
          </div>
          <p></p>
          <button type="submit" className="btn btn-primary">Add Employee</button>
        </form>

        <p> </p>
        <h2>Employee List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Admin</th>
            </tr>
          </thead>
          <tbody id="employeeList">
            { this.props.employees.map((employee, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{employee.eid.toString()}</th>
                  <td>{employee.admin.toString()}</td>
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
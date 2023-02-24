// src/components/employee/employee-lists/employee-lists.component.js
import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import employeeService from "../../../services/employee.service";
import "./employee-lists.css";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigation={useNavigate()} location={useLocation()} />
}

class EmployeeListComponent extends React.Component {
    constructor(props) {
        super(props);
        // Employee's store
        this.state = {
            employee: [],
        };
    }

    // Function that is executed as well as this component loads.
    componentDidMount() {
        this.fetchEmployees();
    }

    // Function responsible for calling the service and uploading the employees to store.
    async fetchEmployees() {
        try {
            let res = await employeeService.list();
            this.setState({ employee: res.data });

        } catch (error) {
            console.log(error);
            alert("Unable to list employee.");
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Employee Lists</h2>
                </div>
                <div class="center">
                    <table id='mainTable'><tr><td className='center'>
                        <table id="employeelists">
                            <tr>
                                <th>Emp Number</th>
                                <th>Name</th>
                                <th>Destination</th>
                                <th>Department</th>
                                <th>Date Of Join</th>
                            </tr>
                            {this.state.employee.map((details) => (
                                <tr>
                                    <td>
                                        {" "}
                                        <Link to={"/employee-details/" + details._id} key={details._id}>
                                            {details.EmpNumber}
                                        </Link>
                                    </td>
                                    <td>{details.Name}</td>
                                    <td>{details.Destination}</td>
                                    <td>{details.Department}</td>
                                    <td>{details.DateOfJoin}</td>
                                </tr>
                            ))}
                        </table>
                    </td></tr>
                        <tr><td className='center'>
                            <button type="button" onClick={() => this.props.navigation('/employee-add')}>
                                Create
                            </button>
                        </td></tr></table>
                </div>
            </div>
        );
    }
}

export default withParams(EmployeeListComponent);
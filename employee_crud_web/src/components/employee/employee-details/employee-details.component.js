// src/components/employee/employee-details/employee-details.component.js
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import employeeService from '../../../services/employee.service';
import './employee-details.css'

function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigation={useNavigate()} location={useLocation()} />
}

class EmployeeDetailComponent extends React.Component {
    constructor(props) {
        super(props)
        console.log('sss', props)
        this.state = {
            // Attribute to store the data of employee
            employee: null
        }
    }

    // Function that is executed as well as the component loads
    componentDidMount() {
        // Retrieving employee id from url
        let empId = this.props.params._id
        // Calling the function that loads the employee details
        this.fetchEmployeeDetail(empId)
    }

    // Function that loads the employee details from the API and saves to state
    async fetchEmployeeDetail(empId) {
        try {
            let res = await employeeService.getOne(empId)
            this.setState({ employee: res.data })
        } catch (error) {
            console.log(error);
            alert("It was not possible to load the employee details.")
        }
    }

    //Function that delete a specific employee, called by clicking the "Delete" button
    async deleteEmployee(empId) {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;
        try {
            await employeeService.delete(empId)
            alert("Employee deleted with success")
            this.props.navigation('/employee-lists')
        } catch (error) {
            console.log(error);
            alert("It was not able to delete the employee")
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Employee Details</h2>
                </div>
                <div className="center">
                    <table id='mainTable'><tr><td className='center'>
                        <table id="employeedetails">
                            <tr>
                                <td className='detailHeader'>Emp Number</td>
                                <td className='detailResult'>{this.state.employee?.EmpNumber}</td>
                            </tr>
                            <tr>
                                <td className='detailHeader'>Name</td>
                                <td className='detailResult'>{this.state.employee?.Name}</td>
                            </tr>
                            <tr>
                                <td className='detailHeader'>Destination</td>
                                <td className='detailResult'>{this.state.employee?.Destination}</td>
                            </tr>
                            <tr>
                                <td className='detailHeader'>Department</td>
                                <td className='detailResult'>{this.state.employee?.Department}</td>
                            </tr>
                            <tr>
                                <td className='detailHeader'>Date Of Join</td>
                                <td className='detailResult'>{this.state.employee?.DateOfJoin}</td>
                            </tr>
                            <tr>
                                <td className='detailHeader'>Date Of Birth</td>
                                <td className='detailResult'>{this.state.employee?.DateOfBirth}</td>
                            </tr>
                            <tr>
                                <td className='detailHeader'>Blood Group</td>
                                <td className='detailResult'>{this.state.employee?.BloodGroup}</td>
                            </tr>
                            <tr>
                                <td className='detailHeader'>Address</td>
                                <td className='detailResult'>{this.state.employee?.Address}</td>
                            </tr>
                            <tr>
                                <td className='detailHeader'>Phone No</td>
                                <td className='detailResult'>{this.state.employee?.PhoneNo}</td>
                            </tr>
                            <tr>
                                <td className='detailHeader'>Email</td>
                                <td className='detailResult'>{this.state.employee?.Email}</td>
                            </tr>
                        </table>
                    </td></tr>
                        <tr><td className='center'>
                            <div>
                                <button type="button" onClick={() => this.props.navigation('/employee-edit/' + this.state.employee._id)}>
                                    Edit
                                </button>
                                <button type="button" onClick={() => this.deleteEmployee(this.state.employee._id)}>
                                    Delete
                                </button>
                                <button onClick={() => this.props.navigation(-1)}> Back</button>
                            </div>
                        </td></tr></table>
                </div>

            </div>
        )
    }

}

export default withParams(EmployeeDetailComponent)
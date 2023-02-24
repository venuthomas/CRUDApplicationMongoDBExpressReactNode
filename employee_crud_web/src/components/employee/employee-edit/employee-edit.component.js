// src/components/employee/employee-edit/employee-edit.component.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import employeeService from '../../../services/employee.service';
import './employee-edit.css'

function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigation={useNavigate()} />
}

class EmployeeEditComponent extends React.Component {
    constructor(props) {
        super(props)

        // State started with empty employee attributes
        this.state = {
            _id: null,
            EmpNumber: null,
            Name: '',
            Destination: '',
            Department: '',
            DateOfJoin: '',
            DateOfBirth: '',
            BloodGroup: '',
            Address: '',
            PhoneNo: '',
            Email: ''
        }

    }

    // Function executed as well as the component loads
    componentDidMount() {
        if (this.props?.params?._id) {
            let empId = this.props.params._id
            this.loadEmployee(empId)
        }
    }

    // Function that recovers the employee's data case is an edition
    async loadEmployee(empId) {
        try {
            let res = await employeeService.getOne(empId)
            let empData = res.data
            this.setState(empData)
        } catch (error) {
            console.log(error);
            alert("It was not possible to load the employee details.")
        }
    }

    // Function responsible for saving
    async saveEmployee() {

        let data = {
            _id: this.state._id,
            EmpNumber: this.state.EmpNumber,
            Name: this.state.Name,
            Destination: this.state.Destination,
            Department: this.state.Department,
            DateOfJoin: this.state.DateOfJoin,
            DateOfBirth: this.state.DateOfBirth,
            BloodGroup: this.state.BloodGroup,
            Address: this.state.Address,
            PhoneNo: this.state.PhoneNo,
            Email: this.state.Email,
        }

        // Verifications 
        if (!data.EmpNumber || data.EmpNumber === '') {
            alert("Emp Number is mandatory!"); return;
        }
        if (!data.Name || data.Name === '') {
            alert("Name is mandatory!"); return;
        }
        if (!data.Destination || data.Destination === '') {
            alert("Destination is mandatory!"); return;
        }
        if (!data.Department || data.Department === '') {
            alert("Department is mandatory!"); return;
        }
        if (!data.DateOfJoin || data.DateOfJoin === '') {
            alert("Date Of Join is mandatory!"); return;
        }
        if (!data.DateOfBirth || data.DateOfBirth === '') {
            alert("Date Of Birth is mandatory!"); return;
        }
        if (!data.BloodGroup || data.BloodGroup === '') {
            alert("Blood Group is mandatory!"); return;
        }
        if (!data.Address || data.Address === '') {
            alert("Address is mandatory!"); return;
        }
        if (!data.PhoneNo || data.PhoneNo === '') {
            alert("Phone No is mandatory!"); return;
        }
        if (!data.Email || data.Email === '') {
            alert("Email is mandatory!"); return;
        }

        try {
            // If there is an edition, call the "edit" of the service
            if (this.state._id) {
                await employeeService.edit(data, this.state._id)
                alert("Employee edited with success!")
            }
            // If there is an addition, call the "create" of the service
            else {
                await employeeService.create(data)
                alert("Employee created with success!")
            }
            this.props.navigation('/employee-lists')
        } catch (error) {
            console.log(error)
            alert("Error in save!")
        }
    }

    render() {

        let titleOfThisPage = this.state._id ? 'Edit Employee' : 'New Employee';
        let descOfThisPage = this.state._id ? 'Edit employee detail' : 'Employee creation form';

        return (
            <div>
                <div>
                    <h2>{titleOfThisPage}</h2>
                    <p>{descOfThisPage}</p>
                </div>
                <div className="center">
                    <table id='mainTable'><tr><td className='center'>
                        <table id="employeeedit">
                            <tr>
                                <td className='editHeader'>Emp Number</td>
                                <td className='editResult'>
                                    <input type="text" id="EmpNumber" value={this.state?.EmpNumber}
                                        onChange={e => this.setState({ EmpNumber: e.target.value })} /></td>
                            </tr>
                            <tr>
                                <td className='editHeader'>Name</td>
                                <td className='editResult'>
                                    <input type="text" id="Name" value={this.state?.Name}
                                        onChange={e => this.setState({ Name: e.target.value })} /></td>
                            </tr>
                            <tr>
                                <td className='editHeader'>Destination</td>
                                <td className='editResult'>
                                    <input type="text" id="Destination" value={this.state?.Destination}
                                        onChange={e => this.setState({ Destination: e.target.value })} /></td>
                            </tr>
                            <tr>
                                <td className='editHeader'>Department</td>
                                <td className='editResult'>
                                    <input type="text" id="Department" value={this.state?.Department}
                                        onChange={e => this.setState({ Department: e.target.value })} /></td>
                            </tr>
                            <tr>
                                <td className='editHeader'>Date Of Join</td>
                                <td className='editResult'>
                                    <input type="text" id="DateOfJoin" value={this.state?.DateOfJoin}
                                        onChange={e => this.setState({ DateOfJoin: e.target.value })} /></td>
                            </tr>
                            <tr>
                                <td className='editHeader'>Date Of Birth</td>
                                <td className='editResult'>
                                    <input type="text" id="DateOfBirth" value={this.state?.DateOfBirth}
                                        onChange={e => this.setState({ DateOfBirth: e.target.value })} /></td>
                            </tr>
                            <tr>
                                <td className='editHeader'>Blood Group</td>
                                <td className='editResult'>
                                    <input type="text" id="BloodGroup" value={this.state?.BloodGroup}
                                        onChange={e => this.setState({ BloodGroup: e.target.value })} /></td>
                            </tr>
                            <tr>
                                <td className='editHeader'>Address</td>
                                <td className='editResult'>
                                    <input type="text" id="Address" value={this.state?.Address}
                                        onChange={e => this.setState({ Address: e.target.value })} /></td>
                            </tr>
                            <tr>
                                <td className='editHeader'>Phone No</td>
                                <td className='editResult'>
                                    <input type="text" id="PhoneNo" value={this.state?.PhoneNo}
                                        onChange={e => this.setState({ PhoneNo: e.target.value })} /></td>
                            </tr>
                            <tr>
                                <td className='editHeader'>Email</td>
                                <td className='editResult'>
                                    <input type="text" id="Email" value={this.state?.Email}
                                        onChange={e => this.setState({ Email: e.target.value })} /></td>
                            </tr>
                        </table>
                    </td></tr>
                        <tr><td className='center'>
                            <div>
                                <button onClick={() => this.props.navigation('/employee-lists')}>Cancel</button>
                                <button onClick={() => this.saveEmployee()}> Save</button>
                            </div>
                        </td></tr>
                    </table>
                </div>
            </div>

        )
    }

}

export default withParams(EmployeeEditComponent);
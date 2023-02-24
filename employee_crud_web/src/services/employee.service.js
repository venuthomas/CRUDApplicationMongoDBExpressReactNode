// src/services/employee.service.js
import axios from "axios";

const employeeService = {
    // Function to list the Employee
    async list() {
        const api_url = process.env.REACT_APP_GET_EMPLOYEE_LISTS_API;
        return axios.get(api_url);
    },

    // Function to retrieve data from a specific Employee
    async getOne(empId) {
        const api_url =
            process.env.REACT_APP_GET_EMPLOYEE_DETAILS_BY_ID_API + "?_id=" + empId;
        return axios.get(api_url);
    },

    // Function to create a new Employee
    async create(data) {
        const api_url = process.env.REACT_APP_CREATE_EMPLOYEE_API;
        return axios.post(api_url, data);
    },

    // Function to edit a specific Employee
    async edit(data) {
        const api_url = process.env.REACT_APP_UPDATE_EMPLOYEE_DETAILS_API;
        return axios.post(api_url, data);
    },

    // Function to exclude a specific Employee
    async delete(empId) {
        const api_url = process.env.REACT_APP_DELETE_EMPLOYEE_DETAILS_API;
        return axios.delete(api_url, { data: { _id: empId } });
    },
};

export default employeeService;
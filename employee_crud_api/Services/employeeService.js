// ~/Services/employeeService.js
const {
  mongoDBQueryRepository,
} = require("../DBQueryRepository/mongoDBQueryRepository");
let mRespo;
class EmployeeService {
  constructor() {
    mRespo = new mongoDBQueryRepository(process.env.EMP_COLLECTIONNAME);
  }
  // Function to list the Employee
  getAllEmployeeLists() {
    return mRespo.getAllData();
  }

  // Function to create a new Employee
  createEmp(opt) {
    return mRespo.createData(opt);
  }
  
  // Function to retrieve data from a specific Employee
  getEmpById(id) {
    return mRespo.getDataByID(id);
  }

  // Function to edit a specific Employee 
  updateEmp(id, opt) {
    return mRespo.updateDataByID(id, opt);
  }

  // Function to exclude a specific Employee
  deleteEmp(id) {
    return mRespo.deleteDataByID(id);
  }
}

module.exports = { EmployeeService };
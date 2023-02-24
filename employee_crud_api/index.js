// ~/index.js
const express = require('express');
const bodyParser = require('body-parser');

// initialize the express app
const app = express();
//load environment variables
require('dotenv').config()

app.use(bodyParser.json());

//Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })
let port = process.env.API_PORT;
app.listen(port, () => {
console.log('Server running on port: ' + port);
});

const { EmployeeService } = require("./Services/employeeService");

// API to list the Employee
app.get("/getEmpList", async (req, res) => {
    objEmployeeService = new EmployeeService();
    const list = await objEmployeeService.getAllEmployeeLists();
    res.send(list);
  });

  // API to create a new Employee
  app.post("/createEmployee", async (req, res) => {
    objEmployeeService = new EmployeeService();
    opt = requestToObject(req)
    const list = await objEmployeeService.createEmp(opt);
    res.send(list);
  });
  
  // API to retrieve data from a specific Employee
  app.get("/getEmpDetailsByID", async (req, res) => {
    objEmployeeService = new EmployeeService();
    let empID =req.query._id
    const list = await objEmployeeService.getEmpById(empID);
    res.send(list);
  });

  // API to edit a specific Employee
  app.post("/updateEmpDataByID", async (req, res) => {
    objEmployeeService = new EmployeeService();
    opt = requestToObject(req)
    const list = await objEmployeeService.updateEmp(req.body._id, opt);
    res.send(list);
  });
  
  // API to exclude a specific Employee
  app.delete("/deleteEmpDataByID", async (req, res) => {
    objEmployeeService = new EmployeeService();
    const list = await objEmployeeService.deleteEmp(req.body._id);
    res.send(list);
  });

  // Function to convert to object from request body
  function requestToObject(req) { 
    opt = {};
    if (req.body.EmpNumber) opt.EmpNumber = req.body.EmpNumber;
    if (req.body.Name) opt.Name = req.body.Name;
    if (req.body.Destination) opt.Destination = req.body.Destination;
    if (req.body.Department) opt.Department = req.body.Department;
    if (req.body.DateOfJoin) opt.DateOfJoin = req.body.DateOfJoin;
    if (req.body.DateOfBirth) opt.DateOfBirth = req.body.DateOfBirth;
    if (req.body.BloodGroup) opt.BloodGroup = req.body.BloodGroup;
    if (req.body.Address) opt.Address = req.body.Address;
    if (req.body.PhoneNo) opt.PhoneNo = req.body.PhoneNo;
    if (req.body.Email) opt.Email = req.body.Email;
    return opt;
  }
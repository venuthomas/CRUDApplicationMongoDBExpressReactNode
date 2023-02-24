// src/App.js
import React from "react";
import "./App.css";

import EmployeeListComponent from "./components/employee/employee-lists/employee-lists.component";
import EmployeeDetailComponent from "./components/employee/employee-details/employee-details.component";
import EmployeeEditComponent from "./components/employee/employee-edit/employee-edit.component";

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path='/employee-lists' element={<EmployeeListComponent/>}></Route>
          <Route path='/employee-details/:_id' element={<EmployeeDetailComponent/>}></Route>
          <Route path='/employee-edit/:_id' element={<EmployeeEditComponent/>}></Route>
          <Route path='/employee-add' element={<EmployeeEditComponent/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

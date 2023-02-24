// ~/DBQueryRepository/mongoDBQueryRepository.js
const { connectMongoDB } = require("../DBConnections/mongoDBConnection");
const { ObjectId } = require("mongodb");
let employeeListCollection;

class mongoDBQueryRepository {
  constructor(collectionName) {
    employeeListCollection = connectMongoDB().collection(collectionName);
  }

// Function to list all data
getAllData() {
    return new Promise((resolve, reject) => {
      employeeListCollection.find().toArray((err, data) => {
        if (err) {
          reject(new Error("Something went wrong!"));
        }
        resolve(data);
      });
    });
  }

  // Function to create a new data
  createData(opt) {
    return new Promise((resolve, reject) => {
      employeeListCollection.insertOne(opt, (err, data) => {
        if (err) {
          reject(new Error("Something went wrong!"));
        }
        resolve({ msg: "Inserted Successfully." });
      });
    });
  }

  // Function to retrieve data from a specific value
  getDataByID(id) {
    return new Promise((resolve, reject) => {
      employeeListCollection.findOne({ _id: ObjectId(id) }, (err, data) => {
        if (err) {
          reject(new Error("Something went wrong!"));
        }
        resolve(data);
      });
    });
  }

  // Function to edit a specific data
  updateDataByID(id, opt) {
    return new Promise((resolve, reject) => {
      employeeListCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: opt },
        (err, data) => {
          if (err) {
            reject(new Error("Something went wrong!"));
          }
          resolve({ msg: "Updated Successfully." });
        }
      );
    });
  } 

  // Function to exclude a specific data
  deleteDataByID(id) {
    return new Promise((resolve, reject) => {
      employeeListCollection.deleteOne({ _id: ObjectId(id) }, (err, data) => {
        if (err) {
          reject(new Error("Something went wrong!"));
        }
        resolve({ msg: "Deleted Successfully." });
      });
    });
  }
}
module.exports = { mongoDBQueryRepository };
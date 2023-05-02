
// const chai = require("chai");
// const sinon = require("sinon");
// const UserRepository = require("./user.repository");
// const expect = chai.expect;
// var faker = require('Faker');
// const UserService = require("../../src/services/user.service");
// describe("User registration", function() {
//   describe("create", function() {
//     it("should create a new user", async function() {
//       const stubValue = {
//         firstName:"Manjunath",
//         lastName: "Belagavi",
//         email:'bbelagavi@gmail.com' 
//       };
//       const userRepo = new UserRepository();
//       const stub = sinon.stub(userRepo, "create").returns(stubValue);
//       const userService = new UserService(userRepo);
//       const user = await userService.create(stubValue.firstName,stubValue.lastName, stubValue.email);
//       expect(stub.calledOnce).to.be.true;
//       expect(user.firstName).to.equal(stubValue.firstName);
//       expect(user.lastName).to.equal(stubValue.lastName);
//       expect(user.email).to.equal(stubValue.email);
      
//     });
//   });
// });




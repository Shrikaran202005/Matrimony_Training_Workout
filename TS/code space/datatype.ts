// // // Banking System Example using all primitive types


// // // 1️⃣ string - Storing the account holder's name
// // let accountHolder: string = "John Doe";


// // console.log(`Account Holder: ${accountHolder}`); //backtick


// // // 2️⃣ number - Storing the account balance
// // let accountBalance: number = 5000.75;
// // console.log(`Account Balance: $${accountBalance}`);


// // // 3️⃣ boolean - Checking if the account is active
// // let isAccountActive: boolean = true;
// // console.log(isAccountActive ? "Account is Active" : "Account is Inactive");


// // // // 4️⃣ bigint - Representing a large transaction ID
// // let transactionID: bigint = 9876543210123456789n;
// // console.log(`Transaction ID: ${transactionID}`);


// // function makeTransaction(amount: number): void {
// //   if (amount > accountBalance) {
// //     console.log("❌ Transaction Failed: Insufficient Balance");
// //   } else {
// //     accountBalance -= amount;
// //     console.log(`✅ Transaction Successful! New Balance: $${accountBalance}`);
// //   }
// // }


// // // Attempting a transaction
// // makeTransaction(50000.750);
// const employee = {
//   id: 101,
//   name: "Alice",
//   department: "HR",
// };
// console.log("Employee:", employee);


// // 2️⃣ Array of Objects - Storing multiple employees
// const employees: any = [
//   { id: 102, name: "Bob", department: "Finance" },
//   { id: 103, name: "Charlie", department: "IT" },
// ];


// console.log("Employee List:", employees);


// // 3️⃣ Nested Objects - Adding an address field inside the employee object
// const employeeWithAddress = {
//   id: 104,
//   name: "David",
//   department: "Marketing",
//   address: {
//     city: "New York",
//     country: "USA",
//   },
// };


// console.log("Employee with Address:", employeeWithAddress);

type dynamicEmployee =  { [key: string]: string | number  }; //| - or string or number


const x: dynamicEmployee = {
  id: 105,
  name: "Sudha",
  role: "Developer",
  experience: 5, // years
// isactive:false
};
console.log("Dynamic Employee:", x);


//===================================================
//just a blue print - not comes as a part of object types - just for ref only
//Using type for Objects
// Using 'type' for defining an object structure
//
type ProductType = {
  productId: number;
  productName: string;
  price: number;
};
//you can create product1 without productype also. but if you want to restrict that only these properties should be there with
//product1 object then you need to create your own type defining what are all the ppties and its datatype. that is the main use of object types


const product1: ProductType = {
  productId: 201,
  productName: "Laptop",
  price: 1200,
 
};


console.log("Product (Type):", product1);


// Using 'interface' for defining an object structure
interface ProductInterface {
  productId: number;
  productName: string;
  price: number;
}


const product2: ProductInterface = {
  productId: 202,
  productName: "Smartphone",
  price: 800,


};


console.log("Product (Interface):", product2);

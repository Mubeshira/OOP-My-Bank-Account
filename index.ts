#! /usr/bin/env node


import inquirer from "inquirer"

// Bank Account interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withDraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

// Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    
    // Debit money
withDraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        
    }else {
        console.log("Insufficient balance.");
        
    }
}  

// Credot money
deposit(amount: number): void {
    if(amount > 100){
         amount -= 1;
    } this.balance += amount;
    console.log(`Deposit of $${amount}sucessful. Remaining balance: $${this.balance}`);    
}
// Check balance
checkBalance(): void {
    console.log(`Current balance $${this.balance}`);
    
}
}

// Customer class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account
    }
}

// Create bank account

const accounts: BankAccount[] = [
    
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000)
];

// Create customers
const customers: Customer[]  = [
    new Customer ("Nawaz", "Malik", "Male", 35,3003365760, accounts[0]),
    new Customer ("Saad", "Zia", "Male", 37,3003678576,accounts[1]),
    new Customer ("Mubeshira", "Saad", "Female", 35,3003595760, accounts[2])

]

// Function to interact with Bank account

async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: " Enter your account number:"

        })

        const customer = customers.find(Customer => Customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }]);

            switch(ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;

                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    })
                    customer.account.withDraw(WithdrawAmount.amount);
                    break;

                case "Check Balance":
                    customer.account.checkBalance();
                    break;

                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank You for using our bank services. Have a great day!");
                    return;
                    
                    






            }
            
        }else {
            console.log("Invalid account number. Please try again.");
            
        }

    } while(true)
}

service()







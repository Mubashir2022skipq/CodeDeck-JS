// Initailize the empty array to push the daily expense.
let expenses = [];

// use for loop to take the input(expense) form the user using prompt function.

for(let i=0; i< 7; i++){

    let input = prompt(`Enter your expense for day ${i+1} :`);
    let expense = parseFloat(input);

    if(isNaN(expense) || expense < 0){
        console.log(`Invalid Input for day ${i+1} : to set the value zero(0) because you give the Input is not a number`)
        expense = 0;
    }
    expenses.push(expense);
}

// Now,Create the Function to calculate the total expense.

function getThetotalExpense(totalExpense){
    let total = 0;
      for(let i=0;  i < totalExpense.length; i++){
          total+= totalExpense[i];
      }
      return total;
}

// then,Create the function to calculate the average expense

function getTheAverageExpense(averageExpense){
  let sum = getThetotalExpense (averageExpense);
  return sum / averageExpense.length; 
}

// hold the result of the  2 functions(getThetotalExpense,getTheAverageExpense) in the variable.

let totalExpenseCalculate = getThetotalExpense(expenses);
let averageExpenseCalculate = getTheAverageExpense(expenses);

// display the result the on console(browser).

console.log(`Total Expense of the week: Rs ${totalExpenseCalculate.toFixed(3)}`);
console.log(`Average Daily Expense : Rs ${averageExpenseCalculate.toFixed(3)}`);


//init variables
let expenseList = [];
let dataRowNum = 0;

function createExpenseList() {
	//capture the value for the following fields
	let description = document.getElementById('description').value;

	let amount = document.getElementById('amount').value;

	let place = document.getElementById('place').value;

	let date = document.getElementById('date').value;

	newExpense = [{ id: dataRowNum, date, description, amount, place }];

	expenseList = [...expenseList, newExpense];

	//ensure all input fields have been populated and the amount field only allows for numbers as input
	const validNumber = valueValidation(amount);

	const fieldsPopulated = populatedInputFields(
		date,
		description,
		amount,
		place
	);

	if (validNumber == true && fieldsPopulated == true) {
		createTableRow(dataRowNum);
		createDataRow(dataRowNum);

		dataRowNum++;
	} else {
		alert('Please populate all fields!');
	}

	//clear out the input fields
	document.getElementById('description').value = '';
	document.getElementById('amount').value = '';
	document.getElementById('place').value = '';
	document.getElementById('date').value = '';
}

//creates a tr tag
function createTableRow(dataNum) {
	let dataRowNum = dataNum;

	let tableRow = document.createElement('tr');
	tableRow.id = `table-row-${dataRowNum}`;
	tableRow.addEventListener('dblclick', deleteExpense);
	document.getElementById('test').appendChild(tableRow);
}

//creqtes a td tag
function createDataRow(dataNum) {
	let dataRowNum = dataNum;
	//console.log(newExpense);
	newExpense.forEach((expense) => {
		let tableRowData = document.createElement('td');
		tableRowData.id = `date-${dataRowNum}`;
		tableRowData.innerHTML = expense.date;

		let tableRowData1 = document.createElement('td');
		tableRowData1.id = `description-${dataRowNum}`;
		tableRowData1.innerHTML = expense.description;

		let tableRowData2 = document.createElement('td');
		tableRowData2.id = `amount-${dataRowNum}`;
		tableRowData2.innerHTML = `$${expense.amount}`;

		let tableRowData3 = document.createElement('td');
		tableRowData3.id = `place-${dataRowNum}`;
		tableRowData3.innerHTML = expense.place;

		document
			.getElementById(`table-row-${dataRowNum}`)
			.appendChild(tableRowData);
		document
			.getElementById(`table-row-${dataRowNum}`)
			.appendChild(tableRowData1);
		document
			.getElementById(`table-row-${dataRowNum}`)
			.appendChild(tableRowData2);
		document
			.getElementById(`table-row-${dataRowNum}`)
			.appendChild(tableRowData3);
	});
}

//deletes an expense row item when it is double clicked
function deleteExpense(e) {
	let selectedExpense = e.target.id;

	const confirmAction = 'Are you sure you want to delete expense?';

	if (confirm(confirmAction)) {
		//alert('Expense successfully deleted');

		//capture the expense ID
		selectedExpense = selectedExpense.split('-')[1];

		expenseList.forEach((expense) => {
			//console.log(expense[0].id);

			if (expense[0].id == selectedExpense) {
				let expenseItem = document.getElementById(
					`table-row-${selectedExpense}`
				);
				expenseItem.remove(expenseList[selectedExpense]);
				console.log(expenseList[selectedExpense]);

				let indexOfExpense = (element) =>
					element == `table-row-${selectedExpense}`;
				let ab = expenseList.splice(expenseList.findIndex(indexOfExpense), 1);
				//return localStorage.setItem('expenses', JSON.stringify(ab));
			}
		});
	}
}

//validates that the dollar amount field only allows for numbers and 2 decimal points
function valueValidation(amount) {
	console.log(amount);
	return amount.match(/^\d+(\.\d{1,2})?$/) !== null;
}

//ensures all fields are populated before an expense can be createed
function populatedInputFields(date, description, amount, place) {
	if ((date && description && amount && place) !== '') {
		return true;
	} else {
		return false;
	}
}

// CREATE AN ARRAY OF EMPLOYEES
var emloyeeList = [
	[12345678, "Jack Sales", 1234, "Jack.sales@gmail.com", "Sales"],
	[88789622, "John Johnson", 1340, "JohnJ.sales@gmail.com", "Quality"],
	[33456780, "Eliszabeth Anderson", 1524, "Eklizabeth.sales@gmail.com", "Administrative"],
	[55221133, "Brandon Jackson", 1896, "BrandonJ.sales@gmail.com", "Executive"],
	[77996644, "Julia Fred", 1635, "JFred.sales@gmail.com", "Quality Assurance"]
];
const $ = (id)=>{
		"use strict";
		return window.document.getElementById(id);
}

const $$ = (id)=>{
		"use strict";
		return window.document.getElementsByTagName(id);
}
// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
var employeeObject = localStorage.getItem('employeeList');
if (employeeObject !== null) {
    emloyeeList = JSON.parse(employeeObject);
}
// GET DOM ELEMENTS
var form = $("addForm");
var employeeTable = $("empTable");
var employeeCountTag = $("empCount");
var tableBody = $$("tbody")[0];
var tableRow;
var employeeCount = 5;

// REBUILD THE TBODY FROM SCRATCH
// LOOP THROUGH THE ARRAY OF EMPLOYEES
// REBUILDING THE ROW STRUCTURE
// BIND THE TBODY TO THE EMPLOYEE TABLE
const buildAndViewTable =()=>{
	// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
	for(var employee of emloyeeList){
		tableRow = document.createElement("tr");
		var tableData = document.createElement("td");
		tableData.innerHTML = employee[0];
		var tableData1 = document.createElement("td");
		tableData1.innerHTML = employee[1];
		var tableData2 = document.createElement("td");
		tableData2.innerHTML = employee[2];
		var tableData3 = document.createElement("td");
		tableData3.innerHTML = employee[3];
		var tableData4 = document.createElement("td");
		tableData4.innerHTML = employee[4];
		var tableData5 = document.createElement("button");
		tableData5.classList.add("btn","btn-danger","delete");
		tableData5.innerHTML = "✗";
		tableRow.appendChild(tableData);
		tableRow.appendChild(tableData1);
		tableRow.appendChild(tableData2);
		tableRow.appendChild(tableData3);
		tableRow.appendChild(tableData4);
		tableRow.appendChild(tableData5);
		tableBody.appendChild(tableRow);
	}
}

buildAndViewTable();
// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
	// PREVENT FORM SUBMISSION
	e.preventDefault();	
	// GET THE VALUES FROM THE TEXT BOXES
	var EmployeeID = $("id");
	var name = $("name");
	var extension = $("extension");
	var email = $("email");
	var department = $("department");
	// ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
	var newEmpIdentity = new Array(5);
	newEmpIdentity[0] = EmployeeID.value;
	newEmpIdentity[1] = name.value;
	newEmpIdentity[2] = extension.value;
	newEmpIdentity[3] = email.value;
	newEmpIdentity[4] = department.value;
	// PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
	emloyeeList.push(newEmpIdentity);
	// BUILD THE GRID
	buildGrid()
	// RESET THE FORM
	form.reset();
	// SET FOCUS BACK TO THE ID TEXT BOX
	EmployeeID.focus();
});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
	// CONFIRM THE DELETE
	const deleted = confirm("Please confirm if you want this employee to get deleted from the table!\nEither OK or Cancel.");
	// GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
	// REMOVE EMPLOYEE FROM ARRAY
	if(deleted){
		dataID = e.target.parentNode.getElementsByTagName("td")[0].innerHTML;
		emloyeeList =  emloyeeList.filter(
			(employee)=>{
			  return employee[0] != dataID;
			}
		);
		employeeCountTag.innerHTML = emloyeeList.length;
	}
	// BUILD THE GRID
	buildGrid();
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
	// REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
	tableBody.innerHTML = "";
	// REBUILD THE TBODY FROM SCRATCH
	// LOOP THROUGH THE ARRAY OF EMPLOYEES
	// REBUILDING THE ROW STRUCTURE
	// BIND THE TBODY TO THE EMPLOYEE TABLE
	buildAndViewTable();
	// UPDATE EMPLOYEE COUNT
	employeeCountTag.innerHTML = emloyeeList.length;
	// STORE THE ARRAY IN STORAGE
	employeeJson = JSON.stringify(emloyeeList);
	localStorage.setItem('employeeList', employeeJson);
};
buildGrid();	
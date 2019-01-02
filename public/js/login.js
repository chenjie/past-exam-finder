//Get all user information from database in Phase2.
// hardcode one regular user and one admin, store them in an array in Phase1
/*****************************Hardcode Part for Phase1***************************************/

// class person{
// 	constructor(username, password, type,faculty,year){
// 		this.username = username
// 		this.password = password
// 		this.type = type
// 	}
//
// }
//
// const regularUser = new person('user', 'user', 'user');
// const adminUser = new person('admin', 'admin', 'admin');
//
// const userArray = []
// userArray.push(regularUser);
// userArray.push(adminUser);


/********************Code below check wheather user name in database or not********************/

// const inputArea = document.querySelector('#Login');
// if(inputArea){
// 	inputArea.addEventListener('submit', checkExists);
// }
//
// function checkExists(e){
// 	e.preventDefault();
// 	//check user name first
// 	var userInputName = document.querySelector('#inputUsername').value
// 	//Phase2: compare the input username with every username in database
// 	//May require a server call
// 	for (var i=0; i<userArray.length; i++ ){
// 		var tempName = userArray[i].username
// 		if (userInputName === tempName) {
// 			//check passwaord
// 			var userInputPassword = document.querySelector('#inputPassword').value
// 			var tempPassword = userArray[i].password
// 			if (userInputName == 'user' && tempPassword === userInputPassword) {
// 				window.location.href = "user/index.html";
// 				break;
// 			} else if (userInputName == 'admin' && tempPassword === userInputPassword) {
// 				window.location.href = "admin/index.html";
// 				break;
// 			} else {
// 				alert('Password is not correct');
// 				break;
// 			}
// 		}
// 		if (i === (userArray.length-1) ){
// 			alert('Username or Password is not correct');
// 		}
// 	}
// }




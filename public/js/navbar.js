$(function() {
  $("#searchButton").click(function(e) {
    // e.preventDefault();
    if(checkInputAtSearchBox($( "#searchBox" ).val())){
    	$("#searchButton").attr("href", "display.html");
    }
  });
});

function checkInputAtSearchBox(courseName){
	const dept = courseName.slice(0,3);
	const courseNumber = courseName.slice(3);

	if(isLetter(dept) && isThreeDigits(courseNumber)){
		// const resultCourse = new Course(dept.toUpperCase(), courseNumber);
		$("#navbarErrorMessage").html("");
		console.log(dept.toUpperCase()+courseNumber);
		return true;
	}
	return false;
}


function isLetter(str) {
  	return str.toLowerCase() != str.toUpperCase();
}

function isThreeDigits(str) {
	const num = parseInt(str);

	if(isNaN(num)){
		$("#navbarErrorMessage").html("Not a course number");
		return false;
	}
	if(num>=500 || num<100){
		$("#navbarErrorMessage").html("Should be within 100-499");
		return false;
	}

	return true;
}

function navBarIsLogin(login, username){
	if(login){
		$("#loginButton").hide();
		$("#logoutButton").show();

		$("#navBarUserName").html("Hello, "+ username + "!");
		login = false;
		console.log('ready to logout');
	}
	else{
		$("#loginButton").show();
		$("#logoutButton").hide();
		login = true;
		console.log("ready to login");
	}
}

var login = false;
navBarIsLogin(login, "user");
// because we cannot identify the user identity, we choose to display username like this
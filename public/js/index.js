// hard code all courses in phase 1
// after click search button, it will only go to csc309 course page for demo

/*****************************Hardcode Part for Phase1***************************************/

// const courses = [];
//
// class Course {
// 	constructor(dept, courseNumber) {
// 		this.dept = dept;
// 		this.courseNumber = courseNumber;
// 	}
//
// 	getCourseName() {
// 		return this.dept + this.courseNumber;
// 	}
// }
//
// courses.push(new Course('CSC','309'));
// courses.push(new Course('MAT','194'));

/*****************************End of Hardcode***************************************/

$('#searchBox').on('keypress', function(e) {
	if (e.keyCode == 13) { 
	  document.getElementById("searchButton").click();
        e.preventDefault();
        return false;
	}
});

$( "#searchButton" ).on( "click", function(){
    // e.preventDefault();

    console.log("checking whether book is valid");

	// const courseName = document.querySelector('#courseName').value;
	const courseName = $('#courseName').val();
	const dept = courseName.slice(0,3);
	const courseNumber = courseName.slice(3);
	
	if (courseName.length == 0) {
		$("#errorMessage").html("Please input CSC309 for demo.");
	}

	if(isLetter(dept) && isThreeDigits(courseNumber)){
		const resultCourse = {
			dept: dept.toUpperCase(),
            courseNumber: courseNumber
		};
        findCourse(resultCourse);
		console.log(resultCourse);
	}
});



function isLetter(str) {
  	return str.toLowerCase() != str.toUpperCase();
}

function isThreeDigits(str) {
	const num = parseInt(str);

	if(isNaN(num)){
		$("#errorMessage").html("Not a course number. <br> Please input a valid number, like 'CSC'+'309'.");
		return false;
	}
	if(num>=500 || num<100){
		$("#errorMessage").html("Course Number should be within 100-499. <br> Please input a valid number, like 'CSC'+'309'.");
		return false;
	}

    $("#errorMessage").html("Search request is sent to the server.");

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

function findCourse(obj) {
    const url = '/course';
    // The data we are going to send in our request
    let data = obj;
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
        .then(function(res) {
            if (res.status === 200) {
                window.location.href = `/user/display/${obj.dept}${obj.courseNumber}`;
            } else {
                $("#errorMessage").html("No such course found in the database.");
            }
        }).catch((error) => {
        	console.log(error);
    })
}

var login = false;
navBarIsLogin(login, "user");
// because we cannot identify the user identity, we choose to display username like this
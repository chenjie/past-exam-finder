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
                $("#navbarErrorMessage").html("Not found.");
            }
        }).catch((error) => {
        console.log(error);
    })
}

$(function() {
    $("#searchButton").click(function(e) {
        // e.preventDefault();
        const s_val = $( "#searchBox" ).val();
        if(checkInputAtSearchBox(s_val)){
            const dept = s_val.slice(0,3);
            const courseNumber = s_val.slice(3);
            const resultCourse = {
                dept: dept.toUpperCase(),
                courseNumber: courseNumber
            };
            findCourse(resultCourse);
            // $("#searchButton").attr("href", `/user/display/${s_val}`);
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
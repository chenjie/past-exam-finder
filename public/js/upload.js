// const FileInfo = function(dept, courseNumber, year, term, file){
// 	this.dept = dept;
// 	this.courseNumber = courseNumber;
// 	this.year = year;
// 	this.term = term;

// 	this.file = file;
// 	this.uploadTime = new Date();
// }

// var dept, courseNumber, year, term, file;

$('#fileInput').on('change',function(){

    var fileName = $(this).val();
    file = this.files[0];
    console.log(file);

    //replace the "Choose a file" label
    $(this).next('.custom-file-label').html(file.name);

})


// $( "#fileSubmit" ).on( "click", function() {
// 	dept = $( deptSelector ).val();
// 	courseNumber = $("#courseNumInput").val();
// 	year = $( yearSelector ).val();
// 	term = $( termSelector ).val();

// 	if(file !== undefined){

// 		if(dept!== "Select"){
// 			if(checkCourseNumber(courseNumber)){
// 				// const newFile = new FileInfo(dept, courseNumber, year, term, file);
// 				// console.log(newFile);
// 				alert("You have successfully uploaded the file.");
// 				$("#submitLink").attr("href", "/");
// 			}
// 		}else{
// 			alert("You must select a department.")
// 		}
		
// 	}else{
// 		alert("You must include a file.");
// 	}

// });


// function checkCourseNumber(str) {
// 	const num = parseInt(str);

// 	if(isNaN(num)){
// 		$("#errorMessageInForm").html("Not a number.");
// 		return false;
// 	}
// 	if(num>=500 || num<100){
// 		$("#errorMessageInForm").html("Course Number should be within 100-499.");
// 		return false;
// 	}

// 	return true;
// }
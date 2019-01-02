"use strict"

// // This file is similar to the "display.js" in master/user/js folder, more comments are made in that file
// //This file will be merged to the file mentioned before in Phase2. 

// /******************Hardcode Part for Phase1*************************/
// class Solution {
// 	constructor(courseName, year, term, type, professor, author, fileId){
// 		this.courseName = courseName;
// 		this.year = year;
// 		this.type = type;
// 		this.professor = professor;
// 		this.author = author;
// 		this.fileId = fileId;
// 		this.term = term;
// 	}
// }

// let numberOfSolutions = 4; // total number of solution
// let numberOfTemp = 0;
// let solutionList = []
// let tempList = []
// let Solution1 = new Solution("CSC309", "2016","Fall", "Midterm", "Ken Jackson", "jellycsc", "Solution1.pdf");
// let Solution2 = new Solution("CSC309", "2017", "Fall", "Final", "Ken Jackson", "Cosmos", "Solution2.pdf");
// let Solution3 = new Solution("CSC309", "2017", "Winter", "Midterm", "David Liu", "Claire", "Solution3.pdf");
// let Solution4 = new Solution("CSC309", "2016", "Winter", "Midterm", "Ken Jackson", "17Singer", "Solution4.pdf");
// solutionList.push(Solution1);
// solutionList.push(Solution2);
// solutionList.push(Solution3);
// solutionList.push(Solution4);

// /********************************************************************/

const tableContainer = document.querySelector('#displayTableContainer')
const table = tableContainer.getElementsByClassName("table table-striped")[0]
const tableBody = table.getElementsByClassName('tableBody')[0]
// const filterContainer = document.querySelector('#filterContainer')
tableContainer.addEventListener('click', deleteSolutionFromTable);
tableContainer.addEventListener('click', jumpToSolution);
tableContainer.addEventListener('click', jumpToUserLink);

function handleSubmission(){
	let yearSelector = document.querySelector('#deptSelectorYear')
	let year = yearSelector.options[yearSelector.selectedIndex].text
	let typeSelector = document.querySelector('#deptSelectorType')
	let type = typeSelector.options[typeSelector.selectedIndex].text
	let profSelector = document.querySelector('#deptSelectorProf')
    let prof = profSelector.options[profSelector.selectedIndex].text
    prof = prof.replace(" ", "%20")
	let termSelector = document.querySelector('#deptSelectorTerm')
    let term = termSelector.options[termSelector.selectedIndex].text
    let courseCode = document.querySelector('.selectForm').action
    console.log(year)
    console.log(prof)
    console.log(courseCode)

    const url = `${courseCode}/${year}/${term}/${type}/${prof}`;
    window.location.href = url
    console.log(url)
    let submitButton = document.querySelector('#submitButton')
    submitButton.action = url
}

function jumpToSolution(e){
	e.preventDefault();
	if(e.target.classList.contains("click")) {
        const td= e.target.parentElement.parentElement.getElementsByTagName('td')[0];
        console.log(td)
        const url = td.getElementsByTagName("a")[0].href
        window.location.href = url
	} 
}

function jumpToUserLink(e){
	e.preventDefault();
	if(e.target.classList.contains("userClick")) {
        const td= e.target.parentElement.parentElement.getElementsByTagName('td')[1];
        console.log(td)
        const url = td.getElementsByTagName("a")[0].href
        window.location.href = url
	} 
}


// tableBody.on("click", "td", jumpToSlution());

// function jumpToSlution()
// var url = "http://dbpedia.org/sparql";


// function searchUsername(username) {
// 	//Phase2: compare with data obtained from server
// 	for (let i=0; i < numberOfSolutions; i++) {
// 		if (username === solutionList[i].author) {
// 			return solutionList[i]
// 		}
// 	}
// }

// function filterSolutions(){
// 	tableBody.innerHTML = '<tbody class="tableBody">\
//           					 <tr></tr>\
//         				   </tbody>'
// 	tempList = [];
// 	numberOfTemp = 0;
// 	let yearSelector = document.querySelector('#deptSelectorYear')
// 	let year = yearSelector.options[yearSelector.selectedIndex].text
// 	let typeSelector = document.querySelector('#deptSelectorType')
// 	let type = typeSelector.options[typeSelector.selectedIndex].text
// 	let profSelector = document.querySelector('#deptSelectorProf')
// 	let prof = profSelector.options[profSelector.selectedIndex].text
// 	let termSelector = document.querySelector('#deptSelectorTerm')
// 	let term = termSelector.options[termSelector.selectedIndex].text
// 	for (let i=0; i < numberOfSolutions; i ++) {
// 		if (yearSelector.selectedIndex === 0) { year = solutionList[i].year}
// 		if (typeSelector.selectedIndex === 0)  { type = solutionList[i].type}
// 		if (profSelector.selectedIndex === 0) { prof = solutionList[i].professor}
// 		if (termSelector.selectedIndex === 0) { term = solutionList[i].term}

// 		if (solutionList[i].year === year && solutionList[i].type === type &&
// 						solutionList[i].professor === prof && term === solutionList[i].term){
// 			tempList.push(solutionList[i])
// 			numberOfTemp = numberOfTemp +  1;

// 		}
// 	}
// 	console.log(tempList)
// 	console.log(numberOfTemp)
// 	addSolutionsToTable(tempList, numberOfTemp);
// }

// //Phase2: Before add a row in HTML, send new data to server
// function addSolutionsToTable(solutions, numberOfTempSolutions){
// 	for (let i=0; i < numberOfTempSolutions; i++) {
// 		let solution = solutions[i]
// 		let row = i+1
// 		let name = solution.fileId
// 		let author = solution.author
// 		$('.tableBody tr:last').after('<tr> \
//         <th scope="row">' + row + '</th> \
//         <td><a class="fileName" href="login.html">'+ name + '</a></td> \
//         <td><a class="authorLink" href="#">'+ author + '</td> \
//       	</tr>');
// 	}
// }

//Phase2: Delete the file based on the file's name and author from server
function deleteSolutionFromTable(e){
	e.preventDefault();
	if(e.target.classList.contains("delete-row")) {
        let url = '/admin/display/delete/';
        // console.log(e.target.parentElement.parentElement.getElementsByTagName('td'))
        const id = e.target.parentElement.parentElement.getElementsByTagName('td')[6].textContent;
        url = url + id
        console.log(url)
        let data = {
            id: id
        }
        const request = new Request(url, {
            method: 'delete',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, test/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        fetch(request)
        .then(function(res) {
            if(res.status === 200) {
                let rows = tableBody.getElementsByTagName('tr');
                let count  = rows.length;
                let targetRow = -1
                	for (let i = 1; i < count; i++) {
                        console.log(tableBody.getElementsByTagName('tr')[i].getElementsByTagName('td')[6])
                		let each_id = tableBody.getElementsByTagName('tr')[i].getElementsByTagName('td')[6].textContent;
                		if (each_id === id) { 
                			targetRow = i
                		}
                	}
                console.log(count)
                tableBody.deleteRow(targetRow)
            }
        })
	} 
}

// /********************************************************************/


// Phase2: User will be redirected to different type of page based on their
// type(user or admin)
// //Instead of using window.location.href directly, it will have a server call below, obtained user informaiton and then do comparison.  
// $(document).on( "click", ".fileName" , function(e) {
// 	window.location.href = "pt_comments.html";
// });

// $(document).on( "click", ".authorLink" , function(e) {
// 	window.location.href = "profile/viewOthersProfile_regular.html";
// });


// // filterSolutions()
// addSolutions()

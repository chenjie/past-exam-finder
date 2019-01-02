'use strict'

const log = console.log;

var currentPageNum = 1;
var totalNumberOfPages = 0;
var scale = 1;

var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.worker.js';

const id = window.location.href.split("/")[5];

var pdfData = [];
var pdfName;

fetch('/user/solution-data/' + id)
.then((res) => { 
    if (res.status === 200) {
       return res.json();
   } else {
        alert('Could not get solution data');
   }                
})
.then((json) => {

    pdfData = json[0].data.data;
    pdfName = json[0].name;

    document.querySelector('#pdf-prev').addEventListener("click", prevPage);
    document.querySelector('#pdf-next').addEventListener("click", nextPage);
    document.querySelector('#pdf-bigger').addEventListener("click", zoomIn);
    document.querySelector('#pdf-smaller').addEventListener("click", zoomOut);

    document.querySelector('#pdf-download').addEventListener("click", e => {
        var byteArray = new Uint8Array(pdfData);
        var blob = new Blob([byteArray], {type: "application/octet-stream"});
        var fileName = pdfName;
        saveAs(blob, fileName);
    });


    

    pdfjsLib.getDocument({data: pdfData}).then(getPdfPastTest);

}).catch((error) => {
    console.log(error)
})



function getPdfPastTest(pdf) {
    totalNumberOfPages = pdf.numPages;
    const index = document.querySelector('#page');
    index.innerText = `Page: ${currentPageNum}/${totalNumberOfPages}`
    //
    // Fetch the first page
    //
    pdf.getPage(currentPageNum).then(function getPageHelloWorld(page) {

      var viewport = page.getViewport(scale);

      //
      // Prepare canvas using PDF page dimensions
      //
      var canvas = document.getElementById('the-canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      //
      // Render PDF page into canvas context
      //
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    });
}


const prevPage = function (e) {

  if (currentPageNum > 1) {
    currentPageNum -= 1;
    pdfjsLib.getDocument({data: pdfData}).then(getPdfPastTest);
  }
}
const nextPage = function (e) {
  log(currentPageNum)
  if (currentPageNum < totalNumberOfPages) {
    currentPageNum += 1;
    pdfjsLib.getDocument({data: pdfData}).then(getPdfPastTest);
  }
}
const zoomIn = function (e) {
    if (scale < 1.2) {
        scale += 0.1;
        pdfjsLib.getDocument({data: pdfData}).then(getPdfPastTest);
    }
}
const zoomOut = function (e) {
    if (scale > 0.8) {
        scale -= 0.1;
        pdfjsLib.getDocument({data: pdfData}).then(getPdfPastTest);
    }
}
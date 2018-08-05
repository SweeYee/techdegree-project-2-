const students = document.getElementsByClassName('student-item');
const totalStudents = students.length;
const perPage = 5; //test on 5, easier to manage
const totalPages = Math.ceil(totalStudents/perPage);

//------ShowPage Function: Display a total number on first page and hide the rest----------
function showPage(pageNum, studentList){
  countEnd = pageNum * perPage; //format for any numbers.
  countStart = countEnd - perPage;
 for (let i=0; i<totalStudents; i++) {
  studentList[i].style.display = 'none'; //Q:how to make the display smooth without expose the list
   if (i>=countStart && i<=(countEnd-1)){
      studentList[i].style.display = 'block';
      }
    }
}
showPage(1, students); //Pass the arguments

/*failed with DOM. try refactor with jQuery
//<!--www.w3schools.com/jquery/jquery_traversing.asp-->
alternative// $("div:last").remove();
*/

//------The appendPageLinks Function: Create Section with links--------------------------------
function appendPageLinks(studentList){

  const $pgLinkDiv = $('<div class="pagination"><ul></ul></div>');
       $('.page').append($pgLinkDiv);

//"for" every page //add a page link
  for (let i=1; i<= totalPages; i++ ) {
    	$('.pagination ul').append($('<li><a href="#">' + i + '</a></li>'));
    }
  let oldDiv = document.querySelector('.pagination');//need to select the first pagination
  oldDiv.parentNode.removeChild(oldDiv);
  $('.pagination a:first').addClass('active');

//Add click event for the page to assign to the anchor
  $('.pagination li a').on('click', function() {
    $('.pagination li a').removeClass('active'); //delete any active link
      let pageNum = ($(this).text()); //get text as pageNumber
      showPage(pageNum, students); //Use showPage function to display
      $(this).addClass('active'); //active link
    });
  }
  appendPageLinks(students);

//------EXTRA CREDIT :
//------(1) Add Search component------------------------------------------------------------

//function appendSearch(){}
const divButton = $('<div class="student-search"><button>Search</button></div>');
const divInput = $('<div class="student-search"><input id="search" placeholder="Search for students...">');

$newDiv=$('.page-header').append(divButton);
$newDiv.append(divInput);

// Self Commit: Try out on a mouseover for more responsive
$('button').mouseover(function(){$(this).css("opacity", "0.8");})
.mouseout(function(){$(this).css("opacity", "");});

//------(2) Add functionality to the search component -------------------------------------
/*------responsive for Search Button on click. Tested on console.log()
$('button').click(function(){
  const searchValue = $('#search').val().toLowerCase();
  //console.log(searchValue);
});

*/
/*
//(1)IF searchValue found in <h3> || <email> tags, return <li> results in newArray (with student-details joined-details)
//---- OR ---- filter() totalStudents > map to newArray + appendPageLinks(filteredStudents)
*/
function letSearch(){
//let $studentName = $('.student-details h3');//testing
//let $studentEmail = $('.email');//testing
let inputText = $('#search').val().toLowerCase();
let arrStudents = $('.student-list').children();
let arrStudentResult = [];
$.each(arrStudents, function() {
  let text = $(this).find(arrStudents).text().toLowerCase();
  arrStudentResult.push($(this));
  return arrStudentResult;
  showPage(1,arrStudentResult);//use showPage() to display the result
  appendPageLinks(arrStudentResult);//append everytime after search result
});
}
//adds event listener on search field. Testing:
$('.student-search input').on('keyup', function() {
  letSearch();
});
//adds event listener on button. Testing:
$('button').on('click', function(){
   console.log (inputText);
 });


/*
//(2)ELSE IF searchValue NOT found, remove pagination , add HTML = No results

//(3)ELSE return state to showPage function
//call showPage() pass on letSearch().value

//Add Event handlers for button & keyup
*/

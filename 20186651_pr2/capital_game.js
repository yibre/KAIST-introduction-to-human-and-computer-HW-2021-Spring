// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {
  var country_capital_pairs = pairs
});

const country = document.getElementById("pr2__country");
const input = document.getElementById("pr2__capital");
const checkBtn = document.getElementById("pr2__button");
const tables = document.getElementById("tables")
const theadRef = tables.getElementsByTagName('thead')[0];
const selectAnswer = document.getElementById('answerFilter');
let isInit = true;

function randomItem(list)
{ 
  return list[Math.floor(Math.random()*list.length)];
}

let random_pair, solution;

function makeQuestion() {
  random_pair = randomItem(pairs);
  country.innerHTML = random_pair.country;
  solution = random_pair.capital;
  console.log(solution);
}

function init() {
  makeQuestion();
}

function addRowTable(country, answer, correct, check){
  // 모든 input은 string 상태여야 함.
  const newRow = theadRef.insertRow();
  if (check) {
    newRow.setAttribute("class", "col_true");
  } else {
    newRow.setAttribute("class", "col_false");
  }
  const newCell1 = newRow.insertCell();
  const newCell2 = newRow.insertCell();
  const newCell3 = newRow.insertCell();

  let cell1 = document.createTextNode(country);
  let cell2 = document.createTextNode(answer);
  let cell3 = document.createTextNode(correct+" ");
  let removeBtn = document.createElement("BUTTON");
  removeBtn.innerHTML = "remove";
  removeBtn.setAttribute("id", "removeRowBtn");
  //removeBtn.setAttribute("type", "button");
  removeBtn.classList.add('btn');

  newCell1.appendChild(cell1);
  newCell2.appendChild(cell2);
  newCell3.appendChild(cell3);
  newCell3.appendChild(removeBtn);
}

function deleteRowTable() {
  // removeRowBtn을 누르면 이 함수가 실행됨
  // tables.deleteRow(0)
  console.log("deleterow");
}

function makeCapitalList(list) {
  let newlist = [];
  for (i = 0; i<list.length; i++) {
    newlist.push(list[i].capital);
  }
  return newlist
}

function checkQuestion()
{
  if (isInit) {
    // document.getElementById("tables").deleteRow(2);
    document.getElementsByTagName("tr")[2].style.display =  "none";
  }
  isInit = false;
  const answer = input.value;
  if (answer.toUpperCase() === solution.toUpperCase()) {
    addRowTable(random_pair.country, random_pair.capital, "🟢", true);
  } else {
    addRowTable(random_pair.country, answer, random_pair.capital, false);
  }
  input.value= "";
  makeQuestion();
}

function filterTable(e) {
  if (e.target.value === "wrong" ) {
    hideRow(document.getElementsByClassName("col_true"));
    showRow(document.getElementsByClassName("col_false"));
  } else if (e.target.value === "correct") {
    hideRow(document.getElementsByClassName("col_false"));
    showRow(document.getElementsByClassName("col_true"));
  } else {
    showRow(document.getElementsByTagName("tr"));
    document.getElementsByTagName("tr")[2].style.display =  "none";
  }
}

function hideRow(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].style.display = 'none';
  }
}

function showRow(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].style.display = "";
  }
  if (array.length === 0) {
    document.getElementsByTagName("tr")[2].style.display =  "";
  } else {
    document.getElementsByTagName("tr")[2].style.display =  "none";
  }
}

$(function() {
  $( input ).autocomplete({
    source: makeCapitalList(pairs),
    minLength: 2,
    select: function(event, ui) {
      //$("input").val(ui.item.label);
      input.value = ui.item.label;
      console.log("current value is1 "+ input.value);
      checkQuestion(); 
      $(this).val('');
      return false; }
  });
});

init();

checkBtn.addEventListener("click", checkQuestion);
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkQuestion();
  }
});

// document.getElementById("removeRowBtn").addEventListener("click", deleteColumn);

selectAnswer.addEventListener('change', filterTable);
$(document).on('click','#removeRowBtn',function(element){
  let deleteRowNum = element.currentTarget.closest('tr').rowIndex;
  document.getElementById("tables").deleteRow(deleteRowNum);
})


/*
HTML에 테이블 추가하는 방법
https://stackoverflow.com/questions/18333427/how-to-insert-a-row-in-an-html-table-body-in-javascript


마지막 한 줄 삭제하는 방법
https://stackoverflow.com/questions/10686888/delete-last-row-in-table

setAttribute
https://www.w3schools.com/jsref/met_element_setattribute.asp

autocomplete
https://www.w3schools.com/howto/howto_js_autocomplete.asp

동적으로 생성된 버튼에 addEventListener 붙이는 방법
https://stackoverflow.com/questions/30025645/addeventlistener-does-not-work-on-dynamically-created-button
https://blog.logrocket.com/how-to-dynamically-create-javascript-elements-with-event-handlers/
file:///C:/Users/user/Desktop/KAIST41/HCI/20186651_pr2/index.html
https://hci.kixlab.org/assignments.html#pr2

https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
*/
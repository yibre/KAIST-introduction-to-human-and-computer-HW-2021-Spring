// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.


var pairs = [];
var coordinates = [];
const country = document.getElementById("pr2__country");
const input = document.getElementById("pr2__capital");
const checkBtn = document.getElementById("pr2__button");
const clearBtn = document.getElementById("clear__all");
const tables = document.getElementById("tables")
const theadRef = tables.getElementsByTagName('thead')[0];
const selectAnswer = document.getElementById('answerFilter');


$(document).ready(function (){
  $.ajax({
    url: 'http://cs374.s3.ap-northeast-2.amazonaws.com/country_capital_geo.csv',
    dataType: 'text',
  }).done(saveLocalstorage);
});

function successFunction(data) {
  if (localStorage.getItem('pairs') && localStorage.getItem('coordinates')) {
    console.log("we are here");
    pairs =  JSON.parse(localStorage.getItem('pairs'));
    coordinates =  JSON.parse(localStorage.getItem('coordinates'));
  }
  else {
    console.log("we are here02");
    saveLocalstorage(data);
  }
  console.log("어쩌고", pairs);
  console.log(coordinates);
}

function saveLocalstorage(data) {
  let allRows = data.split(/\r?\n|\r/);
  for (let singleRow = 1; singleRow < allRows.length; singleRow++) {
    let rowCells = allRows[singleRow].split(",");
    let temp = new Object();
    let temp2 = new Object();
    let temp3 = [];
    for (let rowCell = 0; rowCell < rowCells.length; rowCell++) {
      if (rowCell % 4 == 0) {
        temp["country"] = rowCells[rowCell];
        temp2["country"] = rowCells[rowCell];
      } else if (rowCell % 4 == 1) {
        temp["capital"] = rowCells[rowCell];
      } else if (rowCell %4 == 2) {
        temp3.push(rowCells[rowCell]);
      } else {
        temp3.push(rowCells[rowCell]);
      }
      temp2["coordinates"] = temp3;
    }
    pairs.push(temp);
    coordinates.push(temp2);
  }
  localStorage.removeItem('pairs');
  localStorage.removeItem('coordinates');
  makeQuestion();
  //localStorage.setItem("pairs", JSON.stringify(pairs));
  //localStorage.setItem("coordinates", JSON.stringify(coordinates));
}


//
// add to firebase
//
var firebaseConfig = {
  apiKey: "AIzaSyBjrspNBVg4H_Q3CC9HzcYBvTeVFm53gOU",
  authDomain: "pr3forhci.firebaseapp.com",
  projectId: "pr3forhci",
  storageBucket: "pr3forhci.appspot.com",
  messagingSenderId: "1079543049985",
  appId: "1:1079543049985:web:77fff01465e474ebb87500",
  measurementId: "G-PW8S1V5WH9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();

database.ref('answers/').set({"name": "테스트2", "intro": "인삿말"});

//
// DP2 part
//

function randomItem(list) {
  return list[Math.floor(Math.random()*list.length)];
}

let random_pair, solution;

function makeQuestion() {
  random_pair = randomItem(pairs);
  country.innerHTML = random_pair.country;
  solution = random_pair.capital;
  console.log(solution);
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
  removeBtn.classList.add('btn');

  newCell1.appendChild(cell1);
  newCell2.appendChild(cell2);
  newCell3.appendChild(cell3);
  newCell3.appendChild(removeBtn);
}

function makeCapitalList(list) {
  let newlist = [];
  for (i = 0; i<list.length; i++) {
    newlist.push(list[i].capital);
  }
  return newlist
}

function checkQuestion() {
  const answer = input.value;
  if (answer != "") {
    if ( document.getElementsByClassName("col_true").length+document.getElementsByClassName("col_false").length >= 0 ) {
      document.getElementsByTagName("tr")[2].style.display =  "none";
    }
    if (answer.toUpperCase() === solution.toUpperCase()) {
      if (selectAnswer.options[selectAnswer.selectedIndex].text == "Wrong") {
        selectAnswer.selectedIndex = 0;
      }
      addRowTable(random_pair.country, random_pair.capital, random_pair.capital, true);
    } else {
      if (selectAnswer.options[selectAnswer.selectedIndex].text == "Correct") {
        selectAnswer.selectedIndex = 0;
      }
      addRowTable(random_pair.country, answer, random_pair.capital, false);
    }
    input.value= "";
    makeQuestion();
  }
}

function filterTable(e) {
  if (e.target.value === "wrong" ) {
    hideRow(document.getElementsByClassName("col_true"));
    showRow(document.getElementsByClassName("col_false"));
  } else if (e.target.value === "correct") {
    hideRow(document.getElementsByClassName("col_false"));
    showRow(document.getElementsByClassName("col_true"));
  } else {
    showRow(document.getElementsByClassName("col_true"));
    showRow(document.getElementsByClassName("col_false"));
    if (document.getElementsByClassName("col_true").length+document.getElementsByClassName("col_false").length == 0) {
      document.getElementsByTagName("tr")[2].style.display =  "";
    } else {
      document.getElementsByTagName("tr")[2].style.display =  "none";
    }
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

function clearAll() {
  console.log("clear all btn");
}

checkBtn.addEventListener("click", checkQuestion);
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkQuestion();
  }
});



clearBtn.addEventListener("click", clearAll);

selectAnswer.addEventListener('change', filterTable);
$(document).on('click','#removeRowBtn',function(element){
  let deleteRowNum = element.currentTarget.closest('tr').rowIndex;
  document.getElementById("tables").deleteRow(deleteRowNum);
  if (selectAnswer.selectedIndex == 1 && document.getElementsByClassName("col_false").length == 0) {
    document.getElementsByTagName("tr")[2].style.display =  "";
  } else if (selectAnswer.selectedIndex == 2 && document.getElementsByClassName("col_true").length == 0) {
    document.getElementsByTagName("tr")[2].style.display =  "";
  } else if (document.getElementsByClassName("col_true").length+document.getElementsByClassName("col_false").length == 0) {
    document.getElementsByTagName("tr")[2].style.display =  "";
  }
})


/*
CSV 파일 읽기: https://cloudstack.ninja/mrb/retrieve-a-remote-csv-file-using-fetch-api-in-js/
cors error 고치는 방법: https://velog.io/@takeknowledge/%EB%A1%9C%EC%BB%AC%EC%97%90%EC%84%9C-CORS-policy-%EA%B4%80%EB%A0%A8-%EC%97%90%EB%9F%AC%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3gk4gyhreu
https://popcorn16.tistory.com/154 <- php 서버 불러와서 사용하기
https://jaenjoy.tistory.com/25 <- 이건 헤더 추가해야한다는 내용이지만 어쨌든 안 씀

https://code.tutsplus.com/ko/tutorials/parsing-a-csv-file-with-javascript--cms-25626 <- 현재 코드 출처
*/
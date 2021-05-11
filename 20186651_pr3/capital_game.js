// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.


var pairs = [];
var coordinates = [];
var solutionLists = []; // [{country:, capital:, lat:, lng:}]
let capitalList = []; // it's for autocomplete function
const country = document.getElementById("pr2__country");
const input = document.getElementById("pr2__capital");
const checkBtn = document.getElementById("pr2__button");
const clearBtn = document.getElementById("clear__all");
const resetBtn = document.getElementById('pr3__reset');
const undoBtn = document.getElementById('pr3__undo');
const tables = document.getElementById("tables")
const theadRef = tables.getElementsByTagName('thead')[0];
const selectAnswer = document.getElementById('answerFilter');
let initial = true;

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
let statusNum = 0;
let currentStatus=[]; // list of list [[country, answer, capital, correnctornot], 2)[], 3)[], 4)[]]

$(document).ready(function () {
  $(input).focus();
  $.ajax({
    url: 'http://cs374.s3.ap-northeast-2.amazonaws.com/country_capital_geo.csv',
    dataType: 'text',
  }).done(saveLocalstorage);
});

function afterPageloaded() {
  var starCountRef = database.ref('answer/');
  starCountRef.on('value', (snapshot) => {
    var data = snapshot.val();
    // console.log("page loaded");
    if (data && initial) {
      data.shift();
      statusNum = data.length;
      temp = data[statusNum-1]
      console.log("the last data is:", temp);
      if (temp != 0) {
        currentStatus.push(temp);
      }      
      reloadPage();
    }
    initial = false;
  });
}

function findCoordinatesByCountry(list, countryname) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].country == countryname) {
      return [list[i].lng, list[i].lat];
    }
  }
}

function findCoordinatesByCaptial(list, capitalname) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].capital == capitalname) {
      return [list[i].lng, list[i].lat];
    }
  }
}

function successFunction(data) {
  if (localStorage.getItem('pairs') && localStorage.getItem('coordinates')) {
    console.log("we are here");
    pairs = JSON.parse(localStorage.getItem('pairs'));
    coordinates = JSON.parse(localStorage.getItem('coordinates'));
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
    let temp4 = new Object();
    let temp3 = [];
    for (let rowCell = 0; rowCell < rowCells.length; rowCell++) {
      if (rowCell % 4 == 0) {
        temp["country"] = rowCells[rowCell];
        temp2["country"] = rowCells[rowCell];
        temp4["country"] = rowCells[rowCell];
      } else if (rowCell % 4 == 1) {
        temp["capital"] = rowCells[rowCell];
        temp4["capital"] = rowCells[rowCell];
        capitalList.push(rowCells[rowCell]);
      } else if (rowCell % 4 == 2) {
        temp3.push(rowCells[rowCell]);
        temp4["lng"] = rowCells[rowCell];
      } else {
        temp3.push(rowCells[rowCell]);
        temp4["lat"] = rowCells[rowCell];
      }
      temp2["coordinates"] = temp3;
    }
    pairs.push(temp);
    coordinates.push(temp2);
    solutionLists.push(temp4);
  }
  localStorage.removeItem('pairs');
  localStorage.removeItem('coordinates');
  makeQuestion();
  //localStorage.setItem("pairs", JSON.stringify(pairs))
  //localStorage.setItem("coordinates", JSON.stringify(coordinates));
}


//
// add to firebase
//


function readCurrentData() {
  // this is not used now.
  var starCountRef = database.ref('answer/' + statusNum);
  starCountRef.on('value', (snapshot) => {
    const data = snapshot.val();
  });
}

function writeCurrentStatus(answerId) {
  // console.log("write data and current status is:", currentStatus);
  if (currentStatus.length == 0){
    database.ref('answer/' + answerId).set(0);
  } else {
    database.ref('answer/' + answerId).set(currentStatus);
  }  
}

function deleteAll() {
  var totalRowCount = document.getElementById("tables").rows.length;
  for (let i = 3; i < totalRowCount; i++) {
    document.getElementById("tables").deleteRow(3);
  }
  document.getElementsByTagName("tr")[2].style.display = "";
}

function addRowByArray(arr) {
  // input: [ [], [], [], []] output: adding the row on the table
  for (let i =0; i<arr.length; i++){
    // country, answer, correct, check(맞는지틀렸는지)
    if (arr[i][0] == 0) {
    } else {
      addRowTable(arr[i][0], arr[i][1], arr[i][2], arr[i][3]);
    }    
  }
}

function reloadPage() {
  console.log("reload and status num is", statusNum);
  // 1. delete all row
  deleteAll();
  // 2. add row by array
  var starCountRef = database.ref('answer/' + statusNum);
  starCountRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data != null && data != 0) {
      // console.log("reload page2");
      addRowByArray(data);
      currentStatus = data;
      document.getElementsByTagName("tr")[2].style.display = "none";
    } else if (data == 0) {
      document.getElementsByTagName("tr")[2].style.display = "";
    }
  });
}

//
// DP2 part
//

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

let random_pair, solution, lat, lng;

function makeQuestion() {
  random_pair = randomItem(solutionLists);
  country.innerHTML = random_pair.country;
  solution = random_pair.capital;
  lat = parseFloat(random_pair.lat);
  lng = parseFloat(random_pair.lng);
  console.log(lat, lng, solution);
  map.setCenter([lng, lat]);
}

function addRowTable(country, answer, correct, check) {
  // 모든 input은 string 상태여야 함.
  const newRow = theadRef.insertRow();
  // newRow.setAttribute("id", "additional_answers");
  if (check) {
    newRow.setAttribute("class", "col_true");
  } else {
    newRow.setAttribute("class", "col_false");
  }
  const newCell1 = newRow.insertCell();
  newCell1.setAttribute("id", "additional_country");
  const newCell2 = newRow.insertCell();
  const newCell3 = newRow.insertCell();
  newCell3.setAttribute("id", "additional_capital");

  let cell1 = document.createTextNode(country);
  let cell2 = document.createTextNode(answer);
  let cell3 = document.createTextNode(correct + " ");
  let removeBtn = document.createElement("BUTTON");
  removeBtn.innerHTML = "remove";
  removeBtn.setAttribute("id", "removeRowBtn");
  removeBtn.classList.add('btn');

  newCell1.appendChild(cell1);
  newCell2.appendChild(cell2);
  newCell3.appendChild(cell3);
  newCell3.appendChild(removeBtn);
}

function checkQuestion() {
  let temp = [];
  const answer = input.value;
  if (answer != "") {
    let editingAnswer = answer.replace(/^\s+|\s+$/g, '');
    if (document.getElementsByClassName("col_true").length + document.getElementsByClassName("col_false").length >= 0) {
      document.getElementsByTagName("tr")[2].style.display = "none";
    }
    if (editingAnswer.toUpperCase() === solution.toUpperCase()) {
      if (selectAnswer.options[selectAnswer.selectedIndex].text == "Wrong") {
        selectAnswer.selectedIndex = 0;
      }
      temp.push(random_pair.country, editingAnswer, random_pair.capital, true);
      addRowTable(random_pair.country, random_pair.capital, random_pair.capital, true);
    } else {
      if (selectAnswer.options[selectAnswer.selectedIndex].text == "Correct") {
        selectAnswer.selectedIndex = 0;
      }
      temp.push(random_pair.country, editingAnswer, random_pair.capital, false);
      addRowTable(random_pair.country, editingAnswer, random_pair.capital, false);
    }
    input.value = "";
    currentStatus.push(temp);
    makeQuestion();
    statusNum++;
    writeCurrentStatus(statusNum);
    reloadPage();
  }
}

function filterTable(e) {
  if (e.target.value === "wrong") {
    hideRow(document.getElementsByClassName("col_true"));
    showRow(document.getElementsByClassName("col_false"));
  } else if (e.target.value === "correct") {
    hideRow(document.getElementsByClassName("col_false"));
    showRow(document.getElementsByClassName("col_true"));
  } else {
    showRow(document.getElementsByClassName("col_true"));
    showRow(document.getElementsByClassName("col_false"));
    if (document.getElementsByClassName("col_true").length + document.getElementsByClassName("col_false").length == 0) {
      document.getElementsByTagName("tr")[2].style.display = "";
    } else {
      document.getElementsByTagName("tr")[2].style.display = "none";
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
    document.getElementsByTagName("tr")[2].style.display = "";
  } else {
    document.getElementsByTagName("tr")[2].style.display = "none";
  }
}

$(function () {
  $(input).autocomplete({
    source: capitalList,
    minLength: 2,
    select: function (event, ui) {
      input.value = ui.item.label;
      checkQuestion();
      $(this).val('');
      return false;
    }
  });
});

$.ui.autocomplete.filter = function (array, term) {
  var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
  return $.grep(array, function (value) {
      return matcher.test(value.label || value.value || value);
  });
};

function clearAll() {
  // delete all past entry and if there is nothing to remove, alert it.
  deleteAll();
  if (currentStatus.length == 0 || statusNum == 0) {
    alert("No items to clear");
  } else {
    statusNum++;
    currentStatus.length = 0;
    writeCurrentStatus(statusNum);
  }
}

function deleteCurrentStatus(countryName) {
  for (let i = 0; i < currentStatus.length; i++) {
    if (currentStatus[i][0] == countryName) {
      currentStatus.splice(i, 1);
    }
  }
  return currentStatus;
}

function deleteRowFromDB(arraynum) {
  database.ref('answer/' + statusNum + '/' + arraynum).remove();
}

function resetAll() {
  // 현재 상태 전부 지우고 게임 리스타트, 여기서는 db에 남아있는게 없어야함
  statusNum = 0;
  currentStatus.length = 0;
  database.ref('answer/').set(null); // database 리셋
  reloadPage();
  makeQuestion();
}

function undoStep() {
  if (statusNum == 0) {
    alert("nothing to undo");
  } else if (statusNum > 0) {
    console.log(statusNum, "status num from undo");
    database.ref('answer/' + statusNum).remove();
    statusNum--;
    if (statusNum == 0) {
      currentStatus.length = 0;
    }
    reloadPage();
  }
  // re-load the page every undo is activated, by the database
  // delete the current status and
}

//
// Event Listner
//

checkBtn.addEventListener("click", checkQuestion);
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    checkQuestion();
  }
});
clearBtn.addEventListener("click", clearAll);
resetBtn.addEventListener("click", resetAll);
undoBtn.addEventListener("click", undoStep);

selectAnswer.addEventListener('change', filterTable);
$(document).on('click', '#removeRowBtn', function (element) {
  let deleteRowNum = element.currentTarget.closest('tr').rowIndex;
  const country = element.currentTarget.closest('tr').firstChild.innerHTML;
  // deleteRowFromDB(deleteRowNum-2);
  deleteCurrentStatus(country);
   document.getElementById("tables").deleteRow(deleteRowNum);
  if (selectAnswer.selectedIndex == 1 && document.getElementsByClassName("col_false").length == 0) {
    document.getElementsByTagName("tr")[2].style.display = "";
  } else if (selectAnswer.selectedIndex == 2 && document.getElementsByClassName("col_true").length == 0) {
    document.getElementsByTagName("tr")[2].style.display = "";
  } else if (document.getElementsByClassName("col_true").length + document.getElementsByClassName("col_false").length == 0) {
    document.getElementsByTagName("tr")[2].style.display = "";
  }
  statusNum++;
  writeCurrentStatus(statusNum);
  reloadPage();
})

var timer;

$(document).on('mouseenter', '#additional_country', function (element) {
  timer = setTimeout(function () {
    map.setStyle("mapbox://styles/mapbox/satellite-streets-v11");
    map.setZoom(4);
    $("#map").css("border", "3px solid orange");
    map.setCenter(findCoordinatesByCountry(solutionLists, element.toElement.innerText));
  }, 500);
});

$(document).on('mouseout', '#additional_country', function (element) {
  $("#map").css("border", "none");
});

$(document).on('mouseenter', '#pr2__country', function (element) {
  timer = setTimeout(function () {
    map.setStyle("mapbox://styles/mapbox/satellite-streets-v11");
    map.setZoom(4);
    $("#map").css("border", "3px solid orange");
    map.setCenter(findCoordinatesByCountry(solutionLists, element.toElement.innerText));
  }, 500);
});

$(document).on('mouseout', '#pr2__country', function (element) {
  $("#map").css("border", "none");
});

$(document).on('mouseenter', '#additional_capital', function (element) {
  let str = element.toElement.innerText;
  let lastIndex = str.lastIndexOf(" ");
  str = str.substring(0, lastIndex);
  timer = setTimeout(function () {
    map.setStyle("mapbox://styles/mapbox/dark-v10");
    map.setZoom(6);
    $("#map").css("border", "3px solid black");
    map.setCenter(findCoordinatesByCaptial(solutionLists, str));
  }, 500);
})

$(document).on('mouseout', '#additional_capital', function (element) {
  map.setStyle("mapbox://styles/mapbox/satellite-streets-v11");
  map.setZoom(4);
  $("#map").css("border", "none");
})

// database.ref('answers/').push({"name": "테스트3", "intro": "인삿말"});

/*

현상태: load해왔다가 remove하면 안되는 현상 발생
*/

/*
CSV 파일 읽기: https://cloudstack.ninja/mrb/retrieve-a-remote-csv-file-using-fetch-api-in-js/
cors error 고치는 방법: https://velog.io/@takeknowledge/%EB%A1%9C%EC%BB%AC%EC%97%90%EC%84%9C-CORS-policy-%EA%B4%80%EB%A0%A8-%EC%97%90%EB%9F%AC%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-3gk4gyhreu
https://popcorn16.tistory.com/154 <- php 서버 불러와서 사용하기
https://jaenjoy.tistory.com/25 <- 이건 헤더 추가해야한다는 내용이지만 어쨌든 안 씀

https://code.tutsplus.com/ko/tutorials/parsing-a-csv-file-with-javascript--cms-25626 <- 현재 코드 출처



*/
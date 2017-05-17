"use strict";

var categoryList = ['id', 'firstName', 'lastName', 'email', 'phone'], // category list in the table
    currentPage = 1,                                                  // current (active) page
    recordsAmount = 10,                                               // amount of data table row on the page
    contentList,                                                      // data array that is used at data operations, generated from 
    showList,                                                         // data array that is shown on the page
    taskData;                                                         // the main data array (from JSON)

$(document).find('.btn_start').on('click', startLoading);
$(document).find(".btn_prev").on('click', prevPage);
$(document).find(".btn_next").on('click', nextPage);
$(document).find(".search__btn").on('click', search);

/******************
*  Load data
*******************/

// async function
async function loadData() {
  let response, data;
  
  $('.person-data__loading').html('<div class="loading"></div>');
  
  response = await fetch('http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&adress=%7BaddressObject%7D&description=%7Blorem%7C32%7D');
  data = await response.json();
  
  return data;
}

function startLoading(){
  // trigger async function
  // log response or catch error of fetch promise
  loadData()
      .then(data => {
        taskData = data;
        contentList = taskData;
        buildTable(contentList);
        $('.person-data__search, .person-data__nav, .person-data__view').removeClass('stashed');
        $('.btn_start, .person-data__loading').addClass('stashed');
      })
      .catch(reason => console.log(reason.message))
}

/******************
*  Build table
*******************/

function buildTable(arr, page) {
  var inHTML = "<thead><tr class='person-data__table-row'>",
      newItem;
      
  showList = [];
  
  if (!page) {
    currentPage = 1;
  } else if (page < 1) {
    currentPage = 1;
  } else if (page > numPages()) {
    currentPage = numPages();
  }
  
  // fill showList
  for (var i = (currentPage-1) * recordsAmount; 
           i < (currentPage * recordsAmount) && i < arr.length; i++) {
      if (!arr[i]) break;
      showList[i] = arr[i];
  }
  
  // create table header
  $(categoryList).each(function(index, elem) {
    newItem = "<td class='person-data__table-cell person-data__table-cell_head'>" + 
                                                                             elem + "</td>";
    inHTML += newItem;
  });
  
  inHTML += "</tr></thead><tbody>"
  
  // fill table cells 
  $(showList).each(function(index, elem) {
    inHTML += "<tr class='person-data__table-row'>";
    newItem = '';
    for (var prop in elem) {
      if (elem.hasOwnProperty(prop)) {
        
        if ($.inArray(prop, categoryList) !== -1) {
          newItem += "<td class='person-data__table-cell'>" + elem[prop] + "</td>";
        }
      }
    }
    inHTML += newItem + "</tr>";
  });
  
  inHTML += "</tbody>"
  
  $(".person-data__table").html(inHTML);
  $('.person-data__page-number').html(currentPage + ' / ' + numPages());
  setBtnState(currentPage);
  $(document).find("tbody .person-data__table-cell").on('click', showInView);
  $(document).find(".person-data__table-cell_head").on('click', sortData);
}

function numPages() {
  return Math.ceil(contentList.length / recordsAmount);
}

/**********************************
*  Set navigation button state
***********************************/

function setBtnState(page) {
  var btnNext = $(document).find(".btn_next"),
      btnPrev = $(document).find(".btn_prev");
  
  if (page === 1) {
    btnPrev.attr('disabled','disabled');
  } else {
    btnPrev.removeAttr('disabled');
  }

  if (page === numPages()) {
    btnNext.attr('disabled','disabled');
  } else {
    btnNext.removeAttr('disabled');
  }
}

/*******************
*  Toggle pages
********************/

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    buildTable(contentList, currentPage);
  }
}

function nextPage() {
  if (currentPage < numPages()) {
    currentPage++;
    buildTable(contentList, currentPage);
  }
}

/**************************************
*  Show data in the separate block
***************************************/

function showInView() {
  var index = $(this).parent().index();
  
  $(document).find('.contacts__name').text(showList[index].firstName + ' ' + 
                                                                showList[index].lastName);
  $(document).find('.contacts__descr').text(showList[index].description);
  $(document).find('.contacts__streetAddress').text(showList[index].adress.streetAddress);
  $(document).find('.contacts__city').text(showList[index].adress.city);
  $(document).find('.contacts__state').text(showList[index].adress.state);
  $(document).find('.contacts__zip').text(showList[index].adress.zip);
}

/****************
*  Sort data
*****************/

function sortData() {
  var index = $(this).index(),
      valueArr = [];
  
  if ($(this).hasClass('increase')) {
    $(this).removeClass('increase');
    contentList.reverse();
    buildTable(contentList);
    return $($('.person-data__table-cell_head')[index]).addClass('decrease');
  }
  
  // bubble sort
  var prop = categoryList[index],
      temp,
      swapped;
  
  do {
      swapped = false;
      for (var i = 0; i < contentList.length-1; i++) {
          if (contentList[i][prop] > contentList[i+1][prop]) {
              temp = contentList[i];
              contentList[i] = contentList[i+1];
              contentList[i+1] = temp;
              swapped = true;
          }
      }
  } while (swapped);   
  buildTable(contentList);
  $($('.person-data__table-cell_head')[index]).addClass('increase');
}

/******************
*  Filter data
*******************/

function search() {
  var value = $('.search__input')[0].value;
      
  var filteredData = taskData
                      .map(x=>[
                        x.id,
                        x.firstName,
                        x.lastName,
                        x.email,
                        x.phone].join(' '))
                      .reduce((sum, val, i)=>{
                        if (val.indexOf(value) !== -1) sum.push(i);
                        return sum;
                      },[])
                      .map(x=>taskData[x]);
      
  
  if (filteredData.length === 0) {
    currentPage = 1;
    $(".person-data__table").html('<tr><td>Нет совпадений</tr></td>');
  } else {
    contentList = filteredData;
    return buildTable(contentList);
  }
}
/* eslint-disable no-undef */
'use strict';

// Creating constructor for images objects
let page = 1;
let imageArr = [];
let optionsArr = [];
function ImageObj(image_url, keyword, title, horns) {
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;
  this.horns = horns;
  imageArr.push(this);
  optionsArr.push(keyword);
}

// Get that data form json file and create new instance
getDataAndRender(page);
function getDataAndRender(page) {
  $.get(`data/page-${page}.json`, function (data) {
    data.forEach((e) => {
      let newImage = new ImageObj(e.image_url, e.keyword, e.title, e.horns);
      newImage.render();
    });
    $('#photo-template').hide();
    createOptions(optionsArr);
  });
}

// function to render the images
ImageObj.prototype.render = function () {
  let template = $('#imageTemplate').html();
  let objRendered = Mustache.render(template,this);
  $('main').append(objRendered);
};

// creating options for select input
function createOptions(arr) {
  let uniqueOptionsArr = [...new Set(arr)];
  uniqueOptionsArr.forEach((e) => {
    $('select').append(`<option value="${e}">${e}</option>`);
  });
}

//Show selected images
showSelected();
function showSelected() {
  $('select').change(function () {
    let selected = $(this).val();
    $('section').hide();
    $(`.${selected}`).show();
  });
}

//sort event listner
$('#byKeyword').click(sortByKeyword);
$('#byHorns').click(sortByHorns);

// sort by keyword
function sortByKeyword() {
  imageArr.sort(function (a, b) {
    return a.keyword.localeCompare(b.keyword);
  });
  $('main > *:not(#photo-template)').fadeOut(300, function() { $(this).remove(); })
  imageArr.forEach((e) => {
    e.render();
  });
}

// sort by horns
function sortByHorns() {
  imageArr.sort(function (a, b) {
    return a.horns - b.horns;
  });
  $('main > *:not(#photo-template)').fadeOut(300, function() { $(this).remove(); })
  imageArr.forEach((e) => {
    e.render();
  });
}

$('#page1').click(choosePage(1));
$('#page2').click(choosePage(2));

function choosePage(num) {
  return function () {
    imageArr = [];
    optionsArr = [];
    $('main > *:not(#photo-template)').fadeOut(300, function() { $(this).remove(); })
    $('option').not(':first').remove();
    page = num;
    getDataAndRender(page);
  };
}

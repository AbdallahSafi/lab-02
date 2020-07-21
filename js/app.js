/* eslint-disable no-undef */
'use strict';

// Creating constructor for images objects
var imageArr = [];
var optionsArr = [];
function ImageObj(image_url, keyword, title, horns) {
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;
  this.horns = horns;
  imageArr.push(this);
  optionsArr.push(keyword);
}

// Get that data form json file and create new instance
$.get('data/page-1.json', function (data) {
  data.forEach((e) => {
    let newImage = new ImageObj(e.image_url, e.keyword, e.title, e.horns);
    newImage.render();
  });
  $('#photo-template').hide();
  createOptions(optionsArr);
});

// function to render the images
ImageObj.prototype.render = function () {
  let imageTemplate = $('#photo-template').clone().removeAttr('id style');
  imageTemplate.attr('class', this.keyword);
  imageTemplate.find('h2').text(this.keyword);
  imageTemplate.find('img').attr('src', this.image_url);
  imageTemplate.find('p').text(this.title);
  imageTemplate.appendTo('main');
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
  $('main > *:not(#photo-template)').remove();
  imageArr.forEach((e) => {
    e.render();
  });
}

// sort by horns
function sortByHorns() {
  imageArr.sort(function (a, b) {
    return a.horns - b.horns;
  });
  $('main > *:not(#photo-template)').remove();
  imageArr.forEach((e) => {
    e.render();
  });
}

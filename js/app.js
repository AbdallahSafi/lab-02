/* eslint-disable no-undef */
'use strict';

// Creating constructor for images objects
var imageArr = [];
function ImageObj(image_url, keyword, title) {
  this.image_url = image_url;
  this.keyword = keyword;
  this.title = title;
  imageArr.push(this);
}

// Get that data form json file and create new instance
$.get('data/page-1.json', function (data) {
  data.forEach((e) => {
    let newImage = new ImageObj(e.image_url, e.keyword, e.title);
    newImage.render();
  });
  removeTemplate();
});

// function to render the images
ImageObj.prototype.render = function () {
  console.log(this);
  let imageTemplate = $('#photo-template').clone().attr('id', this.keyword);
  imageTemplate.find('h2').text(this.keyword);
  imageTemplate.find('img').attr('src', this.image_url);
  imageTemplate.find('p').text(this.title);
  imageTemplate.appendTo('main');
};

//removing the template section
function removeTemplate() {
  $('#photo-template').remove();
}

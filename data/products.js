const fs = require("fs");
const  Sheet1  = require("./products.json");


// Declare our empty array we turn into the corrected JSON
let FixedSheet = [];

//Copies each object except for the options and images as we need to fine tune it
const cleanCopy = (mainObject) => {
  let copy = {};
  let key;

  for (key in mainObject) {
    if(!key.includes("Option") && !key.includes("images") ){
      copy[key] = mainObject[key]
    }
  }
  return copy
};

//Creates a correct options object
const createOptionsObj = obj => {
  let optionsArray = []

  for (let index = 1; index <= 5; index++) {
    if(obj.hasOwnProperty(`Option ${index} Name`)){
      let correctedOption = {}
      correctedOption = {
        type: obj[`Option ${index} Input Type`],
        name: obj[`Option ${index} Name`],
        choices: obj[`Option ${index} Values`].split(","),
      }
      if (obj[`Option ${index} Input Type`] !== 'COMBINATION' && obj[`Option ${index} Values`] !== "") optionsArray.push(correctedOption);
    }

  }
      return optionsArray;
}

const createImagesArray = obj => {
  return obj["images"].split(",")
}

let id = 1
//Goes through each object in our JSON and performs our fixes
Sheet1.forEach((obj) => {
  // copy this object to a new object we can work with, EXCEPT for options and images

  let copyObj = cleanCopy(obj);
  // extract the options and images and format them correctly as 1 object
  let optionsArray = createOptionsObj(obj)
  let imagesArray =  createImagesArray(obj)

  //attach our new options and images to the object
  copyObj.options = optionsArray
  copyObj.images = imagesArray
  copyObj.id = id
  copyObj.sku = copyObj.sku.toString()

  id++
  
  // push our corrected object to the starter array
  FixedSheet.push(copyObj)
});


let data = JSON.stringify(FixedSheet)

fs.writeFileSync('products-fixed.json', data)

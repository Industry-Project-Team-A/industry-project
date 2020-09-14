const fs = require("fs");
const products = require("./products-fixed.json");
const categories = require("./categories.json")

// add a blank array called productIds to every category
for (let index = 0; index < 22; index++) { 
     categories[index].productIds = [];
}

// loop through each product, then for every category ID add that product ID into the productsIDs array in the categorys array
for (let index = 0; index < products.length; index++) {
    const element = products[index].categoryIds

    element.forEach(product => {
        categories[product-1].productIds.push(products[index].id)
    })

}

let stringArray = []

categories.forEach(category => {
  string = category.id.toString()
  category["id"] = string

  stringArray.push(category)
})
//send the array back as a JSON and save to disk
let data = JSON.stringify(categories);

fs.writeFileSync("categories-fixed.json", data);
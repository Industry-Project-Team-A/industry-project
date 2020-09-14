const fs = require("fs");
const products = require("./products-fixed.json");
const skus = require("./sku.json")

let variationsArray = [];

let skuArray = [];

let countArray = [];

let i = 1;

products.forEach(prod => {
  prod.sku = prod.sku.toString()
})

skus.forEach(sku => {
  sku["Product SKU"] = sku["Product SKU"].toString();
})

isArrayNull = (arr) => {
  return typeof arr == "undefined";
};

products.forEach(prod => {
    countArray.push({
        sku: prod.sku.toString(),
        count: 0,
        logo: 0
    })
})

skus.forEach(skuSing => {
    if(skuSing["Product SKU"].length > 0){
        let baseSKU = skuSing["Product SKU"]
        let color = skuSing["Color"];
        let designNum = skuSing["Design Code"]
        
        skuArray.push({
            baseSKU: baseSKU,
            sku: `ZZZ.${baseSKU}.${color}.${designNum}`,
        })
    }
})


skuArray.forEach(fullSKU => {
    const skuTemp = fullSKU.baseSKU;
    const product = products.filter(prod => prod.sku == fullSKU.baseSKU)[0]

    const prodID = product.id
   
    const colorChoices = product.options[0].choices
    const numSKUs = skuArray.filter(x => x.baseSKU == product.sku).length
    const logosNum = numSKUs / colorChoices.length

    let logoField = product.options.findIndex(option => option.name === "Logo")
    let productIndex = countArray.findIndex(count => count.sku === skuTemp);
    let skuIndex = countArray[productIndex].count

    if(logosNum === 1) {
            const currColor = colorChoices[skuIndex];
    variationsArray.push({
    options: [
        {
            name: "Color",
            value: currColor
        }
    ],
      sku: fullSKU.sku,
      unlimited: true,
      productId: prodID,
      id: `${i}`
    });
    i++
    countArray[productIndex].count++
    }

        if (logosNum === 4) {
            let fourCount = skuIndex
            if(skuIndex > colorChoices.length - 1){
                fourCount = 0,
                countArray[productIndex].count = 0
                countArray[productIndex].logo += 1
            }
            let logoIndex = countArray[productIndex].logo

            const currColor = colorChoices[fourCount];
            const currLogo = product.options[logoField].choices[logoIndex];
 
          variationsArray.push({
            options: [
              {
                name: "Color",
                value: currColor
              },
              {
                  name: "Logo",
                  value: currLogo
              }
            ],
            sku: fullSKU.sku,
            unlimited: true,
            productId: prodID,
            id: `${i}`
          });
          i++
          countArray[productIndex].count++;
        }


})

let stringArray = [];

variationsArray.forEach((variation) => {
  string = variation.id.toString();
  variation["id"] = string;

  stringArray.push(variation);
});

let data = JSON.stringify(stringArray);

fs.writeFileSync("variations-fixed.json", data);





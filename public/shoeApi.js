var shoeList = [
        {brand: 'Adidas', color : 'black', price : 2500, in_stock : 15, size: 1},
        {brand: 'Adidas', color : 'black', price : 2500, in_stock : 13, size: 3},
        {brand: 'Adidas', color : 'white', price : 2500, in_stock : 20, size: 5},
        {brand: 'Adidas', color : 'peach', price : 2500, in_stock : 50, size: 6},
        {brand: 'Adidas', color : 'red', price : 2500, in_stock : 5, size: 2},
        {brand: 'Adidas', color : 'red', price : 2500, in_stock : 55, size: 10},
        {brand: 'Adidas', color : 'white', price : 2500, in_stock : 25, size: 7},
        {brand: 'Adidas', color : 'peach', price : 2500, in_stock : 13, size: 4},
        {brand: 'Adidas', color : 'green', price : 2500, in_stock : 54, size: 9},
        {brand: 'Adidas', color : 'green', price : 2500, in_stock : 70, size: 8},

        {brand: 'Puma', color : 'black', price : 1900, in_stock : 65, size: 1},
        {brand: 'Puma', color : 'black', price : 1900, in_stock : 30, size: 5},
        {brand: 'Puma', color : 'white', price : 1900, in_stock : 10, size: 3},
        {brand: 'Puma', color : 'red',   price : 1900, in_stock : 20, size: 6},
        {brand: 'Puma', color : 'peach', price : 1900, in_stock : 18, size: 2},
        {brand: 'Puma', color : 'white', price : 1900, in_stock : 80, size: 4},
        {brand: 'Puma', color : 'peach', price : 1900, in_stock : 12, size: 8},
        {brand: 'Puma', color : 'green', price : 1900, in_stock : 8, size: 10},
        {brand: 'Puma', color : 'peach', price : 1900, in_stock : 5, size: 7},
        {brand: 'Puma', color : 'green', price : 1900, in_stock : 16, size: 9},

        {brand: 'Nike', color : 'black', price : 2100, in_stock : 33, size: 1},
        {brand: 'Nike', color : 'black', price : 2100, in_stock : 60, size: 2},
        {brand: 'Nike', color : 'red',   price : 2100,   in_stock : 20, size: 6},
        {brand: 'Nike', color : 'peach', price : 2100, in_stock : 5, size: 5},
        {brand: 'Nike', color : 'white', price : 2100, in_stock : 22, size: 10},
        {brand: 'Nike', color : 'red', price : 2100, in_stock : 2, size: 4},
        {brand: 'Nike', color : 'white', price : 2100, in_stock : 69, size: 8},
        {brand: 'Nike', color : 'green', price : 2100, in_stock : 120, size: 7},
        {brand: 'Nike', color : 'peach', price : 2100, in_stock : 3, size: 9},
        {brand: 'Nike', color : 'green', price : 2100, in_stock : 1, size: 3}];
// compile template in order to display the data from the table in html.
var dropdown = document.getElementById("myTemplate").innerHTML;
var theTemplate = Handlebars.compile(dropdown);

    function uniqueBrand() { //create a built in function to create the unique brand values.
        "use strict";
    var brands = [];
    var BrandMap = {};

    for (var i=0; i<shoeList.length;i++){ // loop through the shoeList which is the object list
        var newBrand = shoeList[i];

        if(BrandMap[newBrand.brand] === undefined){ //if the brandMap is undefined
            BrandMap[newBrand.brand] = newBrand.brand; // take the value of the brand in the object list
            brands.push(newBrand.brand); // then push the new brand values to the new object list.
        }
    }
    document.querySelector(".searchBrand").innerHTML = theTemplate({brand: brands});

}

    uniqueBrand();


function uniqueColor(){
    "use strict";
    var colors = [];
    var ColorMap = {};

    for(var i=0; i<shoeList.length; i++){
        var newColor = shoeList[i];

        if(ColorMap[newColor.color]=== undefined){
            ColorMap[newColor.color]=newColor.color;
            colors.push(newColor.color);
        }
    }
    document.querySelector(".searchColor").innerHTML = theTemplate({color: colors});
}
    uniqueColor();

function uniqueSize(){
    "use strict";
    var sizes = [];
    var SizeMap = {};

    for(var i=0; i<shoeList.length; i++){
        var newSize = shoeList[i];

        if(SizeMap[newSize.size]=== undefined){
            SizeMap[newSize.size] = newSize.size;
            sizes.push(newSize.size);
        }
    }
    document.querySelector(".searchSize").innerHTML = theTemplate({size: sizes});
}
    uniqueSize();



function myFunction() {
    "use strict";
    // get the document from html in order to link them to Javascript
    var myBrand = document.querySelector(".searchBrand");
    var ShoeColor = document.querySelector(".searchColor");
    var mySize = document.querySelector(".searchSize");
   var display = document.getElementById("userDisplay");


     function theBrand(input) { // create a built in function that will return the value that will be equal to the input
         return myBrand.value == input.brand;
     }

       function theColor(input) {
         return ShoeColor.value == input.color;
     }

       function theSize(input) {
         return mySize.value == input.size;
     }

      // then filter the functions
     if(myBrand.value !==""){ // if the brand is selected
      var stock  = shoeList.filter(theBrand); // cfreate new variable that will filter the shoelist with the brand
       }

         if(ShoeColor.value !== ""){ // if color is selected
            if(myBrand.value !== "") { // and if brand is selected
            var stock  = stock.filter(theColor);
            } else {
            var stock  = shoeList.filter(theColor);
            }
        }

      if(mySize.value !== ""){
        if (myBrand.value !== "" || ShoeColor.value !== "") {
            var stock  = stock.filter(theSize);
     }else{
        var stock  = shoeList.filter(theSize);
     }
     }



     var theTemplateScript = document.getElementById("template").innerHTML;
    //console.log(stock);
    var theTemplate = Handlebars.compile(theTemplateScript);
         var showMyStock = theTemplate({
           stock: stock
                });
     display.innerHTML = showMyStock;
    // after pressing the search button the dropdown must be cleared
     if(stock === undefined){
        document.getElementById("userDisplay").innerHTML =  ("PLEASE SELECT ATLEAST ONE OPTION FIRST!!!!");
    }
     mySize.value = "";
     myBrand.value = "";
     ShoeColor.value = "";

}



function myAddStock(){
    "use strict";

    var addBrand = document.getElementById("addingBrand");
    var addColor = document.getElementById("addingColor");
    var addSize = document.getElementById("addingSize");
    var addStock = document.getElementById("addingStock");
    var addPrice = document.getElementById("addingPrice");
    var addDisplay = document.getElementById("showInfo");

var  stockAdding = {};
    createProperty('brand', addBrand.value.toLowerCase());
    createProperty('color', addColor.value.toLowerCase());
    createProperty('size', addSize.value);
    createProperty('in_stock', addStock.value);
    createProperty('price', addPrice.value);

function createProperty(propertyName,propertyValue){
  stockAdding [propertyName] = propertyValue;
}
    shoeList.push(stockAdding);


var addMoreBrands = document.querySelector(".searchBrand");
    var moreBrand = document.createElement("option");
    moreBrand.text = addBrand.value.toLowerCase();
    addMoreBrands.add(moreBrand);
    uniqueBrand();

 var addMoreColors = document.querySelector(".searchColor");
 var moreColor = document.createElement("option");
    moreColor.text = addColor.value.toLowerCase();
    addMoreColors.add(moreColor);
        uniqueColor();


    var addMoreSizes = document.querySelector(".searchSize");
    var moreSize = document.createElement("option");
    moreSize.text = addSize.value;
    addMoreSizes.add(moreSize);
    uniqueSize();


    addBrand.value = "";
    addColor.value = "";
    addSize.value = "";
    addStock.value = "";
    addPrice.value = "";
}

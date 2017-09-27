function searchShoes(){
        var shoeList;
        var dropdown = document.getElementById("myTemplate").innerHTML;
        var theTemplate = Handlebars.compile(dropdown);
        document.querySelector(".searchColor").innerHTML = theTemplate({color: colors});

        var result;

   $.ajax({
       url: 'http://localhost:3018/api/shoes/',
          type: 'GETS',
          dataType: 'jsonp',
          jsonp: 'jsonp',
          success: function (data) {
              console.log('success', data);
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log('error', errorThrown);
          }
  });

      return result;

}


//     function uniqueBrand() { //create a built in function to create the unique brand values.
//         "use strict";
//     var brands = [];
//     var BrandMap = {};
//
//     for (var i=0; i<shoeList.length;i++){ // loop through the shoeList which is the object list
//         var newBrand = shoeList[i];
//
//         if(BrandMap[newBrand.brand] === undefined){ //if the brandMap is undefined
//             BrandMap[newBrand.brand] = newBrand.brand; // take the value of the brand in the object list
//             brands.push(newBrand.brand); // then push the new brand values to the new object list.
//         }
//     }
//     document.querySelector(".searchBrand").innerHTML = theTemplate({brand: brands});
//
// }
//
//     uniqueBrand();
//
//
// function uniqueColor(){
//     "use strict";
//     var colors = [];
//     var ColorMap = {};
//
//     for(var i=0; i<shoeList.length; i++){
//         var newColor = shoeList[i];
//
//         if(ColorMap[newColor.color]=== undefined){
//             ColorMap[newColor.color]=newColor.color;
//             colors.push(newColor.color);
//         }
//     }
//     document.querySelector(".searchColor").innerHTML = theTemplate({color: colors});
// }
//     uniqueColor();
//
// function uniqueSize(){
//     "use strict";
//     var sizes = [];
//     var SizeMap = {};
//
//     for(var i=0; i<shoeList.length; i++){
//         var newSize = shoeList[i];
//
//         if(SizeMap[newSize.size]=== undefined){
//             SizeMap[newSize.size] = newSize.size;
//             sizes.push(newSize.size);
//         }
//     }
//     document.querySelector(".searchSize").innerHTML = theTemplate({size: sizes});
// }
//     uniqueSize();
//
//
//
// function myFunction() {
//     "use strict";
//     // get the document from html in order to link them to Javascript
//     var myBrand = document.querySelector(".searchBrand");
//     var ShoeColor = document.querySelector(".searchColor");
//     var mySize = document.querySelector(".searchSize");
//    var display = document.getElementById("userDisplay");
//
//
//      }
//
//
// //to show the data in the table
//      var theTemplateScript = document.getElementById("template").innerHTML;
//     //console.log(stock);
//     var theTemplate = Handlebars.compile(theTemplateScript);
//          var showMyStock = theTemplate({
//            stock: stock
//                 });
//      display.innerHTML = showMyStock;
//      if(stock === undefined){
//         document.getElementById("userDisplay").innerHTML =  ("PLEASE SELECT ATLEAST ONE OPTION FIRST!!!!");
//     }
//
//
//
//
// function myAddStock(){
//     "use strict";
//
//     var addBrand = document.getElementById("addingBrand");
//     var addColor = document.getElementById("addingColor");
//     var addSize = document.getElementById("addingSize");
//     var addStock = document.getElementById("addingStock");
//     var addPrice = document.getElementById("addingPrice");
//     var addDisplay = document.getElementById("showInfo");
//
// }

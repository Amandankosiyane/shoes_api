$(function() {
        var addDisplay = document.getElementById("showInfo");

        var table = document.getElementById("template").innerHTML;
        var theTemplate = Handlebars.compile(table);

// $("#searchStock").click(function(){

        // document.getElementById("searchStock").addEventListener("onclick", showAll)
        // function showAll(){
        $.ajax({
                url: 'http://localhost:3018/api/shoes',
                type: 'GET',
                success: function(data) {
                        addDisplay.innerHTML = theTemplate({
                                stock: data
                        })
                },
                error: function(error) {
                        // addDisplay.innerHTML = error
                        alert('Stock loading error');
                }
        });
});

//ajax add a shoe to the database
$('#addBtn').on('click', function() {
        var addDisplay = document.getElementById("showInfo");

        var table = document.getElementById("template").innerHTML;
        var theTemplate = Handlebars.compile(table);

    var Addshoes = {
        Brand: document.getElementById('addingBrand').value,
        Color: document.getElementById('addingColor').value,
        Size: document.getElementById('addingSize').value,
        InStock: document.getElementById('addingStock').value,
        Price: document.getElementById('addingPrice').value
    }
    $.ajax({
        type: "POST",
        url: 'http://localhost:3018/api/shoes',
        // dataType: 'application/json',
        // // data: Addshoes,
        success: function(Addshoes) {
                addDisplay.innerHTML = theTemplate({
                        stock: Addshoes
                })
        },
        error: function(error) {
                alert('failed while adding stock');
        }
})
})


//         document.getElementById("addBtn").addEventListener("onclick", myAddStock);
//         function myAddStock() {
//                 var addBrand = document.getElementById("addingBrand");
//                 var addColor = document.getElementById("addingColor");
//                 var addSize = document.getElementById("addingSize");
//                 var addStock = document.getElementById("addingStock");
//                 var addPrice = document.getElementById("addingPrice");
//
//                 var newShoes = {
//                         Brand: addBrand.value(),
//                         Color: addColor.value(),
//                         Size: addSize.value(),
//                         InStock: addStock.value(),
//                         Price: addPrice.value(),
//                 }
//
//                 $.ajax({
//                         url: 'http://localhost:3018/api/shoes/',
//                         type: 'POST',
//                         data: newShoes,
//                          dataType: application/json,
//                         success: function(data) {
//                                 console.log('sucess', data);
//                         },
//                         error: function(error) {
//                                 console.log('error', error)
//                         }
//                 })
//                 add.innerHTML = theTemplate({
//                         stock: newShoes
//                 });
//         }
// });

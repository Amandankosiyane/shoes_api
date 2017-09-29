$(function() {
        var addDisplay = document.getElementById("showInfo");

        var table = document.getElementById("template").innerHTML;
        var theTemplate = Handlebars.compile(table);

        // $("#searchStock").on("click", function(){
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
// });
        //ajax add a shoe to the database
        $('#addBtn').on('click', function() {
                var brand = document.getElementById('addingBrand').value;
                var color = document.getElementById('addingColor').value;
                var size = document.getElementById('addingSize').value;
                var stock = document.getElementById('addingStock').value;
                var price = document.getElementById('addingPrice').value;
                console.log(price);
                var addDisplay = document.getElementById("showInfo");

                var table = document.getElementById("template").innerHTML;
                var theTemplate = Handlebars.compile(table);

                var Addshoes = {
                        Brand: brand,
                        Color: color,
                        Size: size,
                        InStock: stock,
                        Price: price
                }
                console.log(Addshoes);
                $.ajax({
                        type: "POST",
                        url: 'http://localhost:3018/api/shoes',
                        dataType: 'application/json',
                        data: Addshoes,
                        success: function(data) {
                                console.log(Addshoes);
                                addDisplay.innerHTML = theTemplate({
                                        stock: Addshoes
                                })
                        },
                        error: function(error) {
                                alert('failed while adding stock');
                        }
                })
        })

        $('#showInfo').on('click', function(e){
                        // alert('welcome');

                        var addDisplay = document.getElementById("showInfo").innerHTML;

                        var table = document.getElementById("template").innerHTML;
                        var theTemplate = Handlebars.compile(table);
                        var shoeId = e.target.value;

                        $.ajax({
                                url: 'http://localhost:3018/api/shoes/sold/' + shoeId,
                                type: 'POST',
                                dataType: 'application/json',
                                error: function(data) {
                                        addDisplay.innerHTML = theTemplate({
                                                stock: shoeId.data
                                        })
                                },
                                sucess: function(error) {
                                        alert('error cant buy shoe')
                                }
                        })
                });
});

// filters through all the information in the database
$('#myInput').on('keyup', function() {

    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableData");
    tRow = table.getElementsByTagName("tr");
    for (i = 0; i < tRow.length; i++) {
        td = tRow[i].getElementsByTagName("td")[0];
        tdS = tRow[i].getElementsByTagName("td")[2];
        if (td || tdS) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || tdS.innerHTML.indexOf(filter) > -1) {
                tRow[i].style.display = "";
            } else {
                tRow[i].style.display = "none";
            }
        }
    }
});

$(function() {

        // Compiling the table
        var addDisplay = document.getElementById("showInfo");
        var table = document.getElementById("template").innerHTML;
        var theTemplate = Handlebars.compile(table);

        // Ajax call to display the data from the database
        $.ajax({
                url: 'https://secure-brushlands-15616.herokuapp.com/api/shoes',
                type: 'GET',
                success: function(data) {
                        addDisplay.innerHTML = theTemplate({
                                stock: data
                        })

                },
                error: function(error) {
                        // alert('Stock loading error');
                }
        });


        //ajax call to  add  shoes to the database
        $('#addBtn').on('click', function() {
                var showAlertMessage = document.getElementById("showMessage");
                var brand = document.getElementById('addingBrand').value.toUpperCase();
                var color = document.getElementById('addingColor').value.toUpperCase();
                var size = document.getElementById('addingSize').value;
                var stock = document.getElementById('addingStock').value;
                var price = document.getElementById('addingPrice').value;
                if (brand == null || brand.length == 0 && color == null || color.length == 0 && size == null || size.length == 0 && stock == null || stock.length == 0 && price == null || price.length == 0) {
                        showAlertMessage.innerHTML = "These fields must not be empty"
                        return false;
                }
                var addDisplay = document.getElementById("showInfo");

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
                        url: 'https://secure-brushlands-15616.herokuapp.com/api/shoes',
                        dataType: "json",
                        data: Addshoes,
                        success: function(data) {
                                addDisplay.innerHTML = theTemplate({
                                        stock: Addshoes
                                })
                        },
                        error: function(error) {
                                // alert('failed while adding stock');
                        }
                })
        })

        //Ajax call to buy shoes
        $('#showInfo').on('click', function(e) {

                var table = document.getElementById("template").innerHTML;
                var theTemplate = Handlebars.compile(table);
                var shoeId = e.target.value;

                $.ajax({
                        url: 'https://secure-brushlands-15616.herokuapp.com/api/shoes/sold/' + shoeId,
                        type: 'POST',
                        dataType: 'application/json',
                        success: function(data) {

                        },
                        error: function(error) {
                                // alert('error cant buy shoe')
                        }
                })
        });

        // Filter using a textbox, filter by brand and color
        $('#search').on('keyup', function() {
    var input, filter, table, tr, td;
    input = document.getElementById("myInput");
    filter = search.value.toUpperCase();
    table = document.getElementById("tableData");
    tr = table.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        tdS = tr[i].getElementsByTagName("td")[2];
        tdZ = tr[i].getElementsByTagName("td")[1];
        if (td || tdS) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || tdS.innerHTML.indexOf(filter) > -1 || tdZ.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
});


})

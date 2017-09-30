$(function() {
        var addDisplay = document.getElementById("showInfo");

        var table = document.getElementById("template").innerHTML;
        var theTemplate = Handlebars.compile(table);

        var dropDownDisplay = document.querySelector(".drops");

        var uniqueDropdowns = document.getElementById("dropDowns").innerHTML;
        var dropdowns = Handlebars.compile(uniqueDropdowns);

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
                        dropDownDisplay.innerHTML = dropdowns({
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

        $('#showInfo').on('click', function(e) {
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
                        //         addDisplay.innerHTML = theTemplate({
                        //                 stock: shoeId.data
                        //         })
                        },
                        sucess: function(error) {
                                alert('error cant buy shoe')
                        }
                })
        });

        // filters through all the information in the database
        $('#search').on('keyup', function() {

                var input, filter, table, tr, td;
                input = document.getElementById("myInput");
                filter = search.value.toUpperCase();
                table = document.getElementById("tableData");
                tRow = table.getElementsByTagName("tr");
                for (var i = 0; i < tRow.length; i++) {
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




        $('#filterBrand').on('change',function(e){
                var foundBrand = e.target.value;
                var drops = document.querySelector(".drops");
                var uniqueDropdowns = document.getElementById("dropDowns").innerHTML;
                var dropdowns = Handlebars.compile(uniqueDropdowns);

                var button, filter, table, tr, td;
                button = document.getElementById("filterBrand");
                filter = search.value.toUpperCase();
                table = document.getElementById("tableData");
                tRow = table.getElementsByTagName("tr");

                $.ajax({
                        url: 'http://localhost:3018/api/shoes/brand/' + foundBrand,
                        type: 'GET',
                        error: function(data) {
                                addDisplay.innerHTML = theTemplate({
                                        data
                                })
                                if (foundBrand.length <= 0) {
                                        dropDownDisplay.innerHTML = "No match"                                }
                                if (foundBrand.length< 0) {
                                        dropDownDisplay.innerHTML = dropdowns({
                                                stock: data
                                        })
                                }
                        },
                        sucess: function(error) {
                                alert('error cant buy shoe')
                        }
                //    addDisplay.innerHTML = tableSearch;

           })
   })
   .change();
        })

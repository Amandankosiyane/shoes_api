$(function() {

        // Compiling the table
        var addDisplay = document.getElementById("showInfo");
        var table = document.getElementById("template").innerHTML;
        var theTemplate = Handlebars.compile(table);

//  Compiling the brand dropdown
        var dropDownDisplay = document.querySelector("#filterBrandBtn");
        var dropDowns = document.getElementById("dropDowns").innerHTML;
        var uniqueDropdowns = Handlebars.compile(dropDowns);

//  Compiling the size
        var dropDownFilterSizeBtn = document.querySelector("#filterSizeBtn");
        var dropDownSize = document.getElementById("dropDownSize").innerHTML;
        var uniqueDropDownSize = Handlebars.compile(dropDownSize);

//  Compiling the color
        var dropDownColorFilter = document.querySelector("#filterColorBtn");
        var dropDownColor = document.getElementById("dropDownColor").innerHTML;
        var uniqueDropownColor = Handlebars.compile(dropDownColor);

// Ajax call for unique brand value and sort alphabetically

$.ajax({
        url: 'http://localhost:3018/api/shoes/brands',
        type: 'GET',
        success: function(data){
                dropDownDisplay.innerHTML = uniqueDropdowns({
                        brand: data.brands
                })
        },
        error: function(err){
                alert('error')
        }
})

// Ajax call for unique color value and sort alphabetically
$.ajax({
        url: 'http://localhost:3018/api/shoes/colors',
        type: 'GET',
        success: function(data){
                dropDownColorFilter.innerHTML = uniqueDropownColor({
                        color: data.colors
                })
        },
        error: function(err){
                alert('error')
        }
})

//Ajax call for unique size value and sort in ascending order
$.ajax({
        url: 'http://localhost:3018/api/shoes/sizes',
        type: 'GET',
        success: function(data){
                dropDownFilterSizeBtn.innerHTML = uniqueDropDownSize({
                        size: data.sizes
                })
        },
        error: function(err){
                alert('error')
        }
})

// Ajax call to display the all the shoes from  database
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
                var brand = document.getElementById('addingBrand').value;
                var color = document.getElementById('addingColor').value;
                var size = document.getElementById('addingSize').value;
                var stock = document.getElementById('addingStock').value;
                var price = document.getElementById('addingPrice').value;
                console.log(price);
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
                        url: 'http://localhost:3018/api/shoes',
                        dataType: "json",
                        data: Addshoes,
                        success: function(data) {
                                console.log(Addshoes);
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
                        url: 'http://localhost:3018/api/shoes/sold/' + shoeId,
                        type: 'POST',
                        dataType: 'application/json',
                        success: function(data) {
                                console.log(data.newShoes);
                                if (data.newShoes <= 0) {
                                        datanewShoes.style.display = "";
                                }
                        },
                        error: function(error) {
                                // alert('error cant buy shoe')
                        }
                })
        });

// Filter using a textbox, filter by brand and color
        $('#search').on('keyup', function() {
                var input, filter, found, table, tr, td;
                input = document.getElementById("myInput");
                filter = search.value.toUpperCase();
                table = document.getElementById("tableData");
                tr = table.getElementsByTagName("tr");
                for (var i = 0; i < tr.length; i++) {
                        td = tr[i].getElementsByTagName("td");
                        for (var j = 0; j < td.length; j++) {
                                if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                                        found = true;
                                }
                        }
                        if (found) {
                                tr[i].style.display = "";
                                found = false;
                        } else {
                                tr[i].style.display = "none";
                        }
                }
        })


//Ajax call to filter by brand
        $("#filterBrandBtn").on('click', function() {
                var filterBrand = document.getElementById("filterBrandBtn").value;

                console.log(filterBrand);

                var filterBrandUrl = 'http://localhost:3018/api/shoes/brand/' + filterBrand;

                $.ajax({
                        url: filterBrandUrl,
                        type: "GET",
                        success: function(data) {
                                addDisplay.innerHTML = theTemplate({
                                        stock: data.foundBrand
                                })
                        },
                        error: function(data) {
                                alert("error cant filter")
                        }
                })

        })


//  Ajax call to filter by size
        $("#filterSizeBtn").on("click", function() {
                var filterSze = document.querySelector("#filterSizeBtn");
                var size = filterSze.value;

                var filterSizeUrl = 'http://localhost:3018/api/shoes/size/' + size;
                $.ajax({
                        url: filterSizeUrl,
                        type: "GET",
                        success: function(data) {
                                addDisplay.innerHTML = theTemplate({
                                        stock: data.foundSize
                                })
                        },
                        error: function(err) {
                                alert('error while filtering')
                        }
                })
        })


        //  Ajax call to filter by color
        $("#filterColorBtn").on("click", function() {
                var filterColor = document.getElementById("filterColorBtn").value;
                var filterColorUrl = 'http://localhost:3018/api/shoes/color/' + filterColor;

                $.ajax({
                        url: filterColorUrl,
                        type: "GET",
                        success: function(data) {
                                addDisplay.innerHTML = theTemplate({
                                        stock: data.foundColor
                                })
                        },
                        error: function(err) {
                                alert('error while filtering color')
                        }
                })
        })
})

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

// Ajax call to display the data from the database
        $.ajax({
                url: 'http://localhost:3018/api/shoes',
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
                var displayMessage = document.getElementById('showMessage')
                var brand = document.getElementById('addingBrand').value.toUpperCase();
                var color = document.getElementById('addingColor').value.toUpperCase();
                var size = document.getElementById('addingSize').value;
                var stock = document.getElementById('addingStock').value;
                var price = document.getElementById('addingPrice').value;
                if (brand == null || brand.length == 0  && color == null || color.length == 0 && size == null || size.length == 0 && stock == null || stock.length == 0 && price == null || price.length == 0) {
                        alert('These fields must not be empty')
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
                        url: 'http://localhost:3018/api/shoes',
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
                        url: 'http://localhost:3018/api/shoes/sold/' + shoeId,
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























// $(function() {
//     var home_page = 'https://shoes-8.herokuapp.com/api/shoes'
//     //var home_page = 'http://localhost:4040/api/shoes/';
//
//     var myInfo = document.getElementById('myTable');
//     var template = Handlebars.compile(myInfo.innerHTML);
//     var display = document.getElementById('display');
//     var back_home = document.getElementsByClassName('back_home')
//
//     var brandDropdown = document.getElementById('brandDropdown');
//     var template_2 = Handlebars.compile(brandDropdown.innerHTML);
//     var MyBrandDropdown = document.getElementById('brands');
//
//     var sizeDropdown = document.getElementById('sizeDropdown');
//     var template_3 = Handlebars.compile(sizeDropdown.innerHTML);
//     var MySizeDropdown = document.getElementById('sizes');
//
//     // POST	/api/shoes	Add a new new shoe to his stock.
//
//     var $brand = $('#inputBrand');
//     var $color = $('#inputColor');
//     var $size = $('#inputSize');
//     var $price = $('#inputPrice');
//     var $instock = $('#inputInstock');
//
//     $('#regBtn').on('click', function(){
//         var stock = {
//             brand: $brand.val(),
//             color: $color.val(),
//             price: $price.val(),
//             size: $size.val(),
//             in_stock: $instock.val()
//         }
//         $.ajax({
//             type: 'POST',
//             url: home_page,
//             data: stock,
//             success: function (data) {
//                 console.log('New stock added!')
//             },
//             error: function() {
//                 console.log('error saving stock.');
//             }
//         })
//     })
//     // GET	/api/shoes	List all shoes in stock
//     $.ajax({
//         type: 'GET',
//         url: home_page,
//         success: function(data) {
//             function sortJSON(data, key, way) {
//                 return data.sort(function(a, b) {
//                     var x = a[key];
//                     var y = b[key];
//                     if (way === '123') {
//                         return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//                     }
//                     if (way === '321') {
//                         return ((x > y) ? -1 : ((x < y) ? 1 : 0));
//                     }
//                 });
//             }
//
//             data = sortJSON(data, 'brand', '123');
//
//             //Display all available stock
//             var tableSearch = template({
//                 data
//             });
//             display.innerHTML = tableSearch;
//
//             //Create a Dropdown Menu with Unique brand and size.
//
//             var uniQBrand = [],
//                 uniQSize = [];
//             var brandMap = {},
//                 sizeMap = {};
//
//             for (var i = 0; i < data.length; i++) {
//                 var b = data[i].brand,
//                     s = data[i].size;
//                 var foundBrand = false,
//                     foundSize = false;
//
//                 if (brandMap[b] === undefined) {
//                     brandMap[b] = b;
//                     uniQBrand.push(b);
//                 }
//                 if (sizeMap[s] === undefined) {
//                     sizeMap[s] = s;
//                     uniQSize.push(s);
//                 }
//
//             }
//             //Sort brand in alphabetical order
//             function sort(a, b) {
//                 return a - b;
//             }
//             uniQSize.sort();
//             uniQBrand.sort();
//             var tableSearch_2 = template_2({
//                 uniQBrand
//             });
//
//             var tableSearch_3 = template_3({
//                 uniQSize
//             });
//
//             MyBrandDropdown.innerHTML = tableSearch_2;
//             MySizeDropdown.innerHTML = tableSearch_3;
//         }
//     });
//
//     var theBrand = null;
//     var theSize = null;
//     // GET	/api/shoes/brand/:brandname	List all shoes for a given brand
//     $('#brands').on('click', function(e) {
//         var brand = e.target.text;
//         theBrand = brand;
//         $.ajax({
//             type: 'GET',
//             url: home_page + '/brand/' + brand,
//             success: function(data) {
//                 var tableSearch = template({
//                     data
//                 });
//                 display.innerHTML = tableSearch;
//
//                 if (theSize !== null) {
//                     $.ajax({
//                         type: 'GET',
//                         url: home_page + '/brand/' + theBrand + '/size/' + theSize,
//                         success: function(data) {
//                             var tableSearch = template({
//                                 data
//                             });
//
//                             if (data.length <= 0) {
//                                 display.innerHTML = 'No stock found.'
//                             }
//
//                             if (data.length > 0) {
//                                 display.innerHTML = tableSearch;
//                             }
//                             theBrand = null;
//                             theSize = null;
//                         }
//                     });
//                 }
//             }
//         });
//     });
//
//     // GET	/api/shoes/size/:size	List all shoes for a given size
//     $('#sizes').on('click', function(e) {
//         var size = e.target.text;
//         theSize = size
//         $.ajax({
//             type: 'GET',
//             url: home_page + '/size/' + size,
//             success: function(data) {
//                 if (theBrand === null) {
//                     var tableSearch = template({
//                         data
//                     });
//
//                     if (data.length <= 0) {
//                         display.innerHTML = 'No stock found.'
//                     }
//
//                     if (data.length > 0) {
//                         display.innerHTML = tableSearch;
//                     }
//                 }
//
//                 if (theBrand !== null) {
//                     $.ajax({
//                         type: 'GET',
//                         url: home_page + '/brand/' + theBrand + '/size/' + theSize,
//                         success: function(data) {
//                             var tableSearch = template({
//                                 data
//                             });
//
//                             if (data.length <= 0) {
//                                 display.innerHTML = 'No stock found.'
//                             }
//
//                             if (data.length > 0) {
//                                 display.innerHTML = tableSearch;
//                             }
//
//                             theBrand = null;
//                             theSize = null;
//                         }
//                     });
//                 }
//             }
//         });
//     });
//
//     // GET	/api/shoes/brand/:brandname/size/:size	List all shoes for a given brand and size
//     $('#search').on('keyup', function(e) {
//         var brandInput = e.target.value;
//         var myName = brandInput.toLowerCase();
//
//         function capitalizeFirstLetter(string) {
//             return string.charAt(0).toUpperCase() + string.slice(1);
//         }
//         var brand = capitalizeFirstLetter(myName)
//         theBrand = brand
//         $.ajax({
//             type: 'GET',
//             url: home_page + '/brand/' + brand,
//             success: function(data) {
//
//                 var tableSearch = template({
//                     data
//                 });
//
//                 if (data.length <= 0) {
//                     display.innerHTML = 'No stock found.'
//                 }
//
//                 if (data.length > 0) {
//                     display.innerHTML = tableSearch;
//                 }
//             }
//         })
//
//     })
//
//     // POST	/api/shoes/sold/:id	Update the stock levels when a shoe is sold
//     $('#display').on('click', function(e) {
//         var product_id = e.target.id;
//
//         //btn btn-primary btn-sm
//         $.ajax({
//             type: 'POST',
//             url: home_page + '/sold/' + product_id,
//             success: function(data) {
//                 var tableSearch = template({
//                     data
//                 });
//
//                 display.innerHTML = data + '.<br> <a href="" onClick="window.location.reload()">Search</>';
//             }
//         })
//     })
//
// });

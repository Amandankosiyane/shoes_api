$(function() {
                        var addDisplay = document.getElementById("showInfo");

                        var table = document.getElementById("template").innerHTML;
                        var theTemplate = Handlebars.compile(table);

                        var dropDownDisplay = document.querySelector(".drops");

                        // var uniqueDropdowns = document.getElementById("dropDowns").innerHTML;
                        // var dropdowns = Handlebars.compile(uniqueDropdowns);

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
                                        alert('Stock loading error');
                                }
                        });
                        // });
                        //ajax call to  add a shoe in the database
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

$('#search').on('keyup', function(){
    var input, filter, found, table, tr, td;
    input = document.getElementById("myInput");
    filter = search.value.toUpperCase();
    table = document.getElementById("tableData");
    tr = table.getElementsByTagName("tr");
    for (var  i = 0; i < tr.length; i++) {
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

$('#filterBrand').on('keyup', function(){
        var select, filter, found, table, tr, td;
        select = document.getElementById("filterBrand");
        filter = search.value.toUpperCase();
        table = document.getElementById('tableData');
        tr = document.getElementsByTagName('tr');
        for (var i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName('td');
                for (var i = 0; i < td.length; i++) {
                        if (td[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
                                found = true;
                        }
                }
        }
})


});

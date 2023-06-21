$(document).ready(function() {
    var items = [];

    // Adding to the list of items
    function addItem(item, quantity) {
        items.push({item: item, quantity: quantity});
        updateTable();
    }

    // Function to remove from list
    function removeItem(index) {
        items.splice(index, 1);
        updateTable();
    }

    // Updating the table with the current items
    function updateTable() {
        var tableBody = $('#itemTable tbody');
        tableBody.empty();

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var row = $('<tr>');
            row.append($('<td>').text(item.item));
            row.append($('<td>').text(item.quantity));
            row.append($('<td>').html('<button class="btn btn-danger delete-btn" data-index="' + i + '">Delete</button>'));
            tableBody.append(row);
        }
    }

    // Data submission
    $("#addItemForm").submit(function(event) {
        event.preventDefault();
        var item = $("#item").val();
        var quantity = $("#quantity").val();
        addItem(item, quantity);
        $("#item").val("");
        $("#quantity").val("");
    });

    // Delete button click
    $("#itemTable").on("click", ".delete-btn", function () {
        var index = $(this).data("index");
        removeItem(index);
    });
});

$(document).ready(function() {
    var items = [];

    // Sorting variables
    var sortColumn = null;
    var sortDirection = 1;

    // Adding to the list of items
    function addItem(item, quantity) {
        items.push({ item: item, quantity: quantity });
        updateTable();
    }

    // Function to remove from list
    function removeItem(index) {
        items.splice(index, 1);
        updateTable();
    }

    // Sort the items based on the current sorting column and direction
    function sortItems() {
        if (sortColumn === 'quantity') {
            items.sort(function(a, b) {
                return sortDirection * (a.quantity - b.quantity);
            });
        } else if (sortColumn === 'item') {
            items.sort(function(a, b) {
                return sortDirection * a.item.localeCompare(b.item);
            });
        }
    }

    // Toggle the sort direction when a column header is clicked
    function toggleSortDirection() {
        sortDirection *= -1;
    }

    // Updating the table with the current items
    function updateTable() {
        sortItems(); // Sort the items before updating the table
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
    $("#itemTable").on("click", ".delete-btn", function() {
        var index = $(this).data("index");
        removeItem(index);
    });

    // Column header click
    $("#itemTable").on("click", ".sortable", function() {
        var column = $(this).data("column");
        if (sortColumn === column) {
            toggleSortDirection();
        } else {
            sortColumn = column;
            sortDirection = 1;
        }
        updateTable();
    });
});

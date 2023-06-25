$(document).ready(function() {
    var items = [];

    // Sorting variables
    var sortColumn = null;
    var sortDirection = 1;

    // Adding to the list of items
    function addItem(movie, score) {
        items.push({ movie: movie, score: score });
        updateTable();
    }

    // Function to remove from the list
    function removeItem(index) {
        items.splice(index, 1);
        updateTable();
    }

    // Sort the items based on the current sorting column and direction
    function sortItems() {
        if (sortColumn === 'score') {
            items.sort(function(a, b) {
                return sortDirection * (a.score - b.score);
            });
        } else if (sortColumn === 'movie') {
            items.sort(function(a, b) {
                return sortDirection * a.movie.localeCompare(b.movie);
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
            row.append($('<td>').text(item.movie));
            row.append($('<td>').text(item.score));
            row.append($('<td>').html('<button class="btn btn-danger delete-btn" data-index="' + i + '">Delete</button>'));
            tableBody.append(row);
        }
    }

    // Data submission
    $("#addItemForm").submit(function(event) {
        event.preventDefault();
        var movie = $("#movie").val();
        var score = parseInt($("#score").val());
        addItem(movie, score);
        $("#movie").val("");
        $("#score").val("");
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

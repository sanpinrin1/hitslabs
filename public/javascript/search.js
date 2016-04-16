// Submit an NPI query when the submit button is clicked
$("#submitSearch").on("click", queryNPI);
$("#searchBox").keypress(function(e) {
    if (e.which === 13) { queryNPI(); }
});

/**
 * Queries the web service for NPI data
 */
function queryNPI() {
    var searchString = $("#searchBox").val();
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/searchNPI",
        data: { q: searchString },
        success: querySuccess,
        error: queryError
    });
}

/**
 *
 */
function querySuccess(data) {

    var resultsTable = $("#resultsTable");

    var dataHeaders = Object.keys(data[0]);
    var resultsTableHeader = $("<tr>");
    resultsTable.append(resultsTableHeader);

    for (var i = 0; i < dataHeaders.length; i++) {
        var headerCell = $("<td>").text(dataHeaders[i]);
        resultsTableHeader.append(headerCell);
    }

    for (i = 0; i < data.length; i++) {
        var currentData = data[i];
        var resultsRow = $("<tr>");
        resultsTable.append(resultsRow);
        for (var j = 0; j < dataHeaders.length; j++) {
            var currentDataKey = dataHeaders[j];
            var resultsRowCell = $("<td>").text(currentData[currentDataKey]);
            resultsRow.append(resultsRowCell);
        }
    }

    // resultRow.append("<td>test</td>");
}

function queryError() {
    console.log("error");
}


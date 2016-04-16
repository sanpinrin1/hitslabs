// Initialize required modules
var fs = require("fs");
var readline = require("readline");

// Export NPI search function
module.exports = searchNPI;

/**
 * Function handling HTTP GET requests for NPI database queries.
 * Users attempting to utilize this web service are expected to
 * pass query strings by assigning them to the "q" query parameter.
 * The expected response is a JSON array containing one object per
 * matching record.
 *
 * @param req Express generated request object
 * @param res Express generated response object
 */
function searchNPI(req, res) {

    var queryString = req.query.q;
    var queryStringRegExp = new RegExp(queryString, "i");
    var csvHeader = [], records = [];

    var npiFileName = __dirname + "/../data/npi_subset.csv";
    var npiLineReader = readline.createInterface({
        input: fs.createReadStream(npiFileName)
    });

    npiLineReader.on("line", handleLine);
    npiLineReader.on("close", handleFileClose);

    var didReadHeader = false;

    function handleLine(line) {
        var splitLineCSV = line.split(",");
        if (didReadHeader === false) {
            didReadHeader = true;
            for (var i = 0; i < splitLineCSV.length; i++) {
                csvHeader[i] = splitLineCSV[i].slice(1, -1);
            }
        }
        else if (queryStringRegExp.test(line)) {
            var currentRecord = {};
            for (i = 0; i < splitLineCSV.length; i++) {
                var currentHeader = csvHeader[i];
                var currentRecordData = splitLineCSV[i].slice(1, -1);
                if (currentRecordData !== "") {
                    currentRecord[currentHeader] = currentRecordData;
                }
            }
            records.push(currentRecord);
        }
    }

    function handleFileClose() {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(records));
    }

}


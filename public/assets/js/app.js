// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

function iniciarConexion(){
    conn = new Stardog.Connection();
    conn.setEndpoint("http://localhost:5820");
    conn.setReasoning("SL");
    conn.setCredentials("admin", "admin");
}

function query(){
    $("#resultados").html("");
    conn.query({
        database: "Pizza",
        query: "select distinct ?dataprop where { ?dataprop a owl:DatatypeProperty . OPTIONAL { ?dataprop rdfs:label ?label } }",
        limit: 10,
        offset: 0
    },
               function (data) {
        var table = $("#resultados");

        // get the sparql variables from the 'head' of the data.
        var headerVars = data.head.vars;

        // using the vars, make some table headers and add them to the table;
        var trHeaders = getTableHeaders(headerVars);
        table.append(trHeaders);

        // grab the actual results from the data.
        var bindings = data.results.bindings;

        // for each result, make a table row and add it to the table.
        for(rowIdx in bindings){
            table.append(getTableRow(headerVars, bindings[rowIdx]));
        }

    });

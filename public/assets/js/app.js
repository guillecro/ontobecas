// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var conn = null;
var ipStardog = "localhost"
var db = "Ontobecas"
var prefix = "PREFIX onto: <http://www.semanticweb.org/augusto/ontologies/2014/8/untitled-ontology-7#> "

function iniciarConexion(){
    if (conn == null){
        conn = new Stardog.Connection();
        conn.setEndpoint("http://localhost:5820");
        conn.setReasoning("SL");
        conn.setCredentials("admin", "admin");
    }
    else{
        return true;
    }
}

function ejecutarQuery(querySPARQL, handleData){
    if (conn == null){
        iniciarConexion();
    }
    if (conn != null){
        console.log(prefix + querySPARQL);
        conn.query({
            database: db,
            query: prefix + querySPARQL,
            limit: 10,
            offset: 0
        },
                   function (data) {
            handleData(data);
        }
                  );
    }
}

function getTableRow(headerVars, rowData) {
    var tr = $("<tr></tr>");
    for(var i in headerVars) {
        tr.append(getTableCell(headerVars[i], rowData));
    }
    return tr;
}

function getTableCell(fieldName, rowData) {
    var td = $("<td></td>");
    var fieldData = rowData[fieldName];
    td.html(fieldData["value"]);
    return td;
}

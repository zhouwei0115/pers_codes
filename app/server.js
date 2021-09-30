
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var cors = require('cors');
var app = express(); 
 
// Body Parser Middleware
app.use(bodyParser.json()); 
app.use(cors());
 
//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initializing connection string
var dbConfig = {
    user:  "sa",
    password: "DMC_Bootcamp123",
    server: "localhost",
    database: "BootcampDB"
};

//GET API
app.get('/api/v1/users', function (req, res) {
    // connect to the database
    sql.connect(dbConfig, function (err) {
    
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Users', function (err, recordset) {
            
            if (err) console.log(err)
            // send records as a response
            res.send(recordset);
            
        });
    });
});

app.get('/api/v1/sfc', function(req, res, next){
    var user = req.query.userId;
    var sfc = req.query.sfc;
    var personnelId;
    var varianceReasonCode;
    sql.connect(dbConfig, function (err) {
    
        if (err) console.log(err);
        var request = new sql.Request();
        console.log(`select personnelId from Users where userId='${user}'`);
  
        console.log(`select varianceReasonCode from VarianceReasonCodes where sfc='${sfc}'`);
        request.query(`select varianceReasonCode, personnelId from VarianceReasonCodes where sfc='${sfc}'`, function (err, recordset) {
            if (err) console.log(err)
            console.log(recordset)
            if ( recordset.recordset.length > 0 ){
                varianceReasonCode = recordset.recordset[0].varianceReasonCode;
                personnelId = recordset.recordset[0].personnelId;
            }
                
            console.log({'Personnel': personnelId,  'VarianceReasonCode': varianceReasonCode})
            res.send({'Personnel': personnelId,  'VarianceReasonCode': varianceReasonCode});
        });
        
    });
});

app.post('/api/v1/sfc', function(req, res, next){
    var sfc = req.body.sfc;
    var code = req.body.varianceReasonCode;
    var personnelId = req.body.personnelId;   
    sql.connect(dbConfig, function (err) {
    
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        request.query(`INSERT INTO VarianceReasonCodes values('${sfc}', '${code}', '${personnelId})`, function(err, result){
            console.log(err)
            res.send({'error': err, 'result':result})
        });
        
    });
});

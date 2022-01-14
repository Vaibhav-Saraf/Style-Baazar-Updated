module.exports = async function(req, res) {
    
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept");
    res.view('pages/adminLogin')

}
var Mcrypto = require('../utils/mcrypto');
var Code = require('../utils/code');

var verifyCode = (function(){
    var single;
    function getInstance(){
        if(single === undefined){
            single = new Construct();
        }
        return single;
    }
    function Construct(){
        this.code = Mcrypto.verifyCode(4);
    }
    return getInstance();
})();

var verifyCodeRest = function(req, res){
	var json = {
		code: Code.success,
		verifycode: verifyCode.code
	};
	res.send(json);
};

module.exports = verifyCodeRest;








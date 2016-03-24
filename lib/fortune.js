var fortuneCookie = [
	"line 1",
	"line 2",
	"line 3",
	"line 4",
	"line 5",
	];

exports.getFortune = function() {
	var idx = Math.floor(Math.random()
	* fortuneCookie.length);
		return fortuneCookie[idx];
};

(function() {
	"use strict";

  // Your code here ...
	function checkSyntax(str) {
		var brackets = "<>[]{}()",  
				storage = [], 
				pos;

		for (var i = 0; i < str.length; i++) {
			pos = brackets.indexOf(str[i]);
			
			if (pos === -1) { continue };

			if (pos % 2 === 0) {
				storage.push(pos + 1); 
			} else if (storage.pop() !== pos) {
				return 1;
			};
		}

		return (storage.length === 0) ? 0: 1;
	}

	// tests 
	try {
		test(checkSyntax, ["---(++++)----"], 0);
		test(checkSyntax, [""], 0);
		test(checkSyntax, ["before ( middle []) after "], 0);
		test(checkSyntax, [") ("], 1);
		test(checkSyntax, ["} {"], 1);
		test(checkSyntax, ["<(   >)"], 1);
		test(checkSyntax, ["(  [  <>  ()  ]  <>  )"], 0);
		test(checkSyntax, ["   (      [)"], 1);

		console.info("Congratulations! All tests success passed.");
	} catch(e) {
		console.error(e);
	}

	// test function
	function test(call, args, count, n) {
		let r = (call.apply(n, args) === count);
		console.assert(r, `Finded items count: ${count}`);
		if (!r) throw "Test failed!";
	}
})();
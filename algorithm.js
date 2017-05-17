(function() {
	"use strict";

	var pancakes = [0, 0, 0];

	pancakes.forEach((elem, i, arr) => {
		arr[i] += 1;
		if (i === arr.length - 1) {
			arr[0] += 1;
		} else {
			arr[i+1] += 1; 
		};
		console.log(i+1 + ' итерация: ' + arr)
	});
})();
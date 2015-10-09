var test = require('tape'),
	nodeify = require('..');


test('nodeify on resolve', function(t){

	t.plan(2);

	var callback = function(err, data) {
		t.error(err, "No Errors");
		t.same(data, 6, "Right data");
	};

	nodeify(callback,

		new Promise(function(resolve, reject) {
				setTimeout(resolve.bind(null, 6), 300);
			})

	);

});


test('nodeify on reject', function(t) {

	t.plan(2);

	var callback = function(err, data) {
		t.error(data, "No data");
		t.ok(err, "Error as expected");
	};

	nodeify(callback,

		new Promise(function(resolve, reject) {
			setTimeout(reject.bind(null, "Doh!"), 1500);
		})
	);


});



test('waits for all chained actions to happen', function(t) {

	t.plan(2);

	var promiseDelayMaker = function(n) {

		return new Promise(function(resolve, reject) {
			setTimeout(resolve.bind(null, n+1), Math.ceil( 1+Math.random() * 5 ));
		});

	};

	nodeify(

		function(err, data) {
			t.error(err, "No errors expected");
			t.same(5, data, "Ran through all 5 chains");
		},

		promiseDelayMaker(0)
			.then(promiseDelayMaker)
			.then(promiseDelayMaker)
			.then(promiseDelayMaker)
			.then(promiseDelayMaker)
	);

});


test('nodeify(cb).when(promise)', function(t) {

	t.plan(2);

	var promiseDelayMaker = function(n) {

		return new Promise(function(resolve, reject) {
			setTimeout(resolve.bind(null, n+1), Math.ceil( 1+Math.random() * 5 ));
		});

	};

	var cb = function(err, data) {
		t.error(err, "No errors expected");
		t.same(5, data, "Ran through all 5 chains");
	}

	nodeify(cb).when( promiseDelayMaker(0).then(promiseDelayMaker).then(promiseDelayMaker).then(promiseDelayMaker).then(promiseDelayMaker) );

})

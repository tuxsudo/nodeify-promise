# nodeify-promise

Notifies a node callback when a Promise has resolved or rejected


	var nodeify = require('nodeify-promise');

	nodeify(cb, Promise.resolve('yes'));
	nodeify(cb).when(Promise.reject('nope'));


`cb` would represent a node-style callback, eg: `function(err, data)`




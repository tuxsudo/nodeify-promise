function nodeify(callback, promiseInstance) {

	promiseInstance
		.then( function(data) {
			callback(null, data);
		})

		.catch( callback );

};



module.exports = function(callback, promiseInstance) {

	if(promiseInstance===undefined) {

		return {
			when: nodeify.bind(null, callback)
		};

	}

	return nodeify(callback, promiseInstance);

};

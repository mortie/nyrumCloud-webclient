(function() {
	window.lib = {};

	lib.callAPI = function(method, data, callback)
	{
		$.ajax(
		{
			"method": "POST",
			"url": "http://localhost:1337/"+method,
			"data": JSON.stringify(data),
			"dataType": "text",
			"success": function(data)
			{
				callback(JSON.parse(data));
			}
		});
	}
})();

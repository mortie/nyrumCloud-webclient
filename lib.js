(function() {
	window.lib = {};

	var token;

	lib.callAPI = function(method, data, callback)
	{
		data.token = token;
		$.ajax(
		{
			"method": "POST",
			"url": "http://"+conf.host+":"+1337+"/"+method,
			"data": JSON.stringify(data),
			"dataType": "text",
			"success": function(data)
			{
				callback(JSON.parse(data));
			}
		});
	}

	lib.auth = function(username, password, callback)
	{
		$.ajax(
		{
			"method": "POST",
			"url": "http://"+conf.host+":"+conf.port+"/auth",
			"data": JSON.stringify(
			{
				"username": username,
				"password": password
			}),
			"dataType": "text",
			"success": function(data)
			{
				data = JSON.parse(data);
				token = data.token;

				callback(data);
			}
		});
	}
})();

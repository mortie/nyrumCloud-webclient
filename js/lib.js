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
				data = JSON.parse(data);
				if (data.err)
					console.log("Error: "+data.err);
				if (callback)
					callback(data);
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
				if (data.err)
					console.log("Error: "+data.err);

				token = data.token;

				if (callback)
					callback(data);
			}
		});
	}
})();

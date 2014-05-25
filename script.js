function callAPI(method, data, callback) {
	$.ajax({
		"method": "POST",
		"url": "http://localhost:1337/"+method,
		"data": JSON.stringify(data),
		"dataType": "text",
		"success": function(res) {
			callback(JSON.parse(res));
		}
	})
}

callAPI("auth", {
	"username": "mort",
	"password": "aaa"
}, function(data) {
	console.log(data);
	callAPI("testToken", {
		"token": data.token
	}, function(data) {
		console.log(data);
	});
});

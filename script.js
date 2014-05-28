lib.auth("root", "root", function(data)
{
	lib.callAPI("testToken", {}, function(data)
	{
		console.log(data);
	});
});

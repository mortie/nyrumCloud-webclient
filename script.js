lib.callAPI("auth", 
{
	"username": "root",
	"password": "root"
}, function(data)
{
	console.log(data);
	lib.callAPI("testToken",
	{
		"token": data.token
	}, function(data)
	{
		console.log(data);
	});
});

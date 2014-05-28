(function()
{
	lib.auth("root", "root", init);

	var currentDir = "";

	function init()
	{
		//start by drawing the file browser
		drawBrowser();
		$("#fileUploadInput").on("change", function(e)
		{
			uploadFiles(e.target.files);
		});
	}

	function drawBrowser()
	{
		lib.callAPI("listDir",
		{
			"parent": currentDir
		}, function(data)
		{
			console.log(data);
		});
	}

	function uploadFiles(files)
	{
		if (window.File && window.FileReader && window.FileList && window.Blob)
		{
			var i;
			var file;
			for (i=0; file=files[i]; ++i)
			{
				console.log("doing "+file.name);
				var reader = new FileReader();

				reader.onload = function(e)
				{
					lib.callAPI("uploadFile",
					{
						"name": file.name,
						"data": e.target.result
					});
				}

				reader.readAsBinaryString(file);
			}
		}
		else
		{
			alert("Sorry, but your browser doesn't support the necessary features to upload files.");
		}
	}
})();

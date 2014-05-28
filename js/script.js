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
			e.target.value = "";
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
			for (i=0; i<files.length; ++i)
			{
				var file = files[i];
				if (file)
				{
					var reader = new FileReader();

					reader.onload = function(e)
					{
						var reader = e.target;

						lib.callAPI("uploadFile",
						{
							"name": reader.file.name,
							"data": reader.result,
							"mimetype": reader.file.type
						}, function(data)
						{
							console.log(data);
						});
					};

					reader.file = file;
					reader.readAsBinaryString(file);
				}
			}
		}
		else
		{
			alert("Sorry, but your browser doesn't support the necessary features to upload files.");
		}
	}
})();

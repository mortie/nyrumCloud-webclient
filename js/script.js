(function()
{
	var currentDir = window.location.hash.substring(1) || null;
	var parentDir;

	lib.auth("root", "root", function()
	{
		lib.callAPI("getParentDir",
		{
			"id": currentDir
		}, function(data)
		{
			parentDir = data.id;
			init();
		});
	});


	//functions to be run from the DOM
	window.domFuncs = {};

	domFuncs.changeDir = function(id)
	{
		currentDir = id;
		window.location.hash = id;
		console.log("parent: "+parentDir, "current: "+id);

		//get parent dir
		lib.callAPI("getParentDir",
		{
			"id": id
		}, function(data)
		{
			parentDir = data.id;
			drawBrowser();
		});
	}

	function init()
	{
		//start by drawing the file browser
		drawBrowser();

		//upload file handler
		$("#fileUploadInput").on("change", function(e)
		{
			uploadFiles(e.target.files, function(data)
			{
				drawBrowser();
			});
			e.target.value = "";
		});

		//new dir button handler
		$("#makeDir").on("click", function(e)
		{
			lib.callAPI("makeDir", 
			{
				"name": "New Folder",
				"parent": currentDir
			}, function(data)
			{
				drawBrowser();
			});
		});
	}

	function drawBrowser()
	{
		function draw(template, arr, element)
		{
			arr.forEach(function(entry)
			{
				var html = lib.template(template,
				{
					"name": entry.name,
					"id": entry.id
				});

				element.append(html);
			});
		};

		lib.callAPI("listDir",
		{
			"id": currentDir
		}, function(data)
		{
			var browser = $("#browser");

			//clear browser
			browser.empty();

			//draw link to parent
			browser.append(lib.template("parentDirLink",
			{
				"id": parentDir || null
			}));

			//draw files and dirs
			draw("browserDirEntry", data.directories, browser);
			draw("browserFileEntry", data.files, browser);
		});
	}

	function uploadFiles(files, callback)
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
							"mimetype": reader.file.type,
							"parent": currentDir
						}, function(data)
						{
							callback(data);
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

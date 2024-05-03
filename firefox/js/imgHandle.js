function getImgAsNativeType(src, type){	//Make gecko deal with conversion

	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function(){
		//make drawspace
		var HAZIDCcanv = document.createElement('canvas');
		var HAZIDCcon = HAZIDCcanv.getContext('2d');
		HAZIDCcanv.height = img.naturalHeight;
		HAZIDCcanv.width = img.naturalWidth;
		//draw image
		HAZIDCcon.drawImage(this, 0, 0);
		//convert and download
		HAZIDCcanv.toBlob(function(blob){
			let HAZIDCurl = URL.createObjectURL(blob); //turn to downloadable link
			//download converted image
			browser.downloads.download({url: HAZIDCurl, filename: `image.${type}`}).catch((e) => {
			//cleanup on error (will go here if user cancelled);
				URL.revokeObjectURL(HAZIDCurl);
				HAZIDCcanv.remove();
				return;
			});
		}, ("image/" + type)).then(() => {
			//normal cleanup
			URL.revokeObjextURL(HAZIDCurl);
			HAZIDCcanv.remove();
			return;
		});
	};
	//get image
	img.src = src;}

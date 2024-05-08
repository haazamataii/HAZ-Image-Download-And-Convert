/*
 *  HAZ-Image-Download-And-Convert : A Browser extention to save images in various formats.
 *  Copyright (C) 2024  haazamataii/hazamataii
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

function getImgAsNativeType(src, type){	//Make gecko deal with conversion
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function(){
		//make drawspace
		const HAZIDCcanv = document.createElement('canvas');
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

function getImgAsNonNativeType(src, type, typeCallback){
		getPixelArray(src)
			.then(pxlArr => {
				var fileArr = typeCallback(pxlArr);
				let blob = new Blob([fileArr], {type: "octet/stream"});
				let HAZIDCurl = URL.createObjectURL(blob);
				browser.downloads.download({url: HAZIDCurl, filename: `image.${type}`}).catch((e) => {
					URL.revokeObjectURL(HAZIDCurl);
					return;
				});
			})
			.then(() => {
				URL.revokeObjectURL(HAZIDCurl);
			});
}

function getPixelArray(src){
	return new Promise((resolve, reject) => {
		var img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = function(){
			//make drawspace
			const HAZIDCcanv = document.createElement('canvas');
			var HAZIDCcon = HAZIDCcanv.getContext('2d');
			HAZIDCcanv.height = img.naturalHeight;
			HAZIDCcanv.width = img.naturalWidth;
			//draw image
			HAZIDCcon.drawImage(this, 0, 0);
			//convert and download
			const pixelArr = HAZIDCcon.getImageData(0, 0, img.naturalWidth, img.naturalHeight, {colorSpace: "srgb"});
			//cleanUp
			img = null;
			HAZIDCcon = null;
			HAZIDCcanv.remove();
			resolve(pixelArr);
		};
		//get image
		img.src = src;
	});
}

/*FORMAT SPECS:*/
//Offset: data: reason : size

//0:"farbfeld":magicVal:8
//8:32-bit Big Endian uint : width:4
//12:32-bit Big Endian uint:height:4
//16:4 16-bit Big endian uint [RGBA]:
function getFF(pixelArr){
		let byteArray = new Uint8Array();
		let farbfeldHeader = new TextEncoder().encode("farbfeld");
		byteArray = Uint8Array.from([...byteArray, ...farbfeldHeader]);
		var tmpByteArr = numToBEUint32(pixelArr.width);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToBEUint32(pixelArr.height);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		//expand to 16-bit
		tmpByteArr = new Uint8Array((pixelArr.data.length << 1));
		var j = 0;
		for(var i = 0; i < tmpByteArr.length; i+= 8){	//
			tmpByteArr[i] = pixelArr.data[j];
			tmpByteArr[i+1] = 0;
			tmpByteArr[i+2] = pixelArr.data[j+1];
			tmpByteArr[i+3] = 0;
			tmpByteArr[i+4] = pixelArr.data[j+2];
			tmpByteArr[i+5] = 0;
			tmpByteArr[i+6] = pixelArr.data[j+3];
			tmpByteArr[i+7] = 0;
			j += 4;
		}
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = null;
		return byteArray;
}

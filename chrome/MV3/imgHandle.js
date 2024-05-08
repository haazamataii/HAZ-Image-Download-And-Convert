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

function getImgAsNativeType(src, type){	//Make browser deal with conversion
	//make offscreen doc	
	chrome.offscreen.createDocument({
		url: 'blank.html',
		reasons: [chrome.offscreen.Reason.BLOBS],
		justification: 'Native browser image type conversion',
	}, function(offScreenDoc) {
		//get image
		fetch(src)
		   .then(response => response.blob())
		   .then(blob => {
			return createImageBitmap(blob);
		   }).then(img => {
			//make drawspace
			var HAZIDCcanv = new OffscreenCanvas(img.width, img.height);
			var HAZIDCcon = HAZIDCcanv.getContext('2d');
			HAZIDCcanv.height = img.height;
			HAZIDCcanv.width = img.width;
			//draw image
			HAZIDCcon.drawImage(img, 0, 0);
			//convert and download
			HAZIDCcanv.convertToBlob({type: `image/${type}`}).then((blob) => {
				let reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onloadend = function(){
					chrome.downloads.download({saveAs: true, url: reader.result, filename: `image.${type}`}).catch((e) => {
					HAZIDCcanv = null;
					offScreenDoc.closeDocument();
					return;
				}).then(() => {
					HAZIDCcanv = null;
					offScreenDoc.closeDocument();
					return;
				});
				};
			});
		});
	
	});
}

function getImgAsNonNativeType(src, type, typeCallback, pxlArrCall){
		pxlArrCall(src)
			.then(pxlArr => {
				var fileArr = typeCallback(pxlArr);
				let blob = new Blob([fileArr], {type: "octet/stream"});
				let reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onloadend = function(){
					chrome.downloads.download({saveAs: true, url: reader.result, filename: `image.${type}`}).catch((e) => {
					return;
				}).then(() => {
					return;
				});
				};
			});
}

function getPixelArrFlipAll(src){
	return new Promise((resolve, reject) => {
		chrome.offscreen.createDocument({
		url: 'blank.html',
		reasons: [chrome.offscreen.Reason.BLOBS],
		justification: 'Native browser image type conversion',
	}, function(offScreenDoc) {
		//get image
		fetch(src)
		   .then(response => response.blob())
		   .then(blob => {
			return createImageBitmap(blob);
		   }).then(img => {
			//make drawspace
			var HAZIDCcanv = new OffscreenCanvas(img.width, img.height);
			var HAZIDCcon = HAZIDCcanv.getContext('2d');
			HAZIDCcanv.height = img.height;
			HAZIDCcanv.width = img.width;
			//draw image
			HAZIDCcon.translate(0, img.height);
			HAZIDCcon.scale(1, -1);
		  	HAZIDCcon.drawImage(img, 0, 0);
			const pixelArr = HAZIDCcon.getImageData(0, 0, img.width, img.height, {colorSpace: "srgb"});
			img = null;
			HAZIDCcon = null;
			resolve(pixelArr);
		   });
	
		});	
	});
}

function getPixelArray(src){
	return new Promise((resolve, reject) => {
		chrome.offscreen.createDocument({
		url: 'blank.html',
		reasons: [chrome.offscreen.Reason.BLOBS],
		justification: 'Native browser image type conversion',
	}, function(offScreenDoc) {
		//get image
		fetch(src)
		   .then(response => response.blob())
		   .then(blob => {
			return createImageBitmap(blob);
		   }).then(img => {
			//make drawspace
			var HAZIDCcanv = new OffscreenCanvas(img.width, img.height);
			var HAZIDCcon = HAZIDCcanv.getContext('2d');
			HAZIDCcanv.height = img.height;
			HAZIDCcanv.width = img.width;
			//draw image
			HAZIDCcon.drawImage(img, 0, 0);
		  	const pixelArr = HAZIDCcon.getImageData(0, 0, img.width, img.height, {colorSpace: "srgb"});
			img = null;
			HAZIDCcon = null;
			resolve(pixelArr);
		   });
	
		});	
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
		tmpByteArr = new Uint8Array((pixelArr.data.length << 1));
		var j = 0;
		for(var i = 0; i < tmpByteArr.length; i+= 8){
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

//0:"BM":magicVal:2
//8:32-bit Big Endian uint : width:4
//12:32-bit Big Endian uint:height:4
//16:4 16-bit Big endian uint [RGBA]:
function getBMP(pixelArr){
		let byteArray = new Uint8Array();
		let bmpHeader = new TextEncoder().encode("BM"); //mn
		byteArray = Uint8Array.from([...byteArray, ...bmpHeader]);
		var tmpByteArr = numToLEUint32((pixelArr.data.length+122+32)); //size
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToLEUint32(0); //res
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToLEUint32(122); //offset
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToLEUint32(108); //dib size
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToLEUint32(pixelArr.width); //w
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToLEUint32(pixelArr.height);//h
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToLEUint16(1);//planes
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToLEUint16(32);//bit depth
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToLEUint32(3);//compression
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToLEUint32(32);//img Size
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToLEUint32(2835);//pixel per metre w
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToLEUint32(2835);//ppm h
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToLEUint32(0);//colours
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToLEUint32(0);//important colours
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToBEUint32(0x00ff0000);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToBEUint32(0x0000ff00);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToBEUint32(0x000000ff);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToBEUint32(0xff000000);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = new Uint8Array(4);
		tmpByteArr[0] = 0x20;
		tmpByteArr[1] = 0x6e;
		tmpByteArr[2] = 0x69;
		tmpByteArr[3] = 0x57;
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
			tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
			tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
			tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
			tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
			tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
			tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
			tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
			tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
			tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
			tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
			tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
			tmpByteArr = numToBEUint32(0);
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);
		tmpByteArr = new Uint8Array(pixelArr.data.length);
		var j = pixelArr.data.length;
		j -= pixelArr.width;
		for(var i = 0; i < tmpByteArr.length; i += 4){
				tmpByteArr[i] = pixelArr.data[i+3];
				tmpByteArr[i+1] = pixelArr.data[i];
				tmpByteArr[i+2] = pixelArr.data[i+1];
				tmpByteArr[i+3] = pixelArr.data[i+2];
		}	
		byteArray = Uint8Array.from([...byteArray, ...tmpByteArr]);		
		tmpByteArr = null;
		return byteArray;
}

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

	console.log(src);
	
	chrome.offscreen.createDocument({
		url: 'blank.html',
		reasons: [chrome.offscreen.Reason.BLOBS],
		justification: 'Native browser image type conversion',
	}, function(offScreenDoc) {
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


async function getImgAsNativeTypeAVIF(src, type){	//Make gecko deal with conversion
	
	fetch(src)
.then(response => {
	if(response.headers.get('Content-Type') !== 'image/avif'){
		throw new Error('AVIF not supported');
	}
	return;
})
.then(response => {
	chrome.offscreen.createDocument({
		url: 'blank.html',
		reasons: [chrome.offscreen.Reason.BLOBS],
		justification: 'Native browser image type conversion',
	}, function(offScreenDoc) {
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
})
	.catch(e => {
		console.log(e);
		return;
	});
}

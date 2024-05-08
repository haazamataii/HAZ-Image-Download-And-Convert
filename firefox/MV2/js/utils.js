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

/*Endianness check for utils
 *true == little false == big
 */
const endianness = endianCheck();

function endianCheck(){
	let buffer = new ArrayBuffer(2);
	new DataView(buffer).setInt16(0, 256, true);
	return new Int16Array(buffer)[0] === 256;
}

function numToBEUint16(num){
	let byteArr = new Uint8Array(2);
	if(endianness){
		byteArr[0] = (num & 0xff00) >> 8;
		byteArr[1] = num & 0xff;
	} else {
		byteArr[0] = num & 0xff;
		byteArr[1] = (num & 0xff00) >> 8;
	}
	return byteArr;
}
function numToBEUint32(num){
	let byteArr = new Uint8Array(4);
	if(endianness){
		byteArr[0] = (num & 0xff000000) >> 24;
		byteArr[1] = (num & 0xff0000) >> 16;
		byteArr[2] = (num & 0xff00) >> 8;
		byteArr[3] = num & 0xff;
	} else {
		byteArr[0] = num & 0xff;
		byteArr[1] = (num & 0xff00) >> 8;
		byteArr[2] = (num & 0xff0000) >> 16;
		byteArr[3] = (num & 0xff000000) >> 24;
	}
	return byteArr;
}

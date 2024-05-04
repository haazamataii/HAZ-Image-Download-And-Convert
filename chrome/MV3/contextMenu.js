/*
 *
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


function onCreated(){}



//make righClick menu entries
chrome.contextMenus.create(
	{
		id: "GetImageAsIs",
		type: "radio",
		title: chrome.i18n.getMessage("menuItemGetAsIs"),
		contexts: ["image"],
		checked: true,
	},
	onCreated);
chrome.contextMenus.create(
	{
		id: "sep-1",
		type: "separator",
		contexts: ["image"],
	}, onCreated);
chrome.contextMenus.create(
	{
		id: "HazIDCGetAsJPEG",
		type: "radio",
		title: chrome.i18n.getMessage("menuItemGetAsJPEG"),
		contexts: ["image"],
		checked: true,
	}, onCreated);

chrome.contextMenus.create(
	{
		id: "HazIDCGetAsPNG",
		type: "radio",
		title: chrome.i18n.getMessage("menuItemGetAsPNG"),
		contexts: ["image"],
		checked: true,
	}, onCreated);
chrome.contextMenus.create(
	{
		id: "HazIDCGetAsWebP",
		type: "radio",
		title: chrome.i18n.getMessage("menuItemGetAsWebP"),
		contexts: ["image"],
		checked: true,
	}, onCreated);

//Listener for option getting pressed
chrome.contextMenus.onClicked.addListener((info, tab) => {
	switch(info.menuItemId){
		case "GetImageAsIs":
			//download as is
			chrome.downloads.download({url: `${info.srcUrl}`}).catch((error) =>{
				return;
			});
			break;
		case "HazIDCGetAsJPEG":
			getImgAsNativeType(info.srcUrl, 'jpeg');
			break;
		case "HazIDCGetAsPNG":
			getImgAsNativeType(info.srcUrl, 'png');
			break;
		case "HazIDCGetAsWebP":
			getImgAsNativeType(info.srcUrl, 'webp');
			break;	
	}
});

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

let browserVersion = parseFloat(navigator.userAgent.split('Firefox/').pop(), 10);

//make righClick menu entries
browser.contextMenus.create(
	{
		id: "GetImageAsIs",
		title: browser.i18n.getMessage("menuItemGetAsIs"),
		contexts: ["image"],
		checked: true,
		icons:{
			"16": "icons/asIs16.png",
			"32": "icons/asIs32.png"
		}
	},
	onCreated);
browser.contextMenus.create(
	{
		id: "sep-1",
		type: "separator",
		contexts: ["image"],
	}, onCreated);
if(browserVersion >= 93){
	browser.contextMenus.create(
		{
			id: "HazIDCGetAsAVIF",
			title: browser.i18n.getMessage("menuItemGetAsAVIF"),
			contexts: ["image"],
			checked: true,
			icons:{
				"16": "icons/asAvif16.png",
				"32": "icons/asAvif32.png"
			}
		}, onCreated);
}
browser.contextMenus.create(
	{
		id: "HazIDCGetAsBMP",
		title: browser.i18n.getMessage("menuItemGetAsBMP"),
		contexts: ["image"],
		checked: true,
		icons:{
			"16": "icons/asBmp16.png",
			"32": "icons/asBmp32.png"
		}
	}, onCreated);
browser.contextMenus.create(
	{
		id: "HazIDCGetAsICO",
		title: browser.i18n.getMessage("menuItemGetAsICO"),
		contexts: ["image"],
		checked: true,
		icons:{
			"16": "icons/asIco16.png",
			"32": "icons/asIco32.png"
		}
	}, onCreated);
browser.contextMenus.create(
	{
		id: "HazIDCGetAsJPEG",
		title: browser.i18n.getMessage("menuItemGetAsJPEG"),
		contexts: ["image"],
		checked: true,
		icons:{
			"16": "icons/asJpeg16.png",
			"32": "icons/asJpeg32.png"
		}
	}, onCreated);

browser.contextMenus.create(
	{
		id: "HazIDCGetAsPNG",
		title: browser.i18n.getMessage("menuItemGetAsPNG"),
		contexts: ["image"],
		checked: true,
		icons:{
			"16": "icons/asPng16.png",
			"32": "icons/asPng32.png"
		}
	}, onCreated);
browser.contextMenus.create(
	{
		id: "HazIDCGetAsWebP",
		title: browser.i18n.getMessage("menuItemGetAsWebP"),
		contexts: ["image"],
		checked: true,
		icons:{
			"16": "icons/asWebP16.png",
			"32": "icons/asWebP32.png"
		}
	}, onCreated);
browser.contextMenus.create(
	{
		id: "sep-2",
		type: "separator",
		contexts: ["image"],
	}, onCreated);
browser.contextMenus.create(
	{
		id: "HazIDCGetAsFF",
		title: browser.i18n.getMessage("menuItemGetAsFF"),
		contexts: ["image"],
		checked: true,
		icons:{
			"16": "icons/asFf16.png",
			"32": "icons/asFf32.png"
		}
	}, onCreated);
//Listener for option getting pressed
browser.contextMenus.onClicked.addListener((info, tab) => {
	switch(info.menuItemId){
		case "GetImageAsIs":
			//download as is
			if(!info.srcUrl.startsWith("data:")){
				browser.downloads.download({url: `${info.srcUrl}`}).catch((error) =>{
					return;
				});
			}
			//cant normally get data: but getImgAsNativeType can so pass it in with it's type
			getImgAsNativeType(info.srcUrl, info.srcUrl.substr(info.srcUrl.indexOf('/')+1, (info.srcUrl.indexOf(';') - info.srcUrl.indexOf('/')-1)));
			break;
		case "HazIDCGetAsAVIF":
			getImgAsNativeType(info.srcUrl, 'avif');
			break;
		case "HazIDCGetAsBMP":
			getImgAsNativeType(info.srcUrl, 'bmp');
			break;
		case "HazIDCGetAsICO":
			getImgAsNativeType(info.srcUrl, 'ico');
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
		case "HazIDCGetAsFF":
			getImgAsNonNativeType(info.srcUrl, 'ff', getFF);
	}
});

function onCreated(){}

let browserVersion = parseFloat(navigator.userAgent.split('Firefox/').pop(), 10);

console.log(browserVersion);

//make righClick menu entries
browser.contextMenus.create(
	{
		id: "GetImageAsIs",
		type: "radio",
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
			type: "radio",
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
		type: "radio",
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
		type: "radio",
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
		type: "radio",
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
		type: "radio",
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
		type: "radio",
		title: browser.i18n.getMessage("menuItemGetAsWebP"),
		contexts: ["image"],
		checked: true,
		icons:{
			"16": "icons/asWebP16.png",
			"32": "icons/asWebP32.png"
		}
	}, onCreated);

//Listener for option getting pressed
browser.contextMenus.onClicked.addListener((info, tab) => {
	console.log(info.menuItemId);
	switch(info.menuItemId){
		case "GetImageAsIs":
			//download as is
			browser.downloads.download({url: `${info.srcUrl}`}).catch((error) =>{
				return;
			});
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
	}
});

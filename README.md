Image Download Conversion

Simple Browser Extension to save images as a different format than the one they are in

###Usage
Right click an <img> element, go to the HAZ Image Download And Converter in the right-click menu and select a format to save the image as.

 - [ ] Not Implemented
 - [x] Implemented

###Planned Browser Support
 - [x]Chrome
 - [x]Firefox

[Native] Format is done with basic browser apis (ie. draw to canvas then save canvas as format)
[Self Implemented] Format is probably not natively supported by browsers and either has or needs self implementation.
 :v#.# (Extension version support was added)
###Firefox Support:
##Convert to Formats:
 - [x] AVIF		[Native] (Firefox Min: 93)	:v0.1
 - [x] BMP		[Native]			:v0.1
 - [x] Farbfeld		[Self Implement]
 - [ ] HEIF		[Self Implement]
 - [x] ICO		[Native]			:v0.1
 - [x] JPEG		[Native]			:v0.1
 - [x] PNG		[Native]			:v0.1
 - [ ] TIFF		[Self Implement]
 - [x] WebP		[Native]			:v0.1

##Convert From Formats:
 - [x] AVIF (Firefox Min: 93)		:v0.1
 - [x] BMP				:v0.1
 - [ ] Canvas
 - [x] ICO				:v0.1
 - [x] JPEG				:v0.1
 - [x] PNG				:v0.1
 - [ ] SVG
 - [x] WebP				:v0.1
 - [x] data:				:v0.1 (Partial["Save As Is" not supported]) 
 - [ ] file:
 - [x] More or less, any format that can be displayed natively in image typed elements that are still ie. <img> :v0.1

###Chrome Support
##Convert to Formats:
 - [ ] AVIF		[Self Implement]
 - [-] BMP		[Self Implement]	(Kind of implemented, a little shift to the right on saved image)
 - [x] Farbfeld		[Self Implement]
 - [ ] HEIF		[Self Implement]
 - [ ] ICO		[Self Implement]
 - [x] JPEG		[Native]			:v0.1
 - [x] PNG		[Native]			:v0.1
 - [ ] TIFF		[Self Implement]
 - [x] WebP		[Native]			:v0.1

##Convert From Formats:
 - [x] AVIF (Chrome Min: 85)		:v0.1
 - [x] BMP				:v0.1
 - [ ] Canvas
 - [x] ICO				:v0.1
 - [x] JPEG				:v0.1
 - [x] PNG				:v0.1
 - [ ] SVG
 - [x] WebP				:v0.1
 - [x] data:				:v0.1
 - [ ] file:
 - [x] More or less, any format that can be displayed natively in image typed elements that are still ie. <img> :v0.1



###Planned Features:
 - [x] Quick convert via context menu
 - [ ] Menu to get all images on active tab
 - [ ] Image Quality Control for conversion
 - [ ] Maybe an android version


###Notes:
data: images not saving in the firefox MV2 extension has been fixed, if using 0.1v, data: images will not save when using the "Save As Is" option.

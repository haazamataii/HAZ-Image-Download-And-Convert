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

###Firefox Support:
##Convert to Formats:
 - [x] AVIF		[Canvas] (Firefox Min: 93)
 - [x] BMP		[Canvas]
 - [ ] Farbfeld		[Self Implement]
 - [ ] HEIF		[Self Implement]
 - [x] ICO		[Canvas]
 - [x] JPEG		[Canvas]
 - [x] PNG		[Canvas]
 - [ ] TIFF		[Self Implement]
 - [x] WebP		[Canvas]

##Convert From Formats:
 - [x] AVIF (Firefox Min: 93)
 - [x] BMP
 - [ ] Canvas
 - [x] ICO
 - [x] JPEG
 - [x] PNG
 - [ ] SVG
 - [x] WebP

###Chrome Support
##Convert to Formats:
 - [ ] AVIF		[Self Implement]
 - [ ] BMP		[Native]
 - [ ] Farbfeld		[Self Implement]
 - [ ] HEIF		[Self Implement]
 - [ ] ICO		[Self Implement]
 - [x] JPEG		[Native]
 - [x] PNG		[Native]
 - [ ] TIFF		[Self Implement]
 - [x] WebP		[Native]

##Convert From Formats:
 - [ ] AVIF
 - [ ] BMP
 - [ ] Canvas
 - [ ] ICO
 - [x] JPEG
 - [x] PNG
 - [ ] SVG
 - [x] WebP



###Planned Features:
 - [x] Quick convert via context menu
 - [ ] Menu to get all images on active tab
 - [ ] Image Quality Control for conversion
 - [ ] Maybe an android version


###Notes:
 Save as Is option is limited to non data: images, to get data: images, you must select a specific image type.

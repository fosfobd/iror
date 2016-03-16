# image responsiveness optimization by ratio (iror)

This is a jQuery plugin to enhance the responsiveness of background images, stretching and moving them around, while also respecting their ratio.

You can choose between 2 behaviors for your background:
- match the browser's window size (default)
- match an element's contents' size (a div for example)

Additionally, iror allows you to set the following for each background image:
- focal point (based on adam bradley's https://github.com/adamdbradley/focal-point)
- callback on bg image load

Demo url: http://softteknews.com/irordemo/

# Usage


default (fill-window behavior, focal point at center, no callback):
`$("#sectionhello").iror({
					image_src : "img/bring_the_pain_by_mattahan.jpg"
				});`

fill-content behavior (focal point at center, no callback):
`$("#sectioncontent").iror({
					image_src : "img/the_twister_by_mattahan.jpg",
					behavior: "fillcontent"
				});`

set a focal point:
`$("#sectionfocalleft").iror({
					image_src : "img/betta_listen_by_mattahan.jpg",
					focalpointx : "left-5",
					focalpointy : "top-5"
				});`


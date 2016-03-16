# image responsiveness optimization by ratio (iror)

This is a jQuery plugin to enhance the responsiveness of background images, stretching and moving them around, while also respecting their ratio.

You can choose between 2 behaviors for your background:
- match the browser's window size (default)
- match an element's contents' size (a div for example)

Additionally, iror allows you to set the following for each background image:
- focal point (based on adam bradley's https://github.com/adamdbradley/focal-point)
- callback on bg image load

Demo url: http://softteknews.com/irordemo

# Usage
after adding the iror.css and jquery.iror.js to the head of your page

**the markup:**
```html
<div class="irorsection" id="sectionhello">
	
	yourcontent...
	
</div>
```

with bootstrap:
```html
<div class="irorsection" id="sectionhello">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
			
				yourcontent...
			
			</div>
		</div>
	</div>
</div>
			
```

**js**

default (fill-window behavior, focal point at center, no callback):
```javascript
$("#sectionhello").iror({
	image_src : "img/bghello.jpg"
});
```

fill-content behavior (focal point at center, no callback):
```javascript
$("#sectioncontent").iror({
	image_src : "img/bgcontent.jpg",
	behavior: "fillcontent"
});
```

set a focal point:
```javascript
$("#sectionfocalleft").iror({
	image_src : "img/bgfocalleft.jpg",
	focalpointx : "left-5",
	focalpointy : "top-5"
});
```


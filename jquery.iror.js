/**
 * by Pablo Balderas
 * 
 * version 0.6
 * http://www.softtek.com
 * 
 * == 0.6
 * - can now include a callback in the options, it will run after the bg loads
 * == 0.5
 * - added default options
 * == 0.4
 * - added behaviors:
 * 		- behavior 1: image dimension = window dimension (AKA: fillwindow)
 * 		- behavior 2: image dimension = content dimension (AKA: fillcontent)
 * == 0.3
 * - added focal point functionality
 * == 0.2 
 * - prepend, dont replace parent's html
 * - position: absolute the image, so it can play with same-level siblings
 * == 0.1
 * - replace parent's content with image
 * - position: relative the image, parent is position: absolute       
 */
;
(function($){
	$.fn.iror = function( options ){
		
		var defaults = {
			image_src : "",
			focalpointx : "left-0",
			focalpointy : "top-0",
			behavior : "fillwindow",
			runafterload: null
		};
		
		var opts = $.extend( {}, defaults, options );
		
		var parent = this;
		
		var bg = new Image();
		var bgratio = 0;
		var winratio = 0;
		var contentratio;
		
		var focaldirectionx = opts.focalpointx.split("-")[0]; // top-1 , left-3 , bottom-5 , right-2
		var focalmagnitudex = opts.focalpointx.split("-")[1];
		var focaldirectiony = opts.focalpointy.split("-")[0];
		var focalmagnitudey = opts.focalpointy.split("-")[1];
		
		var focalpoint_settings = {
				size_x:10,
				size_y:10
		};
		
		function calculateFocalPointVerticalFix(remainder){
			
			var result = remainder;
			var percent = (1 / (focalpoint_settings.size_y / 2)) * (focalmagnitudey);
			
			if ( focaldirectiony === "bottom"){
				result = remainder + (remainder * percent);
			} else if ( focaldirectiony === "top"){
				result = remainder - (remainder * percent);
			}
			
			return result;
			
		}
		
		function calculateFocalPointHorizontalFix(remainder){
			
			var result = remainder;
			var percent = (1 / (focalpoint_settings.size_x / 2)) * (focalmagnitudex);
			
			if ( focaldirectionx === "right"){
				result = remainder + (remainder * percent);
			} else if ( focaldirectionx === "left"){
				result = remainder - (remainder * percent);
			}
			
			return result;
			
		}
		
		function cropHorizontallyByWindow(){
			
			// set the image's height to the window's height
			$( bg ).height( $( window ).height() );
			
			// fix the width accordingly, keep aspect ratio
			var newwidth = $(bg).height() / bgratio;
			$( bg ).width( newwidth );
			
			// apply focal point
			var remainder = (bg.width / 2) - ($( window ).width() / 2);
			var bgxfix = calculateFocalPointHorizontalFix(remainder);
			$( bg ).css("left", "-"+bgxfix+"px");
			
			// un-center the image in the y axis
			$( bg ).css("top", "0px");
			
		}
		
		function cropVerticallyByWindow(){
			
			// set the image's width to the window's width
			$( bg ).width( $( window ).width() );
			
			// fix the height accordingly, keep aspect ratio
			var newheight = $(bg).width() * bgratio;
			$( bg ).height( newheight );
			
			// apply focal point
			var remainder = (bg.height / 2) - ($( window ).height() / 2);
			var bgyfix = calculateFocalPointVerticalFix(remainder);
			$( bg ).css("top", "-"+bgyfix+"px");
			
			// un-center the image in the x axis
			$( bg ).css("left", "0px");
			
		}
		
		function cropHorizontallyByContent(){
			
			// set the image's height to the window's height
			$( bg ).height( $( parent ).height() );
			
			// fix the width accordingly, keep aspect ratio
			var newwidth = $(bg).height() / bgratio;
			$( bg ).width( newwidth );
			
			// apply focal point
			var remainder = (bg.width / 2) - ($( parent ).width() / 2);
			var bgxfix = calculateFocalPointHorizontalFix(remainder);
			$( bg ).css("left", "-"+bgxfix+"px");
			
			// un-center the image in the y axis
			$( bg ).css("top", "0px");
			
		}
		
		function cropVerticallyByContent(){
			
			// set the image's width to the window's width
			$( bg ).width( $( parent ).width() );
			
			// fix the height accordingly, keep aspect ratio
			var newheight = $(bg).width() * bgratio;
			$( bg ).height( newheight );
			
			// apply focal point
			var remainder = (bg.height / 2) - ($( parent ).height() / 2);
			var bgyfix = calculateFocalPointVerticalFix(remainder);
			$( bg ).css("top", "-"+bgyfix+"px");
			
			// un-center the image in the x axis
			$( bg ).css("left", "0px");
			
		}
		
		function checkForCropByWindow(){
			
			winratio = $( window ).height() / $( window ).width();
			
			if (winratio >= bgratio){
				cropHorizontallyByWindow();
			} else if (winratio < bgratio){
				cropVerticallyByWindow();
			}
			
		}
		
		function checkForCropByContent(){
			
			contentratio = $(parent).height() / $(parent).width();
			
			if (contentratio >= bgratio){
				cropHorizontallyByContent();
			} else if (contentratio < bgratio){
				cropVerticallyByContent();
			}
			
		}
		
		function setParentHeightToWindow(){
			
			$(parent).height( $( window ).height() );
			
		}
		
		function behave(){
			
			if (opts.behavior === "fillwindow"){
					
				// always keep the parent's height equal to window's height
				setParentHeightToWindow(); 
				checkForCropByWindow();
				
			} else if (opts.behavior === "fillcontent"){
				
				checkForCropByContent();
				
			} else {
				
				// default behavior: fillwindow
				setParentHeightToWindow(); 
				checkForCropByWindow();
				
			}
			
		}
		
		$(bg).load(function(){
			
			bgratio = bg.height / bg.width;
			
			$( window ).resize(function() {
				
				behave();
				
			});
			
			// first time run
			behave();
			
			// run the callback at this point
			if (typeof opts.runafterload === "function"){
				opts.runafterload();
			}
			
		});
		
		bg.src = ""+opts.image_src;
		$(bg).css("position","absolute");
		
		$(parent).prepend(bg);
		
	}; // end plugin
})(jQuery);
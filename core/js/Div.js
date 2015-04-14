wbl.core.Div = L.Class.extend({
	
	initialize: function() {
		this.parentTag = $("body");
		this.draw();
	},
	
	draw: function() {
		var mapDiv = $("#mapdiv");
		
		if ( !mapDiv.length ) {
			// It is is possbile to run wblmap with custom divs
			var mapDiv = $('<div id="mapdiv" class="mapdiv" />');
			var mainDiv = $('<div id="maindiv" class="maindiv" />');
			mainDiv.append(mapDiv);
			this.parentTag.append(mainDiv);
		}
		
		// Fix things after orientation change.
		if (L.Browser.touch) {
			$(window).on("orientationchange", function() {
				window.scrollTo(0,0);
			});			
		}

		wbl.event.on("wbl.core.pluginsadded", function() {
			
			var b = utils.getBrowser();
			if ( b.ie && b.ieVersion <= 8 ) {
				// Because IE8 >= doesn't seem to understand
				//$(".leaflet-top.leaflet-right").addClass("map-with-header-ie8");
				console.log(b);
			}
		});
	},
	
	CLASS_NAME: "wbl.core.Div"
});
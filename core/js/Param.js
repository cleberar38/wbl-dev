wbl.core.Param = L.Class.extend({
	
	initialize: function(map) {
		this.map = map;
	},
	
	_lang: {
		"sv": {
			remove: "Ta bort"
		},
		"en": {
			remove: "Remove"
		}
	},
	
	_setLang: function() {
		langCode = wbl.config.langCode;
		if (this._lang) {
			this.lang = this._lang ? this._lang[langCode] : null;
		}
	},

	
	getParams: function() {
		var paramsObject = this._cachedParams || null;
		if (!paramsObject) {
			// Create the params
			paramsObject = this.getWebParamsAsObject();
			if (wbl.config) {
				// Only cache params if no params were used in the config
				configParams = wbl.config.params || {};
				paramsObject = $.extend({}, utils.objectToUpperCase(configParams), paramsObject);
				this._cachedParams = paramsObject;
			}
		}
		return paramsObject;
	},

	/**
	 * Get the original web params, totally unmodified, as object.
	 * @return {Object} The params as an object
	 */
	getWebParamsAsObject: function() {
		var sep = "?";
		var p = location.href.split(sep);
		var pString = p.length > 1 ? p[1] : "";
		paramsObject = utils.paramsStringToObject(pString, true);
		return paramsObject;
	},
	
	createParamsAsObject: function() {
		var c = this.map.getCenter(),
			bl, layer;
		
		var layers = this.map._layers,
			layerId,
			ols = [];
		for (var lid in layers) {
			layer = layers[lid];
			if (!layer || !layer.options || !layer.options.layerId) {
				continue;
			}
			layerId = layer.options.layerId;
			
			if (layer.options.isBaseLayer) {
				bl = layerId;
			}
			else {
				if ($.inArray(layer.options.layerId, ols) === -1) {
					ols.push(layerId);					
				}
			}
		}
		
		var p = {
				zoom: this.map.getZoom(),
				center: [utils.round(c.lng, 5), utils.round(c.lat, 5)],
				ol: ols,
				bl: bl
		};
		if (wbl.config.configName) {
			p.config = wbl.config.configName;
		}
		
		wbl.event.trigger("wbl.core.createparams", p);
		
		// Remove all undefined or null values
//		$.map(p, function(i, val) {
//			
//		});
		
		return p;
	},
	
	createParams: function(addRoot) {
		addRoot = addRoot || false; // addRoot can also be a string which will then be used instead of location.href
		
		var p = this.createParamsAsObject();
		
		var pString = "",
			val;
		for (var key in p) {
			val = p[key];
			if (val instanceof Array) {
				if (!val.length) {
					continue;
				}
				val = val.join(",");
			}
			pString += "&" + key + "=" + val;
		}
		pString = pString.substring(1); // remove & 
		if (addRoot) {
			var root = "";
			if (addRoot === true) {
				root = document.URL.split("?")[0] + "?";
			}
			else if (typeof(addRoot) === "string") {
				root = addRoot;
			}
			pString = root + pString;
		}
		return pString;
	},
	
	applyParams: function(p) {
		p = p || {};
		
		var self = this;
		
		wbl.event.trigger("wbl.core.beforeapplyparams", p);
		this._setLang();
		
		var zoom = p.ZOOM ? parseInt(p.ZOOM) : 0,
			center = p.CENTER ? L.latLng([parseFloat(p.CENTER[1]), parseFloat(p.CENTER[0])]) : null;
		
		if (!zoom && zoom !== 0) {
			zoom = this.map.options.minZoom || 0;
		}
		if (center) {
			this.map.setView(center, zoom, {animate: false});
		}
		else {
			this.map.fitWorld();
		}

		if (p.XY) {
			/*
			 * e.g. xy=13.0,55.0,A%popup%20text (third parameter is optional)
			 */
			var orgParams = this.getWebParamsAsObject(),
				north = parseFloat(p.XY[1]),
				east = parseFloat(p.XY[0]),
				html = null;
			if (p.XY.length > 2) {
				var thirdParam = p.XY[2];
				html = '<p>'+thirdParam+'</p><button class="btn btn-default wbl-core-btn-popup">'+this.lang.remove+'</button>';
				if (p.XY.length > 3) {
					var fourthParam = p.XY[3];
					if (/^EPSG:/.test(fourthParam) != true) {
						// Add "EPSG:" if only number was added
						fourthParam = "EPSG:"+fourthParam;
					}
					var coordsArr = utils.projectPoint(east, north, fourthParam, "EPSG:4326");
					east = coordsArr[0];
					north = coordsArr[1];
				}
			}
			var marker = L.marker([north, east]);
			this.map.addLayer(marker);
			if (!orgParams.CENTER) {
				// Center around marker
				this.map.setView(marker.getLatLng(), orgParams.ZOOM || 16, {animate: false});
			}
			if (html) {
				function onPopupOpen() {
					$(".wbl-core-btn-popup").on("click", function() {
						self.map.removeLayer(marker);
						return false;
					});
				}
				this.map.off("popupopen", onPopupOpen).on("popupopen", onPopupOpen);
				marker.bindPopup(html).openPopup();
			}
		}
		
		wbl.event.trigger("wbl.core.applyparams", p);
	},
	
		
//		var selArr = sel instanceof Array ? sel : sel.split(",");
//		var selItem = selArr[0];
//		var itemArr = selItem.split(":"); // We support only one selected feature at this time
//		var layerId = itemArr[0],
//			lng = parseFloat(itemArr[1]);
//			lat = parseFloat(itemArr[2]);
//		var layer = wbl.core.layerInst.showLayer(layerId),
//			cPoint = this.map.latLngToContainerPoint(L.latLng(lat, lng));
//		
//		layer.on("load", function() {
//			var clickEvent= document.createEvent('MouseEvents');
//			clickEvent.initMouseEvent(
//				'click', true, true, window, 0,
//				0, 0, cPoint.x, cPoint.y, false, false,
//				false, false, 0, null
//			);
//			document.elementFromPoint(cPoint.x, cPoint.y).dispatchEvent(clickEvent);
//		});
			
	CLASS_NAME: "wbl.core.Param"
		
});
var utils = {
		
		getBrowser: function() {
			var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
    		var ieVersion = match ? parseInt(match[1]) : undefined;

			return {
				ie: match,
				ieVersion: ieVersion,
				ie8: ieVersion === 8,
				ie9: ieVersion === 9,
				ie10: ieVersion === 10,
				ie11: ieVersion === 11
			};
		}
};
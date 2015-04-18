wbl.core.mainConfig = {
		
		mapConfig: {
			layers: [],
			crs: L.CRS.EPSG3857,
			attributionControl: true,
			zoomControl: false,
			// center: [0, 0],
			// zoom: 2,
			maxZoom: 18,
			disabledRightClick: true
		},
		
		wblOptions: {
			title: "WBL-DEV",
			//favIcon: "https://assets-cdn.github.com/favicon.ico", //"//assets.malmo.se/external/v4/favicon.ico"
			popupAutoPanPadding: [0, 70],  // left(right, top/bottom
			defaultLanguage: "sv"
		},

		toolbarPlugin: "Menu",
		defaultTheme: "wbl",

		configFolders: ["/configs/"]
};
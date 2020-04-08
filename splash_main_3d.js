class FrontEnd {
	constructor(Model) {
		if (!Model) {
			return
		}
		this.Model = Model
		this.personalization = {
			colors: {
				primaryColor: "gray",
				secondaryColor: null
			},
			font: null,
			splashPopUp: {
				splashHeaderTitle: null,
				splashsDescription: null,
				fileName: null
			},
			logo: {
				asCSSbgImg: null,
				asImgSRC: null,
				name: null,
				storedName: null
			},
			logoType: null
		}
		this.DOM_selectors = {
			mainSelector: ".front-end-app",
			cardinals: ".cardinals-component",
			buildingInfo: ".building-info-component",
			splashPopUp: ".splash-pop"
		}
		this.DOM_selectors.windows = {
			canvas: ".renderator-canvas-window-view",
			media: ".virtual-tour-window-view",
			floorPlan: ".floor-plan-window-view",
			mediaAndFloor: ".view-screens"
		}
		this.DOM_selectors.windowsParts = {
			buildingInfo: ".building-info-component",
			line: "svg.point-line",
			canvases: ".canvases",
			iframe: ".iframe-virtual-tour",
			elevationCanvas: ".elevation-canvas",
			cardinals: ".cardinals-component",
			amenities: ".amenities-component",
			appartment: ".appartment-component",
			filters: ".elevation-filters-component",
			enquire: ".enquire-modal-component",
			spinner: ".spinner-component",
			expandIcon: ".expand-icon"
		}
		this.DOM_selectors.windowsSlogans = {
			media: ".media-slogan",
			notAvailableMedia: ".media-not-available-slogan",
			renderGallery: ".render-gallery-slogan",
			virtualTour: ".virtual-tour-slogan",
			floorPlanDefault: ".floor-plan-default-slogan",
			floorPlan: ".floor-plan-slogan",
			notAvailableFloorPlan: ".floor-plan-not-available-slogan"
		}
		this.actionEvents = {
			onAreaSelect: [],
			onAreaMouseOver: [],
			onAreaMouseOut: [],
			onLoadElevation: [],
			onLoadAllElevations: []
		}
		this.VUE_COMPONENTS = {
			buildingInfo: null,
			cardinals: null,
			initMediaWindows: null,
			filters: {
				activeTags: null,
				menu: null
			},
			north: {},
			west: {},
			east: {},
			south: {}
		}
		this.elevationKlasses = {
			north: null,
			west: null,
			east: null,
			south: null
		}
		this.elevationFilterKlasses = {
			north: null,
			west: null,
			east: null,
			south: null
		}
		this.areaMedia = {
			areaType: null,
			floorPlan: null,
			renderGallery: null,
			virtualTour: null,
			choosenMedia: null
		}
		this.loading = {
			counter: 0,
			north: false,
			west: false,
			east: false,
			south: false
		}

		this.sunlight = 1
		this.isFirst = true
		this.cameraRadius = 150
		this.previousHoveredEntry = ""
		this.previousHoveredEntryIndex = -1
	}

	updatePersonalizationSplash(onSplashBackgroundReady) {
		let THAT = this
		let primColor = this.personalization.colors.primaryColor

		if (!THAT.Model.splashPopUp.switch1) return

		let createSplash = false
		if (this.personalization.splashPopUp.splashHeaderTitle || this.personalization.splashPopUp.splashDescription || this.personalization.splashPopUp.fileName) {
			createSplash = true
		}
		if (createSplash === false) {
			/* dont show splash if has not parameters */
			return
		}
		if (primColor) {
			$(this.DOM_selectors.splashPopUp)
				.find(".splash-title")
				.css("color", primColor)
			$(this.DOM_selectors.splashPopUp)
				.find(".building-info")
				.css("color", primColor)
		}
		if (this.personalization.splashPopUp.splashHeaderTitle) {
			$(this.DOM_selectors.splashPopUp)
				.find(".splash-title")
				.html(this.personalization.splashPopUp.splashHeaderTitle)
		} else {
			$(this.DOM_selectors.splashPopUp)
				.find(".splash-title")
				.addClass("d-none")
		}
		if (this.personalization.splashPopUp.splashDescription) {
			$(this.DOM_selectors.splashPopUp)
				.find(".splash-description")
				.html(this.personalization.splashPopUp.splashDescription)
		} else {
			$(this.DOM_selectors.splashPopUp)
				.find(".splash-description")
				.addClass("d-none")
		}

		let loadingCounter = 0
		function checkSuccess() {
			if (loadingCounter === 0 && onSplashBackgroundReady) {
				onSplashBackgroundReady()
			}
		}

		console.log("personalization ", this.personalization)

		if (this.personalization.splashPopUp.fileName) {
			loadingCounter++
			let splashBGURL = "php/get_3d_splash_image.php" + globalQueryString + "&filename=" + THAT.personalization.splashPopUp.fileName
			$(THAT.DOM_selectors.splashPopUp)
				.find(".modal-content")
				.css("background-image", "url(" + splashBGURL + ")")

			let img = $("<img />")
				.attr("src", splashBGURL)
				.on("load", function() {
					if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
						loadingCounter--
						checkSuccess()
					} else {
						loadingCounter--
						checkSuccess()
					}
				})
				.on("error", function() {
					loadingCounter--
				})
		}

		if (this.personalization.logo && this.personalization.logo.storedName && this.personalization.logoType === "image") {
			loadingCounter++
			let logoURL = "php/get_3d_logo.php" + globalQueryString + "&filename=" + this.personalization.logo.storedName
			$(THAT.DOM_selectors.splashPopUp)
				.find(".building-info-cont")
				.css("background-image", "url(" + logoURL + ")")

			let img = $("<img />")
				.attr("src", logoURL)
				.on("load", function() {
					if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
						loadingCounter--
						checkSuccess()
					} else {
						if (this.naturalWidth > this.naturalHeight) {
							$(THAT.DOM_selectors.splashPopUp)
								.find(".building-info-cont")
								.css({ maxWidth: "150px", width: this.naturalWidth + "px", height: "55px" })
						} else {
							$(THAT.DOM_selectors.splashPopUp)
								.find(".building-info-cont")
								.css({ maxHeight: "55px", height: this.naturalHeight + "px", width: "150px" })
						}
						$(THAT.DOM_selectors.splashPopUp)
							.find(".building-info")
							.removeClass("d-inline-block")
							.addClass("d-none")
						//css('visibility', 'hidden');
						loadingCounter--
						checkSuccess()
					}
				})
				.on("error", function() {
					loadingCounter--
				})
		} else {
			$(THAT.DOM_selectors.splashPopUp)
				.find(".building-info")
				.removeClass("d-none")
				.addClass("d-inline-block") //css('visibility', 'visible');
		}
		console.log("loading counter : ", loadingCounter)

		checkSuccess()
	}

	updatePersonalizationColors() {
		let THAT = this
		let primColor = this.personalization.colors.primaryColor
		let fontFamily = this.personalization.font
		if (fontFamily) {
			$(this.DOM_selectors.mainSelector).css("fontFamily", fontFamily)
			$(".filter-menu-component").css("font-family", fontFamily)
		}
		if (primColor) {
			/* update primary color*/
			$(this.DOM_selectors.cardinals)
				.find(".cardinal-tab")
				.css("color", primColor)
			$(this.DOM_selectors.cardinals)
				.find(".cardinal-tab.active")
				.css("color", primColor)
			$(this.DOM_selectors.splashPopUp)
				.find(".splash-title")
				.css("color", primColor)

			$(this.DOM_selectors.mainSelector)
				.find(".open-filters-container")
				.css("background-color", primColor)
			let primaryTextColor = tinycolor(primColor).isLight() ? "rgb(0,0,0)" : "rgb(255,255,255)"
			$(this.DOM_selectors.mainSelector)
				.find(".open-filters-container")
				.css("color", primaryTextColor)

			/* update canvas colors */
			let alphaColor = tinycolor(primColor)
			alphaColor.toRgbString()
			alphaColor.setAlpha(0.7)
			primColor = alphaColor.toRgbString()
			for (let elK in this.elevationKlasses) {
				if (this.elevationKlasses[elK]) {
					this.elevationKlasses[elK].defaults.areaStyles["appartment"].filtered.fabricStyle.fill = primColor
					this.elevationKlasses[elK].defaults.areaStyles["appartment"].filtered.fabricStyle.borderColor = primColor
					this.elevationKlasses[elK].defaults.areaStyles["commercial"].filtered.fabricStyle.fill = primColor
					this.elevationKlasses[elK].defaults.areaStyles["commercial"].filtered.fabricStyle.borderColor = primColor
					if (this.elevationKlasses[elK].canvas) {
						this.elevationKlasses[elK].canvasRender(this.elevationKlasses[elK].canvas)
					}
				}
			}
		}
	}
	init() {
		let THAT = this
		let Model = this.Model
		let buildingInfoDOM = this.DOM_selectors.buildingInfo
		THAT.VUE_COMPONENTS.buildingInfo = {}
		$(buildingInfoDOM).each(function(k, elem) {
			THAT.VUE_COMPONENTS.buildingInfo = new Vue({
				//el: buildingInfoDOM,
				el: elem,
				data: function() {
					return { data: Model }
				}
			})
		})
		THAT.VUE_COMPONENTS.buildingInfo["splash"] = new Vue({
			el: $(THAT.DOM_selectors.splashPopUp)[0],
			data: function() {
				return { data: Model }
			}
		})
		this.informAboutAreaMediaTypes(this.areaMedia)
		this.initCardinals()
		for (let m in Model.elevations) {
			this.initElevation(m)
			break
		}
	}
	initCardinals() {
		let THAT = this
		let cardinalsDOM = this.DOM_selectors.cardinals
		this.VUE_COMPONENTS.cardinals = new Vue({
			el: cardinalsDOM,
			data: THAT.Model
		})
	}
	prepareFilters(elevationName) {
		for (let f in this.Model.elevations[elevationName].filters) {
			this.Model.elevations[elevationName].filters[f].filterActive = false
			this.Model.elevations[elevationName].filters[f].filterSettings = {}
			this.Model.elevations[elevationName].filters[f].filterSettings.filterValue = null
			this.Model.elevations[elevationName].filters[f].filterSettings.filterResults = []
			if (f === "price") {
				this.Model.elevations[elevationName].filters[f].filterSettings.min = null
				this.Model.elevations[elevationName].filters[f].filterSettings.max = null
				this.Model.elevations[elevationName].filters[f].filterSettings.minValue = null
				this.Model.elevations[elevationName].filters[f].filterSettings.maxValue = null
			}
		}
		this.Model.elevations[elevationName].filters.allAmenities = {
			active: true,
			filterActive: false,
			filterSettings: { filterValue: false, filterResults: [], hasResults: false }
		}
		this.Model.elevations[elevationName].filters.allAvailable = {
			active: true,
			filterActive: false,
			filterSettings: { filterValue: true, filterResults: [] }
		}
		this.Model.elevations[elevationName].filters.areaType = {
			active: true,
			filterActive: false,
			filterSettings: { filterValue: "appartment", filterResults: [] }
		}
		this.Model.elevations[elevationName].filters.floor = {
			active: true,
			filterActive: false,
			filterSettings: { filterValue: null, filterResults: [] }
		}
		this.Model.elevations[elevationName].filters.sqrFoot = {
			active: true,
			filterActive: false,
			filterSettings: { filterValue: null, filterResults: [] }
		}
		//this.Model.elevations[elevationName].filters.promotion = { active: true, filterActive: false, filterSettings:{ filterValue: null, filterResults: []} };
		this.Model.elevations[elevationName].filters.optional = {
			active: true,
			filterActive: false,
			filterSettings: { filterValue: null, filterResults: [] }
		}

		this.Model.elevations[elevationName].filters.areaType = {} // = { active: true, filterActive: false, filterSettings:{ filterValue: 'appartment', filterResults: []} };
		this.Model.elevations[elevationName].filters.areaType.active = true
		this.Model.elevations[elevationName].filters.areaType.filterActive = false
		this.Model.elevations[elevationName].filters.areaType.filterSettings = {}
		this.Model.elevations[elevationName].filters.areaType.filterSettings.filterValue = "appartment"
		this.Model.elevations[elevationName].filters.areaType.filterSettings.filterResults = []
	}
	showDefaultSlogans() {
		;(this.areaMedia.areaType = null),
			(this.areaMedia.floorPlan = null),
			(this.areaMedia.renderGallery = null),
			(this.areaMedia.virtualTour = null),
			(this.areaMedia.choosenMedia = null)
	}
	initElevation(elevationName) {
		let THAT = this
		let elevationDiv = $(".elevation-canvas." + elevationName)
		this.searchEnable = false
		this.searchFlag = false
		this.searchResult = []
		this.tileData = []
		// this.deselectRoom = false;

		this.Model.elevations[elevationName].activeAreaData = null
		this.elevationFilterKlasses[elevationName] = new CustomElevationFilterKlass()
		let elevationKlassInst = new ElevationKlass()

		/* attach events now */
		elevationKlassInst.onMouseOverArea = function(fabricObj) {
			if (THAT.Model.elevations[elevationName].activeAreaData) {
				return
			}
			for (let k in THAT.areaMedia) {
				if (fabricObj.RENDERATOR && fabricObj.RENDERATOR.dataEntry && fabricObj.RENDERATOR.dataEntry.hasOwnProperty(k)) {
					THAT.areaMedia[k] = fabricObj.RENDERATOR.dataEntry[k]
				} else {
					THAT.areaMedia[k] = null
				}
			}
		}
		elevationKlassInst.onMouseNoArea = function() {
			if (THAT.Model.elevations[elevationName].activeAreaData) {
				return
			}
			THAT.showDefaultSlogans()
		}

		THAT.activateCanvasObject = function(fabricObj) {
			elevationKlassInst.onClickOverArea(fabricObj)
		}
		elevationKlassInst.onClickOverArea = function(fabricObj) {
			if (!fabricObj || !fabricObj.RENDERATOR) {
				return
			}
			THAT.activateElevationArea(elevationName, fabricObj)
		}

		elevationKlassInst.onClearSelection = function() {
			THAT.Model.elevations[elevationName].activeAreaData = null
			THAT.deActivateAreaMedia()
			THAT.VUE_COMPONENTS[elevationName].appartment.$forceUpdate()
			THAT.VUE_COMPONENTS[elevationName].enquireModal.$forceUpdate()
			THAT.VUE_COMPONENTS[elevationName].amenities.$forceUpdate()
			elevationKlassInst.onMouseNoArea()
		}

		this.elevationFilterKlasses[elevationName].onClearSearchResults = function(filters, results) {
			elevationKlassInst.parseCanvasAreas(function(fabricObj) {
				fabricObj.lastSearch = null
			})
			THAT.elevationKlasses[elevationName].updateAllAreasEvents({})
			THAT.elevationKlasses[elevationName].updateAllAreasDefaultStyle()
			THAT.elevationKlasses[elevationName].amenitiesFound.filterResults.splice(0, THAT.elevationKlasses[elevationName].amenitiesFound.filterResults.length)
		}

		this.elevationFilterKlasses[elevationName].onDidSearch = function(filters, results) {
			/* loop canvas objects and math UNIQUE_ID of each result with canvas.RENDERATOR.UNIQUE_ID */
			elevationKlassInst.canvas.discardActiveObject()
			elevationKlassInst.parseCanvasAreas(function(fabricObj) {
				if (!fabricObj.lastSearch) {
					fabricObj.lastSearch = {}
				}

				fabricObj.lastSearch.tm = THAT.elevationFilterKlasses[elevationName].lastSearch.tm

				fabricObj.lastSearch.filtered = false

				for (let loopKey = 0; loopKey < results.length; loopKey++) {
					if (fabricObj.RENDERATOR && results[loopKey] && fabricObj.RENDERATOR.dataEntry.UNIQUE_ID === results[loopKey].RENDERATOR.dataEntry.UNIQUE_ID) {
						fabricObj.lastSearch = JSON.parse(JSON.stringify(results[loopKey].lastSearch))
					}
				}
			})

			THAT.elevationKlasses[elevationName].updateAllAreasEvents({})
			THAT.elevationKlasses[elevationName].updateAllAreasDefaultStyle()

			if (filters.areaType && filters.areaType.filterValue === "common") {
				THAT.elevationKlasses[elevationName].amenitiesFound.filterResults = results
				THAT.VUE_COMPONENTS[elevationName].amenities.$forceUpdate()
			} else {
				THAT.elevationKlasses[elevationName].amenitiesFound.filterResults.splice(0, THAT.elevationKlasses[elevationName].amenitiesFound.filterResults.length)
			}
			THAT.searchResult = results
			THAT.loading_spinner.removeClass("d-none")

			setTimeout(function() {
				THAT.searchEnable = true
				THAT.searchFlag = true
			}, 50)
		}

		this.elevationFilterKlasses[elevationName].onClearFilters = function() {
			console.log("filer cleared!")

			setTimeout(function() {
				THAT.searchFlag = false
				window.deselectRoom = true
			}, 150)
		}

		this.elevationFilterKlasses[elevationName].onFiltersMenuOpen = function() {
			elevationKlassInst.canvas.discardActiveObject()
		}

		this.elevationFilterKlasses[elevationName].onBeforeSearchAsynch = function() {
			THAT.crmUpdateElevationAreasFromCRM(elevationName, function() {
				THAT.elevationFilterKlasses["north"].doSearch()
			})
		}

		THAT.initMediaWindows()
		this.elevationKlasses[elevationName] = elevationKlassInst
		this.Model.elevations[elevationName].elevationCanvas = elevationKlassInst.initElevationCanvas("renderator-canvas-" + elevationName)
		this.Model.elevations[elevationName].elevationCanvas.setWidth(screen.availWidth)
		this.Model.elevations[elevationName].elevationCanvas.setHeight(screen.availHeight)

		this.prepareFilters(elevationName)
		this.elevationKlasses[elevationName].amenitiesFound = { filterResults: [] }
		this.VUE_COMPONENTS[elevationName] = {
			activeCardinal: new Vue({
				el: null,
				data: THAT.Model.elevations[elevationName],
				watch: {
					active: {
						handler: function(val, oldVal) {
							if (val === true) {
								$(".elevation-canvas").removeClass("active")
								// THAT.Model.elevations[elevationName].elevationCanvas.trigger('selection:cleared');
								$(".elevation-canvas" + "." + elevationName).addClass("active")
								window.calcFiltersMenuRight()
								THAT.elevationFilterKlasses[elevationName].VUE_COMPONENTS.filterMenu.$forceUpdate()
								if (THAT.Model.elevations[elevationName].elevationCanvas.backgroundImage) {
									THAT.elevationKlasses[elevationName].zoomBasedOnBackgroundSize(THAT.Model.elevations[elevationName].elevationCanvas, THAT.Model.elevations[elevationName])
								}
							}
						},
						deep: true
					}
				}
			}),
			appartment: new Vue({
				el: elevationDiv.find(".appartment-component")[0],
				data: THAT.Model.elevations[elevationName]
			}),
			amenities: new Vue({
				el: elevationDiv.find(".amenities-component")[0],
				data: function() {
					return {
						filterSettings: THAT.elevationKlasses[elevationName].amenitiesFound
					}
				}
			}),
			enquireModal: new Vue({
				el: elevationDiv.find(".enquire-modal-component")[0],
				data: THAT.Model.elevations[elevationName]
			}),
			spinner: new Vue({
				el: elevationDiv.find(".spinner-component")[0],
				data: THAT.Model.elevations[elevationName].activeAreaData
			})
		}

		if (!this.loadingResources) {
			this.loadingResources = 0
		}

		let spinner = elevationDiv.find(".spinner-component").eq(0)
		THAT.loading_spinner = spinner
		spinner.removeClass("d-none")
		// THAT.crmUpdateElevationAreasFromCRM(elevationName);

		if (window.TEMPORARY_PREVIEW && window[elevationName + "Canvas"]) {
			THAT.loading.counter++
			THAT.loading[elevationName] = true
			spinner.removeClass("d-none")

			let FAKE_RESPONSE = JSON.parse(window[elevationName + "Canvas"])
			let canvas = THAT.Model.elevations[elevationName].elevationCanvas
			//   THAT.Model.elevations[elevationName].elevationCanvas.setWidth(FAKE_RESPONSE.backgroundImage.width);
			//   THAT.Model.elevations[elevationName].elevationCanvas.setHeight(FAKE_RESPONSE.backgroundImage.height);
			//   THAT.elevationKlasses[elevationName].responsiveElevationCanvas(THAT.Model.elevations[elevationName].elevationCanvas);
			THAT.Model.elevations[elevationName].elevationCanvas.loadFromJSON(FAKE_RESPONSE, function() {
				// THAT.elevationKlasses[elevationName].lockCanvasAreas(canvas);
				// THAT.elevationKlasses[elevationName].zoomBasedOnBackgroundSize(canvas, THAT.Model.elevations[elevationName]);
				THAT.elevationKlasses[elevationName].initElevationDeviceEvents(THAT.Model.elevations[elevationName].elevationCanvas)
				// THAT.elevationKlasses[elevationName].deselectRoom = false;
				/* get stored areas and collect unique properties for options in filters */

				THAT.elevationFilterKlasses[elevationName].searchableData = FAKE_RESPONSE.objects
				THAT.elevationFilterKlasses[elevationName].createFilters(FAKE_RESPONSE.objects)
				THAT.elevationFilterKlasses[elevationName].init(elevationDiv)
				THAT.elevationKlasses[elevationName].updateAllAreasEvents({})
				THAT.elevationKlasses[elevationName].updateAllAreasDefaultStyle()

				THAT.loading.counter--
				THAT.loading[elevationName] = false
				THAT.Model.elevations[elevationName].hasFinishedLoad = true
				if (THAT.loadingResources === 0 && THAT.onLoad) {
					THAT.onLoad(THAT)
					THAT.runAttachedActionEvent("onLoadElevation", THAT.Model.elevations[elevationName])
				}
				THAT.runAttachedActionEvent("onLoadElevation", THAT.Model.elevations[elevationName])
				if (THAT.loading.counter === 0) {
					THAT.runAttachedActionEvent("onLoadAllElevations", THAT)
				}
				spinner.addClass("d-none")
				if (elevationName == "north") {
					let babylonCanvas = document.getElementById("renderator-canvas-north-mine")

					setTimeout(function() {
						THAT.initBabyLonCanvas(babylonCanvas)
						THAT.crmUpdateElevationAreasFromCRM(elevationName)
					}, 7000)
				}
			})
			return
		}

		let noCashe = new Date().getTime()
		this.loadingResources++
		THAT.loading.counter++
		THAT.loading[elevationName] = true
		spinner.removeClass("d-none")
		THAT.elevationFilterKlasses[elevationName].init(elevationDiv)

		let queryStr = globalQueryString + "&elevation=" + elevationName

		$.ajax({
			url: "php/get_elevation_canvas-3d.php" + queryStr,
			dataType: "json",
			method: "GET",
			success: function(response) {
				let canvas = THAT.Model.elevations[elevationName].elevationCanvas

				canvas.wrapperEl.style.visibility = "hidden"
				THAT.setElevationBackground(elevationName, function(canvas) {
					THAT.elevationKlasses[elevationName].initElevationDeviceEvents(THAT.Model.elevations[elevationName].elevationCanvas)
					let jsonObjects = []
					let localData = []

					for (var i = 0; i < 4; i++) {
						JSON.parse(response.serverData[i]).objects.forEach(ele => {
							jsonObjects.push(ele)
							localData[ele.RENDERATOR.dataEntry.mesh_name] = ele
						})
					}
					THAT.elevationFilterKlasses[elevationName].searchableData = jsonObjects
					THAT.elevationFilterKlasses[elevationName].createFilters(jsonObjects)
					THAT.elevationFilterKlasses[elevationName].activateFiltersFromSetup(Model.elevations[elevationName].filters)
					THAT.tileData = localData
					//--THAT.elevationFilterKlasses[elevationName].init(elevationDiv);
					THAT.elevationKlasses[elevationName].updateAllAreasEvents({})
					THAT.elevationKlasses[elevationName].updateAllAreasDefaultStyle()
					THAT.loadingResources--
					THAT.Model.elevations[elevationName].hasFinishedLoad = true

					if (THAT.loadingResources === 0 && THAT.onLoad) {
						THAT.onLoad(THAT)
					}

					let currentActive = THAT.getActiveElevation()
					if (currentActive && currentActive === elevationName && THAT.elevationFilterKlasses[currentActive].filters["layouts"]) {
						THAT.elevationFilterKlasses[currentActive].filters["layouts"].dropdown.isOpen = true
					}

					setTimeout(function() {
						$(".filter-menu-component").each(function(k, ele) {
							let eleW = $(ele).width()
							if (eleW > 0 && currentActive && currentActive !== elevationName) {
								if (!elevationDiv.find(".filter-menu-component").hasClass("filter-menu-closed")) {
									let w = $(ele).width() + 2
									elevationDiv.find(".filter-menu-component").css("right", -1 * w + "px")
								}
							}
						})
					}, 1400)
					THAT.loading.counter--
					THAT.loading[elevationName] = false
					THAT.runAttachedActionEvent("onLoadElevation", THAT.Model.elevations[elevationName])

					if (THAT.loading.counter === 0) {
						THAT.runAttachedActionEvent("onLoadAllElevations", THAT)
					}

					if (elevationName == "north") {
						let babylonCanvas = document.getElementById("renderator-canvas-north-mine")
						setTimeout(function() {
							THAT.initBabyLonCanvas(babylonCanvas)
							THAT.crmUpdateElevationAreasFromCRM(elevationName)
						}, 7000)
					}
				})
			},
			error: function(e, y) {
				spinner.addClass("d-none")
			}
		})
	}

	activateElevationArea(elevationName, fabricObj) {
		let THAT = this
		if (
			fabricObj.RENDERATOR &&
			fabricObj.RENDERATOR.dataEntry &&
			fabricObj.RENDERATOR.dataEntry.UNIQUE_ID &&
			THAT.Model.elevations[fabricObj.RENDERATOR.dataEntry.orientation].activeAreaData &&
			THAT.Model.elevations[fabricObj.RENDERATOR.dataEntry.orientation].activeAreaData.UNIQUE_ID === fabricObj.RENDERATOR.dataEntry.UNIQUE_ID
		) {
			return
		}
		/* google analytics start */
		/*
        if (ga) {
          if (fabricObj.RENDERATOR.dataEntry.areaType === 'appartment') {
            let areaId = fabricObj.RENDERATOR.dataEntry.UNIQUE_ID;
            let areaName = fabricObj.RENDERATOR.dataEntry.appartmentName;
            ga('send', 'event', 'Area', 'click_area' , getParameterByName('token') + '|' + areaId + '|' + areaName, 1 );
          }
        }
        */
		THAT.Model.elevations[elevationName].activeAreaData = fabricObj.RENDERATOR.dataEntry
		THAT.VUE_COMPONENTS[elevationName].appartment.$forceUpdate()
		THAT.VUE_COMPONENTS[elevationName].enquireModal.$forceUpdate()
		THAT.VUE_COMPONENTS[elevationName].amenities.$forceUpdate()

		THAT.activateAreaMedia(fabricObj.RENDERATOR.dataEntry)

		let trackAndRender = function() {
			/* google analytics start */
			if (ga) {
				if (fabricObj.RENDERATOR.dataEntry.areaType === "appartment") {
					let areaId = fabricObj.RENDERATOR.dataEntry.UNIQUE_ID
					let areaName = fabricObj.RENDERATOR.dataEntry.appartmentName
					ga("send", "event", "Area", "click_area", getParameterByName("token") + "|" + areaId + "|" + areaName, 1)
				}
			}
			THAT.Model.elevations[elevationName].activeAreaData = fabricObj.RENDERATOR.dataEntry
			THAT.VUE_COMPONENTS[elevationName].appartment.$forceUpdate()
			THAT.VUE_COMPONENTS[elevationName].enquireModal.$forceUpdate()
			THAT.VUE_COMPONENTS[elevationName].amenities.$forceUpdate()
			THAT.activateAreaMedia(fabricObj.RENDERATOR.dataEntry)
		}

		if (fabricObj.RENDERATOR.dataEntry.crm && fabricObj.RENDERATOR.dataEntry.crm.value) {
			this.crmGetAreaData(
				{
					renderatorDataEntry: fabricObj.RENDERATOR.dataEntry
				},
				function() {
					trackAndRender()
				}
			)
		} else {
			trackAndRender()
		}
	}

	setElevationBackground(elevationName, bgReady) {
		let Model = this.Model
		let imgQueryStr =
			"?filename=" + Model.elevations[elevationName].fileName + "&elevation=" + elevationName + "&building_id=" + Model.building_id + "&" + globalQueryString.substring(1)
		let fetchBackground = "php/get_3d_elevation_image.php" + imgQueryStr
		let canvas = this.Model.elevations[elevationName].elevationCanvas
		canvas.setBackgroundImage(fetchBackground, function(bgLoaded) {
			canvas.setWidth(screen.availWidth)
			canvas.setHeight(screen.availHeight)
			if (bgReady) {
				bgReady(canvas)
			}
			canvas.renderAll.bind(canvas)
		})
	}

	initElevationEvents() {
		this.attachActionEvent("onAreaSelect", function(fabricObj) {})
		this.attachActionEvent("onAreaMouseOver", function(fabricObj) {})
		this.attachActionEvent("onAreaMouseOut", function(fabricObj) {})
		this.attachActionEvent("onLoadElevation", function(elevationModel) {})
		this.attachActionEvent("onLoadAllElevations", function(THAT) {})
	}

	chooseFrameSlogan(frameName, sloganType) {
		let THAT = this
		let frontEnd = $(THAT.DOM_selectors.mainSelector)
		let mediaWindow = frontEnd.find(THAT.DOM_selectors.windows.media)
		let floorPlanWindow = frontEnd.find(THAT.DOM_selectors.windows.floorPlan)
		let iframeDom = mediaWindow.find(THAT.DOM_selectors.windowsParts.iframe)
		let galleryCarouselDom = mediaWindow.find(".render-gallery-carousel")
		let floorPlanCarouselDom = floorPlanWindow.find(".floor-plan-carousel")
		let frames = {
			floorPlanFrame: {
				available: floorPlanWindow.find(THAT.DOM_selectors.windowsSlogans.floorPlan),
				notAvailable: floorPlanWindow.find(THAT.DOM_selectors.windowsSlogans.notAvailableFloorPlan),
				default: floorPlanWindow.find(THAT.DOM_selectors.windowsSlogans.floorPlanDefault)
			},
			virtualTourFrame: {
				galleryAvailable: mediaWindow.find(THAT.DOM_selectors.windowsSlogans.renderGallery),
				virtualAvailable: mediaWindow.find(THAT.DOM_selectors.windowsSlogans.virtualTour),
				notAvailable: mediaWindow.find(THAT.DOM_selectors.windowsSlogans.notAvailableMedia),
				default: mediaWindow.find(THAT.DOM_selectors.windowsSlogans.media)
			}
		}
		if (frameName && sloganType && frames[frameName]) {
			for (let f in frames[frameName]) {
				if ((sloganType && f != sloganType) || !sloganType) {
					frames[frameName][f].addClass("d-none")
				}
			}
			if (sloganType) {
				frames[frameName][sloganType].removeClass("d-none")
			}
		}
	}

	initMediaWindows() {
		let THAT = this
		this.VUE_COMPONENTS.areaMedia = new Vue({
			el: null,
			data: THAT,
			watch: {
				areaMedia: {
					handler(areaData, oldVal) {
						THAT.informAboutAreaMediaTypes(areaData)
					},
					deep: true
				}
			}
		})
	}

	setActiveElevation(elevationName) {
		let THAT = this
		if (THAT.isFirst) {
			THAT.cameraAngle = 1.22
			THAT.isFirst = false
		} else
			switch (elevationName) {
				case "north":
					THAT.cameraAngle = -Math.PI / 2
					break
				case "south":
					THAT.cameraAngle = Math.PI / 2
					break
				case "east":
					THAT.cameraAngle = -Math.PI
					break
				case "west":
					THAT.cameraAngle = 0
					break
				default:
					THAT.cameraAngle = 0
			}

		for (let m in this.Model.elevations) {
			if (m !== elevationName) {
				this.Model.elevations[m].active = false
			}
		}
		this.Model.elevations[elevationName].active = true
		if (window.AUTO_TRIGGERED[elevationName].hasRunned === true) {
			return
		}
	}

	getActiveElevation() {
		let Model = this.Model
		for (let m in Model.elevations) {
			if (Model.elevations[m].active) {
				return m
			}
		}
		return false
	}

	attachActionEvent(eventName, func) {
		let eventNames = ["onAreaSelect", "onAreaMouseOver", "onAreaMouseOut"]
		if (eventNames.indexOf(eventName) === -1) {
			return
		}
		this.actionEvents[eventName].push(func)
	}

	runAttachedActionEvent(eventName, args) {
		let passedArgs = arguments
		let eventQueue = this.actionEvents[eventName]
		for (let e = 0; e < eventQueue.length; e++) {
			eventQueue[e](passedArgs[1], passedArgs[2])
		}
	}

	informAboutAreaMediaTypes(areaData) {
		let THAT = this
		if (!areaData.areaType) {
			THAT.chooseFrameSlogan("virtualTourFrame", "default")
			THAT.chooseFrameSlogan("floorPlanFrame", "default")
			return
		}
		if (areaData.choosenMedia === "virtualTour") {
			if (areaData.virtualTour) {
				THAT.chooseFrameSlogan("virtualTourFrame", "virtualAvailable")
			}
			if (areaData.floorPlan && (areaData.floorPlan.files.length > 0 || areaData.floorPlan.url)) {
				THAT.chooseFrameSlogan("floorPlanFrame", "available")
			}
		} else if (areaData.choosenMedia === "renderGallery") {
			if (areaData.renderGallery.files.length > 0 || areaData.renderGallery.url) {
				THAT.chooseFrameSlogan("virtualTourFrame", "galleryAvailable")
			} else {
				THAT.chooseFrameSlogan("virtualTourFrame", "notAvailable")
			}
			THAT.chooseFrameSlogan("floorPlanFrame", "notAvailable")
		} else {
			THAT.chooseFrameSlogan("virtualTourFrame", "notAvailable")
			THAT.chooseFrameSlogan("floorPlanFrame", "notAvailable")
		}
	}
	isAreaSelected() {
		let elevationName = this.getActiveElevation()
		if (elevationName && this.Model.elevations[elevationName].activeAreaData) {
			return true
		}
		return false
	}
	updateFloorPlan(areaData) {
		let files = areaData.floorPlan.files
		let frontEnd = $(this.DOM_selectors.mainSelector)
		let floorPlanWindow = frontEnd.find(this.DOM_selectors.windows.floorPlan)

		let floorPlanCarouselDom = floorPlanWindow.find(".floor-plan-carousel")
		let carouselInner = floorPlanCarouselDom.find(".carousel-inner")
		let carouselIndicators = floorPlanCarouselDom.find(".carousel-indicators")

		this.destroyMediaGustures(carouselInner.find("img"))

		carouselInner.empty()
		carouselIndicators.empty()
		if (files.length > 0 && !areaData.floorPlan.url) {
			for (let f = 0; f < files.length; f++) {
				// let imagePath = "php/get_3d_floor_plan.php" + globalQueryString +"&filename="+files[f].name;
				let token = getParameterByName("token")
				let imagePath = "data/" + token + "/floorplans/" + files[f].name
				let item = $(
					`
			<div class="carousel-item">
                <img class="d-none" src="` +
						imagePath +
						`" alt=''>			
				<div class="background-image-slide" style="background-image:url(` +
						imagePath +
						`);" alt=''  ondblclick="frontEndScreenResizer('floor-plan', 'expand')"></div>
			</div>`
				)
				carouselInner.append(item)
				let indicator = $(`<li data-target="#floor-plan-carousel" data-slide-to="` + 0 + `" ></li>`)
				carouselIndicators.append(indicator)

				this.initMediaGestures(item.find("img")[0])
			}
		} else if (files.length === 0 && areaData.floorPlan.url) {
			let item = $(
				`
			<div class="carousel-item">
				<img class="d-none" src="` +
					areaData.floorPlan.url +
					`" alt=''>
				<div class="background-image-slide" style="background-image:url(` +
					areaData.floorPlan.url +
					`);" alt=''   ondblclick="frontEndScreenResizer('floor-plan', 'expand')"></div>
			</div>`
			)
			carouselInner.append(item)
			let indicator = $(`<li data-target="#floor-plan-carousel" data-slide-to="` + 0 + `" ></li>`)
			carouselIndicators.append(indicator)

			this.initMediaGestures(item.find("img")[0])
		}
		carouselInner
			.children()
			.eq(0)
			.addClass("active")
		carouselIndicators
			.children()
			.eq(0)
			.addClass("active")
		floorPlanCarouselDom.removeClass("d-none")

		floorPlanWindow.find(".window-floor-plan-placeholder").addClass("d-none")
	}
	updateVirtualTour(areaData) {
		let frontEnd = $(this.DOM_selectors.mainSelector)
		let mediaWindow = frontEnd.find(this.DOM_selectors.windows.media)
		let iframeDom = mediaWindow.find(this.DOM_selectors.windowsParts.iframe)
		let iframe = iframeDom.find("iframe")

		iframeDom.removeClass("d-none")
		mediaWindow.find(".spinner-cont").removeClass("d-none")
		iframe[0].src = areaData.virtualTour
		iframe[0].onload = function() {
			mediaWindow.find(".spinner-cont").addClass("d-none")
		}
		mediaWindow.find(".window-media-placeholder").addClass("d-none")
	}

	updateRenderGallery(areaData) {
		let files = areaData.renderGallery.files
		let frontEnd = $(this.DOM_selectors.mainSelector)
		let mediaWindow = frontEnd.find(this.DOM_selectors.windows.media)

		let carouselDom = mediaWindow.find(".render-gallery-carousel")
		let carouselInner = carouselDom.find(".carousel-inner")
		let carouselIndicators = carouselDom.find(".carousel-indicators")

		if (frontEnd.hasClass("responsive-portait") && carouselDom.attr("data-ride") != "false") {
			carouselDom.carousel("dispose")
			carouselDom.carousel({
				interval: false,
				ride: false,
				pause: true
			})
			carouselDom.attr("data-ride", "false")
		}
		this.destroyMediaGustures(carouselInner.find("img"))
		carouselInner.empty()
		carouselIndicators.empty()
		if (files.length > 0 && !areaData.renderGallery.url) {
			for (let f = 0; f < files.length; f++) {
				// let imagePath = "php/get_3d_render_gallery.php" + globalQueryString +"&filename="+files[f].name;
				let token = getParameterByName("token")
				let imagePath = "data/" + token + "/rendergallery/" + files[f].name
				let item = $(
					`
			<div class="carousel-item">
				<img class="d-none"  src="` +
						imagePath +
						`" alt=''>
				<div class="background-image-slide" style="background-image:url(` +
						imagePath +
						`);" alt=''></div>
			</div>`
				)

				carouselInner.append(item)
				let indicator = $(`<li data-target="#render-gallery-carousel" data-slide-to="` + f + `" ></li>`)
				carouselIndicators.append(indicator)

				this.initMediaGestures(item.find("img")[0])
			}
		} else if (files.length === 0 && areaData.renderGallery.url) {
			let splitURLs = areaData.renderGallery.url.split(",")
			for (let f = 0; f < splitURLs.length; f++) {
				let item = $(
					`
			<div class="carousel-item">
				<img class="d-none"  src="` +
						splitURLs[f].trim() +
						`" alt=''>
				<div class="background-image-slide" style="background-image:url(` +
						splitURLs[f].trim() +
						`);" alt=''></div>
			</div>`
				)
				carouselInner.append(item)
				let indicator = $(`<li data-target="#render-gallery-carousel" data-slide-to="` + f + `" ></li>`)
				carouselIndicators.append(indicator)

				this.initMediaGestures(item.find("img")[0])
			}
		}
		carouselInner
			.children()
			.eq(0)
			.addClass("active")
		carouselIndicators
			.children()
			.eq(0)
			.addClass("active")
		carouselDom.removeClass("d-none")
		mediaWindow.find(".window-media-placeholder").addClass("d-none")
	}
	deActivateAreaMedia() {
		let frontEnd = $(this.DOM_selectors.mainSelector)
		let mediaWindow = frontEnd.find(this.DOM_selectors.windows.media)
		let floorPlanWindow = frontEnd.find(this.DOM_selectors.windows.floorPlan)
		let galleryCarouselDom = mediaWindow.find(".render-gallery-carousel")
		let iframeDom = mediaWindow.find(this.DOM_selectors.windowsParts.iframe)
		let floorPlanCarouselDom = floorPlanWindow.find(".floor-plan-carousel")
		galleryCarouselDom.addClass("d-none")
		iframeDom.addClass("d-none")
		floorPlanCarouselDom.addClass("d-none")
	}
	activateAreaMedia(areaData) {
		let THAT = this
		THAT.deActivateAreaMedia()
		THAT.informAboutAreaMediaTypes(areaData)

		if (areaData.choosenMedia === "virtualTour" && (areaData.virtualTour || areaData.floorPlan.files.length > 0 || areaData.floorPlan.url)) {
			THAT.chooseFrameSlogan("virtualTourFrame", null)
			THAT.updateVirtualTour(areaData)
			THAT.Model.fullToSmallSize()
		} else if (areaData.choosenMedia === "renderGallery" && (areaData.renderGallery.files.length > 0 || areaData.renderGallery.url)) {
			console.log("select render gallery data ", areaData)
			THAT.chooseFrameSlogan("virtualTourFrame", null)
			THAT.updateRenderGallery(areaData)
			THAT.Model.fullToSmallSize()
		}

		if (areaData.floorPlan.files.length > 0 || areaData.floorPlan.url) {
			THAT.chooseFrameSlogan("floorPlanFrame", null)
			THAT.updateFloorPlan(areaData)
			THAT.Model.fullToSmallSize()
		}
	}
	initMediaGestures(el) {
		let THAT = this
		if ($(el).data("hammerInstance")) {
			return
		}

		let hammertime

		hammertime = new Hammer(el)

		$(el).data("hammerInstance", hammertime)

		$(el).data("hammerOriginalTransform", {
			translate: {
				x: 0,
				y: 0
			},
			scale: 1,
			angle: 0,
			rx: 0,
			ry: 0,
			rz: 0
		})

		$(el).data("hammerRealTimeTransform", {
			translate: {
				x: 0,
				y: 0
			},
			scale: 1,
			angle: 0,
			rx: 0,
			ry: 0,
			rz: 0
		})

		hammertime.get("pinch").set({ enable: true })

		let frontEnd = $(this.DOM_selectors.mainSelector)
		if (frontEnd.hasClass("responsive-portait")) {
			el.parentNode.style.overflow = "auto"
		} else {
			el.parentNode.style.overflow = ""
		}

		hammertime.on("pan", function(ev) {
			$(el).data("hammerRealTimeTransform").translate.x = $(el).data("hammerOriginalTransform").translate.x + ev.deltaX
			$(el).data("hammerRealTimeTransform").translate.y = $(el).data("hammerOriginalTransform").translate.y + ev.deltaY

			let transformVal =
				"scale(" +
				$(el).data("hammerRealTimeTransform").scale +
				") translate(" +
				$(el).data("hammerRealTimeTransform").translate.x +
				"px, " +
				($(el).data("hammerRealTimeTransform").scale <= 1 ? "0" : $(el).data("hammerRealTimeTransform").translate.y) +
				"px)"
			el.style.webkitTransform = transformVal
			el.style.mozTransform = transformVal
			el.style.transform = transformVal
		})
		
		hammertime.on("panend", function(ev) {
			$(el).data("hammerOriginalTransform").translate.x = $(el).data("hammerRealTimeTransform").translate.x
			$(el).data("hammerOriginalTransform").translate.y = $(el).data("hammerRealTimeTransform").translate.y
		})

		hammertime.on("pinch", function(ev) {
			$(el).data("hammerRealTimeTransform").scale = $(el).data("hammerOriginalTransform").scale * ev.scale
			// el.style.height = $(el).data('hammerOriginalTransform').scale * ev.scale * 100 + '%';
			let transformVal =
				"scale(" +
				$(el).data("hammerRealTimeTransform").scale +
				") translate(" +
				$(el).data("hammerRealTimeTransform").translate.x +
				"px," +
				$(el).data("hammerRealTimeTransform").translate.y +
				"px)"
			el.style.webkitTransform = transformVal
			el.style.mozTransform = transformVal
			el.style.transform = transformVal
		})

		hammertime.on("pinchend", function(ev) {
			$(el).data("hammerOriginalTransform").scale = $(el).data("hammerRealTimeTransform").scale
		})
	}
	destroyMediaGustures(elOrEls) {
		let destroyHammer = function(el) {
			if ($(el).data("hammerInstance") && $(el).data("hammerInstance").destroy) {
				$(el)
					.data("hammerInstance")
					.destroy()
			}
		}
		if ($.isArray(elOrEls)) {
			elOrEls.each(function(index) {
				destroyHammer(this)
			})
		} else {
			destroyHammer(elOrEls)
		}
	}

	visit_suites(suites) {
		$.ajax({
			url: "php/visit_suites.php" + globalQueryString + "&&suites=" + suites,
			method: "GET",
			success: function(response) {},
			error: function(e, y) {}
		})
	}

	initBabyLonCanvas(canvas) {
		let THAT = this
		let settingVal = THAT.Model.babySetting

		function getRGB(str) {
			var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/)
			return match
				? {
						red: match[1],
						green: match[2],
						blue: match[3]
				  }
				: {}
		}

		function update_loading(loaded) {
			if (loaded === 3) {
				$("#load_bar").attr("finished", 1)
			}
			return
		}

		let delayCreateScene = function(engine) {
			// Model by Mixamo
			engine.enableOfflineSupport = false
			BABYLON.Animation.AllowMatricesInterpolation = true

			let currentCameraPostion = settingVal.currentCameraPostion
			let height = settingVal.height
			let radius = settingVal.radius
			let cameraX = settingVal.cameraX
			let cameraY = settingVal.cameraY

			let meshe_materials = []
			let search_meshe_materials = []
			let meshes = []

			var scene = new BABYLON.Scene(engine)
			scene.textures = []

			scene.clearColor = new BABYLON.Color3(250 / 255, 250 / 255, 244 / 250, 0.001)
			var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 4, Math.PI / 4, radius, BABYLON.Vector3.Zero(), scene)
			camera.attachControl(canvas, true)
			camera.maxZ = settingVal.maxZ // camera.maxZ = 10000000;
			scene.activeCamera = camera
			camera.lowerRadiusLimit = settingVal.lowerRadiusLimit
			camera.upperRadiusLimit = settingVal.upperRadiusLimit
			//camera upper and lower limit of rotation
			camera.lowerBetaLimit = settingVal.lowerBetaLimit * Math.PI
			camera.upperBetaLimit = settingVal.upperBetaLimit * Math.PI

			if (THAT.Model.windowMode == "small") {
				camera.wheelDeltaPercentage = settingVal.wheelDeltaPercentageMobile
				camera.pinchDeltaPercentage = 0.002
			} else {
				camera.wheelDeltaPercentage = settingVal.wheelDeltaPercentage
			}

			camera.useInputToRestoreState = true
			camera.panningSensibility = 1200
			camera.attachControl(canvas, true)
			camera.useBouncingBehavior = true
			camera.target = new BABYLON.Vector3(cameraX, height, cameraY)

			$(".step-container").css("display", "none")

			//------------------------------- Load textures ------------------------------------

			let babylonAssetManager = new BABYLON.AssetsManager(scene)

			babylonAssetManager.onTaskError = function(task) {}

			let presFlag = false
			let targetAngle = 0.0
			let presAngleVelocity = 0.0

			babylonAssetManager.onFinish = function(tasks) {
				update_loading(100)
				$("#loading").hide()

				scene.meshes.map(m => {
					if (m.name == "BackgroundSkybox") {
						m.dispose()
					}
				})

				$("#origin_point").click(function() {
					go_origin()
				})
			}

			//--------------------------- Lens Effect ------------------------------------

			// Light

			let token = getParameterByName("token")
			let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene)
			light.intensity = 0.1
			light.shadowsEnabled = true

			let light1 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(-1, -1, 0), scene)
			light1.intensity = 0.1
			light1.shadowsEnabled = true

			//skybox reflection
			scene.createDefaultEnvironment({
				environmentTexture: new BABYLON.CubeTexture("data/" + token + "/textures/noon/skybox", scene)
			})

			//balconies
			let glass_material1 = new BABYLON.PBRMaterial("kosh51", scene)
			glass_material1.environmentIntensity = 2.5
			glass_material1.metallic = 1
			glass_material1.roughness = 0.07
			glass_material1.zOffset = 1
			glass_material1.alpha = 0.7
			glass_material1.albedoColor = BABYLON.Color3.FromHexString("#98a6ab")
			// console.log('glass_material1 ', glass_material1)

			//windows
			let glass_material2 = new BABYLON.PBRMaterial("kosh52", scene)
			glass_material2.environmentIntensity = 2.5
			glass_material2.metallic = 1
			glass_material2.roughness = 0.07
			glass_material2.zOffset = 1
			glass_material2.alpha = 0.9
			glass_material2.albedoColor = BABYLON.Color3.FromHexString("#98a6ab")

			let body_texture1 = null
			let body_texture2 = null
			let env_texture = null
			let opacity_texture = null

			let body_texture1_process = babylonAssetManager.addTextureTask("body_texture1", "data/" + token + "/textures/body/BODY_1_Beauty.jpg")

			body_texture1_process.onSuccess = function(task) {
				body_texture1 = task.texture
				body_texture1.uAng = Math.PI
				update_loading(2)
			}

			let body_texture2_process = babylonAssetManager.addTextureTask("body_texture2", "data/" + token + "/textures/body/BODY_2_Beauty.jpg")
			body_texture2_process.onSuccess = function(task) {
				body_texture2 = task.texture
				body_texture2.uAng = Math.PI
				update_loading(2)
			}

			// let env_texture_process = babylonAssetManager.addTextureTask("env_texture", "data/"+token+"/textures/body/ENV_Beauty.jpg");
			// env_texture_process.onSuccess = function (task) {
			//     env_texture = task.texture;
			//     env_texture.uAng = Math.PI;
			//     update_loading(2);
			// }
			//
			// let opacity_texture_process = babylonAssetManager.addTextureTask("opacity_texture", "data/"+token+"/textures/body/ENV_Opacity.png");
			// opacity_texture_process.onSuccess = function (task) {
			//     opacity_texture = task.texture;
			//     opacity_texture.uAng = Math.PI;
			//     update_loading(2);
			// }

			//------------------------------------ Logical Variable Settings ---------------------------------------------//
			let surroundings = []
			let balconyArray = {}
			let transParencyArray = {}
			let targetTransArray = {}
			let balconyCenterArray = {}
			let selectedTagName = ""
			//------------------------------------- Handle Building Functions ---------------------------------------------//

			let cameraTarget = { x: camera.target.x, y: camera.target.y, z: camera.target.z }
			let initialCameraPoint = { x: camera.target.x, y: camera.target.y, z: camera.target.z }
			function go_origin() {
				$("#origin_point").css("display", "none")
				cameraTarget = initialCameraPoint
				selectedTagName = ""
				camera.lowerRadiusLimit = settingVal.lowerRadiusLimit
				Object.keys(balconyArray).map(function(item_key) {
					targetTransArray[item_key] = 1.0
				})
			}

			let glbTask = babylonAssetManager.addMeshTask("glbTask", "", "data/" + token + "/textures/", settingVal.model)

			glbTask.onSuccess = function(task) {
				update_loading(3)
				let newMeshes = task.loadedMeshes
				for (let index = 0; index < newMeshes.length; index++) {
					let item_name = newMeshes[index].name
					newMeshes[index].hasVertexAlpha = false
					newMeshes[index].mustDepthSortFacets = false
					// how to know the size of the current building (position, scale, etc)
					let str = item_name.split("_")

					if (str[1]) {
						if (!balconyArray[str[0]]) {
							balconyArray[str[0]] = []
							transParencyArray[str[0]] = 1.0
							targetTransArray[str[0]] = 1.0
							balconyCenterArray[str[0]] = { x: 0.0, y: 0.0, z: 0.0 }
						}
						balconyArray[str[0]].push(newMeshes[index])
						balconyCenterArray[str[0]].x += newMeshes[index].absolutePosition.x
						balconyCenterArray[str[0]].y += newMeshes[index].absolutePosition.y
						balconyCenterArray[str[0]].z += newMeshes[index].absolutePosition.z
					}

					if (item_name == "Water") {
					} else if (item_name.substr(-8) == "__root__") {
					} else if (item_name == "Building_top" || item_name == "roof") {
					} else if (item_name.substr(-5) == "walls") {
					} else if (item_name.substr(0, 8) == "building") {
						surroundings.push(newMeshes[index])
						newMeshes[index].hasVertexAlpha = false
						newMeshes[index].mustDepthSortFacets = false
					} else if (item_name.substr(0, 15) == "glasses_railing") {
						newMeshes[index].material = glass_material2
					} else if (item_name.substr(0, 7) == "glasses" || item_name.substr(0, 7) == "coridor") {
						newMeshes[index].material = glass_material2
					} else if (item_name == "16_glass_room_shell") {
						newMeshes[index].material = glass_material2
					}
					if (!newMeshes[index].material) continue
					meshe_materials.push(Object.create(newMeshes[index].material))
					meshes.push(newMeshes[index])
				}

				const white_1 = scene.getMaterialByName("white_1")
				white_1.albedoColor = new BABYLON.Color3(0.9, 0.9, 0.9)
				white_1.environmentIntensity = 0
				white_1.metallic = 0.1
				white_1.roughness = 0.5

				const dark_1 = scene.getMaterialByName("dark_1")
				dark_1.albedoColor = new BABYLON.Color3(0.06, 0.06, 0.06)
				dark_1.environmentIntensity = 0
				dark_1.metallic = 0.1
				dark_1.roughness = 0.5

				const grass_1 = scene.getMaterialByName("grass_1")
				grass_1.albedoTexture.level = 3

				let firstBuildingRound = setInterval(function() {
					if (presAngleVelocity < 0.02 && currentCameraPostion > targetAngle) presAngleVelocity += 0.001
					else if (presAngleVelocity > 0.0 && currentCameraPostion < targetAngle) {
						presAngleVelocity -= 0.001
					}
				}, 10)
				// turn_arround();

				setInterval(function() {
					if (Math.abs(currentCameraPostion - targetAngle) < 0.2 && firstBuildingRound) {
						// console.log("clear interval : ", currentCameraPostion, targetAngle);
						presFlag = false
						presAngleVelocity = 0.0
						clearInterval(firstBuildingRound)
					}
				}, 100)
			}

			setTimeout(() => {
				console.log("babylon load started")
				babylonAssetManager.load()
			}, 100)

			scene.registerBeforeRender(function() {
				let ratio = Math.atan((camera.position.z - cameraY) / (camera.position.x - cameraX))
				ratio -= Math.PI / 3
				settingVal.cameraAngle = 10

				if (THAT.searchEnable) {
					THAT.searchEnable = false

					for (let i = 0; i < meshes.length; i++) {
						let existInfilter = false
						let item_name = meshes[i].name.split("_")
						item_name = item_name[1]

						if (!THAT.tileData[item_name]) {
							search_meshe_materials[i] = Object.create(meshes[i].material)
							continue
						}

						let itemInfo = THAT.tileData[item_name].RENDERATOR.dataEntry

						for (let j = 0; j < THAT.searchResult.length; j++) {
							if (itemInfo.UNIQUE_ID == THAT.searchResult[j].RENDERATOR.dataEntry.UNIQUE_ID) {
								existInfilter = true
								break
							}
						}
						//---------------------------------------------------------------filter results settings----------------------------------------------------------------//
						if (existInfilter) {
							let myMaterial = new BABYLON.StandardMaterial("myMaterial", scene)
							myMaterial.emissiveColor = new BABYLON.Color3(0.00, 0.18, 0.00)
							myMaterial.environmentIntensity = 0.1
							myMaterial.alpha = 0.8
							


							if (THAT.tileData[item_name]) {
								if (THAT.tileData[item_name].RENDERATOR.dataEntry.availability == "false") {
									myMaterial.emissiveColor = new BABYLON.Color3(0.18, 0.00, 0.00)
									myMaterial.environmentIntensity = 0.1
									myMaterial.alpha = 0.8
								} else if (THAT.tileData[item_name].RENDERATOR.dataEntry.areaType == "commercial") {
									myMaterial.diffuseColor = new BABYLON.Color3(0.18, 0.00, 0.00)
									myMaterial.specularColor = new BABYLON.Color3(0.18, 0.00, 0.00)
									myMaterial.emissiveColor = new BABYLON.Color3(0.18, 0.00, 0.00)
									myMaterial.alpha = 0.8
								} else if (THAT.tileData[item_name].RENDERATOR.dataEntry.areaType == "common") {
									myMaterial.diffuseColor = new BABYLON.Color3(0.18, 0.00, 0.00)
									myMaterial.specularColor = new BABYLON.Color3(0.18, 0.00, 0.00)
									myMaterial.emissiveColor = new BABYLON.Color3(0.18, 0.00, 0.00)
									myMaterial.alpha = 0.8
								}
							}

							meshes[i].material = myMaterial
						} else {
							meshes[i].material = meshe_materials[i]
						}
						search_meshe_materials[i] = Object.create(meshes[i].material)
					}
					THAT.loading_spinner.addClass("d-none")
				}

				if (window.deselectRoom) {
					window.deselectRoom = false
					for (let i = 0; i < meshes.length; i++) {
						if (THAT.searchFlag) {
							meshes[i].material = search_meshe_materials[i]
						} else {
							meshes[i].material = meshe_materials[i]
						}
					}
				}
			})
			let fadeTime = 0
			let fadeStart = false

			scene.onBeforeRenderObservable.add(function() {
				var radius = cameraRadius()

				if (radius > settingVal.zoomRange) {
					if (Math.abs(camera.target.x - cameraTarget.x) > 2.0) {
						camera.target.x += Math.sign(cameraTarget.x - camera.target.x) * 2.0
					}

					if (Math.abs(camera.target.y - cameraTarget.y) > 2.0) {
						camera.target.y += Math.sign(cameraTarget.y - camera.target.y) * 2.0
					}

					if (Math.abs(camera.target.z - cameraTarget.z) > 2.0) {
						camera.target.z += Math.sign(cameraTarget.z - camera.target.z) * 2.0
					}
				}

				if (presFlag) {
					currentCameraPostion -= presAngleVelocity
					THAT.cameraAngle = currentCameraPostion
					let presX = radius * Math.cos(currentCameraPostion)
					let presY = radius * Math.sin(currentCameraPostion)
					camera.setPosition(new BABYLON.Vector3(camera.target.x + presX, camera.position.y, camera.target.z + presY))
				}

				if (window.model_rotate) {
					THAT.cameraAngle += 0.005
				}

				if (window.model_zoom) {
					radius -= camera.upperRadiusLimit / 100
				}
				if (camera.lowerBetaLimit > radius) {
					window.model_zoom = false
				}

				if (window.model_click) {
					window.model_click = false
					let activated_mesh = []

					for (let index = 0; index < meshes.length; index++) {
						let i_name = meshes[index].name
						if (i_name.substr(0, 7) == "glasses") {
							let selected_balkony = i_name.split("_")
							selected_balkony = selected_balkony[1]
							if (THAT.tileData[selected_balkony] == undefined) continue
							activated_mesh.push(selected_balkony)
						}
					}

					if (activated_mesh.length == 0) return

					let rand_index = Math.round(Math.random() * activated_mesh.length)

					THAT.visit_suites(activated_mesh[rand_index])
					THAT.tileData[activated_mesh[rand_index]].RENDERATOR.dataEntry.orientation = "north"
					console.log("selected arrays : ", rand_index)
					console.log("selected mesh data : ", THAT.tileData[activated_mesh[rand_index]])
					THAT.activateElevationArea("north", THAT.tileData[activated_mesh[rand_index]])

					let highLightWindow = "glasses_" + activated_mesh[rand_index]

					for (let index = 0; index < meshes.length; index++)
						if (highLightWindow == meshes[index].name) {
							var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene)
							myMaterial.diffuseColor = new BABYLON.Color3(1, 201 / 255, 145 / 255)
							myMaterial.specularColor = new BABYLON.Color3(0.6, 0.6, 0.87)
							myMaterial.emissiveColor = new BABYLON.Color3(1, 201 / 255, 145 / 255)

							if (THAT.tileData[activated_mesh[rand_index]]) {
								if (THAT.tileData[activated_mesh[rand_index]].RENDERATOR.dataEntry.availability == "false") {
									myMaterial.diffuseColor = new BABYLON.Color3(1, 51 / 255, 15 / 255)
									myMaterial.specularColor = new BABYLON.Color3(1, 51 / 255, 45 / 255)
									myMaterial.emissiveColor = new BABYLON.Color3(1, 51 / 255, 45 / 255)
								} else if (THAT.tileData[activated_mesh[rand_index]].RENDERATOR.dataEntry.areaType == "commercial") {
									myMaterial.diffuseColor = new BABYLON.Color3(1, 91 / 255, 55 / 255)
									myMaterial.specularColor = new BABYLON.Color3(1, 91 / 255, 95 / 255)
									myMaterial.emissiveColor = new BABYLON.Color3(1, 91 / 255, 95 / 255)
								} else if (THAT.tileData[activated_mesh[rand_index]].RENDERATOR.dataEntry.areaType == "common") {
									myMaterial.diffuseColor = new BABYLON.Color3(51 / 255, 51 / 255, 1)
									myMaterial.specularColor = new BABYLON.Color3(51 / 255, 51 / 255, 1)
									myMaterial.emissiveColor = new BABYLON.Color3(51 / 255, 51 / 255, 1)
								}
							}
							myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53)
							meshes[index].visibility = 1
							meshes[index].material = myMaterial
						} else {
							meshes[index].disableEdgesRendering()
							meshes[index].material = meshe_materials[index]
						}
				}

				let delta = THAT.cameraAngle - currentCameraPostion

				if (Math.abs(delta) > 0.001 || window.model_zoom) {
					let rot_delta = delta / 10
					currentCameraPostion += rot_delta
					let x = radius * Math.cos(currentCameraPostion)
					let y = radius * Math.sin(currentCameraPostion)
					camera.setPosition(new BABYLON.Vector3(cameraX + x, camera.position.y, cameraY + y))
				}
			})

			setInterval(() => {
				if (fadeStart) {
					fadeTime += 1
					// set_main_building_opacity(main_building_meshes, effect_mode, fadeTime);
					if (fadeTime > 20) fadeStart = false
				}
			}, 50)

			let mouseClicked = false
			let startY = 0
			let startX = 0
			let initialY = 0
			let startingPoint
			let clickedMesh = []

			// scroll up and down event handling
			let cameraRadius = function() {
				let r = Math.sqrt(camera.position.x * camera.position.x + camera.position.z * camera.position.z)
				return r
			}

			let updateCameraPoint = function(deltaY) {
				let newY = initialY + deltaY / 30
				// if(Math.abs(newY - cameraTagetCenter) > moveableLimit ) return;
				if (newY > settingVal.bottomLimit && newY < settingVal.topLimit) {
					let newPos = new BABYLON.Vector3(cameraX, newY, cameraY)
					camera.target = newPos
				}
			}

			let onPointerDown = function(evt) {
				mouseClicked = true
				startY = evt.y
				initialY = camera.target.y
				startX = evt.x
				if (evt.button !== 0) {
					return
				}
			}

			let deltaYLimit = 0.2
			if (settingVal.deltaYLimit) deltaYLimit = settingVal.deltaYLimit

			let h1 = new BABYLON.HighlightLayer("hl", scene, {
				blurVerticalSize: 0.1,
				blurHorizontalSize: 0.1
			})

			var onPointerMove = function(evt) {
				let currentCameraRadius = cameraRadius()

				if (currentCameraRadius < settingVal.zoomRange) {
					let deltaY = evt.y - startY

					if (mouseClicked && Math.abs(deltaY) > deltaYLimit) {
						updateCameraPoint(deltaY)
						return
					}
				}
			}

			let gl = null
			gl = new BABYLON.GlowLayer("glow", scene, {
				mainTextureFixedSize: 256,
				blurKernelSize: 64
			})
			let mesh_str = []

			let onPointerUp = function(evt) {
				window.model_rotate = false
				window.model_click = false
				window.model_zoom = false

				mouseClicked = false
				if (Math.abs(evt.x - startX) + Math.abs(evt.y - startY) > 1) return
				camera.attachControl(canvas, true)
				let canvas_panel = THAT.Model.elevations["north"].elevationCanvas
				let p_mesh = []
				let tolerence = 1
				let isMesh = false
				let pickInfo = []
				let selected_balkony = ""

				for (let i = 0; i < 5; i++) {
					pickInfo = scene.pick(scene.pointerX + tolerence * Math.cos((0.3 * Math.PI * i) / 5), scene.pointerY + tolerence * Math.sin((0.3 * Math.PI * i) / 5), function(mesh) {
						return mesh !== []
					})
					p_mesh = pickInfo.pickedMesh
					if (p_mesh == undefined) continue
					if (
						pickInfo.hit &&
						(pickInfo.pickedMesh.name.substr(0, 7) == "glasses" || pickInfo.pickedMesh.name.substr(-5) == "coridor" || pickInfo.pickedMesh.name.substr(-13) == "balkony_glass")
					) {
						isMesh = true
						mesh_str = p_mesh.name.split("_")
						if (pickInfo.pickedMesh.name.substr(0, 7) == "glasses") {
							selected_balkony = mesh_str[1]
						} else if (pickInfo.pickedMesh.name.substr(-5) == "walls") {
							selected_balkony = p_mesh.name.substr(0, p_mesh.name.length - 6)
						} else if (pickInfo.pickedMesh.name.substr(-13) == "balkony_glass") {
							selected_balkony = p_mesh.name.substr(0, p_mesh.name.length - 14)
						}

						break
					}
				}
				// if picked correct mesh

				if (isMesh) {
				} else {
					canvas_panel.trigger("selection:cleared")
					return
				}

				let selected_item = 0
				let highlight = selected_balkony + "_walls"
				let highLightWindow = "glasses_" + selected_balkony
				for (let index = 0; index < meshes.length; index++) {
					// if(p_mesh == meshes[index]){
					//---------------------------------------------------------------------manual property click----------------------------------------
					if (highLightWindow == meshes[index].name) {
						var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene)
						myMaterial.emissiveColor = new BABYLON.Color3(1, 201 / 255, 145 / 255)
						myMaterial.alpha = 0.7
						if (THAT.tileData[selected_balkony]) {
							if (THAT.tileData[selected_balkony].RENDERATOR.dataEntry.availability == "false") {
								myMaterial.diffuseColor = new BABYLON.Color3(1, 51 / 255, 15 / 255)
								myMaterial.specularColor = new BABYLON.Color3(1, 51 / 255, 45 / 255)
								myMaterial.emissiveColor = new BABYLON.Color3(1, 51 / 255, 45 / 255)
							} else if (THAT.tileData[selected_balkony].RENDERATOR.dataEntry.areaType == "commercial") {
								myMaterial.diffuseColor = new BABYLON.Color3(1, 91 / 255, 55 / 255)
								myMaterial.specularColor = new BABYLON.Color3(1, 91 / 255, 95 / 255)
								myMaterial.emissiveColor = new BABYLON.Color3(1, 91 / 255, 95 / 255)
							} else if (THAT.tileData[selected_balkony].RENDERATOR.dataEntry.areaType == "common") {
								myMaterial.diffuseColor = new BABYLON.Color3(51 / 255, 51 / 255, 1)
								myMaterial.specularColor = new BABYLON.Color3(51 / 255, 51 / 255, 1)
								myMaterial.emissiveColor = new BABYLON.Color3(51 / 255, 51 / 255, 1)
							}
						}
						myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53)
						meshes[index].visibility = 1
						meshes[index].material = myMaterial
					} else {
						meshes[index].disableEdgesRendering()
						meshes[index].material = meshe_materials[index]
					}
				}

				// if(THAT.tileData[selected_balkony]== undefined) return;
				if (THAT.tileData[selected_balkony] == undefined) return

				THAT.visit_suites(selected_balkony)

				if (THAT.tileData[selected_balkony].RENDERATOR.dataEntry.availability == true) {
					meshes[selected_item].material.diffuseColor = new BABYLON.Color3(0, 0, 91 / 255)
				} else {
					meshes[selected_item].material.diffuseColor = new BABYLON.Color3(250 / 255, 50 / 255, 50 / 255)
				}

				THAT.tileData[selected_balkony].RENDERATOR.dataEntry.orientation = "north"

				console.log("selected mesh data : ", THAT.tileData[selected_balkony])
				THAT.activateElevationArea("north", THAT.tileData[selected_balkony])
				// if(window.innerWidth > 768)
				// THAT.Model.fullToSmallSize();
				if (startingPoint) {
					startingPoint = null
					return
				}
			}

            let clearPreviousHoveredSelection = function () {
                if (THAT.previousHoveredEntryIndex < 0) {
                    return;
                }

                if (THAT.Model.elevations["north"].activeAreaData) {

                    let selectedMeshName = THAT.Model.elevations["north"].activeAreaData.mesh_name;

                    if (!meshes[THAT.previousHoveredEntryIndex].name.includes("glasses_" + selectedMeshName)) {
                        meshes[THAT.previousHoveredEntryIndex].material = meshe_materials[THAT.previousHoveredEntryIndex]
                    }
                    
                } else {
                    meshes[THAT.previousHoveredEntryIndex].material = meshe_materials[THAT.previousHoveredEntryIndex]
                }
            }

            let onMouseMove = function (evt) {
                if (THAT.searchFlag) return;

                let p_mesh = []
                let tolerence = 1
                let isMesh = false
                let pickInfo = []
                let selected_balkony = ""
                let meshAreaHovered = false;

                for (let i = 0; i < 5; i++) {
                    pickInfo = scene.pick(scene.pointerX + tolerence * Math.cos((0.3 * Math.PI * i) / 5),
                        scene.pointerY + tolerence * Math.sin((0.3 * Math.PI * i) / 5),
                        function (mesh) {
                            return mesh !== []
                        })
                    p_mesh = pickInfo.pickedMesh
                    if (p_mesh == undefined) {
                        continue
                    }

                    meshAreaHovered = true;

                    if (pickInfo.hit && (pickInfo.pickedMesh.name.substr(0, 7) == "glasses" ||
                        pickInfo.pickedMesh.name.substr(-5) == "coridor" ||
                        pickInfo.pickedMesh.name.substr(-13) == "balkony_glass")) {
                        isMesh = true
                        mesh_str = p_mesh.name.split("_")

                        if (pickInfo.pickedMesh.name.substr(0, 7) == "glasses") {
                            selected_balkony = mesh_str[1]
                        } else if (pickInfo.pickedMesh.name.substr(-5) == "walls") {
                            selected_balkony = p_mesh.name.substr(0, p_mesh.name.length - 6)
                        } else if (pickInfo.pickedMesh.name.substr(-13) == "balkony_glass") {
                            selected_balkony = p_mesh.name.substr(0, p_mesh.name.length - 14)
                        } else {
                        }

                        break
                    } else {
                    }
                }

                if (!meshAreaHovered) {
                    clearPreviousHoveredSelection()
                    THAT.previousHoveredEntryIndex = -1
                    THAT.previousHoveredEntry = null
                    return;
                }

                if (THAT.previousHoveredEntry == selected_balkony) {
                    return
                }

                if (isMesh) {
                } else {
                    return
                }

                if (THAT.Model.elevations["north"].activeAreaData) {
                    let selectedMeshName = THAT.Model.elevations["north"].activeAreaData.mesh_name;

                    if (selected_balkony == selectedMeshName) {
                        return
                    }
                }

                let highLightWindow = "glasses_" + selected_balkony
                let selectedEntryIndex = -1;

                for (let index = 0; index < meshes.length; index++) {

                    if (highLightWindow == meshes[index].name) {

                        if (THAT.tileData[selected_balkony]) {
                            var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene)
                            myMaterial.emissiveColor = new BABYLON.Color3(0.00, 0.18, 0.00)
                            myMaterial.environmentIntensity = 0.1
                            myMaterial.alpha = 0.8

                            THAT.tileData[selected_balkony].RENDERATOR.dataEntry.orientation = "north"
                            if (THAT.tileData[selected_balkony].RENDERATOR.dataEntry.availability == "false") {
                                myMaterial.diffuseColor = new BABYLON.Color3(1, 51 / 255, 15 / 255)
                                myMaterial.specularColor = new BABYLON.Color3(1, 51 / 255, 45 / 255)
                                myMaterial.emissiveColor = new BABYLON.Color3(1, 51 / 255, 45 / 255)
                            } else if (THAT.tileData[selected_balkony].RENDERATOR.dataEntry.areaType == "commercial") {
                                myMaterial.diffuseColor = new BABYLON.Color3(1, 91 / 255, 55 / 255)
                                myMaterial.specularColor = new BABYLON.Color3(1, 91 / 255, 95 / 255)
                                myMaterial.emissiveColor = new BABYLON.Color3(1, 91 / 255, 95 / 255)
                            } else if (THAT.tileData[selected_balkony].RENDERATOR.dataEntry.areaType == "common") {
                                myMaterial.diffuseColor = new BABYLON.Color3(51 / 255, 51 / 255, 1)
                                myMaterial.specularColor = new BABYLON.Color3(51 / 255, 51 / 255, 1)
                                myMaterial.emissiveColor = new BABYLON.Color3(51 / 255, 51 / 255, 1)
							}
							
							myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53)
							meshes[index].visibility = 1
							meshes[index].material = myMaterial
							selectedEntryIndex = index;

							break;
                        }

                        
                    }
                }

                clearPreviousHoveredSelection();

                THAT.previousHoveredEntryIndex = selectedEntryIndex;
                THAT.previousHoveredEntry = selected_balkony;

                if (startingPoint) {
                    startingPoint = null
                    return
                }
            }

			let eventCanvas = engine.getRenderingCanvas()
			eventCanvas.addEventListener("pointerdown", onPointerDown, false)
			eventCanvas.addEventListener("pointermove", onPointerMove, false)
			eventCanvas.addEventListener("pointerup", onPointerUp, false)
			eventCanvas.addEventListener("mousemove", onMouseMove, false)

			scene.onDispose = function() {
				eventCanvas.removeEventListener("pointerdown", onPointerDown)
				eventCanvas.removeEventListener("pointermove", onPointerMove)
				eventCanvas.removeEventListener("pointerup", onPointerUp)
                eventCanvas.removeEventListener("mousemove", onMouseMove)
			}
			return scene
		}

		let engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
		let scene = delayCreateScene(engine)

		engine.runRenderLoop(function() {
			if (scene) {
				scene.render()
			}
		})
		// Resize
		// window.addEventListener("resize", function () {
		// 	engine.resize();
		// });
		let canvasThr = 0
		let canvasHThr = 0

		setInterval(function() {
			let canvasWidth = $("#renderator-canvas-north-mine").outerWidth()
			let canvasHeight = $("#renderator-canvas-north-mine").outerHeight()
			if (Math.abs(canvasThr - canvasWidth) > 10 || Math.abs(canvasHeight - canvasHThr) > 10) {
				canvasThr = canvasWidth
				canvasHThr = canvasHeight
				engine.resize()
			}
		}, 500)
	}

	/* CRM start */
	getCRMparams(selectedValue) {
		for (let p = 0; p < LOADED_MODEL.crm.crmOptions.length; p++) {
			if (LOADED_MODEL.crm.crmOptions[p].value === selectedValue) {
				return LOADED_MODEL.crm.crmOptions[p]
			}
		}
		return false
	}

	crmMergeAreaData(elevationAreas) {
		if (LOADED_MODEL.crm && LOADED_MODEL.crm.selected.value) {
			if (LOADED_MODEL.crm.selected.value === "rentcafe") {
				let setupCredentials = THAT.getCRMparams(crmValue)
				let token = setupCredentials.params.token
				let propertyId = setupCredentials.params.propertyId
			}
		}
	}
	crmGetAreaData(shapeObj, cb) {
		let THAT = this

		if (shapeObj.renderatorDataEntry.crm.value === "rentcafe" && shapeObj.renderatorDataEntry.crm.params.ApartmentName) {
			let crmValue = shapeObj.renderatorDataEntry.crm.value
			let setupCredentials = THAT.getCRMparams(crmValue)
			let token = setupCredentials.params.token
			let propertyId = setupCredentials.params.propertyId
			let apartmentName = shapeObj.renderatorDataEntry.crm.params.ApartmentName

			let SPINNER = $(".spinner-section-general")
			SPINNER.removeClass("d-none")

			this.rentcafeGetApartmentData(token, propertyId, shapeObj.renderatorDataEntry.crm.params.ApartmentName, {
				onSuccess: function(rentcafeProps) {
					THAT.matchRentcafeProps(shapeObj.renderatorDataEntry, rentcafeProps)

					if (rentcafeProps.FloorplanId) {
						THAT.rentcafeGetAppartmentFloorplan(token, propertyId, rentcafeProps.FloorplanId, {
							onSuccess: function(floorplanImageURL) {
								if (floorplanImageURL) {
									if (shapeObj.renderatorDataEntry.floorPlan.files.length === 0) {
										shapeObj.renderatorDataEntry.floorPlan.url = encodeURI(floorplanImageURL)
									} else {
										shapeObj.renderatorDataEntry.floorPlan.url = null
									}
								}
								SPINNER.addClass("d-none")
								if (cb) {
									cb()
								}
							},
							onError: function() {
								SPINNER.addClass("d-none")
							}
						})
					} else {
						SPINNER.addClass("d-none")
						if (cb) {
							cb()
						}
					}
				},
				onError: function() {
					SPINNER.addClass("d-none")
					$("#crm-fail-load-area").modal("show")
				}
			})
		}
	}
	crmAtLeastOneApartment(allStoredData) {
		let count = 0
		for (let m = 0; m < allStoredData.length; m++) {
			if (allStoredData[m].RENDERATOR && allStoredData[m].RENDERATOR.dataEntry && allStoredData[m].RENDERATOR.dataEntry.crm && allStoredData[m].RENDERATOR.dataEntry.crm.value) {
				count++
			}
		}
		return count
	}
	// start ---------
	crmGetAllData(crmValue, cb) {
		let THAT = this
		let setupCredentials = THAT.getCRMparams(crmValue)
		if (!setupCredentials) {
			//CREDENTIALS NOT SET IN SETUP.
			if (cb && cb.onError) {
				cb.onError()
				return
			}
		}
		if (crmValue === "rentcafe") {
			let token = setupCredentials.params.token
			let propertyId = setupCredentials.params.propertyId
			let apiURL = "https://api.rentcafe.com/rentcafeapi.aspx?requestType=apartmentavailability"
			apiURL += "&apiToken=" + token
			apiURL += "&propertyId=" + propertyId
			$.ajax({
				type: "GET",
				url: apiURL,
				dataType: "json",
				success: function(data) {
					if (data.length === 1 && data[0].Error) {
						/*disable front end*/
						if (cb && cb.onError) {
							cb.onError(data[0])
							return
						}
					}
					if (cb && cb.onSuccess) {
						cb.onSuccess(data)
					}
				},
				error: function(er) {
					if (cb && cb.onError) {
						cb.onError()
					}
				}
			})
		}
	}
	crmRentCafeMergeApiData(canvasObjects, APIobjects) {
		let THAT = this
		let tempNames = []
		for (let k = 0; k < APIobjects.length; k++) {
			tempNames.push(APIobjects[k].ApartmentName)
		}
		let searchableData = []
		let canvasObjectLastKey = canvasObjects.length - 1
		for (let s = canvasObjectLastKey; s >= 0; --s) {
			if (
				canvasObjects[s].RENDERATOR &&
				canvasObjects[s].RENDERATOR.dataEntry &&
				canvasObjects[s].RENDERATOR.dataEntry.crm &&
				canvasObjects[s].RENDERATOR.dataEntry.crm.value &&
				canvasObjects[s].RENDERATOR.dataEntry.crm.params.ApartmentName
			) {
				let existInApi = tempNames.indexOf(canvasObjects[s].RENDERATOR.dataEntry.crm.params.ApartmentName)
				if (existInApi === -1) {
					/* if apartment does not exist in rentcafe but it is bound here, then hide it*/
					canvasObjects[s].visible = false
					canvasObjects[s].evented = false
				} else {
					/* if apartment exist, merge data */
					canvasObjects[s].visible = true
					canvasObjects[s].evented = true
					THAT.matchRentcafeProps(canvasObjects[s].RENDERATOR.dataEntry, APIobjects[existInApi])
					searchableData.push(jQuery.extend(true, {}, canvasObjects[s]))
				}
			} else {
				searchableData.push(jQuery.extend(true, {}, canvasObjects[s]))
			}
		}
		return searchableData
	}
	crmUpdateElevationAreasFromCRM(elevationName, onUpdated) {
		let THAT = this
		let elevationKlassInst = this.elevationKlasses[elevationName]
		let elevationFilterKlassInst = this.elevationFilterKlasses[elevationName]
		this.crmGetAllData("rentcafe", {
			onSuccess: function(APIobjects) {
				let canvasObjects = elevationKlassInst.canvas._objects
				//crm data

				// elevationFilterKlassInst.searchableData = THAT.crmRentCafeMergeApiData(canvasObjects, APIobjects);

				if (onUpdated) {
					onUpdated()
				}
			},
			onError: function() {
				$("#crm-fail-load-allareas").modal("show")
			}
		})
	}
	crmMergeAllAreaData(elevationName, crmValue, allStoredData, cb) {
		let THAT = this
		if (crmValue === "rentcafe") {
			let setupCredentials = THAT.getCRMparams(crmValue)
			let token = setupCredentials.params.token
			let propertyId = setupCredentials.params.propertyId
			let apiURL = "https://api.rentcafe.com/rentcafeapi.aspx?requestType=apartmentavailability"
			apiURL += "&apiToken=" + token
			apiURL += "&propertyId=" + propertyId
			if (!THAT.crmAtLeastOneApartment(allStoredData)) {
				return
			}
			$.ajax({
				type: "GET",
				url: apiURL,
				dataType: "json",
				success: function(data) {
					if (data.length === 1 && data[0].Error) {
						/*disable front end*/
						if (cb && cb.onError) {
							cb.onError(data[0])
							return
						}
					}
					if (cb && cb.onSuccess) {
						//   cb.onSuccess(data);
						let tempNames = []
						for (let k = 0; k < data.length; k++) {
							tempNames.push(data[k].ApartmentName)
						}

						let searchableData = []
						for (let s = allStoredData.length - 1; s >= 0; --s) {
							if (
								allStoredData[s].RENDERATOR &&
								allStoredData[s].RENDERATOR.dataEntry &&
								allStoredData[s].RENDERATOR.dataEntry.crm &&
								allStoredData[s].RENDERATOR.dataEntry.crm.value &&
								allStoredData[s].RENDERATOR.dataEntry.crm.params.ApartmentName
							) {
								let existInApi = tempNames.indexOf(allStoredData[s].RENDERATOR.dataEntry.crm.params.ApartmentName)
								if (existInApi === -1) {
									/* if apartment does not exist in rentcafe but it is bound here, then hide it*/
									allStoredData[s].visible = false
									allStoredData[s].evented = false
								} else {
									/* if apartment exist, merge data */
									allStoredData[s].visible = true
									allStoredData[s].evented = true
									THAT.matchRentcafeProps(allStoredData[s].RENDERATOR.dataEntry, data[existInApi])
									//  searchableData.push(allStoredData[s]);
									searchableData.push(jQuery.extend(true, {}, allStoredData[s]))
								}
							} else {
								//  searchableData.push(allStoredData[s]);
								searchableData.push(jQuery.extend(true, {}, allStoredData[s]))
							}
						}
						THAT.elevationFilterKlasses[elevationName].searchableData = searchableData
						cb.onSuccess(data)
					}
				},
				error: function(er) {
					if (cb && cb.onError) {
						cb.onError()
					}
				}
			})
		}
	}
	matchRentcafeProps(renderatorDataEntry, rentcafeProps) {
		//FloorplanName,
		//ApartmentName,
		//MinimumRent,
		//AvailableDate
		//SQFT
		//UnitImageURLs
		renderatorDataEntry.appartmentName = rentcafeProps.ApartmentName

		if (rentcafeProps.FloorplanName) {
			if (
				this.Model.adminOptions.layout
					.map(function(e) {
						return e.name
					})
					.indexOf(rentcafeProps.FloorplanName) === -1
			) {
				this.Model.adminOptions.layout.push({ name: rentcafeProps.FloorplanName })
			}
			renderatorDataEntry.layout = rentcafeProps.FloorplanName
		}
		if (rentcafeProps.MinimumRent > -1) {
			let valueWithoutComma = rentcafeProps.MinimumRent.replace(/\,/g, "")
				.replace(/\$/g, "")
				.replace(/[^0-9.]/g, "")
				.replace(/\.\.+/g, ".")
			if (renderatorDataEntry.price !== "" && $.isNumeric(valueWithoutComma)) {
				let inputValue = parseFloat(valueWithoutComma).toLocaleString()
				renderatorDataEntry.price = inputValue.replace(/\./g, ",") + "$"
			}
		}
		if (rentcafeProps.SQFT) {
			renderatorDataEntry.sqrFoot = rentcafeProps.SQFT
		}
		let todayD = new Date()
		if (new Date(rentcafeProps.AvailableDate) > todayD) {
			renderatorDataEntry.availability = false
		} else {
			renderatorDataEntry.availability = true
		}
		if (rentcafeProps.UnitImageURLs && rentcafeProps.UnitImageURLs.length === 1 && rentcafeProps.UnitImageURLs[0]) {
			if (renderatorDataEntry.renderGallery.files.length === 0) {
				renderatorDataEntry.renderGallery.url = rentcafeProps.UnitImageURLs[0]
			} else {
				renderatorDataEntry.renderGallery.url = null
			}
		}
		return renderatorDataEntry
	}

	/* rentcafe case */
	rentcafeGetApartmentData(token, propertyId, apartmentName, cb) {
		let compToken = token
		let propId = propertyId
		let apiURL = "https://api.rentcafe.com/rentcafeapi.aspx?requestType=apartmentavailability"
		apiURL += "&apiToken=" + compToken
		apiURL += "&propertyId=" + propId
		apiURL += "&ApartmentName=" + apartmentName
		$.ajax({
			type: "GET",
			url: apiURL,
			dataType: "json",
			success: function(data) {
				if (data.length === 1 && data[0].Error) {
					if (cb && cb.onError) {
						cb.onError(data[0])
						return
					}
				}
				if (cb && cb.onSuccess) {
					cb.onSuccess(data[0])
				}
			},
			error: function(er) {
				if (cb && cb.onError) {
					cb.onError()
				}
			}
		})
	}
	rentcafeGetAppartmentFloorplan(compToken, propId, apartmentFloorplanId, cb) {
		let apiURL = "https://api.rentcafe.com/rentcafeapi.aspx?requestType=floorplan"
		apiURL += "&apiToken=" + compToken
		apiURL += "&propertyId=" + propId
		let getPlanById = function(floorplanList) {
			for (let p = 0; p < floorplanList.length; p++) {
				if (floorplanList[p].FloorplanId === apartmentFloorplanId) {
					return floorplanList[p].FloorplanImageURL
				}
			}
			return false
		}
		$.ajax({
			type: "GET",
			url: apiURL,
			dataType: "json",
			success: function(data) {
				if (data.length === 1 && data[0].Error) {
					if (cb && cb.onError) {
						cb.onError(data[0])
						return
					}
				}
				let img = getPlanById(data)
				if (cb && cb.onSuccess) {
					cb.onSuccess(img)
				}
			},
			error: function(er) {
				if (cb && cb.onError) {
					cb.onError()
				}
			}
		})
	}
	/* crm end */
}

class ElevationKlass {
	constructor(canvas) {
		this.defaults = {
			canvas: null,
			activeArea: null,
			transforms: {
				zoom: 1,
				pan: {
					x: 0,
					y: 0
				}
			},
			areaStyles: {
				/* if no filter is active or filter is active but did not found, unfiltered style applies */
				available: {
					fabricStyle: {
						fill: "rgba(73,255,0, 0.7)",
						borderColor: "rgba(73,255,0, 1)",
						strokeWidth: 0,
						stroke: "rgba(0,0,0, 1)"
					}
				},
				notAvailable: {
					fabricStyle: {
						fill: "rgba(255, 0, 0, 0.6)",
						borderColor: "rgba(255, 0, 0, 1)",
						strokeWidth: 0,
						stroke: "rgba(0,0,0, 1)"
					}
				},
				appartment: {
					unfiltered: {
						fabricStyle: {
							fill: "rgba(91, 45, 195, 0)",
							borderColor: "rgba(91, 45, 195, 0)",
							strokeWidth: 0
						}
					},
					filtered: {
						fabricStyle: {
							fill: "rgba(91, 45, 195, 0.7)",
							borderColor: "rgba(91, 45, 195, 1)",
							strokeWidth: 0
						}
					}
				},
				amenity: {
					unfiltered: {
						fabricStyle: {
							fill: "rgba(255, 165, 0, 0)",
							borderColor: "rgba(255, 165, 0, 0)",
							strokeWidth: 0
						}
					},
					filtered: {
						fabricStyle: {
							fill: "rgba(255, 165, 0, 0.7)",
							borderColor: "rgba(255, 165, 0, 1)",
							strokeWidth: 0
						}
					}
				},
				commercial: {
					unfiltered: {
						fabricStyle: {
							fill: "rgba(91, 45, 195, 0)",
							borderColor: "rgba(91, 45, 195, 0)",
							strokeWidth: 0
						}
					},
					filtered: {
						fabricStyle: {
							fill: "rgba(91, 45, 195, 0.7)",
							borderColor: "rgba(91, 45, 195, 1)",
							strokeWidth: 0
						}
					}
				}
			},
			transformSettings: {
				zoom: {
					zoomStep: 0.1,
					initial: 1,
					max: 2,
					min: 0.1
				},
				pan: {
					x: {
						initial: 1,
						max: 2,
						min: 0
					},
					y: {
						initial: 1,
						max: 2,
						min: 0.1
					}
				}
			}
		}
		this.deviceController = {
			isMouseInUse: false,
			isTouchInUse: false,
			lastCheckTM: null,
			isTouch: function() {
				if (this.isTouchInUse && !this.isMouseInUse) {
					return true
				}
				return false
			},
			isMouse: function() {
				if (!this.isTouchInUse && this.isMouseInUse) {
					return true
				}
				return false
			},
			chooseDevice: function(prop) {
				if (!this.isMouseInUse && !this.isTouchInUse) {
					this[prop] = true
				}
			},
			resetCheck: function() {
				;(this.isMouseInUse = false), (this.isTouchInUse = false)
			}
		}
		this.transforms = this.defaults.transforms
		this.transformSettings = this.defaults.transformSettings
		this.deselectRoom = false
	}
	initElevationCanvas(canvasDomId) {
		let canvasDom = document.getElementById(canvasDomId)
		let canvasArea = canvasDom.parentNode
		let newFabricCanvas = new fabric.Canvas(canvasDomId, {
			renderOnAddRemove: false,
			stateful: false,
			selection: false,
			targetFindTolerance: 2
		})
		newFabricCanvas.width = screen.availWidth
		newFabricCanvas.height = screen.availHeight
		this.canvas = newFabricCanvas
		return newFabricCanvas
	}
	responsiveElevationCanvas(canvas, responsiveDimensions) {
		let canvasArea = canvas.wrapperEl.parentNode
		canvas.wrapperEl.style.visibility = "hidden"
		canvasArea.style.display = "block"
		canvasArea.style.position = "static"
		canvasArea.style.width = "100%"

		canvasArea.style.position = "absolute"
		canvasArea.style.left = "0"
		canvasArea.style.right = "0"
		canvasArea.style.top = "0"
		canvasArea.style.bottom = "0"
		//canvasArea.style.top = '50%';
		//canvasArea.style.transform = 'translateY(-50%)';
		canvasArea.style.maxWidth = "100%"
		canvasArea.style.maxHeight = "100%"

		canvas.wrapperEl.style.visibility = "visible"
		canvas.wrapperEl.parentNode.style.overflow = "hidden"
	}

	canvasRender(canvas) {
		canvas.requestRenderAll()
	}

	/* this 5 events are set from FRONT_END Klass
	 *  They are usefull for the things out of the canvas like dialogs, rendergalleries etc
	 */
	onMouseOverArea() {}
	onMouseNoArea() {}
	onClickOverArea() {}
	onClearSelection() {}
	onClickSomewhere() {}

	_getUnfilteredStyleBasedOnAreaType(fabricObj) {
		let THAT = this
		let areaType = fabricObj.RENDERATOR.dataEntry.areaType
		if (areaType === "appartment") {
			return THAT.defaults.areaStyles["appartment"].unfiltered.fabricStyle
		} else if (areaType === "common") {
			return THAT.defaults.areaStyles["amenity"].unfiltered.fabricStyle
		} else if (areaType === "commercial") {
			return THAT.defaults.areaStyles["commercial"].unfiltered.fabricStyle
		}
	}
	_getFilteredStyleBasedOnAreaType(fabricObj) {
		let THAT = this
		let areaType = fabricObj.RENDERATOR.dataEntry.areaType
		if (areaType === "appartment") {
			return THAT.defaults.areaStyles["appartment"].filtered.fabricStyle
		} else if (areaType === "common") {
			return THAT.defaults.areaStyles["amenity"].filtered.fabricStyle
		} else if (areaType === "commercial") {
			return THAT.defaults.areaStyles["commercial"].filtered.fabricStyle
		}
	}
	updateAllAreasEvents(events) {
		let THAT = this
		this.parseCanvasAreas(function(fabricObj) {
			THAT.updateAreaEvents(fabricObj, events)
		})
		this.canvasRender(this.canvas)
	}
	updateAllAreasDefaultStyle() {
		let THAT = this
		this.parseCanvasAreas(function(fabricObj) {
			fabricObj.rend_applyDefaultStyle(fabricObj)
		})
		this.canvasRender(this.canvas)
	}
	updateAreaEvents(fabricObj, events) {
		let THAT = this
		fabricObj.rend_applyDefaultStyle =
			events.rend_applyDefaultStyle ||
			function(fabricObj) {
				if (fabricObj.lastSearch) {
					if (!fabricObj.lastSearch.filtered) {
						fabricObj.set(THAT._getUnfilteredStyleBasedOnAreaType(fabricObj))
						fabricObj.set({ evented: false })
					} else if (fabricObj.lastSearch.filtered) {
						fabricObj.set(THAT._getFilteredStyleBasedOnAreaType(fabricObj))
						fabricObj.set({ evented: true })
					}
				} else {
					/* default is without active filters */
					fabricObj.set(THAT._getUnfilteredStyleBasedOnAreaType(fabricObj))
					fabricObj.set({ evented: true })
				}
			}
		fabricObj.rend_onMouseOutArea =
			events.rend_onMouseOutArea ||
			function(fabricObj) {
				// if (fabricObj.canvas.getActiveObject()===fabricObj) {
				if (fabricObj.rend_SELECTED) {
					return
				}
				if (fabricObj.lastSearch) {
					if (!fabricObj.lastSearch.filtered) {
						fabricObj.set(THAT._getUnfilteredStyleBasedOnAreaType(fabricObj))
					} else if (fabricObj.lastSearch.filtered) {
						//if (fabricObj.canvas.getActiveObject()) {
						if (THAT.FABRIC_OBJ_SELECTED) {
							fabricObj.set(THAT._getUnfilteredStyleBasedOnAreaType(fabricObj))
						} else {
							fabricObj.set(THAT._getFilteredStyleBasedOnAreaType(fabricObj))
						}
					}
				} else {
					/* default is without active filters */
					fabricObj.set(THAT._getUnfilteredStyleBasedOnAreaType(fabricObj))
				}
			}
		fabricObj.rend_onMouseOverArea =
			events.rend_onMouseOverArea ||
			function(fabricObj) {
				// if (fabricObj.canvas.getActiveObject() === fabricObj) {
				if (fabricObj.rend_SELECTED) {
					return
				}
				if (fabricObj.RENDERATOR.dataEntry.areaType === "appartment" || fabricObj.RENDERATOR.dataEntry.areaType === "commercial") {
					fabricObj.set(THAT.defaults.areaStyles["appartment"].filtered.fabricStyle)
					/* show color based on availability */
					if (fabricObj.RENDERATOR.dataEntry.availability === "false" || fabricObj.RENDERATOR.dataEntry.availability === false) {
						fabricObj.set(THAT.defaults.areaStyles["notAvailable"].fabricStyle)
					} else if (fabricObj.RENDERATOR.dataEntry.availability === "true" || fabricObj.RENDERATOR.dataEntry.availability === true) {
						fabricObj.set(THAT.defaults.areaStyles["available"].fabricStyle)
					}
				} else if (fabricObj.RENDERATOR.dataEntry.areaType === "common") {
					fabricObj.set(THAT.defaults.areaStyles["amenity"].filtered.fabricStyle)
				}
			}
		fabricObj.rend_onClickOverArea =
			events.rend_onClickOverArea ||
			function(fabricObj) {
				/* always visible no matter the filter */
				fabricObj.set(THAT._getFilteredStyleBasedOnAreaType(fabricObj))
			}
		/*called to deactivate object in canvas */
		fabricObj.rend_onDeselectArea =
			events.rend_onDeselectArea ||
			function(fabricObj) {
				/* always invisible no matter the active filters */
				fabricObj.set(THAT._getUnfilteredStyleBasedOnAreaType(fabricObj))
				fabricObj.rend_onMouseOutArea(fabricObj)
			}
	}

	zoomBasedOnBackgroundSize(canvas) {
		let transforms = this.transforms
		let transformSettings = this.transformSettings
		let THAT = this
		let newBgWidth, newBgHeight
		let bg = canvas.backgroundImage
		let imgW = bg.width
		let imgH = bg.height
		let viewPort = $(canvas.wrapperEl.parentNode)
		let vW = viewPort.width()
		let vH = viewPort.height()
		let headerH =
			viewPort
				.parent()
				.find(".filter-elevation-header-component")
				.outerHeight() || 0
		let cardinalH = $(".cardinals-component").outerHeight() || 0
		vH = vH - (headerH + cardinalH)
		vW = vW - 30 /* some padding */

		if (vH <= 0 || vW <= 0) {
			return
		}

		let bgAspect = imgW / imgH

		let viewPortAspect = vW / vH
		let resizeBasedOnViewPort = vW

		let newZoomZ
		newBgWidth = vW
		newBgHeight = vW / bgAspect
		newZoomZ = newBgWidth / imgW
		if (newBgHeight >= vH) {
			newBgHeight = vH
			newBgWidth = bgAspect * vH
			newZoomZ = newBgHeight / imgH
		}

		let newZoomWithoutStep = newZoomZ

		let remainder = newZoomZ % transformSettings.zoom.zoomStep

		if (remainder === 0) {
			newZoomZ = newZoomZ
		} else {
			newZoomZ = newZoomZ + Math.abs(transformSettings.zoom.zoomStep - remainder)
		}

		newZoomZ = newZoomWithoutStep
		this.transforms.zoom = newZoomZ // - 0.05;/* 0.05 is to just not make it to fit exactly */
		this.transformSettings.zoom.min = newZoomZ

		let lowScale = transforms.zoom - transformSettings.zoom.zoomStep / 4
		this.transformSettings.zoom.min = lowScale > 0.1 ? lowScale : 0.1

		THAT.setElevationCanvasZoom(canvas, newZoomWithoutStep)
		THAT.panBuildingOnVP(canvas)
	}
	panBuildingOnVP(canvas) {
		let parentEl = $(canvas.wrapperEl.parentNode)
		let viewPort = {
			l: 0,
			t: 0,
			w: parentEl.width(),
			h: parentEl.height()
		}
		let lt = fabric.util.transformPoint({ x: 0, y: 0 }, canvas.viewportTransform)
		let wh = fabric.util.transformPoint({ x: canvas.backgroundImage.width, y: canvas.backgroundImage.height }, canvas.viewportTransform)
		let buildingVP = {
			l: lt.x,
			t: lt.y,
			w: wh.x,
			h: wh.y
		}

		let leftPadding = 15
		let buildingVP_HEIGHT = Math.abs(buildingVP.t - buildingVP.h)
		let panCoords = {
			l: leftPadding + (viewPort.l - buildingVP.l),
			t: (viewPort.h - buildingVP_HEIGHT) / 2 - buildingVP.t
		}

		let delta = new fabric.Point(panCoords.l, panCoords.t)
		canvas.relativePan(delta)
		this.canvasRender(canvas)
	}
	canvasScrollToCenter(canvas) {
		let THAT = this
		let cX = canvas.width / 2
		let cy = canvas.height / 2
		let scrollNegative = $(canvas.wrapperEl.parentNode)[0].scrollLeft >= 0 ? false : true
		$(canvas.wrapperEl.parentNode).scrollTop((canvas.height - $(canvas.wrapperEl.parentNode).height()) / 2)
		if (!scrollNegative) {
			$(canvas.wrapperEl.parentNode).scrollLeft((canvas.width - $(canvas.wrapperEl.parentNode).width()) / 2)
		} else {
			$(canvas.wrapperEl.parentNode).scrollLeft((-1 * (canvas.width - $(canvas.wrapperEl.parentNode).width())) / 2)
		}
	}
	setElevationCanvasZoom(canvas, zoom, zoomPoint) {
		let THAT = this
		if (zoom > THAT.transformSettings.zoom.max) {
			zoom = THAT.transformSettings.zoom.max
		} else if (zoom < THAT.transformSettings.zoom.min) {
			zoom = THAT.transformSettings.zoom.min
		}
		THAT.transforms.zoom = zoom
		if (!zoomPoint) {
			zoomPoint = {
				x: canvas.backgroundImage.width / 2,
				y: canvas.backgroundImage.height / 2
			}
		}
		canvas.zoomToPoint(new fabric.Point(zoomPoint.x, zoomPoint.y), zoom)
		this.canvasRender(canvas)
	}
	parseCanvasAreas(callback, breakIfCondition) {
		let areas = this.canvas.getObjects()
		let fabricObj
		let result
		let len = areas.length
		for (let m = len - 1; m >= 0; m--) {
			if (callback) {
				result = callback(areas[m], m)
			}
			if (breakIfCondition && typeof result !== "undefined") {
				return result
			}
		}
	}

	lockCanvasAreas(canvas) {
		this.parseCanvasAreas(function(fabricObj) {
			fabricObj.set({
				lockMovementX: true,
				lockMovementY: true,
				lockScalingX: true,
				lockScalingY: true,
				hasBorders: false,
				hasCorners: false,
				hasControls: false,
				hoverCursor: "pointer",
				selectable: true,
				fill: "cyan"
			})
		})
	}
	deactivateAllCanvasObjects(canvas) {
		let THAT = this
		this.parseCanvasAreas(function(fabricObj) {
			fabricObj.rend_SELECTED = false
			if (fabricObj.rend_onDeselectArea) {
				fabricObj.rend_onDeselectArea(fabricObj)
			}
		})
		this.FABRIC_OBJ_SELECTED = null
		this.unhighlightAllAreasOffPointer(this.canvas)
		THAT.canvasRender(this.canvas)
	}
	activateCanvasObject(canvas, fabricObj) {
		let THAT = this
		//THAT.deselectObjects(canvas, fabricObj);
		THAT.deactivateAllCanvasObjects()
		if (!canvas.getActiveObject()) {
			canvas.setActiveObject(fabricObj)
		}
		this.FABRIC_OBJ_SELECTED = fabricObj
		fabricObj.rend_SELECTED = true
		/*update the colors*/
		if (fabricObj.rend_onClickOverArea) {
			fabricObj.rend_onClickOverArea(fabricObj)
		}
		/*update dialogs and media out of canvas*/
		if (THAT.onClickOverArea) {
			THAT.onClickOverArea(fabricObj)
		}

		this.unhighlightAllAreasOffPointer(canvas)
		this.canvasRender(canvas)
	}

	/* Maths */
	getShapeClosestPoint(fabricObj) {
		let shapeType = fabricObj.get("type")
		let maxX = 0
		let maxY = 0
		let key = 0
		if (shapeType === "rect") {
			maxX = fabricObj.left + fabricObj.width / 2
			maxY = fabricObj.top + fabricObj.height / 2
		} else if (shapeType === "polygon") {
			let points = fabricObj.points
			let pointsLen = points.length
			for (let m = 0; m < pointsLen; m++) {
				if (points[m].x >= maxX) {
					maxX = points[m].x
					key = m
				}
			}
			return { x: points[key].x - 15, y: points[key].y }
		}
		return { x: maxX, y: maxY }
	}
	findTargetShape(canvas, x, y) {
		let THAT = this
		let areas = canvas.getObjects()
		let targetShape = null
		for (let m = 0; m < areas.length; m++) {
			/* check if is polygon */
			if (areas[m].RENDERATOR && areas[m].RENDERATOR.type === "dynamicPolygon") {
				let vs = THAT.polygonPointsToArray(areas[m].points)
				if (THAT.isPointInPolygon([x, y], vs)) {
					targetShape = areas[m]
					return targetShape
				}
				/* check if is rectangle */
			} else if (areas[m].RENDERATOR && areas[m].RENDERATOR.type === "dynamicRectangle") {
				let point = new fabric.Point(x, y)
				if (x > areas[m].left && x < areas[m].left + areas[m].width && y > areas[m].top && y < areas[m].top + areas[m].height) {
					targetShape = areas[m]
					return targetShape
				}
			}
		}
		return targetShape
	}

	polygonPointsToArray(POINTS) {
		let newPoints = []
		for (let p = 0; p < POINTS.length; p++) {
			newPoints.push([POINTS[p].x, POINTS[p].y])
		}
		return newPoints
	}

	isPointInPolygon(point, vs) {
		var x = point[0],
			y = point[1]
		var inside = false
		for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
			var xi = vs[i][0],
				yi = vs[i][1]
			var xj = vs[j][0],
				yj = vs[j][1]

			var intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
			if (intersect) inside = !inside
		}
		return inside
	}

	selectAreaOnPointer(canvas, pointer) {
		let THAT = this
		let targetShape = THAT.findTargetShape(canvas, pointer.x, pointer.y)
		if (targetShape && targetShape.evented) {
			THAT.activateCanvasObject(canvas, targetShape)
		} else {
			canvas.trigger("selection:cleared")
		}
		THAT.canvasRender(canvas)
	}
	unhighlightAreaOffPointer(canvasArea) {
		//canvasArea.AREA_STYLE.MOUSE_OUT(canvasArea);
		if (canvasArea.rend_onMouseOutArea) {
			canvasArea.rend_onMouseOutArea(canvasArea)
		}
	}

	unhighlightAllAreasOffPointer(canvas) {
		let THAT = this
		let areas = canvas.getObjects()
		for (let m = 0; m < areas.length; m++) {
			THAT.unhighlightAreaOffPointer(areas[m])
		}
		THAT.canvasRender(canvas)
	}

	highlightAreaOnPointer(canvas, pointer) {
		let THAT = this
		let areas = canvas.getObjects()

		let targetHovered = null
		for (let m = 0; m < areas.length; m++) {
			let shapeHovered = null

			areas[m].set({ hoverCursor: "default" })

			if (areas[m].RENDERATOR && areas[m].RENDERATOR.type === "dynamicPolygon" && areas[m].evented) {
				let vs = THAT.polygonPointsToArray(areas[m].points)
				if (THAT.isPointInPolygon([pointer.x, pointer.y], vs)) {
					shapeHovered = areas[m]
					targetHovered = shapeHovered
				}
			} else if (areas[m].RENDERATOR && areas[m].RENDERATOR.type === "dynamicRectangle" && areas[m].evented) {
				let point = new fabric.Point(pointer.x, pointer.y)
				if (pointer.x > areas[m].left && pointer.x < areas[m].left + areas[m].width && pointer.y > areas[m].top && pointer.y < areas[m].top + areas[m].height) {
					shapeHovered = areas[m]
					targetHovered = shapeHovered
				}
			}

			if (shapeHovered && shapeHovered.evented) {
				shapeHovered.set({ hoverCursor: "pointer" })
				if (THAT.onMouseOverArea) {
					THAT.onMouseOverArea(shapeHovered)
				}
				if (shapeHovered.rend_onMouseOverArea) {
					shapeHovered.rend_onMouseOverArea(shapeHovered)
				}
			} else {
				// ## THAT.unhighlightAreaOffPointer(areas[m]);
				if (areas[m].rend_onMouseOutArea) {
					areas[m].rend_onMouseOutArea(areas[m])
				}
			}
		}
		if (!targetHovered || (targetHovered && !targetHovered.evented)) {
			if (THAT.onMouseNoArea) {
				THAT.onMouseNoArea()
			}
		}
		THAT.canvasRender(canvas)
	}

	buildingisOutOfViewPort(canvas, padding) {
		let parentEl = $(canvas.wrapperEl.parentNode)
		let viewPort = {
			l: 0,
			t: 0,
			w: parentEl.width(),
			h: parentEl.height()
		}
		let lt = fabric.util.transformPoint({ x: 0, y: 0 }, canvas.viewportTransform)
		let wh = fabric.util.transformPoint({ x: canvas.backgroundImage.width, y: canvas.backgroundImage.height }, canvas.viewportTransform)
		let buildingVP = {
			l: lt.x,
			t: lt.y,
			w: wh.x,
			h: wh.y
		}
		if (
			viewPort.l > buildingVP.w - padding.left ||
			buildingVP.l > viewPort.w - padding.right ||
			buildingVP.h < viewPort.t + padding.top ||
			buildingVP.t > viewPort.h - padding.bottom
		) {
			return {
				l: buildingVP.w - padding.left,
				r: viewPort.w - padding.right,
				t: viewPort.h - padding.bottom,
				b: viewPort.t + padding.top
			}
		} else {
			return false
		}
	}
	initElevationDeviceEvents(canvas) {
		this.initElevationCanvasMobileEvents(canvas)
		this.initElevationCanvasDesktopEvents(canvas)
	}
	initElevationCanvasDesktopEvents(canvas) {
		let THAT = this
		let pointer = null
		let padding = {
			left: 100,
			right: 100,
			top: 300,
			bottom: 300
		}

		$(canvas.wrapperEl).on("mouseout", function(ev) {
			THAT.deviceController.chooseDevice("isMouseInUse")
			if (THAT.deviceController.isMouse() === false) {
				return
			}

			THAT.unhighlightAllAreasOffPointer(canvas)
		})

		canvas.on("mouse:move", function(ev) {
			if (THAT.canvasIsPanning) {
				return
			}
			let pointer

			try {
				pointer = canvas.getPointer(ev.e)
			} catch (err) {
				return
			}
			THAT.highlightAreaOnPointer(canvas, pointer)
		})

		canvas.on("mouse:wheel", function(opt) {
			var delta = opt.e.deltaY
			var zoom = canvas.getZoom()
			zoom = zoom + delta / 3000

			let zoomPoint = {
				x: canvas.backgroundImage.width / 2,
				y: canvas.backgroundImage.height / 2
			}
			pointer = fabric.util.transformPoint(zoomPoint, canvas.viewportTransform)

			THAT.setElevationCanvasZoom(canvas, zoom, pointer)
			opt.e.preventDefault()
			opt.e.stopPropagation()

			if (THAT.buildingisOutOfViewPort(canvas, padding)) {
				THAT.setElevationCanvasZoom(canvas, zoom - delta / 3000, pointer)
			}
		})

		THAT.MOUSE_IS_UP = false
		THAT.MOUSE_IS_DOWN = false
		canvas.on("mouse:down", function(e) {
			THAT.MOUSE_IS_UP = false
			THAT.MOUSE_IS_DOWN = true
		})
		canvas.on("mouse:up", function(e) {
			THAT.MOUSE_IS_UP = true
			THAT.MOUSE_IS_DOWN = false
		})

		canvas.on("selection:cleared", function(e) {
			setTimeout(() => {
				window.deselectRoom = true
			}, 100)

			setTimeout(function() {
				if (THAT.MOUSE_IS_DOWN && !THAT.MOUSE_IS_UP) {
					return
				}
				THAT.onClearSelection()
				THAT.deactivateAllCanvasObjects()
			}, 80)
		})
	}
	destroyElevationCanvasDesktopEvents(canvas) {
		canvas.off()
		$(canvas.wrapperEl).off()
	}
	/* mobile hammer events */
	initElevationCanvasMobileEvents(canvas) {
		let THAT = this
		let padding = {
			left: 100,
			right: 100,
			top: 300,
			bottom: 300
		}

		if ($(canvas.wrapperEl).data("hammerInstance")) {
			return
		}
		let hammertime
		hammertime = new Hammer(canvas.wrapperEl)
		$(canvas.wrapperEl).data("hammerInstance", hammertime)
		hammertime.get("pinch").set({ enable: true })

		let p0
		hammertime.on("pinch", function(ev) {
			let delta = ev.scale
			let zoom = p0 * delta

			let zoomPoint = {
				x: canvas.backgroundImage.width / 2,
				y: canvas.backgroundImage.height / 2
			}
			let pointer = fabric.util.transformPoint(zoomPoint, canvas.viewportTransform)

			THAT.setElevationCanvasZoom(canvas, zoom, pointer)
			//if ( THAT.buildingisOutOfViewPort(canvas, padding) ) {
			// THAT.setElevationCanvasZoom(canvas, p0, ModelElevation, pointer);
			// }
		})
		hammertime.on("pinchstart", function(ev) {
			p0 = canvas.getZoom()
		})
		hammertime.on("pinchend", function(ev) {
			p0 = canvas.getZoom()
		})

		let x0 = 0
		let y0 = 0
		let previousPan = {
			x: 0,
			y: 0,
			direction: {
				x: 1,
				y: 1
			},
			delta: { x: 0, y: 0 }
		}
		hammertime.on("pan", function(ev) {
			THAT.canvasIsPanning = true
			let panMove = function(event) {
				let x = event.deltaX
				let y = event.deltaY
				let delta = new fabric.Point(x - x0, y - y0)

				canvas.relativePan(delta)
				x0 = x
				y0 = y

				let parentEl = $(canvas.wrapperEl.parentNode)
				let viewPort = {
					l: 0,
					t: 0,
					w: parentEl.width(),
					h: parentEl.height()
				}

				var canvasViewPort = canvas.viewportTransform
				let w = canvas.backgroundImage.width * canvasViewPort[0]
				let h = canvas.backgroundImage.height * canvasViewPort[0]
				let percW = w * 0.2
				let percH = h * 0.2
				let buildingEdges = {
					l: canvas.viewportTransform[4],
					r: canvas.viewportTransform[4] + w,
					t: canvas.viewportTransform[5],
					b: canvas.viewportTransform[5] + h
				}
				let percentPaddings = {
					l: percW < 100 ? 100 : percW,
					t: percH < 100 ? 100 : percH
				}

				if (buildingEdges.r < percentPaddings.l) {
					canvas.viewportTransform[4] = percentPaddings.l - w
				}
				if (buildingEdges.l > viewPort.w - percentPaddings.l) {
					canvas.viewportTransform[4] = viewPort.w - percentPaddings.l
				}
				if (buildingEdges.t < percentPaddings.t - h) {
					canvas.viewportTransform[5] = percentPaddings.t - h
				}
				if (buildingEdges.t > viewPort.h - percentPaddings.t) {
					canvas.viewportTransform[5] = viewPort.h - percentPaddings.t
				}
				THAT.canvasRender(canvas)
				previousPan.x = x - x0
				previousPan.y = y - y0
				previousPan.delta = delta
				previousPan.direction.x = previousPan.x > 0 ? 1 : -1
				previousPan.direction.y = previousPan.y > 0 ? 1 : -1
			}
			panMove(ev)
		})
		hammertime.on("panstart", function(ev) {
			THAT.canvasIsPanning = true
			x0 = ev.deltaX
			y0 = ev.deltaY
		})
		hammertime.on("panend", function(ev) {
			THAT.canvasIsPanning = false
		})

		hammertime.on("tap doubletap", function(ev) {
			let pointer = canvas.getPointer(ev.srcEvent)
			THAT.selectAreaOnPointer(canvas, pointer)
		})
	}
}



class CustomElevationFilterKlass {
    constructor() {
        this.filterMenuOpen = true;
        this.searchableData = null;
        this.filters = null;
        this.actives = [];
        this.filterMenuParentDom = null;
        this.lastSearch = {
            tm: null,
            numResults: 0
        };
        this.VUE_COMPONENTS = {
            header: null,
            filterMenu:  null
        }
    }
    init(elevationDiv) {
        this.filterMenuParentDom = elevationDiv;
        let THAT = this;
        /* init  2 vue components for: header tags and filter sections */
        this.VUE_COMPONENTS.filterMenu = new Vue({
            el: elevationDiv.find('.filter-menu-component')[0],
            data: function() {
                return {
                    filterklass_inst: THAT,
                    //filterklass_filters: THAT.filters,
					filterklass_lastsearch: THAT.lastSearch
                }
			},
			components: {
				'vueSlider': 'vue-slider-component'
			}
        });
        this.VUE_COMPONENTS.header = new Vue({
            el: elevationDiv.find('.filter-elevation-header-component')[0],
            data: function() {
                return {
                    filterklass_inst: THAT,
                    filterklass_actives: THAT.actives
                }
            }
        });

        this.onApplyFilters = function(af) {
            THAT.actives = af;
        }

    }
    /* methods for open/close/toggle filter menu */
    updateFiltersMenuPosition() {
        let menuDOM = this.filterMenuParentDom.find('.filter-menu-component').eq(0);
        let w = menuDOM.width()+2;
        menuDOM.css('right', (-1)*w + 'px');
    }
    closeFiltersMenu() {
        let menuDOM = this.filterMenuParentDom.find('.filter-menu-component').eq(0);
        this.updateFiltersMenuPosition();
        menuDOM.addClass('filter-menu-closed');
        if (this.onFiltersMenuClose) {
            this.onFiltersMenuClose(this);
        }
    }
    openFiltersMenu() {
        let menuDOM = this.filterMenuParentDom.find('.filter-menu-component').eq(0);
        menuDOM.css('right', '0');
        menuDOM.removeClass('filter-menu-closed');
        if (this.onFiltersMenuOpen) {
            this.onFiltersMenuOpen(this);
        }
    }
    toggleFiltersMenu() {
        let menuDOM = this.filterMenuParentDom.find('.filter-menu-component').eq(0);
        if (menuDOM.hasClass('filter-menu-closed')) {
            this.openFiltersMenu();
        } else {
            this.closeFiltersMenu();
        }
    }


    /* methods for searching data */
    searchFilter(prop, storedValue, pattern) {
        if (!pattern) {return;}
        if (prop === 'appartmentName') {
            let string = storedValue;
            if (string.indexOf(pattern) !== -1 || string.indexOf(pattern.toUpperCase()) !== -1 ) {
                return true;
            }
            let patt = new RegExp(pattern, "i");
            if (patt.test(string)) {
                return true;
            }
        }
        return false;
    }
    matchFilterPropWithAreaProp(prop) {
        let areaData = {
            areaType: null,
            appartmentName: null,
            orientation: null,
            floor: null,
            price: null,
            priceTerm: null,
            availability: true,
            layout: null,
            agent: null,
            virtualTour: null,
            renderGallery: { url: null, files: []},
            floorPlan: { url: null, files: []},
            amenity: null,
            sqrFoot: null,
            promotions: null,
            optionals: null,
            finishes: null,
            appliances: null,
            cornerWith: false,
            cornerWith_UNIQUE_ID: null,
            cornerConfirmed: false,
            choosenMedia: null
        };
        if (areaData.hasOwnProperty(prop)) {
            return prop;
        }
        if (areaData.hasOwnProperty(prop+'s')) {
            return prop+'s';
        }
        if (prop[prop.length-1]==='s' && areaData.hasOwnProperty(prop.substring(0, prop.length - 1))) {
            return prop.substring(0, prop.length - 1);
        }
        return prop;
    }
    matchAreaDataWithFilterProp(areaDataProp) {
        let filtersToAreaDataProps = {
            'availability': 'availability' ,
            'layout': 'layouts' ,
            'price': 'price' ,
            'finishes': 'finishes' ,
            'optionals': 'optionals' ,
            'agent': 'agent' ,
            'appartmentName': 'appartmentName',
            'orientation': 'orientation',
            'sqrFoot': 'sqrFoot'
        };
        if (filtersToAreaDataProps.hasOwnProperty(areaDataProp)) {
            return filtersToAreaDataProps[areaDataProp];
        }
        return areaDataProp;
    }
    string2literal(value) {
        var maps = {
            "true": true,
            "false": false,
            "NaN": NaN,
            "null": null,
            "undefined": undefined,
            "Infinity": Infinity,
            "-Infinity": -Infinity
        }
        return ((value in maps) ? maps[value] : value);
    }
    isAreaDataMatchFilter(areaData, filterObj) {
        let objValue;
        let value = filterObj.filterValue;
        let prop = this.matchFilterPropWithAreaProp(filterObj.propName);
        if ( prop === 'price' || prop === 'sqrFoot') {
            /* if both min and max are selected */
            if (this.string2literal(filterObj.rangeValue.min) && this.string2literal(filterObj.rangeValue.max)) {
                if (
                    this.formatPriceEntry(areaData.RENDERATOR.dataEntry[prop]) >= parseFloat(filterObj.rangeValue.min,10)
                    &&
                    this.formatPriceEntry(areaData.RENDERATOR.dataEntry[prop]) <= parseFloat(filterObj.rangeValue.max,10)
                ) {
                    return true;
                }
            }
            else
                /* if min OR max is selected but not both */
            if ( this.string2literal(filterObj.rangeValue.min)||this.string2literal(filterObj.rangeValue.max) ) {
                if (
                    ( filterObj.rangeValue.min && this.formatPriceEntry(areaData.RENDERATOR.dataEntry[prop]) >= parseFloat(filterObj.rangeValue.min,10) )
                    ||
                    ( filterObj.rangeValue.max && this.formatPriceEntry(areaData.RENDERATOR.dataEntry[prop]) <= parseFloat(filterObj.rangeValue.max,10) )
                ){
                    return true;
                }
            }
        }  else if (prop === 'availability') {
            if (areaData.RENDERATOR.dataEntry['availability'] !== 'null' && areaData.RENDERATOR.dataEntry['availability'] !== null) {
                objValue = (areaData.RENDERATOR.dataEntry['availability']==='true' || areaData.RENDERATOR.dataEntry['availability']===true);
            } else {
                objValue = null;
            }
            let criterioValue = (value==='true' || value===true);
            if (criterioValue === objValue) {
                return true;
            }
        } else if (prop === 'occupancy') {

            if (value > 0 && areaData.RENDERATOR.dataEntry['sqrFoot']  ) {
                let minSqrFoot = value*100;
                let maxSqrFoot = value*150;
                let sqrFootINT = parseFloat(areaData.RENDERATOR.dataEntry['sqrFoot'], 10);

                if (sqrFootINT >=  minSqrFoot && sqrFootINT <= maxSqrFoot) {
                    return true;
                }

            }

        } else if (areaData.RENDERATOR.dataEntry[prop] === value || this.searchFilter(prop, areaData.RENDERATOR.dataEntry[prop], value) === true) {
            return true;
        }
        return false;
    }
    clearSearchResults(seachableData) {
        if (!seachableData) {
            seachableData = this.searchableData;
        }
        for (let a = 0; a < seachableData.length; a++) {
            seachableData[a].lastSearch = null;
        }
        this.actives = {};

        if (this.onClearSearchResults) {
            this.onClearSearchResults();
        }
    }
    doSearch(seachableData) {
        if (!seachableData) {
            seachableData = this.searchableData;
        }

        // console.log("search able data : ", seachableData);
        this.lastSearch.tm = new Date().getTime();
        let THAT = this;
        let results = [];
        for (let a = 0; a < seachableData.length; a++) {
            let matchWithAll = true;
            for (let f in this.actives) {
                let activeFilterObj = this.actives[f];
                let isMatch = this.isAreaDataMatchFilter(seachableData[a], activeFilterObj);
                if (isMatch === false) {
                    matchWithAll = false;
                    break;
                }
            }
            if (matchWithAll === true) {
                seachableData[a].lastSearch = { tm: THAT.lastSearch.tm, filtered: true };
                results.push(seachableData[a]);
            }	else {
                seachableData[a].lastSearch = { tm: THAT.lastSearch.tm, filtered: false };
            }
        }


        if (this.onDidSearch) {

            this.onDidSearch(this.actives, results);

        }
        this.lastSearch.numResults = results.length;
        this.closeFiltersMenu();
        return results;
    }
    formatPriceEntry(pri) {
        let splitted;
        let price = pri;
        let realPrice;
        if (price && price.split(',').length > 2) {
            splitted = price.replace(/,([^,]*)$/, '.$1');
        } else {
            splitted = price;
        }
        if (price) {
            realPrice = parseFloat(splitted.replace(/,/g, ''));
        } else {
            realPrice = price;
        }
        return realPrice;
    }
    createPriceOptions(seachableData) {
        let THAT = this;
        let uniques = [];
        let priceList = [];
        if (!seachableData) {
            seachableData = this.searchableData;
        }
        if (!this.filters.price || !this.filters.price.filterSettings ) {
            return;
        }
        if (!this.filters.price.filterSettings.pricelist || this.filters.price.filterSettings.pricelist.length === 0) {}
        for (let o = 0; o < seachableData.length; o++) {
            if (seachableData[o].RENDERATOR.dataEntry && seachableData[o].RENDERATOR.dataEntry.price) {
                if (uniques.indexOf(seachableData[o].RENDERATOR.dataEntry.price) === -1) {
                    let splitted;
                    let price = seachableData[o].RENDERATOR.dataEntry.price;
                    if (price.split(',').length > 2) {
                        splitted = price.replace(/,([^,]*)$/, '.$1');
                    } else {
                        splitted = price;
                    }
                    let realPrice = parseFloat(splitted.replace(/,/g, ''));
                    priceList.push({value: realPrice , name: seachableData[o].RENDERATOR.dataEntry.price });
                    uniques.push(seachableData[o].RENDERATOR.dataEntry.price);
                }
            }
        }
        priceList.sort(function (a, b) {  return a.value - b.value ;  });
        if (priceList.length > 0) {
            let stepArray = [];
            let MIN_VALUE = priceList[0].value;
            let MAX_VALUE = priceList[priceList.length - 1].value;
            let DIFFERENCE = MAX_VALUE - MIN_VALUE;
            let step = 500;
            let numOptions = Math.ceil(DIFFERENCE/step);
            let startingFrom = parseInt(MIN_VALUE/step,10)*step;
            for (let n = 0; n < numOptions + 2; n++) {
                stepArray.push({value: startingFrom + n*500, name: startingFrom + n*500 + ' $'});
            }
            //--this.pricelist = stepArray;
            this.filters.price.filterSettings.pricelist = stepArray;
            this.filters.price.filterSettings.minValue = stepArray[0].value;
			this.filters.price.filterSettings.maxValue = stepArray[stepArray.length-1].value;
        }
	}
	
	createSqrFootOptions(seachableData) {
		let THAT = this;
		let uniques = [];
		let sqrFootList = [];
		if (!seachableData) {
			seachableData = this.searchableData;
		}
		if (!this.filters.sqrFoot || !this.filters.sqrFoot.filterSettings ) {
			return;
		}
		if (!this.filters.sqrFoot.filterSettings.sqrFootlist || this.filters.sqrFoot.filterSettings.sqrFootlist.length === 0) {}
		for (let o = 0; o < seachableData.length; o++) {
			if (seachableData[o].RENDERATOR.dataEntry && seachableData[o].RENDERATOR.dataEntry.sqrFoot) {
				if (uniques.indexOf(seachableData[o].RENDERATOR.dataEntry.sqrFoot) === -1) {
					let splitted;
					let sqrFoot = seachableData[o].RENDERATOR.dataEntry.sqrFoot;
					if (sqrFoot.split(',').length > 2) {
						splitted = sqrFoot.replace(/,([^,]*)$/, '.$1');
					} else {
						splitted = sqrFoot;
					}
					let realsqrFoot = parseFloat(splitted.replace(/,/g, ''));
					sqrFootList.push({value: realsqrFoot , name: seachableData[o].RENDERATOR.dataEntry.sqrFoot });
					uniques.push(seachableData[o].RENDERATOR.dataEntry.sqrFoot);
				}
			}
		}
		sqrFootList.sort(function (a, b) {  return a.value - b.value ;  });
		if (sqrFootList.length > 0) {
			let stepArray = [];
			let MIN_VALUE = sqrFootList[0].value;
			let MAX_VALUE = sqrFootList[sqrFootList.length - 1].value;
			let DIFFERENCE = MAX_VALUE - MIN_VALUE;
			let step = 500;
			let numOptions = Math.ceil(DIFFERENCE/step);
			let startingFrom = parseInt(MIN_VALUE/step,10)*step;
			for (let n = 0; n < numOptions + 2; n++) {
				stepArray.push({value: startingFrom + n*500, name: startingFrom + n*500 + ' $'});
			}
			//--this.sqrFootlist = stepArray;
			this.filters.sqrFoot.filterSettings.sqrFootlist = stepArray;
			this.filters.sqrFoot.filterSettings.minValue = stepArray[0].value;
			this.filters.sqrFoot.filterSettings.maxValue = stepArray[stepArray.length-1].value;
		}
	}

    activateFiltersFromSetup(filtersFromSetup) {
        /*
          for (let f in this.filters) {
            if (!filtersFromSetup[f] || !filtersFromSetup[f].active) {
              delete this.filters[f];
            }
          }
        */
        for (let f in filtersFromSetup) {
            if (!this.filters[f] || (this.filters[f] && !filtersFromSetup[f].active)) {
                delete this.filters[f];
            }
        }
    }
    /* methods to create filter objects */
    createFilters(areasArray) {
        let THAT = this;
        // this.actives = {};
        this.filters = {
            'availability': null ,
            'layouts': null ,
            'price': null ,
            'finishes': null ,
            // 'optionals': null ,
            'agent': null ,
            'appartmentName': null,
            'orientation': null,
            'sqrFoot': null,
            'occupancy': null
        };
        for (let p in this.filters) {
            this.filters[p] = this.createFilterObj(p);
            // this.actives[p] = null;
        }
        this.gatherAreaOptions(areasArray);
		this.createPriceOptions();
		
		this.createSqrFootOptions();


        this.filters['occupancy'].defaultValue = '';

        this.filters['appartmentName'].defaultValue = '';
        this.filters['layouts'].filterSettings.options.unshift({ name: 'Any', value: null, checked: true, dontApplyToSearch: true});
        this.filters['finishes'].filterSettings.options.unshift({ name: 'Any', value: null, checked: true, dontApplyToSearch: true });
        this.filters['agent'].filterSettings.options.unshift({ name: 'Any', value: null, checked: true, dontApplyToSearch: true });
        this.filters['orientation'].filterSettings.options.unshift({ name: 'Any', value: null, checked: true, dontApplyToSearch: true });


        this.filters['availability'].filterSettings.options.unshift({ name: false, value: false, checked: false});
        this.filters['availability'].filterSettings.options.unshift({ name: true, value: true, checked: false});
        this.filters['availability'].defaultValue = true;
        this.selectFilterOption('availability', true);

        this.filters['areaType'] = this.createFilterObj('areaType');
        this.filters['areaType'].filterSettings.options.unshift({ name: 'appartment', value: 'appartment', checked: true});
        this.filters['areaType'].filterSettings.options.unshift({ name: 'amenity', value: 'common', checked: false});
        this.filters['areaType'].filterSettings.options.unshift({ name: 'commercial', value: 'commercial', checked: false});
        this.filters['areaType'].defaultValue = 'appartment';
        this.selectFilterOption('areaType', 'appartment');

    }
    createFilterObj(searchableProp) {
        let filterObj = {
            propName: searchableProp,
            visible: true,
            filterActive: false,
            filterValue: null,
            defaultValue: null,
            rangeValue: {
                min: null,
                max: null
            },
            filterSettings: {
                options: [],
                results: []
            },
            dropdown: {
                isOpen: false,
                animation: true
            }
        };
        return filterObj;
    }
    gatherAreaOptions(areasArray) {
        let THAT = this;
        let uniqueOptions = {};
        function scanAreaProps(inst, areaData) {
            for (let pr in areaData) {
                if (
                    (
                        inst.filters.hasOwnProperty(pr)
                        ||inst.filters.hasOwnProperty(THAT.matchAreaDataWithFilterProp(pr) )
                    )
                    && !/(occupancy|sqrFoot|price|appartmentName|optionals|availability)/.test(pr)) {
                    let filterPr = THAT.matchAreaDataWithFilterProp(pr);
                    if (!uniqueOptions.hasOwnProperty(filterPr)) {
                        uniqueOptions[filterPr] = [];
                    }
                    if (uniqueOptions[filterPr].indexOf(areaData[pr]) === -1 && areaData[pr] != null) {
                        uniqueOptions[filterPr].push(areaData[pr]);
                        inst.filters[filterPr].filterSettings.options.push({ name: areaData[pr], value: areaData[pr], checked: false });
                    }
                }
            }
        }
        for (let k = 0; k < areasArray.length; k++) {
            if (areasArray[k].hasOwnProperty('RENDERATOR') && areasArray[k].RENDERATOR.dataEntry) {
                scanAreaProps(THAT, areasArray[k].RENDERATOR.dataEntry);
            }
        }
	}
	gatherPricesOptions(areasArray) {
        let THAT = this;
        let uniqueOptions = {};
        function scanPriceProps(inst, areaData) {
            for (let pr in areaData) {
				if ((inst.filters.hasOwnProperty(pr) || inst.filters.hasOwnProperty(THAT.matchAreaDataWithFilterProp(pr))) && !/(occupancy|sqrFoot|price|appartmentName|optionals|availability)/.test(pr)) {
					
					let filterPr = THAT.matchAreaDataWithFilterProp(pr);
					if (!uniqueOptions.hasOwnProperty(filterPr)) {
						uniqueOptions[filterPr] = [];
					}
					if (uniqueOptions[filterPr].indexOf(areaData[pr]) === -1 && areaData[pr] != null) {
						uniqueOptions[filterPr].push(areaData[pr]);
						inst.filters[filterPr].filterSettings.options.push({ name: areaData[pr], value: areaData[pr], checked: false });
					}
				}
            }
        }
        for (let k = 0; k < areasArray.length; k++) {
            if (areasArray[k].hasOwnProperty('RENDERATOR') && areasArray[k].RENDERATOR.dataEntry) {
                scanPriceProps(THAT, areasArray[k].RENDERATOR.dataEntry);
            }
        }
	}

	gatherSquareOptions(areasArray) {
        let THAT = this;
        let uniqueOptions = {};
        function scanSquareProps(inst, areaData) {
			for (let pr in areaData) {
				if ( ( inst.filters.hasOwnProperty(pr) || inst.filters.hasOwnProperty(THAT.matchAreaDataWithFilterProp(pr)))
					 && !/(occupancy|sqrFoot|price|appartmentName|optionals|availability)/.test(pr)) {

					let filterPr = THAT.matchAreaDataWithFilterProp(pr);

					if (!uniqueOptions.hasOwnProperty(filterPr)) {
						uniqueOptions[filterPr] = [];
					}
					if (uniqueOptions[filterPr].indexOf(areaData[pr]) === -1 && areaData[pr] != null) {
						uniqueOptions[filterPr].push(areaData[pr]);
						inst.filters[filterPr].filterSettings.options.push({ name: areaData[pr], value: areaData[pr], checked: false });
					}
				}
			}
        }
        for (let k = 0; k < areasArray.length; k++) {
            if (areasArray[k].hasOwnProperty('RENDERATOR') && areasArray[k].RENDERATOR.dataEntry) {
                scanSquareProps(THAT, areasArray[k].RENDERATOR.dataEntry);
            }
        }
	}
	
    deactivateFilter(activeFilterObj) {
        //delete this.actives[activeFilterObj.propName];
        Vue.delete(this.actives, activeFilterObj.propName);
        this.clearFilterOptions(activeFilterObj.propName);

        if (activeFilterObj.propName === 'price') {
            this.filters['price'].rangeValue.min = null;
            this.filters['price'].rangeValue.max = null;
        }
        if (activeFilterObj.propName === 'sqrFoot') {
            this.filters['sqrFoot'].rangeValue.min = null;
            this.filters['sqrFoot'].rangeValue.max = null;
        }

        this.selectFilterOption('areaType', this.filters.areaType.filterValue);
        this.applyAllFilters(this.filters.areaType.filterValue);
    }
    applyFilter(filterProp) {}

    appartmentHasFilters() {
        for (let f in this.filters) {
            if (f!=='areaType' && f!=='appartmentName') {
                return true;
            }
        }
        return false;
    }
    isFilterOfAreaType(filterProp, areaType) {
        let filtersOfAreaType = {
            'appartment': {
                'availability': true,
                'layouts': true,
                'price': true,
                'finishes': true,
                'optionals': true,
                'agent':  true,
                'appartmentName': true,
                'orientation': true,
                'areaType': true,
                'sqrFoot': true,
                'occupancy': true
            },
            'common': {
                'orientation': true,
                'areaType': true
            },
            'commercial': {
                'orientation': true,
                'areaType': true
            }
        };
        if (filtersOfAreaType[areaType] && filtersOfAreaType[areaType][filterProp]) {
            return true;
        }
        return false;
    }
    applyAllFilters(areaType) {
        let THAT = this;
        let activeFilters = {};
        for (let filterProp in this.filters) {
			/*  areaType: apartment, commercial, AMENITIES*/
            if (this.isFilterOfAreaType(filterProp, areaType)) {
                /* for dropdowns */
                this.parseFilterOptions(filterProp, function(option) {
                    if (option.checked === true && !option.dontApplyToSearch) {
                        activeFilters[filterProp] = JSON.parse(JSON.stringify(THAT.filters[filterProp]));
                    }
                });
                /* for price */
                if (filterProp==='price' && (this.filters[filterProp].rangeValue.min||this.filters[filterProp].rangeValue.max)) {
                    activeFilters[filterProp] = JSON.parse(JSON.stringify(THAT.filters[filterProp]));
                }
                /* for sqrFoot */
                if (filterProp==='sqrFoot' && (this.filters[filterProp].rangeValue.min||this.filters[filterProp].rangeValue.max)) {
                    activeFilters[filterProp] = JSON.parse(JSON.stringify(THAT.filters[filterProp]));
                }
                /* for occupancy */
                if (filterProp==='occupancy' && (this.filters[filterProp].filterValue)) {
                    activeFilters[filterProp] = JSON.parse(JSON.stringify(THAT.filters[filterProp]));
                }
            }
        }


        if (this.onApplyFilters) {
            this.onApplyFilters(activeFilters);
        }



        this.doSearch();
    }
    resetFilterToDefaults() {
        for (let f in this.filters) {
            if (['layouts','finishes','agent'].indexOf(f) > -1) {
                this.selectFilterOption(f, null);
            } else if (f==='price') {
                this.filters['price'].rangeValue.min = null;
                this.filters['price'].rangeValue.max = null;
            } else if (f==='sqrFoot') {
                this.filters['sqrFoot'].rangeValue.min = null;
                this.filters['sqrFoot'].rangeValue.max = null;
            }
            else if (f==='availability') {
                this.selectFilterOption('availability', true);
            } else if (f==='areaType') {
                this.selectFilterOption('areaType', 'appartment');
            }
        }
    }
    clearAllFilters() {

        for (let f in this.filters) {
            if (this.filters[f].filterSettings.options) {
                this.clearFilterOptions(f);
            }
            //this.deactivateFilter(this.filters[f]);
        }
        this.resetFilterToDefaults();
        this.clearSearchResults();
        if (this.onClearFilters) {
            this.onClearFilters();
        }

    }
    /* filter options */
    parseFilterOptions(filterProp, callback) {
        for (let f = 0; f < this.filters[filterProp].filterSettings.options.length; f++) {
            if (callback) {
                callback(this.filters[filterProp].filterSettings.options[f]);
            }
        }
    }

    clearFilterOptions(filterProp) {

        let THAT = this;
        this.parseFilterOptions(filterProp, function(option) {
            // if (THAT.filters[filterProp].filterValue !== THAT.filters[filterProp].defaultValue) {
            option.checked = false;
            // }
        });
        this.filters[filterProp].filterValue = this.filters[filterProp].defaultValue||null;

    }
    noFilterOptionChoosed(filterProp) {
        let choosedSomething = false;
        for (let f = 0; f < this.filters[filterProp].filterSettings.options.length; f++) {
            let option = this.filters[filterProp].filterSettings.options[f];
            if (option.checked == true) {
                choosedSomething = true;
                return choosedSomething;
            }
        }
        return choosedSomething;
    }
    selectFilterOption(filterProp, val) {
        let THAT = this;
        this.clearFilterOptions(filterProp);
        this.parseFilterOptions(filterProp, function(option) {
            if (option.value === val) {
                option.checked = true;
                THAT.filters[filterProp].filterValue = val;
            }
        });
    }
    isFilterOptionChecked(filterProp, val) {
        if (this.filters[filterProp].filterValue === val) {
            return true;
        }  else {
            return false;
        }
    }
    /* dropdowns */
    toggleFilterDropdown(filterProp) {
        this.filters[filterProp].dropdown.isOpen = !this.filters[filterProp].dropdown.isOpen;
    }
    openFilterDropdown(filterProp) {
        this.filters[filterProp].dropdown.isOpen = true;
    }
    closeFilterDropdown(filterProp) {
        this.filters[filterProp].dropdown.isOpen = false;
    }
    isFilterDropdownOpen(filterProp) {
        if (this.filters && this.filters[filterProp] && this.filters[filterProp].dropdown.isOpen) {
            return true;
        }
        return false;
    }

}


Vue.component('filter-elevation-header', {

    props: ["activefilters", "filterklass"],

    mounted(){

    },
    beforeUpdate(){
    },
    updated(){  },
    methods: {
        getHTMLfilterTitle(filterObj) {
            if (!filterObj) {return '';}
            let propName = filterObj.propName;
            let titles = {
                'appartmentName': 'property',
                'price': 'price',
                'availability': 'availability',
                'layouts': 'layouts',
                'promotions': 'promotion',
                'finishes': 'finishes',
                'agent': 'agent',
                'sqrFoot': 'sqrFeet',
                'occupancy': 'occupancy'
            };
            if (propName && titles[propName]) {
                return titles[propName] + ':';
            } else {
                return '';
            }
        },
        getHTMLfilterValue(filterObj) {
            if (!filterObj) {return '';}
            let propName = filterObj.propName;
            if (!propName) {
                return '';
            }
            else if (propName === 'sqrFoot') {
                return 'sqrFeet';
            }
            else if (propName === 'occupancy') {
                return 'occupancy';
            }


            else if (propName === 'price') {
                return 'price';
                //return 'From ' + filterObj.filterSettings.minValue + '$ To ' + filterObj.filterSettings.maxValue +'$';
            } else if (propName === 'availability') {
                return (filterObj.filterValue === 'true'||filterObj.filterValue === true)?'available':'unavailable';
            }	else if (propName === 'areaType') {
                let values = {
                    'appartment': 'residentials',
                    'common': 'amenities',
                    'commercial': 'commercials'
                };
                return values[filterObj.filterValue];
            } else if (propName === 'appartmentName') {
                if (!filterObj.filterValue) {
                    return 'NOT SET';
                }	else {
                    return filterObj.filterValue;
                }
            }	else {
                return filterObj.filterValue;
            }
        },
        deactivateFilter(filterObj) {
            this.filterklass.deactivateFilter(filterObj);


            if(!this.activefilters.length){
                console.log("activated actives: ",  this.activefilters.length);
                this.filterklass.clearAllFilters();
            }
        },
        openFiltersMenu() {
            this.filterklass.openFiltersMenu();
        }
    },
    template: `
  <div class="col-12">
	<div class="row canvas-header" style="min-height: 100%;">
	  <div class="col-8 col-sm-9 col-md-10 col-lg-10 col-xl-10 filter-tag-container active-filter-tags" style="overflow-x:auto;">
	  <div class="d-flex align-items-center" style="height: 100%">
	  
	    <div style="display:inline-block;vertical-aling:middle;margin-right: 5px;" v-if="filterklass.actives.length > 0">
	    
	      <div class="_btn _btn-secondary filter-tag d-flex align-items-center" style="cursor:default;" v-if="filterklass.actives.areaType.propName!='areaType' " > 
	      
	        <span class="d-none" style="text-transform:capitalize;">{{getHTMLfilterTitle(filterklass.actives.areaType)}}</span> 
	        <span class="d-inline-block filter-value" style="padding: 2px;" title="">{{getHTMLfilterValue(filterklass.actives.areaType)}}</span>
	        <span v-bind:class="{'d-none':(filterklass.actives.areaType.propName=='areaType')}" class="_d-inline-block close-filters-icon fas fa-times __fa-times-circle" style="display:inline-block;/*margin: 2px;margin-bottom: 0;*/    padding: 2px;margin-left: 2px;font-size:1.1rem;" v-on:click="deactivateFilter(filterklass.actives.areaType)"></span>
	      
	      </div>
	    </div>	  
	    
	    <div style="display:inline-block;vertical-aling:middle;margin-right: 5px;"  v-for="(activefilter, index) in filterklass.actives" v-if="activefilter.propName!='areaType'&& activefilter.propName!='residentials'">
	      <div class="_btn _btn-secondary filter-tag d-flex align-items-center" style="cursor:default;"> 
	        <span class="d-none" style="text-transform:capitalize;">{{getHTMLfilterTitle(activefilter)}}</span> 
	        <span class="d-inline-block filter-value" style="padding: 2px;" title="">{{getHTMLfilterValue(activefilter)}}</span>
	        <span v-bind:class="{'d-none':(activefilter.propName=='areaType')}" class="_d-inline-block close-filters-icon fas fa-times __fa-times-circle" style="display:inline-block;/*margin: 2px;margin-bottom: 0;*/    padding: 2px;    margin-left: 2px;font-size:1.1rem;" v-on:click="deactivateFilter(activefilter)"></span>
	      </div>
	    </div>
	  </div>	
	  </div>
	  <div class="col-4 col-sm-3 col-md-2 col-lg-2 col-xl-2  open-filters-container d-flex align-items-center" 
	    v-on:click="openFiltersMenu()"
	    style="font-size: 1.3rem;
        __line-height: 1.5;
	    "><span class="m-auto filter-btn">Start here ></span></div>
	</div> 
  </div>
  `
});














class ElevationFilterKlass {
	constructor() {
		this.filterMenuOpen = true
		this.searchableData = null
		this.filters = null
		this.actives = []
		this.filterMenuParentDom = null
		this.lastSearch = {
			tm: null,
			numResults: 0
		}
		this.VUE_COMPONENTS = {
			header: null,
			filterMenu: null
		}
	}
	init(elevationDiv) {
		this.filterMenuParentDom = elevationDiv
		let THAT = this
		/* init  2 vue components for: header tags and filter sections */
		this.VUE_COMPONENTS.filterMenu = new Vue({
			el: elevationDiv.find(".filter-menu-component")[0],
			data: function() {
				return {
					filterklass_inst: THAT,
					//filterklass_filters: THAT.filters,
					filterklass_lastsearch: THAT.lastSearch
				}
			}
		})
		this.VUE_COMPONENTS.header = new Vue({
			el: elevationDiv.find(".filter-elevation-header-component")[0],
			data: function() {
				return {
					filterklass_inst: THAT,
					filterklass_actives: THAT.actives
				}
			}
		})

		this.onApplyFilters = function(af) {
			THAT.actives = af
		}
	}
	/* methods for open/close/toggle filter menu */
	updateFiltersMenuPosition() {
		let menuDOM = this.filterMenuParentDom.find(".filter-menu-component").eq(0)
		let w = menuDOM.width() + 2
		menuDOM.css("right", -1 * w + "px")
	}
	closeFiltersMenu() {
		let menuDOM = this.filterMenuParentDom.find(".filter-menu-component").eq(0)
		this.updateFiltersMenuPosition()
		menuDOM.addClass("filter-menu-closed")
		if (this.onFiltersMenuClose) {
			this.onFiltersMenuClose(this)
		}
	}
	openFiltersMenu() {
		let menuDOM = this.filterMenuParentDom.find(".filter-menu-component").eq(0)
		menuDOM.css("right", "0")
		menuDOM.removeClass("filter-menu-closed")
		if (this.onFiltersMenuOpen) {
			this.onFiltersMenuOpen(this)
		}
	}
	toggleFiltersMenu() {
		let menuDOM = this.filterMenuParentDom.find(".filter-menu-component").eq(0)
		if (menuDOM.hasClass("filter-menu-closed")) {
			this.openFiltersMenu()
		} else {
			this.closeFiltersMenu()
		}
	}

	/* methods for searching data */
	searchFilter(prop, storedValue, pattern) {
		if (!pattern) {
			return
		}
		if (prop === "appartmentName") {
			let string = storedValue
			if (string.indexOf(pattern) !== -1 || string.indexOf(pattern.toUpperCase()) !== -1) {
				return true
			}
			let patt = new RegExp(pattern, "i")
			if (patt.test(string)) {
				return true
			}
		}
		return false
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
			renderGallery: { url: null, files: [] },
			floorPlan: { url: null, files: [] },
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
		}
		if (areaData.hasOwnProperty(prop)) {
			return prop
		}
		if (areaData.hasOwnProperty(prop + "s")) {
			return prop + "s"
		}
		if (prop[prop.length - 1] === "s" && areaData.hasOwnProperty(prop.substring(0, prop.length - 1))) {
			return prop.substring(0, prop.length - 1)
		}
		return prop
	}
	matchAreaDataWithFilterProp(areaDataProp) {
		let filtersToAreaDataProps = {
			availability: "availability",
			layout: "layouts",
			price: "price",
			finishes: "finishes",
			optionals: "optionals",
			agent: "agent",
			appartmentName: "appartmentName",
			orientation: "orientation",
			sqrFoot: "sqrFoot"
		}
		if (filtersToAreaDataProps.hasOwnProperty(areaDataProp)) {
			return filtersToAreaDataProps[areaDataProp]
		}
		return areaDataProp
	}
	string2literal(value) {
		var maps = {
			true: true,
			false: false,
			NaN: NaN,
			null: null,
			undefined: undefined,
			Infinity: Infinity,
			"-Infinity": -Infinity
		}
		return value in maps ? maps[value] : value
	}
	isAreaDataMatchFilter(areaData, filterObj) {
		let objValue
		let value = filterObj.filterValue
		let prop = this.matchFilterPropWithAreaProp(filterObj.propName)
		if (prop === "price" || prop === "sqrFoot") {
			/* if both min and max are selected */

			if (this.string2literal(filterObj.rangeValue.min) && this.string2literal(filterObj.rangeValue.max)) {
				if (
					this.formatPriceEntry(areaData.RENDERATOR.dataEntry[prop]) >= parseFloat(filterObj.rangeValue.min, 10) &&
					this.formatPriceEntry(areaData.RENDERATOR.dataEntry[prop]) <= parseFloat(filterObj.rangeValue.max, 10)
				) {
					return true
				}
			} else if (this.string2literal(filterObj.rangeValue.min) || this.string2literal(filterObj.rangeValue.max)) {
			/* if min OR max is selected but not both */
				if (
					(filterObj.rangeValue.min && this.formatPriceEntry(areaData.RENDERATOR.dataEntry[prop]) >= parseFloat(filterObj.rangeValue.min, 10)) ||
					(filterObj.rangeValue.max && this.formatPriceEntry(areaData.RENDERATOR.dataEntry[prop]) <= parseFloat(filterObj.rangeValue.max, 10))
				) {
					return true
				}
			}
		} else if (prop === "availability") {
			if (areaData.RENDERATOR.dataEntry["availability"] !== "null" && areaData.RENDERATOR.dataEntry["availability"] !== null) {
				objValue = areaData.RENDERATOR.dataEntry["availability"] === "true" || areaData.RENDERATOR.dataEntry["availability"] === true
			} else {
				objValue = null
			}
			let criterioValue = value === "true" || value === true
			if (criterioValue === objValue) {
				return true
			}
		} else if (prop === "occupancy") {
			if (value > 0 && areaData.RENDERATOR.dataEntry["sqrFoot"]) {
				let minSqrFoot = value * 100
				let maxSqrFoot = value * 150
				let sqrFootINT = parseFloat(areaData.RENDERATOR.dataEntry["sqrFoot"], 10)

				if (sqrFootINT >= minSqrFoot && sqrFootINT <= maxSqrFoot) {
					return true
				}
			}
		} else if (areaData.RENDERATOR.dataEntry[prop] === value || this.searchFilter(prop, areaData.RENDERATOR.dataEntry[prop], value) === true) {
			return true
		}
		return false
	}
	clearSearchResults(seachableData) {
		if (!seachableData) {
			seachableData = this.searchableData
		}
		for (let a = 0; a < seachableData.length; a++) {
			seachableData[a].lastSearch = null
		}
		this.actives = {}

		if (this.onClearSearchResults) {
			this.onClearSearchResults()
		}
	}
	doSearch(seachableData) {
		if (!seachableData) {
			seachableData = this.searchableData
		}

		// console.log("search able data : ", seachableData);
		this.lastSearch.tm = new Date().getTime()
		let THAT = this
		let results = []
		for (let a = 0; a < seachableData.length; a++) {
			let matchWithAll = true
			for (let f in this.actives) {
				let activeFilterObj = this.actives[f]
				let isMatch = this.isAreaDataMatchFilter(seachableData[a], activeFilterObj)
				if (isMatch === false) {
					matchWithAll = false
					break
				}
			}
			if (matchWithAll === true) {
				seachableData[a].lastSearch = { tm: THAT.lastSearch.tm, filtered: true }
				results.push(seachableData[a])
			} else {
				seachableData[a].lastSearch = { tm: THAT.lastSearch.tm, filtered: false }
			}
		}

		if (this.onDidSearch) {
			this.onDidSearch(this.actives, results)
		}
		this.lastSearch.numResults = results.length
		this.closeFiltersMenu()
		return results
	}
	formatPriceEntry(pri) {
		let splitted
		let price = pri
		let realPrice
		if (price && price.split(",").length > 2) {
			splitted = price.replace(/,([^,]*)$/, ".$1")
		} else {
			splitted = price
		}
		if (price) {
			realPrice = parseFloat(splitted.replace(/,/g, ""))
		} else {
			realPrice = price
		}
		return realPrice
	}
	createPriceOptions(seachableData) {
		let THAT = this
		let uniques = []
		let priceList = []
		if (!seachableData) {
			seachableData = this.searchableData
		}
		if (!this.filters.price || !this.filters.price.filterSettings) {
			return
		}
		if (!this.filters.price.filterSettings.pricelist || this.filters.price.filterSettings.pricelist.length === 0) {
		}
		for (let o = 0; o < seachableData.length; o++) {
			if (seachableData[o].RENDERATOR.dataEntry && seachableData[o].RENDERATOR.dataEntry.price) {
				if (uniques.indexOf(seachableData[o].RENDERATOR.dataEntry.price) === -1) {
					let splitted
					let price = seachableData[o].RENDERATOR.dataEntry.price
					if (price.split(",").length > 2) {
						splitted = price.replace(/,([^,]*)$/, ".$1")
					} else {
						splitted = price
					}
					let realPrice = parseFloat(splitted.replace(/,/g, ""))
					priceList.push({ value: realPrice, name: seachableData[o].RENDERATOR.dataEntry.price })
					uniques.push(seachableData[o].RENDERATOR.dataEntry.price)
				}
			}
		}
		priceList.sort(function(a, b) {
			return a.value - b.value
		})
		if (priceList.length > 0) {
			let stepArray = []
			let MIN_VALUE = priceList[0].value
			let MAX_VALUE = priceList[priceList.length - 1].value
			let DIFFERENCE = MAX_VALUE - MIN_VALUE
			let step = 500
			let numOptions = Math.ceil(DIFFERENCE / step)
			let startingFrom = parseInt(MIN_VALUE / step, 10) * step
			for (let n = 0; n < numOptions + 2; n++) {
				stepArray.push({ value: startingFrom + n * 500, name: startingFrom + n * 500 + " $" })
			}
			//--this.pricelist = stepArray;
			this.filters.price.filterSettings.pricelist = stepArray
			this.filters.price.filterSettings.minValue = stepArray[0].value
			this.filters.price.filterSettings.maxValue = stepArray[stepArray.length - 1].value
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
				delete this.filters[f]
			}
		}
	}
	/* methods to create filter objects */
	createFilters(areasArray) {
		let THAT = this
		// this.actives = {};
		this.filters = {
			availability: null,
			layouts: null,
			price: null,
			finishes: null,
			// 'optionals': null ,
			agent: null,
			appartmentName: null,
			orientation: null,
			sqrFoot: null,
			occupancy: null
		}
		for (let p in this.filters) {
			this.filters[p] = this.createFilterObj(p)
			// this.actives[p] = null;
		}
		this.gatherAreaOptions(areasArray)
		this.createPriceOptions()

		this.filters["occupancy"].defaultValue = ""

		this.filters["appartmentName"].defaultValue = ""
		this.filters["layouts"].filterSettings.options.unshift({ name: "Any", value: null, checked: true, dontApplyToSearch: true })
		this.filters["finishes"].filterSettings.options.unshift({ name: "Any", value: null, checked: true, dontApplyToSearch: true })
		this.filters["agent"].filterSettings.options.unshift({ name: "Any", value: null, checked: true, dontApplyToSearch: true })
		this.filters["orientation"].filterSettings.options.unshift({ name: "Any", value: null, checked: true, dontApplyToSearch: true })

		this.filters["availability"].filterSettings.options.unshift({ name: false, value: false, checked: false })
		this.filters["availability"].filterSettings.options.unshift({ name: true, value: true, checked: false })
		this.filters["availability"].defaultValue = true
		this.selectFilterOption("availability", true)

		this.filters["areaType"] = this.createFilterObj("areaType")
		this.filters["areaType"].filterSettings.options.unshift({ name: "appartment", value: "appartment", checked: true })
		this.filters["areaType"].filterSettings.options.unshift({ name: "amenity", value: "common", checked: false })
		this.filters["areaType"].filterSettings.options.unshift({ name: "commercial", value: "commercial", checked: false })
		this.filters["areaType"].defaultValue = "appartment"
		this.selectFilterOption("areaType", "appartment")
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
		}
		return filterObj
	}
	gatherAreaOptions(areasArray) {
		let THAT = this
		let uniqueOptions = {}
		function scanAreaProps(inst, areaData) {
			for (let pr in areaData) {
				if (
					(inst.filters.hasOwnProperty(pr) || inst.filters.hasOwnProperty(THAT.matchAreaDataWithFilterProp(pr))) &&
					!/(occupancy|sqrFoot|price|appartmentName|optionals|availability)/.test(pr)
				) {
					let filterPr = THAT.matchAreaDataWithFilterProp(pr)
					if (!uniqueOptions.hasOwnProperty(filterPr)) {
						uniqueOptions[filterPr] = []
					}
					if (uniqueOptions[filterPr].indexOf(areaData[pr]) === -1 && areaData[pr] != null) {
						uniqueOptions[filterPr].push(areaData[pr])
						inst.filters[filterPr].filterSettings.options.push({ name: areaData[pr], value: areaData[pr], checked: false })
					}
				}
			}
		}
		for (let k = 0; k < areasArray.length; k++) {
			if (areasArray[k].hasOwnProperty("RENDERATOR") && areasArray[k].RENDERATOR.dataEntry) {
				scanAreaProps(THAT, areasArray[k].RENDERATOR.dataEntry)
			}
		}
	}
	deactivateFilter(activeFilterObj) {
		//delete this.actives[activeFilterObj.propName];
		Vue.delete(this.actives, activeFilterObj.propName)
		this.clearFilterOptions(activeFilterObj.propName)

		if (activeFilterObj.propName === "price") {
			this.filters["price"].rangeValue.min = null
			this.filters["price"].rangeValue.max = null
		}
		if (activeFilterObj.propName === "sqrFoot") {
			this.filters["sqrFoot"].rangeValue.min = null
			this.filters["sqrFoot"].rangeValue.max = null
		}

		this.selectFilterOption("areaType", this.filters.areaType.filterValue)
		this.applyAllFilters(this.filters.areaType.filterValue)
	}
	applyFilter(filterProp) {}

	appartmentHasFilters() {
		for (let f in this.filters) {
			if (f !== "areaType" && f !== "appartmentName") {
				return true
			}
		}
		return false
	}
	isFilterOfAreaType(filterProp, areaType) {
		let filtersOfAreaType = {
			appartment: {
				availability: true,
				layouts: true,
				price: true,
				finishes: true,
				optionals: true,
				agent: true,
				appartmentName: true,
				orientation: true,
				areaType: true,
				sqrFoot: true,
				occupancy: true
			},
			common: {
				orientation: true,
				areaType: true
			},
			commercial: {
				orientation: true,
				areaType: true
			}
		}
		if (filtersOfAreaType[areaType] && filtersOfAreaType[areaType][filterProp]) {
			return true
		}
		return false
	}
	applyAllFilters(areaType) {
		let THAT = this
		let activeFilters = {}
		for (let filterProp in this.filters) {
			if (this.isFilterOfAreaType(filterProp, areaType)) {
				/* for dropdowns */
				this.parseFilterOptions(filterProp, function(option) {
					if (option.checked === true && !option.dontApplyToSearch) {
						activeFilters[filterProp] = JSON.parse(JSON.stringify(THAT.filters[filterProp]))
					}
				})
				/* for price */
				if (filterProp === "price" && (this.filters[filterProp].rangeValue.min || this.filters[filterProp].rangeValue.max)) {
					activeFilters[filterProp] = JSON.parse(JSON.stringify(THAT.filters[filterProp]))
				}
				/* for sqrFoot */
				if (filterProp === "sqrFoot" && (this.filters[filterProp].rangeValue.min || this.filters[filterProp].rangeValue.max)) {
					activeFilters[filterProp] = JSON.parse(JSON.stringify(THAT.filters[filterProp]))
				}
				/* for occupancy */
				if (filterProp === "occupancy" && this.filters[filterProp].filterValue) {
					activeFilters[filterProp] = JSON.parse(JSON.stringify(THAT.filters[filterProp]))
				}
			}
		}

		if (this.onApplyFilters) {
			this.onApplyFilters(activeFilters)
		}

		this.doSearch()
	}
	resetFilterToDefaults() {
		for (let f in this.filters) {
			if (["layouts", "finishes", "agent"].indexOf(f) > -1) {
				this.selectFilterOption(f, null)
			} else if (f === "price") {
				this.filters["price"].rangeValue.min = null
				this.filters["price"].rangeValue.max = null
			} else if (f === "sqrFoot") {
				this.filters["sqrFoot"].rangeValue.min = null
				this.filters["sqrFoot"].rangeValue.max = null
			} else if (f === "availability") {
				this.selectFilterOption("availability", true)
			} else if (f === "areaType") {
				this.selectFilterOption("areaType", "appartment")
			}
		}
	}
	clearAllFilters() {
		for (let f in this.filters) {
			if (this.filters[f].filterSettings.options) {
				this.clearFilterOptions(f)
			}
			//this.deactivateFilter(this.filters[f]);
		}
		this.resetFilterToDefaults()
		this.clearSearchResults()
		if (this.onClearFilters) {
			this.onClearFilters()
		}
	}
	/* filter options */
	parseFilterOptions(filterProp, callback) {
		for (let f = 0; f < this.filters[filterProp].filterSettings.options.length; f++) {
			if (callback) {
				callback(this.filters[filterProp].filterSettings.options[f])
			}
		}
	}

	clearFilterOptions(filterProp) {
		let THAT = this
		this.parseFilterOptions(filterProp, function(option) {
			// if (THAT.filters[filterProp].filterValue !== THAT.filters[filterProp].defaultValue) {
			option.checked = false
			// }
		})
		this.filters[filterProp].filterValue = this.filters[filterProp].defaultValue || null
	}
	noFilterOptionChoosed(filterProp) {
		let choosedSomething = false
		for (let f = 0; f < this.filters[filterProp].filterSettings.options.length; f++) {
			let option = this.filters[filterProp].filterSettings.options[f]
			if (option.checked == true) {
				choosedSomething = true
				return choosedSomething
			}
		}
		return choosedSomething
	}
	selectFilterOption(filterProp, val) {
		let THAT = this
		this.clearFilterOptions(filterProp)
		this.parseFilterOptions(filterProp, function(option) {
			if (option.value === val) {
				option.checked = true
				THAT.filters[filterProp].filterValue = val
			}
		})
	}
	isFilterOptionChecked(filterProp, val) {
		if (this.filters[filterProp].filterValue === val) {
			return true
		} else {
			return false
		}
	}
	/* dropdowns */
	toggleFilterDropdown(filterProp) {
		this.filters[filterProp].dropdown.isOpen = !this.filters[filterProp].dropdown.isOpen
	}
	openFilterDropdown(filterProp) {
		this.filters[filterProp].dropdown.isOpen = true
	}
	closeFilterDropdown(filterProp) {
		this.filters[filterProp].dropdown.isOpen = false
	}
	isFilterDropdownOpen(filterProp) {
		if (this.filters && this.filters[filterProp] && this.filters[filterProp].dropdown.isOpen) {
			return true
		}
		return false
	}
}

Vue.component("filter-elevation-header", {
	props: ["activefilters", "filterklass"],

	mounted() {},
	beforeUpdate() {},
	updated() {},
	methods: {
		getHTMLfilterTitle(filterObj) {
			if (!filterObj) {
				return ""
			}
			let propName = filterObj.propName
			let titles = {
				appartmentName: "property",
				price: "price",
				availability: "availability",
				layouts: "layouts",
				promotions: "promotion",
				finishes: "finishes",
				agent: "agent",
				sqrFoot: "sqrFeet",
				occupancy: "occupancy"
			}
			if (propName && titles[propName]) {
				return titles[propName] + ":"
			} else {
				return ""
			}
		},
		getHTMLfilterValue(filterObj) {
			if (!filterObj) {
				return ""
			}
			let propName = filterObj.propName
			if (!propName) {
				return ""
			} else if (propName === "sqrFoot") {
				return "sqrFeet"
			} else if (propName === "occupancy") {
				return "occupancy"
			} else if (propName === "price") {
				return "price"
				//return 'From ' + filterObj.filterSettings.minValue + '$ To ' + filterObj.filterSettings.maxValue +'$';
			} else if (propName === "availability") {
				return filterObj.filterValue === "true" || filterObj.filterValue === true ? "available" : "unavailable"
			} else if (propName === "areaType") {
				let values = {
					appartment: "residentials",
					common: "amenities",
					commercial: "commercials"
				}
				return values[filterObj.filterValue]
			} else if (propName === "appartmentName") {
				if (!filterObj.filterValue) {
					return "NOT SET"
				} else {
					return filterObj.filterValue
				}
			} else {
				return filterObj.filterValue
			}
		},
		deactivateFilter(filterObj) {
			this.filterklass.deactivateFilter(filterObj)

			if (!this.activefilters.length) {
				console.log("activated actives: ", this.activefilters.length)
				this.filterklass.clearAllFilters()
			}
		},
		openFiltersMenu() {
			this.filterklass.openFiltersMenu()
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
	    "><span class="m-auto filter-btn noselect">Start here ></span></div>
	</div> 
  </div>
  `
})

Vue.component("filter-menu-component", {
	props: ["filters", "filterklass", "lastsearch", "areatype", "datamodel"],

	/*
      filter: {
		propName: '',
		visible: tru/false,
	    filterActive: true,
		filterValue: 'ds',
		defaultValue: 'ds'
      	filterSettings: {
		  options: [{name: '', value: '', checked: true }],
		  results: []
		},
		dropdown: {
		  isOpen: false,
          animation: true		  
		}
	  }
  */

	data: function() {
		return {
			amenityName: "Amenities",
			agentName: "Agent",
			finishName: "Finishes"
		}
	},

	beforeCreate() {
		if (!window.VUE_RADIO_uuiidd) {
			window.VUE_RADIO_uuiidd = 0
		}
		this.uuiidd = window.VUE_RADIO_uuiidd
		window.VUE_RADIO_uuiidd++
	},
	mounted() {
		console.log(" loaded model data : ", this.datamodel)

		if (this.datamodel.filterArray) {
			this.datamodel.filterArray.map(item => {
				switch (item.matchProperty) {
					case "finish":
						this.finishName = item.name
						break
					case "agent":
						this.agentName = item.name
						break
					case "amenity":
						this.amenityName = item.name
						break
					default:
						break
				}
			})
		}

		if (!this.areaType) {
			this.areaType = "appartment"
		}
	},
	beforeUpdate() {
		this.areaType = this.filters.areaType.filterValue
	},
	updated() {
		this.calculateHeights()
		if (
			$(this.$el)
				.parent()
				.hasClass("filter-menu-closed")
		) {
			this.filterklass.updateFiltersMenuPosition()
		}
	},
	methods: {
		isValidLayout(layoutValue) {
			let flag = false
			if (!layoutValue) flag = true
			else {
				this.datamodel.adminOptions.layout.map(item => {
					if (item.name == layoutValue) flag = true
				})
			}
			return flag
		},
		getUniqueVue() {
			return this.uuiidd
		},
		applyAllFilters() {
			this.filterklass.applyAllFilters(this.areaType)
		},
		clearAllFilters() {
			this.filterklass.clearAllFilters()
		},

		/* dropdowns */
		toggleFilterDropdown(filterProp) {
			this.filterklass.toggleFilterDropdown(filterProp)
			//this.filters[filterProp].dropdown.isOpen = !this.filters[filterProp].dropdown.isOpen;
		},
		openFilterDropdown(filterProp) {
			this.filterklass.openFilterDropdown(filterProp)
			//this.filters[filterProp].dropdown.isOpen = true;
		},
		closeFilterDropdown(filterProp) {
			this.filterklass.closeFilterDropdown(filterProp)
			//this.filters[filterProp].dropdown.isOpen = false;
		},
		isFilterDropdownOpen(filterProp) {
			return this.filterklass.isFilterDropdownOpen(filterProp)
			/*
	  if (this.filters[filterProp].dropdown.isOpen) {
		return true;
	  }
	  return false;
	  */
		},
		calcFilterDropdownHeight(propName) {
			let bd = $(this.$el)
				.find(".filter-" + propName + "-section .filter-body")
				.eq(0)
			// if (bd.attr('calced_height')) {
			// return parseInt(bd.attr('calced_height'),10);
			// }
			let cloneBodyOptions = bd.clone()
			cloneBodyOptions.css({ height: "auto", visibility: "visible", display: "inline-block", width: "600px" })
			//$('.container-fluid').append(cloneBodyOptions);
			bd.parent().append(cloneBodyOptions)
			let calcedHeight = cloneBodyOptions.height()
			cloneBodyOptions.remove()
			// bd.attr('calced_height', calcedHeight);
			return calcedHeight
		},
		calculateHeights() {
			for (let propName in this.filters) {
				if (this.isFilterDropdownOpen(propName)) {
					let h = this.calcFilterDropdownHeight(propName)
					if (propName === "price") {
						// h = 95;
					}
					$(this.$el)
						.find(".filter-" + propName + "-section")
						.find(".filter-body.has-height-transition")
						.css("height", "inherit")
				} else {
					$(this.$el)
						.find(".filter-" + propName + "-section")
						.find(".filter-body.has-height-transition")
						.css("height", "0px")
				}
			}
		},
		/* filter options */
		parseFilterOptions(filterProp, callback) {
			this.filterklass.parseFilterOptions(filterProp, callback)
		},
		clearFilterOptions(filterProp) {
			this.filterklass.clearFilterOptions(filterProp)
		},
		selectFilterOption(filterProp, val) {
			this.filterklass.selectFilterOption(filterProp, val)
		},
		isFilterOptionChecked(filterProp, val) {
			return this.filterklass.isFilterOptionChecked(filterProp, val)
		},
		noFilterOptionChoosed(filterProp) {
			return this.filterklass.noFilterOptionChoosed(filterProp)
		},
		switchFilters(areaTypeValue) {
			//this.$forceUpdate();
			this.selectFilterOption("areaType", areaTypeValue)
			this.areaType = areaTypeValue
			this.$forceUpdate()
		},
		onlyNumbersHere(val) {
			val = val.replace(/[^0-9]+/g, "")
			return val
		}
	},
	template: `
			<div class="filter-section" v-if="filters">
			  <div class="filter-section-header">
			    <div class="row d-flex align-items-center h-100">
			      <div class="col-5 header-title">FILTERS</div>
				  <div class="col-7 header-results-num">{{(lastsearch.numResults===0?'No':lastsearch.numResults)}} matching properties</div>
				</div>
			  </div>
			  <div class="filter-section-body">
				<div class="filter-types" style="display: inline-flex;">
                  <div class="form-check-inline" style="margin-left: .75rem;margin-right: 0rem;">
                    <label class="d-flex align-items-center form-check-label">
                      <span>RESIDENTIALS</span><input type="radio" class="form-check-input" v-bind:name="getUniqueVue() + '_areatype'"   value="appartment" v-model="areaType" v-on:change="switchFilters('appartment')">
                    </label>
                  </div>
                  <div class="form-check-inline" style="margin-right: 0rem;">
                    <label class="d-flex align-items-center form-check-label">
                      <span>COMMERCIAL</span><input type="radio" class="form-check-input" v-bind:name="getUniqueVue() + '_areatype'"    value="commercial" v-model="areaType" v-on:change="switchFilters('commercial')">
                    </label>
                  </div>
                  <div class="form-check-inline"  style="margin-right: 0rem;">
                    <label class="d-flex align-items-center form-check-label">
                      <span>AMENITIES</span><input type="radio" class="form-check-input" v-bind:name="getUniqueVue() + '_areatype'"     value="common" v-model="areaType" v-on:change="switchFilters('common')">
                    </label>
                  </div> 			
				</div>
				<!--<div class="filters" v-if="areaType==='commercial'"  style="position:absolute;top:50%;transform: translate(0%,-50%);width:100%;text-align:center;font-size:1.7rem;color:#dadada;"><span style="display:inline-block;width:80%; display: none;">Click 'Apply' to find commercials</span></div>-->
				<!--<div class="filters" v-if="areaType==='common'"  	 style="position:absolute;top:50%;transform: translate(0%,-50%);width:100%;text-align:center;font-size:1.7rem;color:#dadada;"><span style="display:inline-block;width:80%; display: none;">Click 'Apply' to find amenities</span></div>-->
				<div class="filters" v-if="areaType==='appartment' || areaType==='commercial' || areaType==='common'" v-bind:class="{'centerized-child':!filterklass.appartmentHasFilters() }">
				  <span v-if="!filterklass.appartmentHasFilters()" style="display:inline-block;width:80%; display: none;">Click 'Apply' to find residentials</span>
				  <div class="filter filter-sqrFoot-section"  v-if="filters.sqrFoot"  v-bind:class="{'dropdown-open': isFilterDropdownOpen('sqrFoot') }">
				    <div 
					  class="filter-header"  
					  v-on:click="toggleFilterDropdown('sqrFoot')"
					>
				      <div class="filter-label">Square Feet</div>		
					  <div class="filter-toggler"><i class="fas fa-caret-down"></i></div>	
					</div>
					<div 
					  class="filter-body  has-height-transition"
					   ___v-bind:style="{height:(isFilterDropdownOpen('sqrFoot')?calcFilterDropdownHeight('sqrFoot')+'px':'0px')}"
					>
					  <div class="filter-option" v-on:click="(function(){filters.sqrFoot.rangeValue.min=null;filters.sqrFoot.rangeValue.max=null;}())">
					    <div class="filter-option-label">
						  <div class="row d-flex align-items-center" style="_width: 100%;">
						    <span class="col-4"></span><span class="col-8 text-left">Any</span>
						  </div>
						</div><div class="filter-option-check"><i class="fas fa-check"  v-bind:class="{'d-none': (filters.sqrFoot.rangeValue.min||filters.sqrFoot.rangeValue.max) }"></i></div>
					  </div>
					  <div class="filter-option">
					    <div class="filter-option-label"  style="width:100%;">
						  <div class="row d-flex align-items-center" style="_width: 100%;margin:0px;">
						    <span class="col-3"></span>
							<div class="col-9  text-left">
							  <input  class="col-9 field-sqrFoot-input"   v-on:change="$event.target.value=onlyNumbersHere($event.target.value);filters.sqrFoot.rangeValue.min=$event.target.value"  placeholder="Minimum Sqft" />							  
							</div>
						  </div>
						</div>
						<div class="filter-option-check"><i class="fas fa-check d-none"></i></div>					  
					  </div>
					  <div class="filter-option">
					    <div class="filter-option-label" style="width:100%;">
						  <div class="row d-flex align-items-center" style="_width: 100%;margin:0px;">
						    <span class="col-3"></span>
							
							<div class="col-9  text-left">							
							  <input  class="col-9 field-sqrFoot-input"  v-on:change="$event.target.value=onlyNumbersHere($event.target.value);filters.sqrFoot.rangeValue.max=$event.target.value"  placeholder="Maximum Sqft" />							  
							</div>
								
						  </div>
						</div>
						<div class="filter-option-check"><i class="fas fa-check d-none"></i></div>					  
					  </div>					  
					</div>					
				  </div>
				  <div class="filter filter-occupancy-section"  v-if="filters.occupancy"  v-bind:class="{'dropdown-open': isFilterDropdownOpen('occupancy') }">
				    <div 
					  class="filter-header"  
					  v-on:click="toggleFilterDropdown('occupancy')"
					>
				      <div class="filter-label">Occupancy</div>		
					  <div class="filter-toggler"><i class="fas fa-caret-down"></i></div>	
					</div>
					<div 
					  class="filter-body  has-height-transition"
					   ___v-bind:style="{height:(isFilterDropdownOpen('occupancy')?calcFilterDropdownHeight('occupancy')+'px':'0px')}"
					>
					  <div class="filter-option" v-on:click="(function(){filters.occupancy.filterValue=null;}())">
					    <div class="filter-option-label">
						  <div class="row d-flex align-items-center" style="_width: 100%;">
						    <span class="col-4"></span><span class="col-8 text-left">Any</span>
						  </div>
						</div><div class="filter-option-check"><i class="fas fa-check"  v-bind:class="{'d-none': (filters.occupancy.filterValue) }"></i></div>
					  </div>
					  <div class="filter-option">
					    <div class="filter-option-label"  style="width:100%;">
						  <div class="row d-flex align-items-center" style="_width: 100%;margin:0px;">
						    <span class="col-3"></span>
							<div class="col-9  text-left">							
							  <input  class="col-9 field-occupancy-input"   v-on:change="$event.target.value=onlyNumbersHere($event.target.value);filters.occupancy.filterValue=$event.target.value"  placeholder="People To Fit" />							  
							</div>
						  </div>
						</div>
						<div class="filter-option-check"><i class="fas fa-check d-none"></i></div>					  
					  </div>					  
					</div>					
				  </div>		
				  <div class="filter filter-layouts-section"   v-if="filters.layouts"  v-bind:class="{'dropdown-open': isFilterDropdownOpen('layouts') }">
				    <div
 					  class="filter-header" 
					  v-on:click="toggleFilterDropdown('layouts')"
					>
				      <div class="filter-label">Layout</div>		
					  <div class="filter-toggler"><i class="fas fa-caret-down"></i></div>	
					</div>
					<div 
					  class="filter-body has-height-transition" 
					  ___v-bind:style="{height:(isFilterDropdownOpen('layouts')?'inherit':'0px')}"
					 >
					  <div 
					    class="filter-option" 
						v-for="(layoutOption, index) in filters.layouts.filterSettings.options"
						v-on:click="selectFilterOption('layouts', layoutOption.value);"
						v-if="isValidLayout(layoutOption.value)"
					  >
					    <div class="filter-option-label">
						
						  <div class="row d-flex align-items-center">
						    <div class="col-4"></div>
						    <div class="col-8 text-left">{{layoutOption.name}}</div>
						  </div> 							
						
						</div><div class="filter-option-check"><i class="fas fa-check" v-bind:class="{'d-none': !layoutOption.checked }"></i>
						</div>
					  </div>					  
					</div>					
				  </div>
				  <div class="filter filter-finishes-section" v-if="filters.finishes" v-bind:class="{'dropdown-open': isFilterDropdownOpen('finishes') }">
				    <div 
					  class="filter-header" 
					  v-on:click="toggleFilterDropdown('finishes')"
					>
				      <div class="filter-label">{{finishName}}</div>		
					  <div class="filter-toggler"><i class="fas fa-caret-down"></i></div>	
					</div>
					<div 
					  class="filter-body  has-height-transition"
					  ___v-bind:style="{height:(isFilterDropdownOpen('finishes')?calcFilterDropdownHeight('finishes')+'px':'0px')}"
					>
					  <div 					  
					    class="filter-option"  
						v-if="filters.finishes && filters.finishes.filterSettings"
					    v-for="(finishOption, index) in filters.finishes.filterSettings.options"
						v-on:click="selectFilterOption('finishes', finishOption.value)"
					  >
					    <div class="filter-option-label">
						  <div class="row d-flex align-items-center">
						    <div class="col-4"></div>
						    <div class="col-8 text-left">{{finishOption.name}}</div>
						  </div> 							
						
						</div><div class="filter-option-check"><i class="fas fa-check"  v-bind:class="{'d-none': !finishOption.checked }"></i></div>
					  </div>					  
					</div>					
				  </div>
				  <div class="filter filter-price-section"  v-if="filters.price"  v-bind:class="{'dropdown-open': isFilterDropdownOpen('price') }">
				    <div 
					  class="filter-header"  
					  v-on:click="toggleFilterDropdown('price')"
					>
				      <div class="filter-label">Price</div>		
					  <div class="filter-toggler"><i class="fas fa-caret-down"></i></div>	
					</div>
					<div 
					  class="filter-body  has-height-transition"
					   ___v-bind:style="{height:(isFilterDropdownOpen('price')?'inherit':'0px')}"
					>
					  <div class="filter-option" v-on:click="(function(){filters.price.rangeValue.min=null;filters.price.rangeValue.max=null;}())">
					    <div class="filter-option-label">
						  <div class="row d-flex align-items-center" style="_width: 100%;">
						    <span class="col-4"></span><span class="col-8 text-left">Any</span>
						  </div>
						</div><div class="filter-option-check"><i class="fas fa-check"  v-bind:class="{'d-none': (filters.price.rangeValue.min||filters.price.rangeValue.max) }"></i></div>
					  </div>
					  <div class="filter-option">
					    <div class="filter-option-label"  style="width:100%;">
						  <div class="row d-flex align-items-center" style="_width: 100%;margin:0px;">
						    <span class="col-3">Min</span>
							<div class="col-9  text-left">
							
							  <select class="col-9 d-none" style="width:70%;padding-left: 5px;" av-model:value="filters.price.rangeValue.min">
							    <option value="null">Any</option>	
						        <option v-for="(pric, index) in filters.price.filterSettings.pricelist"  v-bind:value="pric.value">{{pric.name}}</option>							
							  </select>
							  <input  class="col-9 field-price-input"   v-on:change="$event.target.value=onlyNumbersHere($event.target.value);filters.price.rangeValue.min=$event.target.value"  placeholder="Minimum price" />
							  
							</div>
						  </div>
						</div>
						<div class="filter-option-check"><i class="fas fa-check d-none"></i></div>					  
					  </div>
					  <div class="filter-option">
					    <div class="filter-option-label" style="width:100%;">
						  <div class="row d-flex align-items-center" style="_width: 100%;margin:0px;">
						    <span class="col-3">Max</span>
							
							<div class="col-9  text-left">
							
							  <select class="col-9 d-none"  style="width:70%;padding-left: 5px;"  av-model:value="filters.price.rangeValue.max">
							    <option value="null">Any</option>	
						        <option v-for="(pric, index) in filters.price.filterSettings.pricelist"  v-bind:value="pric.value">{{pric.name}}</option>							
							  </select>
							  <input  class="col-9 field-price-input"  v-on:change="$event.target.value=onlyNumbersHere($event.target.value);filters.price.rangeValue.max=$event.target.value"  placeholder="Maximum price" />
							  
							</div>
								
						  </div>
						</div>
						<div class="filter-option-check"><i class="fas fa-check d-none"></i></div>					  
					  </div>					  
					</div>					
				  </div>				  
				  <div class="filter filter-availability-section"    v-if="filters.availability"  v-bind:class="{'dropdown-open': isFilterDropdownOpen('availability') }">
				    <div 
					  class="filter-header" 
					  v-on:click="toggleFilterDropdown('availability')"
					 >
				      <div class="filter-label">Availability</div>		
					  <div class="filter-toggler"><i class="fas fa-caret-down"></i></div>	
					</div>
					<div 
					  class="filter-body has-height-transition" 
					  ___v-bind:style="{height:(isFilterDropdownOpen('availability')?calcFilterDropdownHeight('availability')+'px':'0px')}"
					>
					  <div class="filter-option"
						v-if="filters.availability"
					    v-for="(availabilityOption, index) in filters.availability.filterSettings.options"
						v-on:click="selectFilterOption('availability', availabilityOption.value)"
					  >
					    <div class="filter-option-label">
						  <div class="row d-flex align-items-center">
						    <div class="col-4"></div>
						    <div class="col-8 text-left">{{(availabilityOption.name===true)?'Available':'Unavailable'}}</div>
						  </div> 
						</div><div 
						  class="filter-option-check"><i class="fas fa-check"  v-bind:class="{'d-none': !availabilityOption.checked }"></i>
						</div>
					  </div>			  
					</div>					
				  </div>
				  <div class="filter filter-orientation-section d-none"   v-if="filters.orientation"  v-bind:class="{'dropdown-open': isFilterDropdownOpen('orientation') }">
				    <div 
					  class="filter-header" 
					  v-on:click="toggleFilterDropdown('orientation')"
					 >
				      <div class="filter-label">Orientation</div>		
					  <div class="filter-toggler"><i class="fas fa-caret-down"></i></div>	
					</div>
					<div 
					  class="filter-body has-height-transition" 
					  ___v-bind:style="{height:(isFilterDropdownOpen('orientation')?calcFilterDropdownHeight('orientation')+'px':'0px')}"
					>
					  <div class="filter-option"
						v-if="filters.orientation"
					    v-for="(orientationOption, index) in filters.orientation.filterSettings.options"
						v-on:click="selectFilterOption('orientation', orientationOption.value)"
					  >
					    <div class="filter-option-label">
						  <div class="row d-flex align-items-center">
						    <div class="col-4"></div>
						    <div class="col-8 text-left">{{orientationOption.name}}</div>
						  </div> 						
						
						
						
						</div><div class="filter-option-check"><i class="fas fa-check"  v-bind:class="{'d-none': !orientationOption.checked }"></i></div>
					  </div>			  
					</div>					
				  </div>				
				  <div class="filter filter-agent-section"   v-if="filters.agent"  v-bind:class="{'dropdown-open': isFilterDropdownOpen('agent') }">
				    <div
 					  class="filter-header" 
					  v-on:click="toggleFilterDropdown('agent')"
					>
				      <div class="filter-label">{{agentName}}</div>		
					  <div class="filter-toggler"><i class="fas fa-caret-down"></i></div>	
					</div>
					<div 
					  class="filter-body  has-height-transition"					  
					  ___v-bind:style="{height:(isFilterDropdownOpen('agent')?calcFilterDropdownHeight('agent')+'px':'0px')}"
					 >
					  <div 
					    class="filter-option" 
						v-for="(agentOption, index) in filters.agent.filterSettings.options"
						v-on:click="selectFilterOption('agent', agentOption.value);"
					  >
					    <div class="filter-option-label">
						
						  <div class="row d-flex align-items-center">
						    <div class="col-4"></div>
						    <div class="col-8 text-left">{{agentOption.name}}</div>
						  </div> 							
						
						</div><div class="filter-option-check"><i class="fas fa-check" v-bind:class="{'d-none': !agentOption.checked }"></i>
						</div>
					  </div>					  
					</div>					
				  </div>				
				</div>				
			  </div>
			  <div class="filter-section-footer">
				<div class="d-flex align-items-center actions">
				  <div class="text-right w-100">
				    <span v-on:click="filterklass.closeFiltersMenu()">HIDE</span>
				    <span v-on:click="clearAllFilters()">CLEAR</span>
				    <span v-on:click="applyAllFilters()">APPLY</span>
				  </div>
				</div>
				<div class="filter-section-logo" style="height: 15px;padding-left:20px;display: none;">
				  <img src="assets/suitesflow.png" height="100%;padding:2px;">
				</div>
			  </div>			  
			</div>
`
})

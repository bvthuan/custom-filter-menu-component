class CustomElevationFilterKlass {
	constructor() {
		this.filterMenuOpen = true;
		this.searchableData = null;
		this.filters = null;
		this.filtersBasedOnAreaType = {};
		this.AREA_TYPES = {
			APARTMENT: 'appartment',
			COMMERCIAL: 'commercial',
			COMMON: 'common',
			toList: function () {
				return [this.APARTMENT, this.COMMERCIAL, this.COMMON]
			}
		};
		this.actives = [];
		this.filterMenuParentDom = null;
		this.lastSearch = {
			tm: null,
			numResults: 0
		};
		this.VUE_COMPONENTS = {
			header: null,
			filterMenu: null
		}
	}
	init(elevationDiv) {
		this.filterMenuParentDom = elevationDiv;
		let THAT = this;
		/* init  2 vue components for: header tags and filter sections */
		this.VUE_COMPONENTS.filterMenu = new Vue({
			el: elevationDiv.find('.filter-menu-component')[0],
			data: function () {
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
			data: function () {
				return {
					filterklass_inst: THAT,
					filterklass_actives: THAT.actives
				}
			}
		});

		this.onApplyFilters = function (af) {
			THAT.actives = af;
		}

	}
	/* methods for open/close/toggle filter menu */
	updateFiltersMenuPosition() {
		let menuDOM = this.filterMenuParentDom.find('.filter-menu-component').eq(0);
		let w = menuDOM.width() + 2;
		menuDOM.css('right', (-1) * w + 'px');
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
		if (!pattern) { return; }
		if (prop === 'appartmentName') {
			let string = storedValue;
			if (string.indexOf(pattern) !== -1 || string.indexOf(pattern.toUpperCase()) !== -1) {
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
		};
		if (areaData.hasOwnProperty(prop)) {
			return prop;
		}
		if (areaData.hasOwnProperty(prop + 's')) {
			return prop + 's';
		}
		if (prop[prop.length - 1] === 's' && areaData.hasOwnProperty(prop.substring(0, prop.length - 1))) {
			return prop.substring(0, prop.length - 1);
		}
		return prop;
	}
	matchAreaDataWithFilterProp(areaDataProp) {
		let filtersToAreaDataProps = {
			'availability': 'availability',
			'layout': 'layouts',
			'price': 'price',
			'finishes': 'finishes',
			'optionals': 'optionals',
			'agent': 'agent',
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
		if (prop === 'price' || prop === 'sqrFoot') {
			/* if both min and max are selected */
			if (this.string2literal(filterObj.rangeValue.min) && this.string2literal(filterObj.rangeValue.max)) {
				if (
					this.formatPriceEntry(areaData.RENDERATOR.dataEntry[prop]) >= parseFloat(filterObj.rangeValue.min, 10)
					&&
					this.formatPriceEntry(areaData.RENDERATOR.dataEntry[prop]) <= parseFloat(filterObj.rangeValue.max, 10)
				) {
					return true;
				}
			}
			else
				/* if min OR max is selected but not both */
				if (this.string2literal(filterObj.rangeValue.min) || this.string2literal(filterObj.rangeValue.max)) {
					if (
						(filterObj.rangeValue.min && this.formatPriceEntry(areaData.RENDERATOR.dataEntry[prop]) >= parseFloat(filterObj.rangeValue.min, 10))
						||
						(filterObj.rangeValue.max && this.formatPriceEntry(areaData.RENDERATOR.dataEntry[prop]) <= parseFloat(filterObj.rangeValue.max, 10))
					) {
						return true;
					}
				}
		} else if (prop === 'availability') {
			if (areaData.RENDERATOR.dataEntry['availability'] !== 'null' && areaData.RENDERATOR.dataEntry['availability'] !== null) {
				objValue = (areaData.RENDERATOR.dataEntry['availability'] === 'true' || areaData.RENDERATOR.dataEntry['availability'] === true);
			} else {
				objValue = null;
			}
			let criterioValue = (value === 'true' || value === true);
			if (criterioValue === objValue) {
				return true;
			}
		} else if (prop === 'occupancy') {

			if (value > 0 && areaData.RENDERATOR.dataEntry['sqrFoot']) {
				let minSqrFoot = value * 100;
				let maxSqrFoot = value * 150;
				let sqrFootINT = parseFloat(areaData.RENDERATOR.dataEntry['sqrFoot'], 10);

				if (sqrFootINT >= minSqrFoot && sqrFootINT <= maxSqrFoot) {
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
			} else {
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
		let uniquesBasedOnAreaTypes = {};
		let priceListBasedOnAreaTypes = {};

		this.AREA_TYPES.toList().forEach(function (areaType) {
			uniquesBasedOnAreaTypes['' + areaType] = [];
			priceListBasedOnAreaTypes['' + areaType] = []
		});

		//let uniques = [];
		//let priceList = [];
		if (!seachableData) {
			seachableData = this.searchableData;
		}
		// if (!this.filters.price || !this.filters.price.filterSettings ) {
		//     return;
		// }

		// if (!this.filters.price.filterSettings.pricelist || this.filters.price.filterSettings.pricelist.length === 0) {}

		for (let o = 0; o < seachableData.length; o++) {
			if (seachableData[o].RENDERATOR.dataEntry && seachableData[o].RENDERATOR.dataEntry.price) {

				let uniques = uniquesBasedOnAreaTypes[seachableData[o].RENDERATOR.dataEntry.areaType];
				let priceList = priceListBasedOnAreaTypes[seachableData[o].RENDERATOR.dataEntry.areaType];

				if (uniques.indexOf(seachableData[o].RENDERATOR.dataEntry.price) === -1) {
					let splitted;
					let price = seachableData[o].RENDERATOR.dataEntry.price;
					if (price.split(',').length > 2) {
						splitted = price.replace(/,([^,]*)$/, '.$1');
					} else {
						splitted = price;
					}
					let realPrice = parseFloat(splitted.replace(/,/g, ''));
					priceList.push({ value: realPrice, name: seachableData[o].RENDERATOR.dataEntry.price });
					uniques.push(seachableData[o].RENDERATOR.dataEntry.price);
				}
			}
		}

		THAT.AREA_TYPES.toList().forEach(function (areaType) {

			let priceList = priceListBasedOnAreaTypes[areaType];

			priceList.sort(function (a, b) { return a.value - b.value; });
			if (priceList.length > 0) {
				let stepArray = [];
				let MIN_VALUE = priceList[0].value;
				let MAX_VALUE = priceList[priceList.length - 1].value;
				let DIFFERENCE = MAX_VALUE - MIN_VALUE;
				let step = 500;
				let numOptions = Math.ceil(DIFFERENCE / step);
				let startingFrom = parseInt(MIN_VALUE / step, 10) * step;
				for (let n = 0; n < numOptions + 2; n++) {
					stepArray.push({ value: startingFrom + n * 500, name: startingFrom + n * 500 + ' $' });
				}
				//--this.pricelist = stepArray;
				THAT.filtersBasedOnAreaType[areaType].price.filterSettings.pricelist = stepArray;
				THAT.filtersBasedOnAreaType[areaType].price.filterSettings.minValue = stepArray[0].value;
				THAT.filtersBasedOnAreaType[areaType].price.filterSettings.maxValue = stepArray[stepArray.length - 1].value;
			}
		});


	}

	createSqrFootOptions(seachableData) {
		let THAT = this;

		let uniquesBasedOnAreaTypes = {};
		let sqrFootListBasedOnAreaTypes = {};

		this.AREA_TYPES.toList().forEach(function (areaType) {
			uniquesBasedOnAreaTypes['' + areaType] = [];
			sqrFootListBasedOnAreaTypes['' + areaType] = []
		});

		// let uniques = [];
		// let sqrFootList = [];
		if (!seachableData) {
			seachableData = this.searchableData;
		}
		// if (!this.filters.sqrFoot || !this.filters.sqrFoot.filterSettings ) {
		// 	return;
		// }
		// if (!this.filters.sqrFoot.filterSettings.sqrFootlist || this.filters.sqrFoot.filterSettings.sqrFootlist.length === 0) {}
		for (let o = 0; o < seachableData.length; o++) {
			if (seachableData[o].RENDERATOR.dataEntry && seachableData[o].RENDERATOR.dataEntry.sqrFoot) {

				let uniques = uniquesBasedOnAreaTypes[seachableData[o].RENDERATOR.dataEntry.areaType];
				let sqrFootList = sqrFootListBasedOnAreaTypes[seachableData[o].RENDERATOR.dataEntry.areaType];

				if (uniques.indexOf(seachableData[o].RENDERATOR.dataEntry.sqrFoot) === -1) {
					let splitted;
					let sqrFoot = seachableData[o].RENDERATOR.dataEntry.sqrFoot;
					if (sqrFoot.split(',').length > 2) {
						splitted = sqrFoot.replace(/,([^,]*)$/, '.$1');
					} else {
						splitted = sqrFoot;
					}
					let realsqrFoot = parseFloat(splitted.replace(/,/g, ''));
					sqrFootList.push({ value: realsqrFoot, name: seachableData[o].RENDERATOR.dataEntry.sqrFoot });
					uniques.push(seachableData[o].RENDERATOR.dataEntry.sqrFoot);
				}
			}
		}

		THAT.AREA_TYPES.toList().forEach(function (areaType) {

			let sqrFootList = sqrFootListBasedOnAreaTypes[areaType];

			sqrFootList.sort(function (a, b) { return a.value - b.value; });

			if (sqrFootList.length > 0) {
				let stepArray = [];
				let MIN_VALUE = sqrFootList[0].value;
				let MAX_VALUE = sqrFootList[sqrFootList.length - 1].value;
				let DIFFERENCE = MAX_VALUE - MIN_VALUE;
				let step = 500;
				let numOptions = Math.ceil(DIFFERENCE / step);
				let startingFrom = parseInt(MIN_VALUE / step, 10) * step;
				for (let n = 0; n < numOptions + 2; n++) {
					stepArray.push({ value: startingFrom + n * 500, name: startingFrom + n * 500 + ' $' });
				}
				//--this.sqrFootlist = stepArray;
				THAT.filtersBasedOnAreaType[areaType].sqrFoot.filterSettings.sqrFootlist = stepArray;
				THAT.filtersBasedOnAreaType[areaType].sqrFoot.filterSettings.minValue = stepArray[0].value;
				THAT.filtersBasedOnAreaType[areaType].sqrFoot.filterSettings.maxValue = stepArray[stepArray.length - 1].value;
			}
		});
	}

	isFilterWithAreaTypeVisible(areaType, currentActivatedFilters) {
		let visible = false;
		let filters = this.filtersBasedOnAreaType[areaType];

		for (let prop in filters) {
			let filterItem = filters[prop];

			if (currentActivatedFilters.includes(prop) && filterItem.visible) {
				visible = true
				break;
			}
		}

		return visible;
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

		this.AREA_TYPES.toList().forEach(function (areaType) {

			let filters = {
				'availability': null,
				'layouts': null,
				'price': null,
				'finishes': null,
				// 'optionals': null ,
				'agent': null,
				'appartmentName': null,
				'orientation': null,
				'sqrFoot': null,
				'occupancy': null
			};

			for (let p in filters) {
				filters[p] = THAT.createFilterObj(p);
			}

			THAT.filtersBasedOnAreaType['' + areaType] = filters;

		});


		// this.filters = {
		//     'availability': null ,
		//     'layouts': null ,
		//     'price': null ,
		//     'finishes': null ,
		//     // 'optionals': null ,
		//     'agent': null ,
		//     'appartmentName': null,
		//     'orientation': null,
		//     'sqrFoot': null,
		//     'occupancy': null
		// };
		// for (let p in this.filters) {
		//     this.filters[p] = this.createFilterObj(p);
		//     // this.actives[p] = null;
		// }
		this.gatherAreaOptions(areasArray);
		this.createPriceOptions(areasArray);

		this.createSqrFootOptions(areasArray);

		this.filters = this.filtersBasedOnAreaType[this.AREA_TYPES.APARTMENT];
		this.filters['occupancy'].defaultValue = '';

		this.filters['appartmentName'].defaultValue = '';
		this.filters['layouts'].filterSettings.options.unshift({ name: 'Any', value: null, checked: true, dontApplyToSearch: true });
		this.filters['finishes'].filterSettings.options.unshift({ name: 'Any', value: null, checked: true, dontApplyToSearch: true });
		this.filters['agent'].filterSettings.options.unshift({ name: 'Any', value: null, checked: true, dontApplyToSearch: true });
		this.filters['orientation'].filterSettings.options.unshift({ name: 'Any', value: null, checked: true, dontApplyToSearch: true });


		this.filters['availability'].filterSettings.options.unshift({ name: false, value: false, checked: false });
		this.filters['availability'].filterSettings.options.unshift({ name: true, value: true, checked: false });
		this.filters['availability'].defaultValue = true;
		this.selectFilterOption('availability', true);

		// this.filters['areaType'] = this.createFilterObj('areaType');
		// this.filters['areaType'].filterSettings.options.unshift({ name: 'appartment', value: 'appartment', checked: true });
		// this.filters['areaType'].filterSettings.options.unshift({ name: 'amenity', value: 'common', checked: false });
		// this.filters['areaType'].filterSettings.options.unshift({ name: 'commercial', value: 'commercial', checked: false });
		// this.filters['areaType'].defaultValue = 'appartment';



		this.AREA_TYPES.toList().forEach(function (areaType) {


			let filters = THAT.filtersBasedOnAreaType[areaType];

			for (let propName in filters) {
				if (propName === 'price') {
					if (filters[propName].filterSettings.pricelist.length === 0) {
						filters[propName].visible = false;
					} else {
						filters[propName].visible = true;
					}
				} else if (propName === 'sqrFoot') {
					if (filters[propName].filterSettings.sqrFootlist.length === 0) {
						filters[propName].visible = false;
					} else {
						filters[propName].visible = true;
					}
				} else {
					if (filters[propName].filterSettings.options.length === 0) {
						filters[propName].visible = false;
					} else {
						filters[propName].visible = true;
					}
				}
			}

			

			filters['areaType'] = THAT.createFilterObj('areaType');
			filters['areaType'].filterSettings.options.unshift({ name: 'appartment', value: 'appartment', checked: true });
			filters['areaType'].filterSettings.options.unshift({ name: 'amenity', value: 'common', checked: false });
			filters['areaType'].filterSettings.options.unshift({ name: 'commercial', value: 'commercial', checked: false });
			filters['areaType'].defaultValue = 'appartment';

			console.log('areaType', areaType, THAT.filtersBasedOnAreaType[areaType])
			console.log('-----')
		});

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
		function scanAreaProps(filters, areaData, areaType) {
			for (let pr in areaData) {
				if (
					(
						filters.hasOwnProperty(pr)
						|| filters.hasOwnProperty(THAT.matchAreaDataWithFilterProp(pr))
					)
					&& !/(occupancy|sqrFoot|price|appartmentName|optionals|availability)/.test(pr)) {
					let filterPr = THAT.matchAreaDataWithFilterProp(pr);
					if (!uniqueOptions.hasOwnProperty(filterPr)) {
						uniqueOptions[filterPr] = [];
					}
					if (uniqueOptions[filterPr].indexOf(areaData[pr]) === -1 && areaData[pr] != null) {
						uniqueOptions[filterPr].push(areaData[pr]);
						filters[filterPr].filterSettings.options.push({ name: areaData[pr], value: areaData[pr], checked: false });
					}
				}
			}
		}
		for (let k = 0; k < areasArray.length; k++) {
			if (areasArray[k].hasOwnProperty('RENDERATOR') && areasArray[k].RENDERATOR.dataEntry) {
				let areaType = areasArray[k].RENDERATOR.dataEntry.areaType;
				scanAreaProps(THAT.filtersBasedOnAreaType['' + areaType], areasArray[k].RENDERATOR.dataEntry, areaType);
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
				if ((inst.filters.hasOwnProperty(pr) || inst.filters.hasOwnProperty(THAT.matchAreaDataWithFilterProp(pr)))
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
	applyFilter(filterProp) { }

	appartmentHasFilters() {
		for (let f in this.filters) {
			if (f !== 'areaType' && f !== 'appartmentName') {
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
				'agent': true,
				'appartmentName': true,
				'orientation': true,
				'areaType': true,
				'sqrFoot': true,
				'occupancy': true
			},
			'common': {
				'orientation': true,
				'price': true,
				'sqrFoot': true,
				'areaType': true
			},
			'commercial': {
				'orientation': true,
				'price': true,
				'sqrFoot': true,
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
			if (this.filters[filterProp].visible && this.isFilterOfAreaType(filterProp, areaType)) {
				/* for dropdowns */
				this.parseFilterOptions(filterProp, function (option) {
					if (option.checked === true && !option.dontApplyToSearch) {
						activeFilters[filterProp] = JSON.parse(JSON.stringify(THAT.filters[filterProp]));
					}
				});
				/* for price */
				if (filterProp === 'price' && (this.filters[filterProp].rangeValue.min || this.filters[filterProp].rangeValue.max)) {
					activeFilters[filterProp] = JSON.parse(JSON.stringify(THAT.filters[filterProp]));
				}
				/* for sqrFoot */
				if (filterProp === 'sqrFoot' && (this.filters[filterProp].rangeValue.min || this.filters[filterProp].rangeValue.max)) {
					activeFilters[filterProp] = JSON.parse(JSON.stringify(THAT.filters[filterProp]));
				}
				/* for occupancy */
				if (filterProp === 'occupancy' && (this.filters[filterProp].filterValue)) {
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
			if (['layouts', 'finishes', 'agent'].indexOf(f) > -1) {
				this.selectFilterOption(f, null);
			} else if (f === 'price') {
				this.filters['price'].rangeValue.min = null;
				this.filters['price'].rangeValue.max = null;
			} else if (f === 'sqrFoot') {
				this.filters['sqrFoot'].rangeValue.min = null;
				this.filters['sqrFoot'].rangeValue.max = null;
			}
			else if (f === 'availability') {
				this.selectFilterOption('availability', true);
			} else if (f === 'areaType') {
				// this.selectFilterOption('areaType', 'appartment');
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
		this.parseFilterOptions(filterProp, function (option) {
			// if (THAT.filters[filterProp].filterValue !== THAT.filters[filterProp].defaultValue) {
			option.checked = false;
			// }
		});
		this.filters[filterProp].filterValue = this.filters[filterProp].defaultValue || null;

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
		this.parseFilterOptions(filterProp, function (option) {
			if (option.value === val) {
				option.checked = true;
				THAT.filters[filterProp].filterValue = val;
			}
		});
	}
	switchFilterSettings(areaType) {
		this.filters = this.filtersBasedOnAreaType[areaType];
	}
	isFilterOptionChecked(filterProp, val) {
		if (this.filters[filterProp].filterValue === val) {
			return true;
		} else {
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

	mounted() {

	},
	beforeUpdate() {
	},
	updated() { },
	methods: {
		getHTMLfilterTitle(filterObj) {
			if (!filterObj) { return ''; }
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
			if (!filterObj) { return ''; }
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
				return (filterObj.filterValue === 'true' || filterObj.filterValue === true) ? 'available' : 'unavailable';
			} else if (propName === 'areaType') {
				let values = {
					'appartment': 'residentials',
					'common': 'amenities',
					'commercial': 'commercials'
				};
				return values[filterObj.filterValue];
			} else if (propName === 'appartmentName') {
				if (!filterObj.filterValue) {
					return 'NOT SET';
				} else {
					return filterObj.filterValue;
				}
			} else {
				return filterObj.filterValue;
			}
		},
		deactivateFilter(filterObj) {
			this.filterklass.deactivateFilter(filterObj);


			if (!this.activefilters.length) {
				console.log("activated actives: ", this.activefilters.length);
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



Vue.component('filter-menu-component', {
	props: ['filters', 'filterklass', 'lastsearch', 'areatype', 'datamodel'],

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


	data: function () {
		return {
			amenityName: "Amenities",
			agentName: "Agent",
			finishName: "Finishes",
			areaTypes: [],
			activatedFilters: [],
			isCommercialVisible: false,
			isAmmenitiesVisible: false,
			squareSlider: [0, 0],
			priceSlider: [0, 0],


			priceRange: {
				min: 0,
				max: 0
			},

			squareRange: {
				min: 0,
				max: 0
			},

			dotOptions: [{
				tooltip: 'always'
			}, {
				tooltip: 'always'
			}],
			squareFormatter: function (value) {
				return `${('' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} sqft`
			},
			priceFormatter: function (value) {
				return `$ ${('' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
			},
			squareMarker: {
			},
			priceMarker: {
			},
			startX: 0,
			scrollLeft: 0,
			isMouseDown: false
		}
	},
	components: {
		VueSlider: window['vue-slider-component']
	},
	watch: {
		filters: {

			handler: function (filteredData) {
				let THAT = this;

				if (!filteredData) return;

				console.log('THAT', THAT);

				THAT.initializeSliders(filteredData);

				THAT.isCommercialVisible = THAT.filterklass.isFilterWithAreaTypeVisible('commercial', THAT.activatedFilters);
				THAT.isAmmenitiesVisible = THAT.filterklass.isFilterWithAreaTypeVisible('common', THAT.activatedFilters);
			},
			deep: false,
			immediate: true
		}
	},
	beforeCreate() {

		if (!window.VUE_RADIO_uuiidd) {
			window.VUE_RADIO_uuiidd = 0;
		}
		this.uuiidd = window.VUE_RADIO_uuiidd;
		window.VUE_RADIO_uuiidd++;

	},
	mounted() {
		console.log(
			" loaded model data : ", this.datamodel
		);

		if (this.datamodel.filterArray) {
			this.datamodel.filterArray.map(item => {
				switch (item.matchProperty) {
					case "finish":
						this.finishName = item.name;
						break;
					case "agent":
						this.agentName = item.name;
						break;
					case "amenity":
						this.amenityName = item.name;
						break;
					default:
						break;
				}
				console.log('item', item.name + '' + item.matchFilterProp);
				if (item.active) {
					this.activatedFilters.push(item.matchFilterProp);
				}

			});
		}



		if (!this.areaType) {
			this.areaType = ['appartment'];
		}

		console.log("current filter", this.filters);
		console.log('');
		console.log('this.activatedFilters', this.activatedFilters);



	},
	beforeUpdate() {
		if (this.filters.areaType && this.filters.areaType.filterValue) {
			this.areaType = this.filters.areaType.filterValue;
		}

	},
	updated() {
		this.calculateHeights();
		if ($(this.$el).parent().hasClass('filter-menu-closed')) {
			this.filterklass.updateFiltersMenuPosition();
		}
	},
	methods: {
		isValidLayout(layoutValue) {
			let flag = false;
			if (!layoutValue) flag = true;
			else {
				this.datamodel.adminOptions.layout.map(item => {
					if (item.name == layoutValue)
						flag = true;
				});
			}
			return flag;

		},
		getUniqueVue() {
			return this.uuiidd;
		},
		applyAllFilters() {

			if (this.filters.price) {
				
				if (this.priceSlider[0] === this.filters.price.filterSettings.minValue && this.priceSlider[1] === this.filters.price.filterSettings.maxValue) {
					this.filters.price.rangeValue.min = undefined;
					this.filters.price.rangeValue.max = undefined;
				} else {
					this.filters.price.rangeValue.min = this.priceSlider[0];
					this.filters.price.rangeValue.max = this.priceSlider[1];
				}
			}

			if (this.filters.sqrFoot) {

				if (this.squareSlider[0] === this.filters.sqrFoot.filterSettings.minValue && this.squareSlider[1] === this.filters.sqrFoot.filterSettings.maxValue) {
					this.filters.sqrFoot.rangeValue.min = undefined;
					this.filters.sqrFoot.rangeValue.max = undefined;
				} else {
					this.filters.sqrFoot.rangeValue.min = this.squareSlider[0];
					this.filters.sqrFoot.rangeValue.max = this.squareSlider[1];
				}

			}


			this.filterklass.applyAllFilters(this.areaType);
		},
		clearAllFilters() {

			$('.scroll-box').scrollLeft(0);

			//price
			if (this.filters.price) {
				this.priceSlider = [
					this.filters.price.filterSettings.minValue,
					this.filters.price.filterSettings.maxValue
				];
			}

			// square
			if (this.filters.sqrFoot) {
				this.squareSlider = [
					this.filters.sqrFoot.filterSettings.minValue,
					this.filters.sqrFoot.filterSettings.maxValue
				];

			}

			this.filterklass.clearAllFilters();

			this.filterklass.selectFilterOption('areaType', this.areaType);

		},

		/* dropdowns */
		toggleFilterDropdown(filterProp) {
			this.filterklass.toggleFilterDropdown(filterProp);
			//this.filters[filterProp].dropdown.isOpen = !this.filters[filterProp].dropdown.isOpen;
		},
		openFilterDropdown(filterProp) {
			this.filterklass.openFilterDropdown(filterProp);
			//this.filters[filterProp].dropdown.isOpen = true;
		},
		closeFilterDropdown(filterProp) {
			this.filterklass.closeFilterDropdown(filterProp);
			//this.filters[filterProp].dropdown.isOpen = false;
		},
		isFilterDropdownOpen(filterProp) {
			return this.filterklass.isFilterDropdownOpen(filterProp);
            /*
            if (this.filters[filterProp].dropdown.isOpen) {
              return true;
            }
            return false;
            */
		},
		calcFilterDropdownHeight(propName) {
			let bd = $(this.$el).find('.filter-' + propName + '-section .filter-body').eq(0);
			// if (bd.attr('calced_height')) {
			// return parseInt(bd.attr('calced_height'),10);
			// }
			let cloneBodyOptions = bd.clone();
			cloneBodyOptions.css({ 'height': 'auto', 'visibility': 'visible', 'display': 'inline-block', 'width': '600px' });
			//$('.container-fluid').append(cloneBodyOptions);
			bd.parent().append(cloneBodyOptions);
			let calcedHeight = cloneBodyOptions.height();
			cloneBodyOptions.remove();
			// bd.attr('calced_height', calcedHeight);
			return calcedHeight;
		},
		calculateHeights() {
			for (let propName in this.filters) {
				if (this.isFilterDropdownOpen(propName)) {
					let h = this.calcFilterDropdownHeight(propName);
					if (propName === 'price') {
						// h = 95;
					}
					$(this.$el).find('.filter-' + propName + '-section').find('.filter-body.has-height-transition').css('height', 'inherit');
				} else {
					// $(this.$el).find('.filter-' + propName +'-section').find('.filter-body.has-height-transition').css('height', '0px');
				}
			}
		},
		/* filter options */
		parseFilterOptions(filterProp, callback) {
			this.filterklass.parseFilterOptions(filterProp, callback);
		},
		clearFilterOptions(filterProp) {
			this.filterklass.clearFilterOptions(filterProp);
		},
		selectFilterOption(filterProp, val) {
			this.filterklass.selectFilterOption(filterProp, val);
		},
		isFilterOptionChecked(filterProp, val) {
			return this.filterklass.isFilterOptionChecked(filterProp, val);
		},
		noFilterOptionChoosed(filterProp) {
			return this.filterklass.noFilterOptionChoosed(filterProp);
		},
		switchFilters(event) {
			var areaType = event.target.value;

			$('.filter-types .custom-control-input').prop('checked', false);
			$('.filter-types .custom-control-input').prop('disabled', false)

			$(".filter-types input[value='" + areaType + "'").prop('checked', true);
			$(".filter-types input[value='" + areaType + "'").prop('disabled', true);

			this.filterklass.switchFilterSettings(areaType);

			this.initializeSliders(this.filters);

			this.areaType = areaType;

			this.selectFilterOption('areaType', this.areaType);

			this.$forceUpdate();

		},
		initializeSliders(filteredData) {

			//price
			if (filteredData.price) {
				this.priceSlider = [
					filteredData.price.filterSettings.minValue,
					filteredData.price.filterSettings.maxValue
				];

				this.priceRange = {
					min: filteredData.price.filterSettings.minValue,
					max: filteredData.price.filterSettings.maxValue
				};


				this.priceMarker = {};
				this.priceMarker['' + filteredData.price.filterSettings.minValue] = 'Starting from $' + ('' + filteredData.price.filterSettings.minValue).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				this.priceMarker['' + filteredData.price.filterSettings.maxValue] = '$' + ('' + filteredData.price.filterSettings.maxValue).replace(/\B(?=(\d{3})+(?!\d))/g, ',');


			}

			// square
			if (filteredData.sqrFoot) {
				this.squareSlider = [
					filteredData.sqrFoot.filterSettings.minValue,
					filteredData.sqrFoot.filterSettings.maxValue
				];

				this.squareRange = {
					min: filteredData.sqrFoot.filterSettings.minValue,
					max: filteredData.sqrFoot.filterSettings.maxValue
				};

				this.squareMarker = {};
				this.squareMarker['' + filteredData.sqrFoot.filterSettings.minValue] = 'Min ' + ('' + filteredData.sqrFoot.filterSettings.minValue).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
				this.squareMarker['' + filteredData.sqrFoot.filterSettings.maxValue] = 'Max ' + ('' + filteredData.sqrFoot.filterSettings.maxValue).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}

		},
		onlyNumbersHere(val) {
			val = val.replace(/[^0-9]+/g, "");
			return val;
		},

		/**
		 * Mouse event
		 */
		startScrolling(event) {
			this.isMouseDown = true;
			var container = event.target.parentElement;
			this.startX = event.pageX - container.offsetLeft;
			this.scrollLeft = container.scrollLeft;
		},
		scrolling(event) {
			if (!this.isMouseDown) return;
			event.preventDefault();

			var container = event.target.parentElement
			const x = event.pageX - container.offsetLeft;
			const distance = (x - this.startX) * 3;
			container.scrollLeft = this.scrollLeft - distance;
		},
		cancelScrollingOnMouseLeave(event) {
			this.isMouseDown = false;
		},
		cancelScrollingOnMouseUp(event) {
			this.isMouseDown = false;
		},
		areaTypeSelected(areaType) {
			return false || this.areaType.includes(areaType);
		},
		filterActivated(prop) {
			return this.activatedFilters.includes(prop);
		}

	},
	template:/*html*/
		`<div class="filter-section" v-if="filters">
	<div class="filter-section-header">
		<div class="row d-flex align-items-center h-100">
			<div class="col-5 header-title">FILTERS</div>
			<div class="col-7 header-results-num">{{(lastsearch.numResults===0?'No':lastsearch.numResults)}} matching
				properties</div>
		</div>
	</div>

	<div class="filter-section-body p-3">

		<div class="filter-types p-3" style="display: inline-flex;">
			<div class="form-check-inline" style="margin-left: .75rem; margin-right: 1rem;">
				<div class="custom-control custom-checkbox ">
					<input type="checkbox" class="custom-control-input" v-bind:name="getUniqueVue() + '_areatype'"
						value="appartment" id="checkBoxAppartment" disabled="disabled" checked="checked"
						v-on:click="switchFilters">
					<label class="custom-control-label" for="checkBoxAppartment">RESIDENTIALS</label>
				</div>

			</div>
			<div class="form-check-inline" style="margin-left: .75rem;margin-right: 0.5rem;" v-if="isCommercialVisible">
				<div class="custom-control custom-checkbox ">
					<input type="checkbox" class="custom-control-input" v-bind:name="getUniqueVue() + '_areatype'"
						value="commercial" id="checkBoxCommercial" v-on:click="switchFilters">
					<label class="custom-control-label" for="checkBoxCommercial">COMMERCIAL</label>
				</div>

			</div>
			<div class="form-check-inline" style="margin-left: .75rem;margin-right: 0.5rem;" v-if="isAmmenitiesVisible">
				<div class="custom-control custom-checkbox ">
					<input type="checkbox" class="custom-control-input" v-bind:name="getUniqueVue() + '_areatype'"
						id="checkBoxAmennities" value="common" v-on:change="switchFilters">
					<label class="custom-control-label" for="checkBoxAmennities">AMENITIES</label>

				</div>
			</div>

		</div>

		<div class="filters" v-if="areaType==='appartment' || areaType==='commercial' || areaType==='common'"
			v-bind:class="{'centerized-child':!filterklass.appartmentHasFilters() }">

			<!--Layout -->
			<div class="filter filter-layouts-section" v-if="filters.layouts && filters.layouts.visible &&  filterActivated('layout')"
				v-bind:class="{'dropdown-open': isFilterDropdownOpen('layouts') }">
				<div class="filter-header" v-on:click="toggleFilterDropdown('layouts')">
					<div class="h4">Layout</div>
				</div>
				<div class="scroll-box mb-4">
					<div class="d-flex scroll-box-content" v-on:mousedown="startScrolling" v-on:mousemove="scrolling"
						v-on:mouseup="cancelScrollingOnMouseUp" v-on:mouseleave="cancelScrollingOnMouseLeave">
						<div type="button" class="btn border m-1"
							v-bind:class="{'filter-menu-item-selected': layoutOption.checked}"
							v-for="(layoutOption, index) in filters.layouts.filterSettings.options"
							v-on:click="selectFilterOption('layouts', layoutOption.value);"
							v-if="isValidLayout(layoutOption.value)">
							{{layoutOption.name}}
						</div>
					</div>
				</div>
				<div class="filter-separator"></div>
			</div>


			<!--Square Feet -->
			<div class="filter filter-sqrFoot-section" 
				v-if="filters.sqrFoot && filters.sqrFoot.visible &&  filterActivated('sqrFoot')" 
				v-bind:class="{'dropdown-open': isFilterDropdownOpen('sqrFoot') }">

				<div class="filter-header" v-on:click="toggleFilterDropdown('sqrFoot')">
					<div class="h4">Square Feet</div>
				</div>

				<div class="pt-4 pb-4 pl-4 pr-5">
					<vue-slider :min="squareRange.min" :max="squareRange.max" :marks="squareMarker" 
						:tooltip-formatter="squareFormatter" 
						v-model="squareSlider" :dot-options="dotOptions"></vue-slider>
				</div>
				<div class="filter-separator"></div>
			</div>

			<!--Finishes -->
			<div class="filter filter-finishes-section" 
				v-if="filters.finishes && filters.finishes.visible &&  filterActivated('finishes')" 
				v-bind:class="{'dropdown-open': isFilterDropdownOpen('finishes') }">
				<div class="filter-header" v-on:click="toggleFilterDropdown('finishes')">
					<div class="h4">{{finishName}}</div>
				</div>
				<div class="scroll-box mb-4">
					<div class="d-flex scroll-box-content" v-on:mousedown="startScrolling" v-on:mousemove="scrolling"
						v-on:mouseup="cancelScrollingOnMouseUp" v-on:mouseleave="cancelScrollingOnMouseLeave">
						<button type="button" class="btn border m-1  "
							v-bind:class="{'filter-menu-item-selected': finishOption.checked}"
							v-if="filters.finishes && filters.finishes.filterSettings"
							v-for="(finishOption, index) in filters.finishes.filterSettings.options"
							v-on:click="selectFilterOption('finishes', finishOption.value)">
							{{finishOption.name}}
						</button>
					</div>
				</div>
				<div class="filter-separator"></div>
			</div>

			<!-- Suite name -->

			<div class="filter filter-agent-section" v-if="filters.agent && filters.agent.visible &&  filterActivated('agent')">

				<div class="filter-header" >
					<div class="h4">{{agentName}}</div>

				</div>
				<div class="scroll-box mb-4">
					<div class="d-flex scroll-box-content" v-on:mousedown="startScrolling" v-on:mousemove="scrolling"
						v-on:mouseup="cancelScrollingOnMouseUp" v-on:mouseleave="cancelScrollingOnMouseLeave">
						<button type="button" class="btn border m-1 "
							v-bind:class="{'filter-menu-item-selected': agentOption.checked}"
							v-for="(agentOption, index) in filters.agent.filterSettings.options"
							v-on:click="selectFilterOption('agent', agentOption.value);">
							{{agentOption.name}}
						</button>
					</div>

				</div>
				<div class="filter-separator"></div>
			</div>

			<!-- Prices -->
			<div class="filter filter-price-section" v-if="filters.price && filters.price.visible &&  filterActivated('price')">
				<div class="filter-header" v-on:click="toggleFilterDropdown('price')">
					<div class="h4">Price</div>

				</div>
				<div class="pt-4 pb-4 pl-4 pr-5">
					<vue-slider :min="priceRange.min" :max="priceRange.max" 
						:tooltip-formatter="priceFormatter" 
						:marks="priceMarker" v-model="priceSlider"
						:dot-options="dotOptions"></vue-slider>
				</div>

				<div class="filter-separator mt-2"></div>
			</div>

			<!-- Occupation -->
			<!--
			<div class="filter filter-occupancy-section" v-if="filters.occupancy && filters.occupancy.visible" >
				<div class="filter-header" >
					<div class="h4">Occupancy</div>
				</div>
				<div class="scroll-box mb-4">

					<div class="d-flex scroll-box-content" v-on:mousedown="startScrolling" v-on:mousemove="scrolling"
						v-on:mouseup="cancelScrollingOnMouseUp" v-on:mouseleave="cancelScrollingOnMouseLeave">
						<button type="button" class="btn border m-1 "
							v-bind:class="{'filter-menu-item-selected': occupancyOption.checked}"
							v-for="(occupancyOption, index) in filters.occupancy.filterSettings.options"
							v-on:click="selectFilterOption('occupancy', occupancyOption.value);">
							{{occupancyOption.name}}
						</button>
					</div>
				</div>
			</div>
			-->

			<!-- Orentation-->

			<div class="filter filter-orientation-section" v-if="filters.orientation && filters.orientation.visible &&  filterActivated('orientation')">
				<div class="filter-header">
					<div class="h4">Orientation</div>
				</div>
			
				<div class="scroll-box mb-4">
					<div class="d-flex scroll-box-content" v-on:mousedown="startScrolling" v-on:mousemove="scrolling"
						v-on:mouseup="cancelScrollingOnMouseUp" v-on:mouseleave="cancelScrollingOnMouseLeave">
						<button type="button" class="btn border m-1 "
							v-bind:class="{'filter-menu-item-selected': orientationOption.checked}"
							v-for="(orientationOption, index) in filters.orientation.filterSettings.options"
							v-on:click="selectFilterOption('orientation', orientationOption.value);">
							{{orientationOption.name}} 
						</button>
					</div>

				</div>
				<div class="filter-separator"></div>
				
			</div>

			<!-- availabiblity-->
			<div class="filter filter-availability-section" v-if="filters.availability && filters.availability.visible &&  filterActivated('availability')"
				v-bind:class="{'dropdown-open': isFilterDropdownOpen('availability') }">
				<div class="filter-header" v-on:click="toggleFilterDropdown('availability')">
					<div class="h4">Availability</div>

				</div>
				<div class="scroll-box mb-4">
					<div class="d-flex scroll-box-content" v-on:mousedown="startScrolling" v-on:mousemove="scrolling"
						v-on:mouseup="cancelScrollingOnMouseUp" v-on:mouseleave="cancelScrollingOnMouseLeave">
						<button type="button" class="btn  border m-1"
							v-bind:class="{'filter-menu-item-selected': availabilityOption.checked}"
							v-for="(availabilityOption, index) in filters.availability.filterSettings.options"
							v-on:click="selectFilterOption('availability', availabilityOption.value);">
							{{(availabilityOption.name===true)?'Available':'Unavailable'}}
						</button>
					</div>

				</div>
			</div>

		</div>
	</div>


	<div class="filter-section-actions ">
		<div class="d-flex justify-content-around">
			<div d-flex align-items-center justify-content-around>
				<button type="button" class="btn btn-lg btn-border " v-on:click="filterklass.closeFiltersMenu()">Close
					Filters</button>
				<button type="button" class="btn btn-lg btn-border primary-background-color  text-white font-weight-bold"
					v-on:click="applyAllFilters()">Apply</button>
			</div>
			<div class="d-flex align-items-center actions">
				<span v-on:click="clearAllFilters()">Reset all filters</span>
			</div>
		</div>
	</div>

	<div class="filter-section-footer d-flex align-items-center justify-content-around ">
		<div class="h4 ">
				{{datamodel.buildingAddress}}
		</div>
		<!--
		<div class="filter-section-logo" style="height: 15px;padding-left:20px;display: none;">
			<img src="assets/suitesflow.png" height="100%;padding:2px;">
		</div>
		-->
	</div>
</div>`

});

<!DOCTYPE html>
<html>

<head>
	<link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">

	<!-- META -->
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">


	<title>"Get rid of complicated database-style pages from your website"</title>
	<meta charset="utf-8" />

	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="stylesheet" href="bootstrap_4/dist/css/bootstrap.min.css" />
	<link href="fontawesome-free-5.7.1-web/css/all.css" rel="stylesheet">

	<!-- SEO -->
	<meta name="title" property="og:title" content="Get rid of complicated database-stile pages from your website">
	<meta name="description" property="og:description" content="Show your users matching-properties in your buildings in one-click">
	<meta name="image" property="og:image" content="/assets/SuitesFlow-thumb.jpg">

	<script src="libs/jquery.min.js"></script>
	<script src="libs/jquery-ui.js"></script>
	<link rel="stylesheet" href="libs/jquery-ui.css">
	<script src="bootstrap_4/dist/js/popper.min.js"></script>
	<script src="bootstrap_4/dist/js/bootstrap.min.js"></script>

	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
	<link href="libs/pretty-checkbox.min.css" rel="stylesheet">

	<link href="css/front-end/building-info-component.css" rel="stylesheet">
	<link href="css/front-end/elevation-filters-component.css" rel="stylesheet">
	<link href="css/front-end/cardinals-component.css" rel="stylesheet">
	<link href="css/front-end/amenities-component.css" rel="stylesheet">
	<link href="css/front-end/appartment-component.css" rel="stylesheet">
	<link href="css/front-end/enquire-modal.css" rel="stylesheet">
	<link href="css/front-end/tablet.css" rel="stylesheet">
	<link href="js/jquery/jquery.mCustomScrollbar.min.css" rel="stylesheet">


	<script src="libs/vue.min.js"></script>
	<script src="libs/fabric.2.4.6.min.js"></script>
	<script src="libs/moment.min.js"></script>
	<script src="libs/tinycolor-min.js"></script>
	<script src="libs/colorpicker/bootstrap-colorpicker.min.js"></script>
	<link href="libs/colorpicker/bootstrap-colorpicker.min.css" rel="stylesheet">
	<link href="css/front-end/customization-bar.css" rel="stylesheet">

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vue-slider-component@latest/theme/default.css">
    <script src="https://cdn.jsdelivr.net/npm/vue-slider-component@latest/dist/vue-slider-component.umd.min.js"></script>


	<script src="js/front-end/vue-components/spinner-component.js"></script>
	<script src="js/front-end/vue-components/elevation-filters-component.js"></script>
	<script src="js/front-end/vue-components/cardinals-component.js"></script>
	<script src="js/front-end/vue-components/building-info-component.js"></script>
	<script src="js/front-end/vue-components/appartment-component-3d.js"></script>
	<script src="js/front-end/vue-components/splash_amenities-component.js"></script>
	<script src="js/front-end/vue-components/splash_enquire-modal-component-3d.js"></script>
	<script src="js/front-end/vue-components/splash_evelation-new-vertical-filters-component.js"></script>

	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">


	<script src="https://code.jquery.com/pep/0.4.2/pep.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.2/dat.gui.min.js"></script>


	<!-- DEVELOPMENT -->
	<!-- <script src="https://preview.babylonjs.com/babylon.max.js"></script> -->

	<!-- PRODUCTION-->
	<script src="https://preview.babylonjs.com/babylon.js"></script>

	<script src="https://preview.babylonjs.com/ammo.js"></script>
	<script src="https://preview.babylonjs.com/cannon.js"></script>
	<script src="https://preview.babylonjs.com/Oimo.js"></script>
	<script src="https://preview.babylonjs.com/gltf_validator.js"></script>
	<script src="https://preview.babylonjs.com/earcut.min.js"></script>
	<script src="https://preview.babylonjs.com/inspector/babylon.inspector.bundle.js"></script>
	<script src="https://preview.babylonjs.com/materialsLibrary/babylonjs.materials.min.js"></script>
	<script src="https://preview.babylonjs.com/proceduralTexturesLibrary/babylonjs.proceduralTextures.min.js"></script>
	<script src="https://preview.babylonjs.com/postProcessesLibrary/babylonjs.postProcess.min.js"></script>
	<script src="https://preview.babylonjs.com/loaders/babylonjs.loaders.js"></script>
	<script src="https://preview.babylonjs.com/serializers/babylonjs.serializers.min.js"></script>
	<script src="https://preview.babylonjs.com/gui/babylon.gui.min.js"></script>



	<style>
		.appartment-dialog a.message-link {
			font-family: 'Roboto', sans-serif !important;
		}
	</style>


	<style>
		html {
			overflow: hidden !important;
		}

		.spinner-section-general {
			position: fixed;
			left: 50%;
			top: 50%;
			width: 100px;
			margin: 0 auto;
			padding: 0px;
			transform: translate(-50%, -50%);
		}

		.spinner-section-general .spinner {
			animation: rotate 1.4s linear infinite;
			-webkit-animation: rotate 1.4s linear infinite;
			-moz-animation: rotate 1.4s linear infinite;
			width: 100px;
			height: 100px;
			position: relative;
		}

		.spinner-section-general .spinner-dot {
			width: 274px;
			height: 274px;
			position: relative;
			top: 0;
		}


		@keyframes rotate {
			to {
				transform: rotate(360deg);
			}
		}

		@-webkit-keyframes rotate {
			to {
				-webkit-transform: rotate(360deg);
			}
		}

		@-moz-keyframes rotate {
			to {
				transform: rotate(360deg);
			}
		}

		.path {
			stroke-dasharray: 170;
			stroke-dashoffset: 20;
		}
	</style>

	<style>
		/* not used col-0 but maybe use in future */
		.col-h-0 {
			flex: 0 0 100%;
			height: 0%;
			max-height: 0%;
		}


		.col-xs-0,
		.col-sm-0,
		.col-md-0,
		.col-lg-0,
		.col-xl-0 {
			flex: 0 0 100%;
			max-width: 0%;
		}


		/* loading spinner for each canvas */

		.front-end-app .spinner-section {
			position: fixed;
			left: 50%;
			top: 50%;
			width: 100px;
			margin: 0 auto;
			padding: 0px;
			transform: translate(-50%, -50%);
		}

		.front-end-app .spinner {
			animation: rotate 1.4s linear infinite;
			-webkit-animation: rotate 1.4s linear infinite;
			-moz-animation: rotate 1.4s linear infinite;
			width: 100px;
			height: 100px;
			position: relative;
		}

		.front-end-app .spinner-dot {
			width: 274px;
			height: 274px;
			position: relative;
			top: 0;
		}

		@keyframes rotate {
			to {
				transform: rotate(360deg);
			}
		}

		@-webkit-keyframes rotate {
			to {
				-webkit-transform: rotate(360deg);
			}
		}

		@-moz-keyframes rotate {
			to {
				transform: rotate(360deg);
			}
		}

		.front-end-app .spinner .path {
			stroke-dasharray: 170;
			stroke-dashoffset: 20;
		}

		.front-end-app .spinner-component.elevation-loading-spinner {
			position: absolute;
			top: 50%;
			left: 50%;
			-moz-transform: translate(-50%, -50%);
			-o-transform: translate(-50%, -50%);
			-ms-transform: translate(-50%, -50%);
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
		}
	</style>

	<style>
		HTML,
		BODY,
		.container-fluid.front-end-app,
		.container-fluid.front-end-app>.row {
			height: 100%;
		}

		.front-end-app .renderator-canvas-window-view,
		.front-end-app .view-screens,
		.front-end-app .virtual-tour-window-view,
		.front-end-app .floor-plan-window-view {
			overflow: hidden;
		}

		/* mouse over informer */

		.front-end-app .renderator-canvas-window-view .mouse-over-component-to-start {
			position: absolute;
			top: 50%;
			bottom: 50%;
			white-space: nowrap;
			left: 50%;
			transform: translateX(-50%);
		}

		.front-end-app .renderator-canvas-window-view .mouse-over-component-to-start span {
			font-size: 0.9rem;
			padding: 1.25rem;
			border-radius: 20px;
			background-color: rgba(255, 155, 0, 0.69);
			color: white;
			font-weight: bold;
		}


		/* line connector */

		.front-end-app .renderator-canvas-window-view svg.point-line {
			width: 1px;
			height: 1px;
			z-index: 9999;
			position: relative;
			overflow: visible;
			opacity: 0;
			pointer-events: none;
		}

		.front-end-app .renderator-canvas-window-view svg.point-line line {
			stroke: rgb(0, 0, 0);
			stroke-width: 1
		}


		/* handle colors, shadows, fonts etc */

		.front-end-app .renderator-canvas-window-view {
			box-shadow: 1px 1px 20px #908a8a;
			z-index: 1;
		}

		.front-end-app .virtual-tour-window-view {
			box-shadow: 2px 1px 30px #565656;
			box-shadow: 1px 1px 20px #908a8a;
		}

		.front-end-app .renderator-canvas-window-view {
			font-family: 'Montserrat', sans-serif;
		}

		.front-end-app .virtual-tour-window-view,
		.front-end-app .floor-plan-window-view {
			/*font-family: 'Raleway', sans-serif;*/
			font-family: 'Montserrat', sans-serif;
			color: #12678a;
		}

		.front-end-app .virtual-tour-window-view .big-title,
		.front-end-app .floor-plan-window-view .big-title {
			font-size: 2rem;
			font-weight: bold;
			line-height: 30px;
		}

		.front-end-app .elevation-canvas {
			display: none;
		}

		.front-end-app .elevation-canvas.active {
			display: block;
		}

		.front-end-app .expand-icon {
			font-size: 2.5rem;
			color: #12678a;
			position: absolute;
			right: 20px;
			bottom: 20px;
			top: auto;
			left: auto;
			cursor: pointer;
		}

		.front-end-app .group-bluez,
		.front-end-app .virtual-tour-window-view,
		.front-end-app .floor-plan-window-view,
		.front-end-app .building-info-component,
		.front-end-app .appartment-component,
		.front-end-app .expand-icon,
		.front-end-app .carousel-control-next-icon,
		.front-end-app .carousel-control-prev-icon {
			color: #12678a;
			color: #411c8b;
		}


		/* edit carousel arrows to be perfectly centered align */

		.front-end-app .carousel-control-next-icon,
		.front-end-app .carousel-control-prev-icon {
			width: 40px;
			height: 40px;
			background-size: 50% 50%;
			border-radius: 50%;
			background-position: 50% 50%;
			background-color: #12678a;
		}

		.front-end-app .carousel-control-prev-icon {
			background-position: 40% 50%;
		}

		.front-end-app .carousel-control-next-icon {
			background-position: 55% 50%;
		}


		/* min screens classes */

		.front-end-app .canvas-area {
			_position: absolute;
			_top: 50%;
			_transform: translateY(-50%);
		}

		.front-end-app .renderator-canvas-window-view {
			height: 100%;
			max-height: 100%;
		}

		.front-end-app .view-screens,
		.front-end-app .view-screens>.row {
			height: 100%;
			max-height: 100%;
		}

		.front-end-app .view-screens .virtual-tour-window-view,
		.front-end-app .view-screens .floor-plan-window-view {
			height: 50%;
			max-height: 50%;
			padding-left: 0px;
			padding-right: 0px;
		}

		.front-end-app .view-screens .floor-plan-window-view {
			/* padding-top: 15px; */
			__background-color: #bbbbbb;
		}

		.front-end-app .floor-plan-carousel {
			height: 100%;
			width: 100%;
		}


		/* handles expanded and minimized windows */

		.front-end-app .escape_badge {
			color: white;
			font-size: 20px;
			text-align: center;
		}

		.front-end-app .render-gallery-carousel,
		.front-end-app .floor-plan-carousel {
			width: 100%;
			overflow: auto;
		}

		.front-end-app .custom-responsive-carousel {
			width: 100%;
			height: 100%;
		}

		.front-end-app .custom-responsive-carousel .background-image-slide {
			width: 100%;
			height: 100%;
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			width: 50vw;
			height: 50vh;
		}

		.front-end-app .custom-responsive-carousel .carousel-inner {
			width: 100%;
			height: 100%;
		}

		.front-end-app .custom-responsive-carousel .carousel-item.active {
			height: 100%;
			width: 100%;
		}


		.front-end-app .iframe-virtual-tour .escape_badge,
		.front-end-app .render-gallery-carousel .escape_badge,
		.front-end-app .floor-plan-carousel .escape_badge {
			display: none;
			cursor: pointer;
			border-width: 0px;
		}

		.front-end-app .renderator-canvas-window-view.expanded-window .appartment-component,
		.front-end-app .renderator-canvas-window-view.expanded-window .amenities-component {
			left: 42%;
		}

		.front-end-app .renderator-canvas-window-view.expanded-window .appartment-component {
			right: auto;
		}


		.front-end-app .render-gallery-carousel.expanded-window,
		.front-end-app .floor-plan-carousel.expanded-window,
		.front-end-app .iframe-virtual-tour.expanded-window {
			width: auto;
			max-height: none;
			overflow: auto;
			position: fixed;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			z-index: 99999;
			background: black;
			__padding: 10px;
		}

		.front-end-app .iframe-virtual-tour.expanded-window .escape_badge,
		.front-end-app .render-gallery-carousel.expanded-window .escape_badge,
		.front-end-app .floor-plan-carousel.expanded-window .escape_badge {
			display: block;
		}

		.front-end-app .render-gallery-carousel.expanded-window .carousel-inner,
		.front-end-app .floor-plan-carousel.expanded-window .carousel-inner {
			display: -webkit-box !important;
			display: -ms-flexbox !important;
			display: flex !important;
			-webkit-box-align: center !important;
			-ms-flex-align: center !important;
			align-items: center !important;
		}

		.front-end-app .render-gallery-carousel.expanded-window .carousel-inner img,
		.front-end-app .floor-plan-carousel.expanded-window .carousel-inner img {
			width: 100%;
		}

		.front-end-app .floor-plan-carousel.expanded-window {
			padding-top: 5vh;
			padding-bottom: 5vh;
		}

		.front-end-app .floor-plan-carousel.expanded-window .carousel-inner .background-image-slide {
			width: 100vw;
			height: 90vh;
		}

		.front-end-app .render-gallery-carousel.expanded-window {
			padding-top: 0;
			padding-bottom: 0;
		}

		.front-end-app .render-gallery-carousel.expanded-window .carousel-inner .background-image-slide {
			width: 100vw;
			height: 100vh;
			background-size: contain;
		}

		.front-end-app .render-gallery-carousel .carousel-inner .background-image-slide {
			background-size: cover;
		}



		/* rendergalley media icons */
		.front-end-app .virtual-tour-window-view .render-gallery-carousel {
			padding-top: 0px;
			padding-bottom: 0px;
			background: rgba(0, 0, 0, 1);
		}

		.front-end-app .virtual-tour-window-view .render-gallery-carousel .carousel-control-prev,
		.front-end-app .virtual-tour-window-view .render-gallery-carousel .carousel-control-next {
			opacity: 1;
		}

		.front-end-app .virtual-tour-window-view .render-gallery-carousel .carousel-control-prev-icon,
		.front-end-app .virtual-tour-window-view .render-gallery-carousel .carousel-control-next-icon {
			background-image: none;
			background-color: transparent;
			color: #ffffff;
			text-shadow: 2px 2px 4px #000000;
			opacity: 1;
		}

		.front-end-app .virtual-tour-window-view .render-gallery-carousel .carousel-control-prev-icon:before,
		.front-end-app .virtual-tour-window-view .render-gallery-carousel .carousel-control-next-icon:before {
			margin-top: 50%;
			transform: translate(0%, -50%);
			display: inline-block;
			vertical-align: middle;
			font-size: 2rem;
			opacity: 1;
			visibility: visible;
		}




		/* set z-index */
		.front-end-app .escape_badge {
			position: fixed;
			top: 0px;
			left: 0px;
			background: rgba(0, 0, 0, 0.5);
			padding: 10px;
			z-index: 9999;
			left: 2px;
			top: 2px;
		}

		.rotate-icon {
			cursor: pointer;
			margin: 10px;
		}







		/* Z-INDEX HERE */

		.front-end-app .view-screens .virtual-tour-window-view {
			z-index: 2;
		}

		.front-end-app .view-screens .floor-plan-window-view {
			z-index: auto;
		}

		.front-end-app .renderator-canvas-window-view {
			z-index: 2;
		}

		.front-end-app .renderator-canvas-window-view .canvas-area {
			z-index: 2;
		}

		.front-end-app .renderator-canvas-window-view .expand-icon {
			z-index: 3;
		}

		.front-end-app .cardinals-component,
		.front-end-app .building-info-component,
		.front-end-app .renderator-canvas-window-view .filter-elevation-header-component,
		.front-end-app .filter-open-triggerer-container,
		.mouse-over-component-to-start {
			z-index: 3;
		}


		.front-end-app .renderator-canvas-window-view svg.point-line {
			z-index: 99;
		}

		.front-end-app .renderator-canvas-window-view .amenities-component {
			z-index: 100;
		}

		.front-end-app .renderator-canvas-window-view .appartment-component {
			z-index: 100;
		}

		.front-end-app .renderator-canvas-window-view .elevation-filters-component {
			z-index: 100;
		}

		.front-end-app .renderator-canvas-window-view .filter-menu-component {
			z-index: 101;
			min-width: 360px;
		}

		.front-end-app .renderator-canvas-window-view .enquire-modal-component {
			z-index: 102;
		}

		.front-end-app .renderator-canvas-window-view .spinner-component {
			background: white;
			z-index: 103;
		}

		.front-end-app .is-area-amenity .out-available,
		.front-end-app .is-area-commercial .out-available {
			display: none;
		}

		.front-end-app .is-area-amenity {
			color: orange;
		}

		.notransition {
			-webkit-transition: none !important;
			-moz-transition: none !important;
			-o-transition: none !important;
			transition: none !important;
		}

		/* Safari 4.0 - 8.0 */
		@-webkit-keyframes example {
			from {
				background-size: 100%;
			}

			to {
				background-size: 150%;
			}
		}

		/* Standard syntax */
		@keyframes example {
			from {
				background-size: 100%;
			}

			to {
				background-size: 150%;
			}
		}

		.load-screen-animate {

			-webkit-animation-name: example;
			/* Safari 4.0 - 8.0 */
			-webkit-animation-duration: 5s;
			/* Safari 4.0 - 8.0 */
			animation-name: example;
			animation-duration: 5s;

		}

		/* Safari 4.0 - 8.0 */
		@-webkit-keyframes example1 {
			from {
				background-size: 300%;
			}

			to {
				background-size: 400%;
			}
		}

		/* Standard syntax */
		@keyframes example1 {
			from {
				background-size: 300%;
			}

			to {
				background-size: 400%;
			}
		}

		.load-screen-animate-mobile {

			-webkit-animation-name: example1;
			/* Safari 4.0 - 8.0 */
			-webkit-animation-duration: 5s;
			/* Safari 4.0 - 8.0 */
			animation-name: example1;
			animation-duration: 5s;

		}
	</style>
	<style>
		.filter-elevation-header-component {
			position: relative;
			z-index: 1000;
			/*width: 100%;*/
			box-shadow: 0px 1px 4px #7d7b7b;
			min-height: 50px;
		}

		.filter-elevation-header-component .canvas-header {
			height: 100%;
		}

		.filter-tag-container {
			background-color: #e4e4e4;
			padding-top: 5px;
			padding-bottom: 5px;
		}

		.front-end-app .filter-tag {
			background-color: transparent;
			color: #6d6d6d;
			cursor: pointer;
		}

		.responsive-portait.front-end-app .filter-tag {
			background-color: #414141;
			color: white;
		}

		.front-end-app .close-filters-icon {
			cursor: pointer;
		}

		.open-filters-container {
			border-left: 2px solid #b1b1b1;
			cursor: pointer;
			text-align: center;
			color: #8c8b8b;
			letter-spacing: 0.4px;
			background-color: #ffffff;
		}

		.overflow-x-scroll{
			overflow-x: auto;
			overflow-y: hidden;
		}

		.filter-menu-component {
			height: 100%;
			width: 30%;
			position: absolute;
			background: #FAFAF9;
			top: 0px;
			right: 0;
			left: auto;
			border-left: 1px solid #e4e4e4;
			-webkit-transition: right .4s;
			/* Safari */
			transition: right .4s;
			font-size: 1rem;
		}

		.filter-section {

			height: 100%;
			/*
  position: absolute; 
  z-index: 100;
  background:#ff00007a;
  */
		}


		.filter-section-header {
			height: 50px;
			color: #ffffff;
			background-color: rgb(125, 71, 217);
			transition: width 2s;
		}

		.filter-section-header .header-title {
			text-align: left;
			padding-left: 30px;
			/*font-size: 21px;*/
			font-size: 1.5em;
		}

		.filter-section-header .header-results-num {
			text-align: right;
			padding-right: 30px;
			/*font-size: 11px;*/
			font-size: 0.8em;
		}

		.filter-section-body {
			height: calc(100% - 50px - 50px - 63px);
			position: relative;
			overflow-y: auto;
			overflow-x: hidden;
		}

		.filter-section-body .filter-types {
			padding-top: 10px;
			padding-bottom: 15px;
		}

		.filter-section-body .filter-types label {
			cursor: pointer;
		}

		.filter-section-body .filter-types input[type="radio"] {
			margin-right: .3125rem;
			margin-left: .3125rem;
		}

		.filter-section-body .filters.centerized-child {
			position: absolute;
			top: 50%;
			transform: translate(0%, -50%);
			width: 100%;
			text-align: center;
			font-size: 1.7rem;
			color: #dadada;
		}

		.filter-section-body .filter {
			padding-bottom: 15px;
			padding-left: 15px;
		}

		.filter-section-body .filter .filter-label {
			width: 87%;
			display: inline-block;
		}

		.filter-section-body .filter .filter-toggler {
			width: 10%;
			display: inline-block;
			text-align: right;
		}

		.filter-section-body .filter .filter-option>* {
			display: inline-block;
		}

		.filter-section-body .filter .filter-option .filter-option-label {
			width: 80%;
			width: 90%;
			text-align: center;
		}

		.filter-section-body .filter .filter-option .filter-option-check {
			width: 10%;
			text-align: center;
		}


		.filter .filter-body {
			height: 0px;
			overflow: hidden;
		}

		.filter.toggled .filter-body {
			height: 100%;
			height: 35px;
		}

		.filter .filter-body {
			-webkit-transition: height .4s;
			/* Safari */
			transition: height .4s;
		}

		.filter .filter-header,
		.filter .filter-section-body .filter-types>div,
		.filter .filter-body .filter-option {
			cursor: pointer;
		}

		.filter .filter-header .filter-toggler>* {
			-webkit-transition: transform .4s;
			/* Safari */
			transition: transform .4s;
		}

		.filter .filter-header .filter-toggler>* {
			transform: rotate(0deg);
			font-size: 25px;
			line-height: 1;
		}

		.filter.dropdown-open .filter-header .filter-toggler>* {
			transform: rotate(180deg);
		}



		.filter-price-section .filter-option-label input {
			padding-top: 0px;
			padding-bottom: 0px;
			border-width: 0px;
			background-color: transparent;
			border-bottom: 1px solid black;
		}

		.filter-section-footer {
			height: 63px;
			background: #c3c3c3;
			position: absolute;
			width: 100%;
			bottom: 0;
			top: auto;
		}

		.filter-section-actions{
			height: 50px
		}

		.filter-section-actions .actions span {
			cursor: pointer; 
		}

		/* cardinals */
		.cardinals-component {
			border-top: 1px solid #9e9e9e;
			padding-bottom: 10px;
			padding-top: 10px;
			background-color: #ffffff;
		}

		.cardinal-tab {
			background-color: white;
			color: #411c8b;
			font-weight: normal;
			font-size: 1.3em;
		}

		.cardinal-tab.trans.active,
		.cardinal-tab.active {
			top: 0px;
			top: 0em;
			background-color: white;
			font-weight: bold;
		}

		/* header and logo */

		.building-info-component {
			position: relative;
			float: right;
			margin-top: 15px;
		}



		.step-container {
			width: 5%;
			position: fixed;
			left: -1%;
			top: 30%;
			z-index: 1000;
		}

		.step {

			padding: 10px;
			margin-top: 30px;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			cursor: pointer;

		}

		.step-item {
			width: 12px;
			height: 12px;
			border-radius: 6px;
			background: white;
		}

		.step-item-active {
			width: 16px;
			height: 16px;
			border-radius: 8px;
			margin-left: -2px;
		}

		#slider_sunset {
			transform: rotate(90deg);
			width: 240px;
			margin-left: -67px;
			margin-top: 103px;
		}

		.v-stepper {
			position: relative;
			/*   visibility: visible; */
		}


		/* regular step */
		.step .step-circle {
			background: none;
			border: 3px solid white;
			border-radius: 100%;
			width: 20px;
			/* +6 for border */
			height: 20px;
			display: inline-block;
		}

		.step .step-line {
			top: 23px;
			left: 9px;
			/*   height: 120px; */
			height: 50px;

			position: absolute;
			border-left: 3px solid white;
		}

		.step.step-completed .step-circle {
			visibility: visible;
			background: white;
			border-color: white;
		}

		.step.step-completed .step-line {
			border-left: 3px solid white;
		}

		.step.step-active .step-circle {
			visibility: visible;
			border-color: white;
		}

		.step.step-empty .step-circle {
			visibility: hidden;
		}

		.step.step-empty .step-line {
			/*     visibility: hidden; */
			/*   height: 150%; */
			top: 0;
			height: 50px;
		}


		.step:last-child .step-line {
			border-left: 3px solid white;
			z-index: -1;
			/* behind the circle to completely hide */
		}

		.step-content {
			margin-left: -15px;
			margin-top: 12px;
			display: inline-block;
			color: white;
		}


		input[type=range] {
			height: 19px;
			-webkit-appearance: none;
			margin: 10px 0;
			width: 100%;
		}

		input[type=range]:focus {
			outline: none;
		}

		input[type=range]::-webkit-slider-runnable-track {
			width: 100%;
			height: 1px;
			cursor: pointer;
			animate: 0.2s;
			box-shadow: 0px 0px 0px #000000;
			background: #FFFFFF;
			border-radius: 1px;
			border: 0px solid #000000;
		}

		input[type=range]::-webkit-slider-thumb {
			box-shadow: 0px 0px 0px #000000;
			height: 12px;
			width: 12px;
			border-radius: 6px;
			background: #FFFFFF;
			cursor: pointer;
			-webkit-appearance: none;
			margin-top: -6px;
		}

		input[type=range]:focus::-webkit-slider-runnable-track {
			background: #FFFFFF;
		}

		input[type=range]::-moz-range-track {
			width: 100%;
			height: 1px;
			cursor: pointer;
			animate: 0.2s;
			box-shadow: 0px 0px 0px #000000;
			background: #FFFFFF;
			border-radius: 1px;
			border: 0px solid #000000;
		}

		input[type=range]::-moz-range-thumb {
			box-shadow: 0px 0px 0px #000000;
			height: 12px;
			width: 12px;
			border-radius: 6px;
			background: #FFFFFF;
			cursor: pointer;
		}

		input[type=range]::-ms-track {
			width: 100%;
			height: 1px;
			cursor: pointer;
			animate: 0.2s;
			background: transparent;
			border-color: transparent;
			color: transparent;
		}

		input[type=range]::-ms-fill-lower {
			background: #FFFFFF;
			border: 0px solid #000000;
			border-radius: 2px;
			box-shadow: 0px 0px 0px #000000;
		}

		input[type=range]::-ms-fill-upper {
			background: #FFFFFF;
			border: 0px solid #000000;
			border-radius: 2px;
			box-shadow: 0px 0px 0px #000000;
		}

		input[type=range]::-ms-thumb {
			margin-top: 1px;
			box-shadow: 0px 0px 0px #000000;
			height: 12px;
			width: 12px;
			border-radius: 6px;
			background: #FFFFFF;
			cursor: pointer;
		}

		input[type=range]:focus::-ms-fill-lower {
			background: #FFFFFF;
		}

		input[type=range]:focus::-ms-fill-upper {
			background: #FFFFFF;
		}

		#slider_sunset {
			background: none;
		}
	</style>

	<style>
		.front-end-app .cardinal-tab,
		.front-end-app .group-bluez,
		.front-end-app .virtual-tour-window-view,
		.front-end-app .floor-plan-window-view,
		.front-end-app .building-info-component,
		.front-end-app .appartment-component,
		.front-end-app .expand-icon,
		.front-end-app .carousel-control-next-icon,
		.front-end-app .carousel-control-prev-icon {
			color: #411c8b;
		}

		/*
.front-end-app .open-filters-container {
  color: #411c8b;
}*/
	</style>

	<style>
		@media (min-width: 992px) {}

		@media (min-width: 992px) {
			.splash-pop .modal-lg {
				max-width: 80% !important;
			}
		}

		.splash-title {
			margin-top: 50px;
		}

		.splash-pop .splash-description-parent {
			/*min-height: 200px;*/
			min-height: 40vh !important;
		}

		.splash-pop.responsive-portait .splash-pop .splash-description-parent {
			/*min-height: 400px;*/
			min-height: 25vh !important;
		}

		.front-end-app .floor-plan-carousel.expanded-window {
			background: #ffffff;
		}

		.view-screens {
			transition: width 2s;
		}

		.carousel-item-next,
		.carousel-item-prev,
		.carousel-item.active {
			display: flex;
			justify-content: center;
		}

		.noselect {
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}
	</style>

	<script>
		function frontEndScreenResizer(which, operation) {
			if ($('.front-end-app').hasClass('responsive-portait')) {
				return;
			}

			let mainSelector = $('.front-end-app');
			let selectors = {
				renderGalleryCarousel: mainSelector.find('.render-gallery-carousel').eq(0),
				iframeVirtualTour: mainSelector.find('.iframe-virtual-tour').eq(0),
				floorPlanCarousel: mainSelector.find('.floor-plan-carousel').eq(0),
				mediaContainer: mainSelector.find('.view-screens').eq(0),
				canvasWindow: mainSelector.find('.renderator-canvas-window-view').eq(0),
			};
			let expandClass = 'expanded-window';


			let canvasAreaDOM = $('.elevation-canvas.active .canvas-area');
			let browserWidth;
			let browserHeight;
			if (operation === 'expand') {

				browserWidth = screen.width;
				browserHeight = screen.height;
				browserWidth = window.innerWidth;
				browserHeight = window.innerHeight;

				if (which === 'render-gallery') {
					$('.renderator-canvas-window-view').css({
						width: '',
						minWidth: '',
						maxWidth: ''
					});
					if (!selectors.renderGalleryCarousel.hasClass('d-none')) {
						selectors.renderGalleryCarousel.addClass(expandClass);
					} else if (!selectors.iframeVirtualTour.hasClass('d-none')) {
						selectors.iframeVirtualTour.addClass(expandClass);
					}
				} else if (which === 'floor-plan') {
					$('.renderator-canvas-window-view').css({
						width: '',
						minWidth: '',
						maxWidth: ''
					});
					selectors.floorPlanCarousel.addClass(expandClass);
				} else if (which === 'elevation') {
					$('.renderator-canvas-window-view').css({
						width: browserWidth + 'px',
						minWidth: browserWidth + 'px',
						maxWidth: browserWidth + 'px'
					});
					if (selectors.canvasWindow.hasClass(expandClass)) {
						frontEndScreenResizer(null, 'minimize');
					} else {
						let activeElevation = FRONT_END.getActiveElevation();
						for (let m in FRONT_END.Model.elevations) {
							if (m !== activeElevation) {
								FRONT_END.Model.elevations[m].elevationCanvas.discardActiveObject();
								FRONT_END.Model.elevations[m].elevationCanvas.trigger('selection:cleared');
							} else {
								if (FRONT_END.Model.elevations[m].activeAreaData) {
									let currentCardinal = FRONT_END.Model.elevations[m].activeAreaData.orientation;
									FRONT_END.activateCanvasObject(FRONT_END.Model.elevations[m].elevationCanvas, FRONT_END.Model.elevations[m].activeAreaData.fabricObj);
								}
							}
						}
						$('[data-toggle="tooltip"]').tooltip('hide');
						selectors.canvasWindow.removeClass('col-xl-6').addClass('col-xl-12').addClass(expandClass);
						selectors.mediaContainer.addClass('d-none');
					}
				}
			} else if (operation === 'minimize') {
				browserWidth = screen.width;
				browserHeight = screen.height;
				browserWidth = window.innerWidth;
				browserHeight = window.innerHeight;
				$('.renderator-canvas-window-view').css({
					width: browserWidth / 2 + 'px',
					minWidth: browserWidth / 2 + 'px',
					maxWidth: browserWidth / 2 + 'px'
				});
				let activeElevation = FRONT_END.getActiveElevation();
				for (let m in FRONT_END.Model.elevations) {
					if (m !== activeElevation) {
						FRONT_END.Model.elevations[m].elevationCanvas.discardActiveObject();

					} else {
						if (FRONT_END.Model.elevations[m].activeAreaData) {
							FRONT_END.activateCanvasObject(FRONT_END.Model.elevations[m].elevationCanvas, FRONT_END.Model.elevations[m].activeAreaData.fabricObj);
						}
					}
					break;
				}
				$('[data-toggle="tooltip"]').tooltip('hide');
				selectors.floorPlanCarousel.removeClass(expandClass);
				selectors.renderGalleryCarousel.removeClass(expandClass);
				selectors.iframeVirtualTour.removeClass(expandClass);
				selectors.canvasWindow.removeClass('col-xl-12').removeClass(expandClass).addClass('col-xl-6');
				selectors.mediaContainer.removeClass('d-none');
			}

			lastExpand.which = which;
			lastExpand.operation = operation;
		}
	</script>
	<script src="js/settings.js"></script>
	<script>
		let Model = buildingSettings;
		let APP;
		window.AUTO_TRIGGERED = {
			east: {},
			west: {},
			south: {},
			north: {}
		};
	</script>

	<!-- Loading percentage -->
	<script>
		let loadingPercentage = 0

		function spinnerCounting(element, p) {
			let percent = Math.ceil(p)
			element.innerText = (percent < 100 ? ("  " + percent).slice(-3) : "100") + "% loading" + "...".slice(0, (percent + 3) % 4)

		}
		let loadingInterval = setInterval(function() {

			let spinner = document.getElementById("load_bar")
			let finished = spinner ? Number(spinner.attributes.finished.value) : 0

			if (loadingPercentage > 100 && finished) {
				clearInterval(loadingInterval)
				document.getElementById("globalSpinner").classList.add("d-none")
			}
			if (spinner) {
				spinnerCounting(spinner, loadingPercentage)
			}!finished ? loadingPercentage += 0.6 : loadingPercentage += 3
		}, 100)
	</script>

	<script>
		(function(i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function() {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o),
				m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
		ga('create', 'UA-138652508-1', 'auto');
		ga('send', 'pageview');
	</script>

	<link href="css/front-end/cashe_portait.css" rel="stylesheet">
</head>

<body>
	<!--  START customization bar -->
	<div class="customization-menu-bar black-variant d-none">
		<h5 class="d-flex align-items-center"><i class="fas fa-edit toggle-it" style="font-size: 0.95rem;padding: 5px;cursor:pointer;"></i><span>Personalization</span></h5>
		<div class="customization-options">
			<div class="row d-flex align-items-center">
				<div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"><span>Primary Color:</span></div>
				<div id="primary-color" class="v col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center" title="Using input value" data-color="rgb(18, 103, 138)">
					<div class="input-group">
						<input type="text" class="form-control ainput-lg" value="rgb(18, 103, 138)" />
						<div class="input-group-append">
							<span class="input-group-text colorpicker-input-addon"><i></i></span>
						</div>
					</div>
				</div>
			</div>
			<div class="row d-none align-items-center">
				<div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"><span>Secondary Color:</span></div>
				<div id="secondary-color" class="v col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center" title="Using input value" data-color="rgb(69, 53, 20)">
					<div class="input-group">
						<input type="text" class="form-control input-lg" value="rgb(69, 53, 20)" />
						<span class="input-group-append">
							<span class="input-group-text colorpicker-input-addon"><i></i></span>
						</span>
					</div>
				</div>
			</div>
			<div class="row d-flex align-items-center">
				<div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"><span>Logo:</span></div>
				<div class="v col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center">
					<div class="form-check form-check-inline" style="cursor: pointer;">
						<input class="form-check-input" style="width: 1rem;height: 1rem;" type="radio" name="logotype" id="inlineRadio1" value="image" disabled>
						<label class="form-check-label" for="inlineRadio1" style="cursor:pointer;">Image</label>
					</div>
					<div class="form-check form-check-inline" style="cursor: pointer;">
						<input class="form-check-input" style="width: 1rem;height: 1rem;" type="radio" name="logotype" id="inlineRadio2" value="text" checked>
						<label class="form-check-label" for="inlineRadio2" style="cursor:pointer;">Text</label>
					</div>
				</div>
			</div>
			<div class="row d-flex align-items-center">
				<div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"><span>Upload Logo:</span></div>
				<div class="v col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center">
					<input type="file" class="upload-logo-input d-none">
					<span class="fas fa-upload upload-logo-icon" style="cursor: pointer;"></span>
					<span class="upload-logo-name" style="padding-left: 5px;"></span>
				</div>
			</div>
			<div class="row d-flex align-items-center">
				<div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"><span>Choosen font:</span></div>
				<div class="v col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center">
					<select class="form-control choosen-font" style="padding-left: .35rem;font-family: inherit;"></select>
				</div>
			</div>
			<div class="row d-none">
				<div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"><span>Import Google Font:</span></div>
				<div class="v col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center">
					<select class="form-control">
						<option>raleway</option>
						<option>raleway medium</option>
						<option>raleway high</option>
					</select>
				</div>
			</div>
			<div class="row d-flex align-items-center">
				<div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"><span>Import Google Font:</span></div>
				<div class="v col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center">
					<div class="ui-widget input-group ">
						<input id="tags" class="form-control" style="border-width: 1px;">
						<div class="input-group-prepend">
							<label class="input-group-text autocomplete-show-results" for="inputGroupSelect01" style="background-color: white;"><span class="fas fa-search" style="padding-left:2px;padding-right:2px;"></span></label>
						</div>
					</div>
				</div>
			</div>
			<button class="btn btn-success">Apply Preferences</button>
		</div>
		<script src="js/front-end/splash_personalization-renderer-3d.js"></script>
	</div>
	<!--  END customization bar -->



	<div class="container-fluid front-end-app responsive-portait" style="visibility: hidden;">
		<div class="row" style="min-height:900px;background-color: #f1f1f1;background-color: #ffffff">
			<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 _h-50 renderator-canvas-window-view">


				<div class="__building-info-component d-none" v-bind:data="Model">
					<div class="building-info" style="font-size: 1rem;">
						<div class="building-name">{{data.buildingName}}</div>
						<div class="building-adress">{{data.buildingAddress}}</div>
					</div>
				</div>

				<div class="canvases">
					<div class="elevation-canvas north">
						<div class="row filter-elevation-header-component">
							<!-- vue -->
							<filter-elevation-header v-bind:activefilters="filterklass_actives" v-bind:filterklass="filterklass_inst"></filter-elevation-header>
						</div>
						<!-- vue -->
						<div class="building-info-component" v-bind:data="Model">
							<div class="building-info" style="font-size: 1rem;">
								<div class="building-name">{{data.buildingName}}</div>
								<div class="building-adress">{{data.buildingAddress}}</div>
							</div>
						</div>
						<!-- <div id="filter-menu" class="filter-menu-component noselect filter-menu-closed"> -->
						<div id="filter-menu" class="filter-menu-component noselect">
							<!-- vue -->
							<filter-menu-component 
								v-bind:datamodel="Model" 
								v-bind:lastsearch="filterklass_lastsearch" 
								v-bind:filters="filterklass_inst.filters" 
								v-bind:filters="filterklass_filters" 
								v-bind:filterklass="filterklass_inst">
							</filter-menu-component>
						</div>
						<div class="filter-open-triggerer-container"></div>
						<div class="canvas-area section-body canvas" style="max-height: 850px;">

							<canvas id="renderator-canvas-north"></canvas>
							<canvas style="width: 100%;
														height: 100%;
														touch-action: none;
														z-index: 1;
														position: absolute;
														top: 0;
														left: 0;" id="renderator-canvas-north-mine">
							</canvas>

							<div class="noselect" style="position: absolute;
													bottom: 10%;
													height: 21px;
													width: 100%;
													z-index: 1;
													text-align: center;
													left: 0;
													font-size: 16px;
													font-weight: 600;
													color: gray;">

								<span class="rotate-icon" onclick="window.model_rotate = !window.model_rotate;">Rotate</span>
								<span>
									|
								</span>
								<span class="rotate-icon" onclick="window.model_zoom = !window.model_zoom;">
									Zoom
								</span>
								<span>
									|
								</span>
								<span class="rotate-icon" onclick="window.model_click = !window.model_click;">
									Click
								</span>

							</div>

							<div class="align-self-end expand-icon" id="canvas-expand-icon" style="position: absolute; z-index: 100; bottom: 8%; display: none;" onclick="window.smallToFullSize()" data-toggle="tooltip" data-placement="left" data-original-title="Click to maximize media window.Press escape to minimize">
								<i class="fas fa-external-link-alt"></i>
							</div>

							<span id="origin_point" style="position: absolute;
													z-index: 100;
													display: none;;
													bottom: 12%;
													border-radius: 50%;
													left: 50%;
													background: white;
													opacity: 0.6;
													cursor: pointer;
													transition: all;
													transition-duration: 2s;
													box-shadow: 6px 7px 10px #888888;
													">
								<img src="assets/reload.png" width="42px;" />
							</span>

						</div>

						<div class="step-container">
							<!-- completed -->
							<div class="step-middle" style="height: 219px;">
								<!--<input type="range" id="slider_sunset"  oninput="change_slider()" />-->
								<div id="sunset_tool" style="height: 100%; background: white; width: 1px; margin-left: 50px;">
									<div class="step">
										<div class="step-content" style="display: flex; justify-content: center; align-items: center;">
											<div class="step-item ">&nbsp;&nbsp;</div> &nbsp;&nbsp; <label style="margin: 0px;">Sunrise</label>
										</div>
									</div>
									<div class="step">
										<div class="step-content" style="display: flex; justify-content: center; align-items: center;">
											<div class="step-item step-item-active">&nbsp;&nbsp;</div> &nbsp;&nbsp; <label style="margin: 0px;">Noon</label>
										</div>
									</div>
									<div class="step">
										<div class="step-content" style="display: flex; justify-content: center; align-items: center;">
											<div class="step-item">&nbsp;&nbsp;</div> &nbsp;&nbsp; <label style="margin: 0px;">Sunset</label>
										</div>
									</div>
								</div>
							</div>
							<!-- active -->
						</div>
						<div class="elevation-filters-component closed" v-if="APP.active"></div>
						<div class="enquire-modal-component">
							<!-- vue -->
							<enquire-modal-component v-if="activeAreaData" v-bind:input_errors="{}" v-bind:bg="Model.elevations.north.fileName" v-bind:data="activeAreaData"></enquire-modal-component>
						</div>
						<div id="scroll-appartment" class="appartment-component content" style="z-index: 100;" v-bind:class="{'d-none': !activeAreaData }">
							<!-- vue -->
							<appartment-component v-if="activeAreaData" v-bind:data="activeAreaData"></appartment-component>
						</div>
						<div class="amenities-component" v-bind:class="{'d-none':filterSettings.filterResults.length==0||(FRONT_END.Model.elevations.north.activeAreaData!==null)}">
							<!-- vue -->
							<amenities-component v-if="(filterSettings.filterResults.length>0)" _v-if="filterSettings.filterValue" v-bind:amenities="filterSettings.filterResults"></amenities-component>
						</div>
						<div id="globalSpinner" class="spinner-component elevation-loading-spinner d-none" style="width: 100%; height: 100%">
							<div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;">
								<h3 style="margin-bottom: 15px;width: 11ch;text-align: left;" id="load_bar" finished="0"> 0% loading...</h3>
								<spinner-component v-bind:unique_tm_id="new Date().getTime()"></spinner-component>
							</div>
							<!-- vue -->
						</div>
					</div>



				</div>
				<div class="mouse-over-component-to-start" style="display:none!important;">
					<span>Double click on the building to start</span>
				</div>

				<div class="cardinals-component noselect" style="position: absolute;bottom: 0px; width: 100%;margin-left: -15px;margin-right: -15px;">
					<!-- vue -->
					<cardinals-component v-bind:elevations="elevations"></cardinals-component>
					<img src="assets/suitesflow-transparent.png" style="height:22px;position:absolute;top:-30px;left: 5px;">

				</div>
			</div>
			<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 view-screens">
				<div class="row" style="height: 100%;">
					<div style="height: 50%;" class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 _h-50 d-flex align-items-center virtual-tour-window-view">

						<div id="iframe-virtual-tour" class="d-none iframe-virtual-tour " style="width: 100%; height: 100%;    overflow: hidden;">
							<button class="escape_badge"> Press escape to exit </button>
							<span class="escape_badge_close far fa-times-circle"></span>
							<span class="tilt-device-badge"><span class="fas fa-chevron-left align-middle"></span><span class="titl-text align-middle">Tilt your device</span><span class="fas fa-chevron-right align-middle"></span></span>
							<iframe __src="http://tour.renderator.com/loop.html" style="width: 100%; height: 100%;border-width: 0px;"></iframe>
							<div class="spinner-cont d-none" style="position:absolute;top:50%;left:50%;transform: translate(-50% ,-50%) scale(0.5);">
								<svg class="spinner" width="174px" height="174px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
									<circle class="path" fill="transparent" stroke-width="2" cx="33" cy="33" r="30" stroke="url(#gradient_2)">
										<linearGradient id="gradient_2">
											<stop offset="50%" stop-color="#42d179" stop-opacity="1" />
											<stop offset="65%" stop-color="#42d179" stop-opacity=".5" />
											<stop offset="100%" stop-color="#42d179" stop-opacity="0" />
										</linearGradient>
									</circle>
									<svg class="spinner-dot dot" width="5px" height="5px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg" x="37" y="1.5">
										<circle class="path" fill="#42d179" cx="33" cy="33" r="30" />
									</svg>
								</svg>
							</div>
						</div>
						<div id="render-gallery-carousel" class="carousel slide render-gallery-carousel custom-responsive-carousel d-none" data-ride="carousel" _data-wrap="false">
							<button class="escape_badge"> Press escape to exit </button>
							<span class="escape_badge_close far fa-times-circle"></span>
							<span class="tilt-device-badge"><span class="fas fa-chevron-left align-middle"></span><span class="titl-text align-middle">Pinch or pan</span><span class="fas fa-chevron-right align-middle"></span></span>
							<ul class="carousel-indicators d-none"></ul>
							<div class="carousel-inner"></div>
							<a class="carousel-control-prev" href="#render-gallery-carousel" data-slide="prev">
								<span class="carousel-control-prev-icon fas fa-chevron-left"></span>
							</a>
							<a class="carousel-control-next" href="#render-gallery-carousel" data-slide="next">
								<span class="carousel-control-next-icon fas fa-chevron-right"></span>
							</a>
						</div>
						<div class="mx-auto text-center window-media-placeholder virtual-tour-slogan">
							<div class="big-title">Virtual tours viewer</div>
							<div>&lt; Click on the building to open the virtual tours</div>
						</div>
						<div class="mx-auto text-center window-media-placeholder render-gallery-slogan">
							<div class="big-title">Render gallery viewer</div>
							<div>&lt; Click on the building to open the photo gallery</div>
						</div>
						<div class="mx-auto text-center window-media-placeholder media-not-available-slogan">
							<div class="big-title">Media not available for this area</div>
							<div>&lt; Admin has not set photos or virtual tour for this area yet</div>
						</div>
						<div class="mx-auto text-center window-media-placeholder media-slogan">
							<div class="big-title">Media viewer</div>
							<div>&lt; Select the unit to open the gallery or virtual tour</div>
						</div>
						<div class="align-self-end expand-icon" onclick="frontEndScreenResizer('render-gallery', 'expand')" data-toggle="tooltip" data-placement="left" data-original-title="Click to maximize media window.Press escape to minimize">
							<i class="fas fa-external-link-alt"></i>
						</div>
					</div>
					<div style="height: 50%;" class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 _h-50 d-flex align-items-center floor-plan-window-view">

						<div id="floor-plan-carousel" class="carousel slide d-none floor-plan-carousel custom-responsive-carousel" _data-ride="carousel" _data-wrap="false">
							<button class="escape_badge">Press escape to exit </button>
							<span class="escape_badge_close far fa-times-circle"></span>
							<span class="tilt-device-badge"><span class="fas fa-chevron-left align-middle"></span><span class="titl-text align-middle">Pinch or pan</span><span class="fas fa-chevron-right align-middle"></span></span>
							<ul class="carousel-indicators d-none"></ul>
							<div class="carousel-inner"></div>
							<a class="carousel-control-prev d-none" href="#floor-plan-carousel" data-slide="prev">
								<span class="carousel-control-prev-icon"></span>
							</a>
							<a class="carousel-control-next d-none" href="#floor-plan-carousel" data-slide="next">
								<span class="carousel-control-next-icon"></span>
							</a>
						</div>
						<div class="mx-auto text-center window-floor-plan-placeholder floor-plan-default-slogan">
							<div class="big-title">Floor plans viewer</div>
							<div>&lt; Select the unit to open the floor plans</div>
						</div>
						<div class="mx-auto text-center window-floor-plan-placeholder floor-plan-slogan">
							<div class="big-title">Floor plans viewer</div>
							<div>&lt; Click on the the building to open the floor plans</div>
						</div>
						<div class="mx-auto text-center window-floor-plan-placeholder floor-plan-not-available-slogan">
							<div class="big-title">Floor plans not available for this area</div>
							<div>&lt; Admin has not set floor plans for this area yet</div>
						</div>
						<div class="align-self-end expand-icon" onclick="frontEndScreenResizer('floor-plan', 'expand')" data-toggle="tooltip" data-placement="left" data-original-title="Click to maximize floor plan window.Press escape to minimize">
							<i class="fas fa-external-link-alt"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="spinner-section-general d-none">
		<svg class="spinner" width="174px" height="174px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
			<circle class="path" fill="transparent" stroke-width="2" cx="33" cy="33" r="30" stroke="url(#gradient)">
				<linearGradient id="gradient">
					<stop offset="50%" stop-color="#42d179" stop-opacity="1" />
					<stop offset="65%" stop-color="#42d179" stop-opacity=".5" />
					<stop offset="100%" stop-color="#42d179" stop-opacity="0" />
				</linearGradient>
			</circle>
			<svg class="spinner-dot dot" width="5px" height="5px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg" x="37" y="1.5">
				<circle class="path" fill="#42d179" cx="33" cy="33" r="30" />
			</svg>
		</svg>
	</div>


	<div class="modal fade" id="message-sent" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg" style="top:25%; width: 360px; margin: auto;">
			<div class="modal-content">
				<div class="modal-header" style="border-width:0px;">
					<div class="modal-title w-100">
						<div class="building-info d-inline-block">
						</div>
						<i class="custom-close-btn fas fa-times-circle" data-dismiss="modal" style="font-size: 25px; float: right;"></i>
					</div>
				</div>
				<div class="modal-body">
					<div class="form-headers text-center">
						<P style="text-align: center; font-size: 22px; font-weight: 800; margin-bottom: 20px;">Your message has been sent</P>
						<P style="text-align: center; font-size: 18px; font-weight: 200; margin-bottom: 15px;">We'll be back to you soon.</P>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-custom-success message-sent-confirm-color" data-dismiss="modal" style="margin:auto; color: white; font-size: 18px; width: 70px;">Close</button>
				</div>
			</div>
		</div>
	</div>



	<div class="modal" id="landscape-warning" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="mySmallModalLabel" aria-hidden="true" style="background-color:rgba(0,0,0,1);">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header" style="border-width:0px;    text-align: center;font-size: 2.5rem;background: red;color: white;">
					<div class="modal-title w100">Go to landscape. Enjoy your visit more by using a larger screen</div>
				</div>
			</div>
		</div>
	</div>


	<div class="modal" id="portrait-warning" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="mySmallModalLabel" aria-hidden="true" style="background-color:rgba(0,0,0,1);">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header" style="border-width:0px;    text-align: center;font-size: 2.5rem;background: red;color: white;">
					<div class="modal-title w100">Go to Portrait. Enjoy your visit more by using a portrait screen</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal" id="fail-load" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header" style="border-width:0px;    text-align: center; color: black;">
					<div class="modal-title w100"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal" id="crm-fail-load-area" tabindex="-1" role="dialog" data-dismiss="modal" aria-labelledby="mySmallModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<div class="modal-title w100">Suitesflow Message</div>
				</div>
				<div class="modal-body" style="color: black;">
					Apartment Information is not available at the moment.<br>
					Please try again later
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary _close" data-dismiss="modal">Ok</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal" id="crm-fail-load-allareas" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="mySmallModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<div class="modal-title w100">Suitesflow Message</div>
				</div>
				<div class="modal-body" style="color: black;">
					We can't get data for apartments from the source at this moment.<br>
					Please try again later.
				</div>
			</div>
		</div>
	</div>


	<div class="modal splash-pop" tabindex="-1" role="dialog" __data-backdrop="static" aria-labelledby="mySmallModalLabel" aria-hidden="true" style="display:block;visibility:hidden;background-color: rgba(35, 35, 35,0.8);">

		<div class="modal-dialog modal-lg  modal-dialog-centered" style="font-size: 1rem;  _max-width: 80%;">
			<div class="modal-content" id="load-modal-content" style="background-color: #6c6c90; box-shadow: 2px 2px 25px 5px #000000;background-position: center; background-repeat: no-repeat; background-size: 100% 100%;">
				<div style="background-color: rgba(255,255,255,0.8); padding: 2em;">
					<div class="modal-header" style="border-width:0px;padding-bottom:0px;">
						<div class="modal-title w-100">
							<div class="building-info-cont d-inline-block" style="float: right;background-size: contain;background-repeat: no-repeat;background-position: center;">
								<div class="building-info d-none" style="font-size: 1rem;font-size: 1.4rem;">
									<div class="building-name" style="background-size: contain;background-repeat: no-repeat;background-position: center;">{{data.buildingName}}</div>
									<div class="building-adress">{{data.buildingAddress}}</div>
								</div>
							</div>
						</div>
					</div>

					<div class="modal-body" style="background-size:cover;">
						<div class="d-block" style="_margin-left: -20px;_margin-right: -20px;">
							<div class="form-headers text-center">
								<div class="d-inline-block connect-with-our-concierge splash-title" style="font-size: 1.8em;font-size: 2em;font-weight:bold;"></div>
							</div>
							<div class="row">
								<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center splash-description-parent" style="_min-height: 450px;padding-top:  1.875rem;padding-bottom: 1.875rem;">
									<div class="text-center m-auto splash-description" style="max-width: 70%;    font-size: 1.5em;font-size: 1.7em;"></div>
								</div>
								<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
									<div class="text-center" style="font-size:1em;font-weight:bold; color:#243751;max-width: 95%;margin:auto;font-size: 1.5em;">LET US HELP YOU TO FIND THE PERFECT PROPERTY MATCH FOR YOU</div>
								</div>
							</div>
						</div>
					</div>

					<div class="modal-footer" style="border-width:0px;">
						<button style="margin: auto;background-color:#243751;color:#ffffff;font-size: 1.3em;font-size: 1.6em;" type="button" class="btn btn-custom-success _close" data-dismiss="modal">GET STARTED</button>
						<img src="assets/suitesflow-transparent.png" style="height: 20px;bottom: 10px;display: inline-block;position: absolute;">
					</div>
				</div>
			</div>
		</div>
	</div>

	<!--<script src="js/front-end/main.js"></script>-->


	<script src="./js/general_functions.js"></script>
	<script src="./data/<?php echo $_GET['token']; ?>/code/splash_main_3d.js"></script>

	<script type="text/javascript">
		function LOAD_SETTINGS(success, error, queryStr) {
			let spinner = $('.spinner-section-general');
			spinner.removeClass('d-none');
			$.ajax({
				type: "GET",
				url: "php/get_3d_setup_settings.php" + queryStr,
				dataType: "json",
				success: function(data) {
					let serverdata = JSON.stringify(data.serverData);
					data = JSON.parse(serverdata);
					spinner.addClass('d-none');
					$('.front-end-app').css('visibility', '');
					if (success) {
						success(data);
					}
				},
				error: function(er) {
					if (error) {
						error(er);
					}
				}
			});
		}



		let FRONT_END;

		function initFrontEnd() {
			// Model = buildingSettings;
			FRONT_END = new FrontEnd(Model);
			FRONT_END.init();

			if (window.TEMPORARY_PREVIEW && window.activeElevation) {
				FRONT_END.setActiveElevation(window.activeElevation);
			} else {
				FRONT_END.setActiveElevation('north');
			}
			//### FRONT_END.showDefaultSlogans();
			$('[data-toggle="tooltip"]').tooltip();
			return;
		}





		// Debounce
		function debounce(func, time) {
			var time = time || 100; // 100 by default if no param
			var timer;
			return function(event) {
				if (timer) clearTimeout(timer);
				timer = setTimeout(func, time, event);
			};
		}



		let building_id = '';
		let token = '';
		let globalQueryString = '';
		let LOADED_MODEL = null;
		let MOBILE_DETECTED_ON_LOAD = false;

		let lastExpand = {
			operation: null,
			which: null
		};

		function resizeContent() {

			let browserWidth = window.innerWidth;
			let browserHeight = window.innerHeight;
			$('body').css({
				minHeight: browserHeight + 'px'
			});

			frontEndScreenResizer(null, 'minimize');
			//orientationChangeWarnings();
		}

		function orientationChangeWarnings() {
			let browserWidth = window.innerWidth; //* window.devicePixelRatio;
			let browserHeight = window.innerHeight; //* window.devicePixelRatio;
			if (window.orientationMessage() === false) {
				return;
			}


			if (browserWidth < 801 || window.foundMobileDevice()) {
				$('.front-end-app').addClass('responsive-portait');

				$('body').css('overflow-x', 'hidden');
				$('.front-end-app').css('min-width', $('.front-end-app')[0].offsetWidth + 'px');
				$('.renderator-canvas-window-view').css({
					width: browserWidth + 'px',
					minWidth: browserWidth + 'px',
					maxWidth: browserWidth + 'px',
					minHeight: browserHeight - 160 + 'px'
				});
				$('.view-screens').css({
					width: '0px',
					minWidth: '0px',
					maxWidth: '0px',
					minHeight: '0px'
				});
				$('.front-end-app').children().eq(0).css({
					minHeight: browserHeight - 160 + 'px',
					minWidth: browserWidth + 'px'
				});
				window.calcFiltersMenuRight();
				window.reZoomAllBuildings();

			} else {
				window.smallToFullSize();
			}
		}

		window.addEventListener("resize", debounce(resizeContent, 150));
		window.addEventListener("resize", debounce(orientationChangeWarnings, 250));
		window.foundMobileDevice = function() {
			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				return true;
			}
			return false;
		}

		// Close filters if on mobile device
		if (window.foundMobileDevice()) {
			$('#filter-menu').addClass('filter-menu-closed');

		};

		window.fullToSmallSize = function() {

			if (window.foundMobileDevice()) return;

			let browserWidth = window.innerWidth; //* window.devicePixelRatio;
			let browserHeight = window.innerHeight; //* window.devicePixelRatio;
			$('.front-end-app').removeClass('responsive-portait');
			$('body').css('overflow-x', 'hidden');
			$('.front-end-app').css('min-width', $('.front-end-app')[0].offsetWidth + 'px');
			$('.renderator-canvas-window-view').animate({
				width: browserWidth / 2 + 'px',
				minWidth: browserWidth / 2 + 'px',
				maxWidth: browserWidth / 2 + 'px',
				minHeight: browserHeight - 160 + 'px'
			});
			$('.renderator-canvas-window-view').css({
				transition: 'width 2s'
			});
			$('.view-screens').css({
				width: browserWidth / 2 + 'px',
				minWidth: browserWidth / 2 + 'px',
				maxWidth: browserWidth / 2 + 'px',
				minHeight: browserHeight - 160 + 'px'
			});
			$('.view-screens').css({
				transition: 'width 2s'
			});
			$('.front-end-app').children().eq(0).css({
				minHeight: browserHeight - 160 + 'px',
				minWidth: browserWidth + 'px'
			});
			window.calcFiltersMenuRight();
			window.reZoomAllBuildings();


			$('.filter-menu-component').each(function(k, ele) {

				let eleW = $(ele).width();
				if (eleW > 0) {
					if (!$('.filter-menu-component').hasClass('filter-menu-closed')) {
						let w = $(ele).width() + 2;
						$('.filter-menu-component').css('right', (-1) * w + 'px');
					}
				}

			});


			$('.view-screens').css('display', 'block');
			$('#canvas-expand-icon').css({
				display: 'block'
			});

		}

		window.smallToFullSize = function() {

			let browserWidth = window.innerWidth; //* window.devicePixelRatio;
			let browserHeight = window.innerHeight; //* window.devicePixelRatio;
			$('.renderator-canvas-window-view').animate({
				width: browserWidth + 'px',
				minWidth: browserWidth + 'px',
				minHeight: browserHeight - 160 + 'px'
			});
			$('.renderator-canvas-window-view').css({
				transition: 'width 2s'
			});
			$('.view-screens').css('display', 'none');
			$('.view-screens').css({
				transition: 'width 2s'
			});
			// $('.filter-menu-component').css({width:'20%', right: '-20%'});
			// $('.view-screens').css({ width: browserWidth/2 + 'px', minWidth: browserWidth/2 + 'px', maxWidth: browserWidth/2 + 'px', minHeight: browserHeight-160 + 'px' });
			$('.front-end-app').children().eq(0).css({
				minHeight: browserHeight - 160 + 'px',
				minWidth: browserWidth + 'px'
			});
			$('#canvas-expand-icon').css('display', 'none');

		}

		window.calcFiltersMenuRight = function() {
			$('.filter-menu-component').each(function(k, ele) {
				let eleW = $(ele).width();
				if ($(ele).hasClass('filter-menu-closed') && eleW > 0) {
					eleW = eleW + 2; /* 1px border */
					$(ele).addClass('notransition');
					$(ele).css('right', -1 * eleW + 'px');
					setTimeout(function() {
						$(ele).removeClass('notransition');
					}, 10);
				}
			});
		}



		window.reZoomAllBuildings = function() {
			if (!FRONT_END) {
				return;
			}
			for (let v in FRONT_END.elevationKlasses) {
				let canvas = FRONT_END.elevationKlasses[v].canvas;
				if (canvas && canvas.backgroundImage) {
					canvas.setWidth(canvas.backgroundImage.width);
					canvas.setHeight(canvas.backgroundImage.height);
					FRONT_END.elevationKlasses[v].zoomBasedOnBackgroundSize(canvas);
				}
				break;
			}
		}

		window.orientationMessage = function() {
			return true;
		}


		window.onload = function() {
			if ($('.mouse-over-component-to-start').length > 0) {
				window.hideBadge = function() {
					$("body").off("click touchend", window.hideBadge);
					$('.mouse-over-component-to-start').animate({
						opacity: 0
					}, 2000, function() {
						$('.mouse-over-component-to-start').css('display', 'none');
					});
				}
				$("body").on("click touchend", window.hideBadge);
			}


			// screen size setting

			if (window.foundMobileDevice()) {

				MOBILE_DETECTED_ON_LOAD = true;

				$('.front-end-app').addClass('responsive-portait');

				window.makePortraitBuilding = function() {}

				window.FRONT_END_IS_READY = function() {
					window.makePortraitBuilding();
				}

				$('.rotate-icon:first-child').css("margin-left", "30%");

			} else {

				$('.front-end-app').removeClass('responsive-portait');
				$('body').css('overflow-x', 'hidden');
				$('.front-end-app').css('min-width', $('.front-end-app')[0].offsetWidth + 'px');
				let browserWidth = window.innerWidth;
				let browserHeight = window.innerHeight;


				// let filter_tag_container = $('.filter-tag-container').css('width', '80%');


				// $('.renderator-canvas-window-view').css({ width: browserWidth/2 + 'px', minWidth: browserWidth/2 + 'px', maxWidth: browserWidth/2 + 'px', minHeight: browserHeight-160 + 'px' });
				// $('.view-screens').css({ width: browserWidth/2 + 'px', minWidth: browserWidth/2 + 'px', maxWidth: browserWidth/2 + 'px', minHeight: browserHeight-160 + 'px' });
				// $('.front-end-app').children().eq(0).css({minHeight: browserHeight-160 + 'px', minWidth: browserWidth + 'px' });


				$('.renderator-canvas-window-view').css({
					width: browserWidth + 'px',
					minWidth: browserWidth + 'px',
					minHeight: browserHeight - 160 + 'px'
				});
				$('.renderator-canvas-window-view').css({
					transition: 'width 2s'
				});
				$('.view-screens').css('display', 'none');
				$('.view-screens').css({
					transition: 'width 2s'
				});
				// $('.filter-menu-component').css({width:'20%'});
				// $('.view-screens').css({ width: browserWidth/2 + 'px', minWidth: browserWidth/2 + 'px', maxWidth: browserWidth/2 + 'px', minHeight: browserHeight-160 + 'px' });
				$('.front-end-app').children().eq(0).css({
					minHeight: browserHeight - 160 + 'px',
					minWidth: browserWidth + 'px'
				});
			}

			window.orientationMessage();
			if (window.TEMPORARY_PREVIEW) {}

			building_id = getParameterByName('building_id');
			token = getParameterByName('token');
			globalQueryString = window.location.search;
			if (/\?/.test(window.location.search)) {
				globalQueryString = globalQueryString + '&r=' + new Date().getTime();
			}

			if (token) {
				LOAD_SETTINGS(
					function(data) {

						window.model_click = false;
						window.model_rotate = false;
						window.model_zoom = false;

						APP = data.appStatus;
						LOADED_MODEL = JSON.parse(data);
						data = JSON.parse(data);
						// return;
						Model = JSON.parse(JSON.stringify(data.buildingSettings));
						Model.token = token;
						Model['babySetting'] = JSON.parse(JSON.stringify(data.babyViewSetting));
						if (!data.switchValue) {
							Model['splashPopUp'] = {
								'switch1': true
							};
						} else
							Model['splashPopUp'] = JSON.parse(JSON.stringify(data.switchValue));
						Model.fullToSmallSize = window.fullToSmallSize;


						if (window.innerWidth > 768) {
							Model['windowMode'] = "full";
						} else {
							Model['windowMode'] = "small";
							$('#sunset_tool').css('margin-left', '20px');
							$('#scroll-appartment').css('top', "25%");
						}
						initFrontEnd();
						let mobile = window.foundMobileDevice();

						window.personalCss = new PersonalizationRenderer();
						if (LOADED_MODEL.preferences) {
							FRONT_END.personalization.colors = LOADED_MODEL.preferences.colors;
							FRONT_END.personalization.font = LOADED_MODEL.preferences.font;
							FRONT_END.personalization.logo.name = LOADED_MODEL.preferences.logo.name;
							FRONT_END.personalization.logo.storedName = LOADED_MODEL.preferences.logo.storedName;
							FRONT_END.personalization.logoType = LOADED_MODEL.preferences.logoType;

							if (LOADED_MODEL.preferences.splashPopUp) {
								FRONT_END.personalization.splashPopUp = LOADED_MODEL.preferences.splashPopUp;
							}
							FRONT_END.updatePersonalizationColors();
							FRONT_END.updatePersonalizationSplash(function() {

								$('.splash-pop').css('visibility', '');
								$('.splash-pop').css('display', '');

								$('.splash-pop').modal('show');
								// $('#load-modal-content').animate({'background-size': '100%'}, 7000);
								if (mobile) {
									$('#load-modal-content').addClass('load-screen-animate-mobile');
									$('.filter-menu-component').css('min-width', '300px');

								} else
									$('#load-modal-content').addClass('load-screen-animate');


								setTimeout(function() {
									if (mobile)
										$('#load-modal-content').css({
											'background-size': '400%'
										});
									else
										$('#load-modal-content').css({
											'background-size': '150%'
										});

									if (window.foundMobileDevice())
										$('.filter-btn').css('font-size', '0.8em');
								}, 4800);

							});

							setTimeout(function() {
								$('.filter-section-header').css('background-color', LOADED_MODEL.preferences.colors.primaryColor);
								$('.message-sent-confirm-color').css('background-color', LOADED_MODEL.preferences.colors.primaryColor);

								var sheet = window.document.styleSheets[0];
								
								var cssRules = ['.filter-menu-item-selected  { color: PRIMARY_COLOR !important; border-color:  PRIMARY_COLOR !important; font-weight: bold}',
									'.primary-background-color {background-color:  PRIMARY_COLOR !important} ',
									'.vue-slider-process {background-color:  PRIMARY_COLOR !important} ',
									'.vue-slider-dot-tooltip-text { color:  PRIMARY_COLOR !important } ',
									'.filter-types .custom-checkbox .custom-control-input:disabled~.custom-control-label::before { background-color: PRIMARY_COLOR !important}'];

								cssRules.forEach(rule => {
									sheet.insertRule(rule.replace(/PRIMARY_COLOR/g, LOADED_MODEL.preferences.colors.primaryColor), sheet.cssRules.length);
								});


								var toolbox = $('.renderator-canvas-window-view'),
									height = toolbox.height(),
									scrollHeight = toolbox.get(0).scrollHeight;

								// prevent scroling over canvas
								// if was used to limit it to scrolling up
								toolbox.bind('mousewheel', function(e, d) {
									// if ((this.scrollTop === (scrollHeight - height) && d < 0) || (this.scrollTop === 0 && d > 0)) {
									e.preventDefault();
									// }
								});


							}, 5000);
							window.personalCss.updateCss(LOADED_MODEL.preferences);
						}

						if (getParameterByName('personalization')) {
							$.ajax({
								type: "GET",
								url: "php/get_script.php" + globalQueryString,
								dataType: "json",
								success: function(data) {
									if (!data.error) {
										let scriptAdd = document.createElement("script");
										scriptAdd.setAttribute("id", "personalization");
										scriptAdd.innerHTML = data.serverData;
										document.getElementsByTagName('body')[0].appendChild(scriptAdd);
										window.personalization = new Personalization();
										if (LOADED_MODEL.preferences) {
											window.personalization.onFontsReady = function() {
												window.personalization.setUIPreferences(LOADED_MODEL.preferences);
											}
										}
									}
								},
								error: function(er) {
									if (error) {
										error(er);
									}
								}
							});
						}
					},
					function() {},
					globalQueryString
				);
			}

			$('.escape_badge').on('click', function() {
				frontEndScreenResizer(null, 'minimize');
			});
			$(document).keyup(function(e) {
				if (e.keyCode === 27) {
					frontEndScreenResizer(null, 'minimize');
				}
			});
		}
	</script>

	<script src="libs/jquery.mousewheel.js"></script>
	<script src="libs/hammer.min.js"></script>
	<script src="js/jquery/jquery.mCustomScrollbar.concat.min.js"></script>

	<script>
		$(window).on("load", function() {
			// let widthPro = 50;
			// let increaseWidthProces = setInterval(function(){
			//     if(widthPro == 100){
			//         clearInterval(increaseWidthProces);
			//         return;
			//     }
			//     widthPro++;
			//     $('#').animate('background-size', widthPro + '%');
			// },500);

		});
		$('.step-container .step').click(function() {
			let index = $('.step-container .step').index(this);
			// FRONT_END.sunlight = index;
			$(".step-item").removeClass('step-item-active');
			$(this).find('.step-item').addClass('step-item-active');
			FRONT_END.sunlight = index;
		});
		$('#slider_sunset').val(0);

		function change_slider() {
			let range_val = $('#slider_sunset').val();
			FRONT_END.sunlight = range_val;
		}
	</script>


	<!--
<script src="js/front-end/expansion.js"></script>
-->
	<script>



	</script>

</body>

</html>
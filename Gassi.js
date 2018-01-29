(function($) {

	Drupal.behaviors.sliderMosaiks = {
		attach: function(context, settings) {
			var inSlider = $('.slider-front2 > .view-content');
			inSlider.each(function() {
				if ( $(this).children().length > 1 ) {
					var $initBx = $('.slider-front2 > .view-content');
					//if ($initBx.children().length > 0) {
					$initBx.once(function(){
						$initBx.bxSlider({
							slideMargin: 0,
							minSlides: 1,
							maxSlides: 1,
							auto: false,
							pager: false,
							controls: true,
							moveSlides:1,
							infiniteLoop: true
						});
					});
				}
			});
		}
	};
	
	Drupal.behaviors.sliderFronttree = {
		attach: function(context, settings) {
			var mainSlider = $('.slider-sircle .view-content');
			mainSlider.find(' .slideshow-title').hide();
			mainSlider.attr('id','carousel');
			mainSlider.after('<div id="carousel-left"></div><div id="carousel-right"></div>');
			mainSlider.find('.views-row img').addClass('carousel-image');
			if (mainSlider.length){
				$('#carousel').featureCarousel({
					largeFeatureWidth:590,
					largeFeatureHeight:440,
					smallFeatureWidth:310,
					smallFeatureHeight:240,
					topPadding:0,
					smallFeatureOffset:100,
					autoPlay:6000,
					preload:true,
					counterStyle:1,
					startingFeature:1,
					displayCutoff:0,
					carouselSpeed: 750,
					animationEasing: 'swing',
					trackerSummation: false,
					sidePadding: 0,
					leavingCenter: function($feature){
						$feature.find('.slideshow-title').hide();
					},
					movedToCenter: function($feature){
						$feature.find('.slideshow-title').show();
					}
				});
			}
		}
	};
	
	Drupal.behaviors.sliderScrolltooo = {
		attach: function(context, settings) {

			$(".front .block-menu a.about-company ").click(function(event) {
				event.preventDefault();
				$('html, body').animate({
					scrollTop: $(".front #block-views-about-developers-block").offset().top
					}, 2000);
			});
			
			$(".front .block-menu a.contacts").click(function(event) {
				event.preventDefault();
				$('html, body').animate({
					scrollTop: $("body #footerregions").offset().top
					}, 2000);
			});
		}
	};

	Drupal.behaviors.collectionSlider = {
		attach: function(context, settings) {	
			var $SliderCollection = $('.colection-slider	.view-content');
			$SliderCollection.after('<ul id="nav">').cycle({ 
					speed:  'fast', 
					timeout: 0, 
					pager:  '#nav', 
					 
					pagerAnchorBuilder: function(idx, slide) { 
						return '<li><a href="#"><img src="' + $(slide).find('img').attr('src') + '" width="207" height="128" /></a></li>';
					}
			});
			var $SliderCollectionHeight = $('.colection-slider	.view-content .views-row-first').height();
			$SliderCollection.height($SliderCollectionHeight);
			
			$(window).resize(function() {
				$SliderCollection.height($('.colection-slider	.view-content .views-row-first').height());
			});
			
			$(window).trigger('resize');
			
			$('.colection-slider #nav').slick({
				dots: false,
				infinite: false,
				speed: 300,
				slidesToShow: 6,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 1,
							infinite: false,
							dots: false
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
			var $carouselItem = $('#block-views-exp-colection-page .form-item-season .bef-select-as-links > .form-item');
			activeIndex = $carouselItem.find('.active').closest('.form-item').index() - 1;
			if (activeIndex <= 0) {
				activeIndex = 0;
			}
			$carouselItem.slick({
				dots: false,
				infinite: false,
				initialSlide: activeIndex,
				speed: 300,
				slidesToShow: 3,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
							infinite: false,
							dots: false,
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							dots: false
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: false
						}
					}

				]
			});
			
			//ADD NODE TITLE IN SLIDER
			$('.colection-slider .views-field-title .field-content>a').each(function(index){
				index = (index+1)-1;
				var $elem = $(this).attr('data-slide-id', index).hide();
						$this = $(this);
				$elem.insertBefore($('#block-views-exp-colection-page .form-item-season .bef-select-as-links > .form-item').find('.active'));
			});
						
			//For click
			$(".colection-slider li").click(function(e) {
				var $sliderVal = $(this).data('slick-index');
				$("#edit-season-wrapper .form-item  a"+"[data-slide-id]").hide();
				$("#edit-season-wrapper .form-item  a"+"[data-slide-id="+$sliderVal+"]").css('display', 'block').addClass('activecollection');
			});
			//For load page
			$("#edit-season-wrapper .form-item  a"+"[data-slide-id]").hide();
			$("#edit-season-wrapper .form-item  a"+"[data-slide-id="+$(".colection-slider li").data('slick-index')+"]").css('display', 'block').addClass('activecollection');
			//END
			
		}
	};	


})(jQuery);


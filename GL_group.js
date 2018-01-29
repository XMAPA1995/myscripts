jQuery(document).ready(function ($)
{
	// button "go to top"
	$('#page').append('<span class="scrollTop" title="Наверх"/>');
	var scrollTop_btn = $('.scrollTop');
	scrollTop_btn.hide();
	scrollTop_btn.click(function()
	{
		$('html:not(:animated)' +(!$.browser.opera?',body:not(:animated)':'')).animate({scrollTop: 0}, 250);
	});
	
	function show_scrollTop()
	{
		($(window).scrollTop() > 0)?scrollTop_btn.fadeIn(500):scrollTop_btn.fadeOut(500);
	}
	$(window).scroll(function(){show_scrollTop()});
	show_scrollTop();
	// /button "go to top"
	
	
	// cboxTitle html tags fix
	$(document).bind('cbox_complete', function()
	{
		var cboxTitle = $('#cboxWrapper').find('#cboxTitle');
		var textWithTags = cboxTitle.text();
		if(textWithTags.length)
		{
			cboxTitle.text('');
			$('#cboxTitle').html(textWithTags);
			$('#cboxTitle').show();
			$('#cboxTitle').css('opacity', '1');
		}
	});

    function footerToBottom() {
        var browserHeight = $(window).height(),
            footerOuterHeight = $('#footer-wrapper').outerHeight(true),
            mainHeightMarginPaddingBorder = $('#page-wrapper').outerHeight(true) - $('#page-wrapper').height();
        $('#page-wrapper').css({
            'min-height': browserHeight - footerOuterHeight - mainHeightMarginPaddingBorder,
        });
    };

    footerToBottom();
    $(window).resize(function () {
        footerToBottom();
    });

    var clicks = 0;
    var link = "";
    var flag = false;
    $("#navigationMenu ul li a")
        .on('tap touchend', function (e) {
            e.preventDefault()
            if (flag) {
                return false;
            }

            var $this = $(this);
            if (clicks == 0) {
                $this.find('span').show();
                link = $this.attr("href");
                clicks++;
                return false;
            } else if (clicks == 1 && link != $this.attr("href")) {
                $this.find('span').show();
                link = $this.attr("href");
                return false;
            } else if (clicks == 1 && link == $this.attr("href")) {
                $this.find('span').hide();
                if ($this.attr('href').slice(0, 1) == '/') {
                    window.location.href = $this.attr('href');
                    return false;
                } else if ($($this.attr('href')).size() == 1) {
                    $('html, body').stop().animate({
                        scrollTop: $($this.attr('href')).offset().top
                    }, 1000);
                    return false;
                }
                clicks = 0;
                return false;
            }

            return false;
        })
        .on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            if (!flag) {
                flag = true;
                setTimeout(function () {
                    flag = false;
                }, 100);
                if ($this.attr('href').slice(0, 1) == '/') {
                    window.location.href = $this.attr('href');
                    return false;
                } else if ($($this.attr('href')).size() == 1) {
                    $('html, body').stop().animate({
                        scrollTop: $($this.attr('href')).offset().top}, 1000);

                    return false;
                }
            }

            return false;
        });

    /* Fix mobile devices front page links */
    $(".front a").on ("click tap", function() {
        if ($(this).attr('href').slice(0, 1) == '/' && $(this).attr("href").indexOf(document.domain) == -1) {
            window.location.href = '//' + document.domain + $(this).attr("href");
        }
        return true;
    });

    /* Update Contact form */
    $('.region-contacts form, #webform-client-form-50')
        .append("<span class='words_left'>Осталось символов: <span class='count'>300</span></span>");

    $('#edit-submitted-message, #edit-submitted-call-message').on('keyup', function(e) {
        var len = this.value.length;
        if (len > 300) {
            this.value = this.value.substring(0,300);
        } else {
            $(this).closest('form').find('.words_left .count').html(300 - len);
        }
    });

    $("input[name='search_block_form']").attr('placeholder', 'Поиск по сайту');


    /* Callback form */
    $(".back-call a, .region-partnership .block-block .cboxElement").click(function () {
        var $modal = $(".callback");

        $modal.show();
        $('#callback-overlay').show();

        if (!$modal.find(".close-modal").size()) {
            $modal
                .find(".block-title-wrap")
                .append("<a class='close-modal'></a>");

            $modal
                .find("a.close-modal")
                .css({
                    cursor: "pointer",
                    background: 'url("/sites/all/themes/bartik/images/close.png")',
                    width: "13px",
                    height: "13px",
                    position: "absolute",
                    right: 0,
                    top: "-25%"
                })
                .on('click', function () {
                    $modal.find('.form-text, .form-email, .form-textarea').val('');
                    $modal.hide();
                    $('#callback-overlay').hide();
                    $('#webform-client-form-50').find('.words_left .count').html(300);
                });
        }

        $('body').on('click', function(e) {
           if ($(e.target).closest('.callback').size() == 0) {
               $("a.close-modal").click();
           }
        });

        $(".callback")
            .find(".form-submit")
            .on('mouseover', function () {
                var requiredValues = [];
                $(this).parents("form").find(".form-text.required").each(function () {
                    requiredValues.push($(this).val());
                });

                if (!requiredValues[0] || !requiredValues[1]) {
                    $(this).on("click", function () {
                        if (!requiredValues[0]) {
                            $(this).parents("form").find(".form-text.required").eq(0).focus();
                        } else {
                            $(this).parents("form").find(".form-text.required").eq(1).focus();
                        }

                        return false;
                    });
                } else {
                    $(this).on("click", function () {
                        $(this).parents("form").submit();
                    });
                }

                return false;
            });

        return false;
    });

    $(".region-news").find(".submitted").map(function () {
        var date = $(this).find("span:eq(0)").attr('content').split('T')[0].substr(2).split('-').reverse().join('.');
        return $(this).parents("div:eq(0)").find(".content").siblings('.link-wrapper').prepend("<span class='date'>"+date+"</span");
    });

    var resizeImagesIterations = 0;
    function resizeImages() {
        $('body.not-front .lightbox-processed img').each(function(){
            var $this = $(this);
            if(!$this.hasClass('landscape')) {
                var img = new Image();
                img.src = this.src;
                if (img.width/img.height > 200/280) $this.addClass('landscape');
            }
        });
        resizeImagesIterations++;
        if (resizeImagesIterations >= 10) clearInterval(resizeImagesInterval);
    }
    var resizeImagesInterval = setInterval(resizeImages, 2000);

    $('.affiliate-button').on('click', function() {
        $('html, body').animate({
            scrollTop: $('#contacts').offset().top
        }, 1000);
        $('#edit-submitted-name').focus();
    });


// Sidebar-left menu.

    $(function() {
        var jqBarStatus = true;
            $(window).scroll(function() {
            scrPos = document.body.scrollTop;

        //For "Home"
        if (scrPos <= 100) {
            $(".home-link .home").addClass("sideactive");

        }
        else if (scrPos >= 477){
            $(".home-link .home").removeClass("sideactive");
        }

         //For "About"
		if($('#about').length)
		{
			var scrollEvent = ($(window).scrollTop() > ($('#about').position().top - $(window).height()));
			if (scrollEvent && jqBarStatus) {
				$(".home-link .home").removeClass("sideactive");
				$(".about .comp").addClass("sideactive");
			}
			else {
				$(".about .comp").removeClass("sideactive");
			}
		}
        //For "Services"

		if($('#services').length)
		{
			var scrollEvent = ($(window).scrollTop() > ($('#services').position().top - $(window).height()));
			if (scrollEvent && jqBarStatus) {
				$(".about .comp").removeClass("sideactive");
				$(".services .services").addClass("sideactive");
			}
			else {
				$(".services .services").removeClass("sideactive");
			}
		}
        //For "Portfolio"

		if($('#portfolio').length)
		{
			var scrollEvent = ($(window).scrollTop() > ($('#portfolio').position().top - $(window).height()));
			if (scrollEvent && jqBarStatus) {
				$(".services .services").removeClass("sideactive");
				$(".portfolio .port").addClass("sideactive");
			}
			else {
				$(".portfolio .port").removeClass("sideactive");
			}
		}

        //For "Partnership"
		if($('#partnership').length)
		{
			var scrollEvent = ($(window).scrollTop() > ($('#partnership').position().top - $(window).height()));
			if (scrollEvent && jqBarStatus) {
				$(".portfolio .port").removeClass("sideactive");
				$(".partnership .coop").addClass("sideactive");
			}
			else {
			$(".partnership .coop").removeClass("sideactive");
			}
		}
        //For "Partners"

		if($('#partner').length)
		{
			var scrollEvent = ($(window).scrollTop() > ($('#partners').position().top - $(window).height()));
			if (scrollEvent && jqBarStatus) {
				$(".partnership .coop").removeClass("sideactive");
				$(".partners .partners").addClass("sideactive");
			}
			else {
			$(".partners .partners").removeClass("sideactive");
			}
		}
        //For "Contacts"

        if($('#contacts').length)
		{
			var scrollEvent = ($(window).scrollTop() > ($('#contacts').position().top - $(window).height()));
			if (scrollEvent && jqBarStatus) {
				$(".partners .partners").removeClass("sideactive");
				$(".contacts .cont").addClass("sideactive");
			}
			else {
				$(".contacts .cont").removeClass("sideactive");
			}
		}
    });
    });


	if($(window).width() <= 700) {
		$('#cboxTitle').remove();
	}
	
	if($('.carousel.portfolio .field-name-field-portfolio-images').length)
	{
		var $carousel = $('.carousel.portfolio');
		$carousel.find('.field-name-field-portfolio-images').addClass('carousel_wrap');
		var visible   = Math.floor($carousel.find('.carousel_wrap').outerWidth() / $carousel.find('.carousel_wrap .field-item').first().outerWidth());
		
		
		$carousel.prepend('<span class="carousel_arrow prev"/>');
		$carousel.append('<span class="carousel_arrow next"/>');
		
		$carousel.jCarouselLite
		({
			containerSelector: 'div.field-items',
			itemSelector: 'div.field-item',
			vertical: false,
			btnPrev: '.carousel.portfolio .carousel_arrow.prev',
			btnNext: '.carousel.portfolio .carousel_arrow.next',
			visible: visible,
			auto: 1,
			timeout: 3000,
			easing: 'linear',
			circular: false,
			scroll: 1,
			mouseWheel: false,
			autoCSS: false,
			init: function(opts, $list)
			{
				if(opts.circular)
				{
					$(this).find(opts.containerSelector).css('left', '-' + (opts.visible * $list.first().outerWidth()) + 'px');
				}
			}
		});
	}
});



;(function () {

	'use strict';

	// iPad and iPod detection
	var isiPad = function(){
	  return (navigator.platform.indexOf("iPad") != -1);
	}

	var isiPhone = function(){
    return (
      (navigator.platform.indexOf("iPhone") != -1) ||
      (navigator.platform.indexOf("iPod") != -1)
    );
	}

	// Mobile Menu Clone ( Mobiles/Tablets )
	var mobileMenu = function() {
		if ( $(window).width() < 769 ) {
			$('html,body').addClass('overflow');

			if ( $('#mobile-menu').length < 1 ) {

				var clone = $('#primary-menu').clone().attr({
					id: 'mobile-menu-ul',
					class: ''
				});
				var cloneLogo = $('#logo').clone().attr({
					id : 'logo-mobile',
					class : ''
				});

				$('<div id="logo-mobile-wrap">').append(cloneLogo).insertBefore('#header-section');
				$('#logo-mobile-wrap').append('<a href="#" id="mobile-menu-btn"><i class="ti-menu"></i></a><i class="fa fa-phone" aria-hidden="true"> <i class="fa fa-whatsapp" aria-hidden="true"></i> 011 6467-1313</i> <a style="margin-left:5px" href="contact.html"><i class="fa fa-map-marker" aria-hidden="true"> CONTACTO </i></a>')
				$('<div id="mobile-menu">').append(clone).insertBefore('#header-section');

				$('#header-section').hide();
				$('#logo-mobile-wrap').show();
			} else {
				$('#header-section').hide();
				$('#logo-mobile-wrap').show();
			}

		} else {

			$('#logo-mobile-wrap').hide();
			$('#header-section').show();
			$('html,body').removeClass('overflow');
			if ( $('body').hasClass('mobile-menu-visible')) {
				$('body').removeClass('mobile-menu-visible');
			}
		}
	};


	// Parallax
  // var scrollBanner = function () {
  //   var scrollPos = $(this).scrollTop();
  //   console.log(scrollPos);
  //   $('.hero-intro').css({
  //     'opacity' : 1-(scrollPos/300)
  //   });
  // }


	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#mobile-menu, #mobile-menu-btn");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      $('body').removeClass('mobile-menu-visible');
	    }
		});
	};


	// Mobile Button Click
	var mobileBtnClick = function() {
		$(document).on('click', '#mobile-menu-btn', function(e){
			e.preventDefault();
			if ( $('body').hasClass('mobile-menu-visible') ) {
				$('body').removeClass('mobile-menu-visible');
			} else {
				$('body').addClass('mobile-menu-visible');
			}

		});
	};

	$("#searchInput").keyup(function () {
    //split the current value of searchInput
    var data = this.value.toUpperCase().split(" ");
    //create a jquery object of the rows
    var jo = $("#fbody").find("tr");
    if (this.value == "") {
        jo.show();
        return;
    }
    //hide all the rows
    jo.hide();

    //Recusively filter the jquery object to get results.
    jo.filter(function (i, v) {
        var $t = $(this);
        for (var d = 0; d < data.length; ++d) {
            if ($t.is(":contains('" + data[d] + "')")) {
                return true;
            }
        }
        return false;
    })
    //show the rows that match.
    .show();
}).focus(function () {
    this.value = "";
    $(this).css({
        "color": "black"
    });
    $(this).unbind('focus');
}).css({
    "color": "#C0C0C0"
});


	// Main Menu Superfish
	var mainMenu = function() {

		$('#primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Superfish Sub Menu Click ( Mobiles/Tablets )
	var mobileClickSubMenus = function() {

		$('body').on('click', '.sub-ddown', function(event) {
			event.preventDefault();
			var $this = $(this),
				li = $this.closest('li');
			li.find('> .sub-menu').slideToggle(200);
		});

	};

	// Window Resize
	var windowResize = function() {
		$(window).resize(function(){
			mobileMenu();
		});

	};

	// Window Scroll
	var windowScroll = function() {
		$(window).scroll(function() {

			var scrollPos = $(this).scrollTop();
			if ( $('body').hasClass('mobile-menu-visible') ) {
				$('body').removeClass('mobile-menu-visible');
			}

			if ( $(window).scrollTop() > 70 ) {
				$('#header-section').addClass('scrolled');
			} else {
				$('#header-section').removeClass('scrolled');
			}


			// Parallax
			$('.hero-intro').css({
	      'opacity' : 1-(scrollPos/300)
	    });

		});
	};

	// Fast Click for ( Mobiles/Tablets )
	var mobileFastClick = function() {
		if ( isiPad() && isiPhone()) {
			FastClick.attach(document.body);
		}
	};

	// Easy Repsonsive Tabs
	var responsiveTabs = function(){

		$('#tab-feature').easyResponsiveTabs({
      type: 'default',
      width: 'auto',
      fit: true,
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'

    });
    $('#tab-feature-center').easyResponsiveTabs({
      type: 'default',
      width: 'auto',
      fit: true,
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'

    });
    $('#tab-feature-vertical').easyResponsiveTabs({
      type: 'vertical',
      width: 'auto',
      fit: true,
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'
    });
	};

	// Owl Carousel
	var owlCrouselFeatureSlide = function() {

		var owl2 = $('.owl-carousel-2');
		owl2.owlCarousel({
				items: 1,
		    loop: true,
		    margin: 0,
		    lazyLoad: true,
		    responsiveClass: true,
		    nav: true,
		    dots: true,
		    smartSpeed: 500,
		    navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	],
		    responsive: {
		        0: {
		          items: 1,
		          nav: true
		        },
		        600: {
		          items: 1,
		          nav: true,
		        },
		        1000: {
		          items: 1,
		          nav: true,
		        }
	    	}
		});
	};

	// MagnificPopup
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
	};

	$(function(){

		mobileFastClick();
		responsiveTabs();
		mobileMenu();
		mainMenu();
		magnifPopup();
		mobileBtnClick();
		mobileClickSubMenus();
		mobileMenuOutsideClick();
		owlCrouselFeatureSlide();
		windowResize();
		windowScroll();


	});


}());

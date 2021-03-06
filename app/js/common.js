$(document).ready(function(){

	var nHeight = $('.first').height(),
	lastScrollTop = 0;

	function addScroll() {
		var scroll = $(document).scrollTop();
		var st = window.pageOffset || document.documentElement.scrollTop;
		if (!$('body').is('.disabled')) {
			if (st > lastScrollTop && scroll < nHeight ) {
				// downscroll code
				$('body').addClass('disabled');
				$('body, html').animate({scrollTop: nHeight }, 400, function () {
					$('body').removeClass('disabled');
				});
			} else if (st < lastScrollTop && scroll < nHeight ) {
				// upscroll code
				$('body').addClass('disabled');
				$('body, html').animate({scrollTop: 0}, 400, function () {
					$('body').removeClass('disabled');
				});
			}
		}
		lastScrollTop = st;
	};
	
	$(document).on('scroll', addScroll);

		//карусель продуктов
	function carousel(block, arow) {
		$(block).owlCarousel({
  			nav: true,
  			loop: true,
  			dots: false,
  			autoplay: true,
  			autoplayHoverPause: true,
  			navContainer: arow,
 			responsive:{ 
					0:{
						items:1
					},
					500:{
						items:2
					},
					992:{
						items:3
					}
			}	
  		});
	};

	carousel('.owl-carousel', '.owl-arow');

	$('.navigation__link').click(function menyDropdown() {
		console.log($('.main').offset().top + "px")
		if ($(this).siblings('.dropdown').hasClass('dropdown_open')) {
			$(this).siblings('.dropdown').removeClass('dropdown_open');
		} else {
			$('.dropdown').removeClass('dropdown_open');
			$(this).siblings('.dropdown').addClass('dropdown_open');
		}
		if ($('.dropdown').hasClass('dropdown_open')) {
			$('.dropdown__bg').addClass('dropdown__bg_open');
		} else {
			$('.dropdown__bg').removeClass('dropdown__bg_open');
		}
	});

	$('.burger').click(function burgerOpen() {
		if ($(window).outerWidth() > 992) {
		if ($(this).hasClass('burger_open')) {
			$(this).removeClass('burger_open');
			$('.burger-meny').removeClass('burger-meny_open');
			$('.head').removeClass('head_static');
		} else {
			$(this).addClass('burger_open');
			$('.burger-meny').addClass('burger-meny_open');
			$('.head').addClass('head_static');

		}
	}
	if ($(window).outerWidth() <= 992) {
		if ($(this).hasClass('burger_open')) {
			$(this).removeClass('burger_open');
			$('.head').removeClass('head_menu-open');
		} else {
			$(this).addClass('burger_open');
			$('.head').addClass('head_menu-open');
		}
	}
})


	// seo scroll

	var textPercent = $('.scroll__wrap').height() / 100;
	var trackPercent = $('.scroll__track').height() / 100;
	var textVisible = $('.scroll__track').height() / textPercent;
	var barHeight = textVisible * trackPercent;
	var ismousedown;
	$('.scroll__bar').height(barHeight + 'px');
	

	$('.scroll__bar').mousedown(function scrollDown() {
		ismousedown = true;
	});

	$(this).mousemove(function scrollMove(e) {
		if (ismousedown) {
			var mouseY = e.pageY;
			var barPosition = $('.scroll__bar').position().top;
			var barOffset =  $('.scroll__bar').offset().top;
			var mouseMove = mouseY - $('.scroll__track').offset().top;
			
			if (mouseMove >= 0 && mouseMove <= $('.scroll__track').height() - barHeight) {
				$('.scroll__bar').css({
					"top": mouseMove + "px"
				});
				var movePrecent = barPosition / trackPercent;
				var moveText = movePrecent * textPercent;
				$('.scroll__wrap').css({
					"top": - moveText + "px"
				});
			}
		}
	})

	$(this).mouseup(function(e){
		ismousedown = false;
	});

	$('.scroll').scroll(function (e) {
		$('.scroll__bar').css({
			"top": - $('.scroll__wrap').position().top / textPercent * trackPercent + "px"
		})
	})

})
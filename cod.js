const headerburger = document.querySelector('.header__burger');
headerburger.addEventListener('click', function burger(){
  
	headerburger.classList.add('active');
  
  const menu = document.querySelector('.burger__menu');
  menu.classList.add('active');
  
  



});
const buttonClose = document.querySelector('.burger__close');
buttonClose.addEventListener('click', function burger(){
    const burger = document.querySelector('.header__burger');
    burger.classList.remove('active');
    
    const menu = document.querySelector('.burger__menu');
    menu.classList.remove('active');
    
    
    
    
  });


document.addEventListener('click', function (e) {
	const tgEl = e.target
	if(!tgEl.closest('.burger')){
		const burger = document.querySelector('.header__burger');
    burger.classList.remove('active');
    
    const menu = document.querySelector('.burger__menu');
    menu.classList.remove('active');
	}
  })



  const swiper = new Swiper('.slider-city', {


    autoHeight: true,

    obserwer: true,
    spaceBetween: 0,
    speed: 600,
    loop: true ,





    navigation: {
        nextEl: '.slider-city__swiper-button-next',
        prevEl: '.slider-city__swiper-button-prev',

    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        380: {
            slidesPerView: 1.2,
			spaceBetween: 20,
        },
        500: {
            slidesPerView: 1.6,
            spaceBetween: 20,
        },
        650: {
            slidesPerView: 2.2,
            spaceBetween: 20,
        },
        780: {
            slidesPerView: 2.4,
            spaceBetween: 40,
        },
        970: {
            slidesPerView: 3.2,
            spaceBetween: 40,
        },
        1440: {
            slidesPerView: 4.3,
            spaceBetween: 40,
        },
    }
});











const spollersArray = document.querySelectorAll('[data-spollers]');
let slideUp = (target, duration = 500) => {
	if (!target.classList.contains("_slide")) { 
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop= 0; 
		target.style.paddingBottom= 0;
		target.style.marginTop = 0; 
		target.style.marginBottom= 0;
		
		window.setTimeout(() => { 
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top'); 
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property'); 
			target.classList.remove('_slide');
			
		}, duration);
	
	}
}
let slideDown = (target, duration = 500)  => { 
	if (!target.classList.contains('_slide')) {
		target.classList.add("_slide"); 
		if (target.hidden) {
			target.hidden = false;
		}	
		let height = target.offsetHeight;
		target.style.overflow = 'hidden'; 
		target.style.height = 0;
		target.style.paddingTop= 0;
		target.style.paddingBottom=0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0; 
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding"; 
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + 'px'; 
		target.style.removeProperty("padding-top");
		target.style.removeProperty("padding-botton");
		target.style.removeProperty("margin-top");
		target.style.removeProperty("margin-bottom");
		
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty('transition-property');
			target.classList.remove("_slide");
		
		}, duration);
	}
}




let slideToggle = (target, duration = 500) => { 
	if (target.hidden) {
			return slideDown(target, duration);
	} else {
			return slideUp(target, duration);
		
	}
}
if (spollersArray.length > 0) { 
	
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});

	
	if (spollersRegular.length > 0) {
		initSpollers (spollersRegular);
	}

	
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);

		});

		
		let mediaQueries = breakpointsArray.map(function (item) { 
			return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index , self) {
			return self.indexOf(item) === index;
		});

		
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(","); 
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			
			const spollersArray = breakpointsArray.filter(function (item) { 
				if (item.value === mediaBreakpoint && item.type === mediaType) {
				return true;
				}
			});


			matchMedia.addListener(function () {

				initSpollers (spollersArray, matchMedia);
			});


			initSpollers (spollersArray, matchMedia);
		});
	}

		function initSpollers (spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
				
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
		function initSpollerBody(spollersBlock, hideSpollerBody= true) { 
			const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
			if (spollerTitles.length > 0) { spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute("tabindex");
						if (!spollerTitle.classList.contains('active')) {
							spollerTitle.nextElementSibling.hidden = true;

						}

					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.nextElementSibling.hidden = false;
					}	
				});
			}
		}
	
	function setSpollerAction(e) {
    
		const el = e.target; 
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('active');
				slideToggle(spollerTitle.nextElementSibling , 500  );
			}
				e.preventDefault();
		}
	}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller].active');
			if (spollerActiveTitle) { 
				spollerActiveTitle.classList.remove('active');
				slideUp(spollerActiveTitle.nextElementSibling, 500);
			}
		}
}







document.addEventListener('click', function (e) {
	const tgEl = e.target;
	if (tgEl.closest('[data-lang]')){
		let lang = tgEl.dataset.lang
		
		for (let key in langArr){
			let elem = document.querySelector('.lang-'+key)
			if(elem){
				
					document.querySelector('.lang-'+key).innerHTML = langArr[key][lang];
					
				
				
			}
			
		}
	}
	
  })

















  const animItems = document.querySelectorAll('[data-anims]');
if (animItems.length > 0) {
window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) { 
			const animItem = animItems [index];
			const animItemHeight = animItem.offsetHeight
			const animItemOffset = offset (animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) { 
				animItem.classList.add('active-anim');
			} else {
				animItem.classList.remove('active-anim');
			}

			animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}
			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('active');
			} else {
				//remove class
				//animItem.classList.remove('_active');
			}
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset ||document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	
	//setTimeout (() => {
	//	animOnScroll();
	//}, time );

	animOnScroll();

	
}












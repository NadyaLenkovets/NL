//  ===========  LOADER  ===========  //

let mask = document.querySelector('#mask');
window.addEventListener('load', function timer() {
   window.setTimeout(maskFade, 1800);
})

function maskFade() {
   mask.classList.add('hide');
   setTimeout(maskRemove, 300);
   document.documentElement.classList.add('preloader');
};

function maskRemove() {
   mask.remove();
};


//  ===========  THEME SWITCHER  ===========  //

const themeSwitcher = document.getElementById('theme-switcher');
const themeSwitcherBody = document.getElementById('theme-switcher__body');

themeSwitcher.addEventListener('click', function() {
   document.body.classList.toggle('dark');
   document.body.classList.toggle('light');
})



//  ===========  SCROLL-UP BUTTON  ===========  //

// При нажатии кнопки идти вверх;

document.getElementById('button-up').onclick = function scrollUpFunction() {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
}

// Кнопка появляется, когда проскролили 500px

window.onscroll = function() {scrollFunction()}

function scrollFunction() {
   if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      document.getElementById('button-up').style.opacity = "1";
      
   } else {
      document.getElementById('button-up').style.opacity = "0";
   }



 //  ===========  FIXED BURGER MENU  ===========  //

 // Когда проскролили больше 300px,
 // меню становится черным;

   if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      document.getElementById('header-burger').style.backgroundColor = "rgba(255, 255, 255, 0.8)";
      themeSwitcher.style.opacity = "0";
   } else {
      document.getElementById('header-burger').style.backgroundColor = "transparent";
      themeSwitcher.style.opacity = "1";
   }
}


 //  ===========  ANIMATION  ===========  //

const animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll);
   function animOnScroll() {
      for (let i = 0; i < animItems.length; i++) {
         const animItem = animItems[i];
         const animItemHeight = animItem.offsetHeight;
         const animItemOffset = offset(animItem).top;
         const animStart = 4;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;

         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }

         if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
            animItem.classList.add('anim-active');
         } else {
            if (!animItem.classList.contains('anim-no-hide')) {
               animItem.classList.remove('anim-active');
            }
         }
      }
   }

   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
   }

   setTimeout(() => {
      animOnScroll();
   }, 300);

   animOnScroll();
}
   


$(function () {

   /* Slider slick  #introSlider
   =============================*/

   $('#testimonials-slider').slick({
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      fade: false,
      vertical: true,
      responsive: [
         {
            breakpoint: 991,
            settings: {
               arrows: false,
            }
         }
      ]
   });


   /* burger-menu
   =============================*/

   $('.header-burger, .menu-close').click(function (event) {
      $('.header-burger, .menu').toggleClass('active');
      if ($(window).width() < 991) {
         $('body').toggleClass('no-scroll');
      }
      if ($('.menu').hasClass('active')) {
         $('.header-nav__link').click(function (event) {
            $('.header-burger,.menu').removeClass('active');
            if ($(window).width() < 991) {
               $('body').removeClass('no-scroll');
            }
         });   
      };

      $(document).mouseup(function (e) {     
         if ($('.menu').has(e.target).length === 0 && $('.menu').hasClass('active')){
            $('.menu').toggleClass('active');
            if ($(window).width() < 991) {
               $('body').removeClass('no-scroll');
            }
         };
      });
   });
  

   /* spoiler
   =============================*/

   $(document).ready(function() {
      $('.spoiler__title').click(function(event) {
         if($('.technologies-box__container').hasClass('one')) {
            $('.spoiler__title').not($(this)).removeClass('active');
            $('.spoiler__text').not($(this).next()).slideUp(300);
         }
         $(this).toggleClass('active').next().slideToggle(300);
      });
   });
         
   


   /* Modal
   =============================*/

   const modalCall = $("[data-modal]");
   const modalClose = $("[data-close]");

   modalCall.on("click", function(event) {
      event.preventDefault();
      let $this = $(this);
      let modalId = $this.data('modal');
      if ($(window).width() > 767) {
         $(modalId).addClass('show');
         $('body').addClass('no-scroll');
      } 
      setTimeout(function () {
         $(modalId).find(".modal__dialog").css({
            transform: "translateX(0)"
         });
      }, 200);
   });


   modalClose.on("click", function(event) {
      event.preventDefault();
      let $this = $(this);
      let modalParent = $this.parents('.modal');

      modalParent.find(".modal__dialog").css({
      transform: "translateX(-120%)"
      });
   
      setTimeout(function () {
         modalParent.removeClass('show');
         $('body').removeClass('no-scroll');
      }, 200);

   });

   $('.modal').on("click", function(event) {
      $(this).removeClass('show');
      $('body').removeClass('no-scroll');
   });
   $('.modal__dialog').on("click", function(event) {
      event.stopPropagation();
   });



});
/*
Template: Server360 - Responsive Bootstrap 4 Admin Dashboard Template
Author: iqonicthemes.in
Design and Developed by: iqonicthemes.in
NOTE: This file contains the styling for responsive Template.
*/

(function(jQuery) {
    "use strict";

    jQuery(document).ready(function() {

        /*---------------------------------------------------------------------
        Tooltip
        -----------------------------------------------------------------------*/
        if (jQuery.fn.popover) {
            jQuery('[data-toggle="popover"]').popover();
        }
        if (jQuery.fn.tooltip) {
            jQuery('[data-toggle="tooltip"]').tooltip();
        }

        /*---------------------------------------------------------------------
        Sidebar Widget
        -----------------------------------------------------------------------*/
        function checkClass(ele, type, className) {
            switch (type) {
                case 'addClass':
                    if (!ele.hasClass(className)) {
                        ele.addClass(className);
                    }
                    break;
                case 'removeClass':
                    if (ele.hasClass(className)) {
                        ele.removeClass(className);
                    }
                    break;
                case 'toggleClass':
                    ele.toggleClass(className);
                    break;
            }
        }

        /*---------------------------------------------------------------------
        Magnific Popup
        -----------------------------------------------------------------------*/
        if (jQuery.fn.magnificPopup) {
            jQuery('.popup-gallery').magnificPopup({
                delegate: 'a.popup-img',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1]
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                    titleSrc: function(item) {
                        return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                    }
                }
            });
            jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }

        /*---------------------------------------------------------------------
        Ripple Effect
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', ".iq-waves-effect", function(e) {
            jQuery('.ripple').remove();
            let posX = jQuery(this).offset().left,
                posY = jQuery(this).offset().top,
                buttonWidth = jQuery(this).width(),
                buttonHeight = jQuery(this).height();

            jQuery(this).prepend("<span class='ripple'></span>");

            if (buttonWidth >= buttonHeight) {
                buttonHeight = buttonWidth;
            } else {
                buttonWidth = buttonHeight;
            }

            let x = e.pageX - posX - buttonWidth / 2;
            let y = e.pageY - posY - buttonHeight / 2;

            jQuery(".ripple").css({
                width: buttonWidth,
                height: buttonHeight,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");
        });

        /*---------------------------------------------------------------------
        Sidebar Widget Active Menu
        -----------------------------------------------------------------------*/
        jQuery(document).on("click", '.iq-menu > li > a', function() {
            jQuery('.iq-menu > li > a').parent().removeClass('active');
            jQuery(this).parent().addClass('active');
        });

        /*---------------------------------------------------------------------
        Page faq
        -----------------------------------------------------------------------*/
        jQuery('.iq-accordion .iq-accordion-block .accordion-details').hide();
        jQuery('.iq-accordion .iq-accordion-block:first').addClass('accordion-active').children().slideDown('slow');
        jQuery(document).on("click", '.iq-accordion .iq-accordion-block', function() {
            if (jQuery(this).children('div.accordion-details ').is(':hidden')) {
                jQuery('.iq-accordion .iq-accordion-block').removeClass('accordion-active').children('div.accordion-details ').slideUp('slow');
                jQuery(this).toggleClass('accordion-active').children('div.accordion-details ').slideDown('slow');
            }
        });

        /*---------------------------------------------------------------------
        Page Loader
        -----------------------------------------------------------------------*/
        jQuery("#load").fadeOut();
        jQuery("#loading").delay(100).fadeOut("slow");

        /*---------------------------------------------------------------------
        Owl Carousel
        -----------------------------------------------------------------------*/
        if (jQuery.fn.owlCarousel) {
            jQuery('.owl-carousel').each(function() {
                let jQuerycarousel = jQuery(this);
                jQuerycarousel.owlCarousel({
                    items: jQuerycarousel.data("items"),
                    loop: jQuerycarousel.data("loop"),
                    margin: jQuerycarousel.data("margin"),
                    nav: jQuerycarousel.data("nav"),
                    dots: jQuerycarousel.data("dots"),
                    autoplay: jQuerycarousel.data("autoplay"),
                    autoplayTimeout: jQuerycarousel.data("autoplay-timeout"),
                    navText: ["<i class='fa fa-angle-left fa-2x'></i>", "<i class='fa fa-angle-right fa-2x'></i>"],
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: jQuerycarousel.data("items-mobile-sm"),
                            nav: false,
                            dots: true
                        },
                        480: {
                            items: jQuerycarousel.data("items-mobile"),
                            nav: false,
                            dots: true
                        },
                        786: {
                            items: jQuerycarousel.data("items-tab")
                        },
                        1023: {
                            items: jQuerycarousel.data("items-laptop")
                        },
                        1199: {
                            items: jQuerycarousel.data("items")
                        }
                    }
                });
            });
        }

        /*---------------------------------------------------------------------
        Select input
        -----------------------------------------------------------------------*/
        if (jQuery.fn.select2) {
            jQuery('.select2jsMultiSelect').select2({
                tags: true
            });
        }

        /*---------------------------------------------------------------------
        Search input
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', function(e) {
            let myTargetElement = e.target;
            let selector, mainElement;
            if (jQuery(myTargetElement).hasClass('search-toggle') || jQuery(myTargetElement).parent().hasClass('search-toggle') || jQuery(myTargetElement).parent().parent().hasClass('search-toggle')) {
                if (jQuery(myTargetElement).hasClass('search-toggle')) {
                    selector = jQuery(myTargetElement).parent();
                    mainElement = jQuery(myTargetElement);
                } else if (jQuery(myTargetElement).parent().hasClass('search-toggle')) {
                    selector = jQuery(myTargetElement).parent().parent();
                    mainElement = jQuery(myTargetElement).parent();
                } else if (jQuery(myTargetElement).parent().parent().hasClass('search-toggle')) {
                    selector = jQuery(myTargetElement).parent().parent().parent();
                    mainElement = jQuery(myTargetElement).parent().parent();
                }
                if (!mainElement.hasClass('active') && jQuery(".navbar-list li").find('.active')) {
                    jQuery('.navbar-list li').removeClass('iq-show');
                    jQuery('.navbar-list li .search-toggle').removeClass('active');
                }

                selector.toggleClass('iq-show');
                mainElement.toggleClass('active');

                e.preventDefault();
            } else if (jQuery(myTargetElement).is('.search-input')) {} else {
                jQuery('.navbar-list li').removeClass('iq-show');
                jQuery('.navbar-list li .search-toggle').removeClass('active');
            }
        });

        /*---------------------------------------------------------------------
        Scrollbar Fix (تم إصلاح استدعاء Options)
        -----------------------------------------------------------------------*/
        let Scrollbar = window.Scrollbar;
        let defaultOptions = {}; // إضافة متغيرة خيارات افتراضية

        if (Scrollbar && document.querySelector('#sidebar-scrollbar')) {
            Scrollbar.init(document.querySelector('#sidebar-scrollbar'), defaultOptions);
        }
        if (Scrollbar && document.querySelector('#right-sidebar-scrollbar')) {
            Scrollbar.init(document.querySelector('#right-sidebar-scrollbar'), defaultOptions);
        }

        /*---------------------------------------------------------------------
        Counter
        -----------------------------------------------------------------------*/
        if (jQuery.fn.counterUp) {
            jQuery('.counter').counterUp({
                delay: 10,
                time: 1000
            });
        }

        /*---------------------------------------------------------------------
        Slick Slider
        -----------------------------------------------------------------------*/
        if (jQuery.fn.slick) {
            jQuery('.slick-slider').slick({
                centerMode: true,
                centerPadding: '60px',
                slidesToShow: 9,
                slidesToScroll: 1,
                focusOnSelect: true,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '30px',
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '15px',
                        slidesToShow: 1
                    }
                }],
                nextArrow: '<a href="#" class="ri-arrow-left-s-line left"></a>',
                prevArrow: '<a href="#" class="ri-arrow-right-s-line right"></a>',
            });

            jQuery('#new-music, #recent-music, #top-music').slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                focusOnSelect: true,
                arrows: false,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        slidesToShow: 1
                    }
                }]
            });
        }

        /*---------------------------------------------------------------------
        Progress Bar
        -----------------------------------------------------------------------*/
        jQuery('.iq-progress-bar > span').each(function() {
            let progressBar = jQuery(this);
            let width = jQuery(this).data('percent');
            progressBar.css({
                'transition': 'width 2s'
            });

            setTimeout(function() {
                if (jQuery.fn.appear) {
                    progressBar.appear(function() {
                        progressBar.css('width', width + '%');
                    });
                } else {
                    progressBar.css('width', width + '%');
                }
            }, 100);
        });

        /*---------------------------------------------------------------------
        Page Menu & Sidebar Toggle
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', '.wrapper-menu', function() {
            jQuery(this).toggleClass('open');
            jQuery("body").toggleClass("sidebar-main");
        });

        /*---------------------------------------------------------------------
        Wow Animation
        -----------------------------------------------------------------------*/
        if (typeof WOW !== 'undefined') {
            let wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: false,
                live: true
            });
            wow.init();
        }

        /*---------------------------------------------------------------------
        Form Validation
        -----------------------------------------------------------------------*/
        var forms = document.getElementsByClassName('needs-validation');
        Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });

        /*---------------------------------------------------------------------
        Todo Checklist
        -----------------------------------------------------------------------*/
        jQuery(document).on('click', '.todo-task-lists li', function() {
            let checkbox = jQuery(this).find('input:checkbox[name=todo-check]');
            if (checkbox.is(":checked")) {
                checkbox.prop("checked", false);
                jQuery(this).removeClass('active-task');
            } else {
                checkbox.prop("checked", true);
                jQuery(this).addClass('active-task');
            }
        });

        /*------------------------------------------------------------------
        Flatpicker
        -----------------------------------------------------------------*/
        if (typeof flatpickr !== 'undefined' && jQuery.isFunction(flatpickr)) {
            jQuery(".flatpicker").flatpickr({
                inline: true
            });
        }

        /*---------------------------------------------------------------------
        Scroll Up Menu
        -----------------------------------------------------------------------*/
        let position = jQuery(window).scrollTop();
        jQuery(window).scroll(function() {
            let scroll = jQuery(window).scrollTop();

            if (scroll < position) {
                jQuery('.tab-menu-horizontal').addClass('menu-up').removeClass('menu-down');
            } else {
                jQuery('.tab-menu-horizontal').addClass('menu-down').removeClass('menu-up');
            }
            if (scroll === 0) {
                jQuery('.tab-menu-horizontal').removeClass('menu-up menu-down');
            }
            position = scroll;
        });

        /*---------------------------------------------------------------------
        SignIn Or SignUp
        -----------------------------------------------------------------------*/
        if (jQuery(".sign-in-page").length) {
            const signUpButton = document.getElementById('signUp');
            const signInButton = document.getElementById('signIn');
            const container = document.getElementById('sign-in-page-box');

            if (signUpButton && container) {
                signUpButton.addEventListener('click', () => container.classList.add('right-panel-active'));
            }
            if (signInButton && container) {
                signInButton.addEventListener('click', () => container.classList.remove('right-panel-active'));
            }
        }

    });

})(jQuery);
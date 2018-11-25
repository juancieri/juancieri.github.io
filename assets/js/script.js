/* SMOOTH SCROLL */
$(function() {
  $('a.scroll[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

/* ADD CLASS WHEN SCROLL */
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
        $("body").addClass("scrolling");
    } else {
        $("body").removeClass("scrolling");
    }
});
$(document).ready(function(){
    $('.toTop').click(function(){
        var body = $('body');
        $('html,body').animate({
          scrollTop: body.offset().top
        }, 400);
    });
});

/* VIDEO HEADER */
function initVideoHeader() {
    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });
}

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}

/* TYPEFORM */
(function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'share.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}id=id+'_';if(!gi.call(d,id)){qs=ce.call(d,'link');qs.rel='stylesheet';qs.id=id;qs.href=b+'share-button.css';s=gt.call(d,'head')[0];s.appendChild(qs,s)}})()

/* TOGGLE MENU BUTTON */
$(document).ready(function(){
    $('#toggleMenu').click(function(){
        $('#menu').toggleClass('open');
        $('.page-overlay').fadeIn('fast');
    });
    $('#closeMenu, .page-overlay').click(function(){
        $('#menu').removeClass('open');
        $('.page-overlay').fadeOut('fast');
    });
    $('#menu').on('swipeleft', function(){
        $('#menu').removeClass('open')
    });
});


/* TOOLTIPS */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

/* TYPED */
function initTyped() {
    $("#typed").typed({
        stringsElement: $('#typed-strings')
    });
}

/* TEXT EDITOR RESPONSIVE */
function initEditorResponsive() {
    $('.post-details img').addClass('img-responsive');
    $('.post-details table').addClass('table').addClass('table-striped').addClass('table-hover').wrap("<div class='table-responsive'></div>");
    $('.post-details iframe').removeAttr('style').removeAttr('width').removeAttr('height').addClass('embed-responsive-item').wrap("<div class='embed-responsive embed-responsive-16by9'></div>");
}

/* POST CAROUSEL */
function initPostCarousel() {
    $('.post-carousel').owlCarousel({
        merge:false,
        loop:false,
        margin:10,
        lazyLoad:false,
        center:false,
        nav: true,
        navText: [
           "<i class='fa fa-angle-left fa-2x' aria-hidden='true'></i>",
            "<i class='fa fa-angle-right fa-2x' aria-hidden='true'></i>"
        ],
        autoplay: true,
        autoplayTimeout: 100,
        autoplayHoverPause: true,
        dots: false,
        dotsEach: false,
        responsive : {
            0 : {
                items: 1,
            },
            480 : {
                items: 3
            }
        },
    });
}

/* GRID */
function getHashFilter() {
  var hash = location.hash;
  // get filter=filterName
  var matches = location.hash.match( /filter=([^&]+)/i );
  var hashFilter = matches && matches[1];
  return hashFilter && decodeURIComponent( hashFilter );
}

function initGrid() {
    var $grid = $('#portfolio').isotope({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });

    $grid.imagesLoaded().progress( function() {$grid.isotope('layout');});

    $('.collapse').on('shown.bs.collapse', function () {
        $grid.isotope('layout');
    });
    $('.collapse').on('hidden.bs.collapse', function () {
        $grid.isotope('layout');
    });

  // bind filter button click
  var $filters = $('.nav-filter li').on( 'click', 'button', function() {
    var filterAttr = $( this ).attr('data-filter');
    // set filter in hash
    location.hash = 'filter=' + encodeURIComponent( filterAttr );
  });

  var isIsotopeInit = false;

  function onHashchange() {
    var hashFilter = getHashFilter();
    if ( !hashFilter && isIsotopeInit ) {
      return;
    }
    isIsotopeInit = true;
    // filter isotope
    $grid.isotope({
      itemSelector: '.grid-item',
      filter: hashFilter
    });
    // set selected class on button
    if ( hashFilter ) {
      $filters.find('.is-checked').removeClass('is-checked');
      $filters.find('[data-filter="' + hashFilter + '"]').addClass('is-checked');
    }
  }

  $(window).on( 'hashchange', onHashchange );
  // trigger event handler to init Isotope
  onHashchange();
}


/* SCROLLMAGIC JS */
function initScrollMagic(){
    
    var controller = new ScrollMagic.Controller();
    
    $('.section-panel.first .item').each(function(){
        
        var firstScene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.4
        })
        .setClassToggle(this, 'fade-in-left')
        /*.addIndicators({
            name: 'First Scene Items'
        })*/
        .addTo(controller);
        
    });
    
}
function initScrollMagic2() {
    
    var controller = new ScrollMagic.Controller();
    
    var wipeAnimation = new TimelineMax()
        .fromTo(".section-panel.bg-2", 1, {x: "-100%"}, {x: "0%", ease: Linear.easeNone})  // in from left
        .fromTo(".section-panel.bg-3",    1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})  // in from right
        .fromTo("#footer", 1, {y: "0%"}, {y: "0%", ease: Linear.easeNone}); // in from top

        var secondScene = new ScrollMagic.Scene({
            triggerElement: "#pinContainer",
            triggerHook: -0.2,
            duration: "300%"
        })
        .setPin("#pinContainer")
        .setTween(wipeAnimation)
        /*.addIndicators({
            name: 'Panels Scene'
        })*/
        .addTo(controller);
    
}

/* DIAGRAM */
function initDiagram() {
    var o = {
        init: function(){
            this.diagram();
        },
        random: function(l, u){
            return Math.floor((Math.random()*(u-l+1))+l);
        },
        diagram: function(){
            var r = Raphael('diagram', 600, 600),
                rad = 73,
                defaultText = 'Skills',
                speed = 250;

            r.circle(300, 300, 85).attr({ stroke: 'none', fill: '#193340' });

            var title = r.text(300, 300, defaultText).attr({
                font: '20px Arial',
                fill: '#fff'
            }).toFront();

            r.customAttributes.arc = function(value, color, rad){
                var v = 3.6*value,
                    alpha = v == 360 ? 359.99 : v,
                    random = o.random(91, 240),
                    a = (random-alpha) * Math.PI/180,
                    b = random * Math.PI/180,
                    sx = 300 + rad * Math.cos(b),
                    sy = 300 - rad * Math.sin(b),
                    x = 300 + rad * Math.cos(a),
                    y = 300 - rad * Math.sin(a),
                    path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
                return { path: path, stroke: color }
            }

            $('.get').find('.arc').each(function(i){
                var t = $(this), 
                    color = t.find('.color').val(),
                    value = t.find('.percent').val(),
                    text = t.find('.text').text();

                rad += 30;	
                var z = r.path().attr({ arc: [value, color, rad], 'stroke-width': 26 });

                z.mouseover(function(){
                    this.animate({ 'stroke-width': 50, opacity: .75 }, 1000, 'elastic');
                    if(Raphael.type != 'VML') //solves IE problem
                    this.toFront();
                    title.stop().animate({ opacity: 0 }, speed, '>', function(){
                        this.attr({ text: text + '\n' + value + '%' }).animate({ opacity: 1 }, speed, '<');
                    });
                }).mouseout(function(){
                    this.stop().animate({ 'stroke-width': 26, opacity: 1 }, speed*4, 'elastic');
                    title.stop().animate({ opacity: 0 }, speed, '>', function(){
                        title.attr({ text: defaultText }).animate({ opacity: 1 }, speed, '<');
                    });	
                });
            });

        }
    }
    $(function(){ o.init(); });
}

/* WHATSAPP CHAT */
function initWhatsappChat() {
    'use strict';
    
    var mobileDetect = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (mobileDetect) {
        $('#float-cta .whatsapp-msg-container').css('display','none');
        $('#float-cta > a').on('click', function(){
            window.location = 'https://api.whatsapp.com/send?phone=541161854503';
        });
    } else {
        $('#float-cta > a').click(function(){
            $(this).toggleClass('open');
            $('#float-cta .whatsapp-msg-container').toggleClass('open');
            $('#float-cta').toggleClass('open');
        });
        
        $('.btn-whatsapp-send').on('click', function(event){
            event.stopPropagation();
        });
        $('.btn-whatsapp-send').click(function() {
            var baseUrl = 'https://web.whatsapp.com/send?phone=541161854503&text=';
            var textEncode = encodeURIComponent($('#float-cta .whatsapp-msg-body textarea').val());
            window.open(baseUrl + textEncode, '_blank');
        });
    }
    
}
initWhatsappChat();
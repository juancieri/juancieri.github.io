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
    
    window.mobilecheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };
    
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
    
    if (mobilecheck == false || window.innerWidth >= 768) {
        var wipeAnimation = new TimelineMax()
        .fromTo(".section-panel.bg-2", 1, {x: "-100%"}, {x: "0%", ease: Linear.easeNone})  // in from left
        .fromTo(".section-panel.bg-3",    1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})  // in from right
        .fromTo("#footer", 1, {y: "-100%"}, {y: "0%", ease: Linear.easeNone}); // in from top

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
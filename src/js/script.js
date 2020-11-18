(function($,sr){
    // http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function(func, threshold, execAsap) {
        var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 50);
        };
    };

    // smartresize
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

(function ($) {

    "use strict";
    // Initiating Isotope
    var $container = $('.portfolio');

    var isotope = function () {
        $container.isotope({
            resizable: false,
            itemSelector: '.item',
        });
    };

    // Activating Isotope Filter Navigation
    $('#filterNav').on('click', 'li', function () {
        // remove active previous
        $('#filterNav').find('li').removeClass('active');
        // Add active class
        $(this).addClass('active');
        var selector = $(this).data('filter');
        $container.isotope({
            filter: selector
        });
    });

    // Calling Isotope
    isotope();
    $(window).smartresize(isotope);

    // Call after content loading
    $(window).load(function () {
        isotope();
    });

    $('body').on('click','#load-more',function(){
        var newcontent = [
            '<div class="item col-sm-6 col-md-4 col-lg-3 decor2"><img src="dist/images/WhatsApp Image 2020-09-10 at 11.53.34.jpeg" alt="portfolio-12"></div>',
            '<div class="item col-sm-6 col-md-4 col-lg-3 decor2"><img src="dist/images/WhatsApp Image 2020-09-10 at 11.54.37.jpeg" alt="portfolio-13"></div>',
            '<div class="item col-sm-6 col-md-4 col-lg-3 decor2"><img src="dist/images/WhatsApp Image 2020-09-10 at 11.55.32.jpeg" alt="portfolio-14"></div>',
            '<div class="item col-sm-6 col-md-4 col-lg-3 decor2"><img src="dist/images/WhatsApp Image 2020-09-10 at 12.00.36.jpeg" alt="portfolio-15"></div>',
            '<div class="item col-sm-6 col-md-4 col-lg-3 decor2"><img src="dist/images/WhatsApp Image 2020-09-10 at 12.00.43 (1).jpeg" alt="portfolio-16"></div>',
            '<div class="item col-sm-6 col-md-4 col-lg-3 decor2"><img src="dist/images/WhatsApp Image 2020-09-10 at 12.00.43.jpeg" alt="portfolio-17"></div>',
            '<div class="item col-sm-6 col-md-4 col-lg-3 decor2"><img src="dist/images/WhatsApp Image 2020-09-10 at 12.01.44.jpeg" alt="portfolio-18"></div>'
        ];


        var myVar = setInterval(myTimer, 80);
        var i = 0;
        function myTimer() {
            var item = $(newcontent[i]);
            $container.append( item ).isotope( 'addItems', item );

            if(i >= newcontent.length){
                clearInterval(myVar);
                $('#load-more').remove();
            }
            console.log(i);
            isotope();
            i++;
        }
    });



})(jQuery);
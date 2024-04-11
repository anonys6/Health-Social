window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const scrollLimit = 50; // adjust as needed
    const startWidth = 1475;
    const endWidth = 1000;
    const scrollPercent = Math.min(1, window.pageYOffset / scrollLimit);
    const newWidth = startWidth - ((startWidth - endWidth) * scrollPercent);

    navbar.style.top = `${25}px`;
    if (newWidth < 1050) {
        // navbar.style.cssText = `width: ${newWidth}px; border:none; background-color: rgba(0, 0, 0, 0.3); top:${scrollLimit - 30}px;`;
        navbar.style.cssText = `width: ${newWidth}px; border:none; background-color: #241f26; top:${scrollLimit - 30}px;`;
    } else {
        navbar.style.cssText = `width: ${newWidth}px; border: 1px solid white; background-color: rgba(128, 0, 128, 0.2); top:${scrollLimit - 40}px;`;
    }
});


$(document).ready(function () {
    $('.signup-form hr').waypoint(function (direction) {
        if (direction == "down") {
            $('.signup-form form .text').addClass('fadein-down');
        } else {
            $('.signup-form form .text').removeClass('fadein-down');
        }
    }, 
    {
        // offset: function() {
        //     return $(this.element).height() / 2; // Trigger when the element is halfway visible in the viewport
        // }   
        offset: '50%',     
    });

    $('.signup-form .text').waypoint(function (direction) {
        if (direction == "down") {
            $('.signup-form form .wrapper').addClass('fadein-down');
        } else {
            $('.signup-form form .wrapper').removeClass('fadein-down');
        }
    }, 
    {
        offset: '50%',     
    });
    
    $('.signup-form .wrapper').waypoint(function (direction) {
        if (direction == "down") {
            $('.signup-form form .formBtn').addClass('fadein-down');
        } else {
                $('.signup-form form .formBtn').removeClass('fadein-down');
        }
    }, 
    {
        offset: '60%',     
    });
});


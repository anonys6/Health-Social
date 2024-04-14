// window.addEventListener('scroll', function () {
//     const navbar = document.querySelector('.navbar');
//     const scrollLimit = 50; // adjust as needed
//     const startWidth = 1475;
//     const endWidth = 1000;
//     const scrollPercent = Math.min(1, window.pageYOffset / scrollLimit);
//     const newWidth = startWidth - ((startWidth - endWidth) * scrollPercent);

//     navbar.style.top = `${25}px`;
//     if (newWidth < 1050) {
//         // navbar.style.cssText = `width: ${newWidth}px; border:none; background-color: rgba(0, 0, 0, 0.3); top:${scrollLimit - 30}px;`;
//         navbar.style.cssText = `width: ${newWidth}px; border:none; background-color: #241f26; top:${scrollLimit - 30}px;`;
//     } else {
//         navbar.style.cssText = `width: ${newWidth}px; border: 1px solid white; background-color: rgba(128, 0, 128, 0.2); top:${scrollLimit - 40}px;`;
//     }
// });

$(document).ready(function () {
    
                
    $(".navbar").waypoint(function (direction) {
        if (direction == "down") {
            $(".navbar").addClass('navbar-sticky animate-nav-down');
        }
        else {
            $(".navbar").removeClass('navbar-sticky animate-nav-down');
        }
    });


    
    //Signup form
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

    //Login form
    $('.login-form hr').waypoint(function (direction) {
        if (direction == "down") {
            $('.login-form form .text').addClass('fadein-down');
        } else {
            $('.login-form form .text').removeClass('fadein-down');
        }
    },
        {
            offset: '50%',
        });

    $('.login-form .text').waypoint(function (direction) {
        if (direction == "down") {
            $('.login-form form .wrapper').addClass('fadein-down');
        } else {
            $('.login-form form .wrapper').removeClass('fadein-down');
        }
    },
        {
            offset: '50%',
        });

    $('.login-form .wrapper').waypoint(function (direction) {
        if (direction == "down") {
            $('.login-form form .formBtn').addClass('fadein-down');
        } else {
            $('.login-form form .formBtn').removeClass('fadein-down');
        }
    },
        {
            offset: '60%',
        });

    $('.login-form .formBtn').waypoint(function (direction) {
        if (direction == "down") {
            // $('#signupTarget').addClass('fadein-down')
            $('#signupTarget').addClass('opacity')
        } else {
            // $('#signupTarget').removeClass('fadein-down');
            $('#signupTarget').removeClass('opacity');
        }
    },
        {
            offset: '60%',
        });
});


window.onload = function () {
    tsParticles.load("tsparticles", {
        particles: {
            number: {
                value: 100
            },
            move: {
                enable: true
            },
            color: {
                value: "#ffffff"
            },

            // adding shape of particles
            shape: {
                type: "circle",
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            // changing the size of elements
            size: {
                value: 5,
                random: true,
                animation: {
                    enable: false,
                    speed: 40,
                    sync: false
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                },
            },
        }
    });
}
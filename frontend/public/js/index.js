$("nav").waypoint(function (direction) {
    if (direction == "down") {
        $("nav").addClass('navbar-sticky animate-nav-down');
    }
    else {
        $("nav").removeClass('navbar-sticky animate-nav-down');
    }
});


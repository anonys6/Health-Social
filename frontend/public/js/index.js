window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const scrollLimit = 50; // adjust as needed
    const startWidth = 1475;
    const endWidth = 1000;
    const scrollPercent = Math.min(1, window.pageYOffset / scrollLimit);
    const newWidth = startWidth - ((startWidth - endWidth) * scrollPercent);
    // const top = ;

    navbar.style.top = `${25}px`;
    navbar.style.width = `${newWidth}px`; // decrease width as you scroll down
});
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
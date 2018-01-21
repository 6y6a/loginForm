
;(function() {
    var path = document.querySelectorAll('.bg__path');
    var pathArray = Array.prototype.slice.call(path);

    function animation(path) {
        anime({
            targets: path,
            duration: anime.random(3000, 5000),
            easing: [0.5, 0, 0.5, 1],
            d: path.getAttribute('pathdata:id'),
            loop: true,
            direction: 'alternate'
        });
    }

    pathArray.forEach( function( path ) {
        setTimeout(animation(path), anime.random(0, 1000));
    });
})();






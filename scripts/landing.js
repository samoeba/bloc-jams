var animatePoints = function() {

    var points = document.getElementsByClassName('point');

    var pointsArray = function() {
        var newArray = [];
        for (var i = 0; i < points.length; i++) {
            newArray.push(points[i])
        }
        return newArray;
    };

    function forEach (array, callback) {
        array();
        callback();
    }

    function callbackFunc() {
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(0)";
        points[i].style.msTransform = "scaleX(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    }

    forEach(pointsArray, callbackFunc());

};

animatePoints();

window.onload = function() {

    if (window.innerHeight > 1200) {
        animatePoints(pointsArray);
    }

    window.addEventListener('scroll', function() {

        //console.log("Current offset from the top is " + pointsArray[0].getBoundingClientRect().top + " pixels");
        if (pointsArray[0].getBoundingClientRect().top <= 700) {
            animatePoints(pointsArray);
        }

    });

};








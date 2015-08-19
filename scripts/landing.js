var points = document.getElementsByClassName('point');

var animatePoints = function() {

    var pointsArray = function() {
        var newArray = [];
        for (var i = 0; i < points.length; i++) {
            newArray.push(points[i])
        }
        return newArray;
    };

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

///////////////////////////////////---------------------------------------------------------––––––––––––––––––––––

//var pointsArray = document.getElementsByClassName('point');
//
//var animatePoints = function(points) {
//
//    var revealFirstPoint = function() {
//        points[0].style.opacity = 1;
//        points[0].style.transform = "scaleX(1) translateY(0)";
//        points[0].style.msTransform = "scaleX(1) translateY(0)";
//        points[0].style.WebkitTransform = "scaleX(1) translateY(0)";
//    };
//
//    var revealSecondPoint = function() {
//        points[1].style.opacity = 1;
//        points[1].style.transform = "scaleX(1) translateY(0)";
//        points[1].style.msTransform = "scaleX(1) translateY(0)";
//        points[1].style.WebkitTransform = "scaleX(1) translateY(0)";
//    };
//
//    var revealThirdPoint = function() {
//        points[2].style.opacity = 1;
//        points[2].style.transform = "scaleX(1) translateY(0)";
//        points[2].style.msTransform = "scaleX(1) translateY(0)";
//        points[2].style.WebkitTransform = "scaleX(1) translateY(0)";
//    };
//
//    revealFirstPoint();
//    revealSecondPoint();
//    revealThirdPoint();
//
//};
//
//window.onload = function() {
//
//    if (window.innerHeight > 1200) {
//        animatePoints(pointsArray);
//    }
//
//    window.addEventListener('scroll', function() {
//
//        //console.log("Current offset from the top is " + pointsArray[0].getBoundingClientRect().top + " pixels");
//        if (pointsArray[0].getBoundingClientRect().top <= 700) {
//            animatePoints(pointsArray);
//        }
//
//    });
//
//};








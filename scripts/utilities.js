var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points) {

    var arrayMan = function () {
        var newArray = [];
        for (var i = 0; i < points.length; i++) {
            newArray.push(points[i])
        }
        return newArray;
    };

    function myCallback(index) {
        points[index].style.opacity = 1;
        points[index].style.transform = "scaleX(1) translateY(0)";
        points[index].style.msTransform = "scaleX(1) translateY(0)";
        points[index].style.WebkitTransform = "scaleX(1) translateY(0)";

        //console.log("The element at index " + index + " is " + element);
    }

    function forEach(array, callback) {
        // 1. Iterate over the array
        // 1a. Execute a callback for every item
        // 1b. Pass in the element, and its index into the callback execution
        // Array.prototype.forEach(index, element, array);

        // iterate over the array
        for (var i = 0; i < array.length; i++) {
            // execute the call back for every element
            callback(i);
            // callback(index, element, array)
        }
    }

    forEach(arrayMan(), myCallback);

};

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
/**
 * Created by SamCasey on 8/19/15.
 */
var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points) {

    var arrayMan = function () {
        var newArray = [];
        for (var i = 0; i < points.length; i++) {
            newArray.push(points[i])
        }
        return newArray;
    };

    function myCallback(index, element) {
        console.log("The element at index " + index + " is " + element);
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

    forEach(arrayMan, myCallback);

    };
}
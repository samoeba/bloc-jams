var points = document.getElementsByClassName('point');

var pointsArray = function() {
    var newArray = [];
    for (var i = 0; i < points.length; i++) {
        newArray.push(points[i])
    }
    return newArray;
};
//
//pointsArray().forEach(function(element) {
//    console.log(element + " has been logged.");
//});

function forEach(array, callback) {
    // 1. Iterate over the array
    // 1a. Execute a callback for every item
    // 1b. Pass in the element, and its index into the callback execution
    // Array.prototype.forEach(index, element, array);

    // iterate over the array
    for (var i = 0; i < array.length; i++) {
        // execute the call back for every element
        callback(i, array[i], array);
        // callback(index, element, array)
    }
}

function myCallback(index, element) {
    console.log("The element at index " + index + " is " + element);
}

forEach(pointsArray(), myCallback);
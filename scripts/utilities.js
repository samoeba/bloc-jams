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
    console.log(array);
    callback();
}

function myCallback() {
    console.log(" has been logged.");
}

forEach(pointsArray(), myCallback);

console.log(forEach);
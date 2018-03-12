/**
 * Created by anyderre on 04/03/18.
 */
'use strict'
var app = angular.module('cinemaApp', []);
app.filter('range', function() {
    return function(input, start, end) {
        start = parseInt(start);
        end = parseInt(end);
        var direction = (start <= end) ? 1 : -1;
        while (start != end) {
            input.push(start);
            start += direction;
        }
        return input;
    };
});


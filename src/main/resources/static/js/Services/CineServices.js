/**
 * Created by anyderre on 07/03/18.
 */

'use strict';
angular.module('cinemaApp').factory('CineServices', ['$http','$q', function ($http, $q) {

    return {
        fetchAllCine: fetchAllCine,
        createCine: createCine,
        updateCine: updateCine,
        deleteCine: deleteCine
    };


    function fetchAllCine() {
        var deferred = $q.defer();
        $http.get("/api/cine/")
            .then(
                function (response) {
                    deferred.resolve(response.data);
                }, function (errResponse) {
                    console.error(errResponse);
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }

    function createCine(cine) {
        var deferred = $q.defer();
        $http.post("/api/cine/", cine)
            .then(
                function (response) {
                    deferred.resolve(response.data)
                },function(errResponse){
                    console.error(errResponse);
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }

    function updateCine(cine, id) {
        var deferred = $q.defer();
        $http.put("/api/cine/"+id, cine).then(
            function (response) {
                deferred.resolve(response.data)
            },function(errResponse){
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
    function deleteCine(id) {
        var deferred = $q.defer();
        $http.delete("/api/cine/"+id)
            .then( function (response) {
                deferred.resolve(response.data)
            },function(errResponse){
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
}]);
/**
 * Created by anyderre on 07/03/18.
 */
'use strict';
angular.module('cinemaApp').factory('SurcusalServices', ['$http','$q', function ($http, $q) {

    return {
        fetchAllSurcusal: fetchAllSurcusal,
        fetchAllSurcusalByCine:  fetchAllSurcusalByCine,
        createSurcusal: createSurcusal,
        updateSurcusal: updateSurcusal,
        deleteSurcusal: deleteSurcusal

    };


    function fetchAllSurcusal() {
        var deferred = $q.defer();
        $http.get("/api/surcusal/")
            .then(
                function (response) {
                    deferred.resolve(response.data);
                }, function (errResponse) {
                    console.error(errResponse);
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }
    function fetchAllSurcusalByCine(id) {
        var deferred = $q.defer();
        $http.get("/api/surcusal/cine/"+id)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                }, function (errResponse) {
                    console.error(errResponse);
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }

    function createSurcusal(cine) {
        var deferred = $q.defer();
        $http.post("/api/surcusal/", cine)
            .then(
                function (response) {
                    deferred.resolve(response.data)
                },function(errResponse){
                    console.error(errResponse);
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }

    function updateSurcusal(cine, id) {
        var deferred = $q.defer();
        $http.put("/api/surcusal/"+id, cine).then(
            function (response) {
                deferred.resolve(response.data)
            },function(errResponse){
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
    function deleteSurcusal(id) {
        var deferred = $q.defer();
        $http.delete("/api/surcusal/"+id)
            .then( function (response) {
                deferred.resolve(response.data)
            },function(errResponse){
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
}]);
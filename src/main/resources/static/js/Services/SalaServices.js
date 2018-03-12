/**
 * Created by anyderre on 07/03/18.
 */
'use strict';
angular.module('cinemaApp').factory('SalaServices', ['$http','$q', function ($http, $q) {

    return {
        fetchAllSala: fetchAllSala,
        fetchAllSalaBySurcusal:fetchAllSalaBySurcusal,
        createSala: createSala,
        updateSala: updateSala,
        deleteSala: deleteSala
    };

    function fetchAllSala() {
        var deferred = $q.defer();
        $http.get("/api/sala/")
            .then(
                function (response) {
                    deferred.resolve(response.data);
                }, function (errResponse) {
                    console.error(errResponse);
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }
    function fetchAllSalaBySurcusal(id) {
        var deferred = $q.defer();
        $http.get("/api/sala/surcusal/"+id)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                }, function (errResponse) {
                    console.error(errResponse);
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }

    function createSala(sala) {
        var deferred = $q.defer();
        $http.post("/api/sala/", sala)
            .then(
                function (response) {
                    deferred.resolve(response.data)
                },function(errResponse){
                    console.error(errResponse);
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }

    function updateSala(sala, id) {
        var deferred = $q.defer();
        $http.put("/api/sala/"+id, sala).then(
            function (response) {
                deferred.resolve(response.data)
            },function(errResponse){
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
    function deleteSala(id) {
        var deferred = $q.defer();
        $http.delete("/api/sala/"+id)
            .then( function (response) {
                deferred.resolve(response.data)
            },function(errResponse){
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
}]);
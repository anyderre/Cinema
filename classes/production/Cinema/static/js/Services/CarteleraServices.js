/**
 * Created by anyderre on 07/03/18.
 */

'use strict';
angular.module('cinemaApp').factory('CarteleraServices', ['$http','$q', function ($http, $q) {
    var config = {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'text/plain'
        }
    };
    return {
        fetchAllCartelera: fetchAllCartelera,
        fetchAllDetalleCartelera: fetchAllDetalleCartelera,
        createCartelera: createCartelera,
        updateCartelera: updateCartelera,
        deleteCartelera: deleteCartelera
    };


    function fetchAllCartelera() {
        var deferred = $q.defer();
        $http.get("/api/cartelera/")
            .then(
                function (response) {
                    deferred.resolve(response.data);
                }, function (errResponse) {
                    console.error(errResponse);
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }

    function fetchAllDetalleCartelera(id) {
        var deferred = $q.defer();
        $http.get("/api/cartelera/detalleCartelera/"+id)
            .then(
                function (response) {
                    deferred.resolve(response.data);
                }, function (errResponse) {
                    console.error(errResponse);
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }

    function createCartelera(detalleCartelera) {
              var deferred = $q.defer();
        $http.post("/api/cartelera/", detalleCartelera, config)
            .then(
                function (response) {
                    deferred.resolve(response.data)
                },function(errResponse){
                    console.error(errResponse);
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }

    function updateCartelera(carteleraDatalle, id) {
        var deferred = $q.defer();
        $http.put("/api/cartelera/"+id, carteleraDatalle).then(
            function (response) {
                deferred.resolve(response.data)
            },function(errResponse){
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
    function deleteCartelera(id) {
        var deferred = $q.defer();
        $http.delete("/api/cartelera/"+id)
            .then( function (response) {
                deferred.resolve(response.data)
            },function(errResponse){
                console.error(errResponse);
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
}]);


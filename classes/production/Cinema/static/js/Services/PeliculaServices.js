/**
 * Created by anyderre on 07/03/18.
 */


'use strict';
angular.module('cinemaApp').factory('PeliculaServices', ['$http','$q', function ($http, $q) {

    return {
        fetchAllPelicula: fetchAllPelicula,
        createPelicula: createPelicula,
        updatePelicula: updatePelicula,
        deletePelicula: deletePelicula
    };


    function fetchAllPelicula() {
        var deferred = $q.defer();
        $http.get("/api/pelicula/")
            .then(
                function (response) {
                    deferred.resolve(response.data);
                }, function (errResponse) {
                    console.error('Error while fetching all Movies');
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }

    function createPelicula(pelicula) {
        console.log("there")
        var deferred = $q.defer();
        $http.post("/api/pelicula/", pelicula)
            .then(
                function (response) {
                    deferred.resolve(response.data)
                },function(errResponse){
                    console.error('Error while creating Movie');
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }

    function updatePelicula(pelicula, id) {
        var deferred = $q.defer();
        $http.put("/api/pelicula/"+id, pelicula).then(
                function (response) {
                    deferred.resolve(response.data)
                },function(errResponse){
                    console.error('Error while updating Movie');
                    deferred.reject(errResponse);
                });
        return deferred.promise;
    }
    function deletePelicula(id) {
        var deferred = $q.defer();
        $http.delete("/api/pelicula/"+id)
            .then( function (response) {
                deferred.resolve(response.data)
            },function(errResponse){
                console.error('Error while deleting Pelicula');
                deferred.reject(errResponse);
            });
        return deferred.promise;
    }
}]);
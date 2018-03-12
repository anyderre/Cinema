/**
 * Created by anyderre on 07/03/18.
 */

'use strict';

angular.module('cinemaApp').controller('CineController', ['$scope', 'CineServices', function ($scope, CineServices) {
    var self = this;
    self.cine = {id: null, nombre: ''}
    self.cines = [];
    self.successMessag = '';
    self.errorMessage = '';
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;


    fetchAllCine();

    function fetchAllCine() {
        CineServices.fetchAllCine()
            .then(
                function (d) {
                    self.cines = d;
                    console.log(d);
                },
                function (errorResponse) {
                    console.error(errorResponse);
                })
    }

    function createCine(cine) {
        CineServices.createCine(cine)
            .then(
                fetchAllCine,
                function (err) {
                    self.errorMessage = 'Error creando Cinema';
                    console.error(err);
                }
            )
    }

    function updateCine(cine, id) {
        CineServices.updateCine(cine, id).then(
            fetchAllCine,
            function (errResponse) {
                self.errorMessage = 'Error actualizando Cinema';
                console.error(errResponse);
            }
        )
    }

    function deleteCine(id) {
        CineServices.deleteCine(id)
            .then(
                fetchAllCine,
                function (errResponse) {
                    self.errorMessage = 'Error eliminando Cine';
                    console.error(errResponse)
                }
            )
    }

    function submit() {
        if (self.cine.id === null) {
            createCine(self.cine);
        } else {
            updateCine(self.cine, self.cine.id);
        }
        reset();
    }

    function edit(id) {
        for (var i = 0; i < self.cines.length; i++) {
            if (self.cines[i].id === id) {
                self.cine = angular.copy(self.cines[i]);
                break;
            }
        }

    }

    function remove(id) {

        if (self.cine.id === id) {
            reset();
        }
        deleteCine(id);
    }

    function reset() {
        self.cine = {id: null, nombre: ''}
        $scope.myForm.$setPristine();//reset form

    }


}]);
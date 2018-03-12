/**
 * Created by anyderre on 07/03/18.
 */
'use strict';

angular.module('cinemaApp').controller('SurcusalController', ['$scope', 'SurcusalServices', 'CineServices', function ($scope, SurcusalServices, CineServices) {
    var self = this;
    self.surcusal = {id: null, ciudad: '', nombre: '', cine: {id: null}}
    self.surcusales = [];
    self.successMessag = '';
    self.errorMessage = '';
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;

    //cine
    self.cineChanged = cineChanged;
    self.cines = [];
    self.selectedCine = self.cines[0];


    fetchAllSurcusals();
    fetchAllCine();

    function fetchAllSurcusals() {
        SurcusalServices.fetchAllSurcusal()
            .then(
                function (d) {
                    self.surcusales = d;
                },
                function (errorResponse) {
                    console.error(errorResponse);
                })
    }

    function fetchAllCine() {
        CineServices.fetchAllCine()
            .then(
                function (d) {
                    self.cines = d;
                },
                function (errorResponse) {
                    console.error(errorResponse);
                })
    }

    function createSurcusal(surcusal) {
        SurcusalServices.createSurcusal(surcusal)
            .then(
                fetchAllSurcusals,
                function (err) {
                    self.errorMessage = 'Error creando surcusal';
                    console.error(err);
                }
            )
    }

    function updateSurcusal(surcusal, id) {
        SurcusalServices.updateSurcusal(surcusal, id).then(
            fetchAllSurcusals,
            function (errResponse) {
                self.errorMessage = 'Error actualizando surcusal';
                console.error(errResponse);
            }
        )
    }

    function deleteSurcusal(id) {
        SurcusalServices.deleteSurcusal(id)
            .then(
                fetchAllSurcusals,
                function (errResponse) {
                    self.errorMessage = 'Error eliminando surcusal';
                    console.error(errResponse)
                }
            )
    }

    function submit() {
        if (self.surcusal.id === null) {
            createSurcusal(self.surcusal);
            console.log(self.surcusal)
        } else {
            updateSurcusal(self.surcusal, self.surcusal.id);
        }
        reset();
    }

    function edit(id) {
        for (var i = 0; i < self.surcusales.length; i++) {
            if (self.surcusales[i].id === id) {
                self.surcusal = angular.copy(self.surcusales[i]);
                self.selectedCine = self.surcusales[i].cine;
                break;
            }
        }

    }

    function remove(id) {
        if (self.surcusal.id === id) {
            reset();
        }
        deleteSurcusal(id);
    }

    function reset() {
        self.surcusal = {id: null, ciudad: '', nombre: '', cine: {id: null}}
        self.selectedCine = {};
        $scope.myForm.$setPristine();//reset form
    }

    function cineChanged(cine) {
        self.surcusal.cine = cine;
    }


}]);
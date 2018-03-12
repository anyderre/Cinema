/**
 * Created by anyderre on 08/03/18.
 */
angular.module('cinemaApp').controller('SalaController', ['$scope', 'SalaServices', 'SurcusalServices', function ($scope, SalaServices, SurcusalServices) {
    var self = this;
    self.sala = {id: null, nombre: '', surcusal: {}}
    self.salas = [];
    self.successMessag = '';
    self.errorMessage = '';
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
    self.surcusales = [];
    self.selectedSurcusal = {};
    self.surcusalChanged = surcusalChanged;

    fetchAllSala();
    fetchAllSurcusals();

    function fetchAllSala() {
        SalaServices.fetchAllSala()
            .then(
                function (d) {
                    self.salas = d;
                    console.log(d);
                },
                function (errorResponse) {
                    console.error(errorResponse);
                })
    }


    function fetchAllSurcusals() {
        SurcusalServices.fetchAllSurcusal()
            .then(
                function (d) {
                    self.surcusales = d;
                    console.log(d);
                },
                function (errorResponse) {
                    console.error(errorResponse);
                })
    }

    function createSala(sala) {
        SalaServices.createSala(sala)
            .then(
                fetchAllSala,
                function (err) {
                    self.errorMessage = 'Error creando sala';
                    console.error(err);
                }
            )
    }

    function updateSala(sala, id) {
        SalaServices.updateSala(sala, id).then(
            fetchAllSala,
            function (errResponse) {
                self.errorMessage = 'Error actualizando sala';
                console.error(errResponse);
            }
        )
    }

    function deleteSala(id) {
        SalaServices.deleteSala(id)
            .then(
                fetchAllSala,
                function (errResponse) {
                    self.errorMessage = 'Error eliminando sala';
                    console.error(errResponse)
                }
            )
    }

    function submit() {

        if (self.sala.id === null) {
            if(!self.salas.length)
                createSala(self.sala);
            else{
                for(var i=0; i<self.salas.length; i++){
                    if(self.sala.nombre === self.salas[i].nombre &&
                        self.sala.surcusal.nombre===self.salas[i].surcusal.nombre){
                        self.errorMessage='Esta sala existe ya para dicho surcusal';
                        self.sala = {id: null, nombre: '', surcusal: {}};
                        break;
                    }
                }
                createSala(self.sala);
            }
            console.log(self.sala);
            console.log("Creando");
        } else {
            if(self.salas.length<=1)
                updateSala(self.sala, self.sala.id);
            else{
                var existed = false;

                for(var i=0; i<self.salas.length; i++){

                    if(self.sala.nombre === self.salas[i].nombre &&
                        self.sala.surcusal.nombre===self.salas[i].surcusal.nombre){
                        self.errorMessage='Esta sala existe ya para dicho surcusal';
                        self.sala = {id: null, nombre: '', surcusal: {}}
                        existed = true;
                        break;
                    }
                    existed = false;
                }
                if(!existed)
                    updateSala(self.sala, self.sala.id);
            }
        }
        reset();
    }

    function edit(id) {

        for (var i = 0; i < self.salas.length; i++) {
            if (self.salas[i].id === id) {
                self.sala = angular.copy(self.salas[i]);
                self.selectedSurcusal = self.salas[i].surcusal;
                break;
            }
        }
    }

    function remove(id) {

        if (self.sala.id === id) {
            reset();
        }
        deleteSala(id);
    }

    function reset() {
        self.sala = {id: null, nombre: '', surcusal:{}}
        self.selectedSurcusal = {};
        $scope.myForm.$setPristine();//reset form

    }

    function surcusalChanged(surcusal) {
        console.log(self.selectedSurcusal);
        self.sala.surcusal = surcusal;
        self.errorMessage ='';
    }

}]);
/**
 * Created by anyderre on 07/03/18.
 */
'use strict';

angular.module('cinemaApp').controller('PeliculaController', ['$scope', 'PeliculaServices', function ($scope, PeliculaServices) {
    var self = this;
    self.pelicula= {id:null, nombre:'', anio:null,  tipo:null, duracion:null}
    self.peliculas= [];
    self.successMessag='';
    self.errorMessage='';
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset= reset;

    fetchAllPeliculas();

    function fetchAllPeliculas() {
        PeliculaServices.fetchAllPelicula()
            .then(
                function (d) {
                    self.peliculas = d;
                    console.log(d);
                },
                function (errorResponse) {
                    console.error(errorResponse);
                })
    }

    function createPelicula(pelicula) {
        PeliculaServices.createPelicula(pelicula)
            .then(
                fetchAllPeliculas,
                function (err) {
                    self.errorMessage='Error while creating Movie';
                    console.error(err);
                }
            )
    }

    function updatePelicula(pelicula, id) {
        PeliculaServices.updatePelicula(pelicula,id).then(
                fetchAllPeliculas,
                function (errResponse) {
                    self.errorMessage='Error while updating Movie';
                    console.error(errResponse);
                }
            )
    }

    function deletePelicula(id) {
        PeliculaServices.deletePelicula(id)
            .then  (
                fetchAllPeliculas,
                function (errResponse) {
                    self.errorMessage='Error while deleting Movie';
                    console.error(errResponse)
                }
            )
    }

    function submit() {
        if(self.pelicula.id===null){
            console.log('Saving new Movie');
            createPelicula(self.pelicula);
        }else {
            console.log('Updating Movie wtih id: '+self.pelicula.id);
            updatePelicula(self.pelicula, self.pelicula.id);
        }
        reset();
    }

    function edit(id) {
        console.log('id to be edited', id);
        for(var i=0; i<self.peliculas.length; i++){
            if (self.peliculas[i].id=== id){
                self.pelicula = angular.copy(self.peliculas[i]);
                break;
            }
        }

    }
    function remove(id) {
        console.log('Movie id to be deleted ', id);
        if(self.pelicula.id===id)
        {//clean the form if movie to be deleted to be deleted is shown there
            reset();
        }
        deletePelicula(id);
    }

    function reset() {
        if(self.pelicula.id===null){
            self.pelicula= {id:null, nombre:'', tipo:null,  anio:null, duracion:null}
            $scope.myForm.$setPristine();//reset form
        }else
            self.pelicula= {id:null, nombre:'', tipo:null,  anio:null, duracion:null}


    }



}]);
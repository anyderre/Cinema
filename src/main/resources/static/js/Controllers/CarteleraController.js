angular.module('cinemaApp').controller('CarteleraController', ['$scope', '$filter', 'SurcusalServices', 'SalaServices', 'CineServices', 'CarteleraServices', 'PeliculaServices', function ($scope, $filter, SurcusalServices, SalaServices, CineServices, CarteleraServices, PeliculaServices) {
    var self = this;
    self.cartelera = {id: null, cine: null, surcusal: null, fechaInicio: null, fechaFin: null};
    self.detalle = {id: null, sala: null, horaInicio: '', horaFin: '', dia: '', pelicula: null, cartelera: null};
    self.carteleras = [];
    self.salas = [];
    self.detalles = [];
    self.successMessage = '';
    self.errorMessage = '';
    self.index = null;
    self.enabled = function () {
        return (self.cartelera.cine && self.cartelera.surcusal && self.cartelera.fechaInicio && self.cartelera.fechaFin);
    };
    self.enabledDetalle = function () {
        return (self.detalle.cartelera && self.detalle.dia && self.detalle.pelicula && self.hiH && self.hiM && self.hfH && self.hfM && self.detalle.sala);
    };
    //cartelera
    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;
    self.haveValue = function () {
        return (self.detalles.length > 0);
    }
    //Detalle
    self.editDetalle = editDetalle;
    self.removeDetalle = removeDetalle;
    self.resetDetalle = resetDetalle;
    self.addDetalle = addDetalle;

    self.hourMin = function (b, e) {
        var arr = [];
        for (var i = b; i <= e; i++) {
            arr.push(i);
        }
        return arr;
    };
    //-------------------------Cartelera--------------------------------------
    //cines
    self.selectedCine = {};
    self.cineChanged = cineChanged;
    self.cines = [];
    self.actualCine = {};

    //surcusal
    self.selectedSurcusal = {};
    self.surcusalChanged = surcusalChanged;
    self.surcusales = [];

    //fechaInicio
    self.fechaInicioChanged = fechaInicioChanged;
    self.selectedFechaInicio = null;

    //fechaFin
    self.fechaFinChanged = fechaFinChanged;
    self.selectedFechaFin = null;
    //-------------------------Detalle Cartelera--------------------------------------
    //dias
    self.dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'sabado'];
    self.fecha = function (dia) {
        return self.addDays(self.cartelera.fechaInicio, self.dias.indexOf(dia) + 1);
    };
    self.addDays = function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    self.overlap = function (newCurrentDateStart, newCurrentDateEnd, currentDateStart, currentDateEnd) {
        return ((newCurrentDateStart >= currentDateEnd) || (newCurrentDateEnd <= currentDateStart));
    };

    self.selectedDia = null;
    self.diaChanged = diaChanged;
    //pelicula
    self.selectedPelicula = {};
    self.peliculaChanged = peliculaChanged;
    self.peliculas = [];

    //salas
    self.selectedSala = {};
    self.salaChanged = salaChanged;
    self.salas = [];

    //horas
    self.hiH = null;
    self.hiM = null;

    self.hfH = null;
    self.hfM = null;
    self.hiHChanged = hiHChanged;
    self.hiMChanged = hiMChanged;
    self.hfHChanged = hfHChanged;
    self.hfMChanged = hfMChanged;


    fetchAllCartelera();
    fetchAllPeliculas();
    fetchAllCine();


    function fetchAllCartelera() {
        CarteleraServices.fetchAllCartelera()
            .then(
                function (d) {
                    self.carteleras = d;
                },
                function (errorResponse) {
                    console.error(errorResponse);
                })
    }

    function fetchAllDetalleCartelera(id) {
        CarteleraServices.fetchAllDetalleCartelera(id)
            .then(
                function (d) {
                    self.detalles = d;
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

    function fetchAllSalaBySurcusal(id) {
        SalaServices.fetchAllSalaBySurcusal(id)
            .then(
                function (d) {
                    self.salas = d;
                },
                function (errorResponse) {
                    console.error(errorResponse);
                })
    }

    function fetchAllPeliculas() {
        PeliculaServices.fetchAllPelicula()
            .then(
                function (d) {
                    self.peliculas = d;
                },
                function (errorResponse) {
                    console.error(errorResponse);
                })
    }

    function fetchAllSurcusalByCine(id) {
        SurcusalServices.fetchAllSurcusalByCine(id)
            .then(
                function (d) {
                    self.surcusales = d;
                },
                function (errorResponse) {
                    console.error(errorResponse);
                })
    }

    function createCartelera(detalleCartelera) {
        CarteleraServices.createCartelera(detalleCartelera)
            .then(
                fetchAllCartelera,
                function (err) {
                    self.errorMessage = 'Error creando la cartelera';
                    console.error(err);
                }
            )
    }

    function updateCartelera(carteleraDetalle, id) {
        CarteleraServices.updateCartelera(carteleraDetalle, id).then(
            fetchAllCartelera,
            function (errResponse) {
                self.errorMessage = 'Error actualizando la cartelera';
                console.error(errResponse);
            }
        )
    }

    function deleteCartelera(id) {
        CarteleraServices.deleteCartelera(id)
            .then(
                fetchAllCartelera,
                function (errResponse) {
                    self.errorMessage = 'Error creando la cartelera';
                    console.error(errResponse)
                }
            )
    }

    function submit() {
        if (self.cartelera.id === null) {
            createCartelera(self.detalles);
            self.detalles = [];
        } else {
            updateCartelera(self.detalles, self.cartelera.id);
            self.detalles = [];
        }
        reset();
    }

    function edit(id) {
        for(var i=0; i<self.carteleras.length; i++){
            if (self.carteleras[i].id=== id){

                    self.cartelera = self.carteleras[i];
                    self.selectedCine = self.cartelera.cine;
                    fetchAllSurcusalByCine(self.selectedCine.id);
                    self.selectedSurcusal = self.cartelera.surcusal;
                    fetchAllSalaBySurcusal(self.selectedSurcusal.id);
                    self.selectedFechaInicio = new Date(self.cartelera.fechaInicio);
                    self.selectedFechaFin = new Date(self.cartelera.fechaFin);
                    fetchAllDetalleCartelera(self.cartelera.id);
                break;
            }
        }



        self.carteleras.every(function (cartelera, index) {

        });
    }

    function remove(id) {

        if (self.cartelera.id === id) {
            reset();
        }
        deleteCartelera(id);
    }

    function reset() {
        self.cartelera = {id: null, cine: null, surcusal: null, fechaInicio: null, fechaFin: null};
        $scope.myForm.$setPristine();//reset form
        self.selectedCine = {};
        self.selectedSurcusal = {};
        self.selectedFechaInicio = null;
        self.selectedFechaFin = null;
        self.resetDetalle();
        self.detalles=[];
    }

    function cineChanged(cine) {
        fetchAllSurcusalByCine(cine.id);
        self.cartelera.cine = cine;
        if (self.enabled()) {
            self.detalle.cartelera = self.cartelera;
            if (self.detalles.length) {
                console.log(self.detalles);
                for (var i = 0; i < self.detalles.length; i++) {
                    self.detalles[i].cartelera = self.cartelera;
                }
            }
        }

    }

    function surcusalChanged(surcusal) {
        fetchAllSalaBySurcusal(surcusal.id);
        self.cartelera.surcusal = surcusal;
        if (self.enabled()) {
            self.detalle.cartelera = self.cartelera;
            if (self.detalles.length) {
                console.log(self.detalles);
                for (var i = 0; i < self.detalles.length; i++) {
                    self.detalles[i].cartelera = self.cartelera;
                }
            }
        }
    }

    function fechaInicioChanged(fecha) {
        if (self.cartelera.fechaFin) {
            if (datediff(self.selectedFechaFin, self.cartelera.fechaInicio) < 0 && Math.abs(datediff(self.selectedFechaFin, self.cartelera.fechaInicio)) === 7) {
                self.cartelera.fechaInicio = fecha;
                if (self.enabled()) {
                    self.detalle.cartelera = self.cartelera;
                    if (self.detalles.length) {
                        console.log(self.detalles)
                        for (var i = 0; i < self.detalles.length; i++) {
                            self.detalles[i].cartelera = self.cartelera;
                        }
                    }
                }
                self.errorMessage = '';
            } else {
                self.cartelera.fechaInicio = null;
                self.errorMessage = "Fecha Final debe ser mayor que fecha inicial"
            }
        } else {
            self.errorMessage = '';
            self.cartelera.fechaInicio = fecha;
            if (self.enabled()) {
                self.detalle.cartelera = self.cartelera;
                if (self.detalles.length) {
                    console.log(self.detalles)
                    for (var i = 0; i < self.detalles.length; i++) {
                        self.detalles[i].cartelera = self.cartelera;
                    }
                }
            }
        }
    }

    function fechaFinChanged(fecha) {
        if (self.cartelera.fechaInicio) {
            if (datediff(self.selectedFechaFin, self.cartelera.fechaInicio) < 0 && Math.abs(datediff(self.selectedFechaFin, self.cartelera.fechaInicio)) === 7) {
                self.cartelera.fechaFin = fecha;
                if (self.enabled()) {
                    self.detalle.cartelera = self.cartelera;
                    if (self.detalles.length) {
                        console.log(self.detalles)
                        for (var i = 0; i < self.detalles.length; i++) {
                            self.detalles[i].cartelera = self.cartelera;
                        }
                    }
                }
            } else {
                self.cartelera.fechaFin = null;
                self.selectedFechaFin = null;
                self.errorMessage = "Fecha Final debe ser mayor que fecha inicial"
            }
        } else {
            self.errorMessage = '';
            self.cartelera.fechaFin = fecha;
            if (self.enabled()) {
                self.detalle.cartelera = self.cartelera;
                if (self.detalles.length) {
                    console.log(self.detalles)
                    for (var i = 0; i < self.detalles.length; i++) {
                        self.detalles[i].cartelera = self.cartelera;
                    }
                }
            }
        }
    }

    function datediff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

//----------------------------------------------------------Cartelera Datalle-------------------------------------
    function editDetalle(det) {

        for (var i = 0; i < self.detalles.length; i++) {
            if (
                self.detalles[i].sala.nombre === det.sala.nombre &&
                self.detalles[i].pelicula.nombre === det.pelicula.nombre &&
                self.detalles[i].dia === det.dia &&
                self.detalles[i].horaFin === det.horaFin
            ) {
                self.index = i;
                self.detalle = angular.copy(self.detalles[i]);
                self.selectedSala = self.detalle.sala;
                self.selectedPelicula = self.detalle.pelicula;
                self.selectedDia = self.detalle.dia;
                self.hiH = Number(self.detalle.horaInicio.split(':')[0]);
                self.hiM = Number(self.detalle.horaInicio.split(':')[1]);
                self.hfH = Number(self.detalle.horaFin.split(':')[0]);
                self.hfM = Number(self.detalle.horaFin.split(':')[1]);
                break;
            }
        }

    }

    function removeDetalle(det) {
        for (var i = 0; i < self.detalles.length; i++) {
            if (
                self.detalles[i].sala.nombre === det.sala.nombre &&
                self.detalles[i].pelicula.nombre === det.pelicula.nombre &&
                self.detalles[i].dia === det.dia &&
                self.detalles[i].horaFin === det.horaFin
            ) {
                self.detalles.splice(i, 1);
                self.index = i;
                self.resetDetalle();

                break;
            }
        }
    }

    function resetDetalle() {
        self.index = null;
        self.errorMessage = '';
        self.detalle = {id: null, sala: null, horaInicio: '', horaFin: '', dia: '', pelicula: null, cartelera: null};
        if (self.enabled()) {
            self.detalle.cartelera = self.cartelera;
        }
        self.selectedSala = {};
        self.selectedPelicula = {};
        self.selectedDia = {};
        self.hiH = null;
        self.hiM = null;
        self.hfH = null;
        self.hfM = null;

    }

    function addDetalle() {

        var a, b, c, d, tiempo;
        if (self.index === null) {
            //--------------------------Agregando nuevo ------------------
            if (self.hiH > self.hfH) {
                self.hiH = null;
                self.hiM = null;
                self.horaini = '';

                self.hfH = null;
                self.hfM = null;
                self.horaFin = '';
                self.errorMessage = "Hora Final tiene que ser mayor que hora inicial";
                return;
            }
            tiempo = ((self.hfH - self.hiH) * 60) + (self.hfM - self.hiM);


            if (tiempo < self.detalle.pelicula.duracion) {
                self.hiH = null;
                self.hiM = null;
                self.horaini = '';

                self.hfH = null;
                self.hfM = null;
                self.horaFin = '';
                self.errorMessage = "Tiempo corto para la pelicula";
                return;
            } else if (Math.floor(tiempo / 60) > Math.floor(self.detalle.pelicula.duracion / 60) + 1) {
                self.hiH = null;
                self.hiM = null;
                self.horaini = '';

                self.hfH = null;
                self.hfM = null;
                self.horaFin = '';
                self.errorMessage = "Tiempo demasiado largo para la pelicula";
                return;
            }

            a = self.hfH <= 9 ? '0' + self.hfH : self.hfH;
            b = self.hfM <= 9 ? '0' + self.hfM : self.hfM;
            c = self.hiH <= 9 ? '0' + self.hiH : self.hiH;
            d = self.hiM <= 9 ? '0' + self.hiM : self.hiM;
            self.detalle.horaFin = a + ':' + b;
            self.detalle.horaInicio = c + ':' + d;


            if (!self.detalles.length) {
                self.detalles.push(self.detalle);
                self.resetDetalle();
            } else {
                self.detalles.forEach(function (detalle) {
                    if (detalle.sala.nombre === self.detalle.sala.nombre) {
                        if (self.detalle.dia === detalle.dia) {
                            var savedHI = new Date().setHours(Number(detalle.horaInicio.split(':')[0]), Number(detalle.horaInicio.split(':')[1]), 0);
                            var savedHF = new Date().setHours(Number(detalle.horaFin.split(':')[0]), Number(detalle.horaFin.split(':')[1]), 0);
                            var currHI = new Date().setHours(self.hiH, self.hiM, 0);
                            var currHF = new Date().setHours(self.hfH, self.hfM, 0);

                            if (!(savedHF <= currHI || savedHI >= currHF)){
                                self.errorMessage = 'Las horas chocan para esta sala!! Cambia la hora de la pelicula';
                                self.hiH = null;
                                self.hiM = null;

                                self.hfH = null;
                                self.hfM = null;
                                self.detalle.horaInicio = '';
                                self.detalle.horaFin = '';
                                return
                            }
                        }

                    }
                });
                self.detalles.push(self.detalle);
                self.resetDetalle();
            }

        } else {
            //actualizando
            if (self.hiH > self.hfH) {
                self.hiH = null;
                self.hiM = null;
                self.horaini = '';

                self.hfH = null;
                self.hfM = null;
                self.horaFin = '';
                self.errorMessage = "Hora Final tiene que ser mayor que hora inicial";
                return;
            }
            tiempo = ((self.hfH - self.hiH) * 60) + (self.hfM - self.hiM);


            if (tiempo < self.detalle.pelicula.duracion) {
                self.hiH = null;
                self.hiM = null;
                self.horaini = '';

                self.hfH = null;
                self.hfM = null;
                self.horaFin = '';
                self.errorMessage = "Tiempo corto para la pelicula";
                return;
            } else if (Math.floor(tiempo / 60) > Math.floor(self.detalle.pelicula.duracion / 60) + 1) {
                self.hiH = null;
                self.hiM = null;
                self.horaini = '';

                self.hfH = null;
                self.hfM = null;
                self.horaFin = '';
                self.errorMessage = "Tiempo demasiado largo para la pelicula";
                return;
            }

            a = self.hfH <= 9 ? '0' + self.hfH : self.hfH;
            b = self.hfM <= 9 ? '0' + self.hfM : self.hfM;
            c = self.hiH <= 9 ? '0' + self.hiH : self.hiH;
            d = self.hiM <= 9 ? '0' + self.hiM : self.hiM;
            self.detalle.horaFin = a + ':' + b;
            self.detalle.horaInicio = c + ':' + d;
            if (self.detalles.length > 1) {
                for (var i = 0; i < self.detalles.length; i++) {
                    if (self.index !== i) {
                        if (self.detalles[i].sala.nombre === self.detalle.sala.nombre) {
                            if (self.detalle.dia === self.detalles[i].dia) {
                                var savedHI = new Date().setHours(Number(self.detalles[i].horaInicio.split(':')[0]), Number(self.detalles[i].horaInicio.split(':')[1]), 0);
                                var savedHF = new Date().setHours(Number(self.detalles[i].horaFin.split(':')[0]), Number(self.detalles[i].horaFin.split(':')[1]), 0);
                                var currHI = new Date().setHours(self.hiH, self.hiM, 0);
                                var currHF = new Date().setHours(self.hfH, self.hfM, 0);

                                if (!(savedHF <= currHI || savedHI >= currHF)) {
                                    self.errorMessage = 'Las horas chocan para esta sala!! Cambia la hora de la pelicula';
                                    self.hiH = null;
                                    self.hiM = null;

                                    self.hfH = null;
                                    self.hfM = null;
                                    self.detalle.horaInicio = '';
                                    self.detalle.horaFin = '';
                                    return

                                }
                            }
                        }
                    }
                }
                self.detalles[self.index].pelicula = self.detalle.pelicula;
                self.detalles[self.index].sala = self.detalle.sala;
                self.detalles[self.index].dia = self.detalle.dia;
                self.detalles[self.index].horaFin = self.detalle.horaFin;
                self.detalles[self.index].horaInicio = self.detalle.horaInicio;
                self.detalle = {id: null, sala: null, horaInicio: '', horaFin: '', dia: '', pelicula: null, cartelera: null}
                self.resetDetalle();
            } else {
                self.detalles[self.index].pelicula = self.detalle.pelicula;
                self.detalles[self.index].sala = self.detalle.sala;
                self.detalles[self.index].dia = self.detalle.dia;
                self.detalles[self.index].horaFin = self.detalle.horaFin;
                self.detalles[self.index].horaInicio = self.detalle.horaInicio;
                self.detalle = {id: null, sala: null, horaInicio: '', horaFin: '', dia: '', pelicula: null, cartelera: null};
                self.resetDetalle();
            }

        }
        // alert(self.haveValue());
    }

//--------------------------------------------------------------------------------------
    function salaChanged(sala) {

        self.detalle.sala = sala;
    }

    function peliculaChanged(pelicula) {
        self.detalle.pelicula = pelicula;
    }

    function diaChanged(dia) {
        self.detalle.dia = dia;
    }

    function hiHChanged(h) {
        self.hiH = h;
        self.errorMessage = '';
    }

    function hiMChanged(m) {
        self.hiM = m;
        self.errorMessage = '';

    }

    function hfHChanged(h) {
        self.hfH = h;
        self.errorMessage = '';

    }

    function hfMChanged(m) {
        self.hfM = m;
        self.errorMessage = '';
    }

}]);

/**
 * Created by anyderre on 08/03/18.
 */
'use strict';

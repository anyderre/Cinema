<#include "header.ftl">
<#include "nav.ftl">
<div ng-app="cinemaApp" class="Cartelera" ng-cloak>

    <div class="generic-container w3-panel w3-card-2" ng-controller="CarteleraController as ctrl"
         style="margin:20px; padding:10px; background-color: white;">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">

                    <!-- Default panel contents -->
                    <div class="panel-heading"><span class="lead">{{!ctrl.surcusal.id? 'Agregar nueva ': 'Actualizar '}} Cartelera </span>
                    </div>
                    <div class="panel-body">

                        <div class="formcontainer">
                            <div class="alert alert-success" role="alert" ng-if="ctrl.successMessage">
                                {{ctrl.successMessage}}
                            </div>
                            <div class="alert alert-danger" role="alert" ng-if="ctrl.errorMessage">
                                {{ctrl.errorMessage}}
                            </div>
                            <form name="myForm" class="form-horizontal">
                                <input type="hidden" ng-model="ctrl.cartelera.id"/>

                                <div class="row">
                                    <#---------------------------------Cartelera--------------------->
                                    <div style="margin-left: 10px;" class="col-md-2 w3-card-4">
                                        <div class="form-group col-md-12">
                                            <h4>Cartelera</h4>
                                            <hr>
                                            <label class="control-label" for="cine">Cine</label>
                                            <select class="form-control input-sm"
                                                    ng-model="ctrl.selectedCine"
                                                    ng-options="cine.nombre for cine in ctrl.cines track by cine.id"
                                                    id="cine"
                                                    ng-change="ctrl.cineChanged(ctrl.selectedCine)" ng-disabled="ctrl.cartelera.id" required>
                                            </select>
                                            <span style="color: red;" ng-show="myForm.cine.$error.required">Campo Requerido</span>
                                        </div>
                                        <div class="form-group col-md-12">
                                            <label class="control-label" for="surcusal">Surcusal</label>
                                            <select class="form-control input-sm"
                                                    ng-model="ctrl.selectedSurcusal"
                                                    ng-options="surcusal.nombre for surcusal in ctrl.surcusales track by surcusal.id"
                                                    ng-change="ctrl.surcusalChanged(ctrl.selectedSurcusal)"
                                                    id="surcusal" ng-disabled="ctrl.cartelera.id" required>
                                            </select>
                                            <span style="color: red;" ng-show="myForm.surcusal.$error.required">Campo requerrido</span>
                                            <span style="color: red;" ng-show="myForm.surcusal.$invalid">Campo Requerrido</span>
                                        </div>
                                        <div class="form-group col-md-12">

                                                <label class="control-label" for="fechaInicio">Fecha Inicio</label>
                                                <input data-date-format="dd/MMMM/yyyy" type="date" ng-model="ctrl.selectedFechaInicio" id="fechaInicio"
                                                       ng-change="ctrl.fechaInicioChanged(ctrl.selectedFechaInicio)"
                                                       class="form-control input-sm" required/>
                                                <span style="color: red;" ng-show="myForm.fechaInicio.$error.required">Campo requrrido |</span>
                                                <span style="color: red;" ng-show="myForm.fechaInicio.$invalid">Campo Invalido</span>
                                        </div>
                                            <div class="col-md-12 form-group">
                                                <label class="control-label" for="fechaFin">Fecha Fin</label>
                                                <input data-date-format="dd/MMMM/yyyy" type="date" ng-model="ctrl.selectedFechaFin" id="fechaFin"
                                                       ng-change="ctrl.fechaFinChanged(ctrl.selectedFechaFin)"
                                                       class="form-control input-sm" required/>
                                                <span style="color: red;" ng-show="myForm.fechaFin.$error.required">Campo requrrido. |</span>
                                                <span style="color: red;" ng-show="myForm.fechaFin.$invalid">Campo Invalido.</span>
                                            </div>

                                    </div>
                                    <#----------------------------Cartelera Detalle----------------------------------------->
                                    <div style="margin-left: 15px;" class="col-md-9 w3-card-4">
                                        <h4>Cartelera detalle</h4>
                                        <div class="form-group col-md-12">

                                            <div class="col-md-2">
                                                <label class="control-label" for="sala">Sala</label>
                                                <select class="form-control input-sm"
                                                        ng-model="ctrl.selectedSala"
                                                        ng-options="sala.nombre for sala in ctrl.salas track by sala.id"
                                                        id="sala"
                                                        ng-change="ctrl.salaChanged(ctrl.selectedSala)" ng-disabled="!ctrl.enabled()" required>
                                                </select>
                                                <span style="color: red;" ng-show="myForm.sala.$error.required">Campo Requerrido.</span>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="control-label" for="pelicula">Pelicula</label>
                                                <select class="form-control input-sm"
                                                        ng-model="ctrl.selectedPelicula"
                                                        ng-options="movie.nombre for movie in ctrl.peliculas track by movie.id"
                                                        id="pelicula"
                                                        ng-change="ctrl.peliculaChanged(ctrl.selectedPelicula)"
                                                        ng-disabled="!ctrl.enabled()"
                                                        required>
                                                </select>
                                                <span style="color: red;" ng-show="myForm.pelicula.$error.required">Campo requerrido</span>
                                            </div>
                                            <div class="col-md-2">
                                                <label class="control-label" for="dia">Dia</label>
                                                <select class="form-control input-sm"
                                                        ng-model="ctrl.selectedDia"
                                                        ng-options="dia for dia in ctrl.dias"
                                                        id="dia"
                                                        ng-change="ctrl.diaChanged(ctrl.selectedDia)"
                                                        ng-disabled="!ctrl.enabled()"
                                                        required>
                                                </select>
                                                <span style="color: red;" ng-show="myForm.dia.$error.required">Campo requerrido</span>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="col-md-3">
                                                    <label class="control-label" for="horaInicioHora">HI(H)</label>
                                                    <select id="hiH" class="form-control input-sm"
                                                            ng-model="ctrl.hiH"
                                                            ng-options="i for i in ctrl.hourMin(0,23)"
                                                            ng-change="ctrl.hiHChanged(ctrl.hiH)" ng-disabled="!ctrl.enabled()" required>
                                                            <span style="color: red;"
                                                                  ng-show="myForm.hiH.$error.required">Requerrido</span>
                                                    </select>

                                                </div>
                                                <div class="col-md-3">
                                                    <label class="control-label" for="HoraInicioMin">HI(M)</label>
                                                    <select id="hiM" class="form-control input-sm"
                                                            ng-model="ctrl.hiM"
                                                            ng-options="i for i in ctrl.hourMin(0,59)"
                                                            ng-change="ctrl.hiMChanged(ctrl.hiM)" ng-disabled="!ctrl.enabled()" required>
                                                    </select>
                                                    <span ng-show="myForm.hiM.$error.required">Requerrido</span>
                                                </div>
                                            <#--</div>-->
                                            <#--<div class="col-md-2">-->
                                                <div class="col-md-3">
                                                    <label class="control-label" for="horaFinHora">HF(H)</label>
                                                    <select id="hiH" class="form-control input-sm"
                                                            ng-model="ctrl.hfH"
                                                            ng-options="i for i in ctrl.hourMin(0,23)"
                                                            ng-change="ctrl.hfHChanged(ctrl.hfH)" ng-disabled="!ctrl.enabled()" required>
                                                    </select>
                                                    <span ng-show="myForm.hfH.$error.required">Requerrido.</span>
                                                </div>

                                                <div class="col-md-3">
                                                    <label class="control-label" for="HoraFinMin">HF(M)</label>
                                                    <select id="hiM" class="form-control input-sm"
                                                            ng-model="ctrl.hfM"
                                                            ng-options="i for i in ctrl.hourMin(0,59)"
                                                            ng-change="ctrl.hfMChanged(ctrl.hfM)" ng-disabled="!ctrl.enabled()" required>
                                                        <span ng-show="myForm.hfM.$error.required">Requerrido</span>
                                                    </select>
                                                </div
                                            </div>

                                        </div>
                                        <#--<div class="row">-->
                                            <div style="margin-top: 5px" class="col-md-offset-10 col-md-2">
                                                <button type="button" ng-disabled="!ctrl.enabledDetalle()" ng-click="ctrl.addDetalle()"
                                                        class="btn form-control btn-success custom-width">
                                                    {{!ctrl.index?
                                                    'Agregar': 'Editar'}}
                                                </button>
                                                <button type="reset" ng-click="ctrl.resetDetalle()" ng-disabled="!ctrl.enabled()"
                                                        class="btn form-control btn-danger custom-width">resetear
                                                </button>
                                            </div>
                                        <#--</div>-->

                                    <#---------------------------Table---------------------------------->

                                        <div class="row"">
                                            <div class="col-md-12" style="overflow-y:scroll; height:150px;>
                                                <div class="table-responsive">
                                                    <table class="table table-hover">
                                                        <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Sala</th>
                                                            <th>Pelicula</th>
                                                            <th>Dia</th>
                                                            <th>Hora Inicio</th>
                                                            <th>Hora Fin</th>
                                                            <th width="20%"></th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>

                                                        <tr ng-repeat="det in ctrl.detalles ">
                                                            <td><span ng-bind="$index+1"></span></td>
                                                            <td><span ng-bind="det.sala.nombre"></span></td>
                                                            <td><span ng-bind="det.pelicula.nombre"></span></td>
                                                            <td><span ng-bind="det.dia"></span></td>
                                                            <td><span ng-bind="det.horaInicio"></span></td>
                                                            <td><span ng-bind="det.horaFin"></span></td>
                                                            <td>
                                                                <a class="btn w3-red btn-sm" ng-click="ctrl.editDetalle(det)">
                                                                    <span class="glyphicon glyphicon-pencil"></span>
                                                                </a>
                                                                <a class="btn w3-green btn-success btn-sm" ng-click="ctrl.removeDetalle(det)">
                                                                    <span class="glyphicon glyphicon-remove"></span>
                                                                </a>
                                                                <#--<button type="button" ng-click="ctrl.edit(c.id)"-->
                                                                        <#--class="btn btn-success custom-width">Editar-->
                                                                <#--</button>-->
                                                                <#--<button type="button" ng-click="ctrl.remove(c.id)"-->
                                                                        <#--class="btn btn-danger custom-width">Remove-->
                                                                <#--</button>-->
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                    <div class="row">
                                        <div class="col-md-offset-10 col-md-2">
                                            <input type="submit" value="{{!ctrl.cartelera.id? 'Agregar': 'Actualizar'}}"
                                                   class="btn w3-red btn-sm float-right"
                                                   ng-disabled="!ctrl.haveValue()" ng-click="ctrl.submit()">
                                            <button type="button" ng-click="ctrl.reset()"
                                                    class="btn w3-black btn-sm float-right"
                                                    >Resetear Form
                                            </button>
                                        </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <!-- Default panel contents -->
                    <div class="panel-heading"><span class="lead">Lista de Carteleras </span></div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Cine</th>
                                    <th>Surcusales</th>
                                    <th>Fecha Inicio</th>
                                    <th>FechaFin</th>
                                    <th width="20%"></th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr ng-repeat="c in ctrl.carteleras">
                                    <td><span ng-bind="$index+1"></span></td>
                                    <td><span ng-bind="c.cine.nombre"></span></td>
                                    <td><span ng-bind="c.surcusal.nombre"></span></td>
                                    <td><span ng-bind="c.fechaInicio | date:'dd/MM/yyyy'"></span></td>
                                    <td><span ng-bind="c.fechaFin | date:'dd/MM/yyyy'"></span></td>
                                    <td>
                                        <button type="button" ng-click="ctrl.edit(c.id)"
                                                class="btn btn-success custom-width">Editar
                                        </button>
                                        <button type="button" ng-click="ctrl.remove(c.id)"
                                                class="btn btn-danger custom-width">Eliminar
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</div>
<#include "footer.ftl">

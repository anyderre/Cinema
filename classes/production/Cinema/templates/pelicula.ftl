<#include "header.ftl">
<#include "nav.ftl">
<div ng-app="cinemaApp" class="pelicula" ng-cloak >

    <div class="generic-container w3-panel w3-card-2" ng-controller="PeliculaController as ctrl" style="margin:20px; padding:10px; background-color: white;">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <!-- Default panel contents -->
                    <div class="panel-heading"><span class="lead">{{!ctrl.pelicula.id? 'Agregar una nueva ': 'Actualizar '}} Pelicula </span></div>
                    <div class="panel-body">
                        <div class="formcontainer">
                            <div class="alert alert-success" role="alert" ng-if="ctrl.successMessage">{{ctrl.successMessage}}</div>
                            <div class="alert alert-danger" role="alert" ng-if="ctrl.errorMessage">{{ctrl.errorMessage}}</div>
                            <form ng-submit="ctrl.submit()" name="myForm" class="form-horizontal">
                                <input type="hidden" ng-model="ctrl.pelicula.id"/>

                                <div class="row">
                                    <div class="form-group col-md-12">
                                        <div class="col-md-6">
                                            <label class="control-label" for="nombre">Nombre</label>
                                            <input type="text" ng-model="ctrl.pelicula.nombre"  id="nombre" class="nombre form-control input-sm" placeholder="A&ntilde;adir una nueva pelicula" required ng-maxlength="100" ng-minlength="2"/>
                                            <span style="color: red;" ng-show="myForm.nombre.$error.required">Campo requerrido  |</span>
                                            <span style="color: red;" ng-show="myForm.nombre.$error.minlength">Caracter minimo 2 | </span>
                                            <span style="color: red;" ng-show="myForm.nombre.$error.maxlength">Caracter maximo 100 | </span>
                                            <span style="color: red;" ng-show="myForm.nombre.$invalid">Campo Invalido</span>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="control-label" for="duracion"> Duraci&oacute;n</label>
                                            <input type="number" ng-model="ctrl.pelicula.duracion" placeholder="Entre la duracion de la pelicula"  id="duracion" class="duracion form-control input-sm" required />
                                            <span style="color: red;" ng-show="myForm.duracion.$error.required">Campo requerrido |</span>
                                            <span style="color: red;" ng-show="myForm.duracion.$invalid">Campo invalido </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-12">
                                        <div class="col-md-6">
                                            <label class=" control-label" for="anio"> A&ntilde;o</label>
                                            <input type="number" ng-model="ctrl.pelicula.anio" placeholder="Entre el a&ntilde;o de la pelicula" min="1900" max="3000"  id="anio" class="anio form-control input-sm" required />
                                            <span style="color: red;" ng-show="myForm.anio.$error.required">Campo requerrido |</span>
                                            <span style="color: red;" ng-show="myForm.anio.$invalid">campo invalido</span>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="control-label" for="tipo">Tipo</label>
                                            <input type="text" ng-model="ctrl.pelicula.tipo"  id="tipo" class="tipo form-control input-sm" placeholder="Entre el tipo(Genero) de la pelicula" ng-maxlength="250" required ng-minlength="3"/>
                                            <span style="color: red;" ng-show="myForm.tipo.$error.required">Campo requerrido  |</span>
                                            <span style="color: red;" ng-show="myForm.tipo.$error.minlength">Caracter minimo 2 | </span>
                                            <span style="color: red;" ng-show="myForm.nombre.$error.maxlength">Caracter maximo 250 | </span>
                                            <span style="color: red;" ng-show="myForm.tipo.$invalid">Campo Invalido</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-offset-10 col-md-2">
                                        <input type="submit"  value="{{!ctrl.pelicula.id? 'Agregar': 'Actualizar'}}" class=" btn w3-red btn-sm float-right" ng-disabled="myForm.$invalid || myForm.$pristine">
                                        <button type="button" ng-click="ctrl.reset()" class="btn w3-black btn-sm float-right" ng-disabled="myForm.$pristine &&  !ctrl.pelicula.id">Resetear Form</button>
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
                    <div class="panel-heading"><span class="lead">Lista de Pel&iacute;culas </span></div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Tipo</th>
                                    <th>Duracion</th>
                                    <th>A&ntilde;o</th>
                                    <th width="20%"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr ng-repeat="p in ctrl.peliculas">
                                    <td><span ng-bind="$index+1"></span></td>
                                    <td><span ng-bind="p.nombre"></span></td>
                                    <td><span ng-bind="p.tipo"></span></td>
                                    <td><span ng-bind="p.duracion"></span></td>
                                    <td><span ng-bind="p.anio"></span></td>
                                    <td>
                                        <button type="button" ng-click="ctrl.edit(p.id)" class="btn btn-success custom-width">Editar</button>
                                        <button type="button" ng-click="ctrl.remove(p.id)" class="btn btn-danger custom-width">Eliminar</button>
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

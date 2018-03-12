<#include "header.ftl">
<#include "nav.ftl">
<div ng-app="cinemaApp" class="Sala" ng-cloak >

    <div class="generic-container w3-panel w3-card-2" ng-controller="SalaController as ctrl" style="margin:20px; padding:10px; background-color: white;">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <!-- Default panel contents -->
                    <div class="panel-heading"><span class="lead">{{!ctrl.sala.id? 'Agregar nueva ': 'Actualizar '}} Sala </span></div>
                    <div class="panel-body">
                        <div class="formcontainer">
                            <div class="alert alert-success" role="alert" ng-if="ctrl.successMessage">{{ctrl.successMessage}}</div>
                            <div class="alert alert-danger" role="alert" ng-if="ctrl.errorMessage">{{ctrl.errorMessage}}</div>
                            <form ng-submit="ctrl.submit()" name="myForm" class="form-horizontal">
                                <input type="hidden" ng-model="ctrl.sala.id"/>

                                <div class="row">
                                    <div class="form-group col-md-12">

                                        <div class="col-md-6">
                                            <label class="control-label" for="nombre">Nombre</label>
                                            <input type="text" ng-model="ctrl.sala.nombre"  id="nombre" class="nombre form-control input-sm" placeholder="Entre nombre de la sala" ng-maxlength="20" required ng-minlength="1"/>
                                            <span style="color: red;" ng-show="myForm.nobre.$error.required">Campo Requerrido | </span>
                                            <span style="color: red;" ng-show="myForm.nombre.$error.minlength">Minimo Caracter 1  | </span>
                                            <span style="color: red;" ng-show="myForm.nombre.$error.minlength">Maximo Caracter 20  | </span>
                                            <span style="color: red;" ng-show="myForm.nombre.$invalid">Campo requerrido</span>
                                        </div>
                                        <div class="col-md-6">
                                            <label  class=" control-label" for="surcusal">Surcusal</label>
                                            <select class="form-control input-sm"
                                                    ng-model="ctrl.selectedSurcusal"
                                                    ng-options="surcusal.nombre for surcusal in ctrl.surcusales track by surcusal.id" id="surcusal"
                                                    ng-change="ctrl.surcusalChanged(ctrl.selectedSurcusal)" required>
                                            </select>
                                            <span style="color: red;" ng-show="myForm.sala.$error.required">Campo Requerrido</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-offset-10 col-md-2">
                                        <input type="submit"  value="{{!ctrl.sala.id? 'Agregar': 'Actualizar'}}" class="btn w3-red btn-sm float-right" ng-disabled="myForm.$invalid || myForm.$pristine">
                                        <button type="button" ng-click="ctrl.reset()" class="btn w3-black btn-sm float-right">Resetar Form</button>
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
                    <div class="panel-heading"><span class="lead">Lista de Salas </span></div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Surcusal</th>
                                    <th width="20%"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr ng-repeat="c in ctrl.salas">
                                    <td><span ng-bind="$index+1"></span></td>
                                    <td><span ng-bind="c.nombre"></span></td>
                                    <td><span ng-bind="c.surcusal.nombre"></span></td>
                                    <td>
                                        <button type="button" ng-click="ctrl.edit(c.id)" class="btn btn-success custom-width">Editar</button>
                                        <button type="button" ng-click="ctrl.remove(c.id)" class="btn btn-danger custom-width">Eliminar</button>
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

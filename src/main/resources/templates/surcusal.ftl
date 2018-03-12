<#include "header.ftl">
<#include "nav.ftl">
<div ng-app="cinemaApp" class="Surcusal" ng-cloak >

    <div class="generic-container w3-panel w3-card-2" ng-controller="SurcusalController as ctrl" style="margin:20px; padding:10px; background-color: white;">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <!-- Default panel contents -->
                    <div class="panel-heading"><span class="lead">{{!ctrl.surcusal.id? 'Agregar una nueva ': 'Actualizar '}} surcusal </span></div>
                    <div class="panel-body">
                        <div class="formcontainer">
                            <div class="alert alert-success" role="alert" ng-if="ctrl.successMessage">{{ctrl.successMessage}}</div>
                            <div class="alert alert-danger" role="alert" ng-if="ctrl.errorMessage">{{ctrl.errorMessage}}</div>
                            <form ng-submit="ctrl.submit()" name="myForm" class="form-horizontal">
                                <input type="hidden" ng-model="ctrl.surcusal.id"/>

                                <div class="row">
                                    <div class="form-group col-md-12">
                                        <div class="col-md-4">
                                            <label class="control-label" for="nombre">Nombre</label>
                                            <input type="text" ng-model="ctrl.surcusal.nombre"  id="nombre" class="nombre form-control input-sm" placeholder="Entre nombre surcusal" ng-maxlength="100" required ng-minlength="3"/>
                                            <span style="color: red;" ng-show="myForm.nombre.$error.required">Campo Requerido</span>
                                            <span style="color: red;" ng-show="myForm.nombre.$error.minlength">Caracter minimo 3</span>
                                            <span style="color: red;" ng-show="myForm.nombre.$error.maxlength">Caracter maximo </span>
                                            <span style="color: red;" ng-show="myForm.nombre.$invalid">Campo invalido</span>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="control-label" for="ciudad"> Ciudad</label>
                                            <input type="text" ng-model="ctrl.surcusal.ciudad"  id="ciudad" class="ciudad form-control input-sm" placeholder="Entre nombre ciudad"  ng-maxlength="100" required ng-minlength="3"/>
                                            <span style="color: red;" ng-show="myForm.ciudad.$error.required">Campo requerrido  |</span>
                                            <span style="color: red;" ng-show="myForm.ciudad.$error.minlength">Minimo caracter 3  |</span>
                                            <span style="color: red;" ng-show="myForm.ciudad.$error.maxlength">Maximo caracter 100  |</span>
                                            <span style="color: red;" ng-show="myForm.ciudad.$invalid">Campo invalido</span>
                                        </div>
                                        <div class="col-md-4">
                                            <label  class="control-label" for="cine">Cine</label>
                                            <select class="form-control input-sm"
                                                    ng-model="ctrl.selectedCine"
                                                    ng-options="cine.nombre for cine in ctrl.cines track by cine.id" id="cine"
                                                    ng-change="ctrl.cineChanged(ctrl.selectedCine)" required>
                                            </select>
                                            <span style="color: red;" ng-show="myForm.cine.$error.required">Campo requerrido</span>
                                            <span style="color: red;" ng-show="myForm.cine.$invalid">Campo invalido</span>

                                        </div>
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="form-group col-md-12">

                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-offset-10 col-md-2">
                                        <input type="submit"  value="{{!ctrl.surcusal.id? 'Agregar': 'Actualizar'}}" class="btn w3-red btn-sm float-right" ng-disabled="myForm.$invalid || myForm.$pristine">
                                        <button type="button" ng-click="ctrl.reset()" class="btn w3-black btn-sm float-right">Resetear Form</button>
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
                    <div class="panel-heading"><span class="lead">Lista de Surcusales </span></div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Ciudad</th>
                                    <th>cine</th>
                                    <#--<th>Numero de salas</th>-->
                                    <th width="20%"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr ng-repeat="c in ctrl.surcusales">
                                    <td><span ng-bind="$index+1"></span></td>
                                    <td><span ng-bind="c.nombre"></span></td>
                                    <td><span ng-bind="c.ciudad"></span></td>
                                    <td><span ng-bind="c.cine.nombre"></span></td>
                                    <#--<td><span ng-bind="c.salaList.length"></span></td>-->
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

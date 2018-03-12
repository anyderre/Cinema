<#include "header.ftl">
<#include "nav.ftl">
<div ng-app="cinemaApp" class="cine" ng-cloak >

    <div class="generic-container w3-panel w3-card-2" ng-controller="CineController as ctrl" style="margin:20px; padding:10px; background-color: white;">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <!-- Default panel contents -->
                    <div class="panel-heading"><span class="lead">{{!ctrl.cine.id? 'Agregar un nuevo ': 'Actualizar '}} cine </span></div>
                    <div class="panel-body">
                        <div class="formcontainer">
                            <div class="alert alert-success" role="alert" ng-if="ctrl.successMessage">{{ctrl.successMessage}}</div>
                            <div class="alert alert-danger" role="alert" ng-if="ctrl.errorMessage">{{ctrl.errorMessage}}</div>
                            <form ng-submit="ctrl.submit()" name="myForm" class="form-horizontal">
                                <input type="hidden" ng-model="ctrl.cine.id"/>
                                <div class="row">
                                    <div class="form-group col-md-12">
                                        <div class="col-md-7">
                                            <label class="col-md-2" for="nombre"> Nombre</label>
                                            <input type="text" ng-model="ctrl.cine.nombre"  id="nombre" class="nombre form-control input-sm" placeholder="Entre el nombre del cine" required ng-maxlength="100" ng-minlength="3"/>
                                            <span style="color: red;" ng-show="myForm.nombre.$error.required">Campo requerrido  |</span>
                                            <span style="color: red;" ng-show="myForm.nombre.$error.minlength">Car minimo 3  |</span>
                                            <span style="color: red;" ng-show="myForm.nombre.$error.maxlength">Car maximo  100 |</span>
                                            <span style="color: red;" ng-show="myForm.nombre.$invalid">Campo invalido</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-offset-10 col-md-2">
                                        <input type="submit"  value="{{!ctrl.cine.id? 'Agregar': 'Actualizar'}}" class="btn w3-red btn-sm float-right" ng-disabled="myForm.$invalid || myForm.$pristine">
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
                    <div class="panel-heading"><span class="lead">Lista de Cines </span></div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <#--<th>Cantidad de surcusales</th>-->
                                    <th width="20%"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr ng-repeat="c in ctrl.cines">
                                    <td><span ng-bind="$index+1"></span></td>
                                    <td><span ng-bind="c.nombre"></span></td>
                                    <#--<td><span ng-bind="c.carteleras.length"></span></td>-->
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

app.controller('PacienteController', function ($scope, $http, Server, $routeParams, $timeout, $location) {

    $scope.initializePaciente = function () {
        $scope.buscarPaciente = "";
        $scope.getPacientes(5);
        $scope.getTotalPacientes();

    }
    $scope.initializeEditPaciente = function () {
        $('#datepicker').datepicker({
            autoclose: true
        });
        $scope.getPaciente($routeParams.idPaciente);
    }
    $scope.initializeVerPaciente = function () {
        $scope.getPaciente($routeParams.idPaciente);
        $scope.getSeguimientosFromPaciente($routeParams.idPaciente);
        

    }
    //initializeVerPaciente
    $scope.addPaciente = function () {
        console.log($scope.newPaciente);
        $http.post(Server.direction + 'api/Pacientes/', $scope.newPaciente, { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.errorAddPaciente = 0; $scope.messageAfterAddPaciente = "Agregado Exitosamente"; $timeout(function () { $scope.errorAddPaciente = -1; }, 3000);
            $scope.newPaciente = data;
            $location.path('/newSeguimiento/' + $scope.newPaciente.idPaciente);
            console.log("agregando");
        }).error(function (data) {
            console.log(data);
            $scope.errorAddPaciente = 1; $scope.messageAfterAddPaciente = data.Message + " Error al agregar el paciente, intente más tarde";
            $timeout(function () { $scope.errorAddPaciente = -1; }, 3000);
        });
    }

    $scope.editPacientes = function () {
        console.log("cargando");
        $http.put(Server.direction + 'api/Pacientes/' + $scope.editPaciente.idPaciente, $scope.editPaciente, { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.errorAddPaciente = 0; $scope.messageAfterAddPaciente = "Actualizado Exitosamente"; $timeout(function () { $scope.errorAddPaciente = -1; }, 3000);
        }).error(function (data) {
            $scope.errorAddPaciente = 1; $scope.messageAfterAddPaciente = data.Message + " Error al actualizar el paciente, intente más tarde";
            $timeout(function () { $scope.errorAddPaciente = -1; }, 3000);
        });
    }

    //gets
    $scope.skip = 0;
    $scope.getPacientes = function (totalPacientes) {
        $http.get(Server.direction + 'api/Pacientes/Recientes/' + totalPacientes, { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.pacientes = data;
            

        });
    }
    $scope.busquedaDePacientes = function (pacienteABuscar) {
        $http.get(Server.direction + 'api/Pacientes/Parametro/' + pacienteABuscar, { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.pacientes = data;
        });
    }


    $scope.getTotalPacientes = function () {
        $http.get(Server.direction + 'api/Pacientes/TotalPacientes/', { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.totalPacientes = data;
        });
    }
    $scope.getPaciente = function (idPaciente) {
        $scope.loading = true;
        $http.get(Server.direction + 'api/Pacientes/' + idPaciente, { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.editPaciente = data;
            console.log(data);
            $scope.loading = false;
        });
    }
    $scope.getSeguimientosFromPaciente = function (idPaciente) {
        
        $http.get(Server.direction + 'api/Pacientes/Seguimientos/' + idPaciente, { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.seguimientos = data;
        
        });
    }
    $scope.generos = [
        "Masculino",
        "Femenino"
    ];

});
app.controller('HomeController', function ($scope, $http, Server, $routeParams, $timeout, $location, $filter) {

    $scope.initializeHome= function () {                
        $scope.getTotalPacientesMasculino();
        $scope.getTotalPacientesFemenino();
        $scope.getTotalSeguimientos();
        $scope.getGraficoAnos();
        $scope.getVerificarRespaldo();
    }
    $scope.series = ['Número pacientes por año'];
    $scope.options = {
        scales: {
            yAxes: [
              {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left'
              },
              {
                  id: 'y-axis-2',
                  type: 'linear',
                  display: true,
                  position: 'right'
              }
            ]
        }
    };
    $scope.getTotalPacientesMasculino = function () {
        $http.get(Server.direction + 'api/Pacientes/Genero/Masculino', { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.totalPacientesMasculino = data;
            
        });
    }
    $scope.getTotalPacientesFemenino= function () {
        $http.get(Server.direction + 'api/Pacientes/Genero/Femenino', { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.totalPacientesFemenino= data;

        });
    }
    
    $scope.getTotalSeguimientos = function () {
        $http.get(Server.direction + 'api/Seguimientoes/Total', { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.totalSeguimientos = data;
        });
    }
    $scope.getGraficoAnos = function () {
        $http.get(Server.direction + 'api/Pacientes/Graficos/Mes', { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.graficos = data;
            console.log($scope.graficos);
        });
    }
    $scope.getVerificarRespaldo = function () {        
        $http.get(Server.direction + 'api/Respaldoes/VerificarDia/' , { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.respaldo = data;
            if ($scope.respaldo == 0){
                //realizo respaldo
                $scope.addRespaldo();
            }

        });
    }
    $scope.addRespaldo = function () {
        $http.post(Server.direction + 'api/Respaldoes/SubirRespaldoAMega/', { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            console.log("generado");
        }).error(function (data) {
            console.log(data.Message);
        });
    }
    $scope.fechaActual = new Date();
    

});
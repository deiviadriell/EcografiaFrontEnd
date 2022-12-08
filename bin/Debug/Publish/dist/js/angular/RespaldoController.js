app.controller('RespaldoController', function ($scope, $http, Server, $routeParams, $timeout, $location) {
    $scope.initializeRespaldosOffLine = function () {
        $scope.getRespaldosOffLine();
    }
    $scope.initializeRespaldosOnLine = function () {

        $scope.getRespaldosOnLine();
    }

    $scope.getRespaldosOffLine = function () {
        $scope.loading = true;
        $http.get(Server.direction + 'api/Respaldoes', { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.respaldos = data;
            $scope.loading = false;
        });
    }
    $scope.getRespaldosOnLine = function () {
        $scope.loading = true;
        $http.post(Server.direction + 'api/Respaldoes/ListaRespaldosMega/', { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.respaldos = data;
            $scope.loading = false;
        });
    }
    $scope.generarRespaldoInstante = function () {
        $scope.loading = true;
        $http.post(Server.direction + 'api/Respaldoes/SubirRespaldoAMegaInstante/', { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.loading = false;
        });
    }

    $scope.addRespaldo = function () {        
        $http.post(Server.direction + 'api/Respaldoes/SubirRespaldoAMega/', { headers: { 'Content-Type': 'application/json' } }).success(function (data) {            
            console.log("generado");
        }).error(function (data) {
            console.log(data.Message);
        });
    }
});
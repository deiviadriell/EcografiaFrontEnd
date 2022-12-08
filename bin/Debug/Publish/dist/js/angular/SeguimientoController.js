app.controller('SeguimientoController', function ($scope, $http, Server, $routeParams, $timeout, $location, $filter) {
    //cargo el ckeditor
    if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
        CKEDITOR.tools.enableHtml5Elements(document);
    // The trick to keep the editor in the sample quite small
    // unless user specified own height.
    CKEDITOR.config.height = 800;
    CKEDITOR.config.width = 'auto';
    CKEDITOR.config.extraPlugins = 'texttransform';
    //CKEDITOR.config.disableNativeSpellChecker = true;
    CKEDITOR.disableNativeSpellChecker = false;
    $scope.newSeguimiento = {};
    $scope.initializeNewSeguimiento = function () {
        //console.log($filter('getCuteDate')());


        $scope.idPaciente = $routeParams.idPaciente;
        $scope.getPaciente($routeParams.idPaciente);
	    $scope.getMedicos();
        $scope.newSeguimiento.idPaciente = $routeParams.idPaciente;
        //$scope.getSeguimientoFromPaciente($routeParams.idPaciente);

    }
    //
    $scope.busquedaSeguimiento = {}
    $scope.busquedaSeguimiento.tipo = [];
    $scope.busquedaSeguimiento.tipo == 1;
    $scope.generos = [
        "Masculino",
        "Femenino"
    ];
    console.log($scope.busquedaSeguimiento);
    

    $scope.initializeEditSeguimiento = function () {

        $scope.idSeguimiento = $routeParams.idSeguimiento;
        $scope.getMedicos();
        $scope.getSeguimiento();



    }
    $scope.initializeSeguimientosPorFecha = function () {

        $('.date').datepicker({
            format: 'yyyy-mm-dd'
        });


    }
    //cargarSeguimientos
    $scope.cargarSeguimientos = function () {
        $http.get(Server.direction + 'api/Pacientes/Seguimientos/' + $scope.idPaciente, { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.seguimientosPaciente = data;
            console.log($scope.seguimientosPaciente);
        });
    }
    $scope.getSeguimiento = function () {
        $http.get(Server.direction + 'api/Seguimientoes/' + $scope.idSeguimiento, { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.editSeguimiento = data;
            $scope.getPaciente($scope.editSeguimiento.idPaciente);
            $scope.idPaciente = $scope.editSeguimiento.idPaciente;

        });
    }

    $scope.getPaciente = function (idPaciente) {
        $http.get(Server.direction + 'api/Pacientes/' + idPaciente, { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.editPaciente = data;           
        });
    }    
  $scope.getMedicos = function () {
        $http.get(Server.direction + 'api/Medicos', { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.medicos = data;
            
        });
    }
    $scope.seguimientosPorFecha = function (busqueda) {
        if (busqueda == null) {
            $scope.errorBusqueda = 1; $scope.messageAfterBusqueda = "Llene todos los campos de búsqueda."; $timeout(function () { $scope.errorBusqueda = -1; }, 2000);
        }
        else
        {
            $scope.loading = true;
                $http.post(Server.direction + 'api/Seguimientoes/ReportePorFechas', busqueda, { headers: { 'Content-Type': 'application/json' } })
                        .success(function (data) {
                            if (data.length == 0) {
                                $scope.errorBusqueda = 0; $scope.messageAfterBusqueda = "Búsqueda Correcta, Pero sin resultados"; $timeout(function () { $scope.errorBusqueda = -1; }, 3000);
                                console.log("sin resultados")
                            }
                            else {
                                $scope.errorBusqueda = 0; $scope.messageAfterBusqueda = "Búsqueda Correcta"; $timeout(function () { $scope.errorBusqueda = -1; }, 3000);

                            }
                            $scope.seguimientosDeUnaFecha = data;
                            console.log($scope.seguimientosDeUnaFecha);

                        })
                        .catch(function (err) {
                            $scope.errorBusqueda = 1; $scope.messageAfterBusqueda = "Error en búsqueda, intente más tarde"; $timeout(function () { $scope.errorBusqueda = -1; }, 2000);
                        })
                        .finally(function () {
                            $scope.loading = false;
                        });
            }
            
      
       

    }
    //buscarSeguimientos
    $scope.buscarSeguimientos = function (busqueda) {
        if (busqueda == null) {
            $scope.errorBusqueda = 1; $scope.messageAfterBusqueda = "Llene todos los campos de búsqueda."; $timeout(function () { $scope.errorBusqueda = -1; }, 2000);
        }
        else {
            if (busqueda.texto == null) {
                $scope.errorBusqueda = 1; $scope.messageAfterBusqueda = "Llene todos los campos de búsqueda."; $timeout(function () { $scope.errorBusqueda = -1; }, 2000);
            }
            else {
                $scope.loading = true;
                $http.post(Server.direction + 'api/Seguimientos/ReporteFechas', busqueda, { headers: { 'Content-Type': 'application/json' } })
                .success(function (data) {
                    if (data.length == 0) {
                        $scope.errorBusqueda = 1; /*console.log($scope.errorBusqueda);*/ $scope.messageAfterBusqueda = "Búsqueda correcta pero SIN RESULTADOS."; $timeout(function () { $scope.errorBusqueda = -1; }, 6000);
                    }
                    else {
                        $scope.errorBusqueda = 0; $scope.messageAfterBusqueda = "Búsqueda Correcta"; $timeout(function () { $scope.errorBusqueda = -1; }, 3000);
                    }
                    $scope.seguimientosPorFecha = data;

                })
                .catch(function (err) {
                    $scope.errorBusqueda = 1; $scope.messageAfterBusqueda = "Error en búsqueda, intente más tarde"; $timeout(function () { $scope.errorBusqueda = -1; }, 2000);
                })
                .finally(function () {
                    $scope.loading = false;
                });
            }
        }
    };
    $scope.verResultado = function () {
        window.location.href = '../../../editor/editResultado.html?idSeguimiento=' + $scope.editSeguimiento.idSeguimiento;
    }
    $scope.addSeguimiento = function () {
        $scope.loading = true;
        $scope.newSeguimiento.idPaciente = $scope.editPaciente.idPaciente;        
        $http.post(Server.direction + 'api/Seguimientoes/', $scope.newSeguimiento, { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.errorAddSeguimiento = 0; $scope.messageAfterAddSeguimiento = "Añadido Exitosamente"; $timeout(function () { $scope.errorAddSeguimiento = -1; }, 3000);
            $scope.newSeguimiento = data;
            let tipo = 0;
            if ($scope.newSeguimiento.tipoSeguimiento == "Ecografía")
            {
                tipo = 1;
            }
            else if ($scope.newSeguimiento.tipoSeguimiento == "Radiografía")
            {
                tipo = 2;
            }
            window.location.href = '../../../editor/resultado.html?idSeguimiento=' + $scope.newSeguimiento.idSeguimiento + '&tipo=' + tipo + '';
            console.log($scope.newSeguimiento);
        }).error(function (data) {
            console.log($scope.newSeguimiento);
            $scope.errorAddSeguimiento = 1; $scope.errorAddSeguimiento = data.Message + " Error al añadir seguimiento, intente más tarde";
        });
    }
    $scope.addMedico = function () {
        $scope.loading = true;
        $scope.newMedico.estado = true;        
        $http.post(Server.direction + 'api/Medicos', $scope.newMedico, { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.errorAddMedico = 0; $scope.messageAfterAddMedico = "Añadido Exitosamente"; $timeout(function () { $scope.errorAddMedico = -1; }, 3000);
            $scope.getMedicos();
            
        }).error(function (data) {
            console.log($scope.newSeguimiento);
            $scope.errorAddMedico = 1; $scope.errorAddSeguimiento = data.Message + " Error al añadir seguimiento, intente más tarde";
        });
    }
    $scope.exportarExcelRealTodosSeguimientos = function (busqueda) {
        $scope.loading = true;
        console.log("exportando");
        $http({
            url: Server.direction + 'api/Seguimientoes/Exportar/Excel/Avanzada/Todos/',
            cache: false,
            method: "POST",
            data: busqueda, //this is your json data string
            responseType: 'arraybuffer',
            headers: {
                'Content-type': 'application/json'

            }
        }).success(function (data, status, headers) {
            var octetStreamMime = 'application/octet-stream';
            var success = false;

            // Get the headers
            headers = headers();
            console.log(headers);
            // Get the filename from the x-filename header or default to "download.bin"
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var filename = "Reporte_" + dd + '-' + mm + ".xlsx";

            // Determine the content type from the header or default to "application/octet-stream"
            var contentType = headers['content-type'] || octetStreamMime;

            try {

                console.log(filename);
                // Try using msSaveBlob if supported
                console.log("Trying saveBlob method ...");
                var blob = new Blob([data], { type: contentType });
                if (navigator.msSaveBlob)
                    navigator.msSaveBlob(blob, filename);
                else {
                    // Try using other saveBlob implementations, if available
                    var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                    if (saveBlob === undefined) throw "Not supported";
                    saveBlob(blob, filename);
                }
                console.log("saveBlob succeeded");
                success = true;
            } catch (ex) {
                console.log("saveBlob method failed with the following exception:");
                console.log(ex);
            }

            if (!success) {
                // Get the blob url creator
                var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                if (urlCreator) {
                    // Try to use a download link
                    var link = document.createElement('a');
                    if ('download' in link) {
                        // Try to simulate a click
                        try {
                            // Prepare a blob URL
                            console.log("Trying download link method with simulated click ...");
                            var blob = new Blob([data], { type: contentType });
                            var url = urlCreator.createObjectURL(blob);
                            link.setAttribute('href', url);

                            // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                            link.setAttribute("download", filename);

                            // Simulate clicking the download link
                            var event = document.createEvent('MouseEvents');
                            event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                            link.dispatchEvent(event);
                            console.log("Download link method with simulated click succeeded");
                            success = true;

                        } catch (ex) {
                            console.log("Download link method with simulated click failed with the following exception:");
                            console.log(ex);
                        }
                    }

                    if (!success) {
                        // Fallback to window.location method
                        try {
                            // Prepare a blob URL
                            // Use application/octet-stream when using window.location to force download
                            console.log("Trying download link method with window.location ...");
                            var blob = new Blob([data], { type: octetStreamMime });
                            var url = urlCreator.createObjectURL(blob);
                            window.location = url;
                            console.log("Download link method with window.location succeeded");
                            success = true;
                        } catch (ex) {
                            console.log("Download link method with window.location failed with the following exception:");
                            console.log(ex);
                        }
                    }

                }
            }

            if (!success) {
                // Fallback to window.open method
                console.log("No methods worked for saving the arraybuffer, using last resort window.open");
                window.open(httpPath, '_blank', '');
            }
            else {
                $scope.loading = false;
            }
            /******************/
        }).error(function (data) {
            $scope.errorExportExcel = 1; $scope.messageAfterExportExcel = "Error al exportar excel, intente más tarde";
        });
    }


    $scope.updateSeguimiento = function () {

        $http.put(Server.direction + 'api/Seguimientoes/' + $scope.editSeguimiento.idSeguimiento, $scope.editSeguimiento, { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            //window.location.href = 'resultado.html?idSeguimiento=' + $scope.editSeguimiento.idSeguimiento;
            $scope.errorAddSeguimiento = 0; $scope.messageAfterAddSeguimiento = "Actualizado Exitosamente"; $timeout(function () { $scope.errorAddSeguimiento = -1; }, 3000);
        }).error(function (data) {
            $scope.errorAddSeguimiento = 1; $scope.errorAddSeguimiento = data.Message + " Error al añadir seguimiento, intente más tarde";
            $timeout(function () { $scope.errorAddPaciente = -1; }, 3000);
        });
    }
    
  //  $scope.buscarSeguimientosSeguimiento

    $scope.seguimientosSeleccionados = {}
    $scope.seguimientosSeleccionados.items = [];
    $scope.selectAllSeguimientos = function () {

        //$scope.seguimientosSeleccionados.items = angular.copy($scope.seguimientosDeUnaFecha);
        console.log($scope.seguimientosSeleccionados.items);
    };
    $scope.deselectSeguimientos = function () {
        $scope.seguimientosSeleccionados.items = [];
    };

    $scope.buscarSeguimientosSeguimiento = function (busqueda) {
        if (busqueda == null) {
            $scope.errorBusqueda = 1; $scope.messageAfterBusqueda = "Llene todos los campos de búsqueda."; $timeout(function () { $scope.errorBusqueda = -1; }, 2000);
        }
        else {
            if (busqueda.texto == null ) {
                $scope.errorBusqueda = 1; $scope.messageAfterBusqueda = "Llene todos los campos de búsqueda."; $timeout(function () { $scope.errorBusqueda = -1; }, 2000);
            }
            else if (busqueda.texto == "") {
                $scope.errorBusqueda = 1; $scope.messageAfterBusqueda = "Llene todos los campos de búsqueda."; $timeout(function () { $scope.errorBusqueda = -1; }, 2000);
            }


            else {
                $scope.loading = true;
                $http.post(Server.direction + 'api/Seguimientoes/Seguimientos/', busqueda, { headers: { 'Content-Type': 'application/json' } })
                .success(function (data) {
                    if (data.length == 0) {
                        $scope.errorBusqueda = 1; /*console.log($scope.errorBusqueda);*/ $scope.messageAfterBusqueda = "Búsqueda correcta pero SIN RESULTADOS."; $timeout(function () { $scope.errorBusqueda = -1; }, 6000);
                    }
                    else {
                        $scope.errorBusqueda = 0; $scope.messageAfterBusqueda = "Búsqueda Correcta"; $timeout(function () { $scope.errorBusqueda = -1; }, 3000);
                    }
                    $scope.seguimientos = data;

                })
                .catch(function (err) {
                    $scope.errorBusqueda = 1; $scope.messageAfterBusqueda = "Error en búsqueda, intente más tarde"; $timeout(function () { $scope.errorBusqueda = -1; }, 2000);
                })
                .finally(function () {
                    $scope.loading = false;
                });
            }
        }
    };

    $scope.changeEditSeguimiento = function (seguimiento) {
        $scope.editSeguimiento = seguimiento;
        //$scope.getEspecimenesFromImagen($scope.editImagen.Imagen.idImagen);
    }
    $scope.deleteSeguimiento= function () {
        $scope.editSeguimiento.borrado = new Date();
        $http.put(Server.direction + 'api/Seguimientoes/' + $scope.editSeguimiento.idSeguimiento, $scope.editSeguimiento, { headers: { 'Content-Type': 'application/json' } }).success(function (data) {
            $scope.errorBusqueda = 0; $scope.messageAfterBusqueda = "Seguimiento eliminado exitosamente"; $timeout(function () { $scope.errorBusqueda = -1; }, 3000);           
            $scope.buscarSeguimientosSeguimiento($scope.busquedaSeguimiento);
            $("#deleteSeguimiento").modal('hide');
        }).error(function (data) {
            $scope.errorBusqueda = 1; $scope.messageAfterBusqueda = data.Message + " Error al eliminar el paciente, intente más tarde";
            $timeout(function () { $scope.errorAddPaciente = -1; }, 3000);
        });
    }

});
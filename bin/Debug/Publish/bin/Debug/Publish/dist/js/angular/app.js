var app = angular.module('myApp', ['ngRoute', 'chart.js', 'angular.filter', 'ui.select', 'ngSanitize']);
app.factory('Server', function () {
    return {
        //direction: 'http://172.31.8.192:8081/'
        //direction: 'http://localhost:8081/'
        //direction : 'http://localhost:43453/'
        //direction: 'http://localhost:52596/'
        //direction: 'http://localhost:43453/'
        direction: 'http://localhost:30680/'

    };

});
app.filter('getCuteDate', function () {
    return function (text) {
        if (text != null)
            return text.substring(0, 10) + '   ' + text.substring(11, 16);
        else
            return ''
    }
});
app.filter('Filesize', function () {
    return function (size) {
        if (isNaN(size))
            size = 0;

        if (size < 1024)
            return size + ' Bytes';

        size /= 1024;

        if (size < 1024)
            return size.toFixed(2) + ' Kb';

        size /= 1024;

        if (size < 1024)
            return size.toFixed(2) + ' Mb';

        size /= 1024;

        if (size < 1024)
            return size.toFixed(2) + ' Gb';

        size /= 1024;

        return size.toFixed(2) + ' Tb';
    };
});

app.filter('getTipo', function () {    
    return function (text) {
        if (text.includes('Eco')) {
            return '1'
        }
        else if (text.includes('Radio')) {
            return '2'
        }
    }
});
app.filter('getCuteDateWithoutHours', function () {
    return function (text) {
        if (text != null)
            return text.substring(0, 10);
        else
            return ''
    }
});


app.directive("formattedDate", function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelController) {
            ngModelController.$parsers.push(function (data) {
                //convert data from view format to model format
                var date = new Date(data);
                return date; //converted

            });

            ngModelController.$formatters.push(function (data) {
                //convert data from model format to view format
                var date;
                var fechaTexto = ""
                if (data != null) {
                    if (data.includes("/")) {
                        var dateSplit = data.split("/"); //
                        fechaTexto = (dateSplit[0] + '/' + dateSplit[1] + '/' + dateSplit[2])
                    }
                    else {
                        var dateSinZona = data.split("T")[0];
                        var dateSinZona = dateSinZona.split("-");
                        fechaTexto = (dateSinZona[2] + '/' + dateSinZona[1] + '/' + dateSinZona[0])
                    }

                }
                return fechaTexto
            });
        }
    };
});
app.directive('datepicker', function ($parse) {
    return function (scope, element, attrs, controller) {
        var ngModel = $parse(attrs.ngModel);
        var fullmonth_array = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]; // change 'nl' to your own language of course
        $(function () {
            element.datepicker({
                changeYear: true,
                changeMonth: true,
                dateFormat: 'dd/mm/yy',
                date: new Date(2016, 9, 17),
                showButtonPanel: true,
                yearRange: "-400:+5",
                monthNamesShort: fullmonth_array,
                onSelect: function (dateText, inst) {
                    scope.$apply(function (scope) {
                        // Change binded variable
                        var dateSplit = dateText.split("/"); //
                        var fechaTexto = (dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0]) + 'T00:00:00';

                        ngModel.assign(scope, fechaTexto);
                    });
                }
            });
        });
    }
});//app.directive('datepicker', function () {
//    return {
//        restrict: 'A',
//        require: 'ngModel',
//        compile: function () {
//            return {
//                pre: function (scope, element, attrs, ngModelCtrl) {
//                    var format, dateObj;
//                    console.log(attrs);
//                    format = (!attrs.dpFormat) ? 'd/m/yyyy' : attrs.dpFormat;
//                    if (!attrs.initDate && !attrs.dpFormat) {
//                        // If there is no initDate attribute than we will get todays date as the default
//                        dateObj = new Date();
//                        scope[attrs.ngModel] = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
//                    } else if (!attrs.initDate) {
//                        // Otherwise set as the init date
//                        scope[attrs.ngModel] = attrs.initDate;
//                    } else {
//                        // I could put some complex logic that changes the order of the date string I
//                        // create from the dateObj based on the format, but I'll leave that for now
//                        // Or I could switch case and limit the types of formats...
//                    }
//                    // Initialize the date-picker
//                    $(element).datepicker({
//                        format: format,
//                    }).on('changeDate', function (ev) {
//                        // To me this looks cleaner than adding $apply(); after everything.
//                        scope.$apply(function () {
//                            ngModelCtrl.$setViewValue(ev.format(format));
//                        });
//                    });
//                }
//            }
//        }
//    }
//});
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'HomeController'
        })
        //pacientes
        .when('/paciente', {
            templateUrl: 'app/views/paciente/paciente.html',
            controller: 'PacienteController'
        })
        .when('/newPaciente', {
            templateUrl: 'app/views/paciente/newPaciente.html',
            controller: 'PacienteController'
        })
        .when('/editPaciente/:idPaciente', {
            templateUrl: 'app/views/paciente/editPaciente.html',
            controller: 'PacienteController'
        })
        .when('/VerPaciente/:idPaciente', {
            templateUrl: 'app/views/paciente/verPaciente.html',
            controller: 'PacienteController'
        })
        //Seguimientos
        .when('/seguimiento', {
            templateUrl: 'app/views/seguimiento/seguimiento.html?v1.0',
            controller: 'SeguimientoController'
        })
        .when('/newSeguimiento/:idPaciente', {
            templateUrl: 'app/views/seguimiento/newSeguimiento.html?v1.0',
            controller: 'SeguimientoController'
        })
        .when('/editSeguimiento/:idSeguimiento', {
            templateUrl: 'app/views/seguimiento/editSeguimiento.html?v1.0',
            controller: 'SeguimientoController'
        })
        .when('/seguimientosReporte', {
            templateUrl: 'app/views/seguimiento/seguimientoReporte.html?v1.0',
            controller: 'SeguimientoController'
        })
        //respaldos
        .when('/respaldosOffLine', {
            templateUrl: 'app/views/respaldo/respaldosOffLine.html',
            controller: 'RespaldoController'
        })
        .when('/respaldosOnline', {
            templateUrl: 'app/views/respaldo/respaldosOnLine.html?v1.0',
            controller: 'RespaldoController'
        })
        .when('/generarRespaldos', {
            templateUrl: 'app/views/respaldo/generarRespaldo.html?v1.0',
            controller: 'RespaldoController'
        })
        .otherwise({ redirectTo: '/' });
});

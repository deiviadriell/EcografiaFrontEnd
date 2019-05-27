/**
 * Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/*ewrftklhgfdsfghkjhgfdh exported initSample */

if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
	CKEDITOR.tools.enableHtml5Elements( document );

// The trick to keep the editor in the sample quite small
// unless user specified own height.

CKEDITOR.config.height = 800;
CKEDITOR.config.width = 'auto';
CKEDITOR.config.extraPlugins = 'texttransform';
//CKEDITOR.config.extraPlugins = 'pastefromword';
//CKEDITOR.config.extraPlugins = 'font';
let pts = [9, 12, 14, 16],
	px = [16, 24, 48];

CKEDITOR.config.fontSize_sizes = '8/8pt;9/9pt;10/10pt;11/11pt;12/12pt;14/14pt;16/16pt;18/18pt;20/20pt;22/22pt;24/24pt;26/26pt;28/28pt;36/36pt;48/48pt;72/72pt;';
//CKEDITOR.fontSize_sizes = pts.map(ptVal => `${ptVal}/${ptVal}.0pt`).concat(px.map(pxVal => `${pxVal}px/${pxVal}px`)).join(';');
//CKEDITOR.fontSize_sizes = pts.map(ptVal => `${ptVal}/${ptVal}.0pt`).concat(px.map(pxVal => `${pxVal}px/${pxVal}px`)).join(';');
//CKEDITOR.config.disableNativeSpellChecker = true;
CKEDITOR.disableNativeSpellChecker = false;
CKEDITOR.pasteFromWordRemoveFontStyles = false,
CKEDITOR.pasteFromWordRemoveStyles = false

var seguimiento = null;
function guardarResultados() {
    // Update a user
    var url = "http://localhost/api/Seguimientoes/" + seguimiento.idSeguimiento;
    
     var resultado= CKEDITOR.document.getById('editor');
     seguimiento.resultado = CKEDITOR.instances["editor"].getData()
     var json = JSON.stringify(seguimiento);


    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {       
    }
    xhr.send(json);
    alert("Resultados Agregados Correctamente");
}

var initSample = (function () {
    
    var edadDelPaciente = "";
    //getSeguimiento
    var idSeguimiento = obtenerValorParametro("idSeguimiento")
    getSeguimiento(idSeguimiento);
    function obtenerValorParametro(sParametroNombre) {
        var sPaginaUrl = window.location.search.substring(1);
        var sURLVariables=sPaginaUrl.split('&')
        for (var i= 0; i < sPaginaUrl.length; i++) {
            var sParametro = sURLVariables[i].split('=');
            if (sParametro[0] == sParametroNombre) {
                return sParametro[1];
            }
        }
        return null;
    }
    function calcularEdad(birth_month, birth_day, birth_year) {

        today_date = new Date();
        today_year = today_date.getFullYear();
        today_month = today_date.getMonth();
        today_day = today_date.getDate();
        age = today_year - birth_year;

        if (today_month < (birth_month - 1)) {
            age--;
        }
        if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
            age--;
        }
        edadDelPaciente = age;
        console.log(age);
    }
    function getSeguimiento (idSeguimiento) {

        // Creación de la petición HTTP
        var req = new XMLHttpRequest();
        // Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
        req.open("GET", "http://localhost/api/Seguimientoes/"+idSeguimiento, false);
        // Envío de la petición
        req.send(null);
        // Impresión por la consola de la respuesta recibida desde el servidor        
        seguimiento = JSON.parse(req.response);

        var req1 = new XMLHttpRequest();
        // Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
        req1.open("GET", "http://localhost/api/Pacientes/" + seguimiento.idPaciente, false);
        // Envío de la petición
        req1.send(null);
        // Impresión por la consola de la respuesta recibida desde el servidor        
        paciente = JSON.parse(req1.response);        
        //let fechaNacimiento = new Date(paciente.fecha);
        //console.log(fechaNacimiento);
        
        //calcularEdad(fechaNacimiento.getMonth(), fechaNacimiento.getDay(), fechaNacimiento.getFullYear());
       
    }    
	var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );
	
	return function () {
	    var fecha = new Date();
	    
	    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");	    	    
	    var fechaActual = new Date();
        fechaActual= fecha.getDate() + " de " + meses[fecha.getMonth()] + " del " + fecha.getFullYear();	    
		var editorElement = CKEDITOR.document.getById( 'editor' );

		editorElement.setHtml('<div class="container-fluid">'
            + '<div style="page-break-before: always;page-break-after: always;margin-left: 25px; margin-right: 25px;" class="row">'
            + '<p><span style="font-size:12pt"><span style="font-family:Calibri,sans-serif"><span style="color:red">' + fechaActual + '</span></p>  <span style="font-size:12pt"><span style="font-family:Times New Roman,serif"><strong><span style="font-family:Elephant,serif"><span style="color:blue">NOMBRE DEL PACIENTE: &nbsp;&nbsp;</span></span></strong><u><span style="font-family:&quot;Elephant&quot;,&quot;serif&quot;"><span style="color:blue">' + paciente.nombres + ' ' + paciente.apellidos + '</span></span></u><strong>&nbsp;&nbsp;&nbsp;&nbsp; </strong></span></span>   <br/><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong><span style="font-family:&quot;Elephant&quot;,&quot;serif&quot;"><span style="color:blue">EDAD:&nbsp; &nbsp;</span></span></strong><u><span style="font-family:&quot;Elephant&quot;,&quot;serif&quot;"><span style="color:blue">' + edadDelPaciente + '</span></span></u></span></span><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong><span style="font-family:&quot;Elephant&quot;,&quot;serif&quot;"><span style="color:blue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></strong></span></span> </br>     <span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong><span style="font-family:&quot;Elephant&quot;,&quot;serif&quot;"><span style="color:blue">MEDICO SOLICITANTE:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></strong><u><span style="font-family:&quot;Elephant&quot;,&quot;serif&quot;"><span style="color:blue">DR/DRA ' + seguimiento.medicoReferente + '</span></span></u></span></span>    <hr style="size="8px" color="black">   <p><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong><span style="font-family:&quot;Elephant&quot;,&quot;serif&quot;"><span style="color:red">RESULTADO: </span></span></strong></span></span></p>  </div> </div> '
            
				
			);
		// :(((
		if ( isBBCodeBuiltIn ) {
			editorElement.setHtml(
				'Hello world!\n\n' +
				'I\'m an instance of [url=https://ckeditor.com]CKEditor[/url].'
			);
		}

		// Depending on the wysiwygarea plugin availability initialize classic or inline editor.
		if ( wysiwygareaAvailable ) {
			CKEDITOR.replace( 'editor' );
		} else {
			editorElement.setAttribute( 'contenteditable', 'true' );
			CKEDITOR.inline( 'editor' );

			// TODO we can consider displaying some info box that
			// without wysiwygarea the classic editor may not work.
		}
	};

	function isWysiwygareaAvailable() {
		// If in development mode, then the wysiwygarea must be available.
		// Split REV into two strings so builder does not replace it :D.
		if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
			return true;
		}

		return !!CKEDITOR.plugins.get( 'wysiwygarea' );
	}
} )();
var initEditarResultado = (function () {

   
    var idSeguimiento = obtenerValorParametro("idSeguimiento")
    getSeguimiento(idSeguimiento);
    function obtenerValorParametro(sParametroNombre) {
        var sPaginaUrl = window.location.search.substring(1);
        var sURLVariables = sPaginaUrl.split('&')
        for (var i = 0; i < sPaginaUrl.length; i++) {
            var sParametro = sURLVariables[i].split('=');
            if (sParametro[0] == sParametroNombre) {
                return sParametro[1];
            }
        }
        return null;
    }
    
    function getSeguimiento(idSeguimiento) {

        // Creación de la petición HTTP
        var req = new XMLHttpRequest();
        // Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
        req.open("GET", "http://localhost/api/Seguimientoes/" + idSeguimiento, false);
        // Envío de la petición
        req.send(null);
        // Impresión por la consola de la respuesta recibida desde el servidor        
        seguimiento = JSON.parse(req.response);
        
    }
    var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');

    return function () {       
        var editorElement = CKEDITOR.document.getById('editor');
        console.log(seguimiento.resultado);
        editorElement.setHtml(seguimiento.resultado);
        // :(((
        if (isBBCodeBuiltIn) {
            editorElement.setHtml(
				'Hello world!\n\n' +
				'I\'m an instance of [url=https://ckeditor.com]CKEditor[/url].'
			);
        }

        // Depending on the wysiwygarea plugin availability initialize classic or inline editor.
        if (wysiwygareaAvailable) {
            CKEDITOR.replace('editor');
        } else {
            editorElement.setAttribute('contenteditable', 'true');
            CKEDITOR.inline('editor');

            // TODO we can consider displaying some info box that
            // without wysiwygarea the classic editor may not work.
        }
    };

    function isWysiwygareaAvailable() {
        // If in development mode, then the wysiwygarea must be available.
        // Split REV into two strings so builder does not replace it :D.
        if (CKEDITOR.revision == ('%RE' + 'V%')) {
            return true;
        }

        return !!CKEDITOR.plugins.get('wysiwygarea');
    }
})();




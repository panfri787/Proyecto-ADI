document.getElementById('btn-enviar-peticion').onclick = function(){
	var intitulo = document.getElementById('inputTitulo')
	var inFecha = document.getElementById('inputFecha')
	var inFirmas = document.getElementById('inputFirmas')
	var txDescripcion = document.getElementById('textDescripcion')

	if(intitulo.value != "" && inFecha.value != "" && 
		inputFirmas.value != "" && txDescripcion.value != ""){
		var peticion = {}
		peticion.titulo = intitulo.value
		peticion.fin = inFecha.value
		peticion.texto = txDescripcion.value
		peticion.firmasObjetivo = inFirmas.value

		req = new XMLHttpRequest();
		req.open('POST', 'api/peticiones', true)
		req.setRequestHeader('content-type', 'application/json')
		req.onreadystatechange = peticionEnviada
		req.send(JSON.stringify(peticion))
	} else {
		showAlertDanger("Hay campos sin rellenar.")
	}
}

var showAlertDanger = function(mensaje){
	var alert = document.getElementById('alert-crearPeticion');
	alert.innerHTML = '<button id="close-alert-crearPeticion" type="button" class="close">x</button>'
	alert.innerHTML += "<strong>Error:</strong> "+mensaje
	alert.style.display = "block"
	document.getElementById('close-alert-crearPeticion').onclick = function(){
		alert.style.display = "none"
	}
}

/*var alert = document.getElementById('alert-peticionCreada');
	alert.innerHTML = '<button id="close-alert-peticionCreada" type="button" class="close">x</button>'+
					  'Petición creada correctamente';
	alert.style.display = "block"
	document.getElementById('close-alert-peticionCreada').onclick = function(){
		alert.style.display = "none"
	}
}*/

var peticionEnviada = function(){
	if(req.readyState == 4){
		switch(req.status){
			case 201:
				mostrarPeticionReq(req.getResponseHeader('Location'))
				break;

			case 400:
				showAlertDanger('Alguno de los campos no es correcto.')
				break;

			case 403:
				showAlertDanger('No esta autentificado en la aplicación.')
				break;

			case 500:
				showAlertDanger('Se ha producido un error en el servidor, intentelo mas tarde.')
				break;
		}
	}
}

var mostrarPeticionReq = function(url) {
	req = new XMLHttpRequest()
	req.open('GET', url, false)
	req.onreadystatechange = mostrarPeticion
	req.send()
}

var mostrarPeticion = function() {
	var peticion = JSON.parse(req.responseText)
	window.location = 'peticion?id='+peticion.id
	//showAlertSuccess()
}

/* FIRMAR PETICION */

// Funcion que muestra el form para realizar las firmas
var mostrarPanelFirmas = function() {
	if(localStorage.login === undefined) {
		document.getElementById('panelFirmas').innerHTML =
		'<fieldset><legend>Firma esta petición</legend>'+
		'<div class="form-group"><label for="inputNombre" class="col-lg-3 control-label">Nombre</label>'+
		'<div class="col-lg-9"><input type="text" class="form-control" id="inputNombre" placeholder="Nombre"></div></div>'+
        '<div class="form-group"><label for="inputApellidos" class="col-lg-3 control-label">Apellidos</label>'+
        '<div class="col-lg-9"><input type="text" class="form-control" id="inputApellidos" placeholder="Apellidos"></div></div>'+
        '<div class="form-group"><label for="inputEmail" class="col-lg-3 control-label">Email</label>'+
        '<div class="col-lg-9"><input type="text" class="form-control" id="inputEmail" placeholder="Email"></div></div>'+
        '<div class="form-group"><label for="textComentario" class="col-lg-3 control-label">Comentario</label>'+
        '<div class="col-lg-8"><textarea id="motivosArea" class="form-control" rows="3" id="textComentario" style="margin: 0px -6.84375px 0px 0px; width: 378px; height: 85px;"></textarea>'+
        '<span id="ayudaFirma" class="help-block">Explicanos tus motivos para firmar esta petición.</span></div></div>'+
        '<div class="form-group"><div class="col-lg-9 col-lg-offset-3"><div class="checkbox">'+
		'<label><input id="aceptado" type="checkbox">  Acepto que mi firma se muestre publicamente.</label></div></div></div>'+
        '</fieldset>'
	}
	else {
       	document.getElementById('panelFirmas').innerHTML = 
       	'<fieldset><legend>Firma esta petición</legend>'+
		'<div class="form-group"><label for="textComentario" class="col-lg-3 control-label">Comentario</label>'+
        '<div class="col-lg-8"><textarea id="motivosArea" class="form-control" rows="3" id="textComentario" style="margin: 0px -6.84375px 0px 0px; width: 378px; height: 85px;"></textarea>'+
        '<span id="ayudaFirma" class="help-block">Explicanos tus motivos para firmar esta petición.</span></div></div>'+
        '<div class="form-group"><div class="col-lg-9 col-lg-offset-3"><div class="checkbox">'+
		'<label><input id="aceptado" type="checkbox">  Acepto que mi firma se muestre publicamente.</label></div></div></div>'+
        '</fieldset>'
	}
}

document.getElementById("botonFirmar").onclick = function() {
	// TODO: REALIZAR COMPROBACION DE QUE LOS CAMPOS NO SEAN VACIOS
	if(document.getElementById('motivosArea').value != "") {
		var firma = new Object();
		if(document.getElementById('aceptado').checked == true) {
			firma.publica = true;
		}
		else {
			firma.publica = false;
		}
		// Comentario sobre la firma
		firma.comentario = document.getElementById('motivosArea').value;
		// Si no estamos logueados añado (nombre, apellidos, email)
		if(localStorage.login === undefined) {
			firma.nombre = document.getElementById('inputNombre').value;
			firma.apellidos = document.getElementById('inputApellidos').value;
			firma.email = document.getElementById('inputEmail').value;
		}
		else {
			// Obtengo el nombre del usuario que crea la peticion
			var usuario = new Object();
			obtenerNombre(usuario);
			firma.nombre = usuario.nombre;
			firma.apellidos = usuario.apellidos;
			firma.email = usuario.email;
		}

		req = new XMLHttpRequest();
		req.open('POST','api/peticiones/' + id_peticion + '/firmas/',true);
		// Indicamos al servidor que le llegan datos en formato JSON
		req.setRequestHeader("Content-type", "application/json")
		req.onreadystatechange = enviarFirma;
		req.send(JSON.stringify(firma));
	}
	else {
		// TODO: COMPROBAR OTROS CAMPOS
	}
}

var obtenerNombre = function(usuario) {
	req = new XMLHttpRequest();
	req.open('GET', 'api/usuarios/'+ localStorage.login, true);
	req.onreadystatechange = callbackNombre(usuario);
	req.send()
}

var callbackNombre = function(usuario) {
	if(req.readyState == 4) {
		if(req.status == 200) {
			usuario = JSON.parse(req.responseText);
		}
	}
}	

var enviarFirma = function() {
	if(req.readyState == 4){
		switch(req.status){
			case 201:
				console.log("Firmada la peticion")
				//mostrarPeticionReq(req.getResponseHeader('Location'))
				window.location = "index"
				break;
			case 400:
				console.log('Campos no validos')
				break;
			case 500:
				console.log('Error servidor')
				break;
		}
	}
}
/*
var mostrarFirmaReq = function(url) {
	req = new XMLHttpRequest()
	req.open('GET', url, false)
	req.onreadystatechange = mostrarFirma
	req.send()
}

var mostrarFirma = function() {

}*/
 

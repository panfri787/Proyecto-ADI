//Manejeador para el boton enviar del lightbox crear peticion.
//Realiza la peticion POST para crear una peticion, con los datos obtenidos del form.
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

//Muestra un mensaje de error durante de 5 segundos.
//El mensaje es pasado por parametro.
var showAlertDanger = function(mensaje){
	var alert = document.getElementById('alert-crearPeticion');
	alert.innerHTML = "<strong>Error:</strong> "+mensaje
	alert.style.display = "block"
	window.setTimeout(function(){ alert.style.display = "none" }, 5000)
}

//Muestra un mensaje informativo de que la peticion se ha creado correctamente e invoca
//a la funcion que redirige a la direccion de dicha peticion.
var peticionCorrecta = function(url){
	var alert = document.getElementById('alert-peticionCreada');
	alert.innerHTML = "<strong>Peticion creada correctamente:</strong> espere mientras se le redirige a la misma."
	alert.style.display = "block"
	window.setTimeout(function(){mostrarPeticionReq(url)}, 3000)
}

//Callback de la peticion POST para crear una nueva peticion,
//realiza determinado comportamiento en funcion del status de la peticion.
var peticionEnviada = function(){
	if(req.readyState == 4){
		switch(req.status){
			case 201:
				peticionCorrecta(req.getResponseHeader('Location'))
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

//Peticion get para obtener el id de la peticion recien creada.
var mostrarPeticionReq = function(url) {
	req = new XMLHttpRequest()
	req.open('GET', url, false)
	req.onreadystatechange = mostrarPeticion
	req.send()
}

//Callback de la peticion anterior que redirige la pagina de la peticion recien creada.
var mostrarPeticion = function() {
	var peticion = JSON.parse(req.responseText)
	window.location = 'peticion?id='+peticion.id
}

/* FIRMAR PETICION */
/*
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

// Evento para enviar la firma de la petición
document.getElementById("botonFirmar").onclick = function() {
	
	if(document.getElementById('motivosArea').value != "") {
		var firma = new Object();
		// Si la queremos como firma pública
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
			req2 = new XMLHttpRequest();
			req2.open('GET', 'api/usuarios/' + localStorage['login'], true);
			req2.onreadystatechange = function(){
				obtenerNombre(firma)
			}
			req2.send();			
		}
		req = new XMLHttpRequest();
		req.open('POST','api/peticiones/' + id_peticion + '/firmas/',true);
		// Indicamos al servidor que le llegan datos en formato JSON
		req.setRequestHeader("Content-type", "application/json")
		req.onreadystatechange = enviarFirma;
		req.send(JSON.stringify(firma));
	}
}

// Obtiene el nombre si ya estamos logueados para enviar junto con la firma
var obtenerNombre = function(firma) {
	if(req2.readyState == 4){
		if(req2.status == 200){
			var usuario = JSON.parse(req2.responseText)
			firma.nombre = usuario.nombre;
			firma.apellidos = usuario.apellidos;
			firma.email = usuario.email;
		}
	}
}
*/
// Callback de enviar la firma con las diferentes respuestas
var enviarFirma = function() {
	if(req.readyState == 4){
		switch(req.status){
			case 201:
				console.log("Firma aceptada" + req.getResponseHeader('Location'))
				mostrarFirmaReq(req.getResponseHeader('Location'))
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

// Hace la peticion al servidor para que nos devuelva el id y construir el enlace
var mostrarFirmaReq = function(url) {
	req = new XMLHttpRequest()
	req.open('GET', url, false)
	//Callback
	req.onreadystatechange = mostrarFirmaID
	req.send()
}

// Callback para obtener el ID
var mostrarFirmaID = function() {
	if(req.readyState == 4) {
		if(req.status == 200) {
			var firmaURL = JSON.parse(req.responseText)
			console.log("ID de la firma: " + firmaURL.id);
			window.location = 'api/peticiones/' + id_peticion + "/firmas/" + firmaURL.id;
		}
	}
}

var esAutorDePeticion = function(email){
	if(localStorage.getItem("login")==email){
		div = document.getElementById("actualizaciones");
		div.innerHTML+='<p id="actualizacion-editor"></p>';
  		div.innerHTML+='<br><span class="col-lg-10"><input id="btn-actu" type="button" class="btn btn-primary" value="Añadir Actualizacion" /></span>';
  		div.innerHTML+='<input id="btn-enviar" type="button" style="visibility: hidden" class="btn btn-primary" value="Enviar"/><br><br>';
  		return true
	} else {
		return false
	}
}

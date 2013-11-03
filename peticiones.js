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

var peticionEnviada = function(){
	if(req.readyState == 4){
		switch(req.status){
			case 201:
				mostrarPeticionReq(req.getResponseHeader('Location'))
				console.log('Peticion creada correctamente')
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
}
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
		console.log('TODO: CONTROLAR CAMPOS VACIOS')
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
				console.log('Campos no validos')
				break;

			case 403:
				console.log('Error autentificacion')
				break;

			case 500:
				console.log('Error servidor')
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

/* FIRMAR PETICION */

// Funcion que muestra el form para realizar las firmas
var mostrarPanelFirmas = function() {
	if(localStorage.login === undefined) {
		document.getElementById('panelFirmas').style.visibility="hidden";
	}
	else {
        document.getElementById('firmarHidden').style.visibility = "hidden"
        document.getElementById('panelFirmas').style.visibility = "visible"
        document.getElementById('mensajeErrorCheck').style.visibility = "hidden"
        document.getElementById('mensajeErrorMotivo').style.visibility = "hidden"
	}
}

// TODO: CAMBIAR LOS ELEMENTOS DE ERROS QUE ESTAN HECHOS EN PLAN CHAPUZA
document.getElementById("botonFirmar").onclick = function() {
	// TODO: VOLVER A LEER EL ENUNCIADO
	if(document.getElementById("aceptado").checked == true)
	{
		document.getElementById("mensajeErrorCheck").style.visibility = "hidden"
		//Que la firma no este vacia
		if(document.getElementById("motivosArea").value == "")
		{
			document.getElementById('mensajeErrorMotivo').style.visibility = "visible"
		}
		else
		{
			document.getElementById('mensajeErrorMotivo').style.visibility = "hidden"
			document.getElementById("mensajeErrorCheck").style.visibility = "hidden"
			//Empiezo a realizar la peticion
			var firma = new Object();
			firma.publica = true;
			firma.comentario = document

		}
	}
	else {
		document.getElementById("mensajeErrorCheck").style.visibility = "visible"
	}

}

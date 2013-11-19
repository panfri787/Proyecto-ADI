
// Modelo
var Firma = Backbone.Model.extend({
	defaults: {
		nombre: '',
		apellidos: '',
		email: '',
		publica: false
	},
	// url's para hacer las peticiones
	urlUsuario: "/api/usuarios/",
	urlFirmar: 'api/peticiones/',
	toString: function() {
		var cad = this.get('nombre') + " " + this.get('apellidos') + " " + this.get('email');
		if(this.get('publica'))
			cad += " firma PUBLICA";
		else
			cad += " firma NO PUBLICA";
	},
	// Realizar la peticion de insertar la firma en el bbdd
	firmar: function() {
		this.save();
	},
	marcarComoPublica: function() {
		this.set('publica', true);
	},
	// Si ya estoy logueado obtengo los datos del usuario(nombre, apellidos, email)
	datosUsuario: function(login) {
		xhr = new XMLHttpRequest();
		xhr.open('GET', urlUsuario + login, true);
		xhr.onreadystatechange = function() {
			if(this.readyState == 4)
				if(this.status == 200) {
					var usuario = JSON.parse(xhr.responseText);
					this.set('nommbre', usuario.nombre);
					this.set('apellidos', usuario.apellidos);
					this.set('email', usuario.email);
				}
		}
		xhr.send();
	}
	// Envia la peticion para realizar la firma
	enviarFirma: function(idPeticion) {
		xhr = new XMLHttpRequest();
		xhr.open('POST', urlFirmar + '/firmas/', true);
		// Indicamos al servidor que le llegan datos en formato JSON
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange = function() {
			if(this.readyState == 4) {
				switch(this.status) {
					case 201:
						console.log("Firma aceptada" + this.getResponseHeader('Location'))
						// TODO: falta realizar la peticion para crear el enlace que lleva a esa firma y hacer un window.onload
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
		xhr.send(JSON.stringify(this));
	}

});

// Coleccion de Firma
var Firmas = Backbone.Collection.extend({
	// Referencia al modelo
	model: Firma,
	
});
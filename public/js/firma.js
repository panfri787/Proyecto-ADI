
// Modelo
var Firma = Backbone.Model.extend({
	defaults: {
		nombre: '',
		apellidos: '',
		email: '',
		comentario: '',
		publica: false
	},
	toString: function() {
		var cad = this.get('nombre') + " " + this.get('apellidos') + " " + this.get('email');
		if(this.get('publica'))
			cad += " firma PUBLICA";
		else
			cad += " firma NO PUBLICA";
	},
	// Si ya estoy logueado obtengo los datos del usuario(nombre, apellidos, email)
	datosUsuario: function(login) {
		xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/usuarios/' + login, true);
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

});

// Coleccion de Firma
var FirmaCollection = Backbone.Collection.extend({
	model: Firma,
	// url para hacer la peticion
	urlRoot: function() {
		return this.document.url() + '/firmas/';
	}
});

// Plantilla para mostrar la firma
var panelFirmas = Backbone.Collection.extend({
	// Creo el template con mustache
	template: Mustache.compile('<h1>OLA K ASE</h1>'),
	render: function() {
		this.el.innnerHTML = this.template(this.model.toJSON());
	}
});

// Vista de la firma en peticion
var FirmaView = Backbone.View.extend({
	initialize: function() {
		this.collection.fetch({reset: true});
		// TODO: ¿listenTo?
		this.listenTo(this.collection, "panel", this.render)
	},
	el: '#panelFirmas',
	// Se llama cada vez que haya que dibujar la vista
	render: function() {
		console.log("ehhhhh");
		var pf = new panelFirmas();
		pf.render();
	},
	// Evento que recoge los datos y hace la firma
	eventoFirmar: function() {
		console.log("en el evento");
		// Recojo los valores de los campos
		if(document.getElementById('motivosArea').value != "") {
			// Creo una nueva firma
			var f = new Firma();
			if(document.getElementById('aceptado').checked == true) {
				f.set('publica', true);
			}
			// Comentario sobre la firma
			f.set('comentario', document.getElementById('motivosArea').value);
			// Si no estamos logueados añado (nombre, apellidos, email)
			if(localStorage.login === undefined) {
				f.set('nombre', document.getElementById('inputNombre').value);
				f.set('apellidos', document.getElementById('inputApellidos').value);
				f.set('email', document.getElementById('inputEmail').value);
			}
			// Realizo una peticion al modelo para solicitar los datos del login
			else {
				f.datosUsuario(localStorage.login);
			}
			// Añado a la coleccion
			this.collection.add(f);
			// Guardo mandandolo al servidor
			f.save();
		}
	},

	events: {
		"click #botonFirmar": "eventoFirmar"
	}
});

// TODO ROUTERS

// Modelo
var FirmaModelo = Backbone.Model.extend({
	defaults: {
		nombre: '',
		apellidos: '',
		email: '',
		comentario: '',
		publica: false
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
})

// Coleccion de Firma
var FirmaCollection = Backbone.Collection.extend({
	model: FirmaModelo,
	initialize: function(options) {
		this.id = options.id;
	},
	// url para hacer la peticion
	url: function() {
		return 'api/peticiones/' + this.id + '/firmas/'
	} 
})

// Vista de la firma
var FirmaView = Backbone.View.extend({
	render: function() {
		//this.ac.innnerHTML = this.template(this.model.toJSON());
		// Compruebo si se esta logueado para mostrar unos campos u otros
		if(localStorage.login === undefined) {
			this.el.innerHTML = 
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
	        '</fieldset>';
		}
		else {
	       	this.el.innerHTML =
	       	'<fieldset><legend>Firma esta petición</legend>'+
			'<div class="form-group"><label for="textComentario" class="col-lg-3 control-label">Comentario</label>'+
	        '<div class="col-lg-8"><textarea id="motivosArea" class="form-control" rows="3" id="textComentario" style="margin: 0px -6.84375px 0px 0px; width: 378px; height: 85px;"></textarea>'+
	        '<span id="ayudaFirma" class="help-block">Explicanos tus motivos para firmar esta petición.</span></div></div>'+
	        '<div class="form-group"><div class="col-lg-9 col-lg-offset-3"><div class="checkbox">'+
			'<label><input id="aceptado" type="checkbox">  Acepto que mi firma se muestre publicamente.</label></div></div></div>'+
	        '</fieldset>';
		}
	}
})

// Vista
var FirmasView = Backbone.View.extend({
	initialize: function() {
		this.collection = new FirmaCollection({id: this.options.id});
		_.bindAll(this, "renderPanel");
		this.collection.fetch({reset: true});
		this.listenTo(this.collection, "reset", this.render)
	},
	el: '#panelFirmas',
	// Dibuja el panel de firmas
	render: function() {
		this.collection.each(this.renderPanel)
	},
	renderPanel: function() {
		var firmaView = new FirmaView({model: firma});
		firmaView.render();
		this.el.appendChild(firmaView.el);
	},
	// Evento que recoge los datos y hace la firma
	eventoFirmar: function() {
		console.log("en el evento");
		// Recojo los valores de los campos
		if(document.getElementById('motivosArea').value != "") {
			// Creo una nueva firma
			var f = new FirmaModelo();
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
			// Guardo
			f.save();
			// TODO: Llevar a la url que muestra el json de la firma enviada
		}
	},
	events: {
		"click #eventoFirmar": "eventoFirmar"
	}
})

var fv;
window.onload = function() {
	console.log(id_peticion)
}

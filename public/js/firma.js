
// Modelo
var FirmaModelo = Backbone.Model.extend({
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

})

// Coleccion de Firma
var FirmaCollection = Backbone.Collection.extend({
	model: FirmaModelo,
	// url para hacer la peticion
	urlRoot: function() {
		return this.document.url() + '/firmas/';
	}
})

// Vista de la firma
var FirmaView = Backbone.View.extend({
	className: "firma", // NI ZORRA PORQUE NO TENGO NINGUNA CLASS ASÍ
	// Creo el template con mustache, TODO: Comprobar cuando el nombre es NULL poner desconocido
	template: Mustache.compile('<blockquote><p>{{comentario}}</p><small><b>{{nombre}}</b>{{fecha}}</small></blockquote>'),
	render: function() {
		this.ac.innnerHTML = this.template(this.model.toJSON());
	}
})

// Vista
var FirmasView = Backbone.View.extend({
	initialize: function() {
		this.collection = new FirmaCollection();
		_.bindAll(this, "renderPanel");
		this.collection.fetch({reset: true});
		this.listenTo(this.collection, "reset", this.render)
	},
	el: '#panelFirmas',
	ac: '#firmasRecientes',
	// Se llama cada vez que haya que dibujar la vista
	render: function() {
		this.collection.each(this.renderPanel);
	},
	// Muestra el panel de firmas
	renderPanel: function() {
		// Compruebo si se esta logueado para mostrar unos campos u otros
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
	},
	// Actualizaré las firmas recientes
	renderFirma: function(firma) {
		var firmaView = new FirmaView({model:firma});
		firmaView.render();
		this.ac.appendChild(firmaView.ac);
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
			// Añado a la coleccion
			this.collection.add(f);
			// Guardo
			f.save();
			// Actualizo las firmas recientes
			this.renderFirma(f);
		}
	},
	events: {
		"click #eventoFirmar": "eventoFirmar"
	}
})

var fv;
window.onload= function() {
	fv = new FirmasView();
	console.log("dentro");
}

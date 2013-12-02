
// Modelo de Firma
var FirmaModelo = Backbone.Model.extend({
	defaults: {
		nombre: '',
		apellidos: '',
		email: '',
		comentario: '',
		publica: false
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
		// Compruebo si se esta logueado para mostrar unos campos u otros
		if(localStorage.login === undefined) {
			document.getElementById("panelFirmas").innerHTML = 
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
	       	document.getElementById("panelFirmas").innerHTML =
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
	initialize: function(options) {
		this.collection = new FirmaCollection({id: options.id});
		this.id = options.id;
		this.render();
	},
	el: "#panelBoton",
	// Dibuja el panel de firmas
	render: function() {
		var firmaView = new FirmaView();
		firmaView.render();
	},
	// Evento que recoge los datos y hace la firma
	eventoFirmar: function() {
		var usuario = new Object();
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
			// Añado a la colección
			this.collection.add(f);
			// Guardo
			f.save();
			// Firma enviada
			console.log("Firma enviada")
			window.location = "peticion?id=" + this.id;
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

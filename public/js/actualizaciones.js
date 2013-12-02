var ActualizacionModel = Backbone.Model.extend({});

var Actualizaciones = Backbone.Collection.extend({
	model: ActualizacionModel,
	initialize: function(options){
		this.id = options.id
		this.creador = options.creador
	},

	url: function(){
		return "api/peticiones/"+this.id+"/actualizaciones"
	}
});

var ActualizacionView = Backbone.View.extend({
	initialize: function(options){
		this.creador = options.creador
	},
	templateCreador: Mustache.compile('<li class="list-group-item">'+
							   		'<span class="badge">'+'{{fecha}}'+'</span>'+'{{contenido}}<br>'+
							   		'<input type="button" class="btn btn-primary btn-xs btn-modificar" value="Modificar" /> '+
							   		'<input type="button" class="btn btn-danger btn-xs btn-borrar" value="Borrar" />'+
							   '</li>'),
	templateDefecto: Mustache.compile('<li class="list-group-item">'+
							   		'<span class="badge">'+'{{fecha}}'+'</span>'+'{{contenido}}<br>'+
							   '</li>'),
	render: function(){
		if(this.creador){
			this.el.innerHTML = this.templateCreador(this.model.toJSON())
		} else {
			this.el.innerHTML = this.templateDefecto(this.model.toJSON())
		}
	}
});

var ActualizacionesView = Backbone.View.extend({
	initialize: function(options){
		this.collection = new Actualizaciones({id: options.id, creador: options.creador})
		_.bindAll(this, "renderActualizacion");
		this.collection.fetch({reset: true});
		this.listenTo(this.collection, "reset", this.render);		
	},

	el: "#actualizaciones",

	render: function(){
		this.el.innerHTML+='<h2 class="text-primary">Actualizaciones</h2>'+'<ul class="list-group" id="actualizaciones-lista"></ul>'
      	this.collection.each(this.renderActualizacion)
      	if(this.collection.creador){
      		this.el.innerHTML+='<br><p id="actualizacion-editor"></p>';
      		this.el.innerHTML+='<br><span class="col-lg-10"><input id="btn-actu" type="button" class="btn btn-primary" value="Añadir Actualizacion" /></span>';
      		this.el.innerHTML+='<input id="btn-enviar" type="button" style="visibility: hidden" class="btn btn-primary" value="Enviar"/><br><br>';
      	}
	},

	renderActualizacion : function(actu){
		var vistaActu = new ActualizacionView({model: actu, creador: this.collection.creador});
		vistaActu.render();
		document.getElementById("actualizaciones-lista").appendChild(vistaActu.el);
	},

	mostrarEditor : function(){
		editor = document.getElementById("actualizacion-editor");
		editor.innerHTML = "Haga click aquí para añadir su actualizacion."
		jQuery('#actualizacion-editor').hallo();
		document.getElementById("btn-actu").style.visibility="hidden";
		document.getElementById("btn-enviar").style.visibility="visible";
	},

	enviarActualizacion : function(){
		jQuery('#actualizacion-editor').hallo({editable: false});
		var m_actualizacion = new ActualizacionModel();
		m_actualizacion.set("contenido", document.getElementById("actualizacion-editor").innerHTML);
		document.getElementById("actualizacion-editor").innerHTML="";
		this.collection.add(m_actualizacion);
		m_actualizacion.save();
		this.renderActualizacion(m_actualizacion);
		document.getElementById("btn-actu").style.visibility="visible";
		document.getElementById("btn-enviar").style.visibility="hidden";
	},

	events: {
		"click #btn-actu" : "mostrarEditor",
		"click #btn-enviar" : "enviarActualizacion"
	}
});
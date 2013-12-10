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

var editando = false;

var ActualizacionView = Backbone.View.extend({
	initialize: function(options){
		this.creador = options.creador
	},
	tagName: "li",
	className: "list-group-item",
	templateCreador: Mustache.compile('<span class="badge">'+'{{fecha}}'+'</span>'+'{{contenido}}<br>'+
							   		'<input type="button" class="btn btn-primary btn-xs btn-modificar" value="Modificar"> '+
							   		'<input type="button" class="btn btn-danger btn-xs btnBorrar" value="Borrar">'),

	templateEdicion: Mustache.compile('<p id="editable">{{contenido}}<p><br>'+
							   		'<input type="button" class="btn btn-primary btn-xs btn-enviar" value="Enviar">'),

	templateDefecto: Mustache.compile('<span class="badge">'+'{{fecha}}'+'</span>'+'{{contenido}}<br>'),
	render: function(){
		if(this.creador){
			this.el.innerHTML = this.templateCreador(this.model.toJSON());
		} else {
			this.el.innerHTML = this.templateDefecto(this.model.toJSON());
		}
	},

	editarActualizacion: function(){
		if(editando){
			return
		} else {
			editando = true
			this.el.innerHTML = this.templateEdicion(this.model.toJSON())
			$('#editable').hallo({
				editable: true,
				plugins: {
				    'halloformat': {}
				}});
			$('#editable').focus();
		}
	},

	borrarActualizacion: function(){
		this.model.destroy();
		this.remove();
	},

	enviarModificacion: function(){
		this.model.set("contenido", $('#editable').html())
		this.model.save();
		this.render();
		editando = false;
	},
	events: {
       "click .btnBorrar" : "borrarActualizacion",
       "click .btn-modificar" : "editarActualizacion",
       "click .btn-enviar" : "enviarModificacion"
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
      	this.collection.each(this.renderActualizacion)
	},

	renderActualizacion : function(actu){
		var vistaActu = new ActualizacionView({model: actu, creador: this.collection.creador});
		vistaActu.render();
		document.getElementById("actualizaciones-lista").appendChild(vistaActu.el);
	},

	mostrarEditor : function(){
		editor = document.getElementById("actualizacion-editor");
		editor.innerHTML = "Haga click aquí para añadir su actualizacion."
		$('#actualizacion-editor').hallo({editable: true,
										  plugins: {
										    'halloformat': {"formattings": {"bold": true, "italic": true}}
										  }
										});
		$('#actualizacion-editor').focus();
		document.getElementById("btn-actu").style.visibility="hidden";
		document.getElementById("btn-enviar").style.visibility="visible";
	},

	enviarActualizacion : function(){
		$('#actualizacion-editor').hallo({editable: false});
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
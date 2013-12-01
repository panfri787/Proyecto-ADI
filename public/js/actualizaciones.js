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
      	this.collection.each(this.renderActualizacion)
      	if(this.collection.creador){
      		this.el.innerHTML+='<br><input type="button" class="btn btn-primary" value="Añadir Actualizacion">';
      	}
	},

	renderActualizacion : function(actu){
		var vistaActu = new ActualizacionView({model: actu, creador: this.collection.creador});
		vistaActu.render();
		this.el.appendChild(vistaActu.el);
	}
});
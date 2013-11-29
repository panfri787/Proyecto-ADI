var ActualizacionModel = Backbone.Model.extend({});

var Actualizaciones = Backbone.Collection.extend({
	model: ActualizacionModel,
	initialize: function(options){
		this.id = options.id
	},

	url: function(){
		return "api/peticiones/"+this.id+"/actualizaciones"
	}
});

var ActualizacionView = Backbone.View.extend({
	template: Mustache.compile('<li class="list-group-item">'+
							   		'<span class="badge">'+'{{fecha}}'+'</span>'+'{{contenido}}'+
							   '</li>'),
	render: function(){
		this.el.innerHTML = this.template(this.model.toJSON())
	}
});

var ActualizacionesView = Backbone.View.extend({
	initialize: function(options){
		this.collection = new Actualizaciones({id: options.id})
		_.bindAll(this, "renderActualizacion");
		this.collection.fetch({reset: true});
		this.listenTo(this.collection, "reset", this.render);		
	},

	el: "#actualizaciones",

	render: function(){
		this.el.innerHTML='<h2 class="text-primary">Actualizaciones</h2>'
      	this.el.innerHTML+='<ul class="list-group">'
      	this.collection.each(this.renderActualizacion)
	},

	renderActualizacion : function(actu){
		var vistaActu = new ActualizacionView({model: actu});
		vistaActu.render();
		this.el.appendChild(vistaActu.el);
	}
});
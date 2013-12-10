require "sinatra/base"
require "sinatra/reloader"
require "sinatra/mustache"
require_relative "../datos/init_datamapper"
require_relative "../negocio/peticion_service"

class ServidorPlantillas < Sinatra::Base

	get '/' do
		'Hola Sinatra'
	end

	get '/index'  do
		@destacadas = PeticionService.new.listar_destacadas
		mustache :index
	end

	configure do
		'Arrancando la aplicacion...'
		init_datamapper
		Tilt.register Tilt::MustacheTemplate, 'html'

		#@servicioPeticiones = PeticionService.new		
	end
	
end
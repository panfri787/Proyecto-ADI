require "sinatra/base"
require "sinatra/reloader"
require "sinatra/mustache"
require_relative "../datos/init_datamapper"
require_relative "../negocio/peticion_service"
require_relative "../negocio/usuario_service"

class ServidorPlantillas < Sinatra::Base

	get '/' do
		'Hola Sinatra'
	end

	get '/index'  do
		@destacadas = PeticionService.new.listar_destacadas
		mustache :index
	end

	get '/peticion' do
		@peticion = PeticionService.new.get params[:id]
		mustache :peticion
	end

	# Peticion para que nos devuelva el usuario y mostrarlo en el perfil
	get '/usuario' do
		@usuario = UsuarioService.new.get params[:login]
		mustache :usuario
	end

	configure do
		'Arrancando la aplicacion...'
		init_datamapper
		Tilt.register Tilt::MustacheTemplate, 'html'

		#servicioPeticiones, PeticionService.new		
	end
	
end
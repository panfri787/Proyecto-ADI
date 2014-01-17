require "sinatra/base"
require "sinatra/reloader"
require "json"
require_relative "../datos/init_datamapper"
require_relative "../negocio/usuario_service"
require_relative "autentificacion.rb"

class ServidorAPI < Sinatra::Base

	#Se lanzara antes de cualquier peticion sobre el api de usuarios (Zona protegida)
	before '/usuarios/*' do
	    if session[:usuario].nil?
	      halt 403
	    end
	end

	#Devuelve los datos de un usuario
	get '/usuarios/:login' do
		usuario = UsuarioService.new.get params[:login]
		if usuario.nil?
			status 400
		else
			usuario.to_json
		end
	end

	#Comprueba que el login este disponible
	get '/loginDisponible/:login' do
		usuario = UsuarioService.new.get params[:login]
		status 200
		if usuario.nil?
			body 'OK'
		else
			body 'no'	
		end
	end

	#Registro del usuario
	post '/usuarios' do
		request.body.rewind 
		data = JSON.parse request.body.read
		#Compruebo que los campos no esten vacios
		if(data['login'].nil? || data['password'].nil? || data['nombre'].nil? || data['apellidos'].nil?)
			status 400
		else
			UsuarioService.new.createUser data
			status 201
		end
	end

	configure do
		init_datamapper
	end

end
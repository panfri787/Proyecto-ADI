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
			if session[:usuario] == params[:login]
				usuario.to_json
			else
				halt 403
			end
		end
	end

	#Maneja una peticion POST al API de la aplicacion para crear una peticion nueva.
	post '/peticiones' do
		if session[:usuario].nil?
			status 403
		else
			u = UsuarioService.new.get session[:usuario]
			json = JSON.parse(request.body.read)
			if json["titulo"].nil? || json["fin"].nil? || json["texto"].nil? || json["firmasObjetivo"].nil?
					status 400
			else
				id = PeticionService.new.crear json, u 
				if id > 0
					status 201
					headers \
						'Location' => "api/peticiones/#{id}" 
				else
					status 500
				end
			end
		end
	end

	#Maneja la peticion GET al API que devuelve el recurso JSON de una peticion.
	get '/peticiones/:id' do
		if session[:usuario].nil?
			status 403			
		else
			p = PeticionService.new.get params[:id]
			p.to_json
		end

	end

	configure do
		init_datamapper
	end

end
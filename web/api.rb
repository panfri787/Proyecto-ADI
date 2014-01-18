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

	#Maneja la peticion POST al api para crear una actualizacion de una peticion.
	post '/peticiones/:id_pet/actualizaciones' do
		if session[:usuario].nil?
			status 403
			"No conectado"
		else
			ps = PeticionService.new
			p = ps.get params[:id_pet]
			json = JSON.parse(request.body.read)
			if p.creador.login == session[:usuario] 
				act = ps.anyadir_actualizacion json, p
				
				status 201
				headers \
					'Location' => "api/peticiones/#{params[:id_pet]}/actualizaciones/#{act.id}"
				act.to_json
 			else
				status 403
				"No es el propietario de la peticion"
			end
		end
	end

	#Maneja la peticion GET al api para devolver las actualizaciones de una peticion.
	get '/peticiones/:id_pet/actualizaciones' do
		lista = PeticionService.new.listar_actualizaciones params[:id_pet]
		lista.to_json
	end

	#Maneja la peticion DELETE al api para borrar una actualizacion de una peticion.
	delete '/peticiones/:id_pet/actualizaciones/:id_act' do
		if session[:usuario].nil?
			status 403
			"No conectado"
		else
			ps = PeticionService.new
			p = ps.get params[:id_pet]
			if session[:usuario] == p.creador.login
				if ps.borrarActualizacion params[:id_act]
					status 200
					"Actualizacion borrada"
				else
					status 500
					"Error en el servidor"
				end
 			else
				status 403
				"No estas autorizado a borrar esta actualizacion"
			end
		end
	end

	#Maneja la peticion PUT al api para modificar una actualizacion de una peticion.
	put '/peticiones/:id_pet/actualizaciones/:id_act' do
		if session[:usuario].nil?
			status 403
			"No conectado"
		else
			ps = PeticionService.new
			p = ps.get params[:id_pet]
			if session[:usuario] == p.creador.login
				json = JSON.parse(request.body.read)
				if ps.modificarActualizacion(json, params[:id_act])
					status 200
					"Actualizacion modificada"	
				else
					status 500
					"Error en el servidor"
				end
			else
				status 403
				"No estas autorizado a modificar esta actualizacion"
			end
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

	#Firma de la peticion
	post '/peticiones/:id/firmas/' do
		data = JSON.parse request.body.read
		# Compruebo que el comentario no esté vacio
		if data['comentario'].nil?
			status 400
		else
			PeticionService.new.addFirma data, params[:id]
			status 201
		end
	end

	configure do
		init_datamapper
	end

end
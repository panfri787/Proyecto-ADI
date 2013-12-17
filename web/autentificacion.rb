require "sinatra/base"
require "sinatra/reloader"
require_relative "../datos/init_datamapper"
require_relative "../negocio/usuario_service"

class ServidorAutentificacion < Sinatra::Base

	#Efectua el login contra el servidor validando los datos.
	post '/login' do
		@usuario = UsuarioService.new.get params[:login]
		if @usuario != nil
			if @usuario.password == params[:password]
				session[:usuario] = params[:login]
			else
				status 403
			end
		else
			status 403			
		end
	end

	#Desloguea a un usuario.
	get '/logout' do
		session.clear
	end

	configure do
		init_datamapper
	end
	
end
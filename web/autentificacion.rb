require "sinatra/base"
require "sinatra/reloader"
require_relative "../datos/init_datamapper"
require_relative "../negocio/usuario_service"

class ServidorAutentificacion < Sinatra::Base

	use Rack::Session::Pool, :expire_after => 60*60		

	#Efectua el login contra el servidor validando los datos.
	post '/login' do
		if params[:login] == nil || params[:password] == nil
			status 400			
		else
			@usuario = UsuarioService.new.get params[:login]
			if @usuario == nil
				status 403
			elsif @usuario.password != params[:password]
				status 403
			else
				session[:usuario] = @usuario.login
			end
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
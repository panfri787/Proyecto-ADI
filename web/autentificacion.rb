require "sinatra/base"
require "sinatra/reloader"
require_relative "../datos/init_datamapper"

class ServidorAutentificacion < Sinatra::Base

	get '/login' do
		'TODO'
	end

	get '/logout' do
		'TODO'
	end

	configure do
		init_datamapper
	end
	
end
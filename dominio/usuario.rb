require "data_mapper"

class Usuario
	include DataMapper::Resource

	property :login, String, :key => true
	property :password, String, :required => true

	has n, :peticiones, 'Peticion'
end
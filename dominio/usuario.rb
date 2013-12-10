require "data_mapper"

class Usuario
	include DataMapper::Resource

	property :login, String, :key => true
	property :password, String, :required => true
	property :nombre, String
	property :apellidos, String
	property :registrado, Boolean

	has n, :peticiones, 'Peticion'
end
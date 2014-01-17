require "data_mapper"

class Actualizacion
	include DataMapper::Resource

	property :contenido, String
	property :fecha, DateTime

	belongs_to :peticion
end
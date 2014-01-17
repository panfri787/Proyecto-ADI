require "data_mapper"

class Firma
	include DattaMapper::Resource

	property :id, Serial
	property :comentario, String
	property :nombre, String
	property :apellidos, String
	property :email, String
	property :publica, Boolean

	#Relacion a la que pertenece
	belongs_to peticion
	
end
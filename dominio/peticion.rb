require "data_mapper"

class Peticion
	include DataMapper::Resource

	property :id, Serial
	property :titulo, String
	property :firmasConseguidas, Integer
	property :firmasObjetivo, Integer
	property :destacada, Boolean
	property :texto, Text

	#Faltan muchos campos!!!

	belongs_to :usuario

	def creador
		usuario
	end  

end
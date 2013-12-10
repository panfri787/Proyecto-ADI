require "data_mapper"

class Peticion
	include DataMapper::Resource

	property :id, Serial
	property :titulo, String
	property :firmasConseguidas, Integer
	property :destacada, Boolean

	#Faltan muchos campos!!!

	belongs_to :usuario

	def creador
		usuario
	end  

end
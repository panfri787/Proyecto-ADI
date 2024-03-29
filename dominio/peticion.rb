require "data_mapper"

class Peticion
	include DataMapper::Resource

	property :id, Serial
	property :titulo, String
	property :firmasConseguidas, Integer
	property :firmasObjetivo, Integer
	property :destacada, Boolean
	property :texto, Text
	property :fin, Date

	belongs_to :usuario
	has n, :actualizaciones, 'Actualizacion'
	#has n, :firmas, 'Firma'

	def creador
		usuario
	end  

end
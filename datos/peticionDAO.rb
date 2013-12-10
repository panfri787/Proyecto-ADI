require_relative "../dominio/peticion"

class PeticionDAO
	def listar_destacadas()
		Peticion.all(:destacada => true)		
	end
end
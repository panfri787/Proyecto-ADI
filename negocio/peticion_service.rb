require_relative "../datos/peticionDAO"

class PeticionService

	def listar_destacadas()
		PeticionDAO.new.listar_destacadas		
	end

end
require_relative "../datos/peticionDAO"

class PeticionService

	def initialize
		@dao = PeticionDAO.new
	end

	def listar_destacadas()
		@dao.listar_destacadas		
	end

	def get(id)
		@dao.get id
	end

end
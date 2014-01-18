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

	def crear(datos, usuario)
		pet = @dao.crear datos, usuario
		if pet.nil?
			-1
		else
			pet.id
		end
	end

	def addFirma(data,id)
		FirmaDAO.new.addFirma data
		self.incrementarFirma id
	end

	def incrementarFirma(id)
		p = @dao.modificarNumFirmas id
	end

end
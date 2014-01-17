require_relative "../dominio/peticion"

class PeticionDAO
	def listar_destacadas()
		Peticion.all(:destacada => true)		
	end

	def get(id)
		Peticion.get(id)	
	end

	def crear(json, usuario)
		pet = usuario.peticiones.new(:titulo => json["titulo"], :fin => json["fin"], :firmasObjetivo => json["firmasObjetivo"], :firmasConseguidas => 0, :destacada => false, :texto => json["texto"])
		pet.save
		pet		
	end
end
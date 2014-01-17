require_relative "../datos/peticionDAO"
require_relative "../datos/actualizacionDAO"

class PeticionService

	def initialize
		@dao = PeticionDAO.new
		@actDao = ActualizacionDAO.new
	end

	def listar_destacadas()
		@dao.listar_destacadas		
	end

	def get(id)
		@dao.get id
	end

	def anyadir_actualizacion(datos, peticion)
		act = @actDao.crear datos, peticion
		act
	end

	def listar_actualizaciones(id_pet)
		@actDao.listarDeUnaPeticion id_pet
	end

	def borrarActualizacion(id_act)
		@actDao.borrar(id_act)		
	end

	def modificarActualizacion(datos, id_act)
		@actDao.modificar datos, id_act
	end

	def crear(datos, usuario)
		pet = @dao.crear datos, usuario
		if pet.nil?
			-1
		else
			pet.id
		end
	end

end
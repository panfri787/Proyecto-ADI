require_relative "../dominio/actualizacion"

class ActualizacionDAO
	def crear(datos, peticion)
		act = peticion.actualizaciones.new(:contenido => datos["contenido"], :fecha => Time.now)
		act.save
		act		
	end

	def listarDeUnaPeticion(id_pet)
		Actualizacion.all(:peticion => {:id => id_pet}, :order => [ :id.desc ], :limit => 3)
	end

	def borrar id
		act = Actualizacion.get(id)
		act.destroy
	end

	def modificar datos, id
		act = Actualizacion.get(id)
		act.update(:contenido => datos["contenido"])
	end
end
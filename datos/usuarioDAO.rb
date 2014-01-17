require_relative "../dominio/usuario"

# Este codigo de persistencia llama al dominio
class UsuarioDAO
	def get(id)
		Usuario.get(id)
	end

	# Deserializo el json para insertarlo en el dominio
	def create(json)
		Usuario.create(json)
	end
end
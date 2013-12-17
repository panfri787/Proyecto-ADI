require_relative "../dominio/usuario"

# Este codigo de persistencia llama al dominio
class UsuarioDAO
	def get(id)
		Usuario.get(id)
	end
end
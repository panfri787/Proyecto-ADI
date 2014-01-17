require_relative "../datos/usuarioDAO"

# Encapsulo las reglas de negocio en esta capa
class UsuarioService
	# Constructor
	def initialize
		@dao = UsuarioDAO.new
	end

	def get(id)
		@dao.get id
	end

	def createUser(data)
		@dao.createUser data
	end
end
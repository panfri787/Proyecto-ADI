require_relative "../dominio/usuario"

# Este codigo de persistencia llama al dominio
class UsuarioDAO
	def get(id)
		Usuario.get(id)
	end

	# Deserializo el json para insertarlo en el dominio
	def createUser(data)
		Usuario.create(:login => data['login'], :password => data['password'],
			:nombre => data['nombre'], :apellidos => data['apellidos'])
	end
end
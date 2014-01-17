require_relative "../dominio/firma"

class FirmaDA0
	def add(data)
		firma.create.new(:comentario => data['comentario'], :nombre => data['nombre'],
			:apellidos => data['apellidos'], :email => data['email'], :publica => data['publica'])
	end
end
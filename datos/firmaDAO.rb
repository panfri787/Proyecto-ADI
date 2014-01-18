require_relative "../dominio/firma"

class FirmaDAO
	def add(data)
		Firma.create(:comentario => data['comentario'], :nombre => data['nombre'],
			:apellidos => data['apellidos'], :email => data['email'], :publica => data['publica'])
	end
end
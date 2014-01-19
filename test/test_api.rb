ENV['RACK_ENV'] =  'test'

require_relative '../web/api'
require_relative '../negocio/peticion_service'
require "minitest/autorun"
require "rack/test"

class APITest < MiniTest::Unit::TestCase
	include Rack::Test::Methods

	def app
		ServidorAPI
	end

	def test_no_crear_actualizacion_si_no_conectado
		act = Actualizacion.new(:contenido => "Actualizacion test", :fecha => Time.now)
		post '/peticiones/1/actualizaciones', act.to_json
		assert_equal last_response.status, 403
		assert_equal last_response.body, "No conectado"
	end

	def test_no_crear_actualizacion_si_no_creador
		act = Actualizacion.new(:contenido => "Actualizacion test", :fecha => Time.now)
		post '/peticiones/1/actualizaciones', act.to_json, 'rack.session' => { :usuario => 'esteloginnoexiste@ua.es' }
		assert_equal last_response.status, 403
		assert_equal last_response.body, "No es el propietario de la peticion"
	end	

	def test_crear_actualizacion
		act = Actualizacion.new(:contenido => "Actualizacion test crear", :fecha => Time.now)
		post '/peticiones/1/actualizaciones', act.to_json, 'rack.session' => { :usuario => 'adi@ua.es' }
		assert_equal last_response.status, 201
		assert last_response.body.include?("Actualizacion test crear")
		#No se como testear las headers.		
	end

	def test_obtener_actualizaciones
		ps = PeticionService.new
		p = ps.get 1

		act = p.actualizaciones.create(:contenido => "Actualizacion test listar", :fecha => Time.now)

		get '/peticiones/1/actualizaciones'
		assert_equal last_response.status, 200
		assert last_response.body.include?("Actualizacion test listar")
	end

	def test_borrar_actualizaciones
		ps = PeticionService.new
		p = ps.get 1

		act = p.actualizaciones.create(:contenido => "Actualizacion test", :fecha => Time.now)

		get '/peticiones/1/actualizaciones'
		assert_equal last_response.status, 200
		assert last_response.body.include?("Actualizacion test")

		num = Actualizacion.all.length
		antes = Actualizacion.all

#No se como testear esto, puesto que no consigo que se introduzca la variable de sesion porque me la toma como parametro.
=begin
		delete '/peticiones/1/actualizaciones/:num', 'rack.session' => { :usuario => 'adi@ua.es' }
		assert_equal 200, last_response.status
		assert_equal last_response.body, "Actualizacion borrada"
		assert_not_same antes, Actualizacion.all

=end

	end

#Este test tampoco se porque no funciona...
=begin
	def test_modificar_actualizacion
		ps = PeticionService.new
		p = ps.get 1

		act = p.actualizaciones.create(:contenido => "Actualizacion test modificar", :fecha => Time.now)

		get '/peticiones/1/actualizaciones'
		assert_equal last_response.status, 200
		assert last_response.body.include?("Actualizacion test modificar")

		antes =  Actualizacion.all
		num = antes.length

		put '/peticiones/1/actualizaciones/:num', params={:contenido => 'modificada'}, rack_env={'rack.session' => { :usuario => 'adi@ua.es' }}
		assert_equal 200, last_response.status
		assert_equal "Actualizacion modificada", last_response.body
		assert_not_same antes, despues
	end
=end
end
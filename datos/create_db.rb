#encoding: utf-8
require "data_mapper"

require_relative "../dominio/peticion"
require_relative "../dominio/usuario"
require_relative "init_datamapper"


init_datamapper()
DataMapper.auto_migrate!
usu1 = Usuario.create(:login => 'adi@ua.es', :password => 'adi', :nombre => 'Alfonso', :apellidos => 'David Iradier', :registrado => true)
usu1.peticiones.create(:titulo => 'Que se proteja al berberecho salvaje', :firmasConseguidas => 100, :destacada => true,
					   :texto => '<p>Desde tiempos inmemoriales los humanos han cazado a los berberechos sin piedad. Ya basta. Los berberechos deben ser libres</p>
					   <p>Porque los berberechos tienen derechos: Rajoy, promueve una Ley de Protección del Berberecho Salvaje</p>', :firmasObjetivo => 100000)

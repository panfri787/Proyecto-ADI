#encoding: utf-8
require "data_mapper"

require_relative "../dominio/peticion"
require_relative "../dominio/usuario"
require_relative "init_datamapper"


init_datamapper()
DataMapper.auto_migrate!
usu1 = Usuario.create(:login => 'adi@ua.es', :password => 'adi')
usu1.peticiones.create(:titulo => 'Que se proteja al berberecho salvaje', :firmasConseguidas => 100, :destacada => true)

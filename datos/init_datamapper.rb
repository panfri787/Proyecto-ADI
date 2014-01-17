require "data_mapper"
require_relative "../dominio/peticion"
require_relative "../dominio/usuario"
require_relative "../dominio/actualizacion"


def init_datamapper
  DataMapper::Logger.new($stdout, :debug)
  #usaremos sqlite en vez de mysql para simplificar
  DataMapper::setup(:default,
                    :adapter => 'sqlite3',
                    :host => 'localhost',
                    :username => '',
                    :password => '',
                    :database => 'muevete_bd.sqlite'
  )

  #reglas de inflexión para el castellano tomadas de https://gist.github.com/maxidr/838188
  #sirven para generar el plural de un modelo partiendo del singular y viceversa (peticion -> peticiones)
  DataMapper::Inflector.inflections do |inflect|
    inflect.plural /([aeiou])([A-Z]|_|$)/, '\1s\2'
    inflect.plural /([rlnd])([A-Z]|_|$)/, '\1es\2'
    inflect.plural /([aeiou])([A-Z]|_|$)([a-z]+)([rlnd])($)/, '\1s\2\3\4es\5'
    inflect.plural /([rlnd])([A-Z]|_|$)([a-z]+)([aeiou])($)/, '\1es\2\3\4s\5'
    inflect.singular /([aeiou])s([A-Z]|_|$)/, '\1\2'
    inflect.singular /([rlnd])es([A-Z]|_|$)/, '\1\2'
    inflect.singular /([aeiou])s([A-Z]|_)([a-z]+)([rlnd])es($)/, '\1\2\3\4\5'
    inflect.singular /([rlnd])es([A-Z]|_)([a-z]+)([aeiou])s($)/, '\1\2\3\4\5'
  end

 #Chequea los modelos y monta las asociaciones
  DataMapper.finalize
end


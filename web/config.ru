#Estos son los .rb donde están las 3 aplicaciones
require './servidor_plantillas'
#require './autentificacion'
#require './api'

#todas las peticiones cuya URL comience por 'muevete' irán a parar aquí
map "/muevete" do
  run ServidorPlantillas  #Nombre de la clase que implementa la parte de Mustache
end
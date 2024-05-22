# API Documentation
Reportes_Usuarios

## Microservicio de Gestión de Reportes de Usuarios ##

Reportes_usuarios es un microservicio para gestionar reportes de usuarios en una base de datos MongoDB a traves de operaciones RESTful.

## Installation

Clona este repositorio en tu maquina local:
git clone https://github.com/

Accede al directorio del proyecto:
cd Reportes_Usuarios

## Para ejecutar la API
Crear en la raíz del proyecto un entorno virtual con el comando:
`python -m virtualenv env`

`Activa` el entorno virtual accediendo hasta la carpeta env la cual se crea con el comando anterior y ejecuta el siguiente comando:
PS C:\Reportes_Usuarios\env> `.\Scripts\activate`
Deberia la ruta verse como en este ejemplo para asegurarse que el entorno virtual esta activo:
`(env)` PS C:\Reportes_Usuarios\env>

Instala las dependencias necesarias utilizando pip:
pip install -r requirements.txt .

## Crea un archivo `.env` en el directorio raíz del proyecto para las variables de entorno, allí se define la conexión a MongoDB
MONGODB_HOST=localhost
MONGODB_PORT=27018
MONGODB_DATABASE=reportes_usuarios
MONGODB_USERNAME=
MONGODB_PASSWORD=


## Retorna a la carpeta raíz del proyecto e inicia el servidor con:
(env) PS C:\Reportes_Usuarios> uvicorn main:app --reload

Para acceder a la documentacion de la API, copia la url y pegala en la web:
http://127.0.0.1:5000/docs


### Endpoints

Para `crear un nuevo reporte` de usuario, realiza una solicitud `POST` a la siguiente URL:
"http://localhost:5002/reportes/"
El objeto json a pasar:
{
  "id": "1",
  "description": "Reporte de prueba",
  "username": "usuario1",
  "report_status": "pendiente"
}

Para `obtener todos los reportes`, realiza una solicitud `GET` a la siguiente URL:
http://localhost:5002/reportes


Para `buscar un reporte por fecha específica`, realiza una solicitud `GET` con la fecha en el formato YYYY-MM-DD a la siguiente URL, se envia solamente año,mes,dia, este solicitud devuelve fecha junto con la hora de creacion:
http://localhost:5002/reportes/buscar_por_fecha?report_date=2023-01-15


Para `buscar un reporte por ID`, realiza una solicitud `GET` a la siguiente URL, reemplazando {id} con el ID del reporte:
http://localhost:5002/reportes/buscar_por_id?id=1


Para `actualizar un reporte por su ID`, realiza una solicitud `PUT` con el ID del reporte a la siguiente URL, y proporciona los datos actualizados en el cuerpo de la solicitud, no se envia `report_status`, ya que este se genera de manera automatica con la fecha de actualizacion:
http://localhost:5002/reportes/actualizar_por_id?id=1
{
  "id": "1",
  "description": "Reporte de prueba",
  "username": "usuario1",
  "report_status": "completado"
}


Para `eliminar un reporte por su ID`, realiza una solicitud `DELETE` a la siguiente URL, reemplazando {id} con el ID del reporte a eliminar:
http://localhost:5002/reportes/eliminar_reporte_por_id?id=1


# Modelo de datos
  id: str
  report_date: datetime = datetime.now()
  description: str
  username: str
  report_status: str

`id` Campo de `tipo str`, representa el identificador unico del reporte de usuario, este campo identifica el reporte de manera unica en la base de datos.

`report_date` Campo de `tipo datetime`, especifica la fecha y hora en la que se crea el reporte, por defecto guarda la fecha y la hora en que se crea el reporte `datetime.now()`.

`description` Campo de `tipo str`, Contiene la descripcion o detalles del reporte de usuario, en este campo se proporciona informacion detallada de la situacion a reportar.

`username` Campo de `tipo str`, contiene el campo para registrar el nombre de usuario creador del reporte.

`report_status` Campo de `tipo str`, indica el estado actual del reporte, se validara mediante dos opciones, `pendiente o completado`.


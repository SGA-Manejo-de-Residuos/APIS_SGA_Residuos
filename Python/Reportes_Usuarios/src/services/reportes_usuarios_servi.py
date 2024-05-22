import os
from pymongo.errors import PyMongoError
from datetime import datetime, date
from src.models.reportes_usuarios_model import ReporteUsuario
from src.database.mongo_db import MongoConnetionManager
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from pymongo import MongoClient


class ReporteUsuariosService:
    _database = None
    
    @staticmethod
    def get_database_instance():
        if not ReporteUsuariosService._database:
            db_host = os.getenv("MONGODB_HOST")
            db_port = int(os.getenv("MONGODB_PORT"))
            db_name = os.getenv("MONGODB_DATABASE")
            db_username = os.getenv("MONGODB_USERNAME")
            db_password = os.getenv("MONGODB_PASSWORD")
            
            ReporteUsuariosService._database = MongoConnetionManager(host=db_host, port=db_port, database_name=db_name, username=db_username, password=db_password)
            ReporteUsuariosService._database.connect()
        return ReporteUsuariosService._database
    
    
    @staticmethod
    def registrar_reporte(reporte_usuario: ReporteUsuario):
        try:
            database = ReporteUsuariosService.get_database_instance()
            coleccionReportes = "reportes"
            if not database.existe_id_reporte(coleccionReportes, reporte_usuario.id):
                database.insert_document(coleccionReportes, reporte_usuario.model_dump())
                return {"Mensaje": f"Registro exitoso!!"}, 201  #Mostrado en postman al crear
            else:
                raise HTTPException(status_code=400, detail="Ya existe un reporte con ese ID.") 
        except Exception as e:
            print({"Error": f"Error al registrar el nuevo reporte: {e}"}), 400
     
    
    @staticmethod
    def existe_id_reporte_ser(collection_name, id):
        try:
            database = ReporteUsuariosService.get_database_instance()
            collection = database.db[collection_name]
            result = collection.find_one({"id": id})
            return result is not None
        except PyMongoError as e:
            print(f"Error al intentar verificar la existencia del ID: {e}")
            return False
  
            
    def obtener_todos_reportes(self):
        try:
            database = ReporteUsuariosService.get_database_instance()
            coleccionReportes = "reportes"
            return database.get_all_documents(coleccionReportes)
        except HTTPException as e:
            print({"Error": f"Error al obtener los reportes: {e}"}), 400
            
            
    @staticmethod        
    def buscar_reporte_por_fecha(report_date: date):
            fecha_formateada = report_date.strftime("%Y-%m-%d")
            database = ReporteUsuariosService.get_database_instance()#llama al metodo statico "get_data..", para obtener una instancia de la db
            coleccionReportes = "reportes"#Esta variable nos guarda la consulta a la coleccion buscada
            resultado = database.buscar_reporte_por_fecha(coleccionReportes, fecha_formateada)
            return resultado
        
            
    @staticmethod
    def buscar_reporte_por_id(id: str):
        try:
            database = ReporteUsuariosService.get_database_instance()
            coleccionReportes = "reportes"
            resultado = database.buscar_reporte_por_id(coleccionReportes, id)
            return resultado
        except HTTPException as e:
            raise HTTPException(status_code=400, detail=f"Error al obtener los reportes por id: {e}")
        
        
    @staticmethod
    def actualizar_reporte_por_id(id: str, reporte_usuario: ReporteUsuario):
        try:
            database = ReporteUsuariosService.get_database_instance()
            coleccionReportes = "reportes"
            if database.existe_id_reporte(coleccionReportes, id):
                resultado = database.actualizar_reporte_por_id(coleccionReportes, id, reporte_usuario.model_dump())#viene de database
                return {"Mensaje": f"Reporte con el ID {id} actualizado correctamente"}, 200
            else:
                raise HTTPException(status_code=400, detail=f"No existe un reporte con ese ID: {id}")
        except HTTPException as e:
            raise HTTPException(status_code=400, detail=f"Error al intentar actualizar el reporte por id: {e}")
        
        
    @staticmethod
    def eliminar_reporte_por_id(id: str):
        try:
            database = ReporteUsuariosService.get_database_instance()
            coleccionReportes = "reportes"
            if not database.existe_id_reporte(coleccionReportes, id):
                raise HTTPException(status_code=400, detail=f"No existe un reporte con ese ID serv: {id}")
            return database.eliminar_reporte_por_id(coleccionReportes, id)
        except HTTPException as e:
            raise HTTPException(status_code=400, detail=f"Error al intentar eliminar el reporte por id servi: {e}")
        

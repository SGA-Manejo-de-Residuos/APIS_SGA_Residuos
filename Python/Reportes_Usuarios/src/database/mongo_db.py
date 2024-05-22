import pymongo, re
from bson import ObjectId
from fastapi import HTTPException
from datetime import datetime, timedelta



class MongoConnetionManager:
    _intance = None
    
    def __new__(cls, host, port, database_name, username, password):
        if not cls._intance:
            cls._intance = super(MongoConnetionManager, cls).__new__(cls)
            cls._intance.client = None
            cls._intance.host = host
            cls._intance.port = port
            cls._intance.username = username
            cls._intance.password = password
            cls._intance.database_name = database_name
            cls._intance.connect()
        return cls._intance
    
    def connect(self):
        try:
            if not self.client:
                self.client = pymongo.MongoClient(host= self.host, port=self.port, username=self.username, password=self.password)
                print("Connecting to mongoDB {self.host}:{self.port}")
                self.db = self.client[self.database_name]
            print("conexión exitosa!!")
        except pymongo.errors.ServerSelectionTimeoutError as e:
            print("error al conectar")
            
            
    def close_connection(self):
        if self.client:
            self.client.close()
            print("conexión cerrada!!")
            

    def existe_id_reporte(self, collection_name, id):
        try:
            collection = self.db[collection_name]
            result = collection.find_one({"id": id})
            return result is not None #Retorna true si se encuentra un documento con el ID INGRESADO, False si no encuentra
        except Exception as e:
            print("Error al verificar la existencia del ID de su reporte")
            return False
    
        
          
    def insert_document(self, collection_name, document):
        try:
            collection = self.db[collection_name]
            result = collection.insert_one(document)
            print("Document inserted successfully:", result.inserted_id)
        except Exception as e:
            print("Error inserting document:", e)

            
    def get_all_documents(self, collection_name):
        try:
            collection = self.db[collection_name]#se obtiene coleccion especifica
            result = list(collection.find())#todos los documentos de la db se guardan en result
            documents = {}#Diccionario vacio para almacenar los documentos recuperados de la db
            for idx, doc in enumerate(result):#Enumera todos los objetos de la db
                document_dict = {}
                for key, value in doc.items():
                    if isinstance(value, ObjectId):
                        document_dict[key] = str(value)
                    else:
                        document_dict[key] = value
                documents[idx] = document_dict
            return documents
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error al obtener los reportes: {e}")
        
        
    def buscar_reporte_por_fecha(self, collection_name, report_date):
        try:
            fecha = datetime.strptime(report_date, "%Y-%m-%d")
        except ValueError as e:
            raise HTTPException(status_code=400, detail="Formato de fecha incorrecto. Use el formato YYYY-MM-DD")
        fecha_inicio = fecha.replace(hour=0, minute=0, second=0)
        fecha_fin = fecha.replace(hour=23, minute=59, second=59)
        collection = self.db[collection_name]
        result = list(collection.find({"report_date": {"$gte": fecha_inicio,"$lte": fecha_fin}}))
        if not result:
            raise HTTPException(status_code=404, detail="Error: No se encuentra reporte con esa fecha.")
        processed_result = [
            {key: str(value) if isinstance(value, ObjectId) else value for key, value in doc.items()}
            for doc in result
        ]
        return processed_result
    
    
    
    def buscar_reporte_por_id(self, collection_name, id):
        collection = self.db[collection_name]
        result = list(collection.find({"id": id}))
        if not result:
            return "Error: No se encuentra reporte con ese ID"
        reportes = []
        for doc in result:
            document_dict = {}
            for key, value in doc.items():
                if isinstance(value, ObjectId):
                    document_dict[key] = str(value)
                else:
                    document_dict[key] = value
            reportes.append(document_dict)
        return reportes
      
   
    def actualizar_reporte_por_id(self, collection_name, id, document):
        try:
            collection = self.db[collection_name]
            result = list(collection.find({"id": id}))
            if not result:
                return "Error: No existe reporte con ese ID"
            else:
                result = collection.update_one({"id": id}, {"$set": document})
            return {"Mensaje": f"Reporte con el id {id} actualizado correctamente"}, 200
        except Exception as e:
            print("Error al intentar actualizar el reporte:", e)
        
        
    def eliminar_reporte_por_id(self, collection_name, id):
        try:
            collection = self.db[collection_name]
            result = list(collection.find({"id": id}))
            if not result:
                return "Error: No existe reporte con ese ID"
            result = collection.delete_one({"id": id})
            return {"Mensaje": f"Reporte con el id {id} eliminado correctamente"}, 200
        except Exception as e:
            print("Error al intentar eliminar el reporte mong:", e)
            

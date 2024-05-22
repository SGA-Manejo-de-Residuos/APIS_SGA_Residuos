from fastapi import APIRouter, HTTPException
from src.models.reportes_usuarios_model import ReporteUsuario
from src.services.reportes_usuarios_servi import ReporteUsuariosService
from datetime import datetime, date
from fastapi import Query, Depends


servicio = ReporteUsuariosService()
router = APIRouter(prefix="/reportes")

@router.post("/")
def create_reporte_usuario(reporte_usuario: ReporteUsuario):
    try:
        if ReporteUsuariosService.existe_id_reporte_ser("reportes", reporte_usuario.id):
            raise HTTPException(status_code=400, detail="Ya existe un reporte con ese ID...")
        if not reporte_usuario.report_date:
            reporte_usuario.report_date = datetime.now()
        if not all([reporte_usuario.description, reporte_usuario.username, reporte_usuario.report_status]):
            raise HTTPException(status_code=400, detail="Todos los campos son requeridos para crear el reporte.")
        if ReporteUsuariosService.registrar_reporte(reporte_usuario):
            return {"Mensaje": "Registro exitoso!!"}, 201
        else:
            raise HTTPException(status=500, detail="Error al registrar el reporte.")
    except ValueError:
         raise HTTPException(status_code=400, detail="Formato de fecha incorrecto")
        
    
@router.get("/")
def obtener_todos_reportes():
    try:
        return servicio.obtener_todos_reportes()
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=f"Error al obtener los reportes: {e}")
    
@router.get("/buscar_por_fecha")
def buscar_reporte_por_fecha(report_date: str = Query(...)):
    try:
        fecha = datetime.strptime(report_date, "%Y-%m-%d").date()
    except ValueError:
            raise HTTPException(status_code=400, detail="Formato de fecha incorrecto... Use el formato YYYY-MM-DD.")   
    return servicio.buscar_reporte_por_fecha(fecha)

    
@router.get("/buscar_por_id")
def buscar_reporte_por_id(id: str):
    try:
        return servicio.buscar_reporte_por_id(id)#Ruta trae del servicio
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=f"Error al obtener los reportes por id: {e}")
    
    
@router.put("/actualizar_por_id")
def actualizar_reporte_por_id(id: str, reporte_usuario: ReporteUsuario):
        if id != reporte_usuario.id:
            raise HTTPException(status_code=400, detail="No se permite modificar el ID del reporte.")
        if ReporteUsuariosService.existe_id_reporte_ser("reportes", reporte_usuario.id):
            reporte_usuario.report_date = datetime.now()
        else:
            raise HTTPException(status_code=400, detail="No existe un reporte con ese ID..")
        if not all([reporte_usuario.description, reporte_usuario.username, reporte_usuario.report_status]):
            raise HTTPException(status_code=400, detail="Todos los campos son requeridos para actualizar el reporte.")
        try:
            if ReporteUsuariosService.actualizar_reporte_por_id(id, reporte_usuario):
                return {"Mensaje": "Actualización exitosa"},200
        except HTTPException as e:
            raise HTTPException(status_code=400, detail=f"Error al intentar actualizar el reporte por id: {e}")
        
    
@router.delete("/eliminar_reporte_por_id")
def eliminar_reporte_por_id(id: str):
    try:
        if not ReporteUsuariosService.existe_id_reporte_ser("reportes", id):
            raise HTTPException(status_code=400, detail="Reporte a eliminar no existe..")
        else:
            return servicio.eliminar_reporte_por_id(id)#Ruta trae del servicio
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al eliminar el reporte por id: {e}")

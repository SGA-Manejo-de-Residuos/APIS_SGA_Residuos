from pydantic import BaseModel
from datetime import datetime

class ReporteUsuario(BaseModel):
    id: str
    report_date: datetime = datetime.now()
    description: str
    username: str
    report_status: str
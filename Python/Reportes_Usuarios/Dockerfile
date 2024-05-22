#Indica imagen de version de python que requiere usar
FROM python:3.11-slim-buster

#Establecer directorio de trabajo
WORKDIR /REPORTES_USUARIOS

COPY requirements.txt .

RUN pip install --upgrade pip

#Se le dice a docker que instale y descargue dependencias
RUN pip install --no-cache-dir -r requirements.txt

#Copia los archivos del directorio actual
COPY . .

#Expone el puerto para que ingrese peticiones por ese puerto
EXPOSE 5000

#Se le dice que ejecute este comando apenas inicie el contenedor
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]


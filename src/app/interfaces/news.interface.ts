export interface INews {
  id_noticia?: number;
  txt_es?: string;
  descripcion_es?: string;
  fecha_creado?: string;
  fecha_actualizado?: string;
  activo?: number;
  image?: INewsImg;
}


export interface INewsImg {
  id_imagen_noticia?: number;
  id_noticia?: number;
  imagen?: string;
  ruta?: string;
  tipo_base64?: string;
  orden?: number;
  txt_es?: string;
  activo?: number;
}
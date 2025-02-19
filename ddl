
-- Usar la base de datos
\c meg_ctrl_cambios;

-- Crear la tabla ctrl_usuarios
CREATE TABLE ctrl_usuarios (
    usr_id SERIAL PRIMARY KEY,
    usr_nombre TEXT NOT NULL,
    usr_ced TEXT NOT NULL,
    usr_lgn_nom TEXT NOT NULL,
    usr_lgn_git TEXT NOT NULL
);

CREATE TABLE ctrl_sistemas (
  sis_id smallint primary key not null,
  sis_nombre character varying(100) not null,
  sis_url character varying(255) not null,
  sis_fecha_implementacion date,
  sis_version_actual character varying(20),
  sis_logo character varying(255),
  sis_descripcion character varying(255),
  sis_vigencia bit(1) not null,
  sis_tipo smallint,
  sis_fecha_produccion timestamp without time zone,
  sis_fecha_actualizacion timestamp without time zone
);

-- Crear la tabla ctrl_requerimientos
CREATE TABLE ctrl_requerimientos (
    req_id SERIAL PRIMARY KEY,
    req_justf TEXT NOT NULL,
    req_detalle TEXT NOT NULL,
    req_link_git TEXT NOT NULL,
    req_fechaReg DATE NOT NULL,
    req_fechaHora_reg TIMESTAMP NOT NULL,
    req_fechaManual DATE NOT NULL,
    req_tck_mesa INTEGER,
    req_programador INTEGER NOT NULL,
    req_solicitante INTEGER NOT NULL,
    req_sistema INTEGER NOT NULL,
    req_qa INTEGER NOT NULL,
    FOREIGN KEY (req_programador) REFERENCES ctrl_usuarios(usr_id),
    FOREIGN KEY (req_solicitante) REFERENCES ctrl_usuarios(usr_id),
    FOREIGN KEY (req_qa) REFERENCES ctrl_usuarios(usr_id),
    FOREIGN KEY (req_sistema) REFERENCES ctrl_sistemas(sis_id)
);

-- Crear la tabla ctrl_bases
CREATE TABLE ctrl_bases (
    base_id SERIAL PRIMARY KEY,
    base_nom TEXT NOT NULL
);

-- Crear la tabla req_obj_base
CREATE TABLE ctrl_obj_base (
    obj_base_id SERIAL PRIMARY KEY,
    req_id INTEGER NOT NULL,
    base_id INTEGER NOT NULL,
    sp TEXT NOT NULL,
    FOREIGN KEY (req_id) REFERENCES ctrl_requerimientos(req_id),
    FOREIGN KEY (base_id) REFERENCES ctrl_bases(base_id)
);
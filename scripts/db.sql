drop table if exists titulo_tipo;
drop table if exists cliente;
drop table if exists parceiro;
drop table if exists usuario;
drop table if exists titulo;

create table if not exists titulo_tipo(
       titulo_tipo_id integer primary key,
       titulo_tipo_nome varchar(255)
);

create table if not exists cliente(
       cliente_id integer primary key,
       cliente_nome varchar(255),
       cliente_cpf varchar(255)
);

create table if not exists parceiro(
       parceiro_id integer primary key,
       parceiro_cnpj varchar(20),
       parceiro_nome_fantasia varchar(255),
       parceiro_razao_social varchar(255)
);

create table if not exists usuario(
       usuario_id integer primary key,
       usuario_nome varchar(255),
       usuario_email varchar(255) unique not null,
       usuario_senha varchar(255) not null,
       usuario_status integer,
       usuario_parceiro_id integer,
       foreign key (usuario_parceiro_id) references parceiro (parceiro_id) on update cascade on delete cascade
);

create table if not exists titulo(
       titulo_id integer primary key,
       titulo_valor double not null,
       titulo_data_pagamento date not null,
       titulo_identificador integer not null,
       titulo_data_emissao date,
       titulo_situacao integer,
       titulo_tipo_id integer not null,
       titulo_cliente_id integer not null,
       titulo_parceiro_id integer not null,
       foreign key (titulo_tipo_id) references titulo_tipo (titulo_tipo_id) on update cascade on delete cascade,
       foreign key (titulo_cliente_id) references cliente (cliente_id) on update cascade on delete cascade,
       foreign key (titulo_parceiro_id) references parceiro (parceiro_id) on update cascade on delete cascade
);

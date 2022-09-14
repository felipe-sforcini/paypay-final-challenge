DROP TABLE IF EXISTS  usuarios;

CREATE TABLE usuarios(
	id serial primary key,
  	nome text not null,
  	email text not null , 
  	senha text not null, 
  	cpf varchar(11), 
  	telefone varchar(20)
);	

DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes(
	id serial primary key,
	usuario_id integer not null,
  	nome text not null, 
  	email text not null,
  	cpf varchar(11) not null UNIQUE,
  	telefone varchar(20) UNIQUE,
	logradouro text, 
  	complemento text,
  	cep varchar(10),
  	bairro text,
  	cidade text, 
  	estado text,
  	status boolean default true,
	foreign key(usuario_id) references usuarios(id)
);


DROP TABLE IF EXISTS cobrancas;

CREATE TABLE cobrancas(
	id serial primary key,
  	cliente_id int not null,
  	nome text not null, 
  	descricao text not null,
  	vencimento date not null, 
  	valor int not null, 
  	status text not null,
  	foreign key(cliente_id) references clientes(id)
);


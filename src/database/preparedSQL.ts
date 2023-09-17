



export const CREATE_TABLE_CLIENTS = () => {
    
    return `CREATE TABLE IF NOT EXISTS clients (
	id INT(11) NOT NULL AUTO_INCREMENT,
	uid VARCHAR(100) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	from VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	date VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	telegram_id VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	telegram_name VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	telegram_nick_name VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (id) USING BTREE
)
COMMENT='Общая информация о клиенте'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB ;`
}


export const CREATE_TABLE_QUIZE = () => {

    return `CREATE TABLE IF NOT EXISTS quize (
	id INT(11) NOT NULL AUTO_INCREMENT,
	clients_id INT(11) NOT NULL DEFAULT '0',
	name VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	email VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	phone VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	color_fence_block VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	height_fence DOUBLE NOT NULL DEFAULT '0',
	total_lenght_fence DOUBLE NOT NULL DEFAULT '0',
	lenght_between_colls DOUBLE NOT NULL DEFAULT '0',
	how_many_wickets INT(11) NOT NULL DEFAULT '0',
	width_wicket DOUBLE NOT NULL DEFAULT '0',
	width_second_wicket DOUBLE NOT NULL DEFAULT '0',
	how_many_gates INT(11) NOT NULL DEFAULT '0',
	width_gates DOUBLE NOT NULL DEFAULT '0',
	width_second_gates DOUBLE NOT NULL DEFAULT '0',
	_ym_uid VARCHAR(150) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	roistat_first_visit VARCHAR(150) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	_fbp VARCHAR(150) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	_fbc VARCHAR(150) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	viber VARCHAR(150) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	fbclid VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	telegram VARCHAR(150) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	dt_created VARCHAR(60) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	href VARCHAR(200) NOT NULL DEFAULT '' COLLATE 'utf8mb4_icelandic_ci',
	userAgent VARCHAR(200) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	lng VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	currency VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	notify VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	timezone VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	lang VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	referer VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	ip VARCHAR(150) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	city VARCHAR(100) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	country VARCHAR(100) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	_ga VARCHAR(100) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	fingerprint VARCHAR(100) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (id) USING BTREE,
	INDEX clients_id (clients_id) USING BTREE,
	CONSTRAINT FK_quize_clients FOREIGN KEY (clients_id) REFERENCES clients (id) ON UPDATE CASCADE ON DELETE CASCADE
)
COMMENT='Квиз с этапами'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB ;`
} 


CREATE SCHEMA IF NOT EXISTS `nomad_schema`;
DROP USER IF EXISTS 'nomad_app'@'%';
CREATE USER 'nomad_app'@'%' IDENTIFIED WITH mysql_native_password BY 'Aa123456';
GRANT ALL ON nomad_schema.* TO 'nomad_app'@'%';
FLUSH PRIVILEGES;

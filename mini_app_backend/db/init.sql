CREATE DATABASE IF NOT EXISTS mini_app;
use mini_app;

CREATE TABLE IF NOT EXISTS app_user
(
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    username         VARCHAR(255) NOT NULL UNIQUE,
    password         VARCHAR(255) NOT NULL,
    telephone        VARCHAR(255) NOT NULL UNIQUE,
    token            VARCHAR(255) UNIQUE,
    token_expiration TIMESTAMP,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) character set utf8mb4
  collate utf8mb4_unicode_ci;

insert into app_user (id, username, password, telephone)
values (1, 'david', '123456', '15300000000');

CREATE TABLE `appointment`
(
    `id`           BIGINT       NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `user_id`      BIGINT       NOT NULL COMMENT 'User ID',
    `service_name` VARCHAR(100) NOT NULL COMMENT 'Service name',
    `appoint_date` DATE         NOT NULL COMMENT 'Appointment date',
    `time_slot`    VARCHAR(20)  NOT NULL COMMENT 'Time slot (e.g. 09:00-10:00)',
    `created_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Create time',
    `updated_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP COMMENT 'Update time',

    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_user_date_slot` (`user_id`,`service_name`, `appoint_date`, `time_slot`),
    KEY `idx_user_id` (`user_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='Appointment table';

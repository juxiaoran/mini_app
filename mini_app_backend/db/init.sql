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
) character set utf8mb4 collate utf8mb4_unicode_ci;

insert into app_user (username, password, telephone)
values ('david', '123456', '15300000000');
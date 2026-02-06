plugins {
    id("java")
    id("org.springframework.boot") version "3.2.2" apply true
    id("io.spring.dependency-management") version "1.1.4" apply true
}

group = "com.mini_app"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")

    implementation("org.springframework.boot:spring-boot-starter-validation")

    implementation("com.baomidou:mybatis-plus-spring-boot3-starter:3.5.6")

    runtimeOnly("com.mysql:mysql-connector-j:8.3.0")

    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.test {
    useJUnitPlatform()
}
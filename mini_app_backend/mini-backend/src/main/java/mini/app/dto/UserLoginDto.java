package mini.app.dto;

import lombok.Data;

/**
 * @author David
 * @date 2026/2/6 08:58
 * @description: User Login DTO
 */
@Data
public class UserLoginDto {
    private String username;

    private String telephone;

    private String password;

    private String verificationCode;
}

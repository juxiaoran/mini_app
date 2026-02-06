package mini.app.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author David
 * @date 2026/2/6 09:29
 * @description: login response
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResp {
    private String token;

    private long expire;
}

package mini.app.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.time.LocalDateTime;
import lombok.Data;

/**
 * @author David
 * @date 2026/2/6 09:05
 * @description:
 */
@Data
@TableName("app_user")
public class AppUser {
    @TableId(type = IdType.AUTO)
    private Long id;

    private String username;

    private String telephone;

    private String password;

    private String token;

    private LocalDateTime tokenExpiration;
}

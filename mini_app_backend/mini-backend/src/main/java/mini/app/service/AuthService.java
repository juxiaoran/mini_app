package mini.app.service;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mini.app.common.BaseResp;
import mini.app.dto.UserLoginDto;
import mini.app.entity.AppUser;
import mini.app.mapper.AppUserMapper;
import mini.app.util.JwtUtil;
import mini.app.vo.LoginResp;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author David
 * @date 2026/2/6 09:01
 * @description: Auth service
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final AppUserMapper appUserMapper;

    @Transactional(rollbackFor = Exception.class)
    public BaseResp<LoginResp> login(UserLoginDto loginDto) {
        var queryUser = Wrappers.<AppUser>lambdaQuery()
                .eq(AppUser::getTelephone, loginDto.getTelephone());

        var user = appUserMapper.selectOne(queryUser);
        if (user == null) {
            log.error("user not found, telephone: {}", loginDto.getUsername());
            return BaseResp.error(404, "Login failed, try again later");
        }

        if (!"123456".equals(loginDto.getVerificationCode())) {
            log.error("verification code not match, telephone: {}", loginDto.getUsername());
            return BaseResp.error(404, "Login failed, try again later");
        }

        var token = JwtUtil.generateToken(user.getId());

        return BaseResp.success(new LoginResp(token, JwtUtil.EXPIRATION_MS));
    }
}

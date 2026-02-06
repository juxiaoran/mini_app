package mini.app.service;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mini.app.dto.UserLoginDto;
import mini.app.entity.AppUser;
import mini.app.mapper.AppUserMapper;
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
    public LoginResp login(UserLoginDto loginDto) {
        var queryUser = Wrappers.<AppUser>lambdaQuery()
                .eq(AppUser::getTelephone, loginDto.getTelephone());

        var user = appUserMapper.selectOne(queryUser);
        if (user == null) {
            log.error("user not found, telephone: {}", loginDto.getUsername());
            return null;
        }

        if (!"123456".equals(loginDto.getVerificationCode())) {
            log.error("verification code not match, telephone: {}", loginDto.getUsername());
            return null;
        }

        var token = "Bearer " + UUID.randomUUID().toString();
        var expireTime = LocalDateTime.now().plusDays(7);

        user.setToken(token);
        user.setTokenExpiration(expireTime);
        appUserMapper.updateById(user);

        return new LoginResp(token, expireTime.toInstant(java.time.ZoneOffset.UTC).toEpochMilli());
    }
}

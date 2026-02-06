package mini.app.controller.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mini.app.common.BaseResp;
import mini.app.dto.UserLoginDto;
import mini.app.service.AuthService;
import mini.app.vo.LoginResp;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author David
 * @date 2026/2/5 18:02
 * @description: Auth Controller
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    /**
     * login
     *
     * @return if success
     */
    @PostMapping("/login")
    public BaseResp<LoginResp> login(@RequestBody UserLoginDto loginDto) {
        return authService.login(loginDto);
    }
}

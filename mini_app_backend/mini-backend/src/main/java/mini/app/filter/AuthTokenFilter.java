package mini.app.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import mini.app.common.BaseResp;
import mini.app.util.JwtUtil;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * @author David
 * @date 2026/2/6 15:50
 * @description:
 */
@Component
@RequiredArgsConstructor
public class AuthTokenFilter extends OncePerRequestFilter {
    public final static ThreadLocal<String> USERNAME = new ThreadLocal<>();

    private final ObjectMapper objectMapper;

    private static final String[] WHITE_LIST = {"/api/v1/auth/login"};

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var requestUri = request.getRequestURI();
        if (isWhiteList(requestUri)) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = request.getHeader("Authorization");
        if (!StringUtils.hasText(token)) {
            response.getWriter().write(objectMapper.writeValueAsString(BaseResp.error(401, "Unauthorized")));
            return;
        }

        try {
            Long userId = JwtUtil.parseToken(token);
            USERNAME.set(userId.toString());
            filterChain.doFilter(request, response);
        } catch (JwtException e) {
            response.getWriter().write(objectMapper.writeValueAsString(BaseResp.error(401, "Unauthorized")));
            return;
        } finally {
            USERNAME.remove();
        }
    }

    private boolean isWhiteList(String requestUri) {
        for (String whiteUri : WHITE_LIST) {
            if (requestUri.contains(whiteUri)) {
                return true;
            }
        }
        return false;
    }
}

package mini.app.common;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author David
 * @date 2026/2/5 18:04
 * @description:
 */
@Data
@AllArgsConstructor
public class BaseResp<T> {
    private int code;

    private String message;

    private T data;

    public static <T> BaseResp<T> success(T data) {
        return new BaseResp<>(200, "success", data);
    }

    public static <T> BaseResp<T> error(int code, String msg) {
        return new BaseResp<>(code, msg, null);
    }
}

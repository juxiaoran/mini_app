package mini.app.queryfiler;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.Data;

/**
 * @author David
 * @date 2026/2/7 14:09
 * @description: base filter for query
 */
@Data
public class BaseFilter {
    private Integer page = 1;
    private Integer pageSize = 10;

    public <T> Page<T> page() {
        return new Page<>(this.page, this.pageSize);
    }
}

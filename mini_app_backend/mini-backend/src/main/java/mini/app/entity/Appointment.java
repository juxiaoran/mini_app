package mini.app.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import lombok.Data;

/**
 * @author David
 * @date 2026/2/7 00:52
 * @description:
 */
@Data
@TableName("appointment")
public class Appointment {
    @TableId
    private Long id;

    private Long userId;

    private String serviceName;

    private LocalDate appointDate;

    private LocalTime timeSlot;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

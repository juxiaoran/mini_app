package mini.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Data;

/**
 * @author David
 * @date 2026/2/6 17:02
 * @description: Appointment DTO
 */
@Data
public class AppointmentDto {
    private String serviceName;

    private LocalDate appointDate;

    private LocalTime timeSlot;
}

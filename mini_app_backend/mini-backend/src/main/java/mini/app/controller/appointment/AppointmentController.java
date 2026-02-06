package mini.app.controller.appointment;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mini.app.common.BaseResp;
import mini.app.dto.AppointmentDto;
import mini.app.service.AppointmentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author David
 * @date 2026/2/6 17:00
 * @description:
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/appointment")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping("/create")
    public BaseResp<?> createAppointment(@RequestBody AppointmentDto appointmentDto) {
        appointmentService.createAppointment(appointmentDto);
        return BaseResp.success(appointmentDto);
    }
}

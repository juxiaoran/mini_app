package mini.app.service;

import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import mini.app.dto.AppointmentDto;
import mini.app.entity.Appointment;
import mini.app.filter.AuthTokenFilter;
import mini.app.mapper.AppointmentMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author David
 * @date 2026/2/7 00:54
 * @description:
 */
@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentMapper appointmentMapper;

    @Transactional(rollbackFor = Exception.class)
    public void createAppointment(AppointmentDto appointmentDto) {
        Appointment appointment = new Appointment();
        appointment.setUserId(Long.parseLong(AuthTokenFilter.USERNAME.get()));
        appointment.setServiceName(appointmentDto.getServiceName());
        appointment.setAppointDate(appointmentDto.getAppointmentDate());
        appointment.setTimeSlot(appointmentDto.getTimeSlot());
        appointment.setCreatedAt(LocalDateTime.now());
        appointment.setUpdatedAt(LocalDateTime.now());
        appointmentMapper.save(appointment);
    }
}

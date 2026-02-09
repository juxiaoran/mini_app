package mini.app.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import mini.app.dto.AppointmentDto;
import mini.app.entity.Appointment;
import mini.app.filter.AuthTokenFilter;
import mini.app.mapper.AppointmentMapper;
import mini.app.queryfiler.BaseFilter;
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

    public Page<Appointment> pageAppointments(BaseFilter baseFilter) {
        var userId = AuthTokenFilter.USERNAME.get();
        var query = new QueryWrapper<Appointment>();
        query.lambda().eq(Appointment::getUserId, userId)
                .orderByDesc(Appointment::getUpdatedAt);
        return appointmentMapper.selectPage(baseFilter.page(), query);
    }

    @Transactional(rollbackFor = Exception.class)
    public void createAppointment(AppointmentDto appointmentDto) {
        Appointment appointment = new Appointment();
        appointment.setUserId(AuthTokenFilter.USERNAME.get());
        appointment.setServiceName(appointmentDto.getServiceName());
        appointment.setAppointDate(appointmentDto.getAppointDate());
        appointment.setTimeSlot(appointmentDto.getTimeSlot());
        appointment.setCreatedAt(LocalDateTime.now());
        appointment.setUpdatedAt(LocalDateTime.now());
        appointmentMapper.save(appointment);
    }
}

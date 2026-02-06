package mini.app.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import mini.app.entity.Appointment;

/**
 * @author David
 * @date 2026/2/7 00:55
 * @description:
 */
public interface AppointmentMapper extends BaseMapper<Appointment> {
    int save(Appointment appointment);
}

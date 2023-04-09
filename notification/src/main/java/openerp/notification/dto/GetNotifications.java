package openerp.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Getter
@Setter
@AllArgsConstructor
public class GetNotifications {

    private Page<NotificationDTO> notifications;

    private long numUnRead;
}

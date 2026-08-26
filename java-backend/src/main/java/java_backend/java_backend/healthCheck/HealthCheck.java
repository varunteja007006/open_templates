package java_backend.java_backend.healthCheck;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthCheck {

    @GetMapping("/api/health-check")
    public Map<String, Object> healthCheck() {
        Map<String, Object> map = new HashMap<>();
        map.put("status", "UP");
        map.put("timestamp", new Date());
        map.put("message", "Java Backend with Gradle is running successfully! ✅");
        return map;
    }
}

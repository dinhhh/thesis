package openerp.coderunnerservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@EnableAsync
@EnableCaching
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
@SpringBootApplication
public class CodeRunnerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CodeRunnerServiceApplication.class, args);
    }

}

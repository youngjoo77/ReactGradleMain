package com.react.test.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.react.test.jwt.JwtAccessDeniedHandler;
import com.react.test.jwt.JwtAuthenticationEntryPoint;
import com.react.test.jwt.TokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig implements WebMvcConfigurer{
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
    	// request로부터 받은 비밀번호를 암호화
        return new BCryptPasswordEncoder();
    }
    
    /*
	 * 개발환경에서의 크로스 도메인 이슈 해결을 위한 코드. 운영 배포 시 addCorsMappings 내용 주석처리
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) { 
		registry.addMapping("/api/**").allowCredentials(true).allowedOrigins("http://localhost:3000");
		WebMvcConfigurer.super.addCorsMappings(registry);
	}

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.httpBasic().disable() // http 사용금지
        http.csrf().disable() // react 에서 token을 localstorage에 저장 하기 위한 설정
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
       
        .and().exceptionHandling()
        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
        .accessDeniedHandler(jwtAccessDeniedHandler)
        
        .and().authorizeRequests() 
        .antMatchers("/api/auth/**").permitAll() // 토큰 검증 권한설정
        .anyRequest().authenticated()
        
        .and()
        .apply(new JwtSecurityConfig(tokenProvider));

        return http.build();
    }
}

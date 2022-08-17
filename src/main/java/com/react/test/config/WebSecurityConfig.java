package com.react.test.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

import com.react.test.jwt.JwtAccessDeniedHandler;
import com.react.test.jwt.JwtAuthenticationEntryPoint;
import com.react.test.jwt.TokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig {
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
    	// resource 하위로 권한을 다줘 버림.
        return (web) -> web.ignoring().antMatchers("/static/**", "/favicon.ico", "/manifest.json", "/**");
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
    	// request로부터 받은 비밀번호를 암호화
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.httpBasic().disable() // http 사용금지
        .csrf().disable() // react 에서 token을 localstorage에 저장 하기 위한 설정
//        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
       
//        .and()
        .exceptionHandling()
        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
        .accessDeniedHandler(jwtAccessDeniedHandler)
        
        .and().authorizeRequests()
        
        // static resources 권한 설정
        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
        
        .antMatchers("/").permitAll()
        
        // 서버 권한 설정
        .antMatchers("/api/auth/**").permitAll() // 토큰 검증 권한설정
        .anyRequest().authenticated()
        .and()
        .apply(new JwtSecurityConfig(tokenProvider));

        return http.build();
    }
}

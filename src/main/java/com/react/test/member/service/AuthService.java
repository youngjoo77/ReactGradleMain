package com.react.test.member.service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.react.test.jwt.JwtFilter;
import com.react.test.jwt.TokenProvider;
import com.react.test.jwt.dto.TokenDto;
import com.react.test.member.dto.MemberRequestDto;
import com.react.test.member.dto.MemberResponseDto;
import com.react.test.member.entity.Member;
import com.react.test.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final JwtFilter jwtFilter;
    
    
    public MemberResponseDto signup(MemberRequestDto requestDto) {
        if (memberRepository.existsByEmail(requestDto.getEmail())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        Member member = requestDto.toMember(passwordEncoder);
        return MemberResponseDto.of(memberRepository.save(member));
    }

    public TokenDto login(MemberRequestDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        return tokenProvider.generateTokenDto(authentication);
    }
    
	public TokenDto refreshToken(HttpServletRequest request) {
    	// refresh 토큰 검증
    	@SuppressWarnings("static-access")
		String refToken = jwtFilter.resolveToken(request, jwtFilter.REFRESH_AUTHORIZATION_HEADER);
    	
    	// 토큰이 유효한지 검증한다.
    	if(tokenProvider.validateToken(refToken)) {
    		// DB 에도 저장되어 있으면 DB 의 값과도 비교한다.
    		
    		// 권한을 생성 한다.
    		Authentication authentication = tokenProvider.getAuthentication(refToken);
    		TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
    		
    		if(log.isDebugEnabled()) {
        		log.debug("tokenDto : ", tokenDto.toString());
        	}
    		
    		return tokenDto;
    	}
    	else {
    		return null;
    	}
    }
}
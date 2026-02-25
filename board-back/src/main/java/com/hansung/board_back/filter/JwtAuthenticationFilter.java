package com.hansung.board_back.filter;

import java.io.IOException;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hansung.board_back.provider.JwtProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor // final 필드(jwtProvider)를 자동으로 주입받을 수 있도록 생성자를 만들어줌(롬복 기능)
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    // OncePerRequestFilter 상속-> 한 요청당 한 번만 실행되는 필터를 만들 때 사용하는 스프링 제공 클래스
    // 보통 인증/인가 관련 로직을 넣는다.

    private final JwtProvider jwtProvider;
    // JWT 토큰을 검증하거나 토큰에서 사용자 정보를 추출하는 역할을 하는 JwtProvider를 주입받음.
    // final이라 @RequiredArgsConstructor 덕분에 생성자에서 자동 주입됨.

    @Override // 실제 요청이 들어올 때 호출되는 메서드
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String token = parseBearerToken(request);

            //토큰이 없는 경우 다음 필터로 패스 -> 로그인하지 않은 요청이거나 인증 필요 없는 요청이면 그냥 다음 필터로 넘김.
            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }

            String email = jwtProvider.validate(token);

            //토큰이 유효하지 않은 경우 다음 필터로 패스
            if (email == null) {
                filterChain.doFilter(request, response);
                return;
            }

            //인증 객체 생성 -> UsernamePasswordAuthenticationToken: Spring Security에서 인증 정보를 담는 객체.
            AbstractAuthenticationToken authorizationToken = new UsernamePasswordAuthenticationToken(email, null,
                    AuthorityUtils.NO_AUTHORITIES);

            //요청에 대한 세부 정보(IP, 세션 ID 등)를 인증 객체에 추가
            authorizationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(authorizationToken);

            //SecurityContextHolder에 저장 → 이후 컨트롤러나 서비스에서 @AuthenticationPrincipal로 email 가져올 수 있음
            SecurityContextHolder.setContext(securityContext);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        filterChain.doFilter(request, response);
    }

    // JWT 토큰을 HTTP 요청 헤더에서 꺼내는 역할
    private String parseBearerToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization"); // Authorization 헤더 값 가져오기

        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization)
            return null;

        boolean isBearer = authorization.startsWith("Bearer ");
        if (!isBearer)
            return null;

        String token = authorization.substring(7); // "Bearer " 이후의 문자열만 잘라서 반환
        return token;
    }

}

// <전체 흐름>
// 1. 클라이언트가 HTTP 요청 보낼 때 Authorization: Bearer <토큰> 헤더를 같이 보냄
// 2. parseBearerToken()에서 토큰 꺼냄
// 3. jwtProvider로 토큰 유효성 검사
// 4. 토큰이 유효하면 SecurityContextHolder에 인증 정보 저장
// 5. 다음 필터/컨트롤러로 요청 전달

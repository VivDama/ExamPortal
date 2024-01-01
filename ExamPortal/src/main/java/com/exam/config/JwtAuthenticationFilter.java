package com.exam.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.exam.service.impl.UserDetailsServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

		// As a precautionary feature this value is made final, so in future no
		// developer by mistake will modify the value
		String REQUEST_TOKEN_HEADER = request.getHeader("Authorization");
//		if(REQUEST_TOKEN_HEADER ==null) {
//			System.out.println("Authorization doesnot exist");
//			return;
//		}
		System.out.println(REQUEST_TOKEN_HEADER);
		String username = null;
		String jwtToken = null;
		System.out.println("Executing Filter Internal");
		if (REQUEST_TOKEN_HEADER != null && REQUEST_TOKEN_HEADER.startsWith("Bearer ")) {
			// yes
			jwtToken = REQUEST_TOKEN_HEADER.substring(7);
			try {
				
				username = this.jwtUtil.extractUsername(jwtToken);
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println(e.getMessage());
			}
		} else {
			System.out.println("Invalid Token, Token doesnot start with 'Bearer'");
		}
		
		
		//validated
		//System.out.println("second part is executed "+username+", "+ SecurityContextHolder.getContext().getAuthentication());
		if(username != null && SecurityContextHolder.getContext().getAuthentication()==null) {
			System.out.println("second part is executed "+username+", "+ SecurityContextHolder.getContext().getAuthentication());
			UserDetails USER_DETAILS = this.userDetailsService.loadUserByUsername(username);
			try {
				if(this.jwtUtil.validateToken(jwtToken, USER_DETAILS)) {
					
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(USER_DETAILS, null, USER_DETAILS.getAuthorities());
					usernamePasswordAuthenticationToken.setDetails((new WebAuthenticationDetailsSource().buildDetails(request)));
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				}
				
				else {
					System.out.println("Token is invalid");
				}
			}  catch (ExpiredJwtException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				System.out.println("JWT has expired");
			}
			
		}
		filterChain.doFilter(request, response);

	}

}

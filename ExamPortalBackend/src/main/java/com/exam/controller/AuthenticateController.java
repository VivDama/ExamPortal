package com.exam.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.exam.config.JwtUtil;
import com.exam.model.User;
import com.exam.security.JwtRequest;
import com.exam.security.JwtResponse;
import com.exam.service.impl.UserDetailsServiceImpl;

@RestController
@CrossOrigin("*")
public class AuthenticateController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	//generate token
	@PostMapping("/generate-token")
	public ResponseEntity<JwtResponse> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception{
		System.out.println("Executing generate COntroller method " +jwtRequest.getUsername() + ", " + jwtRequest.getPassword());
		try {
			this.authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
			System.out.println("Authentication done");
			
		}catch(UsernameNotFoundException e) {
			e.printStackTrace();
			throw new Exception("User not found");			
		}
		
		//user successfully authenticated
		
		UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
		System.out.println("Again obtyai " +userDetails.getUsername());
		String token = this.jwtUtil.generateToken(userDetails);
		System.out.println("Token created: " + token);
		JwtResponse response = new JwtResponse(token);
		return new ResponseEntity<>(response, HttpStatus.OK);
		//return ResponseEntity.ok();
		
		
	}
	
	private void authenticate(String username, String password) throws Exception {
		try {
			System.out.println("authenticating");
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		}catch(DisabledException e) {
			System.out.println(e.getMessage());
			throw new Exception("USER DISABLED");
		}catch (BadCredentialsException e) {
			// TODO: handle exception
			throw new Exception("Invalid Credentials " + e.getMessage());
		}
	}
	
	@GetMapping("/current-user")
	public User getCurrentUser(Principal principal) {
		System.out.println("Principal: "+principal.getName());
		return (User)this.userDetailsService.loadUserByUsername(principal.getName());
	}

	@GetMapping("/get_tok")
	public String getTok() {
		System.out.println("get_tok executed");
		return "String from Backend";
	}
}

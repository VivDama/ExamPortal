package com.exam.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.exam.dao.UserDAO;
import com.exam.dao.impl.UserDAOImpl;
import com.exam.model.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	UserDAOImpl userDAO;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User userByName = this.userDAO.getUserByName(username);
		if(userByName == null) {
			System.err.println("User not found");
			throw new UsernameNotFoundException("No user found with the given details");
		}
		return userByName;
	}

}

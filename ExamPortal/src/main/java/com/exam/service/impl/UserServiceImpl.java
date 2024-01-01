package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.dao.UserDAO;
import com.exam.dao.impl.UserDAOImpl;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserDAOImpl userDAO;

	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		// TODO Auto-generated method stub		
		return this.userDAO.createUser(user, userRoles);
	}

	//getting user by user name
	@Override
	public User getUser(String username) {
		// TODO Auto-generated method stub
		return this.userDAO.getUserByName(username);
	}

	@Override
	public void deleteUserById(Long userId) {
		// TODO Auto-generated method stub
		this.userDAO.deleteUserById(userId);		
	}

}

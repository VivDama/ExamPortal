package com.exam.dao.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.exam.dao.UserDAO;
import com.exam.helper.UserAlreadyExistsException;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repository.RoleRepository;
import com.exam.repository.UserRepository;

@Repository
public class UserDAOImpl implements UserDAO {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		// TODO Auto-generated method stub
		User userByName = this.userRepository.findByUsername(user.getUsername());
		if (userByName != null) {
			System.out.println("User email already exists");
			throw new UserAlreadyExistsException("User with this username already exists");
		} else {
			// create User
			for (UserRole ur : userRoles) {
				roleRepository.save(ur.getRole());
			}
			user.getUserRoles().addAll(userRoles);
			userByName = this.userRepository.save(user);
		}
		return userByName;
	}

	// getting user by user name
	@Override
	public User getUserByName(String username) {
		// TODO Auto-generated method stub
		User byUsername = this.userRepository.findByUsername(username);
		return byUsername;
	}

	@Override
	public void deleteUserById(Long userId) {
		// TODO Auto-generated method stub
		this.userRepository.deleteById(userId);
	}

}

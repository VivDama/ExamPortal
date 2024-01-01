package com.exam.dao;

import java.util.Set;

import com.exam.model.User;
import com.exam.model.UserRole;

public interface UserDAO {
	
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;

	public User getUserByName(String username);

	public void deleteUserById(Long userId);
}

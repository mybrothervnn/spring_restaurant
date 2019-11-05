package com.thanh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanh.entity.User;
import com.thanh.jpa.UserRepository;

@RestController
public class ResfulApiController {
	@Autowired
	UserRepository repo;
	
	@GetMapping("/user")
	public List<User> getAll(){
		List<User> list =  repo.findAll();
		System.out.println(list.toString());
		return list;
	}

}

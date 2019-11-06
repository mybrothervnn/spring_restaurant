package com.thanh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thanh.entity.User;
import com.thanh.jpa.UserRepository;

@RestController
@RequestMapping("/api")
public class ResfulApiController {
	@Autowired
	UserRepository repo;
	
	@GetMapping("/user")
	public List<User> getAll(){
		List<User> list =  repo.findAll();
		//System.out.println(list.toString());
		return list;
	}
	@PostMapping(value = "/update_list_user") //,produces=MediaType.APPLICATION_JSON_VALUE,consumes=MediaType.APPLICATION_JSON_VALUE)
	public List<User> updateEntity(@RequestBody List<User> list){		
		repo.deleteAll();	
		repo.saveAll(list);
		return list;
	}

}

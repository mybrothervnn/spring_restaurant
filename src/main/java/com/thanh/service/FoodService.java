package com.thanh.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thanh.entity.Food;
import com.thanh.jpa.FoodRepository;

@Service
public class FoodService {
	@Autowired
	FoodRepository foodRepository;
	
	public List<Food> findAll(){
		return foodRepository.findAll();
	}
	
	public List<Food> saveAll(List<Food> lf) {
		return foodRepository.saveAll(lf);
	}
	
}

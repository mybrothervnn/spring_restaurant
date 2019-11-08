package com.thanh;

import java.io.IOException;
import java.net.MalformedURLException;

import org.json.simple.parser.ParseException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestaurantApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestaurantApplication.class, args);
		System.out.println("SPRING LOAD OK !!!");
	}

}

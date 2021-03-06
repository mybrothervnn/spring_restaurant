package com.thanh.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
	@GetMapping(value = {"/", "/home"})
    public String homepage() {
        return "home";
    }

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }
    @GetMapping("/list_user")
    public String list_user() {
        return "list_user";
    }
    @GetMapping("/list_food")
    public String list_food() {
        return "list_food";
    }
}

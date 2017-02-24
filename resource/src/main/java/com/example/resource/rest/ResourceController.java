package com.example.resource.rest;

import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.session.web.http.HeaderHttpSessionStrategy;

@RestController
public class ResourceController {

	@RequestMapping("/")
	@CrossOrigin(origins="*", maxAge=3600,
		allowedHeaders={"x-auth-token", "x-requested-with"})
	public Message home(){
		return new Message("Hello World");
	}
	
	@Bean
	HeaderHttpSessionStrategy sessionStrategy(){
		return new HeaderHttpSessionStrategy();
	}
}

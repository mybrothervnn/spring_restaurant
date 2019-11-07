package com.thanh.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;

@Entity
@Table(name="food")
@Data
@Getter
public class Food {
	@Id
	@GeneratedValue
	private Integer id;
	
	String name;
	Integer price;
	String picture;
	String detail;

}

package com.thanh;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.mysql.cj.xdevapi.JsonArray;
import com.thanh.controller.ResfulApiController;
import com.thanh.entity.Food;
import com.thanh.service.FoodService;

@RunWith(SpringRunner.class)
//@WebMvcTest(ResfulApiController.class) -- Vì có sử dụng Spring sercurity nên không dùng kiểu test này được
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class ResfulApiControllerTest {
	   /**
     * Đối tượng MockMvc do Spring cung cấp
     * Có tác dụng giả lập request, thay thế việc khởi động Server
     */
//	@Autowired
//	private MockMvc mockMvc; -- Vì có sử dụng Spring sercurity nên không dùng kiểu test này được
	
	@Autowired
	private FoodService foodService;
	
	@LocalServerPort
	private int port;
	
	@Autowired
	TestRestTemplate restTemplate;
	
	@Test
	public void contextLoad() {
		
	}
	
	@Test
	public void serviceLoad() {
		assertThat(foodService).isNotNull();
	}
	@Test
	public void list_foodUrl() {
		assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/list_food"
				, String.class)).contains("FOOD");
	}
	
	@Test
	public void testFindAll(){
		//Tạo ra 10 sản phẩm
		//giả lập cho foodService trả về danh sách 10 sp trên (vì không dùng jpa để lấy dữ liệu được)
		//sử dụng mockMvc để 
			//mở URL
			//kiểm tra kết quả trả về của jSon
		//==========================================================================================
		
		//Tạo ra 10 sản phẩm
//		private Integer id;
//		
//		String name;
//		Integer price;
//		String picture;
//		String detail;
		List<Food> list = new ArrayList<Food>();
		for (int i = 0; i < 10; i++) {
			Food tmp = new Food(i,"name"+i,i*1000,"piture"+i,"detail"+i);
			list.add(tmp);
		}
		Assert.assertEquals(10, list.size());	
		
		
		
		
	}
}

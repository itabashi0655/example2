package com.rococo.example.controller.api.todo;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;

import org.slim3.datastore.Datastore;
import org.slim3.tester.ControllerTestCase;
import org.slim3.tester.TestEnvironment;
import org.junit.Test;
import com.google.appengine.api.datastore.Entity;
import com.google.apphosting.api.ApiProxy;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

public class DeleteControllerTest extends ControllerTestCase {

	@Override
	public void setUp() throws Exception {
		// TODO Auto-generated method stub
		super.setUp();

		TestEnvironment env = (TestEnvironment)ApiProxy.getCurrentEnvironment();
		env.setEmail("loginuser@example.com");
		
		// create test data.
		Entity entity1 = new Entity(Datastore.createKey("ToDo", 1));
		entity1.setProperty("title", "ToDo1");
		entity1.setProperty("createdBy", "loginuser@example.com");
		entity1.setProperty("createdAt", new Date());

		Entity entity2 = new Entity(Datastore.createKey("ToDo", 2));
		entity2.setProperty("title", "ToDo2");
		entity2.setProperty("createdBy", "anotheruser@example.com");
		entity2.setProperty("createdAt", new Date());
		
		System.out.println("save");
		Datastore.put(entity1, entity2);		
	}

	@Test
	public void respond400IfIdNottSpecfied()
			throws NullPointerException, IllegalArgumentException, 
			IOException, ServletException{

		System.out.println("idが設定されていないときに400を返す");

		tester.start("/api/todo/delete");

		assertThat(tester.response.getStatus(),is(400));
	}

	@Test
	public void respond201Post()
			throws NullPointerException, IllegalArgumentException, 
			IOException, ServletException{

		System.out.println("contentが設定されているときに201を返す");

		tester.param("id", "1");
		tester.start("/api/todo/delete");

		assertThat(tester.response.getStatus(),is(201));
	}

}

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

public class PostControllerTest extends ControllerTestCase {

	@Override
	public void setUp() throws Exception {
		// TODO Auto-generated method stub
		super.setUp();

		TestEnvironment env = (TestEnvironment)ApiProxy.getCurrentEnvironment();
		env.setEmail("loginuser@example.com");
		
		// create test data.
		Entity entity1 = new Entity(Datastore.createKey("Todo", 1));
		entity1.setProperty("title", "ToDo1");
		entity1.setProperty("createdBy", "loginuser@example.com");
		entity1.setProperty("createdAt", new Date());

		Entity entity2 = new Entity(Datastore.createKey("Todo", 2));
		entity2.setProperty("title", "ToDo2");
		entity2.setProperty("createdBy", "anotheruser@example.com");
		entity2.setProperty("createdAt", new Date());
		
		System.out.println("save");
		Datastore.put(entity1, entity2);		
	}

	@Test
	public void respond400IfContentNottSpecfied()
			throws NullPointerException, IllegalArgumentException, 
			IOException, ServletException{

		System.out.println("contentが設定されていないときに400を返す");
		
		tester.start("/api/todo/Post");

		assertThat(tester.response.getStatus(),is(400));
	}

	@Test
	public void respond201Post()
			throws NullPointerException, IllegalArgumentException, 
			IOException, ServletException{

		System.out.println("contentが設定されているときに201を返す");

		tester.param("content", "todo #1");
		tester.start("/api/todo/Post");

		assertThat(tester.response.getStatus(),is(201));
	}

	@Test
	public void respond201Post_Countup()
			throws NullPointerException, IllegalArgumentException, 
			IOException, ServletException{

		System.out.println("contentが設定されているときにentityが+1される");

		int beforeCount = tester.count("Todo");

		tester.param("content", "todo #1");
		tester.start("/api/todo/Post");

		int afterCount = tester.count("Todo");
	
		assertThat(afterCount,is(beforeCount + 1));
	}
}

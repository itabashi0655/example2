package com.rococo.example.controller.api.todo;

import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;

public class PostController extends Controller {

    @Override
    public Navigation run() throws Exception {
//    	String username = request.getParameter("username");
    	String content  = request.getParameter("content");

    	System.out.println("content="+ content);
    	User user = UserServiceFactory.getUserService().getCurrentUser();
/*
    	// username が設定されていない場合は400を返して終了します、
    	if(StringUtils.isEmpty(username)){
    		response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    		return null;
    	}
*/
    	// content が設定されていない場合は400を返して終了します。
    	if(StringUtils.isEmpty(content)){
    		response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    		return null;
    	}

    	Entity entity = new Entity("Todo");

    	entity.setProperty("username" , user.getEmail());
    	entity.setProperty("content"  , content);
    	entity.setProperty("createdAt", new Date().getTime());

    	// 正常にデータを登録できた場合は201を返して終了します。
    	Datastore.put(entity);
    	response.setStatus(HttpServletResponse.SC_CREATED);
        return null;
    }
}

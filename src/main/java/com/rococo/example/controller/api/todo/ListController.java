package com.rococo.example.controller.api.todo;

import java.util.*;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;
import org.slim3.repackaged.org.json.JSONObject;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query.SortDirection;

public class ListController extends Controller {

	@Override
	protected Navigation run() throws Exception {
		// TODO 自動生成されたメソッド・スタブ

		List<Entity> entities = Datastore.query("Todo")
			.sort("createdAt", SortDirection.DESCENDING)
			.asList();

		List<Map<String, Object>> entries = new ArrayList<Map<String, Object>>();

		for(Entity entity : entities){
			Map<String, Object> properties = new LinkedHashMap<String, Object>();
			
			properties.put("id"       ,  entity.getKey().getId());
			properties.put("createdBy",  entity.getProperty("username"));
			properties.put("content"  ,  entity.getProperty("content"));
			properties.put("createdAt",  entity.getProperty("createdAt"));
 
			entries.add(properties);
		}

		String json = JSONObject.valueToString(entries);

		response.setContentType("application/json");
		response.setCharacterEncoding("utf-8");
		response.getWriter().println(json);
		response.flushBuffer();
		return null;
	}

}

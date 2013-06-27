package com.rococo.example.controller.api.todo;

import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;

public class DeleteController extends Controller {

	@Override
	protected Navigation run() throws Exception {
		// TODO 自動生成されたメソッド・スタブ
    	String idString = request.getParameter("id");
    	System.out.println("id="+idString);
    	// パラメータ id が設定されていない場合は400を返して終了します。
    	if(StringUtils.isEmpty(idString)){
    		response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    		return null;
    	}

    	int id;
    	// パラメータ id が数値ではない場合は400を返して終了します。
    	try{
    		id = Integer.parseInt(idString);
    	}catch(NumberFormatException ex){
    		response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    		return null;
    	}

    	Key key = Datastore.createKey("Todo", id);

    	// id に該当するデータがDatastore上に存在しない場合は404を返して終了します。
    	if(null == Datastore.getOrNull(key)){
    		response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    		return null;
    	}

    	// 正常にデータが削除できた場合は200を返して終了します。
    	Datastore.delete(key);
    	response.setStatus(HttpServletResponse.SC_OK);
        return null;
	}

}

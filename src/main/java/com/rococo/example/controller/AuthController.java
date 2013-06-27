package com.rococo.example.controller;

import java.util.logging.Logger;
import javax.servlet.http.HttpServletResponse;
import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import com.rococo.example.model.AccessToken;

public class AuthController extends Controller {

	public static final String CLIENT_ID     = "927097438608-4j0js4ltnpi1f0vdbujol6dba435emij.apps.googleusercontent.com";
	public static final String CLIENT_SECRET = "S7peURU5kh9J9jat75BSuKL2";
	public static final String PLAYGROUND  = "http://localhost:8888/Auth";
//	public static final String SCOPE = "https://www.googleapis.com/auth/plus.me";
	@Override
	protected Navigation run() throws Exception {
		// TODO 自動生成されたメソッド・スタブ
		AccessToken token = null;
		String username = "takayuki.itabashi";

		// Get my access token.
		if(null == (token = AccessToken.get(username))){

			// Create access token.
			token = AccessToken.create(CLIENT_ID, CLIENT_SECRET, PLAYGROUND);

			String code = request.getParameter("code");

			if(code == null || "".equals(code))
				return redirect(AccessToken.createAcceptURL(token));

			// Initialize token.
			try{
				token.init(code);
			}catch(Exception ex){
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return null;
			}

			// Save access token/
			AccessToken.put(username, token);
			Logger.getGlobal().info("Save token");
		}

		// Refresh accss token.
		if(token.isExpired()){
			Logger.getGlobal().info("Refresh Token");
			try{
				token.refresh();
				AccessToken.put(username, token);
			}catch(Exception ex){
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				return null;
			}
		}

		// output token.
		Logger.getGlobal().info("Token:" + token.getToken());
		response.setStatus(HttpServletResponse.SC_OK);
		response.getWriter().write(token.getToken());
		return null;
	}

}

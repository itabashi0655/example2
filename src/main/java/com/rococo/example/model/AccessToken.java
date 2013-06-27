package com.rococo.example.model;

import java.io.*;
import java.net.*;
import java.util.*;
import java.util.logging.Logger;
import com.google.appengine.api.datastore.*;
import org.apache.commons.lang3.StringUtils;
import org.slim3.datastore.Attribute;
import org.slim3.datastore.Datastore;
import org.slim3.datastore.Model;
import org.slim3.repackaged.org.json.*;

@Model(schemaVersion = 1)
public class AccessToken implements Serializable {

    private static final long serialVersionUID = 1L;

    @Attribute(primaryKey = true)
    private Key key;

    @Attribute(version = true)
    private Long version;

    /**
     * client id
     */
	private String clientId;

	/**
	 * client secret
	 */
	private String clientSecret;

	/**
	 * playground
	 */
	private String playground;

	/**
	 * code
	 */
	private String code;

	/**
	 * access token
	 */
	private String token;

	/**
	 * token type
	 */
	private String tokenType;

	/**
	 * expire in (sec)
	 */
	private long expiresIn;

	/**
	 * refresh token
	 */
//	@Attribute(lob = true)
	private String refreshToken;

	/**
	 * timestamp
	 */
	private Date timestamp;

	/**
	 * Returns the client identity.
	 * @return
	 */
	public String getClientId() {
		return clientId;
	}

	/**
	 * Sets the client identity.
	 * @param clientId
	 */
	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	/**
	 * Returns the client secret.
	 * @return
	 */
	public String getClientSecret() {
		return clientSecret;
	}

	/**
	 * Sets the client secret.
	 * @param clientSecret
	 */
	public void setClientSecret(String clientSecret) {
		this.clientSecret = clientSecret;
	}

	/**
	 * Returns the playground.
	 * @return
	 */
	public String getPlayground() {
		return playground;
	}

	/**
	 * Sets the playground.
	 * @param redirectUri
	 */
	public void setPlayground(String playground) {
		this.playground = playground;
	}

	/**
	 * Returns the code.
	 * @return
	 */
	public String getCode() {
		return code;
	}

	/**
	 * Sets the code.
	 * @param code
	 */
	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * Returns the token.
	 * @return
	 */
	public String getToken() {
		return token;
	}

	/**
	 * Sets the token.
	 * @param token
	 */
	public void setToken(String token) {
		this.token = token;
	}

	/**
	 * Returns the token type
	 * @return
	 */
	public String getTokenType() {
		return tokenType;
	}

	/**
	 * Sets the token type.
	 * @param tokenType
	 */
	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
	}

	/**
	 * Returns the expires in.
	 * @return
	 */
	public long getExpiresIn() {
		return expiresIn;
	}

	/**
	 * Sets expires in.
	 * @param expiresIn
	 */
	public void setExpiresIn(long expiresIn) {
		this.expiresIn = expiresIn;
	}

	/**
	 * Returns the refresh token.
	 * @return
	 */
	public String getRefreshToken() {
		return refreshToken;
	}

	/**
	 * Sets the refresh token.
	 * @param refreshToken
	 */
	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	/**
	 * Returns the timestamp.
	 * @return
	 */
	public Date getTimestamp() {
		return timestamp;
	}

	/**
	 * Sets the timestamp.
	 * @param timestamp
	 */
	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	/**
     * Returns the key.
     *
     * @return the key
     */
    public Key getKey() {
        return key;
    }

    /**
     * Sets the key.
     *
     * @param key
     *            the key
     */
    public void setKey(Key key) {
        this.key = key;
    }

    /**
     * Returns the version.
     *
     * @return the version
     */
    public Long getVersion() {
        return version;
    }

    public static void put(String username, AccessToken token){

		Key key = Datastore.createKey(AccessToken.class, username);

		token.setKey(key);
		Datastore.put(token);
    }

    public static AccessToken get(String username){

		Key key = Datastore.createKey(AccessToken.class, username);

		return Datastore.getOrNull(AccessToken.class, key);
    }

	public static AccessToken create(String clientId, String clientSecret, String playground){

		AccessToken token = new AccessToken();

		token.setClientId(clientId);
		token.setClientSecret(clientSecret);
		token.setPlayground(playground);

		return token;
	}

	public static String createAcceptURL(AccessToken token) throws Exception{

//		StringBuilder sb = new StringBuilder();
//		sb.append("https://accounts.google.com/o/oauth2/auth?");
//		sb.append("client_id=" + CLIENT_ID);
//		sb.append("&redirect_uri=" + URLEncoder.encode(REDIRECT_URI, "utf-8"));
//		sb.append("&access_type=" + "offline");
//		sb.append("&approval_prompt=" + "force");
//		sb.append("&scope=" +  URLEncoder.encode(SCOPE, "utf-8"));
//		sb.append("&response_type=code");


		Map<String, String> params
			= new LinkedHashMap<String, String>();

		params.put("client_id"       , token.getClientId());
		params.put("redirect_uri"    , token.getPlayground());
		params.put("access_type"     , "offline");
		params.put("approval_prompt" , "force");
		params.put("scope"           , "https://www.googleapis.com/auth/plus.me");
		params.put("response_type"   , "code");

		StringBuilder sb = new StringBuilder();
		sb.append("https://accounts.google.com/o/oauth2/auth");
		sb.append("?");
		sb.append(AccessToken.mapToQueryString(params));

		return sb.toString();
	}

	private static String mapToQueryString(Map<String, String> map) throws UnsupportedEncodingException{

		List<String> params = new ArrayList<String>();

		try{
			Iterator<String> it = map.keySet().iterator();
		
			while (it.hasNext()) {
				String key   = it.next();
			    System.out.println("Key=" + key);

				String value = URLEncoder.encode(map.get(key), "utf-8");

			    params.add(StringUtils.join(new String[]{key, value}, "="));
			}
		}catch(UnsupportedEncodingException ex){
			throw ex;
		}
		
		return StringUtils.join(params, "&");
	}

    /**
     * Sets the version.
     *
     * @param version
     *            the version
     */
    public void setVersion(Long version) {
        this.version = version;
    }

    /**
     * アクセストークンの有効期限が切れているかどうかを示す値を取得します。
     * ※ 実際の有効期限より１分ほど早いタイミングで有効期限が切れるようにしています。
     * @return
     * 		有効期限が切れている場合はtrue、それ以外の場合はfalse
     */
    public boolean isExpired(){

		long expiredTime = this.timestamp.getTime() + (this.expiresIn * 1000);

		if(expiredTime - new Date().getTime() < (60 * 1000))
			return true;
		return false;
    }

    /**
     * 指定されたclient_id、client_secret、redirect_url、codeを使ってアクセストークンを
     * 取得します。
     * @throws IOException
     * @throws JSONException
     */
    public void init(String code) throws IOException, JSONException{

    	this.code = code;

    	Map<String, String> params
    		= new LinkedHashMap<String, String>();

		params.put("client_id"    , this.clientId);
		params.put("client_secret", this.clientSecret);
		params.put("redirect_uri" , this.playground);
		params.put("grant_type"   , "authorization_code");
		params.put("code"         , this.code);
		params.put("scope"        , "");

		JSONObject json;
		try{
			json = this.getJSON(params);
		}catch(JSONException ex){
			throw ex;
		}

		this.token        = json.getString("access_token");
		this.tokenType    = json.getString("token_type");
		this.expiresIn    = json.getLong("expires_in");
		this.refreshToken = json.getString("refresh_token");
		this.timestamp    = new Date();
    }

    /**
     * アクセストークンをリフレッシュします。
     * @throws IOException
     * @throws JSONException
     */
    public void refresh() throws IOException, JSONException{

    	Map<String, String> params
    		= new LinkedHashMap<String, String>();

    	params.put("client_id"    , this.clientId);
		params.put("client_secret", this.clientSecret);
		params.put("grant_type"   , "refresh_token");
		params.put("refresh_token", this.refreshToken);

		JSONObject json;
		try{
			json = this.getJSON(params);
		}catch(JSONException ex){
			throw ex;
		}

		this.token     = json.getString("access_token");
		this.tokenType = json.getString("token_type");
		this.expiresIn = json.getLong("expires_in");
		this.timestamp = new Date();
    }

    /**
     * 指定されたパラメータを使って、https://accounts.google.com/o/oauth2/tokenにPOST送信を行い、
     * JSONレスポンスを取得します。
     * @param params
     * @return
     * @throws IOException
     * @throws JSONException
     */
	private JSONObject getJSON(Map<String, String> params) throws IOException, JSONException{
		try{
			// Setting URL
			URL url = new URL("https://accounts.google.com/o/oauth2/token");
			URLConnection uc = url.openConnection();
			uc.setDoOutput(true);

			// Setting headers.
			uc.setRequestProperty("Host", "accounts.google.com");
			uc.setRequestProperty("user-agent", "google-oauth-playground");

			// Setting parameters.
			PrintStream ps = new PrintStream(uc.getOutputStream());	//IOException
			ps.print(AccessToken.mapToQueryString(params));
			ps.close();

			// Send request.
			BufferedReader reader
				= new BufferedReader(new InputStreamReader(uc.getInputStream()));

			// Get response.
			StringBuilder sb = new StringBuilder();
			String s = null;

			while(null != (s = reader.readLine()))
				sb.append(s);

			reader.close();

			// Logging respond JSON string.
			Logger.getGlobal().info("Respond JSON:" + sb.toString());

			// Create & returns JSON Object
			return new JSONObject(sb.toString());

		}catch(MalformedURLException ex){
			ex.printStackTrace();
			throw ex;
		}catch(IOException ex){
			ex.printStackTrace();
			throw ex;
		}catch(JSONException ex){
			ex.printStackTrace();
			throw ex;
		}catch(Exception ex){
			ex.printStackTrace();
			throw ex;
		}
	}

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((key == null) ? 0 : key.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        AccessToken other = (AccessToken) obj;
        if (key == null) {
            if (other.key != null) {
                return false;
            }
        } else if (!key.equals(other.key)) {
            return false;
        }
        return true;
    }
}

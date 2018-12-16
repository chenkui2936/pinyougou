package entity;

import java.io.Serializable;

public class Result implements Serializable{
	private Boolean Success;
	private String message;

	public Result(Boolean success, String message) {
		super();
		Success = success;
		this.message = message;
	}

	public Boolean getSuccess() {
		return Success;
	}

	public void setSuccess(Boolean success) {
		Success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}

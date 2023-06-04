package com.example.springboot.controller.request;

import lombok.Data;

/**
 * @author lyj
 */
@Data
public class LoginRequest {
    private String username;
    private String password;
}

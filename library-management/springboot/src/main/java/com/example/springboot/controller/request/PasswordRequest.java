package com.example.springboot.controller.request;

import lombok.Data;

/**
 * @author lyj
 */
@Data
public class PasswordRequest {
    private String password;
    private String username;
    private String newPass;
}

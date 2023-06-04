package com.example.springboot.controller.request;

import lombok.Data;

/**
 * @author lyj
 */
@Data
public class BaseRequest {
    private Integer pageNum = 1;
    private Integer pageSize = 10;

}

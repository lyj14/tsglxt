package com.example.springboot.controller.request;

import lombok.Data;

/**
 * @author lyj
 */
@Data
public class BorrowPageRequest extends BaseRequest{
    private String bookName;
    private String bookNo;
    private String userName;
}

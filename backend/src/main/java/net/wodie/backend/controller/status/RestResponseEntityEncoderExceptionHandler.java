package net.wodie.backend.controller.status;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;


@ControllerAdvice
public class RestResponseEntityEncoderExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { NoSuchElementException.class })
    protected ResponseEntity<Object> handleConflict(NoSuchElementException ex, WebRequest request){

         ErrorResponse bodyOfResponse = ErrorResponse.builder()
                .errorMessage("Element not found. Exception message: " + ex.getMessage())
                .timestamp(LocalDateTime.now())
                .requestUri(request.getDescription(false))
                .build();

        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(value = { IllegalArgumentException.class })
    protected ResponseEntity<Object> handleConflict(IllegalArgumentException ex, WebRequest request){

        ErrorResponse bodyOfResponse = ErrorResponse.builder()
                .errorMessage("There was an illegal argument in the request.")
                .timestamp(LocalDateTime.now())
                .requestUri(request.getDescription(false))
                .build();

        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = { IllegalStateException.class })
    protected ResponseEntity<Object> handleConflict(IllegalStateException ex, WebRequest request){

        ErrorResponse bodyOfResponse = ErrorResponse.builder()
                .errorMessage("Wrong status for Vote. Exception message: " + ex.getMessage())
                .timestamp(LocalDateTime.now())
                .requestUri(request.getDescription(false))
                .build();

        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

}


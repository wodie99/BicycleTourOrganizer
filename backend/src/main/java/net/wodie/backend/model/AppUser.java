package net.wodie.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection= "appUsers")
public class AppUser {
    @Id
    private String id;
    private String userName;
    private String password;
    private String firstName;
    private String surName;
    private String email;
    private String phone;
}

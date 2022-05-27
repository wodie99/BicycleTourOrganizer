package net.wodie.backend.security.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@With
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection= "appUsers")
public class AppUser {
    @Id
    private String id;
    private String username;
    private String password;
    private String firstName;
    private String surName;
    private String email;
    private String phone;
}

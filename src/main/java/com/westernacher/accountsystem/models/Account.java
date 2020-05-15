package com.westernacher.accountsystem.models;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "accounts")
@Data
@Builder
public class Account {
    @Id
    String id;
    String firstName;
    String lastName;
    String email;
    LocalDate dateOfBirth;
}

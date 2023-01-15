package com.employeemanagement.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long _id;
    @Column(name = "first_name")
    private String _firstName;
    @Column(name = "last_name")
    private String _lastName;
    @Column(name = "email_id")
    private String _emailId;
}

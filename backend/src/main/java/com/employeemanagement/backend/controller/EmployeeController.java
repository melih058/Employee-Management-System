package com.employeemanagement.backend.controller;

import com.employeemanagement.backend.exception.ResourcesNotFoundException;
import com.employeemanagement.backend.model.Employee;
import com.employeemanagement.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository _employeeRepository;

    @GetMapping
    public List<Employee> getAllEmployees(){
        return _employeeRepository.findAll();
    }

    @PostMapping
    public  Employee  createNewEmployee(@RequestBody Employee employee){
       return _employeeRepository.save(employee);
    }

    @GetMapping("{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id){
        Employee employee = _employeeRepository.findById(id).orElseThrow(() -> new ResourcesNotFoundException("Employee not exist with id: " + id));
        return  ResponseEntity.ok(employee);
    }

    @PutMapping("{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id,@RequestBody Employee employeeDetails){
        Employee updateEmployee = _employeeRepository.findById(id).orElseThrow(() -> new ResourcesNotFoundException("Employee not exist with id: " + id));

        updateEmployee.set_firstName(employeeDetails.get_firstName());
        updateEmployee.set_lastName(employeeDetails.get_lastName());
        updateEmployee.set_emailId(employeeDetails.get_emailId());

        _employeeRepository.save(updateEmployee);
        return  ResponseEntity.ok(updateEmployee);
    }

    @DeleteMapping("{id}")
    public  ResponseEntity<HttpStatus> deleteEmployeeById(@PathVariable long id){
        Employee deleteEmployee = _employeeRepository.findById(id).orElseThrow(() -> new ResourcesNotFoundException("Employee not exist with id: " + id));

        _employeeRepository.delete(deleteEmployee);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

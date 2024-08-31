package com.example.employ.services;

import com.example.employ.dto.EmployeeDTO;
import com.example.employ.entity.Employee;
import com.example.employ.repo.EmployeeRepo;
import com.example.employ.util.VarList;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private ModelMapper modelMapper;

    public String saveEmployee(EmployeeDTO employeeDTO) {
        if (employeeRepo.existsById(employeeDTO.getEmpid())) {
            return VarList.RSP_DUPLICATED;
        } else {
            employeeRepo.save(modelMapper.map(employeeDTO, Employee.class));
            return VarList.RSP_SUCCESS;
        }
    }

    public String updateEmployee(EmployeeDTO employeeDTO) {
        if (employeeRepo.existsById(employeeDTO.getEmpid())) {
            employeeRepo.save(modelMapper.map(employeeDTO, Employee.class));
            return VarList.RSP_SUCCESS;
        } else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }

    public List<EmployeeDTO> getAllEmployee() {
        List<Employee> employeeList = employeeRepo.findAll();
        return modelMapper.map(employeeList, new TypeToken<ArrayList<EmployeeDTO>>() {}.getType());
    }

    public EmployeeDTO searchEmployee(int empID) {
        Optional<Employee> employeeOptional = employeeRepo.findById(empID);
        if (employeeOptional.isPresent()) {
            return modelMapper.map(employeeOptional.get(), EmployeeDTO.class);
        } else {
            return null; // Or handle the case where the employee is not found as needed
        }
    }

    public String deleteEmployee(int empID) {
        if (employeeRepo.existsById(empID)) {
            employeeRepo.deleteById(empID);
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
}

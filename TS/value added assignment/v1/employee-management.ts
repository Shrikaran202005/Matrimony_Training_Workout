interface Employee {
    id: number;
    name: string;
    department: string;
    salary?: number;
}

enum EmployeeStatus {
    Active = "ACTIVE",
    Inactive = "INACTIVE"
}

class EmployeeService {
    private employees: Employee[] = [];

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    //Fix 1 & 2
    getEmployeeById(id: number): Employee | undefined {
        return this.employees.find(emp => emp.id === id);
    }

    // Fix 3
    calculateBonus(employee: Employee): number {
        return employee.salary ? employee.salary * 0.10 : 0;
    }

    // Fix 4
    printEmployee(employee: Employee): void {
        console.log(employee.name.toUpperCase());
    }
}

const employeeService = new EmployeeService();

employeeService.addEmployee({
    id: 101,
    name: "Rahul",
    department: "Engineering"
});

employeeService.addEmployee({
    id: 102, // Fix 5
    name: "Priya",
    department: "QA",
    salary: 50000
});

const employee = employeeService.getEmployeeById(101);

// Fix 6
if (employee) {
    console.log(employee.department);
    console.log(employeeService.calculateBonus(employee));
    employeeService.printEmployee(employee);
} else {
    console.log("Employee not found.");
}
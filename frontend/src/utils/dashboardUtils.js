export function processGenderData(employees) {
    const genderCounts = employees.reduce((acc, { gender }) => {
        acc[gender] = (acc[gender] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(genderCounts).map(([name, data]) => ({ name, data }));
}

export function calculateLongTermCounts(employees) {
    const currentYear = new Date().getFullYear();
    let longTermCount = 0;
    let shortTermCount = 0;

    employees.forEach(employee => {
        const joinDate = new Date(employee.doj);
        const joinYear = joinDate.getFullYear();
        const yearsOfService = currentYear - joinYear;

        if (yearsOfService > 60) {
            longTermCount++;
        } else {
            shortTermCount++;
        }
    });

    return [
        { name: "> 60 Years", data: longTermCount },
        { name: "< 60 Years", data: shortTermCount }
    ];
}

// Utility to count employees by job position
export function calculateJobPositions(employees) {
    const positionCounts = employees.reduce((acc, { job_title }) => {
        acc[job_title] = (acc[job_title] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(positionCounts).map(([job_title, count]) => ({
        job_title, count
    }));
}


export function calculateEmployeesByDepartment(employees) {
    const departmentCounts = {};

    // Loop through all employees to tally the counts for each department
    employees.forEach(employee => {
        const department = employee.department;
        if (departmentCounts[department]) {
            departmentCounts[department]++;
        } else {
            departmentCounts[department] = 1;
        }
    });

    // Convert the counts object into an array suitable for pie chart visualization
    return Object.entries(departmentCounts).map(([name, data]) => ({ name, data }));
}
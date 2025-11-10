import db from "#db/client";
import { createEmployee } from "#db/queries/employees";
await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: 'John Doe', birthday: '1990-01-15', salary: 75000 },
    { name: 'Jane Smith', birthday: '1985-03-22', salary: 82000 },
    { name: 'Mike Johnson', birthday: '1992-07-08', salary: 68000 },
    { name: 'Sarah Williams', birthday: '1988-11-30', salary: 91000 },
    { name: 'David Brown', birthday: '1995-05-12', salary: 72000 },
    { name: 'Emily Davis', birthday: '1987-09-25', salary: 88000 },
    { name: 'Chris Wilson', birthday: '1993-02-18', salary: 65000 },
    { name: 'Lisa Anderson', birthday: '1991-06-14', salary: 79000 },
    { name: 'Tom Martinez', birthday: '1989-12-03', salary: 85000 },
    { name: 'Amy Taylor', birthday: '1994-04-27', salary: 71000 }
  ];
  for (const employee of employees) {
    await createEmployee(employee);
  }
}

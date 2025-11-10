import express from "express";
import employeesRouter from "#api/employees";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Fullstack Employees API.");
});
app.use("/employees", employeesRouter);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
})
export default app;
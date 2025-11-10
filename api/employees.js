import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";
const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'ID must be a positive integer' });
    }
    
    const employee = await getEmployee(id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json(employee);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { name, birthday, salary } = req.body;
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is required' });
    }
    
    if (!name || !birthday || salary === undefined) {
      return res.status(400).json({ error: 'Missing required fields: name, birthday, salary' });
    }
    
    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, birthday, salary } = req.body;
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is required' });
    }
    
    if (!name || !birthday || salary === undefined) {
      return res.status(400).json({ error: 'Missing required fields: name, birthday, salary' });
    }
    
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'ID must be a positive integer' });
    }
    
    const employee = await updateEmployee({ id, name, birthday, salary });
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'ID must be a positive integer' });
    }
    
    const employee = await deleteEmployee(id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
export default router;
// TODO: this file!

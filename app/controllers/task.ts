import { Request, Response, NextFunction } from "express";
import Task from "../models/task";
import mongodb, { ObjectId } from "mongodb";

const readTask = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id;

  return Task.findById(id)
    .then((task) =>
      task
        ? res.status(200).json({ task })
        : res.status(204).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAllTask = async (req: Request, res: Response, next: NextFunction) => {
  const userid = req.query.userid;
  return Task.find({ userId: userid })
    .then((tasks) => res.status(200).json({ tasks }))
    .catch((error) => res.status(500).json({ error }));
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, userId } = req.body;

  const newTask = new Task({
    title,
    description,
    userId,
    state: false,
  });

  return newTask
    .save()
    .then((task) => res.status(201).json({ task }))
    .catch((error) => res.status(500).json({ error }));
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  return Task.findById(req.query.id)
    .then((task) => {
      if (task) {
        task.set(req.body);

        return task
          .save()
          .then((task) => res.status(200).json({ task }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(204).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id;

  return Task.findById(id)
    .then((task) => {
      if (task) {
        return task
          .delete()
          .then(() =>
            res.status(200).json({ message: "Task Deleted Successfully" })
          )
          .catch((error: any) => res.status(500).json({ error }));
      } else {
        res.status(204).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

export default {
  readAllTask,
  readTask,
  createTask,
  updateTask,
  deleteTask,
};

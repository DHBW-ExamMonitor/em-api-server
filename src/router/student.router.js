import express from "express";
import prisma from "../utils/prisma";

const studentRouter = express.Router();

/**
 * @api {get} /student/ Get all Studenten
 */
studentRouter.get("/", async (req, res) => {
  try {
    const studenten = await prisma.student.findMany();
    res.json(studenten);
  } catch (error) {
    res.json({
      message: "Es ist ein Fehler beim Laden der Studenten aufgetreten.",
    });
  }
});

/**
 * @api {get} /student/:id Get Student by ID
 */
studentRouter.get("/:id", async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.params.id },
    });
    res.json(student);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Es ist ein Fehler beim Laden des Studenten aufgetreten.",
    });
  }
});

/**
 * @api {get} /student/kurs/:kursId Get Student by Kurs ID
 */
studentRouter.get("/kurs/:kursId", async (req, res) => {
  try {
    const student = await prisma.student.findMany({
      where: { kursId: req.params.kursId },
    });
    res.json(student);
  } catch (error) {
    res.json({
      message: "Es ist ein Fehler beim Laden des Studenten aufgetreten.",
    });
  }
});

/**
 * @api {post} /student/:id Create Student
 */
studentRouter.post("/", async (req, res) => {
  try {
    const student = await prisma.student.create({
      data: {
        ...req.body,
      },
    });
    res.json(student);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Es ist ein Fehler beim Erstellen des Studenten aufgetreten.",
    });
  }
});

/**
 * @api {put} /student/:id Update Student
 */
studentRouter.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const student = await prisma.student.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });
    res.json(student);
  } catch (error) {
    res.json({
      message: "Es ist ein Fehler beim Bearbeiten des Studenten aufgetreten.",
    });
  }
});

/**
 * @api {delete} /student/:id Delete Student
 */
studentRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const student = await prisma.student.delete({ where: { id: id } });
    res.json(student);
  } catch (error) {
    res.json({
      message: "Es ist ein Fehler beim Löschen des Studenten aufgetreten.",
    });
  }
});

export default studentRouter;

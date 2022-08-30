import express from "express";
import prisma from "../utils/prisma";

const kursRouter = express.Router();

/**
 * @api {get} /kurse/ Get all Kurse
 */
kursRouter.get("/", async (req, res) => {
  try {
    const kurse = await prisma.kurs.findMany();
    res.status(200).json(kurse);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Es ist ein Fehler beim Laden der Kurse aufgetreten.",
    });
  }
});

/**
 * @api {get} /kurse/:id Get Kurs by ID
 */
kursRouter.get("/:id", async (req, res) => {
  try {
    const kurs = await prisma.kurs.findUnique({
      where: { id: req.params.id },
    });
    res.status(200).json(kurs);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Es ist ein Fehler beim Laden des Kurses aufgetreten.",
    });
  }
});

/**
 * @api {post} /kurse/:id Create Kurs
 */
kursRouter.post("/", async (req, res) => {
  try {
    const kurs = await prisma.kurs.create({
      data: {
        name: req.body.name,
        studienende: new Date(req.body.studienende),
      },
    });
    res.status(201).json(kurs);
  } catch (error) {
    res.status(400).json({
      message: "Es ist ein Fehler beim Erstellen des Kurses aufgetreten.",
    });
  }
});

/**
 * @api {put} /kurse/:id Update Kurs
 */
kursRouter.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const kurs = await prisma.kurs.update({
      where: {
        id: id,
      },
      data: {
        name: req.body.name,
        jahrgang: req.body.jahrgang,
      },
    });
    res.status(201).json(kurs);
  } catch (error) {
    res.status(400).json({
      message: "Es ist ein Fehler beim Bearbeiten des Kurses aufgetreten.",
    });
  }
});

/**
 * @api {delete} /kurse/:id Delete Kurs
 */
kursRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // await prisma.pruefungstermin.deleteMany({ where: { kurs: { id: id } } });

    const kurs = await prisma.kurs.delete({ where: { id: id } });

    res.status(200).json(kurs);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Es ist ein Fehler beim Löschen des Kurses aufgetreten.",
    });
  }
});

export default kursRouter;

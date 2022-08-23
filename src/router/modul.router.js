import express from "express";
import prisma from "../utils/prisma";

const modulRouter = express.Router();

/**
 * @api {get} /modul/ Get all Modul
 */
modulRouter.get("/", async (req, res) => {
  try {
    const modul = await prisma.modul.findMany();
    res.json(modul);
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: "Es ist ein Fehler beim Laden des Moduls aufgetreten.",
    });
  }
});

/**
 * @api {get} /modul/:id Get Modul by ID
 */
modulRouter.get("/:id", async (req, res) => {
  try {
    const modul = await prisma.modul.findUnique({
      where: { id: req.params.id },
    });
    res.json(modul);
  } catch (error) {
    res.status(400).json({
      message: "Es ist ein Fehler beim Laden des Moduls aufgetreten.",
    });
  }
});

/**
 * @api {get} /modul/kurs/:kursId Get Module by Kurs ID
 */
modulRouter.get("/kurs/:kursId", async (req, res) => {
  try {
    const modul = await prisma.modul.findMany({
      where: { kursId: req.params.kursId },
    });
    res.json(modul);
  } catch (error) {
    res.status(400).json({
      message: "Es ist ein Fehler beim Laden des Moduls aufgetreten.",
    });
  }
});

/**
 * @api {post} /modul/:id Create Modul
 */
modulRouter.post("/", async (req, res) => {
  try {
    const modul = await prisma.modul.create({
      data: {
        name: req.body.name,
        vorlesungen: req.body.vorlesungen,
      },
    });
    res.json(modul);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Es ist ein Fehler beim Erstellen des Moduls aufgetreten.",
    });
  }
});

/**
 * @api {put} /modul/:id Update Modul
 */
modulRouter.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const modul = await prisma.modul.update({
      where: { id: id },
      data: {
        name: req.body.name,
        vorlesungen: req.body.vorlesungen,
        aktiv: req.body.aktiv,
      },
    });
    res.json(modul);
  } catch (error) {
    res.status(400).json({
      message: "Es ist ein Fehler beim Laden des Moduls aufgetreten.",
    });
  }
});

/**
 * @api {delete} /modul/:id Delete Modul
 */
modulRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const modul = await prisma.modul.delete({
      where: { id: id },
    });
    res.json(modul);
  } catch (error) {
    res.status(400).json({
      message: "Es ist ein Fehler beim Laden des Moduls aufgetreten.",
    });
  }
});

export default modulRouter;

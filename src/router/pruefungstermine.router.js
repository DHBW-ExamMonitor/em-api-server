import express from "express";
import prisma from "../utils/prisma";

const pruefungsterminRouter = express.Router();

/**
 * @api {get} /pruefungstermin/ Get all Pruefungstermine
 */
pruefungsterminRouter.get("/", async (req, res) => {
  try {
    const pruefungstermin = await prisma.pruefungstermin.findMany({
      include: {
        modul: true,
      },
    });
    res.json(pruefungstermin);
  } catch (error) {
    res.json({
      message: "Es ist ein Fehler beim Laden der Pruefungstermine aufgetreten.",
    });
  }
});

/**
 * @api {get} /pruefungstermin/:id Get Pruefungstermin by ID
 */
pruefungsterminRouter.get("/:id", async (req, res) => {
  try {
    const pruefungstermin = await prisma.pruefungstermin.findUnique({
      where: { id: req.params.id },
    });
    res.json(pruefungstermin);
  } catch (error) {
    res.json({
      message: "Es ist ein Fehler beim Laden der Pruefungstermin aufgetreten.",
    });
  }
});

/**
 * @api {get} /pruefungstermin/modul/:modulId Get Pruefungstermin by Modul ID
 */
pruefungsterminRouter.get("/modul/:modulId", async (req, res) => {
  try {
    const pruefungstermin = await prisma.pruefungstermin.findMany({
      where: { modulId: req.params.modulId },
    });
    res.json(pruefungstermin);
  } catch (error) {
    res.json({
      message: "Es ist ein Fehler beim Laden der Pruefungstermine aufgetreten.",
    });
  }
});

/**
 * @api {get} /pruefungstermin/kurs/:kursId Get Pruefungstermin which includes the Kurs ID
 */
pruefungsterminRouter.get("/kurs/:kursId", async (req, res) => {
  try {
    const pruefungstermin = await prisma.pruefungstermin.findMany({
      where: { kurse: { some: { id: req.params.kursId } } },
    });
    res.json(pruefungstermin);
  } catch (error) {
    res.json({
      message: "Es ist ein Fehler beim Laden der Pruefungstermine aufgetreten.",
    });
  }
});

/**
 * @api {get} /pruefungstermin/next/:days Get Pruefungstermine for next month
 */
pruefungsterminRouter.get("/next/:days", async (req, res) => {
  try {
    const pruefungstermin = await prisma.pruefungstermin.findMany({
      where: {
        dateTime: {
          gte: new Date(Date.now()),
          lt: new Date(Date.now() + 86400000 * req.params.days),
        },
      },
    });
    res.json(pruefungstermin);
  } catch (error) {
    res.json({
      message: "Es ist ein Fehler beim Laden der Pruefungstermine aufgetreten.",
    });
  }
});

/**
 * @api {post} /pruefungstermin/until Get Pruefungstermine until date
 */
pruefungsterminRouter.get("/until/:datetime", async (req, res) => {
  const date = new Date(req.params.datetime);

  try {
    if (date < new Date(Date.now())) {
      throw new Error("Das Datum darf nicht in der Vergangenheit liegen.");
    }
    const pruefungstermin = await prisma.pruefungstermin.findMany({
      where: {
        dateTime: { gte: new Date(Date.now()), lt: new Date(date) },
      },
    });
    res.json(pruefungstermin);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Es ist ein Fehler beim Laden der Pruefungstermine aufgetreten.",
    });
  }
});

/**
 * @api {post} /pruefungstermin/ Create Pruefungstermin
 */
pruefungsterminRouter.post("/", async (req, res) => {
  const pruefungstermin = req.body;

  try {
    const modul = pruefungstermin.modul;
    const pt = pruefungstermin;
    pt.dateTime = new Date(pt.dateTime);
    delete pt.modul;

    const newPruefungstermin = await prisma.pruefungstermin.create({
      data: {
        ...pt,
        modul: {
          connect: {
            id: modul,
          },
        },
      },
    });
    res.json(newPruefungstermin);
  } catch (error) {
    console.log(error);
    res.json({
      message:
        "Es ist ein Fehler beim Erstellen des Pruefungstermins aufgetreten.",
    });
  }
});

/**
 * @api {put} /pruefungstermin/:id Update Pruefungstermin
 */
pruefungsterminRouter.put("/:id", async (req, res) => {
  const pruefungstermin = req.body;

  try {
    const updatedPruefungstermin = await prisma.pruefungstermin.update({
      where: { id: req.params.id },
      data: {
        ...pruefungstermin,
      },
    });
    res.json(updatedPruefungstermin);
  } catch (error) {
    console.log(error);
    res.json({
      message:
        "Es ist ein Fehler beim Updaten des Pruefungstermins aufgetreten.",
    });
  }
});

/**
 * @api {delete} /pruefungstermin/:id Delete Pruefungstermin
 */
pruefungsterminRouter.delete("/:id", async (req, res) => {
  try {
    const deletedPruefungstermin = await prisma.pruefungstermin.delete({
      where: { id: req.params.id },
    });
    res.json(deletedPruefungstermin);
  } catch (error) {
    console.log(error);
    res.json({
      message:
        "Es ist ein Fehler beim Löschen des Pruefungstermins aufgetreten.",
    });
  }
});

export default pruefungsterminRouter;

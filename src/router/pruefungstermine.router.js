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
        kurse: true,
      },
    });
    res.json(pruefungstermin);
  } catch (error) {
    res.status(400).json({
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
      include: {
        modul: true,
        kurse: true,
      },
    });
    res.json(pruefungstermin);
  } catch (error) {
    res.status(400).json({
      message: "Es ist ein Fehler beim Laden der Pruefungstermin aufgetreten.",
    });
  }
});

/**
 * @api {get} /pruefungstermin/:id Get all Teilnahmen by Pruefungstermin ID
 */
pruefungsterminRouter.get("/:id/teilnahmen", async (req, res) => {
  try {
    const pruefungstermin = await prisma.pruefungstermin.findUnique({
      where: { id: req.params.id },
    });
    const teilnahmen = await prisma.pruefungsteilnahme.findMany({
      where: { pruefungsterminId: pruefungstermin.id },
      include: {
        student: true,
      },
    });

    const temp = [];

    for (const teilnahme of teilnahmen) {
      temp.push({
        Student: teilnahme.student.name,
        Pruefungstermin: pruefungstermin.name,
        Versuch: teilnahme.versuch,
        Status: teilnahme.pruefungsteilnahmeStatus,
        Notizen: teilnahme.notizen,
        Anwesend: "",
      });
    }

    res.status(200).json(temp);
  } catch (error) {
    console.error(error);
    res.status(400).json({
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
      include: {
        kurse: true,
      },
    });
    res.status(200).json(pruefungstermin);
  } catch (error) {
    res.status(400).json({
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
    res.status(400).json({
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
    res.status(400).json({
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
    res.status(400).json({
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
    const kurse = pruefungstermin.kurse;
    const pt = pruefungstermin;
    pt.dateTime = new Date(pt.dateTime);
    delete pt.modul;
    delete pt.kurse;

    const newPruefungstermin = await prisma.pruefungstermin.create({
      data: {
        ...pt,
        modul: {
          connect: {
            id: modul,
          },
        },
        kurse: {
          connect: kurse.map((kurs) => ({ id: kurs })),
        },
      },
    });
    res.json(newPruefungstermin);
  } catch (error) {
    console.log(error);
    res.status(400).json({
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
    const modul = pruefungstermin.modul;
    const kurse = pruefungstermin.kurse;
    const pt = pruefungstermin;
    pt.dateTime = new Date(pt.dateTime);
    delete pt.modul;

    const currentPruefungstermin = await prisma.pruefungstermin.findUnique({
      where: { id: req.params.id },
      include: {
        kurse: true,
      },
    });

    const removedKurse = [];

    for (const kurs of currentPruefungstermin.kurse) {
      if (!pt.kurse.includes(kurs.id)) {
        removedKurse.push(kurs.id);
      }
    }

    for (const kurs of removedKurse) {
      const deleteKurs = await prisma.kurs.findUnique({
        where: { id: kurs },
        include: {
          studenten: true,
        },
      });

      const studentenIds = deleteKurs.studenten.map((item) => {
        return item.id;
      });

      await prisma.pruefungsteilnahme.deleteMany({
        where: {
          studentId: {
            in: studentenIds,
          },
          pruefungsterminId: req.params.id,
        },
      });
    }

    delete pt.kurse;

    const updatedPruefungstermin = await prisma.pruefungstermin.update({
      where: { id: req.params.id },
      data: {
        ...pruefungstermin,
        modul: {
          connect: {
            id: modul,
          },
        },
        kurse: {
          set: kurse.map((kurs) => ({ id: kurs })),
        },
      },
    });

    res.status(200).json(updatedPruefungstermin);
  } catch (error) {
    console.log(error);
    res.status(400).json({
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
    res.status(400).json({
      message:
        "Es ist ein Fehler beim Löschen des Pruefungstermins aufgetreten.",
    });
  }
});

export default pruefungsterminRouter;

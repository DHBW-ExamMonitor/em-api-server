import express from "express";
import prisma from "../utils/prisma";

const pruefungsteilnahmeRouter = express.Router();

/**
 * @api {get} /pruefungsteilnahme/ Get all Pruefungsteilnahmen
 */
pruefungsteilnahmeRouter.get("/", async (req, res) => {
  try {
    const pruefungsteilnahme = await prisma.pruefungsteilnahme.findMany({
      orderBy: {
        dateTime: "desc",
      },
    });
    res.status(200).json(pruefungsteilnahme);
  } catch (error) {
    res.status(400).json({
      message:
        "Es ist ein Fehler beim Laden der Pruefungsteilnahmen aufgetreten.",
    });
  }
});

/**
 * @api {get} /pruefungsteilnahme/:id Get Pruefungsteilnahme by ID
 */
pruefungsteilnahmeRouter.get("/:id", async (req, res) => {
  try {
    const pruefungsteilnahme = await prisma.pruefungsteilnahme.findUnique({
      where: { id: req.params.id },
    });
    res.json(pruefungsteilnahme);
  } catch (error) {
    res.status(400).json({
      message:
        "Es ist ein Fehler beim Laden der Pruefungsteilnahme aufgetreten.",
    });
  }
});

/**
 * @api {get} /pruefungsteilnahme/pruefung/:pruefungId Get Pruefungsteilnahme by Pruefung ID
 */
pruefungsteilnahmeRouter.get(
  "/pruefung/:pruefungsterminId",
  async (req, res) => {
    try {
      const pruefungsteilnahme = await prisma.pruefungsteilnahme.findMany({
        where: { pruefungsterminId: req.params.pruefungsterminId },
      });
      res.json(pruefungsteilnahme);
    } catch (error) {
      res.status(400).json({
        message:
          "Es ist ein Fehler beim Laden der Pruefungsteilnahme aufgetreten.",
      });
    }
  }
);

/**
 * @api {get} /pruefungsteilnahme/student/:studentId Get Pruefungsteilnahme by Student ID
 */
pruefungsteilnahmeRouter.get("/student/:studentId", async (req, res) => {
  try {
    const pruefungsteilnahme = await prisma.pruefungsteilnahme.findMany({
      where: { studentId: req.params.studentId },
    });
    res.json(pruefungsteilnahme);
  } catch (error) {
    res.status(400).json({
      message:
        "Es ist ein Fehler beim Laden der Pruefungsteilnahme aufgetreten.",
    });
  }
});

/**
 * @api {get} /pruefungsteilnahme/studenten Get Students by Versuch
 */
pruefungsteilnahmeRouter.get("/:id/studenten", async (req, res) => {
  const versuche = ["ERSTVERSUCH", "ZWEITVERSUCH", "DRITTVERSUCH"];

  const versuch = req.body.versuch;

  try {
    if (!versuche.includes(versuch)) {
      throw new Error();
    }

    const pruefungsteilnahme = await prisma.pruefungsteilnahme.findMany({
      where: { versuch: versuch },
    });

    const students = [];

    pruefungsteilnahme.forEach(async (pruefungsteilnahme) => {
      const student = await prisma.student.findUnique({
        where: { id: pruefungsteilnahme.studentId },
      });
      students.push(student);
    });

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message:
        "Es ist ein Fehler beim Laden der Studenten der Prüfungsteilnahme aufgetreten.",
    });
  }
});

/**
 * @api {post} /pruefungsteilnahme/ Create Pruefungsteilnahme
 */
pruefungsteilnahmeRouter.post("/", async (req, res) => {
  try {
    const { pruefungsterminId, studentId, versuch, pruefungsteilnahmeStatus } =
      req.body;
    const exists = await prisma.pruefungsteilnahme.findFirst({
      where: {
        pruefungsterminId: pruefungsterminId,
        studentId: studentId,
      },
    });
    if (!exists) {
      const pruefungsteilnahme = await prisma.pruefungsteilnahme.create({
        data: {
          versuch,
          pruefungsteilnahmeStatus,
          pruefungstermin: {
            connect: {
              id: pruefungsterminId,
            },
          },
          student: {
            connect: {
              id: studentId,
            },
          },
        },
      });
      res.status(201).json(pruefungsteilnahme);
    } else {
      res.status(201).json({
        message: "Prüfungsteilnahme existiert bereits.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message:
        "Es ist ein Fehler beim Erstellen der Pruefungsteilnahme aufgetreten.",
    });
  }
});

// /**
//  *
//  */
//  pruefungsteilnahmeRouter.get("/:id/teilnehmerliste", async (req, res) => {
//   const list = req.body;
//   console.log(list);
//   // const student = await prisma.student.findMany({
//   //   where: { id: { in: list } },
//   // });
//   // console.log(student);
//   // res.status(200).json(student);
// });

/**
 * @api {put} /pruefungsteilnahme/:id Update Pruefungsteilnahme
 */
pruefungsteilnahmeRouter.put("/:id", async (req, res) => {
  try {
    const pruefungsteilnahme = await prisma.pruefungsteilnahme.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
      },
    });
    res.json(pruefungsteilnahme);
  } catch (error) {
    res.status(400).json({
      message:
        "Es ist ein Fehler beim Updaten der Pruefungsteilnahme aufgetreten.",
    });
  }
});

/**
 * @api {delete} /pruefungsteilnahme/:id Delete Pruefungsteilnahme
 */
pruefungsteilnahmeRouter.delete("/:id", async (req, res) => {
  try {
    const pruefungsteilnahme = await prisma.pruefungsteilnahme.delete({
      where: { id: req.params.id },
    });
    res.json(pruefungsteilnahme);
  } catch (error) {
    res.status(400).json({
      message:
        "Es ist ein Fehler beim Löschen der Pruefungsteilnahme aufgetreten.",
    });
  }
});

export default pruefungsteilnahmeRouter;

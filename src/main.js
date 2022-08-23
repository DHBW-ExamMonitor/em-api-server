import app from "./app";
import router from "./router";

app.use("/status", router.statusRouter);
app.use("/kurse", router.kursRouter);
app.use("/module", router.modulRouter);
app.use("/studenten", router.studentenRouter);
app.use("/pruefungsteilnahme", router.pruefungsteilnahmeRouter);
app.use("/pruefungstermine", router.pruefungstermineRouter);

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(
    `🚀 Server ready at: ${process.env.HOST ?? "http://localhost"}:${
      process.env.PORT
    }`
  )
);

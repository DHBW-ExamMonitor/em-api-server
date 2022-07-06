import app from "./app";
import router from "./router";

app.use("/kurse", router.kursRouter);
app.use("/module", router.modulRouter);
app.use("/studenten", router.studentenRouter);

app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(
    `🚀 Server ready at: ${process.env.HOST ?? "http://localhost"}:${
      process.env.PORT
    }`
  )
);

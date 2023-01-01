const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/mean", (req, res) => {
  const arr = req.query.nums.split(",");
  const result = arr.reduce((acc, curr) => Number(acc) + Number(curr));
  return res.json({ operation: "mean", result: result / arr.length });
});

app.get("/mode", (req, res) => {
  const arr = req.query.nums.split(",");
  const result = arr.reduce((acc, curr) => {
    acc[curr] = ++acc[curr] || 1;
    return acc;
  }, {});
  return res.json({
    operation: "mode",
    result:
      Object.keys(result)[
        Object.values(result).findIndex(
          (el) => el === Math.max(...Object.values(result))
        )
      ],
  });
});

app.get("/median", (req, res) => {
  const arr = req.query.nums.split(",");
  const result = arr.sort();
  return res.json({
    operation: "median",
    result:
      result.length % 2 === 0
        ? "Must be odd number in nums"
        : result[result.length / 2 - 0.5],
  });
});

app.listen(3000, () => console.log("live on port 3000"));

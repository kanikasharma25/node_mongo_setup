const app = require("./app");

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in server creation");
  } else {
    console.log(`Server running on port = ${PORT}`);
  }
});

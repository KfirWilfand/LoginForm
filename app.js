routes = require("./modules/routes");
const port = process.env.PORT || 3000;

//listen
routes.listen(port, () => console.log(`app listening on port ${port}!`));

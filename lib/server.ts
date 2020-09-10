import app from "./config/app";
import env from "./env";

const SERVER_HOSTNAME = env.getHostName();
const SERVER_PORT = env.getPort();

app.listen(SERVER_PORT, SERVER_HOSTNAME, () => {
  console.log("Server listening on " + SERVER_HOSTNAME + ":" + SERVER_PORT);
});

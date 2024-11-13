import app from "./app.js";
import config from "./utils/config.js";
import logger from "./utils/logger.js";

const PORT = config.env.PORT || 3001;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

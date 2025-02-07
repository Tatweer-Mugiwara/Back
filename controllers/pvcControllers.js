import AppError from "../utils/AppError.js";
import { exec } from "child_process";

const getShortestPath = async (req, res, next) => {
  try {
    const { list, matrix } = req.body;
    exec(
      `bash /pvc.sh ${JSON.stringify(list)} ${JSON.stringify(matrix)}`,
      (error, stdout, stderr) => {
        if (error) {
          throw new AppError("Error executing script", 500);
        }
        if (stderr) {
          throw new AppError(`Script error: ${stderr}`, 500);
        }
        const result = stdout;
        res.status(200).json({ result });
      }
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default { getShortestPath };

import AppError from "../utils/AppError.js";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const getShortestPath = async (req, res, next) => {
  try {
    const { cities, matrix } = req.body;
    // generate a random filename
    const randomFileName = `input_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}.json`;
    const tempFilePath = path.join("/tmp", randomFileName);
    const inputData = { cities, matrix };

    fs.writeFileSync(tempFilePath, JSON.stringify(inputData));

    exec(
      `/bin/bash /home/f100w/tatweer/Back/scripts/pvc.sh ${tempFilePath}`,
      { timeout: 30000 }, // Increase timeout to 30 seconds
      (error, stdout, stderr) => {
        fs.unlinkSync(tempFilePath); // Clean up the temporary file
        if (error) {
          if (error.killed) {
            return next(new AppError("Script execution timed out", 500));
          }
          return next(
            new AppError(`Error executing script: ${error.message}`, 500)
          );
        }
        if (stderr) {
          return next(new AppError(`Script error: ${stderr}`, 500));
        }
        let result;
        try {
          result = JSON.parse(stdout);
        } catch (parseError) {
          return next(new AppError("Failed to parse script output", 500));
        }
        res
          .status(200)
          .json({ tsp_path: result.tsp_path, cost: result.tsp_cost });
      }
    );
  } catch (error) {
    next(error);
  }
};

export default { getShortestPath };

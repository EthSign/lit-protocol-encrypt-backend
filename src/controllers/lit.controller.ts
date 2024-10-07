import { Request, Response } from "express";
import { LitInput, LitParamsInput } from "../schemas/lit.schema";

export const litController = async (req: Request<{}, {}, LitInput>, res: Response) => {
  try {
    let { message } = req.body;
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message
      }
    });
  }
};

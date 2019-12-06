import connectDb from "../middleware/connectDbMiddleware";
import mongoose from "mongoose";
// import { Code } from "../../../models";

const Code = mongoose.model("Code");

const handler = async (req: any, res: any) => {
  const { method } = req;
  if (req.body) {
    req.body = JSON.parse(req.body);
  }

  switch (method) {
    case "GET": {
      const code = await Code.findOne({
        user: req.query.userId,
        challengeName: req.query.challengeName
      }).exec();
      if (code) {
        res.status(200).json(code);
      } else {
        res.status(500);
      }
      break;
    }

    case "PUT": {
      const code = await Code.findOneAndUpdate(
        {
          user: req.body.userId,
          challengeName: req.body.challengeName
        },
        { code: req.body.code, tests: req.body.tests },
        { new: true, upsert: true }
      ).exec();
      if (code) {
        res.status(200).json(code);
      } else {
        res.status(500);
      }
      break;
    }
    default:
      res.setHeader("Allow", ["PUT", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default connectDb(handler);

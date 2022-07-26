import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
  const { method, body } = req;
  const { db } = await connectToDatabase();

  if (method === "GET") {
    try {
      const stats = await db.collection("viewStats").find({id: body.id}).toArray();
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      };
      const stats = await db.collection("viewStats").findOneAndUpdate(
        { id: body.id },
        {
          $inc: {
            view: 1,
          },
        },
        options
      );
      res.status(201).json(stats);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

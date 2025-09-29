import mongoose = require("mongoose");


interface noteProps {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
}

exports.createNote = async (req: Request, res: Response) => {
  const { userId, title, content }: noteProps = req.body;

  if (!userId || !title || !content) {
    return res.json();
  }

  try {
    const res = await userNotes.create({

    })
  } catch (error) {}
};

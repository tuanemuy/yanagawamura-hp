import type { NextApiRequest, NextApiResponse } from "next";

type Result = {
  error: string | null;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  res.status(200).json({ error: null });
}

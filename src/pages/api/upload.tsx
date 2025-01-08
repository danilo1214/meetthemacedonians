import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import type { NextApiResponse, NextApiRequest } from "next";
import { getServerAuthSession } from "~/server/auth/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = req.body as HandleUploadBody;

  const session = await getServerAuthSession({ req, res });
  if (!session) {
    return res.status(401);
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/gif"],
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("blob upload completed", blob, tokenPayload);
      },
    });

    return res.status(200).json(jsonResponse);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
}

import auth0 from "../../../lib/auth0";

export default async function callback(req: any, res: any) {
  try {
    await auth0.handleCallback(req, res, { redirectUri: "/" });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}

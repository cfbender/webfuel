import { evalJS } from "../../lib/evalJS";

export default async function test(req: any, res: any) {
  let fnData = JSON.parse(req.body);
  let code = fnData.code;
  let name = fnData.name;
  let tests = fnData.tests;

  try {
    let result = await evalJS({ code, name, tests });
    res.json(JSON.stringify(result));
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

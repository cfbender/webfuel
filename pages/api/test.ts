import { evalJS } from "../../lib/evalJS";

export default async function test(req: any, res: any) {
  let fnData = JSON.parse(req.body);
  let code = fnData.code;
  let name = fnData.name;
  let tests = req.query.submit
    ? `
  expect(flatten([1, 2, [3, 4, [5, 6], 7, 8], 9, 10])).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(flatten([])).to.eql([]);
  expect(flatten([1])).to.eql([1]);
  expect(flatten([[[[[[5]]]]]])).to.eql([5]);
  `
    : fnData.tests;

  console.log(tests);
  try {
    let result = await evalJS({ code, name, tests });
    res.json(JSON.stringify(result));
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

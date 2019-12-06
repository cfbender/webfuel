import { evalJS } from "../../lib/evalJS";

export default async function test(req: any, res: any) {
  let { code, tests } = JSON.parse(req.body);

  tests = req.query.submit
    ? `
  expect(flatten([1, 2, [3, 4, [5, 6], 7, 8], 9, 10])).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  expect(flatten([])).to.eql([]);
  expect(flatten([1])).to.eql([1]);
  expect(flatten([[[[[[5]]]]]])).to.eql([5]);
  `
    : tests;
  try {
    let result = await evalJS({ code, tests });
    if (result.result instanceof Error) {
      result.result = result.result.toString();
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

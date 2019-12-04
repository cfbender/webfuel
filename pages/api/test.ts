import { NodeVM } from "vm2";

export default async function test(req: any, res: any) {
  const vm = new NodeVM({
    console: "inherit",
    sandbox: {},
    require: {
      external: true
    }
  });

  let fnData = JSON.parse(req.body);
  let code = fnData.code;
  let fnName = fnData.name;
  let tests = fnData.tests;

  try {
    let result = await vm.run(
      //@ts-ignore
      `const chai = require('chai'); 
        ${code} 
      
        try{
            const tests = ${JSON.stringify(tests)};

            tests.forEach((test) => {
                  chai.expect(${fnName}(test.input)).to.eql(test.output);
                }); 

            module.exports = {passed: true}
        } catch(error){
            module.exports = error
            }`,
      "test.ts"
    );
    console.log(result);
    res.json(JSON.stringify(result));
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

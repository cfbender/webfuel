import { NodeVM } from "vm2";

export async function evalJS(
  { code, name, tests }: { code: string; name: string; tests: string },
  timeout = 10000
) {
  const vm = new NodeVM({
    console: "inherit",
    sandbox: {},
    require: {
      external: true
    },
    timeout
  });

  let result = await vm.run(
    //@ts-ignore
    `const chai = require('chai'); 
        ${code} 
      
        try{
            const tests = ${JSON.stringify(tests)};

            tests.forEach((test) => {
                  chai.expect(${name}(test.input)).to.eql(test.output);
                }); 

            module.exports = {passed: true}
        } catch(error){
            module.exports = error
            }`,
    "test.ts"
  );
  return result;
}

import { NodeVM } from "vm2";

export async function evalJS(
  { code, tests }: { code: string; tests: string },
  timeout = 10000
) {
  const vm = new NodeVM({
    console: "redirect",
    sandbox: {},
    require: {
      external: true
    },
    timeout
  });
  let logs: any[] = [];
  vm.on("console.log", data => {
    logs.push(data);
  });
  let result = await vm.run(
    //@ts-ignore
    `const {expect} = require('chai'); 
        ${code} 
      
        try{
            ${tests}
            
            module.exports = {passed: true}
        } catch(error){
            module.exports = error
            }`,
    "test.ts"
  );

  return { result, logs };
}

import { addTripInfo } from "../src/client/js/addTripInfo.js";
  
describe("Testing the submit functionality", () => {
    test("Testing the addTripInfo() function", () => {
        expect(addTripInfo).toBeDefined();
    })
});
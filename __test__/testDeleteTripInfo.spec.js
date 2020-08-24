import { deleteTripInfo } from "../src/client/js/deleteTripInfo.js";
  
describe("Testing the submit functionality", () => {
    test("Testing the deleteTripInfo() function", () => {
        expect(deleteTripInfo).toBeDefined();
    })
});
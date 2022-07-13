import { stringDayToNumber } from "../../helpers";

describe("test helper stringDayToNumber", () => {
  test("should return number of string day", () => {
    const numberOfSunday = stringDayToNumber("domingo");
    const numberOfMonday = stringDayToNumber("lunes");
    const numberOfTuesday = stringDayToNumber("martes");
    const numberOfWednesday = stringDayToNumber("miercoles");
    const numberOfThursday = stringDayToNumber("jueves");
    const numberOfFriday = stringDayToNumber("viernes");
    const numberOfSaturday = stringDayToNumber("sabado");
    const numberOfDefaultDay = stringDayToNumber("random");

    expect(numberOfSunday).toBe(0);
    expect(numberOfMonday).toBe(1);
    expect(numberOfTuesday).toBe(2);
    expect(numberOfWednesday).toBe(3);
    expect(numberOfThursday).toBe(4);
    expect(numberOfFriday).toBe(5);
    expect(numberOfSaturday).toBe(6);
    expect(numberOfDefaultDay).toBe(7);
  });
});

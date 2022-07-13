import { numberDayToString } from "../../helpers";

describe("test numberDayToString ", () => {
  test("should return string name of day number", () => {
    const stringOfSunday = numberDayToString(0);
    const stringOfMonday = numberDayToString(1);
    const stringOfTuesday = numberDayToString(2);
    const stringOfWednesday = numberDayToString(3);
    const stringOfThursday = numberDayToString(4);
    const stringOfFriday = numberDayToString(5);
    const stringOfSaturday = numberDayToString(6);

    expect(stringOfSunday).toBe("domingo");
    expect(stringOfMonday).toBe("lunes");
    expect(stringOfTuesday).toBe("martes");
    expect(stringOfWednesday).toBe("miercoles");
    expect(stringOfThursday).toBe("jueves");
    expect(stringOfFriday).toBe("viernes");
    expect(stringOfSaturday).toBe("sabado");
  });
});

import { numbersOfDaysToDelete } from "../../helpers";
import {
  responseAvailableDaysFilled,
  responseAvailableDaysPartialFilled,
} from "../fixtures";

describe("test helper stringDayToNumber", () => {
  test("should return array of numbers which will be deleted ", () => {
    /**
     * 1 - lunes
     * 3 - miércoles
     * 5 - viernes
     */
    const numbersToDelete = numbersOfDaysToDelete(
      responseAvailableDaysPartialFilled,
    );

    expect(numbersToDelete).toEqual([0, 2, 4, 6]);
  });

  test("should return a empty array ", () => {
    const numbersToDelete = numbersOfDaysToDelete(responseAvailableDaysFilled);

    expect(numbersToDelete).toEqual([]);
  });
});

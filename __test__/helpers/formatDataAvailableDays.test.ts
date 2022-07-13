import { formatDataAvailableDays } from "../../helpers/formatDataAvailableDays";
import { responseRawAvailableDaysPartialFilled } from "../fixtures";

describe("test formatDataAvailableDays", () => {
  test("should return important data from availabledays", () => {
    const expectedData = [
      {
        day: responseRawAvailableDaysPartialFilled[0].day,
        hours: responseRawAvailableDaysPartialFilled[0].hours,
      },
      {
        day: responseRawAvailableDaysPartialFilled[1].day,
        hours: responseRawAvailableDaysPartialFilled[1].hours,
      },
      {
        day: responseRawAvailableDaysPartialFilled[2].day,
        hours: responseRawAvailableDaysPartialFilled[2].hours,
      },
    ];
    const formatedData = formatDataAvailableDays(
      responseRawAvailableDaysPartialFilled,
    );

    expect(formatedData).toEqual(expectedData);
  });
});

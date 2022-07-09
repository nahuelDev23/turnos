import { Button, Checkbox, Stack } from "@chakra-ui/react";
import { useState } from "react";

import { IDaysHours } from "../../interface/IAvailableDays";

export const SetDaysAvailable = () => {
  const [formAvailableDays, setFormAvailableDays] = useState<IDaysHours[]>([]);
  const onChange = (e: any) => {
    setFormAvailableDays((formAvailableDays) => {
      // if (formAvailableDays.include(e.target.value)) return;
      if (e.target.checked) {
        return [
          ...formAvailableDays,

          {
            day: e.target.value,
            hours: [
              {
                time: "10:00:00",
              },
              {
                time: "10:30:00",
              },
              {
                time: "11:30:00",
              },
            ],
          },
        ];
      } else {
        return formAvailableDays.filter(
          (item: any) => item.day !== e.target.value,
        );
      }
    });
  };

  const submitSetDays = (event: any) => {
    event.preventDefault();
    console.log(formAvailableDays);

    fetch("/api/availableDays", {
      method: "POST",
      body: JSON.stringify(formAvailableDays),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("then fecth", data);

        if (!data.ok) {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);

        // setSuccess(null);
        // setError(err.message);
      });
  };

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <form onSubmit={submitSetDays}>
          <Checkbox value="domingo" onChange={onChange}>
            Domingo
          </Checkbox>
          <Checkbox value="lunes" onChange={onChange}>
            Lunes
          </Checkbox>
          <Checkbox value="martes" onChange={onChange}>
            Martes
          </Checkbox>
          <Checkbox value="miercoles" onChange={onChange}>
            Miercoles
          </Checkbox>
          <Checkbox value="jueves" onChange={onChange}>
            Jueves
          </Checkbox>
          <Checkbox value="viernes" onChange={onChange}>
            Viernes
          </Checkbox>
          <Checkbox value="sabado" onChange={onChange}>
            Sabado
          </Checkbox>
          <Button type="submit">Setear</Button>
        </form>
      </Stack>
    </Stack>
  );
};

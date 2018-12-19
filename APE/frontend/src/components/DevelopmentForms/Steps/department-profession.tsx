import { FormControl, InputLabel, Typography } from "@material-ui/core";
import CustomizedInput from "../../General/CustomizedInput";
import * as React from "react";

interface Props {
  department: string;
  profession: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export const DepartmentProfession = (props: Props) => {
  const { department, profession, onChange } = props;
  return (
    <div className={"step1"}>
      <Typography variant={"subtitle2"} className={"TaskDescription"}>
        Gib den Ausbildungsberuf und die Abteilung an, für den der Entwicklungsbogen benutzt werden
        soll
      </Typography>

      <div className={"step1Form"}>
        <FormControl className={"DepartmentForm"}>
          <InputLabel shrink htmlFor="bootstrap-input">
            <Typography variant={"subtitle1"}>Abteilung</Typography>
          </InputLabel>
          <CustomizedInput name={"department"} value={department} onChange={onChange} />
        </FormControl>

        <FormControl className={"ProfessionForm"}>
          <InputLabel shrink htmlFor="bootstrap-input">
            <Typography variant={"subtitle1"}>Ausbildungsberuf</Typography>
          </InputLabel>
          <CustomizedInput name={"profession"} value={profession} onChange={onChange} />
        </FormControl>
      </div>
    </div>
  );
};

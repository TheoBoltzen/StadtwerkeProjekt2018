import { FillDevelopmentSheetComponent } from "./FillOutDevelopmentSheetComponent";
import { FullDevSheetFetch } from "../../types";

export interface State {
  radioValue: { name: string; value: string }[];
}

interface Props {
  readonly loading: boolean;
  readonly fullDevSheet: FullDevSheetFetch;
}

export type AllProps = Props;

const connectedFillOutDevelopmentSheet = FillDevelopmentSheetComponent;
export { connectedFillOutDevelopmentSheet as FillOutDevelopmentSheet };

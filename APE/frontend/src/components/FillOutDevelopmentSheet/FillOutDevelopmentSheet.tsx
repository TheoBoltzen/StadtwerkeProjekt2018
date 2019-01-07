import { FillDevelopmentSheetComponent } from "./FillOutDevelopmentSheetComponent";
import { EmptyDevSheetFetch } from "../../types";

export interface State {
  radioValue: { name: string; value: string }[];
}

interface Props {
  readonly loading: boolean;
  readonly fullDevSheet: EmptyDevSheetFetch;
}

export type AllProps = Props;

const connectedFillOutDevelopmentSheet = FillDevelopmentSheetComponent;
export { connectedFillOutDevelopmentSheet as FillOutDevelopmentSheet };

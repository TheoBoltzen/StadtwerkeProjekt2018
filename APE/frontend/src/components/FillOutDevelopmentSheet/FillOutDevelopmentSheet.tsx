import { FillDevelopmentSheetComponent } from "./FillOutDevelopmentSheetComponent";

export interface State {
  radioValue: { name: string; value: string }[];
}

export interface Props {}

export type AllProps = Props;

const connectedFillOutDevelopmentSheet = FillDevelopmentSheetComponent;
export { connectedFillOutDevelopmentSheet as FillOutDevelopmentSheet };

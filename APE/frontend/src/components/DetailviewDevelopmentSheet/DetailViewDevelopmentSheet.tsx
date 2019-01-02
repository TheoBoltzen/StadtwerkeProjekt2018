import { EmptyDevSheetFetch } from "../../types";
import { DetailviewDevelopmentSheetComponent } from "./DetailviewDevelopmentSheetComponent";

interface Props {
  readonly id?: string;
  readonly close?: any;
  readonly devSheetDetail?: EmptyDevSheetFetch | null;
}

export type AllProps = Props;

const connectDetailViewDevelopmentSheet = DetailviewDevelopmentSheetComponent;

export { connectDetailViewDevelopmentSheet as DetailViewDevelopmentSheet };

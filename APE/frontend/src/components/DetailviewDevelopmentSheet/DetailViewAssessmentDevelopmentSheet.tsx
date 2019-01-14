import { FullDevSheetFetch } from "../../types";
import { DetailviewAssessmentDevelopmentSheetComponent } from "./DetailviewAssessmentDevelopmentSheetComponent";

interface Props {
  readonly id?: string;
  readonly close?: any;
  readonly fullDevSheetDetail: FullDevSheetFetch;
  readonly loading?: boolean;
}

export type AllProps = Props;

const connectDetailViewAssessmentDevelopmentSheet = DetailviewAssessmentDevelopmentSheetComponent;

export { connectDetailViewAssessmentDevelopmentSheet as DetailViewAssessmentDevelopmentSheet };

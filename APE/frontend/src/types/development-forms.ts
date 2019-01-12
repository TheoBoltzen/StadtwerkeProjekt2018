export interface DevelopmentForm {
  readonly id: string;
  readonly department: string;
  readonly education: string;
  readonly version: string;
  readonly createdAt: string;
}

export interface CompetenceFetch {
  readonly name: string;
  readonly description: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface MainCategoryFetch {
  readonly name: string;
  readonly description: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly CompetencyCategoryName: string;
}

export interface SubCategoryFetch {
  readonly name: string;
  readonly description: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly MainCategoryName: string;
}

export interface CriteriaFetch {
  readonly name: string;
  readonly ynAnswer: boolean;
  readonly description: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly SubCategoryName: string;
}

export interface DevelopmentFormCreate {
  readonly department: string;
  readonly education: string;
  readonly content: ContentDevelopmentFormCreate[];
}

export interface ContentDevelopmentFormCreate {
  readonly name: string;
  readonly children?: ContentDevelopmentFormCreate[];
  readonly goalCross?: number;
  readonly ynAnswer?: boolean;
  readonly trainerassesment?: number;
  readonly traineeassesment?: number;
}

export interface EmptyDevSheetResult {
  readonly devSheetid: string;
  readonly version: number;
  readonly department: string;
  readonly education: string;
  readonly trainer?: string;
  readonly trainee?: string;
  readonly content: ContentDevelopmentFormCreate[];
}

export interface EmptyDevSheetFetch {
  readonly result: EmptyDevSheetResult;
}

export interface FullDevSheetFetch {
  readonly result: FullDevSheetResult;
}

export interface FullDevSheetResult {
  readonly devSheetid: string;
  readonly version: number;
  readonly department: string;
  readonly status: string;
  readonly education: string;
  readonly trainer: string;
  readonly trainee: string;
  readonly content: ConentFullDevSheet[];
}

export interface ConentFullDevSheet {
  readonly name: string;
  readonly children: ConentFullDevSheet[];
  readonly id: number;
  readonly goalCross?: number;
  readonly ynAnswer?: boolean;
  readonly trainerassessment?: number;
  readonly traineeassessment?: number;
}

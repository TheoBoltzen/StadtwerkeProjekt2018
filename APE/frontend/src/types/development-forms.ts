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

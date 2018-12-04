export interface DevelopmentForm {
  readonly id: string;
  readonly department: string;
  readonly education: string;
  readonly version: string;
  readonly createdAt: string;
}

export interface Competence {
  readonly name: string;
  readonly description: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

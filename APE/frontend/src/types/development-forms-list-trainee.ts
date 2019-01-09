export interface DevelopmentFormsListTrainee {
  readonly id: number;
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly developmentSheetId: number;
  readonly traineeUsername: string;
  readonly trainerUsername: string;
  readonly DevelopmentSheet: DevelopmentSheet;
}

interface DevelopmentSheet {
  readonly department: string;
  readonly education: string;
}

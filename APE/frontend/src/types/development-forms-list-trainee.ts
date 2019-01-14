export interface DevelopmentFormsListTrainee {
  readonly id: number;
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly DevelopmentSheetId: number;
  readonly TraineeUsername: string;
  readonly TrainerUsername: string;
  readonly DevelopmentSheet: DevelopmentSheet;
}

interface DevelopmentSheet {
  readonly department: string;
  readonly education: string;
}

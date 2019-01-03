export interface ConnectedDevSheetFetch {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  DevelopmentSheetId: number;
  TraineeUsername: string;
  TrainerUsername: string;
  DevelopmentSheet: {
    department: string;
    education: string;
  };
}

interface GardenSummary {
  action: string;
  type: string;
  value: any;
  comment: string;
}

export interface GardenCollectInterface {
  user: string;
  date: Date;
  summary: GardenSummary[];
}

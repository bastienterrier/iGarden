export interface GardenSummaryInterface {
  action: string;
  type: string;
  value: any;
  unit: string;
}

export interface GardenCollectInterface {
  user: string;
  date: Date;
  summary: GardenSummaryInterface[];
}

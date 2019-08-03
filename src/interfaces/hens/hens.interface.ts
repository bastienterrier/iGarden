export class EggsCollect {
  public picker: string;
  public number: number;
  public date: Date;

  constructor(o?: EggsCollect) {
    if (o) {
      this.picker = o.picker;
      this.number = o.number;
      this.date = new Date(o.date);
    } else {
      this.picker = '';
      this.number = 0;
      this.date = new Date();
    }
  }
}

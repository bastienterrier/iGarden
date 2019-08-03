import { EggsCollect } from '@/interfaces/hens/hens.interface';

export class Utils {
  public static copyEggsCollect(source: EggsCollect, copy: EggsCollect) {
    source.picker = copy.picker;
    source.number = copy.number;
    source.date = new Date(copy.date);
  }

  public static copyObject(src: any, copy: any) {
    Object.keys(copy).forEach(e => {
      if (e === 'date') {
        src[e] = new Date(copy[e]);
      } else {
        src[e] = copy[e];
      }
    });
  }

  public static copyArray(src: any[], copy: any[]) {
    copy.forEach(e => {
      src.push(e);
    });
    src.forEach((e, i) => {
      this.copyObject(e, copy[i]);
    });
  }
}

import { EggsCollect } from '@/interfaces/hens/hens.interface';

export class Utils {
  public static getUsers(): string[] {
    return [
      'Ludivine',
      'Margot',
      'Janine',
      'Marie-Paule',
      'Jean-Luc',
      'Bastien',
      'Cyril',
    ];
  }

  public static getUsersColor(): string[] {
    return [
      '#000000',
      '#ababab',
      '#ff0000',
      '#ffff00',
      '#0000ff',
      '#ff00ff',
      '#00ffff',
    ];
  }

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

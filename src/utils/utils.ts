import { EggsCollect } from '@/interfaces/hens/hens.interface';
import { ToDoState } from '@/interfaces/todo/todo.interface';

export class Utils {
  public static getCurrentUser(): string {
    return localStorage.getItem('user') || '';
  }

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
      '#0373fc',
      '#fc03a9',
      '#ff0000',
      '#0a4217',
      '#ab08c4',
      '#4CAF50',
      '#e07b00',
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

  public static translateTodoState(state: string): ToDoState {
    switch (state) {
      case 'WIP':
        return ToDoState.WIP;
      case 'DONE':
        return ToDoState.DONE;
      case 'TODO':
        return ToDoState.TODO;
      default:
        return ToDoState.TODO;
    }
  }
}

import { EggsCollect } from '@/interfaces/hens/hens.interface';
import { ToDoState } from '@/interfaces/todo/todo.interface';
import { User } from '@/interfaces/settings/settings.interface';
import { default as axios } from 'axios';

export class Utils {
  public static users: User[];

  public static async initialize(): Promise<any> {
    return await axios
      .get(`${process.env.VUE_APP_API_URL}/settings/users`)
      .then(response => {
        const result: User[] = response.data as User[];
        this.users = result;
      })
      .catch(err => {
        console.error(err);
      });
  }

  public static getCurrentUser(): string {
    return localStorage.getItem('user') || '';
  }

  public static getCurrentUserColor(): string {
    const user: string = localStorage.getItem('user') || '';
    return (this.users.find(u => u.name === user) as User).color;
  }

  public static getUsersName(): string[] {
    return this.users.map(u => u.name);
  }

  public static getUsersColor(): string[] {
    return this.users.map(u => u.color);
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

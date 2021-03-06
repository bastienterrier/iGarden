import { EggsCollect } from '@/interfaces/hens/hens.interface';
import { ToDoState } from '@/interfaces/todo/todo.interface';
import { User } from '@/interfaces/settings/settings.interface';
import { default as axios } from 'axios';
import { WeatherInterface } from '../interfaces/commons/weather.interface';

export class Utils {
  public static users: User[];
  public static weather: WeatherInterface[];

  public static async downloadUser(): Promise<any> {
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

  public static displayWeather(w: WeatherInterface): string {
    return `${w.day} ${w.period} - Temp ${w.temperature}°C - Weather ${w.weather}`;
  }

  public static compareDateWithoutTime(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  public static getWeather(day: Date): WeatherInterface[] {
    return this.weather.filter(w => this.compareDateWithoutTime(w.day, day));
  }

  public static async downloadWeather(): Promise<any> {
    this.weather = new Array();
    axios
      .get(
        `https://api.meteo-concept.com/api/forecast/daily/periods?token=${process.env.VUE_APP_WEATHER_TOKEN}&insee=62863`,
      )
      .then(res => {
        const forecast = res.data.forecast;
        forecast.forEach((f: any) => {
          f.forEach((p: any) => {
            const date: Date = new Date();
            date.setDate(date.getDate() + p.day);
            const weather: WeatherInterface = {
              day: date,
              period: p.period,
              temperature: p.temp2m,
              weather: p.weather,
            };
            this.weather.push(weather);
          });
        });
      })
      .catch(err => console.error(err));
  }

  public static async initialize(): Promise<any> {
    await this.downloadWeather();
    return await this.downloadUser();
  }

  public static getCurrentUserName(): string {
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

  public static getUserColor(name: string): string {
    return (this.users.find(u => u.name === name) as User).color;
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

  public static translateTodoStateVerbose(state: string): ToDoState {
    switch (state) {
      case 'En cours':
        return ToDoState.WIP;
      case 'Terminées':
        return ToDoState.DONE;
      case 'A faire':
        return ToDoState.TODO;
      default:
        return ToDoState.TODO;
    }
  }
}

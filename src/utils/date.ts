export class UtilsDate {
  public static translateDay(day: number): string {
    switch (day) {
      case 0:
        return 'dimanche';
      case 1:
        return 'lundi';
      case 2:
        return 'mardi';
      case 3:
        return 'mercredi';
      case 4:
        return 'jeudi';
      case 5:
        return 'vendredi';
      case 6:
        return 'samedi ';
      default:
        return '';
    }
  }

  public static translateMounth(mounth: number): string {
    switch (mounth) {
      case 0:
        return 'janvier';
      case 1:
        return 'février';
      case 2:
        return 'mars';
      case 3:
        return 'avril';
      case 4:
        return 'mai';
      case 5:
        return 'juin';
      case 6:
        return 'juillet';
      case 7:
        return 'août';
      case 8:
        return 'septembre';
      case 9:
        return 'octobre';
      case 10:
        return 'novembre';
      case 11:
        return 'décembre';
      default:
        return '';
    }
  }
}

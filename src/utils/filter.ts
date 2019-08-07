import { Vue } from 'vue-property-decorator';
import { UtilsDate } from '@/utils/date';

Vue.filter('formatDate', (date: Date) => {
  if (date) {
    return `${UtilsDate.translateDay(
      date.getDay(),
    )} ${date.getDate()} ${UtilsDate.translateMounth(
      date.getMonth(),
    )} vers ${date.getHours()}h`;
  }
});

Vue.filter('formatDay', (date: Date) => {
  if (date) {
    return `${UtilsDate.translateDay(
      date.getDay(),
    )} ${date.getDate()} ${UtilsDate.translateMounth(date.getMonth())}`;
  }
});

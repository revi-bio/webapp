export class DateTime {
  static formatDate(date: string): string {
    return date.split('.')[0].replace('-', '.').replace('-', '.').replace('T', '. ');
  }

  static onlyDate(date: string): string {
    return date.replace('-', '.').replace('-', '.').split('T')[0];
  }

  static onlyTime(date: string): string {
    return date.split('T')[1].split('.')[0];
  }
}

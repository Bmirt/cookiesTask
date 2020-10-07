import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPluginDomain',
})
export class FormatPluginDomainPipe implements PipeTransform {
  transform(link: string): string {
    // Some links come with extra '.' at the beginning
    // so this pipe's purpose is to fix it
    const formatedlink =
      link[0] === '.'
        ? `https://${link.replace(/^\./, '')}`
        : `https://${link}`;
    return formatedlink;
  }
}

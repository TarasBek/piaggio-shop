import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleRendererService implements CanActivateChild {
  constructor(private title: Title) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    const pageTitle = this.getDeepestTitle(childRoute);
    if (pageTitle) {
      this.title.setTitle(pageTitle);
    }
    return true;
  }

  private getDeepestTitle(route: ActivatedRouteSnapshot): string | null {
    let title = route.data?.['title'] || null;
    while (route.firstChild) {
      route = route.firstChild;
      if (route.data?.['title']) {
        title = route.data['title'];
      }
    }
    return title;
  }
}

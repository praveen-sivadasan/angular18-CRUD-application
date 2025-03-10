import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { SimpleMatData } from '../models/simple-mat-data';

export const simpleMatResolver: ResolveFn<SimpleMatData> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService = inject(UserService);
  return {
    users: userService.getUsers()
  }
};

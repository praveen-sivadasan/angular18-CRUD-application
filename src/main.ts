import {ApplicationRef, enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {enableDebugTools} from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef) => {
    try {
      if (!environment.production) {
        /**
         * enableDebugTools
         *
         * Write this piece of code to run the following on browser console.
         * ng.profiler.timeChangeDetection()
         * Usage when:
         * But from the best we can tell so far it tells Angular's change detection to run for
         * about 500ms and then prints how many times change detection was triggered and the
         * average time change detection took.
         *
         * If you're suspicious that a specific page in your Angular app is causing change detection
         * overload then this is a quick and dirty way to do some change detection profiling.
         *
         * ref: https://danielk.tech/home/angular-how-to-profile-runtime-performance
         */
        const applicationRef = moduleRef.injector.get(ApplicationRef);
        const componentRef = applicationRef?.components?.[0];
        if (componentRef) {
          enableDebugTools(componentRef);
        }
      }
    } catch (err) {
      console.error(err);
    }
  })
  .catch(err => console.error(err));

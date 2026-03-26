import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { renderApplication, provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app/app.config';

import 'zone.js/node'; 

export default renderApplication(
  (bootstrapContext) =>
    bootstrapApplication(
      AppComponent,
      {
        ...appConfig,
        providers: [
          provideServerRendering(),
          ...(appConfig.providers ?? []),
        ],
      },
      bootstrapContext
    ),
  {
    document: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Angular SSR</title>
        </head>
        <body>
          <app-root></app-root>
        </body>
      </html>
    `,
    url: '/',   
  }
);

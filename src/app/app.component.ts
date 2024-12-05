import { Component, OnInit } from '@angular/core';
import { IntervalEmitterService } from './interval-emitter.service';
import { concat, concatMap, delay, exhaustMap, interval, mergeMap, of, switchMap, take, zip } from 'rxjs';

import { initializeApp, FirebaseApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {

   firebaseConfig = {
     apiKey: "AIzaSyBedWTSjkMDR9Xlc1wP8A5U1f88du_CILE",
     authDomain: "christmas-c6610.firebaseapp.com",
     projectId: "christmas-c6610",
     storageBucket: "christmas-c6610.appspot.com",
     messagingSenderId: "473969574069",
     appId: "1:473969574069:web:abd9b5a2673aa20c2cbefc",
     measurementId: "G-0S3YEM15PR",
   };


  title = 'my-app';


    app = initializeApp(this.firebaseConfig);

}

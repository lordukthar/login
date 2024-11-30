import { Component, OnInit } from '@angular/core';
import { IntervalEmitterService } from './interval-emitter.service';
import { concat, concatMap, delay, exhaustMap, interval, mergeMap, of, switchMap, take, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
zip() {
  const observable1 = interval(1000).pipe(take(6)); // Emits 0, 1, 2

  // Observable 2: emits 'A', 'B', 'C'
  const observable2 = of('A', 'B', 'C', 'D','E', 'F');

  zip(observable1, observable2).subscribe(([num, letter]) => {
    this.zipMapValues.push(`Number: ${num}, Letter: ${letter}`)
    console.log(`Number: ${num}, Letter: ${letter}`);
  });
  
}
  zipMapValues: string[] = [];
  exhaustMapValues: number[] = [];
  switchMapValues: number[] = [];
  mergeMapValues: number[] = [];
  concatMapValues: number[] = [];

exhaust() {
  interval(500).pipe(
    take(10), // Only take the first 10 values (0, 1, 2, ... 9)
    exhaustMap(value => {
      // Simulate processing of each value with a delay of 1000ms
      this.exhaustMapValues.push(value);
      return of(`Processed ${value}`).pipe(delay(1000));
    })
  ).subscribe(result => {
    console.log(result);
  });
}

switch() {
  interval(1000).pipe(
    take(5), // Take the first 5 values (0, 1, 2, 3, 4)
    switchMap(value => {
      // Simulate processing
      return of(value).pipe(
        delay(1000), // Simulate latency
        switchMap(val => {
          // Log the value
          console.log(`Logged: ${val}`);
          
          // Add the value to the loggedValues array
          this.switchMapValues.push(val);
          
          // Continue with the stream
          return of(val);
        })
      );
    })
  ).subscribe(() => {
    // Optionally, you can perform actions when each value is processed
  });
  
  // After some time or when needed, you can access the loggedValues array
  setTimeout(() => {
    console.log('All logged values:', this.switchMapValues);
  }, 6000); // Wait a bit longer than the total processing time
  

}

concat() {
  of(1, 2, 3).pipe(
    concatMap(value => {
      this.concatMapValues.push(value);
      return of(`Processed ${value}`).pipe(delay(1000));
    })
  ).subscribe(result => {
    console.log("concatMap: ", result);
  });
}

  merge(){
    interval(1000).pipe(
      take(5), // Take the first 5 values (0, 1, 2, 3, 4)
      mergeMap(value => {
        // Simulate processing
        const randomDelay = Math.floor(Math.random() * 3000); 

        return of(value).pipe(
          delay(randomDelay), // Simulate latency
          mergeMap(val => {
            // Log the value
            console.log(`Logged: ${val}`);
            
            // Add the value to the loggedValues array
            this.mergeMapValues.push(val);
            
            // Continue with the stream
            return of(val);
          })
        );
      })
    ).subscribe(() => {
      // Optionally, you can perform actions when each value is processed
    });



  }

  title = 'my-app';

  constructor(private intervalEmitterService: IntervalEmitterService) {}

  ngOnInit() {
    this.intervalEmitterService.getExhaustMap().subscribe(val => {
      //this.exhaustMapValues.push(val);
    });

    this.intervalEmitterService.getMergeMap().subscribe(val => {
      //this.mergeMapValues.push(val);
    });

    this.intervalEmitterService.getSwitchMap().subscribe(val => {
     // this.switchMapValues.push(val);
    });

    this.intervalEmitterService.getConcatMap().subscribe(val => {
      //this.concatMapValues.push(val);
    });


    const lambdaFunction = (name: string) => name;
    const processedLambda = this.processNameLambda(lambdaFunction);
    const result = processedLambda('angular');
    console.log(result); 
  }



  processNameLambda(lambda: (name:string) => string) {
    return (name:string) => {
      const processName = name.toUpperCase();
      return {
        name:processName,
        num: processName.length
      }
    }
  }


}

import { TestBed, async } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { INCREMENT, DECREMENT, countReducer } from '../state/count';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import { TestScheduler } from 'rxjs/testing/TestScheduler';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({ count: countReducer })
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should update count state via the store', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const { store, count } = app;
    
    const testScheduler = new TestScheduler(
      (actual, expected) => expect(actual).toEqual(expected)
    );

    const incrementMarbles = '--x----x--x---';
    const decrementMarbles = '----x-------x-';
    const expectedMarbles  = 'a-b-a--b--c-b-';

    const incrementMap = {
      x: { type: INCREMENT }
    };

    const decrementMap = {
      x: { type: DECREMENT }
    };

    const expectedMap = {
      a: 0,
      b: 1,
      c: 2,
    };

    const increment = testScheduler.createHotObservable(incrementMarbles, incrementMap);
    const decrement = testScheduler.createHotObservable(decrementMarbles, decrementMap);

    Observable
      .merge(increment, decrement)
      .subscribe(store.dispatch.bind(store));

    testScheduler.expectObservable(count).toBe(expectedMarbles, expectedMap);

    testScheduler.flush();
  }));

});

import { BehaviorSubject, fromEvent, Subject } from "rxjs";
import { withLatestFrom } from "rxjs/operators";

const loggedInSpan: HTMLElement = document.querySelector('span#logged-in');
const loginButton: HTMLElement = document.querySelector('button#login');
const logoutButton: HTMLElement = document.querySelector('button#logout');
const printStateButton: HTMLElement = document.querySelector('button#print-state');

//Shows differences between Regular Subject and Behavior Subject. Shows login state

//Must provide BehaviorSubject Initial value
const isLoggedIn$ = new BehaviorSubject<boolean>(false);

fromEvent(loginButton, 'click').subscribe(() => isLoggedIn$.next(true));
fromEvent(logoutButton, 'click').subscribe(() => isLoggedIn$.next(false));

//Nav Bar
isLoggedIn$.subscribe(
  isLoggedIn => loggedInSpan.innerText = isLoggedIn.toString()
);

// Buttons
isLoggedIn$.subscribe(isLoggedIn =>{
  logoutButton.style.display = isLoggedIn ? 'block' : 'none';
  loginButton.style.display = !isLoggedIn ? 'block' : 'none';
});

//select various pieces of state withLatestFrom
fromEvent(printStateButton, 'click').pipe(
  withLatestFrom(isLoggedIn$)
).subscribe(
  ([event, isLoggedIn]) => console.log('User is logged in:', isLoggedIn)
);
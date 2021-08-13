import { fromEvent, Subject } from "rxjs";

const loggedInSpan: HTMLElement = document.querySelector('span#logged-in');
const loginButton: HTMLElement = document.querySelector('button#login');
const logoutButton: HTMLElement = document.querySelector('button#logout');
const printStateButton: HTMLElement = document.querySelector('button#print-state');

//Shows differences between Regular Subject and Behavior Subject. Shows login state

const isLoggedIn$ = new Subject<boolean>();

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
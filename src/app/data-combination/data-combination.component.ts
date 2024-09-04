import { Component } from '@angular/core';
import { catchError, combineLatest, delay, finalize, map, Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-data-combination',
  standalone: true,
  imports: [],
  templateUrl: './data-combination.component.html',
  styleUrl: './data-combination.component.sass',
})
export class DataCombinationComponent {
  loading = false;
  error: string | null = null;
  combinedData: { user: string; posts: string[] } | null = null;

  ngOnInit() {
    this.loadCombinedData();
  }

  refetchCombinedData () {
    this.loadCombinedData();
  }

  private loadCombinedData() {
    this.loading = true;
    this.error = null;

    // Simulated API calls
    const userDetails$ = this.fetchUserDetails();
    const userPosts$ = this.fetchUserPosts();

    // Combine latest data from both endpoints
    combineLatest([userDetails$, userPosts$])
      .pipe(
        map(([user, posts]) => {
          // Combine and format the data
          return { user, posts };
        }),
        catchError((error) => {
          // Handle errors from any of the observables
          this.error = 'Failed to load user details or posts.';
          return of(null); // Return a null observable to keep the stream alive
        }),
        finalize(() => {
          // Update loading state once the request completes
          this.loading = false;
        })
      )
      .subscribe((data) => {
        // Assign combined data to display
        this.combinedData = data;
      });
  }

  // Simulate fetching user details API endpoint
  private fetchUserDetails(): Observable<string> {
    // Simulate a 30% chance of an error occurring
    if (Math.random() < 0.3) {
      return throwError(() => new Error('Error fetching user details'));
    }
    return of('John Doe').pipe(delay(1000)); // Simulate network delay
  }

  // Simulate fetching user posts API endpoint
  private fetchUserPosts(): Observable<string[]> {
    // Simulate a 30% chance of an error occurring
    if (Math.random() < 0.3) {
      return throwError(() => new Error('Error fetching user posts'));
    }
    return of(['Post 1', 'Post 2', 'Post 3']).pipe(delay(1500)); // Simulate network delay
  }
}

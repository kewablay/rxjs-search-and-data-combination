import { Component } from '@angular/core';
import {
  catchError,
  debounceTime,
  delay,
  filter,
  finalize,
  fromEvent,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.sass',
})
export class SearchComponentComponent {
  searchInput = document.getElementById('search') as HTMLInputElement;
  loading = false;
  error: string | null = null;
  constructor() {}
  searchResults: string[] = [];

  ngOnInit() {
    // Get the search input element
    const searchInput = document.getElementById('search') as HTMLInputElement;

    // Create an observable from input events
    fromEvent(searchInput, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value), // Extract input value
        debounceTime(300), // Debounce for 300ms
        filter((value: string) => value.length > 2), // Filter out short queries
        tap(() => {
          this.loading = true;
          this.error = null;
        }),
        // Use switchMap to handle search and cancel previous requests
        switchMap((term: string) =>
          this.simulateSearch(term).pipe(
            tap(() => (this.loading = true)),
            delay(500), // Simulate network delay
            catchError((err) => {
              this.loading = false;
              this.error = 'Failed to fetch search results.';
              return of([]); // Return an empty array on error
            }),
            finalize(() => (this.loading = false))
          )
        )
      )
      .subscribe((results: string[]) => {
        this.searchResults = results; // Update the results to display
      });
  }

  // Simulate an API search that returns an observable of string arrays
  private simulateSearch(query: string): Observable<string[]> {
    // Simulate a result set based on the query
    return of([
      `Result for "${query}" - 1`,
      `Result for "${query}" - 2`,
      `Result for "${query}" - 3`,
    ]).pipe(
      delay(500), // Simulate network delay
      mergeMap((results) => {
        // Randomly throw an error 30% of the time
        if (Math.random() < 0.3) {
          return throwError(
            () => new Error('Random simulated error occurred!')
          );
        }
        return of(results);
      })
    );
  }
}

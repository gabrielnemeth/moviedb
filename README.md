Simple movie database website with Angular, NgRx and Bulma.

## Quickstart

-   Get a API key from [TMDb](https://www.themoviedb.org/documentation/api)
-   Create a `enviroment` file `themoviedb.environment.ts` inside folder `src/environments` with following data:

    ```
    export const themoviedb = {
      apiKey: 'API-KEY', // here goes your API key
    };

    ```

-   Install dependencies
    ```
    npm install
    ```
-   Run the app with `ng-cli`
    ```
    ng serve
    ```

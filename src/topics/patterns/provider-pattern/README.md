# Provider Pattern

## Pros

- Provides a way to pass down the data to the child components without passing the data to intermediate components(Prevents prop-drilling)

- Can give components access to global state(eg. theme)

## Cons

- Overusing this patterns can result is performance issues. Whenever the provided value change it will re-render all the components which are using that context

## References

- https://www.patterns.dev/posts/provider-pattern/

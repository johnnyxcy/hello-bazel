# app

## Debug with VSCode

1. Open `> debug: Select and Start Debugging` (Recommend to use `F5` shortcut key)
2. Select `app`
   - Note: This will automatically run bazel build task and then start the server and attach the debugger
3. Set breakpoint and good to go.

### Hot Reload

Source code change under this package will automatically trigger the server to reload.

However, if the dependency is changed, you need to manually run the following command

```bash
bazel build //projects/js/app:dev --config debug
```

And the server will reload after deps build finish.

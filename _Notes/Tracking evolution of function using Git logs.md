## Command
```
git log -L :<funcname>
```

### Example
```
git log -L :self.published:app/models/post.rb
```

## Troubleshooting
In case the language of your project is not supported, then add support by making these two changes:
1. Add the following lines (adjust as per your language) to `.gitattributes` file:
```
*.rb diff=ruby
*.swift diff=swift
```

2. Then, define the diff pattern in `.gitconfig` (or `.git/config`). Example:
```
[diff "swift"]
xfuncname = ^[ \t]*((class|struct|func)[ \t].*)$
```

You can also define the `gitattributes` globally using:

```
git config --global core.attributesfile ~/.gitattributes
```
## Sources
- https://calebhearth.com/git-method-history
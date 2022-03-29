# server

## Icon for systray

This needs to base64 encoded which you can do like:

```
openssl base64 -in ../client/src/images/favicon/favicon-32x32.png
openssl base64 -in ../client/src/images/favicon/favicon.ico
```

Note Windows likes **.ico** files while Mac likes **.png** files

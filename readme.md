# prnt.sc Parser

This parser was created by me only for educational purposes
and does not presuppose use for any other (purposes).

To start the program:

```sh
  git clone https://github.com/kyzinatra/img_parser.git
  cd img_parser
  npm install
  npm run start
```

Then you can open public/result.json
You can see all settings in the ./public/settings.json file


Other scripts:

```sh
  npm run tobase64
```

To encode all image results in base64 (./public/result/result.json)


```sh
  npm run settings
```

This script asks for all settings in turn and writes them to a file (./public/settings.json)


```sh
  num run html
```

Converts the entire result to an html gallery (./public/result/result.html)

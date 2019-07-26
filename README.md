## React Single-page-application Template
A single page react project template with antd.

## Overview
```
react-spa-template
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── .babelrc
├── .browserlistrc
├── .eslintrc
├── dist
│   ├── js
│   ├── index.html
│   └── stats.html
└── src
    ├── assets          // static resource
        |-- theme.less  // antd theme file.
    ├── components      // react components
    ├── containers      // specify a container for every page
        |-- AppContainer // handle menus. every page should be wrapped with AppContainer
    ├── core
        |-- App.jsx     // application's root element, bootstrap the application
    ├── redux           // specify actions, reducers and action-constant
    ├── services        // handle requests with server
    ├── routes          // specify routes
    |-- utils           
        |-- icons.js    // @antd-desigin/icons. for performance.
    └── templates       
        └── index.html  // js resources will be injected to the html
```

### Get Started

```js
git clone https://github.com/vivimee/react-spa-template.git my-app
cd my-app
yarn
yarn dev
```

### Add A Page

1. Add a container in /src/containers
2. Import the container in /src/routes/index.js
3. Specify a route
```js
const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "home-page" */'../containers/Homepage'),
});

<Route exact path="/" component={Homepage} />
```

### About @desing/icons
If directly import antd/Icon, it will import @antd-design/icons/lib/dist, which make bundle size too large. So we can only import the Icons we used.
```js
/* webapck.config.js */
resolve: {
    alias: {
        '@ant-design/icons/lib/dist$': path.resolve(PROJECT_ROOT, 'src', 'utils', 'icons.js'),
    }
}

/* /src/utils/icons.js */
export {
  default as CloseCircleOutline,
} from '@ant-design/icons/lib/outline/CloseCircleOutline';

```

### Build For Production

```js
yarn build
```

### Deploy To Server
1. update `/scripts/publish.js`
2. `yarn publish`

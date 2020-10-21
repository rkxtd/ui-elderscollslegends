[![Build Status](https://travis-ci.org/xcomanche/ui-elderscollslegends.svg?branch=main)](https://travis-ci.org/xcomanche/ui-elderscollslegends)
[![dependencies Status](https://david-dm.org/xcomanche/ui-elderscollslegends/status.svg)](https://david-dm.org/xcomanche/ui-elderscollslegends)
[![devDependencies Status](https://david-dm.org/xcomanche/ui-elderscollslegends/dev-status.svg)](https://david-dm.org/xcomanche/ui-elderscollslegends?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/xcomanche/ui-elderscollslegends/badge.svg?branch=main)](https://coveralls.io/github/xcomanche/ui-elderscollslegends?branch=main)

# UI For Elder Scrolls: Legends DataBase.

## Demo
You could take a look at https://ui-elderscrollslegends.herokuapp.com/
In case Build Status is green - Heroku should have a latest version of the sources deployed.

## Prerequisites
You should have [npm](https://www.npmjs.com/get-npm), and [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed.

## Getting Started
1. Checkout repository: `git clone https://github.com/xcomanche/ui-elderscollslegends.git`
1. Go into project directory: `cd ui-elderscollslegends`
1. Install npm dependencies `npm i` 
1. Run project: `npm run dev`
1. Open browser and go to http://localhost:1234

### Testing Prod-like version
1. Run `npm run start`
1. Open browser and go to http://localhost:8080

## Usage
* `npm run test` Run Unit Tests.
* `npm run dev` Run Dev Server with Hot Reload enabled by default.
* `npm run build` Package sources and build to `dist/` folder.
* `npm run prod` Run `http-server` to serve compiled sources from `dist/` folder.
* `npm run start` Run `build` and if successful run `prod`.

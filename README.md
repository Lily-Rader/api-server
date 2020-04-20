<h1 align="center">
    <a href="https://cdnjs.com"><img src="https://raw.githubusercontent.com/cdnjs/brand/master/logo/standard/dark-512.png" width="175px" alt="< cdnjs >"></a>
</h1>

<h3 align="center">The #1 free and open source CDN built to make life easier for developers.</h3>

---

## cdnjs API Server

Looking for the documentation on our API?

> [cdnjs API docs](https://cdnjs.com/api)

## Getting Started

This project runs on [Node.js](https://nodejs.org). Please make sure you have a version installed
that matches our defined requirement in the [.nvmrc](.nvmrc) file for this project.

Included with this project is a dependency lock file. This is used to ensure that all installations
of the project are using the same version of dependencies for consistency.

You can install the Node dependencies following this lock file by running:

```shell script
npm ci
```

Once the dependencies are installed, the API server is ready to run in development mode. All the
data required for the server is included in this repository (though it may not be the latest).

To start the server in development mode, run:

```shell script
npm run dev
```

## Updating Data

The data included with this repository may not be up-to-date and is intended to be used when doing
development work on the API server. In production this data is updated before every deployment by
the [runServer.sh](runServer.sh) script.

The data consists of three parts that can all be updated individually if needed:

### Packages

Use the following command to pull down the latest packages data:

```shell script
rm -f ./data/packages.min.json
wget -O ./data/packages.min.json https://storage.googleapis.com/cdnjs-assets/package.min.js
```

### SRI

The SRI data is contained within another cdnjs repository and is included in this repository as a
git submodule.

To update this submodule, you can run:

```shell script
git submodule update --force --checkout -- data/sri
```

### Tutorials

All the tutorials for the libraries that are available via the API are also contained in another
cdnjs repository and submoduled into this project with git.

To update this submodule, you can run:

```shell script
git submodule update --force --checkout -- data/tutorials
```

## Production Deployment

To deploy this API server to production, it should be as simple as cloning this repository and
running the [`runServer.sh`](runServer.sh) file. For deployments to Heroku, running this script is
configured with the included [`Procfile`](Procfile).

The [`runServer.sh`](runServer.sh) script performs the following actions to deploy and start the app:

- Update packages data
  - Remove development packages data
  - Download latest packages data
- Update SRI data
  - Remove the outdated SRI submodule data
  - Clone latest SRI data from [cdnjs/SRIs](https://github.com/cdnjs/SRIs)
  - Log the SRI commit that was cloned
- Update tutorials
  - Remove the outdated tutorials submodule data
  - Clone the latest tutorials from [cdnjs/tutorials](https://github.com/cdnjs/tutorials)
  - Log the tutorials commit that was cloned
- Start the API server with GC enabled and additional memory allocated

To change the port that the app binds to, set the `PORT` environment var when running the script.
For our Heroku deployment, this is set automatically by Heroku.

Removing submodules and then cloning the respective repositories is used to update data for
production deployments due to how Heroku sets up the app, with the final app directory not being an
initialised Git repo.

## Testing and Linting

TODO
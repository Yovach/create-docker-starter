# Create Docker Starter

A collection of templates for quickly starting Node.js projects with Docker.

## Available Templates

See `./templates` folder

## Usage

You can use our CLI `npm init docker-starter@latest` to generate a new project.

Or you can :
1. Clone this repository.
2. Go to the folder of the template you want
3. Copy its content to your project directory.
4. Customize as needed for your application.

## Watch

We don't use the builtin [watch](https://nodejs.org/docs/latest-v22.x/api/cli.html#--watch) flag because it doesn't work well with [`Compose Watch`](https://docs.docker.com/compose/how-tos/file-watch/). (cf. https://github.com/nodejs/node/issues/51621)

## Roadmap

- More templates coming soon!

## License

MIT License. See [`LICENSE.md`](LICENSE.md) for details.

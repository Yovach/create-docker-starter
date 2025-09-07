# Node.js + TypeScript Docker Starter

This project provides a simple starter template for running a Node.js application with TypeScript inside a Docker container.

## Features

- Pre-configured Dockerfile for Node.js
- Example `compose.yml` for easy development
- Basic project structure for quick setup

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine

### Installation

1. You can execute `npm create docker-starter`, select your directory and your template.
2. Change into the project directory:
    ```bash
    cd <project-directory>
    ```
3. You're all set!

## Project Structure

```
├── Dockerfile               # Dockerfile for building the image (with dev and prod stages)
├── compose.yml              # Docker Compose configuration
├── Makefile                 # Makefile for build and development tasks
├── src/
│   └── index.ts
├── package.json            # Project metadata and dependencies
├── package-lock.json
├── tsconfig.json           # TypeScript configuration
├── nodemon.json            # Nodemon configuration
└── README.md               # Documentation for the project
```

## Customization

- Modify `src/index.ts` to start building your Node.js application.
- Update the `Dockerfile` or `compose.yml` as needed for your use case.

## License

This project is licensed under the MIT License.

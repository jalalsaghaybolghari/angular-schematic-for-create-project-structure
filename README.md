
# Angular Schematics Project - Project Boilerplate Generator

## Overview

This Angular Schematics project provides a fast and efficient way to generate an Angular project boilerplate with optional modules and libraries to kickstart your development. It simplifies and accelerates the initial setup process for Angular applications by automating the generation of core files, structure, and dependencies, allowing you to focus on building features rather than setup.

## Purpose

The primary goal of this project is to create a boilerplate structure for new Angular projects, enabling teams to start projects quickly and consistently. It allows developers to add predefined modules, libraries, and configurations from the start, making it ideal for rapid prototyping and maintaining a unified project setup across multiple projects.

## Features

- **Automated Project Generation**: Generate a complete Angular project setup with a single command.
- **Optional Module & Library Integration**: Choose from a set of predefined modules and libraries to include based on your project's needs (e.g., routing, forms, HTTP, custom components, etc.).
- **Customizable Project Structure**: Automatically creates a consistent folder structure, configurations, and common boilerplate code.
- **Consistency and Speed**: Streamlines and standardizes the initial project setup to boost productivity and minimize setup time.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- [Angular CLI](https://angular.io/cli) installed globally.

### Installation

1. Clone this repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd <your-project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Usage

1. **Generate a New Angular Project**  
   Use the schematics command to create a new Angular project:
   ```bash
   ng generate <schematics-name>:new-project <project-name>
   ```
   Replace `<project-name>` with your desired project name.

2. **Add Optional Modules or Libraries**  
   You can specify optional modules or libraries to include in your project:
   ```bash
   ng generate <schematics-name>:add-module <module-name>
   ```
   Replace `<module-name>` with the module you want to add (e.g., `routing`, `forms`, `http`, etc.).

3. **Running the Project**  
   After generating the boilerplate, navigate into the newly created project folder and run:
   ```bash
   cd <project-name>
   ng serve
   ```

### Examples

- **Create a Basic Angular Project**  
  ```bash
  ng generate <schematics-name>:new-project myApp
  ```
- **Add Routing Module to the Project**  
  ```bash
  ng generate <schematics-name>:add-module routing
  ```
- **Add HttpClientModule to the Project**  
  ```bash
  ng generate <schematics-name>:add-module http
  ```

## Available Modules & Libraries

- **Routing**: Adds Angular's RouterModule for managing application routes.
- **Forms**: Adds FormsModule and ReactiveFormsModule for template-driven and reactive forms.
- **HTTP**: Adds HttpClientModule for making HTTP requests.
- **Custom Components**: Optionally add boilerplate code for common components like header, footer, or sidebar.

## Project Structure

The generated project structure typically includes the following:

```
src/
├── app/
│   ├── core/            # Core services and modules
│   ├── shared/          # Shared modules, components, and services
│   ├── features/        # Feature-specific modules and components
│   ├── app.module.ts    # Main application module
│   └── ...
├── assets/              # Static assets (images, fonts, etc.)
├── environments/        # Environment configuration files
└── ...
```

## Contribution

Feel free to fork this project, submit issues, or contribute improvements. Any contributions that can improve the setup speed, modularity, or usability of this Angular boilerplate generator are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

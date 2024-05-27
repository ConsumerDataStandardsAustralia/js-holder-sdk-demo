# JS Holder SDK (Demo)

## Overview

This demo project, developed and maintained by the [Data Standards Body](https://consumerdatastandards.gov.au/about) (DSB), provides a straightforward NodeJS server implementation that showcases the use of the [js-holder-sdk](https://github.com/ConsumerDataStandardsAustralia/js-holder-sdk) middleware functions. It demonstrates how client requests can automatically trigger the generation of error objects and HTTP status codes that comply with published  [Consumer Data Standards](https://consumerdatastandardsaustralia.github.io/standards/#introduction) (CDS).

## Using the JS Holder SDK (Demo)

This implementation serves as a practical example for developers to understand the application of the JS Holder SDK in a real-world scenario. 

### Key Features

- **Data Holder server Implementation**: Seamlessly integrates the holder-sdk as an [npm package](https://github.com/ConsumerDataStandardsAustralia/holder-sdk) and utilises the middleware functions effectively.
- **Endpoint Configuration**: Lists application API endpoints through an **`endpoints.json`** configuration file.
- **Error Handling**: Simulates real-world scenarios to demonstrate comprehensive error handling, fully detailed in the [JS Holder SDK GitHub repository](https://github.com/ConsumerDataStandardsAustralia/js-holder-sdk).

## Local Setup and Customisation

### Prerequisites

Before you begin, ensure you have the following installed:

- Git, for cloning the repository.
- [Node.js](https://nodejs.org/en/) (***Note:** This demo project was tested with NodeJS v18.12.1.*)
- npm (Node Package Manager) - **included with Node.js installation**.

### Installation

1. Create a fork of this repository. To do this, click the "Fork" button on the top right corner of this page. 
2. After forking the repository, clone it to your local machine. You can do this by running the following command in your terminal or command prompt:
    
    ```bash
    git clone https://github.com/your-username/project-name.git
    ```
    
    Replace **`your-username`** with your GitHub username and **`project-name`** with the name of your repository.
    
3. Once the repository is cloned, navigate to the project directory by running:
    
    ```bash
    cd project-name
    ```
    
    Replace **`project-name`** with the name of the repository.
    

### Build and Run

1. **Build the Project**:
    
    ```bash
    npm run build
    ```
    
2. **Start the Server**:
    
    ```bash
    npm start
    ```
    

### Testing with Postman

Use the [DSB Postman collection](https://github.com/ConsumerDataStandardsAustralia/dsb-postman) (**`/src/postman/MiddlewareDemo.postman_collection.json`**) to test common scenarios, such as invalid headers. 

Run the [Postman collection](https://www.postman.com/winter-shadow-541400/workspace/dsb-schema-tests) with the environment file in **`src/postman/MiddleWare Demo.postman_environment.json`**, which contains an JWT access token with scopes.

## Contributing Process

We welcome contributions from the community! If you'd like to contribute to this project, please follow these simple steps:

1. Create a new branch for your work from the `master` branch:
    
    ```bash
    git checkout -b feature/your-feature-name
    ```
    
2. Begin making your changes or contributions.
3. Follow the instructions in the project repository to run and test your changes locally.
4. Commit your changes with clear and concise commit messages.
5. Push your changes to your forked repository.
6. Open a pull request (PR) using the `master` branch in the [original repository](https://github.com/ConsumerDataStandardsAustralia/js-holder-sdk-demo) as the destination branch. Include a detailed description of your changes and the problem you are addressing.
7. Engage in the discussion on your PR and make any necessary adjustments based on feedback from maintainers and other contributors.
8. Once your PR is approved and all tests pass, it will be merged into the project.


## Reporting Issues

Encountered an issue? We're here to help. Please visit our [issue reporting guidelines](https://d61cds.notion.site/Issue-Reporting-Guidelines-71a329a0658c4b69a232eab95822509b?pvs=4) for submitting an issue.

## Stay Updated

Join our newsletter to receive the latest updates, release notes, and alerts. [Subscribe here](https://consumerdatastandards.us18.list-manage.com/subscribe?u=fb3bcb1ec5662d9767ab3c414&id=a4414b3906).

## License

The artefact is released under the [MIT License](https://github.com/ConsumerDataStandardsAustralia/java-artefacts/blob/master/LICENSE), which allows the community to use and modify it freely.


## Disclaimer

The artefacts in this repository are offered without warranty or liability, in accordance with the [MIT licence.](https://github.com/ConsumerDataStandardsAustralia/java-artefacts/blob/master/LICENSE)

[The Data Standards Body](https://consumerdatastandards.gov.au/about/) (DSB) develops these artefacts in the course of its work, in order to perform quality assurance on the Australian Consumer Data Right Standards (Data Standards).

The DSB makes this repository, and its artefacts, public [on a non-commercial basis](https://github.com/ConsumerDataStandardsAustralia/java-artefacts/blob/master/LICENSE) in the interest of supporting the participants in the CDR ecosystem.

The resources of the DSB are primarily directed towards assisting the [Data Standards Chair](https://consumerdatastandards.gov.au/about/) for [developing the Data Standards](https://github.com/ConsumerDataStandardsAustralia/standards).

Consequently, the development work provided on the artefacts in this repository is on a best-effort basis, and the DSB acknowledges the use of these tools alone is not sufficient for, nor should they be relied upon with respect to [accreditation](https://www.accc.gov.au/focus-areas/consumer-data-right-cdr-0/cdr-draft-accreditation-guidelines), conformance, or compliance purposes.
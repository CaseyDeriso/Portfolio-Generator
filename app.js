const inquirer = require("inquirer");
const fs = require("fs");
const generatePage = require("./src/page-template.js");
const { writeFile, copyFile } = require('./utils/generate-site.js')

const mockData = {
  name: "casey",
  github: "caseyderiso",
  confirmAbout: true,
  about: "i'm a dude, plaing a dude, disguised as another dude.",
  projects: [
    {
      name: "casey",
      description: "casey",
      languages: ['Javascript', 'HTML', 'CSS'],
      link: "https://github.com",
      feature: true,
      confirmAddProject: true,
    },
    {
      name: "jones",
      languages: ['Javascript', 'Jquery'],
      link: "https://github.com",
      feature: false,
      confirmAddProject: false,
    },
  ],
};

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter your Username!");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        'Would you like to enter some information about yourself for an "about me" section?',
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};

const promptProject = (portfolioData) => {
  // if there's no projects array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
    =================
    Add a New Project
    =================
    `);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        validate: (projectName) => {
          if (projectName) {
            return true;
          } else {
            console.log("Please enter a project name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of the project (Required)",
        validate: (projectDesc) => {
          if (projectDesc) {
            return true;
          } else {
            console.log("Please enter a project description!");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (Check all that apply)",
        choices: [
          "Javascript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "input",
        name: "link",
        message: "Enter the GitHub link to your project. (Required)",
        validate: (githubLink) => {
          if (githubLink) {
            return true;
          } else {
            console.log("Please enter a github link to your project!");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project?",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another Project?",
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

// prompt user, prompt projects, then create HTML
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });

// // create file with mock data
// const test = (data) => {
//   const pageHTML = generatePage(mockData);
//   fs.writeFile("./dist/index.html", pageHTML, (err) => {
//     if (err) throw err;
//     console.log("Portfolio complete! Check out index.html to see the output!");

//     fs.copyFile('./src/style.css', './dist/style.css', err => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       console.log('Style sheet copied successfully!');
//     });
//   });
// };
// test();

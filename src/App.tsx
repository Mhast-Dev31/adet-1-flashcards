import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  RotateCcw,
  XCircle,
  Layers3,
  Trophy,
  BookOpen,
} from 'lucide-react';

type Card = {
  id: number;
  topic: string;
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
};

const CARDS: Card[] = [
  {
    id: 1,
    topic: 'Application Development',
    question: 'What is an application?',
    choices: [
      'A software program that performs specific tasks',
      'A physical computer component',
      'A database table only',
      'A network cable',
    ],
    answer: 'A software program that performs specific tasks',
    explanation:
      'An application is software that allows users to perform specific tasks.',
  },
  {
    id: 2,
    topic: 'Application Development',
    question: 'What is application development?',
    choices: [
      'Planning, designing, creating, testing, and deploying an application',
      'Only writing HTML',
      'Only fixing hardware',
      'Only creating a database',
    ],
    answer:
      'Planning, designing, creating, testing, and deploying an application',
    explanation:
      'Application development covers the full software creation process: plan, design, create, test, and deploy.',
  },
  {
    id: 3,
    topic: 'Application Development',
    question:
      'Creating a website accessed through Chrome is an example of what type of development?',
    choices: [
      'Web Development',
      'Desktop Application Development',
      'Game Development',
      'Cloud Development',
    ],
    answer: 'Web Development',
    explanation: 'Web development creates websites and web applications.',
  },
  {
    id: 4,
    topic: 'Front-End vs Back-End',
    question: 'Which side focuses on what users see and interact with?',
    choices: [
      'Front-end',
      'Back-end',
      'Database layer only',
      'Version control',
    ],
    answer: 'Front-end',
    explanation:
      'Front-end development covers the user-facing interface and interactions.',
  },
  {
    id: 5,
    topic: 'Front-End vs Back-End',
    question:
      'A developer writes code that checks a username and password against a database. What is this?',
    choices: [
      'Back-end development',
      'Front-end styling',
      'HTML structure',
      'CSS layout',
    ],
    answer: 'Back-end development',
    explanation:
      'Authentication and database processing are server-side responsibilities.',
  },
  {
    id: 6,
    topic: 'HTML Basics',
    question: 'What does HTML stand for?',
    choices: [
      'HyperText Markup Language',
      'High Transfer Machine Language',
      'Hyperlink Text Management Language',
      'Home Tool Markup Language',
    ],
    answer: 'HyperText Markup Language',
    explanation:
      'HTML is the standard markup language used to structure web pages.',
  },
  {
    id: 7,
    topic: 'HTML Basics',
    question: 'What is the main purpose of HTML?',
    choices: [
      'Define webpage structure and content',
      'Control database authentication',
      'Track Git history',
      'Create server APIs',
    ],
    answer: 'Define webpage structure and content',
    explanation:
      'HTML provides the structure or skeleton of a webpage.',
  },
  {
    id: 8,
    topic: 'HTML Tags & Elements',
    question: 'In <p>Hello World</p>, what is <p>?',
    choices: [
      'The opening tag',
      'The content',
      'The closing tag',
      'An attribute',
    ],
    answer: 'The opening tag',
    explanation: 'The opening tag starts the paragraph element.',
  },
  {
    id: 9,
    topic: 'HTML Attributes',
    question: 'Which attribute specifies the destination URL of a link?',
    choices: ['href', 'src', 'alt', 'class'],
    answer: 'href',
    explanation: 'href tells the browser where an anchor link should go.',
  },
  {
    id: 10,
    topic: 'HTML Attributes',
    question: 'Which attribute specifies the source/location of an image?',
    choices: ['src', 'href', 'alt', 'id'],
    answer: 'src',
    explanation: 'src points to the image resource.',
  },
  {
    id: 11,
    topic: 'HTML Attributes',
    question: 'What is the purpose of alt in an <img> element?',
    choices: [
      'Provide alternative text',
      'Set the image URL',
      'Make the image a link',
      'Change the image width',
    ],
    answer: 'Provide alternative text',
    explanation: 'alt provides alternative text for the image.',
  },
  {
    id: 12,
    topic: 'HTML Structure',
    question: 'Which HTML section contains visible webpage content?',
    choices: ['<body>', '<head>', '<html>', '<meta>'],
    answer: '<body>',
    explanation: 'The body contains content that appears on the page.',
  },
  {
    id: 13,
    topic: 'HTML Structure',
    question:
      'Which HTML section contains metadata, title, and links to stylesheets?',
    choices: ['<head>', '<body>', '<footer>', '<main>'],
    answer: '<head>',
    explanation:
      'The head contains document metadata and resources such as CSS links.',
  },
  {
    id: 14,
    topic: 'HTML Lists',
    question: 'Which tag creates an unordered bullet list?',
    choices: ['<ul>', '<ol>', '<li>', '<list>'],
    answer: '<ul>',
    explanation: '<ul> means unordered list.',
  },
  {
    id: 15,
    topic: 'HTML Lists',
    question: 'Which tag creates a numbered list?',
    choices: ['<ol>', '<ul>', '<li>', '<num>'],
    answer: '<ol>',
    explanation: '<ol> means ordered list.',
  },
  {
    id: 16,
    topic: 'HTML Forms',
    question: 'Which tag defines a form used to collect user input?',
    choices: ['<form>', '<input>', '<collect>', '<data>'],
    answer: '<form>',
    explanation:
      'The form element groups and defines user input controls.',
  },
  {
    id: 17,
    topic: 'HTML Forms',
    question: 'Which input type is appropriate for passwords?',
    choices: ['password', 'secret', 'hidden-text', 'secure'],
    answer: 'password',
    explanation:
      '<input type="password"> masks typed characters.',
  },
  {
    id: 18,
    topic: 'CSS Basics',
    question: 'What does CSS stand for?',
    choices: [
      'Cascading Style Sheets',
      'Computer Style Syntax',
      'Coded Style System',
      'Cascading Script Sheets',
    ],
    answer: 'Cascading Style Sheets',
    explanation:
      'CSS controls the appearance and formatting of HTML elements.',
  },
  {
    id: 19,
    topic: 'CSS Basics',
    question: 'What does CSS primarily control?',
    choices: [
      'Appearance and style',
      'Database records',
      'Git commits',
      'Server authentication',
    ],
    answer: 'Appearance and style',
    explanation:
      'CSS handles color, spacing, typography, layout, borders, and more.',
  },
  {
    id: 20,
    topic: 'CSS Syntax',
    question: 'In p { color: red; }, what is p?',
    choices: ['Selector', 'Property', 'Value', 'Declaration block'],
    answer: 'Selector',
    explanation:
      'The selector identifies which elements receive the style.',
  },
  {
    id: 21,
    topic: 'CSS Syntax',
    question: 'In p { color: red; }, what is color?',
    choices: ['Property', 'Selector', 'Value', 'Element'],
    answer: 'Property',
    explanation: 'color is the CSS property being set.',
  },
  {
    id: 22,
    topic: 'CSS Syntax',
    question: 'In p { color: red; }, what is red?',
    choices: ['Value', 'Property', 'Selector', 'Pseudo-class'],
    answer: 'Value',
    explanation:
      'red is the value assigned to the color property.',
  },
  {
    id: 23,
    topic: 'CSS Methods',
    question:
      'Which CSS method places styles directly inside an HTML element using style="..."?',
    choices: [
      'Inline CSS',
      'Internal CSS',
      'External CSS',
      'Embedded JavaScript',
    ],
    answer: 'Inline CSS',
    explanation:
      'Inline CSS is written directly on the HTML element.',
  },
  {
    id: 24,
    topic: 'CSS Methods',
    question:
      'Which method uses a separate .css file linked with <link rel="stylesheet" href="style.css">?',
    choices: [
      'External CSS',
      'Inline CSS',
      'Internal CSS',
      'Browser CSS',
    ],
    answer: 'External CSS',
    explanation:
      'External CSS stores reusable styles in a separate stylesheet.',
  },
  {
    id: 25,
    topic: 'CSS Selectors',
    question:
      'Which selector targets elements with a class named important?',
    choices: ['.important', '#important', '*important', ':important'],
    answer: '.important',
    explanation:
      'A class selector starts with a period.',
  },
  {
    id: 26,
    topic: 'CSS Selectors',
    question:
      'Which selector targets the element with id="title"?',
    choices: ['#title', '.title', '*title', ':title'],
    answer: '#title',
    explanation:
      'An ID selector starts with #.',
  },
  {
    id: 27,
    topic: 'CSS Selectors',
    question: 'Which selector targets all elements?',
    choices: ['*', '#', '.', ':'],
    answer: '*',
    explanation:
      'The universal selector * matches all elements.',
  },
  {
    id: 28,
    topic: 'CSS Pseudo-Classes',
    question: 'What does button:hover represent?',
    choices: [
      'A pseudo-class for a hover state',
      'A pseudo-element',
      'An ID selector',
      'An HTML attribute',
    ],
    answer: 'A pseudo-class for a hover state',
    explanation:
      'Pseudo-classes describe special states such as hover, active, visited, and link.',
  },
  {
    id: 29,
    topic: 'CSS Pseudo-Elements',
    question: 'Which is a pseudo-element?',
    choices: ['::before', ':hover', '.before', '#before'],
    answer: '::before',
    explanation:
      'Pseudo-elements use double colons and style a specific part of an element.',
  },
  {
    id: 30,
    topic: 'CSS Specificity',
    question: 'Which is more specific: .text or #special?',
    choices: [
      '#special',
      '.text',
      'They are equal',
      'It depends on the property',
    ],
    answer: '#special',
    explanation:
      'An ID selector has higher specificity than a class selector.',
  },
  {
    id: 31,
    topic: 'CSS Specificity',
    question:
      'When two CSS rules have equal specificity, which rule wins?',
    choices: [
      'The later rule',
      'The first rule',
      'The shorter rule',
      'The rule with fewer properties',
    ],
    answer: 'The later rule',
    explanation:
      'When specificity is equal, source order decides and the later rule wins.',
  },
  {
    id: 32,
    topic: 'CSS Box Model',
    question:
      'Which box-model area is immediately outside the content?',
    choices: ['Padding', 'Margin', 'Border', 'Viewport'],
    answer: 'Padding',
    explanation:
      'Padding is the space between content and the border.',
  },
  {
    id: 33,
    topic: 'CSS Box Model',
    question:
      'Which box-model area is outside the border?',
    choices: ['Margin', 'Padding', 'Content', 'Width'],
    answer: 'Margin',
    explanation:
      'Margin creates space outside the element border.',
  },
  {
    id: 34,
    topic: 'CSS Box Model',
    question:
      'What is the correct order from inside to outside?',
    choices: [
      'Content → Padding → Border → Margin',
      'Content → Margin → Padding → Border',
      'Padding → Content → Margin → Border',
      'Border → Padding → Content → Margin',
    ],
    answer: 'Content → Padding → Border → Margin',
    explanation:
      'Memorize the box-model order from inside outward.',
  },
  {
    id: 35,
    topic: 'CSS Units',
    question:
      'Which unit is relative to the root html font size?',
    choices: ['rem', 'em', 'px', 'vw'],
    answer: 'rem',
    explanation:
      'rem is relative to the root html element font size.',
  },
  {
    id: 36,
    topic: 'CSS Units',
    question:
      'Which unit is relative to the parent element font size?',
    choices: ['em', 'rem', 'vh', 'px'],
    answer: 'em',
    explanation:
      'em is relative to the parent element font size.',
  },
  {
    id: 37,
    topic: 'CSS Units',
    question:
      'Which unit is relative to the viewport width?',
    choices: ['vw', 'vh', 'rem', '%'],
    answer: 'vw',
    explanation:
      'vw represents a percentage of the viewport width.',
  },
  {
    id: 38,
    topic: 'CSS Colors',
    question:
      'Which color format uses Red, Green, and Blue numeric channels?',
    choices: ['RGB', 'HSL', 'HEX', 'EM'],
    answer: 'RGB',
    explanation:
      'RGB stands for red, green, and blue.',
  },
  {
    id: 39,
    topic: 'CSS Colors',
    question:
      'What does the A represent in RGBA?',
    choices: [
      'Alpha/transparency',
      'Alignment',
      'Animation',
      'Attribute',
    ],
    answer: 'Alpha/transparency',
    explanation:
      'The alpha channel controls transparency.',
  },
  {
    id: 40,
    topic: 'CSS Layout',
    question:
      'Which display value turns an element into a flex container?',
    choices: [
      'display: flex;',
      'display: block;',
      'display: inline;',
      'display: none;',
    ],
    answer: 'display: flex;',
    explanation:
      'display: flex activates Flexbox for the container.',
  },
  {
    id: 41,
    topic: 'Flexbox',
    question:
      'In a row flex container, which property aligns items along the main horizontal axis?',
    choices: [
      'justify-content',
      'align-items',
      'gap',
      'position',
    ],
    answer: 'justify-content',
    explanation:
      'With flex-direction: row, the main axis is horizontal.',
  },
  {
    id: 42,
    topic: 'Flexbox',
    question:
      'Which value puts maximum available space between flex items?',
    choices: [
      'space-between',
      'center-between',
      'spread',
      'space-max',
    ],
    answer: 'space-between',
    explanation:
      'justify-content: space-between distributes extra space between items.',
  },
  {
    id: 43,
    topic: 'CSS Positioning',
    question:
      'Which position value is the default positioning mode?',
    choices: ['static', 'relative', 'absolute', 'fixed'],
    answer: 'static',
    explanation:
      'position: static is the default positioning mode.',
  },
  {
    id: 44,
    topic: 'CSS Positioning',
    question:
      'Which position keeps an element fixed relative to the viewport while scrolling?',
    choices: ['fixed', 'absolute', 'relative', 'static'],
    answer: 'fixed',
    explanation:
      'position: fixed anchors the element to the viewport.',
  },
  {
    id: 45,
    topic: 'CSS Transforms',
    question:
      'Which transform moves an element horizontally?',
    choices: [
      'translateX()',
      'scale()',
      'rotate()',
      'translateZ()',
    ],
    answer: 'translateX()',
    explanation:
      'translateX moves an element along the horizontal axis.',
  },
  {
    id: 46,
    topic: 'CSS Transforms',
    question:
      'Which transform makes an element larger or smaller?',
    choices: [
      'scale()',
      'rotate()',
      'translateY()',
      'skew-only()',
    ],
    answer: 'scale()',
    explanation:
      'scale() changes the visual size of an element.',
  },
  {
    id: 47,
    topic: 'Responsive Design',
    question:
      'What does responsive design mean?',
    choices: [
      'A website adapts to different screen sizes and devices',
      'A site only works on desktop',
      'A site changes database tables',
      'A site automatically uses Git',
    ],
    answer:
      'A website adapts to different screen sizes and devices',
    explanation:
      'Responsive design helps interfaces remain usable across different devices.',
  },
  {
    id: 48,
    topic: 'Responsive Design',
    question:
      'What does @media (max-width: 768px) generally mean?',
    choices: [
      'Apply styles when the viewport is 768px wide or smaller',
      'Only apply styles above 768px',
      'Hide the page at 768px',
      'Set the page width to exactly 768px',
    ],
    answer:
      'Apply styles when the viewport is 768px wide or smaller',
    explanation:
      'A max-width media query targets that width and below.',
  },
  {
    id: 49,
    topic: 'Git Basics',
    question: 'What is Git?',
    choices: [
      'A distributed version control system',
      'A web browser',
      'A programming language',
      'A database engine',
    ],
    answer: 'A distributed version control system',
    explanation:
      'Git tracks file changes, history, branches, and collaboration workflows.',
  },
  {
    id: 50,
    topic: 'Git Basics',
    question: 'What is GitHub?',
    choices: [
      'A web-based platform for hosting Git repositories and collaboration',
      'The Git command-line executable',
      'A CSS framework',
      'A local database',
    ],
    answer:
      'A web-based platform for hosting Git repositories and collaboration',
    explanation:
      'GitHub provides remote repositories and collaboration features.',
  },
  {
    id: 51,
    topic: 'Git Core Concepts',
    question: 'What is a repository?',
    choices: [
      'A collection of project files tracked by Git',
      'A single commit message',
      'A CSS selector',
      'A remote URL only',
    ],
    answer:
      'A collection of project files tracked by Git',
    explanation:
      'A repository stores project files together with Git history and configuration.',
  },
  {
    id: 52,
    topic: 'Git Core Concepts',
    question: 'What is a commit?',
    choices: [
      'A snapshot of the project at a point in time',
      'A branch switch',
      'A remote server',
      'A merge conflict',
    ],
    answer:
      'A snapshot of the project at a point in time',
    explanation:
      'A commit records staged changes in Git history.',
  },
  {
    id: 53,
    topic: 'Git Core Concepts',
    question: 'What is a branch?',
    choices: [
      'A separate line of development',
      'A saved password',
      'A staging command',
      'A remote repository',
    ],
    answer: 'A separate line of development',
    explanation:
      'Branches allow developers to work independently on features or fixes.',
  },
  {
    id: 54,
    topic: 'Git Core Concepts',
    question: 'What does the staging area do?',
    choices: [
      'Prepares selected changes for the next commit',
      'Publishes changes to GitHub',
      'Deletes all files',
      'Creates a database',
    ],
    answer:
      'Prepares selected changes for the next commit',
    explanation:
      'git add places selected changes into the staging area.',
  },
  {
    id: 55,
    topic: 'Git Commands',
    question:
      'Which command initializes a new Git repository?',
    choices: [
      'git init',
      'git start',
      'git create',
      'git repo',
    ],
    answer: 'git init',
    explanation:
      'git init initializes Git tracking in the current project.',
  },
  {
    id: 56,
    topic: 'Git Commands',
    question:
      'Which command shows modified, staged, and untracked files?',
    choices: [
      'git status',
      'git show',
      'git inspect',
      'git state',
    ],
    answer: 'git status',
    explanation:
      'git status reports the current state of the working tree and staging area.',
  },
  {
    id: 57,
    topic: 'Git Commands',
    question:
      'Which command stages all current changes?',
    choices: [
      'git add .',
      'git stage all',
      'git commit .',
      'git push .',
    ],
    answer: 'git add .',
    explanation:
      'git add . stages changes in the current directory tree.',
  },
  {
    id: 58,
    topic: 'Git Commands',
    question:
      'Which command creates a commit with a message?',
    choices: [
      'git commit -m "message"',
      'git save -m "message"',
      'git push -m "message"',
      'git snapshot "message"',
    ],
    answer:
      'git commit -m "message"',
    explanation:
      'git commit records staged changes, and -m supplies the commit message.',
  },
  {
    id: 59,
    topic: 'Git Commands',
    question:
      'Which command shows commit history?',
    choices: [
      'git log',
      'git history',
      'git commits',
      'git timeline',
    ],
    answer: 'git log',
    explanation:
      'git log displays commit history.',
  },
  {
    id: 60,
    topic: 'Git Commands',
    question:
      'Which command shows differences in changes?',
    choices: [
      'git diff',
      'git compare',
      'git changes',
      'git inspect',
    ],
    answer: 'git diff',
    explanation:
      'git diff shows differences between file states.',
  },
  {
    id: 61,
    topic: 'Git Branching',
    question:
      'Which command creates a branch named feature?',
    choices: [
      'git branch feature',
      'git new feature',
      'git checkout --new feature',
      'git make-branch feature',
    ],
    answer: 'git branch feature',
    explanation:
      'git branch feature creates the branch.',
  },
  {
    id: 62,
    topic: 'Git Branching',
    question:
      'Which command switches to an existing feature branch in the module?',
    choices: [
      'git checkout feature',
      'git branch --move feature',
      'git use feature',
      'git switchto feature',
    ],
    answer: 'git checkout feature',
    explanation:
      'The module teaches git checkout to switch branches.',
  },
  {
    id: 63,
    topic: 'Git Merging',
    question:
      'Which command combines changes from feature into the current branch?',
    choices: [
      'git merge feature',
      'git combine feature',
      'git join feature',
      'git attach feature',
    ],
    answer: 'git merge feature',
    explanation:
      'git merge integrates another branch into the current branch.',
  },
  {
    id: 64,
    topic: 'Git Merge Conflicts',
    question:
      'What is a merge conflict?',
    choices: [
      'Git cannot automatically combine conflicting changes',
      'A repository has no branches',
      'A commit has a long message',
      'GitHub is offline',
    ],
    answer:
      'Git cannot automatically combine conflicting changes',
    explanation:
      'A conflict happens when Git cannot automatically combine incompatible changes.',
  },
  {
    id: 65,
    topic: 'Git Merge Conflicts',
    question:
      'After manually resolving a conflict, what should you generally do before the final commit?',
    choices: [
      'Stage the resolved file with git add',
      'Delete the repository',
      'Run git init again',
      'Push without staging',
    ],
    answer:
      'Stage the resolved file with git add',
    explanation:
      'After resolving and saving the file, stage it and then commit.',
  },
  {
    id: 66,
    topic: 'Git Remote',
    question:
      'What does git remote add origin <repository-url> do?',
    choices: [
      'Connects the local repository to a remote repository named origin',
      'Creates a local branch named origin',
      'Uploads files immediately',
      'Deletes the remote',
    ],
    answer:
      'Connects the local repository to a remote repository named origin',
    explanation:
      'origin is the common name for a remote repository.',
  },
  {
    id: 67,
    topic: 'GitHub Push & Pull',
    question: 'What does git push do?',
    choices: [
      'Sends local commits to the remote repository',
      'Downloads remote changes',
      'Creates a merge conflict',
      'Stages files',
    ],
    answer:
      'Sends local commits to the remote repository',
    explanation:
      'Push sends local commits to the remote repository.',
  },
  {
    id: 68,
    topic: 'GitHub Push & Pull',
    question: 'What does git pull do?',
    choices: [
      'Gets remote changes and integrates them into the local branch',
      'Uploads local commits',
      'Creates a branch',
      'Unstages files',
    ],
    answer:
      'Gets remote changes and integrates them into the local branch',
    explanation:
      'Pull gets changes from the remote repository and integrates them locally.',
  },
  {
    id: 69,
    topic: 'GitHub Collaboration',
    question:
      'You finished a feature branch and want teammates to review it before merging into main. What should you use?',
    choices: [
      'Pull Request',
      'git init',
      'git reset',
      '.gitignore',
    ],
    answer: 'Pull Request',
    explanation:
      'A Pull Request allows changes to be proposed and reviewed before merging.',
  },
  {
    id: 70,
    topic: 'GitHub Collaboration',
    question:
      'What are GitHub Issues mainly used for?',
    choices: [
      'Tracking bugs, feature requests, and tasks',
      'Changing CSS colors',
      'Creating HTML headings',
      'Running the database',
    ],
    answer:
      'Tracking bugs, feature requests, and tasks',
    explanation:
      'GitHub Issues help teams track tasks, bugs, and feature requests.',
  },
  {
    id: 71,
    topic: 'GitHub',
    question:
      'What is GitHub Pages used for?',
    choices: [
      'Hosting static websites from a GitHub repository',
      'Storing database passwords',
      'Creating private Git commits',
      'Managing CSS selectors',
    ],
    answer:
      'Hosting static websites from a GitHub repository',
    explanation:
      'GitHub Pages can host static websites from a repository.',
  },
  {
    id: 72,
    topic: 'Git Best Practices',
    question:
      'What is the purpose of .gitignore?',
    choices: [
      'Tell Git which files or directories to ignore',
      'Delete Git history',
      'Create a pull request',
      'Force every file to be committed',
    ],
    answer:
      'Tell Git which files or directories to ignore',
    explanation:
      '.gitignore can exclude files such as node_modules, .env, and local config files.',
  },
  {
    id: 73,
    topic: 'Git Best Practices',
    question:
      'Which is the better commit message?',
    choices: [
      'Add user login form',
      'stuff',
      'changes',
      'update',
    ],
    answer: 'Add user login form',
    explanation:
      'Good commit messages are clear, concise, descriptive, and use an imperative style.',
  },
  {
    id: 74,
    topic: 'Git Best Practices',
    question:
      'Which branch name best communicates its purpose?',
    choices: [
      'feature/add-login',
      'branch1',
      'test',
      'stuff',
    ],
    answer: 'feature/add-login',
    explanation:
      'Descriptive branch names communicate the purpose of the work.',
  },
  {
    id: 75,
    topic: 'Undoing Changes',
    question:
      'Which command is commonly used to unstage a file?',
    choices: [
      'git reset file.txt',
      'git revert file.txt',
      'git push file.txt',
      'git init file.txt',
    ],
    answer: 'git reset file.txt',
    explanation:
      'git reset file.txt can remove the file from staging while keeping the working changes.',
  },
  {
    id: 76,
    topic: 'Undoing Changes',
    question:
      'What is a key difference between git reset and git revert?',
    choices: [
      'revert creates a new commit that undoes an earlier commit',
      'reset always uploads to GitHub',
      'revert only changes CSS',
      'reset creates a new pull request',
    ],
    answer:
      'revert creates a new commit that undoes an earlier commit',
    explanation:
      'git revert preserves history by creating a new commit that reverses an earlier commit.',
  },
  {
    id: 77,
    topic: 'Exam Scenarios',
    question:
      'A developer changes a button from blue to red. Which area is most directly involved?',
    choices: [
      'Front-end / CSS',
      'Back-end / database',
      'Git remote',
      'Merge conflict resolution',
    ],
    answer: 'Front-end / CSS',
    explanation:
      'Button appearance is user-facing styling handled by CSS on the front end.',
  },
  {
    id: 78,
    topic: 'Exam Scenarios',
    question:
      'A developer changes the same line on two branches and Git cannot decide which version to keep. What happened?',
    choices: [
      'Merge conflict',
      'Responsive design',
      'CSS specificity',
      'Staging',
    ],
    answer: 'Merge conflict',
    explanation:
      'Git needs manual resolution when changes cannot be automatically combined.',
  },
  {
    id: 79,
    topic: 'Exam Scenarios',
    question:
      'A website looks good on desktop but is hard to use on a phone. What concept should be applied?',
    choices: [
      'Responsive design',
      'Git branching',
      'HTML attributes',
      'Database normalization',
    ],
    answer: 'Responsive design',
    explanation:
      'Responsive design adapts layouts and interfaces to different screen sizes.',
  },
  {
    id: 80,
    topic: 'Exam Scenarios',
    question:
      'You save staged changes locally, then want to send those commits to GitHub. Which sequence is correct?',
    choices: [
      'git commit, then git push',
      'git push, then git commit',
      'git pull, then git init',
      'git reset, then git add',
    ],
    answer: 'git commit, then git push',
    explanation:
      'A commit records the staged changes locally; push sends those commits to the remote.',
  },

  // =========================================================
  // 20 ADDITIONAL SCENARIO-BASED QUESTIONS
  // =========================================================

  {
    id: 81,
    topic: 'Application Development Scenarios',
    question:
      'A team is building an Android app that students install on their smartphones to check their grades. Which type of application development is this?',
    choices: [
      'Mobile Application Development',
      'Desktop Application Development',
      'Web Development',
      'Game Development',
    ],
    answer: 'Mobile Application Development',
    explanation:
      'The application is designed for smartphones, so it falls under mobile application development.',
  },
  {
    id: 82,
    topic: 'Application Development Scenarios',
    question:
      'A company wants software that employees install directly on Windows computers to manage inventory without using a browser. Which type of development is most appropriate?',
    choices: [
      'Desktop Application Development',
      'Web Development',
      'Mobile Application Development',
      'Game Development',
    ],
    answer: 'Desktop Application Development',
    explanation:
      'Software installed and run directly on computers is desktop application development.',
  },
  {
    id: 83,
    topic: 'Application Development Scenarios',
    question:
      'A developer is creating a service that relies on cloud infrastructure so users can access stored data and services over the internet. Which type of development best matches this?',
    choices: [
      'Cloud Development',
      'Desktop Application Development',
      'Game Development',
      'HTML Development',
    ],
    answer: 'Cloud Development',
    explanation:
      'Cloud development focuses on applications or services that use cloud infrastructure.',
  },
  {
    id: 84,
    topic: 'Front-End vs Back-End Scenarios',
    question:
      'A developer changes the navigation menu so users can see a new Home button and a larger Login button. Is this mainly front-end or back-end work?',
    choices: [
      'Front-end',
      'Back-end',
      'Database administration',
      'Version control',
    ],
    answer: 'Front-end',
    explanation:
      'Navigation menus and button appearance are part of the user-facing interface.',
  },
  {
    id: 85,
    topic: 'HTML Scenarios',
    question:
      'You are creating a page where the browser should display the title of the website in the browser tab and load a stylesheet. Where should these items normally be placed?',
    choices: [
      '<head>',
      '<body>',
      '<footer>',
      '<p>',
    ],
    answer: '<head>',
    explanation:
      'The head contains the title, metadata, and links to external stylesheets.',
  },
  {
    id: 86,
    topic: 'HTML Scenarios',
    question:
      'A registration page asks users to enter their email address and password. Which HTML structure is most appropriate for collecting these values?',
    choices: [
      '<form> with appropriate <input> elements',
      '<ul> with <li> elements',
      '<img> with src attributes',
      '<h1> with headings',
    ],
    answer: '<form> with appropriate <input> elements',
    explanation:
      'HTML forms are designed to collect information from users using inputs and other form controls.',
  },
  {
    id: 87,
    topic: 'CSS Scenarios',
    question:
      'A website has ten different pages that should all use the same colors, fonts, and spacing. Which CSS approach is the best choice?',
    choices: [
      'External CSS',
      'Inline CSS on every element',
      'A separate style attribute for every page element',
      'No CSS',
    ],
    answer: 'External CSS',
    explanation:
      'An external stylesheet can be reused across multiple pages and is easier to maintain.',
  },
  {
    id: 88,
    topic: 'CSS Selectors & Specificity Scenarios',
    question:
      'An element has class="card" and id="special". There is a .card rule and a #special rule that set different colors. Which color rule wins?',
    choices: [
      'The #special rule',
      'The .card rule',
      'Both colors are applied equally',
      'Neither rule applies',
    ],
    answer: 'The #special rule',
    explanation:
      'ID selectors have greater specificity than class selectors.',
  },
  {
    id: 89,
    topic: 'CSS Cascading Scenarios',
    question:
      'Two CSS rules both target <p> with the same specificity. The first sets the text to blue and the second sets it to red. What color will appear?',
    choices: [
      'Red',
      'Blue',
      'Both blue and red at the same time',
      'The browser chooses randomly',
    ],
    answer: 'Red',
    explanation:
      'When specificity is equal, the later rule in the stylesheet wins.',
  },
  {
    id: 90,
    topic: 'CSS Box Model Scenarios',
    question:
      'A developer wants more space between the text inside a button and the button border. Which property should be increased?',
    choices: [
      'padding',
      'margin',
      'position',
      'opacity',
    ],
    answer: 'padding',
    explanation:
      'Padding creates space between the content and the border.',
  },
  {
    id: 91,
    topic: 'CSS Units Scenarios',
    question:
      'A heading should scale based on the root HTML font size so that changing the root size can affect it consistently. Which unit is most appropriate?',
    choices: [
      'rem',
      'em',
      'px',
      'vh',
    ],
    answer: 'rem',
    explanation:
      'rem is relative to the root html font size.',
  },
  {
    id: 92,
    topic: 'CSS Colors & Properties Scenarios',
    question:
      'A designer wants a red text color with 50% transparency. Which CSS value is appropriate?',
    choices: [
      'rgba(255, 0, 0, 0.5)',
      'rgb(255, 0, 0)',
      '#FFFFFF',
      'hsl(120, 100%, 50%)',
    ],
    answer: 'rgba(255, 0, 0, 0.5)',
    explanation:
      'RGBA includes an alpha channel, which controls transparency.',
  },
  {
    id: 93,
    topic: 'CSS Layout & Positioning Scenarios',
    question:
      'A support button should remain in the bottom-right corner of the browser window even while the user scrolls. Which position value should be considered?',
    choices: [
      'fixed',
      'static',
      'relative',
      'inline',
    ],
    answer: 'fixed',
    explanation:
      'position: fixed keeps the element positioned relative to the viewport while scrolling.',
  },
  {
    id: 94,
    topic: 'Flexbox Scenarios',
    question:
      'Three menu items are inside a row flex container. You want the first item at the left, the last item at the right, and the remaining space distributed between them. Which declaration should you use?',
    choices: [
      'justify-content: space-between;',
      'align-items: space-between;',
      'gap: 0;',
      'flex-direction: column;',
    ],
    answer: 'justify-content: space-between;',
    explanation:
      'In a row flex container, justify-content controls the main horizontal axis and space-between distributes the available space between items.',
  },
  {
    id: 95,
    topic: 'Transforms & Hover Scenarios',
    question:
      'A button should become slightly larger only when the mouse pointer is over it. Which CSS combination is most appropriate?',
    choices: [
      'button:hover { transform: scale(1.1); }',
      'button:before { transform: rotate(1.1); }',
      'button { opacity: scale(1.1); }',
      'button:hover { display: none; }',
    ],
    answer:
      'button:hover { transform: scale(1.1); }',
    explanation:
      ':hover targets the hover state and scale(1.1) visually makes the button larger.',
  },
  {
    id: 96,
    topic: 'Responsive Design Scenarios',
    question:
      'A website uses a horizontal layout on desktop, but the developer wants the items stacked vertically when the screen is 768px wide or smaller. Which approach should be used?',
    choices: [
      '@media (max-width: 768px) with flex-direction: column;',
      'position: fixed;',
      'git branch mobile;',
      'padding: 768px;',
    ],
    answer:
      '@media (max-width: 768px) with flex-direction: column;',
    explanation:
      'A media query can apply a different layout at smaller screen widths.',
  },
  {
    id: 97,
    topic: 'Version Control Scenarios',
    question:
      'You are working on a project and want a system that records previous versions so you can see what changed and restore earlier work. What should you use?',
    choices: [
      'Version control with Git',
      'Only HTML',
      'Only CSS',
      'A web browser',
    ],
    answer: 'Version control with Git',
    explanation:
      'Git is a version control system used to track changes and maintain project history.',
  },
  {
    id: 98,
    topic: 'Git Commands & Branching Scenarios',
    question:
      'You want to create a new feature branch, switch to it, work on the feature, and later combine it into main. Which sequence best matches the module?',
    choices: [
      'git branch feature → git checkout feature → git checkout main → git merge feature',
      'git push feature → git init main → git pull feature',
      'git reset feature → git diff main → git add main',
      'git commit feature → git delete main → git pull feature',
    ],
    answer:
      'git branch feature → git checkout feature → git checkout main → git merge feature',
    explanation:
      'The module teaches creating the branch, switching to it, returning to main, and merging the feature branch into main.',
  },
  {
    id: 99,
    topic: 'Merge Conflict Scenarios',
    question:
      'Two developers edit the same line of code differently on separate branches. When one branch is merged, Git cannot automatically choose which change to keep. What should the team do?',
    choices: [
      'Open the conflicting file, choose the correct changes, save it, run git add, then commit',
      'Run git init again',
      'Delete both branches immediately',
      'Push repeatedly until Git chooses a version',
    ],
    answer:
      'Open the conflicting file, choose the correct changes, save it, run git add, then commit',
    explanation:
      'A merge conflict must be manually resolved, staged, and then committed.',
  },
  {
    id: 100,
    topic: 'GitHub & Best Practices Scenarios',
    question:
      'A student finishes a feature on a branch and wants teammates to review it before it is merged into main. The team also wants clear task tracking and descriptive branch names. Which combination is best?',
    choices: [
      'Pull Request + GitHub Issues + descriptive branch names',
      'git init + random branch names + no review',
      'git reset + CSS selectors + anonymous commits',
      'GitHub Pages + margin + padding',
    ],
    answer:
      'Pull Request + GitHub Issues + descriptive branch names',
    explanation:
      'Pull Requests support code review, GitHub Issues track tasks and bugs, and descriptive branch names make work easier to understand.',
  },
];

const topics = [
  'All',
  ...Array.from(new Set(CARDS.map(card => card.topic))),
];

/*
 * Shuffle the choices every time a new card is displayed.
 * The loop guarantees that the correct answer will not be
 * placed in position A.
 */
function shuffleChoices(card: Card): string[] {
  const shuffled = [...card.choices];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  // Make sure the correct answer is not always the first choice.
  if (shuffled[0] === card.answer) {
    const swapIndex = shuffled.findIndex(
      choice => choice !== card.answer
    );

    if (swapIndex > 0) {
      [shuffled[0], shuffled[swapIndex]] = [
        shuffled[swapIndex],
        shuffled[0],
      ];
    }
  }

  return shuffled;
}

function App() {
  const [topic, setTopic] = useState('All');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const filtered = useMemo(
    () =>
      topic === 'All'
        ? CARDS
        : CARDS.filter(card => card.topic === topic),
    [topic]
  );

  const card = filtered[current % filtered.length];

  const shuffledChoices = useMemo(
    () => shuffleChoices(card),
    [card.id]
  );

  const answered = selected !== null;
  const isCorrect = selected === card.answer;

  const chooseAnswer = (choice: string) => {
    if (answered) return;

    setSelected(choice);

    if (choice === card.answer) {
      setScore(value => value + 1);
    }
  };

  const next = () => {
    setCurrent(value => value + 1);
    setSelected(null);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
  };

  const changeTopic = (value: string) => {
    setTopic(value);
    setCurrent(0);
    setSelected(null);
    setScore(0);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">
              <BookOpen size={14} /> ADET 1 Exam Review
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Flashcards
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Gizmo-style multiple-choice review based on your ADET 1
              reviewer: HTML, CSS, Flexbox, responsive design, Git,
              GitHub, and scenario-based questions.
            </p>
          </div>

          <button
            onClick={restart}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            <RotateCcw size={16} />
            Restart
          </button>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Layers3 size={16} />
              Topic
            </div>

            <select
              value={topic}
              onChange={event => changeTopic(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-sm outline-none ring-violet-400/30 focus:ring-2"
            >
              {topics.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm text-slate-400">Progress</div>

            <div className="mt-2 flex items-end justify-between">
              <div className="text-2xl font-bold">
                {(current % filtered.length) + 1}{' '}
                <span className="text-base font-medium text-slate-500">
                  / {filtered.length}
                </span>
              </div>

              <div className="text-sm text-slate-400">
                {Math.round(
                  (((current % filtered.length) + 1) /
                    filtered.length) *
                    100
                )}
                %
              </div>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-violet-500 transition-all"
                style={{
                  width:
                    (((current % filtered.length) + 1) /
                      filtered.length) *
                      100 +
                    '%',
                }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Trophy size={16} />
              Score
            </div>

            <div className="mt-2 text-2xl font-bold">
              {score}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              Correct answers this session
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-2xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-200">
              {card.topic}
            </span>

            {answered && (
              <span
                className={
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ' +
                  (isCorrect
                    ? 'bg-emerald-500/10 text-emerald-300'
                    : 'bg-rose-500/10 text-rose-300')
                }
              >
                {isCorrect ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <XCircle size={14} />
                )}

                {isCorrect ? 'Correct' : 'Incorrect'}
              </span>
            )}
          </div>

          <h2 className="mt-6 text-2xl font-bold leading-tight sm:text-3xl">
            {card.question}
          </h2>

          <div className="mt-6 grid gap-3">
            {shuffledChoices.map((choice, index) => {
              const isSelected = selected === choice;
              const shouldShowCorrect =
                answered && choice === card.answer;

              const shouldShowWrong =
                answered &&
                isSelected &&
                choice !== card.answer;

              let classes =
                'border-white/10 bg-white/5 hover:bg-white/10';

              if (shouldShowCorrect) {
                classes =
                  'border-emerald-400/40 bg-emerald-400/10';
              } else if (shouldShowWrong) {
                classes =
                  'border-rose-400/40 bg-rose-400/10';
              } else if (isSelected) {
                classes =
                  'border-violet-400/50 bg-violet-400/10';
              }

              return (
                <button
                  key={choice}
                  onClick={() => chooseAnswer(choice)}
                  disabled={answered}
                  className={
                    'flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ' +
                    classes
                  }
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-sm font-bold text-slate-300">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="pt-1 text-sm font-medium leading-6 text-slate-200 sm:text-base">
                    {choice}
                  </span>
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-slate-200">
                Explanation
              </div>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                {card.explanation}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-slate-500">
              Tip: focus on definitions, differences, syntax, code
              interpretation, and scenarios.
            </div>

            <button
              onClick={next}
              disabled={!answered}
              className="rounded-xl bg-violet-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next question
            </button>
          </div>
        </section>

        <footer className="py-6 text-center text-xs text-slate-600">
          100 ADET 1 flashcards • Multiple choice • Randomized choices • Immediate feedback
        </footer>
      </div>
    </main>
  );
}

export default App;

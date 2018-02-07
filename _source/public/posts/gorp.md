
I use Git on an hourly basis, and sometimes it feels a bit tedious to me using the command line. 9 times out of 10 I am using a handfull of common commands. Things like making a new branch, staging changes, ect.

I've tried using some Git GUI applications such as Github desktop and others. But I often find when using a GUI, I always end up using the terminal at some point, defeating the purpose of using the GUI.

> But I often find when using a GUI, I always end up using the terminal at some point, defeating the purpose of using the GUI.

The main thing that I love about using a GUI is viewing the changes in a Github style diff. I had the idea for Gorp of bridging the gap between using the terminal, and a full on GUI. Gorp gives you all the common Git tasks with a couple of keystrokes, and also provides full Github style diffs shown in a launched browser.

![Diff](/images/projects/gorp/diff.png)

### Tasks Gorp currently supports

Branch List: _fetches from remote, and lists all branches_
```shelldark
$ gorp
master Choose a command Branch List
? Choose a command (Use arrow keys)
❯ Local branches (on your machine)
  Remote branches (on server)
  ──────────────
  Cancel
  ──────────────
```

```shelldark
? Choose a command Local branches (on your machine)
  gh-pages
  js-simple
* master
```

Branch Create: _lets you create a new branch and puts you on it_
```shelldark
$ gorp
master Choose a command Branch Create
? New branch name
```

Branch Delete: _lets you delete local or remote branches_
```shelldark
$ gorp
master Choose a command Branch Delete
? Choose branch to delete (Use arrow keys)
❯ gh-pages
  js-simple
  ──────────────
  Cancel
  ──────────────
```

Branch Change _lets you change which branch you are on_
```shelldark
$ gorp
master Choose a command Branch Change
? Chooes a different branch (Use arrow keys)
❯ gh-pages
  js-simple
  ──────────────
  Cancel
  ──────────────
```

Branch Compare _shows you a diff between your current branch and the one selected_
```shelldark
$ gorp
master Choose a command Branch Compare
? Choose branch to compare master to (Use arrow keys)
❯ gh-pages
  js-simple
  ──────────────
  Cancel
  ──────────────
```

Push to Remote _pushes your commits to remote_
Pull from Remote _pulls from remote_
Github open repo _if your repo is hosted on Github, it will open the url_
Github view issues _if your repo is hosted on Github, it will open the issues url_
Diff View _opens a Github style diff in your browser of your current changes_
View History _lists all commits on your current branch and lets you view a diff of selected one_
![History](/images/projects/gorp/history.png)


Stage Changes: _select which files you would like to stage_
```shelldark
$ gorp
master Choose a command Stage changes 9
? Choose files to stage (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◯  M _source/public/posts/_data.json
 ◯  M _source/public/styles/app.scss
 ◯  M _source/public/styles/github_theme.scss
 ◯  M _source/public/styles/index.scss
 ◯  D _source/public/styles/resume.scss
 ◯  ?? _source/public/images/projects/gorp.mp4
 ◯  ?? _source/public/images/projects/gorp/
 ◯  ?? _source/public/images/projects/gorp_thumb.png
 ◯  ?? _source/public/posts/gorp.md
```

### Install:

```shell
npm i gorp -g
```
### Usage:

Simply type gorp from a repo on the command line

```shell
cd {your repo}
gorp
master Choose a command (Use arrow keys)
❯ Branch List
  Branch Create
  Branch Delete
  Branch Change
  Branch Compare
  ──────────────
  - Push to remote (up to date)
  - Pull from remote (up to date)
  ──────────────
  Github open repo
  Github view issues
  ──────────────
  Diff View 8
  View History
  - Diff View Staged (No changes staged)
  ──────────────
  Stage changes 8
  Discard Changes 8
  - Commit changes (Nothing Staged)
  ──────────────
  List Commands
  Quit
  ──────────────
```

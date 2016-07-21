---
title: Pimp Your Bash Prompt
date: 2012, November
intro: Show your Git branch & dirty/clean from your bash prompt.
tags: Bash
---

Often it happens from not knowing your context while working. This helps keep that from happening.

Open your ```~/.bash_profile``` file and add the following methods that we will need to use in your new prompt.


### Show Git branch _(if applicable)_
This shows which branch you are currently on.

```bash
parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
```

### Show Git dirty _(if you have uncommitted changes)_
Shows if you have any uncommitted / staged changes.

```bash
function parse_git_dirty {
  [[ -n "$(git status -s 2> /dev/null)" ]] && echo "• "
}
```

### Putting it all together
This also shortens your working directory listing to just the folder you are in, giving you more space to type commands.

```bash
export PS1="\n\[$(tput bold)\]\[$(tput setaf 5)\]➜ \[$(tput setaf 6)\]\W$(tput setaf 3)\]\$(parse_git_branch) $(tput setaf 5)\]\$(parse_git_dirty)\[$(tput sgr0)\]"
```

You will need to close your terminal window or reload your bash profile like ```source ~/.bash_profile```.
But once you do, your prompt should now look like this.

```
➜ Newfinds.com (middleman) •
```



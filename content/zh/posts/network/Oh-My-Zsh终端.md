---
title: "Oh-My-Zsh终端"
date: "2025-02-03"
tags: ["zsh"]
categories: ["Shell"]
---

![zsh](/images/zsh.png)

- 安装[oh-my-zsh](https://ohmyz.sh/)

```zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

- 语法高亮[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

```zsh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

- 自动填充[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)

```zsh
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

- 历史记录[zsh-history-substring-searc](https://github.com/zsh-users/zsh-history-substring-search)

```zsh
git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search
```

---
category: ["装机"]
keywords: ["mac装机"]
---

自己喜欢的开发环境

<!-- more -->

## 烧碟
```bash
sudo ~/Downloads/Install\ macOS\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/USB01 --applicationpath ~/Downloads/Install\ macOS\ Mojave.app --nointeraction
```

## homebrew有关
```bash
# 安装 homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### iTerm2
```bash
# iterm
brew cask install iterm2

# sz/rz
brew install lrzsz && \
sudo curl -o /usr/local/bin/iterm2-send-zmodem.sh https://raw.githubusercontent.com/mmastrac/iterm2-zmodem/master/iterm2-send-zmodem.sh && \
sudo chmod +x /usr/local/bin/iterm2-send-zmodem.sh && \
sudo curl -o /usr/local/bin/iterm2-recv-zmodem.sh https://raw.githubusercontent.com/mmastrac/iterm2-zmodem/master/iterm2-recv-zmodem.sh && \
sudo chmod +x /usr/local/bin/iterm2-recv-zmodem.sh
```

还需要在iTerm2中做一下配置

    1. 打开iTerm2，点击屏幕最左上角，苹果菜单右侧“iTerm2”菜单，进入“Preferences”
    2. 点击 Profile ，Advanced ，Triggers下面的Edit（见下方图片）
    3. 在弹窗中添加两行

| Regular Expression | Action | Parameters | Instant |
| ------------------ | ------ | ---------- | ------- |
| rz waiting to receive.\*\*B0100 | Run Silent Coprocess | /usr/local/bin/iterm2-send-zmodem.sh | false |
| \*\*B00000000000000 | Run Silent Coprocess | /usr/local/bin/iterm2-recv-zmodem.sh | false |

iTerm2的配色可以在： [https://github.com/mbadolato/iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)这里下，比较喜欢用 **tomorrow night eighties**

### zsh
```bash
brew install zsh
# oh-my-zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# powerlevel9k
git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
brew tap caskroom/fonts
brew cask install font-ubuntumono-nerd-font
# zsh 高亮插件
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

```

在 ~/.zshrc里面
```bash
ZSH_THEME="powerlevel9k/powerlevel9k"
# command line 左邊想顯示的內容
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir dir_writable vcs context)
# command line 右邊想顯示的內容
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status ram background_jobs ssh)
POWERLEVEL9K_MODE='nerdfont-complete'
DEFAULT_USER="timi"

plugins=(
  git
  zsh-syntax-highlighting
  zsh-autosuggestions
)
```

### springboard更改行列
```bash
defaults write com.apple.dock springboard-columns -int 10 && \
defaults write com.apple.dock springboard-rows -int 5 && \
defaults write com.apple.dock ResetLaunchPad -bool TRUE && \
killall Dock
```

## 常用软件
```bash
# 微信
brew cask install wechat
# qq
brew cask install qq
# 企业微信
brew cask install wxwork
# 压缩/解压工具，用它压缩发给windows不乱码
brew cask install keka
# Chrome
brew cask install google-chrome
```

- atom: [https://github.com/atom/atom/releases/tag/v1.33.1](https://github.com/atom/atom/releases/tag/v1.33.1)

- shadowsocks: [https://github.com/shadowsocks/shadowsocks-iOS/wiki/Shadowsocks-for-OSX-%E5%B8%AE%E5%8A%A9](https://github.com/shadowsocks/shadowsocks-iOS/wiki/Shadowsocks-for-OSX-%E5%B8%AE%E5%8A%A9), 52.34.163.148:8028, 藕柱拼音。

命令行工具
```bash
# json格式化输出
brew install jq
# replacement for ls
brew install exa --without-git
# 文件搜索
brew install fd
# 替代cat
brew install bat
# 替代curl, https://github.com/jakubroztocil/httpie
brew install httpie
# 替代top
brew tap cjbassi/gotop && brew install gotop
# recode command line
brew install asciinema
# Swiss Army Knife for macOS https://github.com/rgcr/m-cli
brew install m-cli
# 代码统计 https://github.com/cgag/loc
brew install loc
# 替代vim
brew install neovim
# 命令行笔记
brew install cheat
# 约等于 git log --pretty --oneline + git diff
brew install tig
# 快速路径导航pm,https://github.com/Angelmmiguel/pm
brew install wget && \
cd ~ && \
wget https://raw.githubusercontent.com/Angelmmiguel/pm/master/install.sh && \
chmod 755 ./install.sh && \
. ./install.sh

# docker管理
sudo npm i -g marked && sudo npm i -g dockly
brew tap moncho/dry && brew install dry

```

### 破解版
关于**app is damaged and can't be opened**
```bash
sudo spctl --master-disable
```

jb家族的通用破解方案, webstorm, goland, datagrip, appcode:
1. 复制jetbrains-agent.jar文件到/Applications/WebStorm.app/Contents/bin/目录中；【右键-显示包内容打开】
2. 打开编辑/Applications/WebStorm.app/Contents/bin/webstorm.vmoptions文件，添加 -javaagent:jetbrains-agent.jar 到最后一行；
3. 运行软件，选择第三项License server激活方法，输入 http://jetbrains.ls.com 激活即可。

基本够用了

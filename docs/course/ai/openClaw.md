# 手动云部署OpenClaw

## 准备工作

### 准备服务器

不管你是阿里云还是腾讯云或者什么Cloud
1. 先在上边选择一个云平台。
2. 创建一台 Ubuntu 22.04 或 24.04 的 Linux 实例。
3. 记住服务器的公网 IP、用户名和登录方式。
4. 确认你已经可以用 SSH 登录这台服务器。

```shell
ssh <user>@<server-ip>
```

### 获取AI api Key

在常用的模型供应商网站获取Key。下边是我所使用的供应商：  
[阿里百炼](https://www.aliyun.com/benefit/scene/codingplan)  
[智谱 z.ai](https://www.bigmodel.cn/invite?icode=lsZqEg6YvUU0mXrODBuNSAZ3c5owLmCCcMQXWcJRS8E%3D)

## 一键安装

OpenClaw官网提供一键安装脚本，十分方便。就算你是刚新开的服务器，没有任何环境也没有关系，脚本会自动安装。  
使用ssh连接上服务器后，复制下边的命令运行，然后会自动安装。

```shell
curl -fsSL https://openclaw.ai/install.sh | bash
```

## 引导配置

龙虾官方提供两种引导配置方案：`QuickStart`和`Manual`。

```shell{5,6}
◇  I understand this is personal-by-default and shared/multi-user use requires lock-down. Continue?
│  Yes
│
◆  Setup mode
│  ● QuickStart (Configure details later via openclaw configure.)
│  ○ Manual
```

我们选择`QuickStart`快速配置，目的是能够快速跑通龙虾，很多配置都是可以后边修改的，没必要在这里浪费时间。

### 模型配置

首先是配置我们的模型，提前准备好apiKey了，选择我们需要的一步步继续就好。
 
```shell{2,5,8,23,27}
◇  Model/auth provider
│  Z.AI
│
◇  Z.AI auth method
│  Coding-Plan-CN
│
◇  Enter Z.AI API key
│  *******************************
│
◇  Provider notes ──────────────────────────╮
│                                           │
│  Verified GLM-5.1 on coding-cn endpoint.  │
│                                           │
├───────────────────────────────────────────╯
│
◇  Model configured ─────────────────╮
│                                    │
│  Default model set to zai/glm-5.1  │
│                                    │
├────────────────────────────────────╯
│
◇  Default model
│  Browse all models
│
│
◇  Default model
│  zai/glm-4.5-air
```

### 通道配置

就是所谓的用各种软件的机器人就可以访问龙虾，我这里选的QQBot，其实我也不怎么用，我觉得Web就很好用，如果需要可以去跟我一样去申请一个QQBot，超级简单，
打开这个 [QQBot](https://q.qq.com/qqbot/openclaw/) 登陆QQ号按提示来就好了，获取api。

```shell{2,5,8,11}
◇  Select channel (QuickStart)
│  QQ Bot (Official API)
│
◇  选择 QQ 绑定方式
│  手动输入 QQ Bot AppID 和 AppSecret
│
◇  请输入 QQ Bot AppID
│  **********
│
◇  请输入 QQ Bot AppSecret
│  ********************************
│
◇  QQ Bot ──────────────╮
│                       │
│  ✔ QQ Bot 配置完成！   │
│                       │
├───────────────────────╯
```

### 浏览器搜索

这个板块很麻烦，后续有需要再添加，暂时跳过。

```shell{2}
◇  Search provider
│  Skip for now
```

### Skills配置

刚开始最好不要加一堆Skill，没什么用，浪费自己的token，太浪费了，跳过跳过。

```shell{2}
◇  Configure skills now? (recommended)
│  No
```

### Hooks配置

这个我直接就是全选，每个功能都很有用，自行翻译哈哈哈！

```shell{3-6}
◆  Enable hooks?
│  ◻ Skip for now
│  ◼ 🚀 boot-md (Run BOOT.md on gateway startup)
│  ◼ 📎 bootstrap-extra-files (Inject additional workspace bootstrap files via glob/path patterns)
│  ◼ 📝 command-logger (Log all command events to a centralized audit file)
│  ◼ 💾 session-memory (Save session context to memory when /new or /reset command is issued)
└
```

### 快速配置结束

到这里配置就结束了，默认选择第一个就好了，然后会弹出下边那个完成的，等一会直接关掉重新连接就好了。  
当然，安装完还是打不开的，下边两个问题特别常见，可以参考修改一下。

```shell{2,3}
◆  How do you want to hatch your bot?
│  ● Hatch in Terminal (recommended)
│  ○ Do this later
└
```

```shell
🦞 OpenClaw 2026.4.25 (aa36ee6) — Half butler, half debugger, full crustacean.

openclaw tui - local embedded - agent main - session main
local ready | idle
agent main | session main | unknown | tokens ?
──────────────────────────────────────────────────────────────────────────────

──────────────────────────────────────────────────────────────────────────────
```

## OpenClaw安装好Web打不开？打开提示origin not allowed怎么办？

当OpenClaw出现 “origin not allowed (open the Control UI from the gateway host or allow it in gateway.controlUi.allowedOrigins)” 时，本质是浏览器跨域访问被系统安全策略拦截。

### 方法一

OpenClaw默认只允许本地访问（localhost），当你通过公网IP、域名或端口转发访问时，会被判定为“非法来源”。这是安全机制的一部分。操作步骤：

1. 登陆你的服务器环境。
2. 找到openClaw的配置文件，一般在`/root/.openclaw/openclaw.json`。
3. 找到Bind字节修改为lan，lan表示允许局域网和公网访问。
4. 找到controlUi字节，按照我的文档修改就可以。
5. 保存文件。
6. 重启gateway：`openclaw gateway restart`。

```json{8,13-19}
"gateway": {
  "mode": "local",
  "auth": {
    "mode": "token",
    "token": "**********************************"
  },
  "port": 18789,
  "bind": "lan",
  "tailscale": {
    "mode": "off",
    "resetOnExit": false
  },
  "controlUi": {
    "allowedOrigins": [
      "http://localhost:18789",
      "http://127.0.0.1:18789",
      "http://服务器的公网IP:18789"
    ]
  }
}
```

### 方法二

很多人配置了allowedOrigins，但仍报错，是因为访问地址和配置不一致（比如IP和域名混用、http/https不一致）。操作步骤：

1. 确认浏览器访问地址（如：http://xxx:18789）。
2. 检查配置文件中的allowedOrigins是否完全一致。
3. 确保协议（http或https）、端口、域名/IP这些因素都一致。
4. 修改后重新启动服务。

注意：建议只保留一个“主访问地址”，避免冲突。

## OpenClaw公网访问难题？一招解决 “control ui requires device identity” 报错

在部署OpenClaw后，通过公网IP或域名访问控制界面时，浏览器提示以下错误：

```shell
control ui requires device identity (use HTTPS or localhost secure context)
```

在服务器终端执行以下命令：

```shell
# 1. 允许非安全认证（解决跨域问题）
openclaw config set gateway.controlUi.allowInsecureAuth true
# 2. 关键步骤：禁用设备身份验证（允许 HTTP 访问）
openclaw config set gateway.controlUi.dangerouslyDisableDeviceAuth true
# 3. 重启网关服务使配置生效
openclaw gateway restart
```
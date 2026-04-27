# Flclash 使用教程

## 1. 简介
flclash 是一个基于 Clash 的网络代理管理工具，适用于在 Windows、macOS 和 Linux 等平台上配置和切换代理规则。

## 2. 安装
1. 从官方渠道下载 `flclash` 可执行文件。
2. 解压到本地目录，例如：`C:\flclash`。
3. 确保 Clash 核心程序已安装或已准备好 Clash 的配置文件。

## 3. 配置文件
1. 在 `flclash` 目录下创建或放置 `config.yaml`。
2. 常见配置项：
   - `port`: 监听端口，例如 `7890`
   - `socks-port`: SOCKS5 代理端口，例如 `7891`
   - `allow-lan`: 是否允许局域网访问
   - `mode`: 代理模式，例如 `Rule`、`Global`、`Direct`
3. `config.yaml` 示例：

```yaml
port: 7890
socks-port: 7891
allow-lan: false
mode: Rule
log-level: info
proxies:
  - name: "ProxyA"
    type: ss
    server: example.com
    port: 8388
    cipher: aes-256-gcm
    password: "password"
proxy-groups:
  - name: "Auto"
    type: select
    proxies:
      - "ProxyA"
      - "DIRECT"
rules:
  - MATCH,Auto
```

## 4. 启动方法
1. 进入 `flclash` 所在目录。
2. 执行命令：

```bash
flclash -f config.yaml
```

3. 如果程序支持 GUI，可直接双击运行并在界面中加载配置文件。

## 5. 常用操作
- 切换模式：在配置文件中修改 `mode` 为 `Rule`、`Global` 或 `Direct`，然后重启 flclash。
- 修改代理节点：在 `proxies` 中添加或替换节点信息。
- 更新规则：编辑 `rules` 部分，按需添加域名、IP 或匹配规则。

## 6. 检查与排错
- 确认 `config.yaml` 语法正确，避免缩进错误。
- 检查端口是否被占用。
- 查看日志输出，定位启动失败或连接异常原因。

## 7. 常见命令示例
- 查看配置语法是否正确：

```bash
flclash -t -f config.yaml
```

- 重新加载配置：

```bash
flclash -f config.yaml --reload
```

## 8. 备注
如需详细功能，请参考 `flclash` 官方文档或项目仓库说明。
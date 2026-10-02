# 陈璞的个人网站

网站：https://chenpu-little-world-98e6.surge.sh/

GitHub Pages：https://wahaha2006.github.io/cp0930/

Actions 中的“检查并发布个人主页”负责 GitHub Pages 发布，可使用 Run workflow 手动触发。修改 `main` 后也会自动检查和发布，`deploy` 必须等待 `check` 成功。

修改根目录 `index.html` 并提交到 `main` 后，GitHub Actions 会检查网页脚本，发布到 Surge，并验证线上文件与本次提交一致。Pull Request 只检查，不发布。也可以在 Actions 中选择 Check and deploy to Surge → Run workflow 手动部署。

首次配置需要在 Settings → Secrets and variables → Actions 中添加 `SURGE_TOKEN`。请使用 Surge 为本网站签发的限定域名令牌，不要将令牌写入代码或聊天。

```sh
surge tokens add --domain chenpu-little-world-98e6.surge.sh -m "GitHub Actions cp0930"
```

发布目录只包含 `index.html`，照片和字体已嵌入其中。检查脚本、说明文档和登录凭据不会发布到网站。

本地检查：`node scripts/check.mjs`。

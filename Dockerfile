# 使用Node.js 20 slim版本的官方镜像作为基础镜像
FROM node:20-slim

# 设置工作目录
WORKDIR /app

# 安装 openssl 和其他必要的依赖
RUN apt-get update && apt-get install -y openssl libssl-dev

# 全局安装pnpm
RUN npm install -g pnpm pm2

# 复制源代码
COPY . .

# 安装依赖
RUN pnpm install --frozen-lockfile

# 构建应用
RUN pnpm run build
RUN pnpm prisma:generate
# 暴露7001端口
EXPOSE 7001

# 使用pnpm运行应用
CMD ["pnpm", "prod:pm2"]
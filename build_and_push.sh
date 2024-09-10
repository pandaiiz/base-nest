#!/bin/bash

# 检查 jq 是否已安装
if ! command -v jq &> /dev/null; then
    echo "错误：jq 未安装。请安装 jq 后再运行此脚本。"
    exit 1
fi

# 从 package.json 读取当前版本号
current_version=$(jq -r .version package.json)

# 将版本号分割为主版本、次版本和修订版本
IFS='.' read -ra version_parts <<< "$current_version"
major=${version_parts[0]}
minor=${version_parts[1]}
patch=${version_parts[2]}

# 增加修订版本号
patch=$((patch + 1))

# 组合新版本号
new_version="$major.$minor.$patch"

# 更新 package.json 文件中的版本号
jq ".version = \"$new_version\"" package.json > package.json.tmp && mv package.json.tmp package.json

# 构建镜像
docker build --platform linux/amd64 -t ht-nest:$new_version .

# 打标签
docker tag ht-nest:$new_version pandaii/ht-nest:$new_version

# 推送到 Docker Hub
docker push pandaii/ht-nest:$new_version

echo "新版本 $new_version 已构建并推送到 Docker Hub"

# 显示更新后的版本号
echo "package.json 中的版本号已更新为：$(jq -r .version package.json)"
### 构建镜像

```
docker build --platform linux/amd64 -t ht-nest:0.0.2 .
```

### 打版本号

```
docker tag ht-nest:0.0.2 pandaii/ht-nest:0.0.2
```

### Push to Docker Hub

```
docker push pandaii/ht-nest:0.0.2
```

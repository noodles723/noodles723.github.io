---
category: ["后台", "运维"]
keywords: ["kubernetes", "docker"]
---

kubernetes学习记录。

<!-- more -->

## 创建一个cluster

kubernetes简而言之是一个容器管理系统，开源，谷歌背书。

架构上包含master和node，每个node可以视为一台服务器或ECS，node上可以跑多个process，master管理node。一个线上环境kubernetes集群最少应有三个nodes。

[Minikube](https://github.com/kubernetes/minikube)是kubernetes的一个具体实现，可在本地创建一个虚拟机，模拟一个简单集群。

minikube有关命令：

```bash
$ minikube start              // 启动集群
$ kubectl cluster-info          // 显示集群信息，会显示master的管理界面url
$ kubectl get nodes             // 显示所有节点信息
```

## 部署应用

有关命令：

```bash
$ kubectl run [name] --image=[镜像地址] --port=8080     // 部署应用
$ kubectl get deployments               // 获取所有deployments信息
$ kubectl proxy // 开启cluster内部的网络代理，这样可以直接由外部url访问内部api
```

用`$ kubectl get pods`可以显示pod信息，然后可以通过代理的url直接访问我们部署的应用接口。

```bash
//  将pod名称记到全局变量里
$ export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
$ echo Name of the Pod: $POD_NAME

// 假设kubectl proxy返回的是http://localhost:8001
$ curl http://localhost:8001/version    // 同 kubectl version的client version

// 访问应用的api
$ curl http://localhost:8001/api/v1/proxy/namespaces/default/pods/$POD_NAME/
```

## 更多应用交互

**Pod**是一次部署的具体实现，是多个容器群的统称，他们共享**存储(volumes)**，**ip**，**启动脚本**。

pod是一个应用的最小逻辑单元集合，可以包括多个containerized app和多个volume，一个node上可以跑多个pod。

![](https://d33wubrfki0l68.cloudfront.net/5cb72d407cbe2755e581b6de757e0d81760d5b86/a9df9/docs/tutorials/kubernetes-basics/public/images/module_03_nodes.svg)

有关命令：

```bash
$ kubectl get pods          // 获取pods信息
$ kubectl describe pods     // 查看pods详情，describe命令也可用于node和deployments
```

应用里输出到console（STDOUT）中的内容会被记录到log中，可以通过`kubectl logs $POD_NAME`查看。

使用`kubectl exec`可在container中执行代码：

```bash
$ kubectl exec $POD_NAME env  // 输出container中的环境变量
$ kubectl exec -ti $POD_NAME bash // 在container中启动bash
```

## 


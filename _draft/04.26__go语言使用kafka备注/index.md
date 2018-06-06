---
category: ["golang"]
keywords: ["golang", "kafka"]
---

只是一篇简单的golang接入kafka队列使用备注，方便回忆。

<!-- more -->

kafka官方推荐的go的client：[sarama](https://github.com/Shopify/sarama)

## 命令行工具

可以先安一下它的命令行工具，方便代码调试：

> [kafka-console-producer](https://github.com/Shopify/sarama/tree/master/tools/kafka-console-producer)

这个是消息生产者，直接用`go get github.com/Shopify/sarama/tools/kafka-console-producer`安装，有点慢要稍等一会。

基本使用：
```bash
kafka-console-producer -topic=test -value=value -brokers=kafka1:9092
// 常用的其他参数有： -key, -partitioner, -help
```

> [kafka-console-consumer](https://github.com/Shopify/sarama/tree/master/tools/kafka-console-consumer)

这个是消费者，用`go get github.com/Shopify/sarama/tools/kafka-console-consumer`安装。

基本使用：
```bash
kafka-console-consumer -topic=test -brokers=kafka1:9092

// 可以用oldest或newest指定offset
kafka-console-consumer -topic=test -offset=oldest
kafka-console-consumer -topic=test -offset=newest
```

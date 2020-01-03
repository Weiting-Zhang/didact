> 本项目 fork 自 [pomber/didact](https://github.com/pomber/didact) 的 [8eb7ffd - Brute force reconciliation](https://github.com/Weiting-Zhang/didact/commit/8eb7ffd6f5e210526fb4c274c4f60d609fe2f810) 这个较为原始的 commit，因为这个 commit 之前的实现较为基础易懂，主要实现 [Rendering DOM elements](https://engineering.hexacta.com/didact-rendering-dom-elements-91c9aa08323b) 和 [Element creation and JSX](https://engineering.hexacta.com/didact-element-creation-and-jsx-d05171c55c56)，所以自己就从这个 commit 开始实现 [Virtual DOM and reconciliation](https://engineering.hexacta.com/didact-instances-reconciliation-and-virtual-dom-9316d650f1d0) 、[Components and State](https://engineering.hexacta.com/didact-components-and-state-53ab4c900e37) 以及 [Fiber: Incremental reconciliation](https://engineering.hexacta.com/didact-fiber-incremental-reconciliation-b2fe028dcaec) 部分，实现思路参考了原 repo，但可能不完全一致，这个独立的 repo 也主要是记录自己的思考及实现过程。

运行 demo:

```shell
git clone https://github.com/Weiting-Zhang/didact
cd didact
yarn
yarn demo
http-server -p 8099
```

没有安装 http-server 可以 `npm install -g http-server`
之后可以打开 http://127.0.0.1:8099/examples/ 查看效果

---

以下是原 README

<p align="center"><img src="https://cloud.githubusercontent.com/assets/1911623/26426031/5176c348-40ad-11e7-9f1a-1e2f8840b562.jpeg"></p>

# Didact

#### A DIY guide to build your own React

This repository goes together with a [series of posts](https://engineering.hexacta.com/didact-learning-how-react-works-by-building-it-from-scratch-51007984e5c5) that explains how to build React from scratch step by step. **You can jump straight to [the last post](https://pomb.us/build-your-own-react) which is self-contained and includes everything.**

| Blog Post                                                                                                                                       |                         Code sample                          |                                                                                                                                    Commits                                                                                                                                    |                                                       Other languages                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: |
| [Introduction](https://engineering.hexacta.com/didact-learning-how-react-works-by-building-it-from-scratch-51007984e5c5)                        |                                                              |                                                                                                                                                                                                                                                                               |                                                                                                                             |
| [Rendering DOM elements](https://engineering.hexacta.com/didact-rendering-dom-elements-91c9aa08323b)                                            | [codepen](https://codepen.io/pomber/pen/eWbwBq?editors=0010) |                                                                                           [diff](https://github.com/hexacta/didact/commit/fc4d360d91a1e68f0442d39dbce5b9cca5a08f24)                                                                                           |               [中文](https://github.com/chinanf-boy/didact-explain#1-%E6%B8%B2%E6%9F%93dom%E5%85%83%E7%B4%A0)               |
| [Element creation and JSX](https://engineering.hexacta.com/didact-element-creation-and-jsx-d05171c55c56)                                        | [codepen](https://codepen.io/pomber/pen/xdmoWE?editors=0010) |                                                                                           [diff](https://github.com/hexacta/didact/commit/15010f8e7b8b54841d1e2dd9eacf7b3c06b1a24b)                                                                                           |          [中文](https://github.com/chinanf-boy/didact-explain#2-%E5%85%83%E7%B4%A0%E5%88%9B%E5%BB%BA%E5%92%8Cjsx)           |
| [Virtual DOM and reconciliation](https://engineering.hexacta.com/didact-instances-reconciliation-and-virtual-dom-9316d650f1d0)                  | [codepen](https://codepen.io/pomber/pen/WjLqYW?editors=0010) | [diff](https://github.com/hexacta/didact/commit/8eb7ffd6f5e210526fb4c274c4f60d609fe2f810) [diff](https://github.com/hexacta/didact/commit/6f5fdb7331ed77ba497fa5917d920eafe1f4c8dc) [diff](https://github.com/hexacta/didact/commit/35619a039d48171a6e6c53bd433ed049f2d718cb) | [中文](https://github.com/chinanf-boy/didact-explain#3-%E5%AE%9E%E4%BE%8B-%E5%AF%B9%E6%AF%94%E5%92%8C%E8%99%9A%E6%8B%9Fdom) |
| [Components and State](https://engineering.hexacta.com/didact-components-and-state-53ab4c900e37)                                                |       [codepen](https://codepen.io/pomber/pen/RVqBrx)        |                                                                                           [diff](https://github.com/hexacta/didact/commit/2e290ff5c486b8a3f361abcbc6e36e2c21db30b8)                                                                                           |            [中文](https://github.com/chinanf-boy/didact-explain#4-%E7%BB%84%E4%BB%B6%E5%92%8C%E7%8A%B6%E6%80%81)            |
| [Fiber: Incremental reconciliation](https://engineering.hexacta.com/didact-fiber-incremental-reconciliation-b2fe028dcaec) (self-contained post) |       [codepen](https://codepen.io/pomber/pen/veVOdd)        |                                              [diff](https://github.com/hexacta/didact/commit/6174a2289e69895acd8fc85abdc3aaff1ded9011) [diff](https://github.com/hexacta/didact/commit/accafb81e116a0569f8b7d70e5b233e14af999ad)                                              |             [中文](https://github.com/chinanf-boy/didact-explain#5-fibre-%E9%80%92%E5%A2%9E%E5%AF%B9%E6%AF%94)              |
| [The one with Hooks](https://pomb.us/build-your-own-react) (self-contained post)                                                                |    [codesandbox](https://codesandbox.io/s/didact-8-21ost)    |                                                                                                                                                                                                                                                                               |                                                                                                                             |

> Follow [@pomber](https://twitter.com/pomber) on twitter for updates.

## License

The MIT License (MIT)

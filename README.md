npm install
npm link

_posts下的都是源文件
_layout/_pug下的是模板文件，对应生成相应的/下的路径
e.g: /posts, /photography, /about 都是生成的文件夹

命令：
命令定义在_bin下，npm link绑定
- render post [文件名或关键字] -A(是否渲染全部)
- render album [相册名或关键字] -A(是否渲染全部)
- render stylus [文件名或关键字，没有的话渲染_layout/_stylus下的全部，不包括文件夹里的]
- render page [精确文件名必须在_layout/_pug下存在]
- render list -A(是佛渲染全部) // /_cacheList.json存在的话会选择性使用，render post时会自动render list
- render homepage // 渲染主页，还没想好怎么写，目前是直接copy了/list/index.html

- push -m [git commit的message，没有的话会随机选句唐诗]

- preview _draft/xxx/ // 可以实时预览

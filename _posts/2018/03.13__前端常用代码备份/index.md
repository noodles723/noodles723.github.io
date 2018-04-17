---
category: ["前端"]
keywords: ["html", "css", "js"]
---

个人备份。

<!-- more -->

### 常用的html转译

```js
function html_encode(str) {
    var s = "";
    if (str.length == 0)
        return "";
    s = str.replace(/&/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
}

function html_decode(str) {
    var s = "";
    if (str.length == 0)
        return "";
    s = str.replace(/&gt;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
}
```

### js生成excel

`npm install xlsx`

```js
let data = [["工单号", "来源", "一级分类", "二级分类", "关联牛牛号", "状态", "当前处理人", "创建时间", "归档时间"]];
            res.data.forEach(d => {
                let row = [];
                row.push(d.order_no);
                row.push(self.sourceName[d.order_source]);
                row.push(d.parent_title);
                row.push(d.category_title);
                row.push(d.uid);
                row.push(self.statusName[d.archived_state]);
                row.push(d.staff_name);
                row.push(self.filter('date')(d.created_time*1000, 'yyyy-MM-dd HH:mm:ss'));
                row.push(d.archived_time ? self.filter('date')(d.archived_time*1000, 'yyyy-MM-dd HH:mm:ss') : "");
                data.push(row);
            });

            let wb = {
                SheetNames: ['s1'],
                Sheets: {s1: this.xlsx.utils.aoa_to_sheet(data)}
            };

            let wbout = this.xlsx.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
            let name = "工单列表 "+this.filter('date')((new Date()), 'yyyy年MM月dd日 HH点mm分ss秒')+".xlsx";
            this.fs.saveFile(wbout, 'xlsx', name);
```

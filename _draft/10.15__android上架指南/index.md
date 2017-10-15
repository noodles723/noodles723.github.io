---
category: ["android", "客户端"]
keywords: ["kotlin", "android"]
---

如何在Google Play上上架。 

<!-- more -->

# step1.账号

首先，你需要一个谷歌开发者账号去登录[Google Play Console](https://play.google.com/apps/publish)，如果是付费app或有应用内购买，还需要一个[Google Wallet](https://www.google.com/wallet/)账号。

注册新号时注意，不同IP，不同设备，不同手机号，不同银行卡，不然有可能被捆绑连作。谷歌的开发者账号是25美金一次性开通，终身有效，跟苹果比简直良心~~

# step2.添加新应用

进入console，点左侧`All applications`选项，再点击`create application`新建应用。

![](./1.png)

进去新应用，点左边的`Store Listing`，把里面的星标项都补充完整，可以先随便写一些，上架之前随时可以改，包括应用名称、简介、图标之类的。填好后点最上方`save draft`保存，然后左侧`store listing`旁边的感叹号会变成一个勾。

# step3.打包上传apk

填其他项之前需要先上传apk文件，点左侧的`App releases`，选`manage alpha`，上传apk，如果app里有一些权限要求，那么store listing里的隐私声明的url是必须要填的，没有的话可以先瞎填一个。

如果有应用内购买，上传的apk里一定需要先有`<uses-permission android:name="com.android.vending.BILLING" />`权限。

然后点左侧的`content rating`把内容评级的问卷填了。

# code

在`app/src/main`下新建一个`aidl`文件夹，再新建一个`com.android.vending.billing`的package，将[IInAppBillingService.aidl](https://raw.githubusercontent.com/googlesamples/android-play-billing/master/TrivialDrive/app/src/main/aidl/com/android/vending/billing/IInAppBillingService.aidl)文件存在这个包下。
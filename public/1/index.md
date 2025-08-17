# 1


查了许多方法，发现 Windows 用 rsync 还要下一个软件，还要配置环境，麻烦；当然，还有借助 Github Actions 把文件间接地 rsync 到 VPS，但是本人是小白，没太看懂教程。

目前就摸索出两种方法：

使用 FinalShell 将public文件直接上传到 VPS 对应的路径。这不是很优雅。

利用 scp 命令：

1
2
3
4
5
6
7
8
scp -r D:\Hblog\stilig\public root@<your_ip>:/root/data/docker_data/nginxproxymanager/data/stilig.me/

# 这里 D:\Hblog\stilig\public 换成你本地的 public 文件的绝对路径
# root 换为你的 VPS 的用户（但一般都是 root ）
# <your_ip> 换成你的 VPS 的 IP
# /root/data/docker_data/nginxproxymanager/data/stilig.me/ 换为你的 VPS 挂载 public 文件的路径
## 注意，一定是你 VPS 挂载 public 的路径，即 stilig.me 的下一级为 public，就像stilig.me/public
## 不这样操作应该会影响新老文件的覆盖关系
然后输入 VPS 对应用户的密码就可以把文件上传了。

注意
如果你的密码比较复杂，或者你懒得每次输入密码，那么可以配置免密访问（这里以 windows 免密访问 linux 服务器为例子）。

windows 生成公钥和私钥

在终端中执行下面代码：

1
ssh-keygen.exe -t rsa
然后一直按enter，最后会在C:\User\<你的用户名>\.ssh\下生成两个文件：

1
2
id_rsa      私钥文件
id_rsa.pub  公钥文件
将公钥文件内容复制到 VPS 对应文件中

将id_rsa.pub公钥文件的文本内容复制到\root\.ssh\authorized_keys文件中（如果没有


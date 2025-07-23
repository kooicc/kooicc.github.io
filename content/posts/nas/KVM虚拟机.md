---
title: "KVM虚拟机"
date: "2025-04-18"
tags: ["kvm"]
---

![Syncthing](/images/syncthing.svg)

1. 进入编辑模式

```bash
virsh edit 4ae9f4cb-389d-4264-a769-e660e513adf2
```


## 虚拟机管理
1. 查看虚拟机列表
`virsh list --all`
2. 编辑配置
`virsh edit 4ae9f4cb-389d-4264-a769-e660e513adf2`
3. 进入控制台
`virsh console xxx`

## 硬盘直通

### 使用`virsh attach-disk`直通硬盘
1. 查看硬盘id
`ls -l /dev/disk/by-id`
2. 硬盘直通给虚拟机
```bash
virsh attach-disk 4ae9f4cb-389d-4264-a769-e660e513adf2 \
    /dev/disk/by-id/ata-Samsung_SSD_860_EVO_1TB_S3Z8NB0K123456 \
    vdc \
    --targetbus virtio \
    --persistent
```

-----------------------------------------------------------------------

*引用参考* 
- 控制台：<https://login.tailscale.com/admin/machines>
- 离线安装包：<https://pkgs.tailscale.com/stable>
- 更新日志：<https://tailscale.com/changelog>
- GitHub：<https://github.com/tailscale/tailscale>
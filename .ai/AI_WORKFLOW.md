# AI Workflow

## Standard Flow

```text
/aios-new
  -> /aios-vision
  -> /aios-design
  -> /aios-freeze
  -> /aios-setup
  -> /aios-develop
  -> /aios-review
  -> /aios-deploy
  -> /aios-operate
```

## Pause Flow

```text
stop condition
  -> /aios-pause
  -> /aios-notify
  -> human action
  -> /aios-resume
  -> /aios-next
```

## Gate Flow

- Gate 1: Vision Approved
- Gate 2: Design Approved
- Gate 3: Freeze Approved
- Gate 4: Setup Ready
- Gate 5: Development Complete
- Gate 6: Review Passed
- Gate 7: Deploy Ready
- Gate 8: Operation Ready

## Rules

- Design Freeze / Spec Freeze 前に本実装しない
- Freeze 後の変更は Change Request
- Secret を記録しない
- Human Approval を代行しない

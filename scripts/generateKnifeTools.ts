import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'
const prisma = new PrismaClient()
export async function genKnifeTools() {
  try {
    const data = [
      { name: '球头R1.0' },
      { name: '钨钢球头2.0' },
      { name: '钻石球刀4.0' },
      { name: '吸珠刀2.0' },
      { name: '雕刻0.3' },
      { name: '打圈刀2.0' },
      { name: '球刀R12D6' },
      { name: '135度倒角刀' },
      { name: '内R3.0' },
      { name: '砂底0.5' },
      { name: 'D15打圈刀' },
      { name: '打圈 刀3.0' },
      { name: '打圈刀6.0' },
      { name: '钻石球刀1.0' },
      { name: '砂底1.0' },
      { name: '钉珠0.5' },
      { name: '钨钢洗刀2.0' },
      { name: 'R0.8 /45度倒角刀' },
      { name: '侧批刀' },
      { name: 'D0.1*145°刻线刀' },
      { name: '打圈刀5.0' },
      { name: '打圈刀2.5' },
      { name: '底侧刃6.0' },
      { name: '砂底0.3' },
      { name: 'R2D4.0球刀' },
      { name: '3刃T刀D16' },
      { name: '打圈刀9.0' },
      { name: '龙鳞刀2.0' },
      { name: '钨钢镜面刀' },
      { name: 'D0.1*135°刻线刀' },
      { name: 'D0.1*160°刻线刀' },
      { name: '牙刀' },
      { name: '打点刀1*90°' },
      { name: '踩点刀1.0*K45°' },
      { name: 'D0.1*145砂底倒角刀' },
      { name: 'D6*160°刻线刀' },
      { name: '刀粒' },
      { name: '内 R6.0' },
      { name: '底侧刃2.0' },
      { name: '底侧刃1.0' },
      { name: '砂底0.2 30度' },
      { name: '分中棒' },
      { name: '球刀6.0' },
      { name: '钻石镜面刀' },
      { name: '鱼眼刀2.5' },
      { name: '底侧刃4.0' },
      { name: '鱼眼刀3.0' },
      { name: '吸珠刀2.0' },
      { name: '650七彩刀D1.0' },
      { name: '650七彩刀D2.0' },
      { name: '打圈3.0' },
      { name: '钻石球头R0.5' },
      { name: '钨钢球头6.0' },
      { name: '钻石球头R12ф6' },
      { name: '打圈刀4.0' },
      { name: '钨钢球头R12ф6' },
      { name: '鱼眼刀2.0' },
      { name: '鱼眼刀ф1.6*3' },
      { name: '打圈刀8.0' },
      { name: '砂底0.2' },
      { name: '钻石球头2.0' },
      { name: '雕刻0.4' },
      { name: '铣刀1.0' },
      { name: '铣刀4.0' },
      { name: '铣刀6.0' },
      { name: '批花刀' },
      { name: '90°倒角刀' },
      { name: '钨钢6.0' },
      { name: '钨钢R3.0' },
      { name: '钨钢2.0' },
      { name: '球刀R2' },
      { name: '钨钢0.6' },
      { name: '打圈9.0' },
      { name: '钨钢环形刀3.2' },
      { name: '钉珠0.3' },
      { name: '刀杆' },
      { name: '钨钢环形刀ф3.8*ф3.0*D6' },
      { name: '彩丝刀' },
      { name: '尖刀' },
      { name: '鱼眼ф1.0*3' },
      { name: 'R0.8半圆刀' },
      { name: '锯片' },
      { name: '钻石牛鼻刀' },
      { name: '倒角90°' },
      { name: '球头刀3.0' },
      { name: '钨钢打圈D15' },
      { name: 'KDY2.9' },
      { name: 'KDY2.8' }
    ]
    const findDictType = await prisma.dictType.create({
      data: {
        label: '刀具',
        code: 'KNIFE_TOOL'
      }
    })
    findDictType?.id &&
      (await prisma.dictItem.createMany({
        data: data.map((item) => ({
          label: item.name,
          value: nanoid(12),
          typeId: findDictType.id
        }))
      }))
  } catch (error) {
    console.error('出错:', error)
  }
}

// main()

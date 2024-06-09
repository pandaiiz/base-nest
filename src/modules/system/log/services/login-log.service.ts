import { Injectable } from '@nestjs/common'
// import UAParser from 'ua-parser-js'
import { getIpAddress } from '~/utils/ip.util'

// import { LoginLogQueryDto } from '../dto/log.dto'
// import { LoginLogInfo } from '../models/log.model'
import { PrismaService } from 'nestjs-prisma'

/*async function parseLoginLog(e: any, parser: UAParser): Promise<LoginLogInfo> {
  const uaResult = parser.setUA(e.login_log_ua).getResult()

  return {
    id: e.login_log_id,
    ip: e.login_log_ip,
    address: e.login_log_address,
    os: `${`${uaResult.os.name ?? ''} `}${uaResult.os.version}`,
    browser: `${`${uaResult.browser.name ?? ''} `}${uaResult.browser.version}`,
    username: e.user_username,
    time: e.login_log_created_at
  }
}*/

@Injectable()
export class LoginLogService {
  constructor(private prisma: PrismaService) {}

  async create(uid: number, ip: string, ua: string): Promise<void> {
    try {
      const address = await getIpAddress(ip)
      await this.prisma.loginLog.create({
        data: {
          ip,
          ua,
          address,
          user: { connect: { id: uid } }
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  async list() {
    // async list({ current, pageSize, username, ip, address, time }: LoginLogQueryDto) {
    /*const queryBuilder = await this.loginLogRepository
      .createQueryBuilder('login_log')
      .innerJoinAndSelect('login_log.user', 'user')
      .where({
        ...(ip && { ip: Like(`%${ip}%`) }),
        ...(address && { address: Like(`%${address}%`) }),
        ...(time && { createdAt: Between(time[0], time[1]) }),
        ...(username && {
          user: {
            username: Like(`%${username}%`)
          }
        })
      })
      .orderBy('login_log.created_at', 'DESC')

    const { items, ...rest } = await paginateRaw<LoginLogEntity>(queryBuilder, {
      page,
      pageSize
    })

    const parser = new UAParser()
    const loginLogInfos = await Promise.all(items.map((item) => parseLoginLog(item, parser)))

    return {
      items: loginLogInfos,
      ...rest
    }*/
    return {}
  }

  async clearLog(): Promise<void> {
    await this.prisma.loginLog.deleteMany()
  }

  /*  async clearLogBeforeTime(time: Date): Promise<void> {
    await this.prisma.loginLog.deleteMany({
      where: { createdAt: { lt: time } }
    })
  }*/
}

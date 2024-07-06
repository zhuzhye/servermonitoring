// 全局路由类型声明
import type { RouteComponent, RouteLocationNormalized } from 'vue-router'
import type { FunctionalComponent } from 'vue'

declare global {
  interface ToRouteType extends RouteLocationNormalized {
    meta: CustomizeRouteMeta
  }
  /**
   * @description 完整子路由的`meta`配置表
   */
  interface CustomizeRouteMeta {
    /** 菜单名称（兼容国际化、非国际化，如何用国际化的写法就必须在根目录的`locales`文件夹下对应添加） `必填` */
    title: string
    /** 菜单图标 `可选` */
    icon?: string | FunctionalComponent
    /** 是否在菜单中显示（默认`true`）`可选` */
    menuStatus?: boolean
    /** 是否显示父级菜单 `可选` */
    showParent?: boolean
    /** 页面级别权限设置 `可选` */
    roles?: Array<string>
    /** 按钮级别权限设置 `可选` */
    auths?: Array<string>
    /** 路由组件缓存（开启 `true`、关闭 `false`）`可选` */
    keepAlive?: boolean
    /** 内嵌的`iframe`链接 `可选` */
    frameSrc?: string
  }

  /**
   * @description 完整子路由配置表
   */
  interface RouteChildrenConfigsTable {
    /** 子路由地址 `必填` */
    path: string
    /** 路由名字（对应不要重复，和当前组件的`name`保持一致）`必填` */
    name?: string
    /** 路由重定向 `可选` */
    redirect?: string
    /** 按需加载组件 `可选` */
    component?: RouteComponent
    meta?: CustomizeRouteMeta
    /** 子路由配置项 */
    children?: Array<RouteChildrenConfigsTable>
  }

  /**
   * @description 整体路由配置表（包括完整子路由）
   */
  interface RouteConfigsTable {
    /** 路由地址 `必填` */
    path: string
    /** 路由名字（保持唯一）`可选` */
    name?: string
    /** `Layout`组件 `可选` */
    component?: RouteComponent
    /** 路由重定向 `可选` */
    redirect?: string
    meta?: {
      /** 菜单名称（兼容国际化、非国际化，如何用国际化的写法就必须在根目录的`locales`文件夹下对应添加）`必填` */
      title: string
      /** 菜单图标 `可选` */
      icon?: string | FunctionalComponent | IconifyIcon
      /** 是否在菜单中显示（默认`true`）`可选` */
      menuStatus?: boolean
      /** 菜单升序排序，值越高排的越后（只针对顶级路由）`可选` */
      ranks?: number
      //  tabViews 固定menu
      affix?: boolean
    }
    /** 子路由配置项 */
    children?: Array<RouteChildrenConfigsTable>
  }
}

// https://router.vuejs.org/zh/guide/advanced/meta.html#typescript
declare module 'vue-router' {
  interface RouteMeta extends CustomizeRouteMeta {}
}

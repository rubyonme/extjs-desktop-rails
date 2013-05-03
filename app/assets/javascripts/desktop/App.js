/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',

        // 'MyDesktop.SystemStatus',
        'MyDesktop.VideoWindow',
        // 'MyDesktop.GridWindow',
        // 'MyDesktop.TabWindow',
        // 'MyDesktop.AccordionWindow',
        // 'MyDesktop.Notepad',
        // 'MyDesktop.BogusMenuModule',
        // 'MyDesktop.BogusModule',

//        'MyDesktop.Blockalanche',
        'MyDesktop.Settings'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    // getModules : function(){
    //     return [
    //         new MyDesktop.VideoWindow(),
    //         //new MyDesktop.Blockalanche(),
    //         // new MyDesktop.SystemStatus(),
    //         // new MyDesktop.GridWindow(),
    //         // new MyDesktop.TabWindow(),
    //         // new MyDesktop.AccordionWindow(),
    //         // new MyDesktop.Notepad(),
    //         // new MyDesktop.BogusMenuModule(),
    //         // new MyDesktop.BogusModule()
    //     ];
    // },
    getModules: function() {
        return EXT_DESKTOP_MODULES;
    },

    getDesktopConfig: function () {
        // var me = this, ret = me.callParent();

        // return Ext.apply(ret, {
        //     //cls: 'ux-desktop-black',

        //     contextMenuItems: [
        //         { text: 'Change Settings', handler: me.onSettings, scope: me }
        //     ],

        //     shortcuts: Ext.create('Ext.data.Store', {
        //         model: 'Ext.ux.desktop.ShortcutModel',
        //         data: [
        //             { name: 'Grid Window', iconCls: 'grid-shortcut', module: 'grid-win' },
        //             { name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },
        //             { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },
        //             { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'}
        //         ]
        //     }),

        //     wallpaper: 'wallpapers/Blue-Sencha.jpg',
        //     wallpaperStretch: false
        // });
      var me = this, ret = me.callParent();
      var datas = [];

      Ext.Ajax.request({
        headers: {
          'Accept': 'application/json'
        },
        async: false,
        url: '/user_desktop_modules',
        method: "get",
        success: function(response) {
          var text = response.responseText;
          var moduleDatas = Ext.JSON.decode(text);
          for(var i=0;i<moduleDatas.datas.length;i++){
                        if(moduleDatas.datas[i].on_desktop){
                           var data = {};
                           data.name = moduleDatas.datas[i].name;
                           data.iconCls = moduleDatas.datas[i].icon_css;
                           data.module = moduleDatas.datas[i].module_name;
                           datas.push(data); 
                        }
            
          }
        }
      });
          return Ext.apply(ret, {
              //cls: 'ux-desktop-black',

              contextMenuItems: [
                  { text: '设置', handler: me.onSettings, scope: me }
              ],
        // 
        // shortcuts: Ext.create('Ext.data.Store', {
        //                                          model: 'Ext.ux.desktop.ShortcutModel',
        //                                          data: [
        //                                    { name: '用户管理', iconCls: 'grid-shortcut', module: 'desktop-users-win' },
        //                                    { name: '数据字典', iconCls: 'grid-shortcut', module: 'dictionaries-win' },
        //                                    { name: '数据字典数据', iconCls: 'grid-shortcut', module: 'dictionary-items-win' },
        //                                    { name: '供电所管理', iconCls: 'grid-shortcut', module: 'desktop-offices-win' },
        //                                    { name: '线路管理', iconCls: 'grid-shortcut', module: 'desktop-lines-win' },
        //                                    { name: '终端管理', iconCls: 'grid-shortcut', module: 'three-phase-terminals-win' },
        //                                    { name: '三项电表管理', iconCls: 'grid-shortcut', module: 'three-phase-meters-win' },
        //                                    { name: '终端通信管理', iconCls: 'grid-shortcut', module: 'three-phase-terminals-comm-win' },
        //                                              { name: '模块管理', iconCls: 'grid-shortcut', module: 'desktop-modules-win' },
        //                                    { name: '用户模块', iconCls: 'grid-shortcut', module: 'user-desktop-modules-win' },
        //                                    { name: '客户管理', iconCls: 'grid-shortcut', module: 'desktop-clients-win' },
        //                                    { name: '三项收费', iconCls: 'grid-shortcut', module: 'three-phase-charge-win' },
        //                                    { name: '模块操作', iconCls: 'grid-shortcut', module: 'desktop-module-operations-win' },
        //                                    { name: '总加组管理', iconCls: 'grid-shortcut', module: 'desktop-plus-group-win' },
        //                                    { name: '总加组测量点', iconCls: 'grid-shortcut', module: 'plus-group-meters-win' },
        //                                    { name: '操作权限', iconCls: 'grid-shortcut', module: 'user-desktop-module-operations-win' }
        //                                          ]
        //                                      }),
        
              shortcuts: Ext.create('Ext.data.Store', {
                                                                                               model: 'Ext.ux.desktop.ShortcutModel',
                                                                                               data: datas
                                                                                           }),

              wallpaper: Ext.util.Cookies.get("wallpaper") ? Ext.util.Cookies.get("wallpaper") : 'wallpapers/desk.jpg',
              // wallpaper: 'wallpapers/newyear.jpg',
              wallpaperStretch: Ext.util.Cookies.get("stretch") == "false" ? false : true
        })
    },

    // config for the start menu
    getStartConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: '系统',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text: '专变打印设置',
                        iconCls: 'x-btn-icon printCss',
                        handler: me.onThreePrintConfig,
                        scope: me
                    },
                    {
                        text: '公变打印设置',
                        iconCls: 'x-btn-icon printCss',
                        handler: me.onOnePrintConfig,
                        scope: me
                    },
                    {
                        text: '修改密码',
                        iconCls: 'logout',
                        handler: me.onChangePassword,
                        scope: me
                    },
/*
                    {
                        text: '修改PIN码',
                        iconCls: 'logout',
                        handler: me.onChangePin,
                        scope: me
                    },*/
                    '-',
                    {
                        text: '退出',
                        iconCls: 'cancelIconCss',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function() {
        var a = this.callParent();
        // return Ext.apply(a, {
        //             quickStart: [{
        //                 name: "Accordion Window",
        //                 iconCls: "accordion",
        //                 module: "acc-win"
        //             },
        //             {
        //                 name: "Grid Window",
        //                 iconCls: "icon-grid",
        //                 module: "grid-win"
        //             }],
        //             trayItems: [{
        //                 xtype: "trayclock",
        //                 flex: 1
        //             }]
        //         })
    return Ext.apply(a, {
            trayItems: [{
                xtype: "trayclock",
                flex: 1
            }]
        })
    },

    onThreePrintConfig: function(){
        Ext.Ajax.request({
           url: "/three_phase_pay_records/print_config",
           method: "get",
           headers: {
               'Accept': 'text/html'
           },
           success: function(response) {
               var LODOP  = getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM')); 
               LODOP.PRINT_INIT("LODOP_THREE_PRINT");
               eval(response.responseText);
               printConfig();
               
               
               LODOP.PRINT_SETUP();
           }
       });
    },

    onOnePrintConfig: function() {
        Ext.Ajax.request({
            url: "/pay_records/print_config",
            method: "get",
            headers: {
                'Accept': 'text/html'
            },
            success: function(response) {
                var LODOP  = getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM')); 
                LODOP.PRINT_INIT("LODOP_ONE_PRINT");
                eval(response.responseText);
                printConfig();
                
                
                LODOP.PRINT_SETUP();
            }
        }); 
    },

    onLogout: function () {
        window.location.href = "/login";
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    },
  onChangePin: function () {
        var win = Ext.create('Ext.window.Window', {
      title: '修改PIN码',
      width: 300,
      height: 150,
      iconCls: 'icon-grid',
      layout: 'fit',
      html:'<iframe id=thisIframe width=770 height=480 frameborder=0 scrolling=auto src="/change_pin.html"></iframe>' 
    });
    win.show();
    },
    onChangePassword: function () {
    Ext.apply(Ext.form.field.VTypes, {
      daterange: function(val, field) {
        var date = field.parseDate(val);

        if (!date) {
          return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
          var start = field.up('form').down('#' + field.startDateField);
          start.setMaxValue(date);
          start.validate();
          this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
          var end = field.up('form').down('#' + field.endDateField);
          end.setMinValue(date);
          end.validate();
          this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
      },

      daterangeText: 'Start date must be less than end date',

      password: function(val, field) {
        if (field.initialPassField) {
          var pwd = field.up('form').down('#' + field.initialPassField);
          return (val == pwd.getValue());
        }
        return true;
      },

      passwordText: '两次密码输入不一致'
    });
    var form = Ext.create('Ext.form.Panel', {
      labelWidth: 75,
      autoWidth: true,
      bodyStyle: 'padding:5px',
      items: [{
        xtype: "textfield",
        fieldLabel: "原始密码",
        allowBlank: false,
        blankText: "不能为空，请正确填写",
        name: "oldpassword",
        inputType: "password"
      },
      {
        xtype: "textfield",
        fieldLabel: "新密码",
        allowBlank: false,
        blankText: "不能为空，请正确填写",
        id: "changePass1",
        name: "newpassword",
        inputType: "password"
      },
            {
        xtype: "textfield",
                fieldLabel: '密码确认',
                name: 'pass-cfrm',
                vtype: 'password',
                initialPassField: 'changePass1',
        inputType: "password"
            }],
      buttonAlign: 'center',
      buttons: [{
        text: '重置',
        handler: function() {
          this.up('form').getForm().reset();
        }
      },{
        text: '确定',
        handler: function() {
          var form = this.up('form').getForm();
          if (form.isValid()) {
            form.submit({
              method: 'post',
              url: '/users/change_password',
              success: function(form, action) {
                Ext.Msg.alert('提示', action.result.msg);
              },
              failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result.msg);
              }
            });
          }
        }
      }]
    });
        var win = Ext.create('Ext.window.Window', {
      title: '修改密码',
      width: 300,
      height: 150,
      iconCls: 'icon-grid',
      layout: 'fit',
      items: [form]
    });
    win.show();
    }
});

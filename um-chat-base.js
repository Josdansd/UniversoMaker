/*
 * AVAC Web Chat 2.0, Modificado por Razor para UM
 * 23/10/2016 1:01 PM
 */
 
$.getScript('http://momentjs.com/downloads/moment-with-locales.js', function(){
    var originalTitle = document.title;
    function timeParser(a) {
        var getDate = a.date;
        var getTime = a.datetime;
        var months = {
            'Ene': '01',
            'Feb': '02',
            'Mar': '03',
            'Abr': '04',
            'May': '05',
            'Jun': '06',
            'Jul': '07',
            'Ago': '08',
            'Sep': '09',
            'Oct': '10',
            'Nov': '11',
            'Dic': '12'
        };
        for (var prop in months) {
            if (months.hasOwnProperty(prop)) {
                var re = new RegExp(prop, 'g');
                getDate = getDate.replace(re, months[prop]);
            }
        }
        if ( getTime.length >= 9 ) {
          getTime = getTime.slice(0,8);
        }
        getDate = getDate.split(" ");
        getTime = getTime.split(":");
        var parsedDateAndTime;
        var clientTimeZone = new Date();
        if (clientTimeZone < 0) {
            parsedDateAndTime = new Date(Date.UTC(getDate[2], getDate[1] - 1, getDate[0], getTime[0], getTime[1], getTime[2]));
        } else {
            parsedDateAndTime = new Date(getDate[2], getDate[1] - 1, getDate[0], getTime[0], getTime[1], getTime[2]);
        }
        moment.locale('es');
        return moment(parsedDateAndTime).fromNow();
        // return parsedDateAndTime.toRelativeTime('es');
        // search ref on totwtrelativetime
    }
     
    (function(f, l, h) {
      if (!l) {
        if (!(window.JSON && window.sessionStorage && window.localStorage && Array.prototype.sort && Array.prototype.join)) return console.log("Minimum requirements not met to run AWC.");
        var g = {
          version: "2-0",
          mobile: window.AWC_dev_mobile || !(!navigator.userAgent.match(/Android|webOS|BlackBerry|iP([oa]d|hone)|MeeGo|Mobile|PlayBook/i) && !navigator.userAgent.match(/Windows Phone/i)),
          logged_in: !1,
          last_data: {
            connected: !1,
            users: [],
            messages: []
          },
          user_data: {},
          inactive_refreshes: 0,
          refresh_timeout: null,
          plain_text: "",
          config: {
            chat_title: "AvacWeb Chatbox",
            stylesheet: "http://chat.avacweb.net/avacweb_chat_2.css",
            allow_private_messaging: 1,
            allow_user_resize: 1,
            custom_placement: null,
            allow_copyrights: 1,
            loading_image: "http://i40.servimg.com/u/f40/17/20/25/96/26-110.gif",
            template: {
              markup: '<div id="avacweb_chat" style="display:none"><div id="awc_header"><div id="awc_buttons"></div><span id="awc_title"></span></div><div id="awc_userlist"></div><div id="awc_rightbox"><div id="awc_tabs"></div><div id="awc_messages"></div></div><div id="awc_footer"><div id="awc_form"><input name="message" id="awc_message" maxlength="1024" autocomplete="off" onkeydown="if(event.keyCode==13)avacweb_chat.submit()"></div></div></div>',
              ids: {
                header: "awc_header",
                footer: "awc_footer",
                userlist: "awc_userlist",
                messages: "awc_messages",
                messagebox: "awc_message",
                tabs: "awc_tabs",
                buttons: "awc_buttons",
                title: "awc_title",
                usercount: "achat_user_count",
                chat: "avacweb_chat"
              }
            },
            filters: {}
          },
          refresh_rates: {
            normal: 3E3,
            in10: 8E3,
            in20: 2E4,
            in30: 4E4,
            in40: 6E4
          },
          init: function(a, b) {
            var c = document.getElementById("achat_script"),
              d = this;
            this.tid = a;
            this._user = b;
            b.session_logged_in && (f("head").prepend('<link rel="stylesheet" href="' + this.config.stylesheet + '">'), c = f(this.config.custom_placement), c[0] ? c.html('<div id="avacweb_chat_holder" class="custom_placement' + (this.mobile ? " mobile" : "") + '"></div>') : (c = '<div id="avacweb_chat_button" class="fa-button" onclick="avacweb_chat.settings.toggle(\'open\');">' + this.t("Chat") + ': <span id="achat_user_count">0</span></div>', f(document.body).append(c + '<div id="avacweb_chat_holder"' + (this.mobile ?
              ' class="mobile"' : "") + "></div>")), this.cookie("datasent") || (f.get("http://php.avacweb.net/awc.php?d=" + window.location.hostname), this.cookie("datasent", 1, 1)), this.settings.init(), f.get("/chatbox/actions.forum?archives=" + this.settings.value("archives") + "&method=" + (this.config.auto_log_in ? "connect" : "get") + "&tid=" + a, function(a) {
              d.load_template.call(d, a)
            }, "json"))
          },
          load_template: function(a) {
            var b = this.config.template.markup,
              c = document.getElementById("avacweb_chat_holder");
            if (c) {
              c.innerHTML = b;
              this.loading();
              this.create_userbase(a.users);
              this.get_template_item("title").innerHTML = '<span title="Avacweb Chat V' + this.version + ' - Copyright (c) 2015">' + this.config.chat_title + "</span>";
              b = '<span class="achat_button ui button" id="achat_reading" onclick="avacweb_chat.settings.toggle(\'reading\');">' + this.t("Reading") + "</span>";
              b += '<span class="achat_button ui button" onclick="avacweb_chat.settings.toggle(\'archives\')">' + this.t("Archives") + ': <span id="archives">' + (this.settings.on("archives") ? this.t("On") : this.t("Off")) + "</span></span>";
              b += '<span class="achat_button ui button" onclick="avacweb_chat.log_in(1)" style="color:red">' + this.t("Log Out") + "</span>";
              this.get_template_item("buttons").innerHTML = b;
              f(this.get_template_item("messagebox")).after('<span class="achat_button ui button" onclick="avacweb_chat.submit()" style="font-size: inherit;">' + this.t("Send") + "</span>");
              footer_html = '<div onclick="avacweb_chat.showhide(\'achat_user_prefs\')" class="achat_button ui button">' + this.t("User Options") + "</div>";
              footer_html += '<div id="achat_user_prefs" style="display:none"></div>';
              footer_html +=
                '<div id="achat_popup" style="display:none;"><i class="awc_x remove link icon" onclick="avacweb_chat.popup();" style="float: right"></i><p></p></div>';
              footer_html += '<div class="achat_button ui button" onclick="avacweb_chat.showhide(\'achat_smilies\')">' + this.t("Smilies") + '</div><div id="achat_smilies" style="display:none"></div>';
              footer_html += '<div class="achat_button ui button" id="achat_color_button" onclick="avacweb_chat.showhide(\'achat_colors\')">' + this.t("Colors") + '</div><div id="achat_colors" style="display:none"></div>';
              window.AWC_update &&
                this.cookie("update") !== AWC_update.id && this._user.user_level && (footer_html += '<div class="achat_button" id="achat_update" onclick="avacweb_chat.popup(\'update\')">AWC Message!</div>');
              f(this.get_template_item("footer")).append(footer_html);
              this.get_template_item("chat").style.display = this.settings.on("open") || this.config.custom_placement ? "" : "none";
              if (this.config.allow_user_resize && !this.mobile && !this.config.custom_placement) {
                f(this.get_template_item("header")).prepend('<div id="achat_dimensions"><span id="achat_resizer"></span><span id="achat_mover"></span></div>');
                if (b = this.cookie("dimensions")) {
                  var b = JSON.parse(b),
                    d;
                  for (d in b) this.get_template_item("chat").style[d] = b[d]
                }
                f("#achat_resizer").mousedown(function(a) {
                  0 === a.button && avacweb_chat.resize.init(a, "drag")
                });
                f("#achat_mover").mousedown(function(a) {
                  0 === a.button && avacweb_chat.resize.init(a, "move")
                })
              }
              this.config.allow_copyrights && f(this.get_template_item("chat")).prepend('<span style="font-size: 0.8em;">AWC2.0 &copy; Copyright 2015 <a href="http://avacweb.forumotion.co.uk">AvacWeb</a> All rights reserved.</span>');
              this.switch_display(a.connected);
              this.handle_data(a);
              this.event.fire("onload")
            }
          },
          switch_display: function(a) {
            0 === arguments.length && (a = this.logged_in);
            this.logged_in = a;
            var b = this.get_template_item("buttons"),
              c = this.get_template_item("footer"),
              d = this.get_template_item("tabs");
            a ? b.style.display = c.style.display = d.style.display = "" : (b.style.display = c.style.display = d.style.display = "none", this.get_template_item("messages").innerHTML = '<div id="achat_login"><span>' + this.t("You are disconnected. Click log in to join the chat.") + '</span><div class="achat_button" onclick="avacweb_chat.log_in()">' +
              this.t("Log In") + "</div></div>")
          },
          log_in: function(a) {
            this.last_data.messages = [];
            var b = this;
            this.refresh_timeout && clearTimeout(this.refresh_timeout);
            a ? this.event.fire("onlogout") && (this.switch_display(!1), f.get("/chatbox/actions.forum?method=disconnect&tid=" + this.tid, function(a) {
              b.handle_data.call(b, a)
            })) : this.event.fire("onlogin") && (this.loading(), f.get("/chatbox/actions.forum?archives=" + this.settings.value("archives") + "&method=connect&tid=" + this.tid, function(a) {
              b.switch_display(!0);
              b.handle_data.call(b,
                a)
            }));
          },
          refresh: function() {
            this.refresh_timeout && clearTimeout(this.refresh_timeout);
            var a = avacweb_chat;
            if (a.event.fire("onrefresh", a.logged_in)) {
              if (a.logged_in && a.settings.on("disable timeout")) return a.simple_send("method=send&message=");
              f.get("/chatbox/actions.forum?archives=" + a.settings.value("archives") + "&method=get&tid=" + this.tid, function(b) {
                a.handle_data.call(a, b)
              }, "json")
            }
          },
          submit: function(a) {
            if (!a) {
              var b = this.get_template_item("messagebox");
              a = b.value;
              b.value = "";
              b.focus()
            }
            if (this.event.fire("onsend", a)) {
              if ( /^(http:\/\/).*((\.png)|(\.jpg)|(\.gif)|(\.jpeg))$/.test(a) ) {
                a = '[img]' + a + '[/img]';
              }
              a = a.replace(/^\s+/, "");
              this.tabs.in_tab() && "/" !== a.charAt(0) && ((b = this.tabs.get()) && b.user_tab ? a = "/tab(" + b.name + ") " + a : b && (a = "/pm(" + b.users.join(", ") + ") " + a));
              if ("/" === a.charAt(0)) {
                b = this.parse_command(a);
                if (!1 === b) return;
                "string" === typeof b && (a = b)
              }
              var c = "method=send&message=" + encodeURIComponent(a),
                d = this;
              this.array_walk(["bold", "italic", "underline", "strike"], function(a) {
                d.settings.on(a) && (c += "&" + a + "=on")
              });
              c += "&scolor=" + this.settings.value("color");
              this.simple_send(c);
              return !1
            }
          },
          simple_send: function(a) {
            var b =
              this;
            f.post("/chatbox/actions.forum?archives=" + this.settings.value("archives") + "&tid=" + this.tid, a, function(a) {
              if (b.settings.on("archives")) return f.get("/chatbox/actions.forum?archives=1&method=get&tid=" + this.tid, function(a) {
                b.handle_data.call(b, a)
              }, "json");
              b.handle_data.call(b, a)
            }, "json")
          },
          handle_data: function(a) {
            "string" === typeof a && (a = JSON.parse(a));
            a.connected !== this.logged_in && this.switch_display(a.connected);
            a.users && (this.update_users(a.users), this.last_data.users = a.users);
            a.connected && !this.tabs.initiated &&
              this.tabs.init();
            a.connected && a.messages && a.messages.length !== this.last_data.messages.length && (this.update_messages(a.messages), this.last_data.messages = a.messages, this.inactive_refreshes = 0);
            this.settings.on("reading") || (this.get_template_item("messages").scrollTop = this.settings.on("newest first") ? 0 : 9999999);
            this.refresh_timeout && clearTimeout(this.refresh_timeout);
            this.refresh_timeout = setTimeout(this.refresh, this.get_refresh_rate())
          },
          create_userbase: function(a) {
            var b = this;
            this.array_walk("a", a, function(a) {
              var d = {
                id: parseInt(a.id),
                username: a.username,
                staff: a.admin,
                color: a.color,
                online: a.online
              };
              b.user_data["u" + a.id] = b.user_data[a.username] = d
            })
          },
          update_users: function(a) {
            var b = this,
              c = 0,
              d = '<h4 class="member-title" style="display: block;">' + this.t("Online") + '</h4><ul class="online-users">';
            this.create_userbase(a);
            this.array_walk("a", a, function(a) {
              c++;
              d += "<li" + (a.online ? "" : ' class="idle"') + " onclick=\"avacweb_chat.insert_pm('" + a.username + '\')" oncontextmenu="avacweb_chat.usermenu(' + a.id + ', event)"><span style="color:' +
                a.color + '">' + (a.admin ? b.t("Mod") : "") + " " + a.username + "</span></li>"
            });
            d += "</ul>";
            this.config.custom_placement || (this.get_template_item("usercount").innerHTML = c);
            this.get_template_item("userlist").innerHTML = 0 < c ? d : '<div style="text-align:center;margin-top:10px">' + this.t("No users online") + "</div>";
          },
          update_messages: function(a) {
            var b = this,
              c = {},
              d = f(document.createElement("div")),
              e = "",
              t = function(a, b) {
                if (b) return c[a] = 0;
                a in c ? c[a]++ : c[a] = 1;
              };
            this.array_walk("a", a, function(a, c) {
              var h = f('<div class="chatbox_row_1 achat_row"><span class="date-and-time" title="' + a.date + a.datetime + '">' + timeParser(a) + ":</span></div>");
              if ("msg" !== a.action) switch (a.action) {
                case "connect":
                  // return e += "[" + timeParser(a) + "] " + a.msg + "\n", h.append('<span class="msg" style="color:' + a.msgColor + '"> ' + a.msg + "</span>"), d[b.settings.on("newest first") ? "prepend" : "append"](h);
              }
              else if (!b.settings.value("ignored")["u" + a.userId]) {
                var g = f('<span class="msg">' + a.msg + "<span>"),
                  k = g[0].getElementsByTagName("table")[0],
                  q = "public",
                  l = "<span onclick=\"avacweb_chat.insert_pm('" + a.username + '\')" class="user" style="color:' + a.user.color + '; font-weight: bold;">' + (a.user.admin ? b.t("Mod") : "") + " " + a.username + ", </span>";
                a.user.avatar && (l = '<img src="' + a.user.avatar + '" class="awc_avatar"/>' + l);
                if (k && k.className && /^a_chat_(pm|cmd|tab)$/.test(k.className)) {
                  var q = k.className.replace("a_chat_", ""),
                    p = k.getElementsByTagName("td")[0].innerHTML,
                    m = k.getElementsByTagName("td")[1].innerHTML;
                  f(k).replaceWith('<span id="AWCMESSAGESWITCH"></span>');
                }
                a.userId = parseInt(a.userId);
                switch (q) {
                  case "pm":
                    if (!b.config.allow_private_messaging) return console.log("AWCError 202: Private messaging is turned off and therefore can not be displayed.");
                    q = b.tabs.safe_name(p).split("]-[~~SPLITTER~~]-[");
                    k = b.tabs.create["private"](q);
                    if (b.tabs.can_view(k) && b.tabs.can_view(k, a.userId) && (b.tabs.get(k.id) || b.tabs.add(k), t(k.id), b.tabs.in_tab() && b.tabs.current === k.id)) {
                      h.addClass("chat_private_message");
                      window.LGBB && (m = LGBB.parse(m));
                      f("#AWCMESSAGESWITCH", g).replaceWith(b.filter(m)).prepend('<span class="achat_pm_prepend" title="' + k.users.join(", ").replace(/"/g, "") + '">' + b.t("Private message") + ": </span>");
                      break
                    }
                    return;
                  case "cmd":
                    if ("pub" === m && (q = "public"),
                      "me" === p) {
                      var r = k.getElementsByTagName("td")[2].innerHTML,
                        k = b.tabs.get(m),
                        l = !1;
                      if (k) {
                        if (p = k.name, m = "<strong>* " + a.username + " " + r + "</strong>", "public" === q) {
                          if (b.tabs.in_tab()) return;
                          g.html(m);
                          break
                        }
                      }
                      else return
                    }
                    else {
                      if ("cleartab" === p) {
                        if (b.get_user(a.userId).staff && (t(m, !0), b.tabs.current === m)) {
                          d.empty();
                          f("#AWCMESSAGESWITCH", g).replaceWith("<strong>* " + b.t("Tab cleared by") + " " + a.username + "</strong>");
                          l = !1;
                          break
                        }
                        return
                      }
                      if ("nudge" !== p && "global" === p) {
                        t(m);
                        r = k.getElementsByTagName("td")[2].innerHTML;
                        f("#AWCMESSAGESWITCH", g).replaceWith('<span data-message="globalType"><b>' + b.t("Mensaje Global") + "</b> " + b.filter(r) + '</span>');
                        break
                      }
                    }
                  case "tab":
                    r = b.tabs.create_id(p);
                    k = b.tabs.get(r);
                    if (!k)
                      if (b.get_user(a.userId).staff && !avacweb_chat_config.tabs[p]) k = b.tabs.create.user(p, a.username), b.tabs.add(k);
                      else return;
                    if (b.tabs.can_view(k)) {
                      t(r);
                      if (b.tabs.current !== r) return;
                      "tab" === q ? (window.LGBB && (m = LGBB.parse(m)), f("#AWCMESSAGESWITCH", g).replaceWith(b.filter(m))) : g.html(b.filter(m));
                      break
                    }
                    return;
                  case "public":
                    t("pub");
                    if (b.tabs.in_tab()) return;
                    m = g.html();
                    window.LGBB &&
                      (m = LGBB.parse(m));
                    g.html(b.filter(m))
                }
                l && (h.prepend(l), a.userId === b.user("id") && h.addClass("my_message"));
                e += a.username + ", " + timeParser(a) + ": " + g.text() + "\n";
                h.append(g);
                d[b.settings.on("newest first") ? "prepend" : "append"](h)
              }
            });
            this.plain_text = e;
            this.get_template_item("messages").innerHTML = this.settings.on("plain text") ? e.replace(/[\r\n]+/g, "<br>") : d.html();
            d.empty();
            delete d;
            this.check_tab_counts(c);
            $('[data-message="globalType"]').closest('.achat_row').addClass('global_message');
            var a_user;
            this.tabs.save();
            if ( $('.achat_row').children("img.awc_avatar").length > 0) {
                $('.achat_row').find("img.awc_avatar").each(function(h, j) {
                    a_user = $(this).closest('.achat_row').children('span.user').text();
                    a_user = a_user.slice(0, -2);
                    jQuery(this).closest(".post-container").append(this);
                    var g = $(j);
                    var k = $("<div />").css({
                      "background-image": "url(" + g.attr("src") + ")",
                      "box-sizing": "initial"
                    });
                    k.addClass("awc_avatar");
                    k.attr('onclick', 'avacweb_chat.insert_text("' + a_user + '")');
                    g.replaceWith(k);
                });
            }
            $('#awc_messages').children('.achat_row').each(function() {
                a_user = $(this).children('span.user').text();
                $(this).next('.achat_row').children('span.user:contains("' + a_user + '")').closest('.achat_row').addClass('attached');
                if ( $(this).hasClass('attached') ) {
                    if ( !$(this).prev('.achat_row').hasClass('attached') ) {
                        $(this).prev('.achat_row').removeClass('attached').addClass('first attached');
                    }
                    if ( !$(this).next('.achat_row').hasClass('attached') ) {
                        $(this).removeClass('attached').addClass('last attached');
                    }
                }
            });
          },
          check_tab_counts: function(a) {
            var b = !1,
              c = 0,
              d;
            for (d in a) {
              var e = this.tabs.get(d);
              e && this.tabs.can_view(e) && (0 !== e.count && a[d] !== e.count && ((b = document.getElementById("achat_tab_" + d)) && !f(b).hasClass("active") && f(b).addClass("new"), b = !0), c += a[d] - e.count, this.tabs.data[d].count = a[d])
            }
            b && this.alert_new_messages(c)
          },
          get_user: function(a) {
            var b = {
              id: 0,
              username: "Guest",
              staff: !1,
              color: "none",
              online: !1
            };
            return "string" === typeof a ? this.user_data[a] ? this.user_data[a] : b : this.user_data["u" + a] ? this.user_data["u" + a] : b
          },
          user: function(a) {
            return this.get_user(this._user.user_id)[a]
          },
          alert_new_messages: function(a) {
            if (this.event.fire("onnew", a)) {
              var audioElement, newMessageSound, lastMessage, currentUser;
              audioElement = document.createElement('audio');
              lastMessage = $('#awc_messages').find('.achat_row:last-child').children('span.user').text();
              currentUser = this.user('username');
              newMessageSound = 'https://dl.dropboxusercontent.com/u/56698024/Universo%20Maker/Iphone%20Sms%20Original.mp3';
              if ( lastMessage.toLowerCase().indexOf(currentUser.toLowerCase()) >= 0 ) {
                // Own Message
              } else {
                document.title = '¡Nuevo Mensaje!';
                if( this.settings.on('sonido') ) {
                  audioElement.setAttribute('src', newMessageSound);
                  audioElement.play();
                }
                $(window).hover(function() {
                  document.title = originalTitle;
                });
              }
            }
            this.event.fire("onnew", a) && !this.settings.on("reading") && (this.settings.on("open") || this.config.custom_placement || f("#avacweb_chat_button").addClass("newmsg")); 
          },
          array_walk: function(a, b, c) {
            "string" !== typeof a && (c = b, b = a, a = "a");
            var d = {
                f: "filter",
                m: "map",
                a: "forEach"
              }[a],
              e = 0,
              f = [],
              g = b.length;
            if (d && b[d]) return b[d](c);
            for (; e < g; e++) {
              var d = b[e],
                h = c.call(b, d, e, b);
              switch (a) {
                case "f":
                  h && f.push(d);
                  break;
                case "m":
                  f.push(h);
              }
            }
            return f;
          },
          in_array: function(a, b) {
            return a.indexOf ? -1 !== a.indexOf(b) : 0 < this.array_walk("f",
              a,
              function(a) {
                return a === b
              }).length
          },
          cookie: function(a, b, c) {
            a = "achat_" + a;
            if (1 === arguments.length) return a in sessionStorage ? sessionStorage.getItem(a) : localStorage.getItem(a);
            (c ? localStorage : sessionStorage).setItem(a, b)
          },
          t: function(a) {
            return window.avacweb_chat_translation ? avacweb_chat_translation[a.toLowerCase()] || a : a
          },
          get_template_item: function(a) {
            var b = document.getElementById(this.config.template.ids[a]);
            if (b) return b;
            console.log('AWCError 201: No id or element found for template item "' + a + '"');
            return document.createElement("div")
          },
          loading: function() {
            this.get_template_item("messages").innerHTML = '<div style="text-align: center;height: 100%;background: #18191B url(\'http://i.imgur.com/dasEbuC.gif\');background-size: 50%;background-repeat: no-repeat;background-position: center center;color: #e0543c;box-sizing: border-box;display: table;width: 100%;"><span style="display: table-cell;vertical-align: bottom;padding: 2em;">Cargando...</span></div>'
          },
          get_refresh_rate: function() {
            var a = ++this.inactive_refreshes,
              b = "normal";
            switch (!0) {
              case 40 < a:
                b = "in40";
                break;
              case 30 < a:
                b = "in30";
                break;
              case 20 < a:
                b = "in20";
                break;
              case 10 < a:
                b = "in10"
            }
            this.logged_in || (b = "in20");
            this.settings.on("disable timeout") && (b = "in10");
            return this.refresh_rates[b]
          },
          ignore: function(a, b) {
            var c =
              this.settings.value("ignored");
            a = this.get_user(a);
            if (!a.id) return this.popup(ac.t("User not found"));
            if (a.staff) return this.popup(ac.t("Staff can not be ignored"));
            b ? delete c["u" + a.id] : c["u" + a.id] = 1;
            this.settings.value("ignored", c);
            this.update_messages(this.last_data.messages)
          },
          popup: function(a, b) {
            if ("update" === a) {
              var c = window.AWC_update;
              this.cookie("update", c.id, 1);
              a = c.text
            }
            c = document.getElementById("achat_popup");
            c.className = b && a ? "error" : "";
            c.lastChild.innerHTML = a || "";
            this.showhide("achat_popup")
          },
          showhide: function(a) {
            var b = document.getElementById(a);
            this.current_popup && a !== this.current_popup && (document.getElementById(this.current_popup).style.display = "none");
            if ("" === b.innerHTML && "achat_smilies" === a) {
              var c = function() {
                  b.innerHTML = b.innerHTML.replace(/href="javascript:insert_chatboxsmilie/g, 'onclick="return avacweb_chat.insert_text');
                  f("form select", b).removeAttr("onchange").change(function(a) {
                    d("/post?mode=smilies&categ=" + this.value)
                  })
                },
                d = function(a) {
                  b.innerHTML = '<img src="' + avacweb_chat.config.loading_image +
                    '">';
                  f(b).load(a + " #simple-wrap", c)
                };
              d("/post?mode=smilies")
            }
            if ("" === b.innerHTML && "achat_colors" === a) {
              var colorStructure;
              colorStructure = '<table class="color-selector">';
              colorStructure += '<tbody>';
              colorStructure += '<tr>';
              colorStructure += '<td onclick="parent.avacweb_chat.settings.value(\'color\', \'#16a085\');" style="background: #16a085"></td>';
              colorStructure += '<td onclick="parent.avacweb_chat.settings.value(\'color\', \'#27ae60\');" style="background: #27ae60;"></td>';
              colorStructure += '<td onclick="parent.avacweb_chat.settings.value(\'color\', \'#2980b9\');" style="background: #2980b9;"></td>';
              colorStructure += '<td onclick="parent.avacweb_chat.settings.value(\'color\', \'#8e44ad\');" style="background: #8e44ad;"></td>';
              colorStructure += '<td onclick="parent.avacweb_chat.settings.value(\'color\', \'#2c3e50\');" style="background: #2c3e50;"></td>';
              colorStructure += '</tr>';
              colorStructure += '<tr>';
              colorStructure += '<td onclick="parent.avacweb_chat.settings.value(\'color\', \'#f39c12\');" style="background: #f39c12;"></td>';
              colorStructure += '<td onclick="parent.avacweb_chat.settings.value(\'color\', \'#e67e22\');" style="background: #e67e22;"></td>';
              colorStructure += '<td onclick="parent.avacweb_chat.settings.value(\'color\', \'#c0392b\');" style="background: #c0392b;"></td>';
              colorStructure += '<td onclick="parent.avacweb_chat.settings.value(\'color\', \'#7f8c8d\');" style="background: #7f8c8d;"></td>';
              colorStructure += '<td onclick="parent.avacweb_chat.settings.value(\'color\', \'#34495e\');" style="background: #34495e;"></td>';
              colorStructure += '</tr>';
              colorStructure += '</tbody>';
              colorStructure += '</table>';
              b.innerHTML = colorStructure
            }
            "none" === b.style.display ? (b.style.display = "", this.current_popup =
              a) : (b.style.display = "none", this.current_popup = null)
          },
          insert_text: function(a) {
            var b = this.get_template_item("messagebox");
            b.value += a;
            b.focus();
            return !1
          },
          insert_pm: function(a) {
            var b = this.get_template_item("messagebox"),
              c = b.value;
            0 === c.indexOf("/pm(") ? b.value = "/pm(" + a + "," + c.substr(4) : b.value = "/pm(" + a + ") " + c;
            b.focus();
            return !1
          },
          capitalize: function(a) {
            return a.charAt(0).toUpperCase() + a.substr(1)
          },
          filter: function(a) {
            for (var b in this.config.filters) a = a.replace(RegExp(b, "gi"), this.config.filters[b]);
            return a
          },
          resize: {
            dimensions: {},
            init: function(a, b) {
              var c = avacweb_chat.resize,
                d = document.getElementById("avacweb_chat");
              c.startX = a.pageX;
              c.startY = a.pageY;
              c.startW = d.offsetWidth;
              c.startH = d.offsetHeight;
              c.windowW = f(window).width();
              c.windowH = f(window).height();
              c.startB = c.windowH - (d.offsetTop + c.startH);
              f("body, html").mousemove(c[b]).mouseup(function() {
                f("body, html").off("mousemove").off("mouseup");
                avacweb_chat.cookie("dimensions", JSON.stringify(avacweb_chat.resize.dimensions))
              })
            },
            drag: function(a) {
              var b = document.getElementById("avacweb_chat"),
                c = avacweb_chat.resize;
              c.dimensions.width = b.style.width = c.startW + (c.startX - a.pageX) + "px";
              c.dimensions.height = b.style.height = c.startH + (c.startY - a.pageY) + "px"
            },
            move: function(a) {
              var b = document.getElementById("avacweb_chat"),
                c = avacweb_chat.resize;
              c.dimensions.right = b.style.right = c.windowW - a.pageX - c.startW + "px";
              c.dimensions.bottom = b.style.bottom = c.startB - (a.pageY - c.startY) + "px"
            }
          },
          settings: {
            initiated: !1,
            data: {},
            add: function(a, b, c) {
              if ("object" === typeof a) {
                for (var d in a) this.add(d, a[d], b);
                return this
              }
              this.data[a] ?
                (this.data[a].save = c ? !0 : !1, this.data[a].value = b) : (b = "boolean" === typeof b ? b ? 1 : 0 : b, this.data[a] = {
                  value: b,
                  special: "number" !== typeof b ? !0 : !1,
                  save: c ? !0 : !1,
                  UI_added: !1
                });
              return this
            },
            add_ui: function(a) {
              this.initiated || this.init();
              if (1 < arguments.length) return avacweb_chat.array_walk(arguments, function(a) {
                avacweb_chat.settings.add_ui(a)
              });
              if (this.data[a] && (!this.data[a] || !this.data[a].special && !this.data[a].UI_added)) {
                var b = avacweb_chat,
                  b = '<div class="achat_user_setting"><span>' + b.t(b.capitalize(a)) + "</span>",
                  b = b + ('<input type="checkbox" onclick="avacweb_chat.settings.toggle(\'' + a + '\')"id="ac_' + a.replace(/\s/g, "_") + '_checkbox"'),
                  b = b + ((this.on(a) ? ' checked="checked"' : "") + "></div>");
                f(document.getElementById("achat_user_prefs")).append(b);
                this.data[a].UI_added = !0
              }
            },
            remove: function(a) {
              if (this.data[a]) {
                if (this.data[a].UI_added) {
                  var b = document.getElementById("ac_" + a.replace(/\s/g, "_") + "_checkbox");
                  b && b.parentNode.parentNode.removeChild(b.parentNode)
                }
                delete this.data[a];
                this.save()
              }
            },
            value: function(a, b) {
              2 ===
                arguments.length && this.data[a] && (this.data[a].value = b, this.data[a].UI_added && (document.getElementById("ac_" + a.replace(" ", "_") + "_checkbox").checked = !!b), avacweb_chat.event.fire("onsettingchange", a), this.save());
              return this.data[a] ? this.data[a].value : null
            },
            on: function(a) {
              return !(!this.data[a] || !this.data[a].value)
            },
            toggle: function(a) {
              return this.value(a, this.on(a) ? 0 : 1)
            },
            save: function() {
              var a = {},
                b, c;
              for (b in this.data) c = this.data[b], c.save && (a[b] = c.value);
              avacweb_chat.cookie("user_prefs", JSON.stringify(a),
                1)
            },
            init: function() {
              if (!this.initiated) {
                var a = avacweb_chat,
                  b = a.cookie("user_prefs");
                b && !a.mobile && this.add(JSON.parse(b), !0);
                this.initiated = !0
              }
            }
          }
        };
        l = function() {
          return !0
        };
        g.commands = {
          away: !1,
          abs: !1,
          exit: !1,
          banlist: {
            description: "<b onclick=\"avacweb_chat.insert_text('/banlist');\">/banlist</b> - Muestra una lista de todos los usuarios baneados, comando solo para moderadores.",
            staff: !0,
            run: function() {
              return !1
            }
          },
          cls: {
            description: "<b onclick=\"avacweb_chat.insert_text('/cls');\">/cls</b> - Limpia el chatbox, comando solo para moderadores.",
            run: l,
            staff: !0
          },
          clear: {
            description: "<b onclick=\"avacweb_chat.insert_text('/clear');\">/clear</b> - Limpia el chatbox, comando solo para moderadores.",
            run: l,
            staff: !0
          },
          ban: {
            description: "<b onclick=\"avacweb_chat.insert_text('/ban nick');\">/ban username</b> - Banea a un usuario del Chatbox, comando solo para moderadores.",
            run: l,
            staff: !0
          },
          unban: {
            description: "<b onclick=\"avacweb_chat.insert_text('/unban nick');\">/unban username</b> - Remueve el baneo de un usuario, comando solo para moderadores.",
            run: l,
            staff: !0
          },
          mod: {
            description: "<b onclick=\"avacweb_chat.insert_text('/mod nick');\">/mod username</b> - Le da el rango de moderador a un usuario. Comando exclusivo de administradores.",
            run: l,
            staff: !0
          },
          unmod: {
            description: "<b onclick=\"avacweb_chat.insert_text('/unmod nick');\">/unmod username</b> - Remueve el rango de moderador de un usuario. Comando exclusivo de administradores.",
            run: l,
            staff: !0
          },
          kick: {
            description: "<b onclick=\"avacweb_chat.insert_text('/kick nick');\">/kick username</b> - Desconecta a un usuario del chatbox. Comando solo para moderadores.",
            run: l,
            staff: !0
          },
          logs: {
            description: "<b onclick=\"avacweb_chat.insert_text('/logs');\">/logs</b> - Muestra los archivos guardados y completos del chat. Comando solo para el fundador 'Administrador'.",
            staff: !0,
            run: function() {
              if (avacweb_chat.user('id') === 1) window.open("", "awc-logs").document.write('<script src="http://chat.avacweb.net/awc-log.js">\x3c/script>');
              return !1
            }
          },
          idle: {
            description: "<b onclick=\"avacweb_chat.insert_text('/idle');\">/idle</b> - Te pone en modo ausente.",
            run: function() {
              return "/abs"
            }
          },
          back: {
            description: "<b onclick=\"avacweb_chat.insert_text('/back');\">/back</b> - Te quita el modo ausente.",
            run: function(text) {
              $('ul.online-users').find('li.idle > span:contains("' + avacweb_chat.user('name') + '")').removeClass('idle');
              return '/me back'
            }
          },
          me: {
            description: '<b onclick=\"avacweb_chat.insert_text(\'/me mensaje\');\">/me mensaje</b> - Éste comando te mostrará como en tercera persona (ejemplo: "/me come pizza" retornará "Nickname come pizza")',
            run: function(a) {
              avacweb_chat.simple_send("method=send&message=" +
                encodeURIComponent('[table class="a_chat_cmd"][tr][td]me[/td][td]' + avacweb_chat.tabs.current + "[/td][td]" + a + "[/td][/tr][/table]"));
              return !1
            }
          },
          cleartab: {
            description: "<b onclick=\"avacweb_chat.insert_text('/cleartab');\">/cleartab</b> - Limpia sólo los mensajes de la pestaña actual. Comando solo para moderadores.",
            staff: !0,
            run: function(a) {
              avacweb_chat.simple_send("method=send&message=" + encodeURIComponent('[table class="a_chat_cmd"][tr][td]cleartab[/td][td]' + avacweb_chat.tabs.current + "[/td][td][/td][/tr][/table]"));
              return !1
            }
          },
          global: {
            description: "<b onclick=\"avacweb_chat.insert_text('/global mensaje');\">/global mensaje</b> - Anuncia un mensaje global en todas las salas. Comando solo para moderadores.",
            staff: !0,
            run: function(a) {
              return '[table class="a_chat_cmd"][tr][td]global[/td][td]' + avacweb_chat.tabs.current + "[/td][td]" + a + "[/td][/tr][/table]";
            }
          },
          pm: {
            description: "<b onclick=\"avacweb_chat.insert_text('/pm(username) mensaje');\">/pm(username) mensaje</b> - Envía un mensaje que solo puede ser visto por ti y el usuario especificado. Puedes especificar varios usuarios separándolos por una coma.",
            run: function(a) {
              var b = a.match(/\((.*?)\)\s+(.*)/);
              a = avacweb_chat;
              var c = a.user("username");
              if (!b || !b[0] || !a.user("id") || b[1] === a.user("username")) return !1;
              var d = b[2],
                b = b[1].split(/,\s*/);
              a.in_array(b, c) &&
                a.in_array(b, a.tabs.safe_name(c)) || b.push(c);
              a.tabs.start["private"](b);
              return '[table class="a_chat_pm"][tr][td]' + a.tabs.safe_name(b.join("]-[~~SPLITTER~~]-[")) + "[/td][td]" + d + "[/td][/tr][/table]"
            }
          },
          tab: {
            description: "<b onclick=\"avacweb_chat.insert_text('/tab(nombrePestaña) mensaje');\">/tab(nombrePestaña) mensaje</b> - Envía un mensaje a la pestaña especificada.",
            run: function(a) {
              var b = avacweb_chat,
                c = a.match(/\((.*?)\)\s+(.*)/);
              if (!c || !c[0]) return !1;
              a = c[2];
              c = c[1];
              if (2 > c.length) return b.popup(b.t("Los nombres de las pestañas son de por lo menos 2 carácteres."));
              var d = b.tabs.create_id(c),
                e = b.tabs.get(d);
              !e &&
                b.user("staff") && (b.tabs.start.user(c, b.user("username")), e = b.tabs.get(d));
              return b.tabs.can_view(e) ? '[table class="a_chat_tab"][tr][td]' + c + "[/td][td]" + a + "[/td][/tr][/table]" : !1
            }
          },
          cmd: {
            description: "<b onclick=\"avacweb_chat.insert_text('/cmd');\">/cmd</b> - Muestra una lista de todos los comandos disponibles.",
            run: function(a) {
              a = "<ul>";
              var b = avacweb_chat,
                c;
              for (c in b.commands) !b.commands[c] || b.commands[c].staff && !b.user("staff") || (a += "<li>" + b.commands[c].description + "</li>");
              b.popup(a + "</ul>");
              return !1
            }
          }
        };
        g.parse_command = function(a) {
          a = a.replace("/", "");
          var b =
            a.match(/^(\w+)\s*/),
            c = b[1];
          if (!this.commands[c]) return this.popup(this.t("This command is not available or does not exist")), !1;
          a = a.replace(b[0], "");
          try {
            var d = this.commands[c];
            if (d.staff && !this.user("staff")) return this.popup(this.t("Has ingresado un comando que sólo está disponible para moderadores."));
            if (this.event.fire("oncommand", c)) return d.run(a)
          }
          catch (e) {
            return console.log("AWCError 203: command (" + c + ") : ", e), !1
          }
        };
        g.event = {
          data: {},
          default_prevented: !1,
          fix: function(a) {
            return (/^on/.test(a) ? a : "on" + a).toLowerCase()
          },
          add: function(a,
            b) {
            a = this.fix(a);
            b.call && (this.data[a] ? this.data[a].push(b) : this.data[a] = [b])
          },
          fire: function(a, b) {
            a = this.fix(a);
            this.default_prevented = !1;
            var c = {
              preventDefault: function() {
                avacweb_chat.event.default_prevented = !0
              },
              data: b || null,
              type: a
            };
            a in this.data && avacweb_chat.array_walk(this.data[a], function(b, e) {
              try {
                b.call && b.call(avacweb_chat, c)
              }
              catch (f) {
                console.log('AWCError 204: Invalid Event. Event type: "' + a + '".', f)
              }
            });
            return this.default_prevented ? this.default_prevented = !1 : !0
          },
          remove: function(a, b) {
            a = this.fix(a);
            var c = this.data[a];
            if (c && !b) return this.data[a] = [];
            c && (this.data[a] = avacweb_chat.array_walk("f", c, function(a) {
              return a !== b
            }))
          }
        };
        g.tabs = {
          current: "pub",
          initiated: !1,
          data: {
            pub: {
              name: "Public",
              users: [],
              id: "pub",
              user_tab: 1,
              count: 0
            }
          },
          get: function(a) {
            a || (a = avacweb_chat.tabs.current);
            return avacweb_chat.tabs.data[a]
          },
          safe_name: function(a) {
            return a.replace(/\\/g, "").replace(/'/g, "&#39;").replace(/"/g, "&#34;")
          },
          in_tab: function() {
            return "pub" !== avacweb_chat.tabs.current
          },
          create_name: function(a) {
            var b = avacweb_chat,
              c = b.tabs.safe_name(b.user("username")),
              d = "";
            a = b.tabs.safe_name(a.join("[]~~SPLITTER~~[]")).split("[]~~SPLITTER~~[]");
            return b.array_walk("f", a.sort(), function(a) {
              var b = d === a;
              d = a;
              return a !== c && !b
            }).join(", ")
          },
          create_id: function(a) {
            "string" !== typeof a && (a = avacweb_chat.tabs.create_name(a));
            a = a.replace(/./g, function(a) {
              return a.charCodeAt(0)
            });
            return 15 < a.length ? a.substr(0, 15) : a
          },
          create: {
            "private": function(a) {
              var b = avacweb_chat;
              if (b.config.allow_private_messaging) return a = b.tabs.safe_name(a.join("[]~~SPLITTER~~[]")).split("[]~~SPLITTER~~[]"), {
                deleted: !1,
                users: a,
                user_tab: 0,
                name: b.tabs.create_name(a),
                id: b.tabs.create_id(a),
                count: 0
              }
            },
            user: function(a, b) {
              return {
                users: [],
                user_tab: 1,
                name: a,
                id: avacweb_chat.tabs.create_id(a),
                starter: b || null,
                count: 0
              }
            }
          },
          start: {
            "private": function(a) {
              var b = avacweb_chat,
                c = b.user("username");
              if (b.config.allow_private_messaging) {
                b.in_array(a, c) || a.push(c);
                a = b.tabs.create["private"](a);
                c = b.tabs.get(a.id);
                if (!c || c && c.deleted) b.tabs.data[a.id] = a, b.tabs.add(a), b.tabs.save();
                b.tabs.change_tab(a.id)
              }
            },
            user: function(a, b) {
              var c =
                avacweb_chat;
              if (!a) {
                a = prompt(c.t("Choose a name for the new tab"));
                if (3 > a.length) return c.popup(c.t("Tab names must be more than 2 characters."));
                b = c.user("username")
              }
              var d = c.tabs.create.user(a, b);
              c.tabs.get(d.id) || c.tabs.add(d);
              c.tabs.change_tab(d.id)
            }
          },
          add: function(a, b) {
            var c = avacweb_chat,
              d = c.get_template_item("tabs");
            if (c.config.allow_private_messaging || a.user_tab) {
              c.tabs.data[a.id] = a;
              var e = document.createElement("a");
              a.user_tab && a.starter ? e.title = c.t("Started by") + ": " + a.starter.replace(/"/g,
                "") : a.user_tab || (e.title = c.t("Conversation with") + ": " + a.name.replace(/"/g, ""));
              e.id = "achat_tab_" + a.id;
              e.className = "achat_tab item";
              e.style.display = "none";
              e.innerHTML = '<span>' + 15 < a.name.length ? a.name.substr(0, 13) + "...</span>" : '<span>' + a.name + '</span>';
              b || (e.innerHTML += '<i class="remove link icon" style="float: right;" onclick="parent.avacweb_chat.tabs.del(\'' + a.id + "')\"></i>");
              document.getElementById("achat_add_tab") ? d.insertBefore(e, document.getElementById("achat_add_tab")) : d.appendChild(e);
              f(e).click(function() {
                avacweb_chat.tabs.change_tab(a.id)
              }).fadeIn();
              c.event.fire("ontabopen", a)
            }
          },
          del: function(a) {
            var b = avacweb_chat,
              c = b.tabs.get(a);
            !a || "pub" === a || a in avacweb_chat_config.tabs || !c || c.deleted || (c.deleted = !0, b.tabs.save(), b.event.fire("ontabclose", c) && (f(document.getElementById("achat_tab_" + c.id)).remove(), b.tabs.current === c.id && b.tabs.change_tab("pub")))
          },
          save: function() {
            var a = avacweb_chat,
              b = [],
              c, d;
            for (c in a.tabs.data) d = a.tabs.get(c), d.user_tab && !d.deleted || b.push({
              u: d.users,
              d: d.deleted ? 1 : 0,
              c: d.count || 0,
              n: d.user_tab ? d.name : 0
            });
            a.cookie("tabs", JSON.stringify(b))
          },
          can_view: function(a, b) {
            var c = avacweb_chat,
              d = b || c.user("id"),
              e = c.tabs.safe_name(c.get_user(d).username);
            if (0 === d) return !1;
            "string" === typeof a && (a = c.tabs.get(a));
            return a.user_tab && 0 === a.users.length || c.in_array(a.users, e) || c.in_array(a.users, d)
          },
          change_tab: function(a) {
            var b = avacweb_chat;
            (a = b.tabs.get(a)) && (b.config.allow_private_messaging || a.user_tab) && !a.deleted && b.tabs.can_view(a) && (b.tabs.current = a.id, b.update_messages(b.last_data.messages), b.event.fire("ontabchange", a) && (f(".achat_tab.active", document.getElementById("achat_tabs")).removeClass("active"),
              f(document.getElementById("achat_tab_" + a.id)).removeClass("new").addClass("active"), b.get_template_item("messages").scrollTop = b.settings.on("newest first") ? 0 : 999999))
          },
          init: function() {
            var a = avacweb_chat;
            a.user("staff") && (a.get_template_item("tabs").innerHTML += '<a id="achat_add_tab" class="achat_tab item" title="' + a.t("Add a new tab") + '" onclick="avacweb_chat.tabs.start.user()"><i class="plus link icon"></i></a>');
            a.tabs.data.pub.name = a.t("Public");
            a.tabs.add(a.tabs.get("pub"), !0);
            a.tabs.change_tab("pub");
            var b = avacweb_chat_config.tabs;
            if (b)
              for (var c in b) {
                var d = a.tabs.create.user(c);
                d.users = a.array_walk("m", b[c], function(b) {
                  return "string" === typeof b ? a.tabs.safe_name(b) : b
                });
                a.tabs.can_view(d) && a.tabs.add(d, !0)
              }
            b = (b = a.cookie("tabs")) ? JSON.parse(b) : [];
            a.array_walk(b, function(b) {
              if (b.n || a.config.allow_private_messaging) {
                var c = b.n ? a.tabs.create.user(b.n) : a.tabs.create["private"](b.u);
                c.count = b.c;
                c.deleted = !!b.d;
                a.tabs.data[c.id] = c;
                c.deleted || a.tabs.add(c)
              }
            });
            a.tabs.initiated = !0
          }
        };
        g.usermenu = function(a, b) {
          var c = this.get_user(a);
          b && b.preventDefault &&
            b.preventDefault();
          var d = document.getElementById("awc_contextmenu"),
            e = this.get_template_item("userlist");
          d || (d = document.createElement("div"), d.id = "awc_contextmenu", d.style.display = "none", e.parentNode.insertBefore(d, e));
          d.style.height = e.offsetHeight - 5 + "px";
          d.style.width = e.offsetWidth + "px";
          d.innerHTML = '<i class="awc_x remove link icon" onclick="$(\'#awc_contextmenu\').slideToggle();" style="float: right;"></i><span class="username">' + (9 < c.username.length ? c.username.substr(0, 9) + "..." : c.username) + "</span>";
          d.innerHTML += '<span class="help">Acciones del Foro</span><p class="forum-action"><a href="/u' + c.id +
            '" target="_blank">' + this.t("View Profile") + "</a></p>";
          d.innerHTML += '<p class="forum-action"><a href="/privmsg?mode=post&u=' + c.id + '" target="_blank">' + this.t("Send Private Message") + "</a></p>";
          this.logged_in && this.user("staff") && !c.staff && (d.innerHTML += "<span class='help'>Acciones de Moderación de Chat</span><p onclick=\"avacweb_chat.submit('/kick " + c.username + "');$('#awc_contextmenu').slideToggle();\" class=\"chat-action\">" + this.t("Kick from chat") + "</p>", d.innerHTML += "<p onclick=\"avacweb_chat.submit('/ban " + c.username + "');\" class='chat-action'>" + this.t("Ban from chat") + "</p>");
          this.logged_in && c.id === this.user("id") &&
            (d.innerHTML += "<span class='help'>Acciones de Chat Propias del Usuario</span><p class='user-action' onclick=\"avacweb_chat.submit('/idle');\">Estado: " + this.t("Idle") + "</p>");
          this.logged_in && c.id !== this.user("id") && (this.config.allow_private_messaging && (d.innerHTML += "<span class='help'>Acciones del Chat</span><p class='chat-action' onclick=\"avacweb_chat.tabs.start.private(['" + c.username + "']);\">" + this.t("Start Private Conversation") + "</p>"), this.settings.value("ignored")["u" + c.id] ? d.innerHTML += '<p class="chat-action" onclick="avacweb_chat.ignore(' + c.id + ", 1);$('#awc_contextmenu').slideToggle();\">" + this.t("Un-ignore") + " " + c.username + "</p>" : d.innerHTML += '<p class="chat-action" onclick="avacweb_chat.ignore(' +
            c.id + ");$('#awc_contextmenu').slideToggle();\">" + this.t("Ignore") + " " + c.username + "</p>");
          f(d).slideDown();
          $('#awc_contextmenu').children().wrapAll('<div class="context menu"></div>');
          return !1
        };
        if (h && "object" === typeof h) {
          g.array_walk("chat_title stylesheet allow_private_messaging allow_user_resize allow_copyrights custom_placement loading_image".split(" "), function(a) {
            a in h && (g.config[a] = h[a])
          });
          g.config.allow_private_messaging || (g.commands.pm = !1);
          if (h.events)
            for (var v in h.events) g.array_walk(h.events[v], function(a) {
              g.event.add(v, a)
            });
          if (h.commands)
            for (var n in h.commands) g.commands[n] =
              h.commands[n];
          if (h.filters)
            for (n in h.filters) /^[\w\s0-9]+$/.test(n) && (g.config.filters[n] = h.filters[n]);
          if (h.template && h.template.markup && (g.config.template.markup = h.template.markup, h.template.ids))
            for (var w in h.template.ids) g.config.template.ids[w] = h.template.ids[w]
        }
        g.settings.add({
          bold: 0,
          italic: 0,
          strike: 0,
          underline: 0,
          color: "",
          "newest first": 0,
          "disable timeout": 0,
          ignored: {},
          archives: 0,
          open: 0
        }, !0).add({
          reading: 0,
          "plain text": 0
        }, !1);
        g.event.add("onload", function() {
          this.settings.add_ui("bold", "italic",
            "strike", "underline", "newest first", "disable timeout", "plain text");
          this.settings.on("newest first") && this.event.fire("onsettingchange", "newest first");
          0 < this.settings.value("color").length && this.event.fire("onsettingchange", "color")
        });
        g.event.add("onsettingchange", function(a) {
          a = a.data;
          switch (a) {
            case "newest first":
              f([this.get_template_item("messages"), this.get_template_item("tabs")])[this.settings.on(a) ? "addClass" : "removeClass"]("newest_first");
              this.settings.initiated && this.update_messages(this.last_data.messages);
              break;
            case "color":
              a = this.settings.value(a);
              this.get_template_item("messagebox").style.color = a;
              document.getElementById("achat_color_button").style.color = a;
              document.getElementById("achat_colors").style.display = "none";
              break;
            case "reading":
              this.settings.on(a) || (this.get_template_item("messages").scrollTop = this.settings.on("newest first") ? 0 : 999999);
              document.getElementById("achat_reading").className = this.settings.on(a) ? "achat_button ui active button reading" : "achat_button ui button";
              break;
            case "open":
              if (!this.event.fire(this.settings.on(a) ?
                  "onopen" : "onclose")) break;
              a = this.get_template_item("chat");
              this.settings.on("open") ? (a.style.display = "", f("#avacweb_chat_button").removeClass("newmsg")) : a.style.display = "none";
              break;
            case "archives":
              document.getElementById("archives").innerHTML = this.settings.on(a) ? this.t("On") : this.t("Off");
            case "plain text":
              this.loading(), this.last_data.messages = [], this.refresh()
          }
        });
        window.avacweb_chat = g;
        f(function() {
          f.get("/chatbox", function(a) {
            a = a.substring(a.indexOf('new Chatbox("') + 13);
            avacweb_chat.init(a.substring(0,
              a.indexOf('"')), window._userdata)
          })
        })
      }
    })(jQuery, window.avacweb_chat, window.avacweb_chat_config);
});

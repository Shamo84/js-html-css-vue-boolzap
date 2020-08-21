Vue.config.devtools = true;
var app = new Vue(
  {
    el: '#app',
    data: {
      activeContact: 0,
      showByHover: null,
      showByClick: null,
      contactSearchInput: "",
      chatInput: "",
      popupPosition: null,
      deletePopup: {
        parent: false,
        child: false,
        messageIndex: null
      },
      replies: [
          "neanche morto",
          "piuttosto mi butto dal balcone",
          "non vedo l'ora di perdermelo",
          "sei utile come la forchetta nella zuppa",
          "se mio nonno avesse le rotelle sarebbe una carriola",
          "mi hai fatto venire voglia di bere della cicuta",
          "tutt'ad un tratto il suicidio mi sembra un'opzione plausibile"
        ],
      contacts: [
        {
          name: "Michele",
          lastChat: "viva la vida loca",
          lastContact: null,
          image: "avatar_1.jpg",
          visible: true,
          chat: [
            {
              text: "ciao michele!",
              time: moment('13-08-2020 20:15:00', "DD-MM-YYYY hh:mm:ss"),
              sent: true
            },
            {
              text: "ciao cara",
              time: moment('13-08-2020 20:15:20', "DD-MM-YYYY hh:mm:ss"),
              sent: false
            },
            {
              text: "come stai?",
              time: moment('13-08-2020 20:16:00', "DD-MM-YYYY hh:mm:ss"),
              sent: true
            },
            {
              text: "tutto bene grazie e tu?",
              time: moment('13-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss"),
              sent: false
            },
            {
              text: "beh, si va avanti..",
              time: moment('13-08-2020 20:17:30', "DD-MM-YYYY hh:mm:ss"),
              sent: true
            },
            {
              text: "sempre problemi eh?",
              time: moment('13-08-2020 20:18:00', "DD-MM-YYYY hh:mm:ss"),
              sent: false
            },
            {
              text: "eh sì, è la vita!",
              time: moment('13-08-2020 20:18:30', "DD-MM-YYYY hh:mm:ss"),
              sent: true
            },
            {
              text: "come ti capisco..",
              time: moment('13-08-2020 20:19:00', "DD-MM-YYYY hh:mm:ss"),
              sent: false
            },
            {
              text: "pensa che ieri ho giocato 700€ alle macchinette",
              time: moment().subtract(2, 'hours'),
              sent: true
            },
            {
              text: "e hai vinto qualcosa?",
              time: moment().subtract(2, 'hours'),
              sent: false
            },
            {
              text: "ma figurati!",
              time: moment().subtract(2, 'hours'),
              sent: true
            },
            {
              text: ":D",
              time: moment().subtract(2, 'hours'),
              sent: false
            },
          ]
        },
        {
          name: "Alessandro L.",
          lastChat: "guardo la tele",
          lastContact: null,
          image: "avatar_5.jpg",
          visible: true,
          chat: [
            {
              text: "ciao alessandro",
              time: moment().subtract(2, 'days'),
              sent: true
            },
            {
              text: "ciao cara",
              time: moment().subtract(2, 'days'),
              sent: false
            }
          ]
        },
        {
          name: "Fabio",
          lastChat: "bevo il latte",
          lastContact: null,
          image: "avatar_2.jpg",
          visible: true,
          chat: [
            {
              text: "ciao fabio!",
              time: moment('12-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss"),
              sent: true
            },
            {
              text: "ciao cara",
              time: moment('12-08-2020 20:18:00', "DD-MM-YYYY hh:mm:ss"),
              sent: false
            },
          ]
        },
        {
          name: "Samuele",
          lastChat: "W il rock n' roll",
          lastContact: null,
          image: "avatar_3.jpg",
          visible: true,
          chat: [
            {
              text: "ciao samu",
              time: moment('10-08-2020 15:17:00', "DD-MM-YYYY hh:mm:ss"),
              sent: true
            },
            {
              text: "ciao cara",
              time: moment('10-08-2020 15:18:00', "DD-MM-YYYY hh:mm:ss"),
              sent: false
            },
          ]
        },
        {
          name: "Alessandro B.",
          lastChat: "gioco alla play",
          lastContact: null,
          image: "avatar_4.jpg",
          visible: true,
          chat: [
            {
              text: "ciao alex",
              time: moment('09-08-2020 10:17:00', "DD-MM-YYYY hh:mm:ss"),
              sent: true
            },
            {
              text: "ciao cara",
              time: moment('09-08-2020 10:17:00', "DD-MM-YYYY hh:mm:ss"),
              sent: false
            }
          ]
        },
        {
          name: "Claudia",
          lastChat: "rockin' it",
          lastContact: null,
          image: "avatar_6.jpg",
          visible: true,
          chat: [
            {
              text: "ciao cara",
              time: moment('06-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss"),
              sent: true
            },
            {
              text: "ciao carissima",
              time: moment('06-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss"),
              sent: false
            }
          ]
        },
        {
          name: "Davide",
          lastChat: "federer vs djokovic",
          lastContact: null,
          image: "avatar_7.jpg",
          visible: true,
          chat: [
            {
              text: "ciao davide!",
              time: moment('05-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss"),
              sent: true
            },
          ]
        },
        {
          name: "Federico",
          lastChat: "ballando sotto le stelle",
          lastContact: null,
          image: "avatar_8.jpg",
          visible: true,
          chat: [
            {
              text: "ciao fede!",
              time: moment('01-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss"),
              sent: true
            },
            {
              text: "ciao cara",
              time: moment('01-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss"),
              sent: false
            }
          ]
        },
      ],
    },
    methods: {
      searchContacts(){
        for (var i = 0; i < this.contacts.length; i++) {
          var ricerca = this.contactSearchInput.toLowerCase().trim();
          if (!this.contacts[i].name.toLowerCase().search(ricerca)) {
            this.contacts[i].visible = true;
          } else {
            this.contacts[i].visible = false;
          }
        }
      },
      togglePopup(i){
        if (this.showByClick == null) {
          this.showByClick = i;
          if (this.$el.querySelector(".message:nth-child(" + (i+1) +")").getBoundingClientRect().y > this.$el.querySelector(".chat-main").getBoundingClientRect().height - 60) {
            if (this.contacts[this.activeContact].chat[i].sent) {
              this.popupPosition = "bottom-right";
            } else {
              this.popupPosition = "bottom-left";
            }
          } else {
            if (this.contacts[this.activeContact].chat[i].sent) {
              this.popupPosition = "top-right";
            } else {
              this.popupPosition = "top-left";
            }
          }
        } else {
          this.showByClick = null;
        }
      },
      closePopup(){
        if (this.showByClick != null) {
          this.showByClick = null;
        }
      },
      sendMessage(){
        if (this.chatInput.trim() != '') {
          var newMessage = {
            text: this.chatInput,
            time: moment(),
            sent: true
          };
          this.chatInput = "";
          this.contacts[this.activeContact].chat.push(newMessage);
          this.updateLastContact(this.activeContact);
          this.updateLastChat(this.activeContact);
          this.reorderContacts();
          setTimeout(() => this.getReply(), 1000);
          setTimeout(() => this.scrollToEnd(), 1);
        }
      },
      getReply(){
        var newReply = {
          text: this.replies[Math.floor(Math.random() * 7)],
          time: moment(),
          sent: false
        };
        this.contacts[0].chat.push(newReply);
        this.updateLastChat(0);
        setTimeout(() => this.scrollToEnd(), 1);
      },
      updateLastContact(i){
        var lastMessage = this.contacts[i].chat.length-1;
        if (moment().diff(this.contacts[i].chat[lastMessage].time, 'hours') < 24) {
          this.contacts[i].lastContact = this.contacts[i].chat[lastMessage].time.format("kk:mm");
        } else if (moment().diff(this.contacts[i].chat[lastMessage].time, 'hours') < 48) {
          this.contacts[i].lastContact = "Yesterday";
        } else if (moment().diff(this.contacts[i].chat[lastMessage].time, 'hours') < 168) {
          this.contacts[i].lastContact = this.contacts[i].chat[lastMessage].time.format("dddd");
        } else {
          this.contacts[i].lastContact = this.contacts[i].chat[lastMessage].time.format("D/M/YYYY");
        }
      },
      updateLastChat(i){
        this.contacts[i].lastChat = this.contacts[i].chat[this.contacts[i].chat.length - 1].text;
      },
      reorderContacts(){
        var currentContact = this.contacts[this.activeContact];
        this.contacts.splice(this.activeContact, 1);
        trovato = false;
        i = 0
        do {
          if (currentContact.chat.length == 0) {
            this.contacts.push(currentContact);
            this.activeContact = this.contacts.length - 1;
            trovato = true;
          } else if (this.contacts[i].chat.length == 0 || currentContact.chat[currentContact.chat.length - 1].time.isAfter(this.contacts[i].chat[this.contacts[i].chat.length - 1].time) ) {
            this.contacts.splice(i, 0, currentContact);
            this.activeContact = i;
            trovato = true;
          }
          i++
        } while (trovato == false && i < this.contacts.length);
        if (trovato == false) {
          this.contacts.push(currentContact);
          this.activeContact = this.contacts.length - 1;
        }
      },
      // setTimeout(()=>this.moveChar(),1000);
      deleteMessage(index, i) {
        this.contacts[index].chat.splice(i, 1);
        if (this.contacts[index].chat.length > 0) {
          this.updateLastContact(index);
          this.updateLastChat(index);
        } else {
          this.contacts[index].lastContact = null;
          this.contacts[index].lastChat = null;
        }
        this.reorderContacts();
      },
      scrollToEnd: function() {
        var container = this.$el.querySelector(".chat-main");
        container.scrollTop = container.scrollHeight;
      },
    },
    mounted() {
      for (var i = 0; i < this.contacts.length; i++) {
        this.updateLastContact(i);
        this.updateLastChat(i);
      }
    }

  })

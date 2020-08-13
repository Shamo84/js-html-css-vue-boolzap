//   //  APRE IL MESSAGE MENU QUANDO CLIKKI LA FRECCIA E LO CHIUDE QUANDO CLIKKI FUORI
//   $(document).on('click', function(event) {
//     // SE C'è UN DROPDOWN APERTO
//     console.log($(event.target));
//     if ($(".chat-main.active").find("div").hasClass("message-menu")) {
//       if ($(event.target).hasClass("message-menu")) {
//       } else if ($(event.target).hasClass('message-info')) {
//       } else if ($(event.target).hasClass("delete-message")) {
//         $(event.target).parents(".message").remove();
//         var newTime = $(".chat-main.active").children("span:last-child").children("time").text();
//         $(".contatto.active").children("time").text(newTime);
//         riordinaContatti(newTime);
//       } else if ($(event.target).hasClass("message") && ($(event.target).find("div").hasClass("message-menu")) || $(event.target).prop("localName") == "time") {
//         $(".chat-main.active .message-menu").remove();
//       } else {
//         $(".chat-main.active .message-menu").remove();
//         $(".chat-main.active .fa-chevron-down").remove();
//       }
//     } else {
//       // SE NON C'è UN DROPDOWN GIà APERTO, PUOI APRIRLO
//       if ($(event.target).hasClass('fa-chevron-down')) {
//         var messageMenuClone = $("#template .message-menu").clone();
//         messageMenuClone.prependTo($(event.target).parent("span"));
//
//         var positionTop = $(event.target).parent(".message").position().top;
//         // SE IL DROPDOWN SBORDA ABBASSA UN PO LA SCROLL BAR
//         if (positionTop > $(".chat-main.active").height() + 10) {
//           var offsetMessage = $(event.target).parent(".message").prop("offsetTop") - 600;
//           $(".chat-main.active").scrollTop(offsetMessage);
//         }
//       } else if ($(event.target).hasClass('fa-paper-plane')) {
//         // INVIO MESSAGGIO AL CLICK SULL'AEROPLANINO
//         sendMessage();
//         getReply();
//       } else if ($(event.target).closest(".contatto").hasClass("contatto")) {
//           // MOSTRA CHAT, IMMAGINE E NOME DEL CONTATTO ACTIVE
//         $(event.target).closest(".contatto").siblings().removeClass("active");
//         $(event.target).closest(".contatto").addClass("active");
//         var nomeContattoActive = $(event.target).closest(".contatto").find(".nome-contatto").text();
//         var contattoID = $(event.target).closest(".contatto").children(".avatar").attr("userid");
//         showContactChat(contattoID, nomeContattoActive);
//       }
//     }
//   });
//   // TOGGLE DELLE ICONE ALL'INPUT CHAT
//   $("#chat-footer input").keyup(function(event) {
//     if ($("#chat-footer input").val().length == 0) {
//       $("#chat-footer .fas").removeClass("fa-paper-plane").addClass("fa-microphone")
//     } else {
//       $("#chat-footer .fas").addClass("fa-paper-plane").removeClass("fa-microphone")
//     }
//   });
//   // INVIO MESSAGGIO CON INVIO DALL'INPUT
//   $("#chat-footer input").keypress(function(event) {
//     if (event.which == 13 && $(this).val() != "") {
//       sendMessage();
//       getReply();
//     }
//   });
//
// });

//
// // INVIO DEI MESSAGGI
// function sendMessage() {
//   var time = getUpdatedTime();
//   $(".contatto.active").children("time").text(time);
//   var chatTemplate = $("#template .user.message").clone();
//   var message = $("#chat-footer input").val();
//   chatTemplate.prepend(message);
//   chatTemplate.children("time").text(time);
//   $(".chat-main.active").append(chatTemplate);
//   $(".chat-main.active").addClass("waiting-response");
//     $("#chat-footer input").val("");
//   $("#chat-footer .fas").addClass("fa-microphone").removeClass("fa-paper-plane");
//   $(".chat-main.active").scrollTop($(".chat-main.active").prop("scrollHeight"));
//   $(".contatto.active").prependTo("#lista-contatti");
//   $(".contatto.active").addClass("waiting-response");
//
// }
//
// // RICEZIONE DELLA RISPOSTA
// function getReply() {
//   setTimeout(function() {
//     var time = getUpdatedTime();
//     var contactTemplate = $("#template .contact.message").clone();
//     contactTemplate.prepend(rispostaFiccante());
//     contactTemplate.children("time").text(time);
//     $(".contatto.waiting-response").prependTo("#lista-contatti");
//     $(".contatto.waiting-response").removeClass("waiting-response");
//     $(".chat-main.waiting-response").append(contactTemplate);
//     $(".chat-main.waiting-response").removeClass("waiting-response");
//     $(".chat-main.active").scrollTop($(".chat-main.active").prop("scrollHeight"));
//   }, 1000);
// }
//
// // AGGIORNA L'ORARIO DELL'ULTIMO MESSAGGIO DI UN CONTATTO
// function getUpdatedTime() {
//   var newDate = new Date();
//   var time = timeDigits(newDate.getHours()) + ":" + timeDigits(newDate.getMinutes());
//   return time;
// }
//
// // AGGIUNGI ZERI ALL'ORARIO SE NECESSARIO
// function timeDigits(number) {
//   if (number < 10) {
//     number = "0" + number;
//   }
//   return number;
// }
//
// // MOSTRA CHAT, IMMAGINE E NOME DEL CONTATTO CLICCATO
// function showContactChat(userid, nomeContattoActive) {
//   $(".chat-main.active").addClass("display-none").removeClass("active");
//   $(".chat-main").eq(userid-1).addClass("active").removeClass("display-none");
//   $("#foto-contatto").attr("class", "avatar + contatto-" + userid + "");
//   $("#chat-header .nome-contatto").text(nomeContattoActive);
// }
//
// // RISPOSTE RANDOM
// function rispostaFiccante() {
//   var arrayRisposte = [
//     "neanche morto",
//     "piuttosto mi butto dal balcone",
//     "non vedo l'ora di perdermelo",
//     "sei utile come la forchetta nella zuppa",
//     "se mio nonno avesse le rotelle sarebbe una carriola",
//     "mi hai fatto venire voglia di bere della cicuta",
//     "tutt'ad un tratto il suicidio mi sembra un'opzione plausibile"
//   ];
//   var randomNum = Math.floor(Math.random() * 7);
//   return arrayRisposte[randomNum];
// }
//
// // RIORDINA CONTATTI IN BASE ALL'ORARIO DELL'ULTIMO MESSAGGIO
// function riordinaContatti(newTime) {
//   var timeContatto;
//   var i = 0;
//   newTime = parseInt(newTime.replace(":", ""));
//   do {
//     timeContatto = $(".contatto").eq(i).children("time").text();
//     timeContatto = parseInt(timeContatto.replace(":", ""));
//     if (newTime > timeContatto) {
//       $(".contatto.active").insertBefore(".contatto:eq(" + i + ")");
//       return;
//     }
//     i++;
//   } while (i < $(".contatto").length);
//   $(".contatto.active").appendTo("#lista-contatti");
//   return;
// }

var app = new Vue(
  {
    el: '#app',
    data: {
      showByHover: null,
      showByClick: null,
      contactSearch: "",
      contacts: [
        {
          name: "Michele",
          phrase: "viva la vita",
          lastContact: "20:27",
          image: "avatar_1.jpg",
          visible: true,
          active: true,
          chat: [
            {
              text: "ciao michele!",
              time: moment('13-08-2020 20:15:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: true
            },
            {
              text: "ciao cara",
              time: moment('13-08-2020 20:15:20', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: false
            },
            {
              text: "come stai?",
              time: moment('13-08-2020 20:16:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: true
            },
            {
              text: "tutto bene grazie e tu?",
              time: moment('13-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: false
            },
            {
              text: "beh, si va avanti..",
              time: moment('13-08-2020 20:17:30', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: true
            },
            {
              text: "sempre problemi eh?",
              time: moment('13-08-2020 20:18:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: false
            },
            {
              text: "eh sì, è la vita!",
              time: moment('13-08-2020 20:18:30', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: true
            },
            {
              text: "come ti capisco..",
              time: moment('13-08-2020 20:19:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: false
            },
            {
              text: "pensa che ieri ho giocato 700€ alle macchinette",
              time: moment('13-08-2020 20:20:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: true
            },
            {
              text: "e hai vinto qualcosa?",
              time: moment('13-08-2020 20:25:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: false
            },
            {
              text: "ma figurati!",
              time: moment('13-08-2020 20:27:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: true
            },
            {
              text: ":D",
              time: moment('13-08-2020 20:27:30', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: false
            },
          ]
        },
        {
          name: "Fabio",
          phrase: "bevo il latte",
          lastContact: "Yesterday",
          image: "avatar_2.jpg",
          visible: true,
          active: false,
          chat: [
            {
              text: "ciao fabio!",
              time: moment('12-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: true
            },
            {
              text: "ciao cara",
              time: moment('12-08-2020 20:18:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: false
            },
          ]
        },
        {
          name: "Samuele",
          phrase: "W il rock n' roll",
          lastContact: moment('10-08-2020 15:18:00', "DD-MM-YYYY hh:mm:ss").format("dddd"),
          image: "avatar_3.jpg",
          visible: true,
          active: false,
          chat: [
            {
              text: "ciao samu",
              time: moment('10-08-2020 15:17:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: true
            },
            {
              text: "ciao cara",
              time: moment('10-08-2020 15:18:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: false
            },
          ]
        },
        {
          name: "Alessandro B",
          phrase: "gioco alla play",
          lastContact: moment('09-08-2020 10:17:00', "DD-MM-YYYY hh:mm:ss").format("dddd"),
          image: "avatar_4.jpg",
          visible: true,
          active: false,
          chat: [
            {
              text: "ciao alex",
              time: moment('09-08-2020 10:17:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: true
            },
            {
              text: "ciao cara",
              time: moment('09-08-2020 10:17:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: false
            }
          ]
        },
        {
          name: "Alessandro L.",
          phrase: "guardo la tele",
          lastContact: moment('09-08-2020 08:17:00', "DD-MM-YYYY hh:mm:ss").format("dddd"),
          image: "avatar_5.jpg",
          visible: true,
          active: false,
          chat: [
            {
              text: "ciao alessandro",
              time: moment('09-08-2020 08:17:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: true
            },
            {
              text: "ciao cara",
              time: moment('09-08-2020 08:17:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: false
            }
          ]
        },
        {
          name: "Claudia",
          phrase: "rockin' it",
          lastContact: moment('06-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss").format("D/M/YYYY"),
          image: "avatar_6.jpg",
          visible: true,
          active: false,
          chat: [
            {
              text: "ciao cara",
              time: moment('06-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: true
            },
            {
              text: "ciao carissima",
              time: moment('06-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: false
            }
          ]
        },
        {
          name: "Davide",
          phrase: "federer vs djokovic",
          lastContact: moment('05-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss").format("D/M/YYYY"),
          image: "avatar_7.jpg",
          visible: true,
          active: false,
          chat: [
            {
              text: "ciao davide!",
              time: moment('05-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: true
            },
            {
              text: "ciao cara",
              time: moment('05-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: false
            }
          ]
        },
        {
          name: "Federico",
          phrase: "ballando sotto le stelle",
          lastContact: moment('01-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss").format("D/M/YYYY"),
          image: "avatar_8.jpg",
          visible: true,
          active: false,
          chat: [
            {
              text: "ciao fede!",
              time: moment('01-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: true
            },
            {
              text: "ciao cara",
              time: moment('01-08-2020 20:17:00', "DD-MM-YYYY hh:mm:ss").format("kk:mm"),
              sent: false
            }
          ]
        },
      ],
    },
    methods: {
      searchContacts(){
        for (var i = 0; i < this.contacts.length; i++) {
          var ricerca = this.contactSearch.toLowerCase().trim();
          if (!this.contacts[i].name.toLowerCase().search(ricerca)) {
            this.contacts[i].visible = true;
          } else {
            this.contacts[i].visible = false;
          }
        }
      },
      makeActive(index){
        for (var i = 0; i < this.contacts.length; i++) {
          this.contacts[i].active = false;
        }
        this.contacts[index].active = true;
      },
    }

  })
